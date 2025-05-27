@path    : 'orchestration'
@requires: 'any'
service OrchestrationService {
  action chatWithSupport(input : String, filterInput : Boolean)     returns String;
  action generateParaphrase(input : String, filterOutput : Boolean) returns String;
}
