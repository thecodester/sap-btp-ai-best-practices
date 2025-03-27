// server.tsx
import express, { Request, Response } from "express";
import { orchestrationChatCompletionMasking } from "./services/aiOrchestration";
import { logger } from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const prompt =
      "Please write an email to John Doe (john.doe@sap.com), informing them about the amazing capabilities of generative AI! Be brief and concise, write at most 6 sentences.";
    const anonymize = true;
    const response1 = await orchestrationChatCompletionMasking(
      prompt,
      anonymize
    );

    res.json({
      prompt: prompt,
      anonymize: anonymize,
      response: response1.getContent(),
    });
  } catch (error) {
    logger.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
