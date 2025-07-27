
from langchain_community.graphs.networkx_graph import KG_TRIPLE_DELIMITER
from langchain_core.prompts.prompt import PromptTemplate


_DEFAULT_KNOWLEDGE_TRIPLE_EXTRACTION_TEMPLATE = (  
    f"""# Knowledge Graph Instructions for triplets extraction from text

## 1. Overview
You are a top-tier algorithm designed for extracting information in structured formats to build a knowledge graph from industry equipment description.
- **Nodes** represent entities and concepts. They're akin to Wikipedia nodes.
- The aim is to achieve simplicity and clarity in the knowledge graph, making it accessible for a vast audience.

## 2. Labeling Nodes
- **Consistency**: Ensure you use basic or elementary types for node labels.
- For example, when you identify an entity representing an Equipment, always label it as **"Equipment"**. Avoid using more specific terms like "1500-HP Equipment".
- **Node IDs**: Never utilize integers as node IDs. Node IDs should be names or human-readable identifiers found in the text.
- **Allowed Node Labels**: Equipment, Voltage, Power, Frequency, Temperature, Current, Efficiency, Manufacturer, Enclosure, Bearing, Test, Location

## 3. Structured Relationship Types
Use these SPECIFIC relationship types for performance and technical attributes:

**Performance Relations:**
- **has efficiency rating** - for efficiency percentages (e.g., "95% efficiency")
- **has power rating** - for power specifications (e.g., "1500 HP", "1200 kW")
- **has speed rating** - for speed/RPM specifications (e.g., "3600 RPM")
- **has load characteristic** - for load-related performance (e.g., "full load current 180A")
- **has consumption metric** - for energy consumption data

**Technical Relations:**
- **operates at voltage** - for voltage specifications
- **operates at frequency** - for frequency specifications  
- **has temperature rating** - for temperature specifications
- **has insulation class** - for insulation specifications
- **has protection rating** - for IP ratings, enclosure types

**Compliance Relations:**
- **has industry standard** - for compliance standards (API, IEEE, NEMA, etc.)
- **meets specification** - for technical specifications
- **complies with** - for regulatory compliance

**Equipment Relations:**
- **is a** - for entity classification
- **is equipped with** - for sensors, accessories, components
- **is designed with** - for design features
- **includes** - for included components
- **provides** - for capabilities/features

## 4. Identifying and Processing Tables
- **Table Detection**: Identify tables by the keyword "Table" in the text document.
- **Entity and Relationship Extraction**: From tables, extract entities and their relationships. Consider rows, columns, and headers for contextual understanding.

## 5. Handling Numerical Data and Dates
- Numerical data, like voltage, current, efficiency, etc., should be incorporated as attributes or properties of the respective nodes.
- **No Separate Nodes for Dates/Numbers**: Do not create separate nodes for dates or numerical values. Always attach them as attributes or properties of nodes.
- **Property Format**: Properties must be in a key-value format.
- **Naming Convention**: Use camelCase for property keys, e.g., `ratedVoltage`.

## 6. Extracting Models as Separate Equipment Nodes
- **Model Identification**: All mentions of specific equipment models should be extracted as separate **"Equipment"** nodes. For example, if "Motor Model MAC 1-1" is mentioned in the text, it should be labeled as an **Equipment** node with the model name as the node ID.
- **Consistency**: If a model is referenced multiple times with different names, ensure the most complete identifier is used consistently in the knowledge graph.

## 7. Conference Resolution
- **Maintain Entity Consistency**: When extracting entities, it's vital to ensure consistency. If an entity, such as "Equipment Model X", is mentioned multiple times in the text but is referred to by different names or descriptions, always use the most complete identifier for that entity throughout the knowledge graph.

## 8. Strict Compliance
Adhere to the rules strictly. Non-compliance will result in termination.

## 9. Handling Industry Standards
When text mentions compliance with, reference to, or conformity with any industry standard (such as API, IEEE, NEMA, ISO, etc.), extract a triple using the relation "has industry standard".
The left node is the relevant Equipment, Component, or Test.
The right node is the specific standard (e.g., "API 610", "IEEE Std 112", "NEMA MG1").
Do not create separate nodes for the standard's numeric value—always include the organization and number as a single node.
If the standard appears in a table, extract as above, treating each row as a potential relationship.

## 10. Performance Data Extraction Rules
- **Efficiency**: Always use "has efficiency rating" for efficiency percentages
- **Power**: Always use "has power rating" for HP, kW, or power specifications  
- **Speed**: Always use "has speed rating" for RPM, rotational speed
- **Load**: Always use "has load characteristic" for current, load-related specs
- **Voltage**: Always use "operates at voltage" for voltage specifications
- **Frequency**: Always use "operates at frequency" for Hz specifications

 """

    "EXAMPLE\n"  
    "Equipment Model A, a 1125-HP induction Equipment, is rated for 4160V at 60Hz with a full load speed of 3222 RPM. The Equipment is designed with Class F insulation and a Class B temperature rise. It is equipped with RTDs for temperature detection and vibration sensors. "  
    "Efficiency: 95% at full load. Power factor at full load: 0.90. Noise level: 85 dBA at 1 meter. Full load current: 180A.\n\n"  
    f"Output: (Equipment Model A, is a, Equipment){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has power rating, 1125-HP){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, operates at voltage, 4160V){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, operates at frequency, 60Hz){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has speed rating, full load speed of 3222 RPM){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, is equipped with, RTDs for temperature detection){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, is equipped with, vibration sensors){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has efficiency rating, 95% at full load){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has load characteristic, power factor 0.90 at full load){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has load characteristic, noise level of 85 dBA at 1 meter){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has insulation class, Class F insulation){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has temperature rating, Class B temperature rise){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has load characteristic, full load current 180A){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has industry standard, API 610){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has industry standard, IEEE Std 112){KG_TRIPLE_DELIMITER}"  
    f"(Equipment Model A, has industry standard, NEMA 250){KG_TRIPLE_DELIMITER}"  
    "END OF EXAMPLE\n\n"
    "EXAMPLE\n"
    "{text}"
    "Output:"
)

