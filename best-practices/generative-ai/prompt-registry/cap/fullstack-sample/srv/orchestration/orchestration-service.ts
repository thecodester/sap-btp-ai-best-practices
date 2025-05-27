import cds, { Request } from '@sap/cds';
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

export class OrchestrationService extends cds.ApplicationService {
  init() {
    const { askCapitalOfCountry } = this.operations;

    // Register Action Handlers
    this.on(askCapitalOfCountry, this.askCapitalOfCountryHandler);

    // Add base class's handlers. Handlers registered above go first.
    return super.init();
  }

  askCapitalOfCountryHandler = async (req: Request) => {
    const country = req.data.country;
    if (!country) {
      req.reject(400, 'Country parameter is required');
    }
    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: 'gpt-4-32k'
      },
      templating: {
        template_ref: {
          name: 'askCapitalOfCountry',
          scenario: 'ai-best-practices',
          version: '0.0.1'
        }
      }
    });

    try {
      const result = await orchestrationClient.chatCompletion({
        inputParams: { country: country }
      });
      return result.getContent();
    } catch (ex) {
      req.error(ex.cause?.response?.data?.message ?? ex.message);
    }
  };
}
