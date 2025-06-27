import cds from '@sap/cds';
import {
  PromptTemplatesApi,
  PromptTemplateSpec
} from '@sap-ai-sdk/prompt-registry';

interface IPromptTemplate {
  id: string;
  name: string;
  scenario: string;
  version: string;
  spec: PromptTemplateSpec;
}

export class PromptRegistryService extends cds.ApplicationService {
  init() {
    const { getPromptTemplates, createPromptTemplate, deletePromptTemplate } =
      this.operations;

    // Custom handlers
    this.on(getPromptTemplates, this.getPromptTemplateHandler);
    this.on(createPromptTemplate, this.createPromptTemplateHandler);
    this.on(deletePromptTemplate, this.deletePromptTemplateHandler);

    // Add base class's handlers. Handlers registered above go first.
    return super.init();
  }

  getPromptTemplateHandler = async (req: any): Promise<IPromptTemplate[]> => {
    const response = await PromptTemplatesApi.listPromptTemplates({
      includeSpec: true
    }).execute();

    return response.resources.map(
      resource =>
        ({
          id: resource.id,
          name: resource.name,
          scenario: resource.scenario,
          version: resource.version,
          spec: resource.spec
        } as IPromptTemplate)
    );
  };

  createPromptTemplateHandler = async (req: any) => {
    const { name, scenario, content } = req.data;
    return PromptTemplatesApi.createUpdatePromptTemplate({
      name,
      scenario,
      version: '0.0.1',
      spec: {
        template: [
          {
            content: content,
            role: 'user'
          }
        ]
      }
    }).execute();
  };

  deletePromptTemplateHandler = async (req: any) => {
    const { id } = req.data;
    if (id) {
      const response = await PromptTemplatesApi.deletePromptTemplate(
        id
      ).execute();
      return response.message;
    } else {
      req.error('ID is required.');
    }
  };
}
