@path: 'orchestration'
@requires: 'any'
service OrchestrationService {
  action askCapitalOfCountry() returns String;
  action chatCompletion(template : array of Template, inputParams : array of InputParam) returns String;
}

type Template {
  role    : String;
  content : String;
}

type InputParam {
  name  : String;
  value : String;
}
