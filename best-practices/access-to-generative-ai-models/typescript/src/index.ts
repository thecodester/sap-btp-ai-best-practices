import { orchestrationChatCompletion } from "./services/aiOrchestration";
import { logger } from "./utils/logger";

async function main() {
  try {
    const response = await orchestrationChatCompletion();
    logger.info(response.getContent());
  } catch (error) {
    logger.error(error);
  }
}

main();
