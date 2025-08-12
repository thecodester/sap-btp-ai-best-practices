"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import sampleData from "@/data/sample-input.json";

interface GeneratedConfig {
  SchemaVersion?: string;
  TariffSummary?: {
    RateCategory: string;
    RateType: string;
    FixedCharge?: {
      Operand: string;
      Amount: number;
    };
    BlockRates?: {
      Block: string;
      Operand: string;
      Rate: number;
    }[];
    Riders?: {
      Operand: string;
      Condition: string;
    }[];
    TariffRules?: {
      Condition: string;
    }[];
  };
  RateCategoryDetails?: {
    Name: string;
    Division: string;
    BillingClass?: string;
    OutsortGroup?: string;
    BillingSchema?: string;
  };
  Operands?: {
    Name: string;
    Category: string;
    Division: string;
    Group?: string;
    Usage?: string;
    Description?: string;
  }[];
  PriceKeys?: {
    Name: string;
    Category: string;
    Type: string;
    Currency: string;
    UoM: string;
    Division: string;
    History: {
      ValidFrom: string;
      ValidTo: string;
      Amount: number;
    }[];
  }[];
  Rates?: {
    Name: string;
    Description?: string;
    Division: string;
    BillingClass?: string;
    Permissibility?: string;
  }[];
  DemandCharges?: {
    Block: string;
    Operand: string;
    Rate: number;
    MeasurementWindow?: string;
    RatchetPercent?: number;
    RatchetMonths?: number;
  }[];
  SeasonalRates?: any[];
  ExportRates?: any[];
  Surcharges?: any[];
  Validity?: {
    EffectiveFrom: string;
    EffectiveTo?: string;
  };
  RateCategory?: string;
  RateType?: string;
  FixedCharge?: {
    Operand: string;
    Amount: number;
  };
  BlockRates?: {
    Block: string;
    Operand: string;
    Rate: number;
  }[];
  Riders?: {
    Operand: string;
    Condition: string;
  }[];
  TariffRules?: {
    Condition: string;
  }[];
}

interface ComplianceCheck {
  text: string;
  state: "Success" | "Warning" | "Error";
}

interface ValidationContextType {
  generatedConfig: GeneratedConfig;
  setGeneratedConfig: (config: GeneratedConfig) => void;
  complianceChecks: ComplianceCheck[];
  isCompliant: boolean;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export function ValidationProvider({ children }: { children: ReactNode }) {
  const [generatedConfig, setGeneratedConfig] = useState<GeneratedConfig>(sampleData.GeneratedConfig);

  const complianceChecks = useMemo(() => {
    const checks: ComplianceCheck[] = [];
    const completenessErrors: ComplianceCheck[] = [];

    const tariffSummary = (generatedConfig as any).TariffSummary || (generatedConfig as any);
    const rateCategory = tariffSummary?.RateCategory || (generatedConfig as any).RateCategory;
    const rateType = tariffSummary?.RateType || (generatedConfig as any).RateType;
    const fixedCharge = tariffSummary?.FixedCharge || (generatedConfig as any).FixedCharge;
    const blockRates = tariffSummary?.BlockRates || (generatedConfig as any).BlockRates;

    if (!rateCategory) {
      completenessErrors.push({ text: "Rate Category is missing", state: "Error" });
    }
    if (!rateType) {
      completenessErrors.push({ text: "Rate Type is missing", state: "Error" });
    }
    if (!fixedCharge?.Amount) {
      completenessErrors.push({ text: "Fixed Charge is missing or incomplete", state: "Error" });
    }
    if (!blockRates?.length) {
      completenessErrors.push({ text: "Block Rates are missing", state: "Error" });
    }

    if (completenessErrors.length === 0) {
      checks.push({ text: "All required sections are populated.", state: "Success" });
    } else {
      checks.push(...completenessErrors);
    }

    const namingWarnings: ComplianceCheck[] = [];
    if (fixedCharge && fixedCharge.Operand !== "BASIC_CHARGE") {
      namingWarnings.push({ text: `Fixed Charge Operand should be BASIC_CHARGE, but is ${fixedCharge.Operand}`, state: "Warning" });
    }
    if (blockRates) {
      blockRates.forEach((block: any, index: number) => {
        if (block.Operand && !block.Operand.startsWith("ENERGY_CHARGE_T")) {
          namingWarnings.push({ text: `Block Rate ${index + 1} Operand '${block.Operand}' has inconsistent naming`, state: "Warning" });
        }
      });
    }

    if (namingWarnings.length === 0) {
      checks.push({ text: "All operand naming conventions are met.", state: "Success" });
    } else {
      checks.push(...namingWarnings);
    }

    return checks;
  }, [generatedConfig]);

  const isCompliant = useMemo(() => !complianceChecks.some((check) => check.state === "Error"), [complianceChecks]);

  const value = {
    generatedConfig,
    setGeneratedConfig,
    complianceChecks,
    isCompliant
  };

  return <ValidationContext.Provider value={value}>{children}</ValidationContext.Provider>;
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
}
