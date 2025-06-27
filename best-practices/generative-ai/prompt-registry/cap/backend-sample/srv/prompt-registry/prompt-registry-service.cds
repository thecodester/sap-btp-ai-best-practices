@path    : 'prompt-registry'
@requires: 'any'
service PromptRegistryService {
    function getPromptTemplates()                                                     returns array of promptTemplate;
    action   createPromptTemplate(name : String, scenario : String, content : String) returns promptTemplate;
    action   deletePromptTemplate(id : String)                                        returns String;

    // Types
    type promptTemplate {
        id       : String;
        name     : String;
        scenario : String;
        version  : String;
        spec     : promptTemplateSpec
    }

    type promptTemplateSpec {
        template : array of promptTemplateSpecTemplate
    }

    type promptTemplateSpecTemplate {
        role    : String;
        content : String;
    }
}
