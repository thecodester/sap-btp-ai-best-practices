import dotenv from "dotenv";
dotenv.config();
import type { OrchestrationResponse } from "@sap-ai-sdk/orchestration";
import { OrchestrationClient } from "@sap-ai-sdk/orchestration";
import {
  PromptTemplatesApi,
  PromptTemplateDeleteResponse,
  PromptTemplatePostResponse,
} from "@sap-ai-sdk/prompt-registry";

/**
 * Use a template stored in the prompt registry to ask for capital
 * @returns The orchestration service response.
 */
export async function askCapitalOfCountry(country: string): Promise<OrchestrationResponse> {
  const orchestrationClient = new OrchestrationClient({
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
export async function createPromptTemplate(
  name: string,
  scenario: string,
  content: string
): Promise<PromptTemplatePostResponse> {
  return PromptTemplatesApi.createUpdatePromptTemplate({
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
export async function deletePromptTemplate(id: string): Promise<PromptTemplateDeleteResponse> {
  return PromptTemplatesApi.deletePromptTemplate(id).execute();
}
