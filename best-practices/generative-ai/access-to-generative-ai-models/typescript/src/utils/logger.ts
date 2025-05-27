import { createLogger } from "@sap-cloud-sdk/util";

const logger = createLogger({
  package: "access-to-generative-ai-models",
  messageContext: "orchestration"
});

export { logger };
