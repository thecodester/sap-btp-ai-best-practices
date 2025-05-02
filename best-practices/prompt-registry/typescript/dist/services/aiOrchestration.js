"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askCapitalOfCountry = askCapitalOfCountry;
exports.createPromptTemplate = createPromptTemplate;
exports.deletePromptTemplate = deletePromptTemplate;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const orchestration_1 = require("@sap-ai-sdk/orchestration");
const prompt_registry_1 = require("@sap-ai-sdk/prompt-registry");
/**
 * Use a template stored in the prompt registry to ask for capital
 * @returns The orchestration service response.
 */
async function askCapitalOfCountry(country) {
    const orchestrationClient = new orchestration_1.OrchestrationClient({
        llm: {
            model_name: "gpt-4-32k",
        },
        templating: {
            template_ref: {
                name: "askCapitalOfCountry",
                scenario: "ai-best-practices",
                version: "0.0.1",
            },
        },
    });
    const response = await orchestrationClient.chatCompletion({
        inputParams: { country: country },
    });
    return response;
}
/**
 * Create a prompt template.
 * @param name - The name of the prompt template.
 * @param scenario - The scenario of the prompt template.
 * @param content - The content of the prompt.
 * @returns Prompt template post response.
 */
async function createPromptTemplate(name, scenario, content) {
    return prompt_registry_1.PromptTemplatesApi.createUpdatePromptTemplate({
        name,
        scenario,
        version: "0.0.1",
        spec: {
            template: [
                {
                    content: content,
                    role: "user",
                },
            ],
        },
    }).execute();
}
/**
 * Delete prompt template by id.
 * @param id - The id of the prompt template.
 * @returns Prompt template delete response.
 */
async function deletePromptTemplate(id) {
    return prompt_registry_1.PromptTemplatesApi.deletePromptTemplate(id).execute();
}
