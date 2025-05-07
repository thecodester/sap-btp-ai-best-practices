import cds from '@sap/cds';
import {
  OrchestrationClient,
  buildAzureContentSafetyFilter
} from '@sap-ai-sdk/orchestration';

const LOG = cds.log('orchestration');

// create a filter with minimal thresholds for hate and violence
const azureContentFilter = buildAzureContentSafetyFilter({
  Hate: 'ALLOW_SAFE',
  Violence: 'ALLOW_SAFE'
});
// create a filter with no thresholds for hate and violence
const azureContentNoFilter = buildAzureContentSafetyFilter({
  Hate: 'ALLOW_ALL',
  Violence: 'ALLOW_ALL'
});

export class OrchestrationService extends cds.ApplicationService {
  init() {
    const { chatWithSupport, generateParaphrase } = this.operations;

    // Register Action Handlers
    this.on(chatWithSupport, this.chatWithSupportHandler);
    this.on(generateParaphrase, this.generateParaphraseHandler);

    // Add base class's handlers. Handlers registered above go first.
    return super.init();
  }

  /**
   * A simple LLM request sending input to the LLM and returning the response.
   * @returns The orchestration service response.
   */
  chatWithSupportHandler = async (req: any) => {
    // check if input is provided
    const { input, filterInput } = req.data;
    if (!input) {
      req.reject(400, 'Input parameter is required');
    }
    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: 'gpt-4o'
      },
      templating: {
        template: [
          {
            role: 'user',
            content: '{{?input}}'
          }
        ]
      },
      // configure the filter to be applied for input
      filtering: {
        input: {
          filters: [filterInput ? azureContentFilter : azureContentNoFilter]
        }
      }
    });

    // Filtering will throw an error if the input is filtered
    try {
      const result = await orchestrationClient.chatCompletion({
        inputParams: { input: input }
      });
      return result.getContent();
    } catch (error: any) {
      if (error.cause.status === 400) {
        req.reject(400, 'Input was filtered');
      } else {
        throw error;
      }
    }
  };

  /**
   * A simple LLM request generating paraphrases and returning the response.
   * @returns The orchestration service response.
   */
  generateParaphraseHandler = async (req: any) => {
    // the input parameter is required
    const { input, filterOutput } = req.data;
    if (!input) {
      req.reject(400, 'Input parameter is required');
    }

    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: 'gpt-4o'
      },
      templating: {
        template: [
          {
            role: 'system',
            content: 'Create 3 paraphrases of the sentence: "{{?input}}"'
          }
        ]
      },
      // only filter the output
      filtering: {
        output: {
          filters: [filterOutput ? azureContentFilter : azureContentNoFilter]
        }
      }
    });

    const result = await orchestrationClient.chatCompletion({
      inputParams: { input: input }
    });

    // Filtering will throw an error if the output is filtered
    try {
      return result.getContent();
    } catch (error: any) {
      if (result?.getFinishReason() === 'content_filter') {
        req.error(400, 'Output was filtered by the content filter.');
      } else throw error;
    }
  };
}
