import dotenv from "dotenv";
dotenv.config();

import type { OrchestrationResponse } from "@sap-ai-sdk/orchestration";
import { OrchestrationClient } from "@sap-ai-sdk/orchestration";

/**
 * A simple LLM request, asking about the capital of France.
 * @returns The orchestration service response.
 */
export async function orchestrationChatCompletion(): Promise<OrchestrationResponse> {
  const orchestrationClient = new OrchestrationClient({
    llm: {
      model_name: "gpt-4o",
      model_params: {
        max_tokens: 1000,
        temperature: 0.6,
        n: 1
      }
    },
    templating: {
      template: [{ role: "user", content: "What is the capital of France?" }]
    }
  });

  const result = await orchestrationClient.chatCompletion();
  return result;
}
