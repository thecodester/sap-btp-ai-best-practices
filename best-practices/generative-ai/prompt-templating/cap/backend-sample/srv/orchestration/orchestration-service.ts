import cds from '@sap/cds';
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

export class OrchestrationService extends cds.ApplicationService {
  init() {
    const { askCapitalOfCountry } = this.operations;

    // Register Action Handlers
    this.on(askCapitalOfCountry, this.askCapitalOfCountryHandler);

    // Add base class's handlers. Handlers registered above go first.
    return super.init();
  }

  askCapitalOfCountryHandler = async (req: any) => {
    const country = req.data.country;
    if (!country) {
      req.reject(400, 'Country parameter is required');
    }
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
        template: [
          { role: 'user', content: `What is the capital of {{?country}}?` }
        ]
      }
    });

    const result = await orchestrationClient.chatCompletion({
      inputParams: { country: country }
    });
    return result.getContent();
  };
}
