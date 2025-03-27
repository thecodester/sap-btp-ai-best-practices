import { orchestrationChatCompletionMasking } from "./services/aiOrchestration";
import { logger } from "./utils/logger";

async function main() {
  try {
    const response1 = await orchestrationChatCompletionMasking(
      "Please write an email to John Doe (john.doe@sap.com), informing them about the amazing capabilities of generative AI! Be brief and concise, write at most 6 sentences.",
      true
    );
    logger.info(`Anonymous:\n${response1.getContent()}`);
  } catch (error) {
    logger.error(error);
  }
}

main();
