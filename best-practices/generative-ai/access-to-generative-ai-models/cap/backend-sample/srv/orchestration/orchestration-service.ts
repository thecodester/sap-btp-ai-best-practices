import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

export default class OrchestrationService {
  async askCapitalOfCountry() {
    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: 'gpt-4o',
        model_params: {
          max_tokens: 1000,
          temperature: 0.6,
          n: 1
        }
      },
      templating: {
        template: [{ role: 'user', content: 'What is the capital of France?' }]
      }
    });

    const result = await orchestrationClient.chatCompletion();
    return result.getContent();
  }

  async chatCompletion(req: any) {
    const { template, inputParams } = req.data;
    const llm = {
      model_name: 'gpt-4-32k'
    };
    const templating = { template };

    const response = await new OrchestrationClient({
      llm,
      templating
    }).chatCompletion({
      inputParams: mapInputParams(inputParams)
    });

    return response.getContent();
  }
}

/**
 * Map input parameters since CAP does not support dynamic object keys.
 *
 * For example:
 *
 * ```ts
 * inputParams: [{
 *   name: 'param1',
 *   value: 'value1'
 * }]
 * ```
 * =>
 * ```ts
 * mappedInputParams: {
 *   param1: 'value1'
 * }
 * ```
 * @param inputParams - Array of `InputParam` entity.
 * @returns Mapped input parameters for AI Core.
 */
function mapInputParams(
  inputParams: { name: string; value: string }[]
): Record<string, string> {
  return inputParams.reduce(
    (acc, { name, value }) => ({ ...acc, [name]: value }),
    {} as Record<string, string>
  );
}