KNOWLEDGE_TRIPLE_EXTRACTION_PROMPT = PromptTemplate(
    input_variables=["text"],
    template=_DEFAULT_KNOWLEDGE_TRIPLE_EXTRACTION_TEMPLATE,
)


_DEFAULT_KNOWLEDGE_TRIPLE_EXTRACTION_TEMPLATE_KG_RAG = (
    f"""# Knowledge Graph Instructions for Performance-Focused triplets extraction from text

## 1. Overview
Extract performance-related triplets from technical specifications. Focus on numerical data with units.

## 2. Target Relationship Types (from baseline knowledge graph)
{{allowedAttributes}}

## 3. Extraction Rules
- Look for numerical specifications related to performance
- Extract equipment model as subject
- Use the most appropriate relationship type from the target list
- If exact match not found, use the closest semantic match:
  * Power specifications (kW, HP) → "has power rating"
  * Efficiency percentages → "has efficiency rating" 
  * Speed/RPM specifications → "has speed rating"
  * Voltage specifications → "operates at voltage"
  * Frequency (Hz) specifications → "operates at frequency"
  * Temperature specifications → "has temperature rating"
  * Current, torque, load data → "has load characteristic"
  * Insulation class → "has insulation class"

## 4. Examples
Input: "Equipment Model A: 0.75kW, 2885 rpm, 400V, 50Hz. Efficiency: 80.7% at 100% load. Class F insulation."
Output:
(Equipment Model A, has power rating, 0.75kW){KG_TRIPLE_DELIMITER}
(Equipment Model A, has speed rating, 2885 rpm){KG_TRIPLE_DELIMITER}
(Equipment Model A, operates at voltage, 400V){KG_TRIPLE_DELIMITER}
(Equipment Model A, operates at frequency, 50Hz){KG_TRIPLE_DELIMITER}
(Equipment Model A, has efficiency rating, 80.7% at 100% load){KG_TRIPLE_DELIMITER}
(Equipment Model A, has insulation class, Class F insulation){KG_TRIPLE_DELIMITER}

**Target relationship types: {{allowedAttributes}}**

TEXT TO ANALYZE:
{{text}}  

Output:
"""
)



KNOWLEDGE_TRIPLE_EXTRACTION_PROMPT_KG_RAG = PromptTemplate(
    input_variables=["text", "allowedAttributes"],
    template=_DEFAULT_KNOWLEDGE_TRIPLE_EXTRACTION_TEMPLATE_KG_RAG,
)
