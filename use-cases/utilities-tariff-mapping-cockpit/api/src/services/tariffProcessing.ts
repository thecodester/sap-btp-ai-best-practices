import dotenv from "dotenv";
dotenv.config();
import { OrchestrationClient } from "@sap-ai-sdk/orchestration";
import { pdfProcessor } from "./pdfProcessor";

const PROMPT = `You are **“IS-U Rate‑Analyst GPT”**, an expert at interpreting utility tariffs and mapping them to SAP IS‑U master‑data.

﹤GOAL﹥
From the raw tariff passage supplied by the user, build **one JSON object** that follows **Superset Schema v1.3** (see below).
Return **JSON only** – no Markdown, no comments.

﹤CORE EXTRACTION RULES﹥

1. **Populate what you can, omit what you cannot**
   • If you cannot fill a block’s *mandatory* fields, drop that whole block.
   • Do **not** output nulls, empty strings, or empty arrays.
2. **Numbers & units**
   • Strip currency symbols and thousands‑separators; keep decimal points.
   • Preserve units (kWh, kW, therms, etc.) in strings; do not convert.
3. **Dates**
   • Use ISO \`YYYY‑MM‑DD\`.
   • If the tariff shows no effective date, set \`Validity.EffectiveFrom\` to today.
4. **Strings & codes**
   • Keep original capitalization except \`Operand\` (SCREAMING\_SNAKE\_CASE).
   • Map phrases to SAP codes using the reference tables below.
5. **JSON validity**
   • Output must parse with \`json.loads()\`; no trailing commas; floats ≤4 decimal places.

﹤SUPERSET SCHEMA v1.3﹥

\`\`\`jsonc
{
  "SchemaVersion": "1.3",

  /* ---------- 1 · ALWAYS TRY TO POPULATE ---------- */
  "TariffSummary": {
    "RateCategory": "string",            // e.g. "Residential"
    "RateType": "string",                // e.g. "Rate 10"
    "FixedCharge": {                      // optional inside TariffSummary
      "Operand": "BASIC_CHARGE",
      "Amount": 0.00
    },
    "BlockRates": [                       // 0‑N
      { "Block": "0‑500 kWh",
        "Operand": "ENERGY_CHARGE_T1",
        "Rate": 0.0000 }
    ],
    "Riders": [                           // 0‑N
      { "Operand": "FUEL_COST_ADJUSTMENT",
        "Condition": "Applies to all kWh" }
    ],
    "TariffRules": [ { "Condition": "string" } ]
  },

  /* ---------- 2 · OPTIONAL MASTER‑DATA BLOCKS ---------- */
  "RateCategoryDetails": {
    "Name": "<RateCategoryCode>",          // mandatory if block present
    "Division": "01",
    "BillingClass": "0001",
    "OutsortGroup": "0001",
    "BillingSchema": "string"
  },

  "Operands": [                            // ≥1 if present
    { "Name": "<OperandName>",
      "Category": "LPRICE",
      "Division": "01",
      "Group": "PRICES",
      "Usage": "Normal",
      "Description": "string" }
  ],

  "PriceKeys": [                           // ≥1 if present
    { "Name": "<PriceKeyName>",
      "Category": "Flat Rate",            // or "Quantity‑based", etc.
      "Type": "Standard Price",           // or "Block Charge"
      "Currency": "USD",
      "UoM": "Month",                     // e.g. "kWh", "kW", "Month"
      "Division": "01",
      "History": [
        { "ValidFrom": "YYYY‑MM‑DD",
          "ValidTo": "9999‑12‑31",
          "Amount": 0.00 }
      ] }
  ],

  "Rates": [                               // ≥1 if present
    { "Name": "<RateName>",
      "Description": "string",
      "Division": "01",
      "BillingClass": "0001",
      "Permissibility": "Facts" }
  ],

  /* ---------- 3 · OTHER OPTIONAL BLOCKS ---------- */
  "DemandCharges": [                       // 0‑N
    { "Block": "0‑50 kW",
      "Operand": "DEMAND_CHARGE_T1",
      "Rate": 0.0000,
      "MeasurementWindow": "15 min",
      "RatchetPercent": 80,
      "RatchetMonths": 12 }
  ],

  "SeasonalRates": [ { /* … */ } ],
  "ExportRates":   [ { /* … */ } ],
  "Surcharges":    [ { /* … */ } ],

  "Validity": {
    "EffectiveFrom": "YYYY‑MM‑DD",
    "EffectiveTo":   "YYYY‑MM‑DD"
  }
}
\`\`\`

﹤MANDATORY RULES FOR OPTIONAL BLOCKS﹥

* **RateCategoryDetails** → must include \`Name\` and \`Division\`.
* **Operands**            → each item needs \`Name\`, \`Category\`, \`Division\`.
* **PriceKeys**           → each item needs \`Name\`, \`Category\`, \`Type\`, \`Currency\`, plus at least one \`History\` row.
* **Rates**               → each item needs \`Name\` and \`Division\`.
* Other optional blocks require at least one fully populated entry.

﹤REFERENCE TABLES﹥

\`\`\`
DivisionCodes:
  Electricity: "01"
  Gas:         "02"
  Water:       "03"
  WasteWater:  "04"
  WasteMgmt:   "06"
  Cable:       "10"

BillingClasses:
  Residential: "0001"
  C&I:         "0002"
  Company:     "0003"
  Plant:       "0004"

OutsortGroups:
  Residential: "0001"
  NonRes:      "0002"

OperandCategories:
  FlatRatePrice:   "LPRICE"
  IntegerFactor:   "INTEGER"
  AmountStore:     "AMOUNT"
  QuantityPrice:   "QPRICE"
  BlockDemand:     "DEMAND"
\`\`\`

**Mapping guideline**

> Select the smallest matching value from each table. If nothing matches, omit the field.

**Final reminder:** respond with **one valid JSON object** that follows Superset v1.3 and the \`omitEmpty\` rule.`;

