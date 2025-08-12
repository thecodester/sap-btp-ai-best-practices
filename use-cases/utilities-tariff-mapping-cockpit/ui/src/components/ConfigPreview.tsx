"use client";

import { Card, CardHeader, Input, Label, Switch, Text, Button, Title, Icon } from "@ui5/webcomponents-react";
import { useValidation } from "@/context/ValidationContext";
import { useState } from "react";

import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons";

import addIcon from "@ui5/webcomponents-icons/dist/add";
import deleteIcon from "@ui5/webcomponents-icons/dist/delete";
import saveIcon from "@ui5/webcomponents-icons/dist/save";
import cancelIcon from "@ui5/webcomponents-icons/dist/cancel";
import editIcon from "@ui5/webcomponents-icons/dist/edit";
import documentTextIcon from "@ui5/webcomponents-icons/dist/document-text";
import syntaxIcon from "@ui5/webcomponents-icons/dist/syntax";

interface ConfigPreviewProps {
  config?: any;
  onConfigChange?: (updatedConfig: any) => void;
}

export function ConfigPreview({ config, onConfigChange }: ConfigPreviewProps) {
  const { generatedConfig, setGeneratedConfig } = useValidation();
  const [showJson, setShowJson] = useState(false);
  const [editingJson, setEditingJson] = useState(false);
  const [jsonText, setJsonText] = useState("");

  const currentConfig = config || generatedConfig;
  const updateConfig = onConfigChange || setGeneratedConfig;

  const handleJsonViewChange = () => {
    if (!showJson) {
      setJsonText(JSON.stringify(currentConfig, null, 2));
    }
    setShowJson(!showJson);
    setEditingJson(false);
  };

  const handleJsonEdit = () => {
    setEditingJson(true);
  };

  const handleJsonSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      updateConfig(parsedConfig);
      setEditingJson(false);
    } catch (error) {
      alert("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleJsonCancel = () => {
    setJsonText(JSON.stringify(currentConfig, null, 2));
    setEditingJson(false);
  };

  const updateNestedValue = (path: string[], value: any) => {
    const newConfig = JSON.parse(JSON.stringify(currentConfig));
    let current = newConfig;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    updateConfig(newConfig);
  };

  const addArrayItem = (path: string[], template: any = {}) => {
    const newConfig = JSON.parse(JSON.stringify(currentConfig));
    let current = newConfig;

    for (const key of path) {
      if (!current[key]) {
        current[key] = [];
      }
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.push(template);
      updateConfig(newConfig);
    }
  };

  const removeArrayItem = (path: string[], index: number) => {
    const newConfig = JSON.parse(JSON.stringify(currentConfig));
    let current = newConfig;

    for (const key of path) {
      current = current[key];
    }

    if (Array.isArray(current)) {
      current.splice(index, 1);
      updateConfig(newConfig);
    }
  };

  const formatFieldName = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getArrayItemTitle = (item: any, path: string[], index: number) => {
    if (typeof item === "object" && item !== null) {
      const identifierFields = ["Name", "Block", "Operand", "Type", "Category"];
      for (const field of identifierFields) {
        if (item[field]) {
          return `${item[field]}`;
        }
      }

      const arrayName = path[path.length - 1];
      if (arrayName === "BlockRates" && item.Block) {
        return `${item.Block} Block`;
      }
      if (arrayName === "History" && item.ValidFrom) {
        return `Valid from ${item.ValidFrom}`;
      }
    }

    return `Item ${index + 1}`;
  };

  const renderValue = (value: any, path: string[] = [], showLabel: boolean = false): React.JSX.Element => {
    if (value === null || value === undefined) {
      return <Text style={{ color: "#666", fontStyle: "italic" }}>Not specified</Text>;
    }

    if (typeof value === "string" || typeof value === "number") {
      const inputField = (
        <Input
          value={value.toString()}
          onChange={(e) => {
            const newValue = typeof value === "number" ? (isNaN(Number(e.target.value)) ? value : Number(e.target.value)) : e.target.value;
            updateNestedValue(path, newValue);
          }}
          style={{ width: "100%" }}
        />
      );

      if (showLabel && path.length > 0) {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label style={{ marginBottom: "0.25rem" }}>{formatFieldName(path[path.length - 1])}</Label>
            {inputField}
          </div>
        );
      }

      return inputField;
    }

    if (typeof value === "boolean") {
      const switchField = (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Switch checked={value} onChange={() => updateNestedValue(path, !value)} />
          <Text>{value ? "Yes" : "No"}</Text>
        </div>
      );

      if (showLabel && path.length > 0) {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Label style={{ marginBottom: "0.25rem" }}>{formatFieldName(path[path.length - 1])}</Label>
            {switchField}
          </div>
        );
      }

      return switchField;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return (
          <div style={{ textAlign: "center", padding: "2rem", border: "2px dashed #d0d7de", borderRadius: "0.75rem", backgroundColor: "#f6f8fa" }}>
            <Text style={{ color: "#656d76", marginBottom: "1rem", display: "block" }}>No items configured</Text>
            <Button
              design="Emphasized"
              icon={addIcon}
              onClick={() => {
                let template = {};

                const arrayName = path[path.length - 1];
                if (arrayName === "BlockRates") {
                  template = { Block: "", Operand: "ENERGY_CHARGE_T1", Rate: 0 };
                } else if (arrayName === "Riders") {
                  template = { Operand: "", Condition: "" };
                } else if (arrayName === "TariffRules") {
                  template = { Condition: "" };
                } else if (arrayName === "Operands") {
                  template = { Name: "", Category: "LPRICE", Division: "01", Group: "PRICES", Usage: "Normal", Description: "" };
                } else if (arrayName === "PriceKeys") {
                  template = {
                    Name: "",
                    Category: "Flat Rate",
                    Type: "Standard Price",
                    Currency: "USD",
                    UoM: "Month",
                    Division: "01",
                    History: [{ ValidFrom: "", ValidTo: "9999-12-31", Amount: 0 }]
                  };
                } else if (arrayName === "Rates") {
                  template = { Name: "", Description: "", Division: "01", BillingClass: "0001", Permissibility: "Facts" };
                } else if (arrayName === "DemandCharges") {
                  template = { Block: "", Operand: "DEMAND_CHARGE_T1", Rate: 0, MeasurementWindow: "15 min", RatchetPercent: 80, RatchetMonths: 12 };
                } else if (arrayName === "History") {
                  template = { ValidFrom: "", ValidTo: "9999-12-31", Amount: 0 };
                }

                addArrayItem(path, template);
              }}
            >
              Add First Item
            </Button>
          </div>
        );
      }

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {value.map((item, index) => (
            <Card key={index} style={{ border: "1px solid #d0d7de", borderRadius: "1rem" }}>
              <div style={{ padding: "0.5rem 1rem 1rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <Title level="H6" size="H6">
                    {getArrayItemTitle(item, path, index)}
                  </Title>
                  <Button design="Transparent" icon={deleteIcon} onClick={() => removeArrayItem(path, index)} tooltip="Remove item" style={{ color: "#cf222e" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                  {renderValue(item, [...path, index.toString()], true)}
                </div>
              </div>
            </Card>
          ))}
          <Button
            design="Transparent"
            icon={addIcon}
            onClick={() => {
              let template = {} as any;

              if (value.length > 0) {
                template = Object.keys(value[0]).reduce((acc: any, key: string) => {
                  acc[key] = typeof value[0][key] === "string" ? "" : typeof value[0][key] === "number" ? 0 : typeof value[0][key] === "boolean" ? false : "";
                  return acc;
                }, {} as any);
              } else {
                const arrayName = path[path.length - 1];
                if (arrayName === "BlockRates") {
                  template = { Block: "", Operand: "ENERGY_CHARGE_T1", Rate: 0 };
                } else if (arrayName === "Riders") {
                  template = { Operand: "", Condition: "" };
                } else if (arrayName === "TariffRules") {
                  template = { Condition: "" };
                } else if (arrayName === "Operands") {
                  template = { Name: "", Category: "LPRICE", Division: "01", Group: "PRICES", Usage: "Normal", Description: "" };
                } else if (arrayName === "PriceKeys") {
                  template = {
                    Name: "",
                    Category: "Flat Rate",
                    Type: "Standard Price",
                    Currency: "USD",
                    UoM: "Month",
                    Division: "01",
                    History: [{ ValidFrom: "", ValidTo: "9999-12-31", Amount: 0 }]
                  };
                } else if (arrayName === "Rates") {
                  template = { Name: "", Description: "", Division: "01", BillingClass: "0001", Permissibility: "Facts" };
                } else if (arrayName === "DemandCharges") {
                  template = { Block: "", Operand: "DEMAND_CHARGE_T1", Rate: 0, MeasurementWindow: "15 min", RatchetPercent: 80, RatchetMonths: 12 };
                } else if (arrayName === "History") {
                  template = { ValidFrom: "", ValidTo: "9999-12-31", Amount: 0 };
                }
              }

              addArrayItem(path, template);
            }}
            style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
          >
            Add New Item
          </Button>
        </div>
      );
    }

    if (typeof value === "object") {
      const entries = Object.entries(value);

      if (showLabel) {
        return (
          <>
            {entries.map(([key, val]) => {
              const isComplexType = Array.isArray(val) || (typeof val === "object" && val !== null && !Array.isArray(val));

              if (isComplexType) {
                return (
                  <div key={key} style={{ gridColumn: "1 / -1" }}>
                    <div style={{ border: "1px solid #e0e0e0", borderRadius: "1rem", padding: "1rem" }}>
                      <Title level="H6" size="H6" style={{ marginBottom: "1.5rem" }}>
                        {formatFieldName(key)}
                      </Title>
                      {renderValue(val, [...path, key], false)}
                    </div>
                  </div>
                );
              } else {
                return <div key={key}>{renderValue(val, [...path, key], true)}</div>;
              }
            })}
          </>
        );
      } else {
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {entries.map(([key, val]) => {
              const isComplexType = Array.isArray(val) || (typeof val === "object" && val !== null && !Array.isArray(val));

              if (isComplexType) {
                return (
                  <div key={key} style={{ gridColumn: "1 / -1" }}>
                    <div style={{ border: "1px solid #e0e0e0", borderRadius: "1rem", padding: "1rem" }}>
                      <Title level="H6" size="H6" style={{ marginBottom: "1.5rem" }}>
                        {formatFieldName(key)}
                      </Title>
                      {renderValue(val, [...path, key], false)}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                    <Label style={{ marginBottom: "0.25rem" }}>{formatFieldName(key)}</Label>
                    {renderValue(val, [...path, key], false)}
                  </div>
                );
              }
            })}
          </div>
        );
      }
    }

    return <Text>{String(value)}</Text>;
  };

  const renderStructuredView = () => {
    const sectionOrder = ["TariffSummary", "RateCategoryDetails", "Operands", "PriceKeys", "Rates", "Validity"];

    const orderedSections = sectionOrder
      .filter((key) => currentConfig[key])
      .map((key) => [key, currentConfig[key] as any])
      .concat(Object.entries(currentConfig).filter(([key]) => !sectionOrder.includes(key)) as any);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orderedSections.map(([key, value]) => (
          <Card key={key as string} style={{ border: "1px solid #e0e0e0", borderRadius: "1rem", overflow: "hidden" }}>
            <CardHeader titleText={formatFieldName(key as string)} style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }} />
            <div style={{ padding: "1rem" }}>{renderValue(value, [key as string])}</div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.5rem" }}>
        <div>
          <Title level="H4" style={{ margin: "0 0 0.25rem 0" }}>
            Configuration Preview
          </Title>
          <Text style={{ color: "#666", fontSize: "0.875rem" }}>Review and edit the extracted tariff configuration</Text>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "2rem",
            border: "1px solid #e0e0e0"
          }}
        >
          <Icon name={documentTextIcon} style={{ color: showJson ? "#666" : "#0070f3" }} />
          <Label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Structured</Label>
          <Switch checked={showJson} onChange={handleJsonViewChange} />
          <Label style={{ fontSize: "0.875rem", fontWeight: 500 }}>JSON</Label>
          <Icon name={syntaxIcon} style={{ color: showJson ? "#0070f3" : "#666" }} />
        </div>
      </div>

      {showJson ? (
        <Card style={{ border: "1px solid #e0e0e0", borderRadius: "1rem" }}>
          <CardHeader
            titleText="JSON Configuration"
            action={
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {editingJson ? (
                  <>
                    <Button design="Emphasized" onClick={handleJsonSave} icon={saveIcon}>
                      Save Changes
                    </Button>
                    <Button design="Transparent" onClick={handleJsonCancel} icon={cancelIcon}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button design="Transparent" onClick={handleJsonEdit} icon={editIcon}>
                    Edit JSON
                  </Button>
                )}
              </div>
            }
            style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}
          />
          <div style={{ padding: "1.5rem" }}>
            {editingJson ? (
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                style={{
                  width: "100%",
                  height: "32rem",
                  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  resize: "vertical",
                  backgroundColor: "#fafafa"
                }}
                placeholder="Enter valid JSON configuration..."
              />
            ) : (
              <pre
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  overflow: "auto",
                  maxHeight: "32rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                  border: "1px solid #e0e0e0",
                  margin: 0
                }}
              >
                {JSON.stringify(currentConfig, null, 2)}
              </pre>
            )}
          </div>
        </Card>
      ) : (
        renderStructuredView()
      )}
    </div>
  );
}

export default ConfigPreview;
