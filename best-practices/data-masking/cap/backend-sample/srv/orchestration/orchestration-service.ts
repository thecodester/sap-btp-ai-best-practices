import cds from '@sap/cds';
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

const LOG = cds.log('orchestration');

export class OrchestrationService extends cds.ApplicationService {
  init() {
    const { generateEmail } = this.operations;

    // Register Action Handlers
    this.on(generateEmail, this.generateEmailHandler);

    // Add base class's handlers. Handlers registered above go first.
    return super.init();
  }

  generateEmailHandler = async (req: any) => {
    const { prompt, anonymize } = req.data;
    const orchestrationClient = new OrchestrationClient({
      llm: {
        model_name: 'gpt-4-32k'
      },
      templating: {
        template: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      masking: {
        masking_providers: [
          {
            type: 'sap_data_privacy_integration',
            method: anonymize ? 'anonymization' : 'pseudonymization',
            entities: [{ type: 'profile-email' }, { type: 'profile-person' }]
          }
        ]
      }
    });

    const result = await orchestrationClient.chatCompletion();
    LOG.info(result.getContent());
    return result.getContent();
  };
}