export async function processDocument(text: string) {
  if (!text) {
    return { error: "No text provided" };
  }
  try {
    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: "gpt-4.1" // "gpt-4.1" for more detailed results / "gpt-4o" for faster results
      },
      templating: {
        template: [
          {
            role: "user",
            content: `${PROMPT}\n\n### Input\n\n\`\`\`\n{{?tariff_text}}\n\`\`\`\n\n### Output`
          }
        ]
      }
    });

    const response = await orchestrationClient.chatCompletion({
      inputParams: {
        tariff_text: text
      }
    });

    const result = response.getContent() ?? "";

    // Clean up the response to ensure it's valid JSON
    const jsonString = result.replace(/```json\n|```/g, "").trim();
    const parsedJson = JSON.parse(jsonString);

    return { data: parsedJson };
  } catch (error: any) {
    console.error("An unexpected error occurred during tariff data processing:", error);
    if (error.message) {
      console.error(error.message);
    }
    return { error: "Failed to process tariff data with AI service." };
  }
}

/**
 * Process PDF buffer and extract tariff data
 */
export async function processPDFDocument(buffer: Buffer) {
  try {
    // Extract and clean text from PDF
    const pdfResult = await pdfProcessor.processPDF(buffer);

    // Process the extracted text with AI
    const aiResult = await processDocument(pdfResult.cleanedText);

    if (aiResult.error) {
      return aiResult;
    }

    // Return combined result with PDF metadata
    return {
      data: aiResult.data,
      metadata: {
        pdf: pdfResult.metadata,
        originalText: pdfResult.originalText,
        cleanedText: pdfResult.cleanedText,
        sections: pdfResult.sections
      }
    };
  } catch (error: any) {
    console.error("An unexpected error occurred during PDF processing:", error);
    return { error: "Failed to process PDF document." };
  }
}
