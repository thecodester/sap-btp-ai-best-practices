// server.tsx
import express, { Request, Response } from "express";
import { askCapitalOfCountry, createPromptTemplate, deletePromptTemplate } from "./services/aiOrchestration";
import { logger } from "./utils/logger";
import { PromptTemplateDeleteResponse, PromptTemplatePostResponse } from "@sap-ai-sdk/prompt-registry";

const app = express();
app.use(express.json());
const port = process.env.PORT ?? 3000;

app.post("/askCapitalOfCountry", async (req: Request, res: Response): Promise<void> => {
  try {
    const { country } = req.body;
    if (!country) {
      res.status(400).json({ error: "Country is required" });
      return;
    }

    const response = await askCapitalOfCountry(country);

    logger.info(response.getContent());
    res.send(response.getContent());
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createPromptTemplate", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, scenario, content } = req.body;
    if (!name || !scenario || !content) {
      res.status(400).json({ error: "Name, Scenario and Content are required" });
      return;
    }

    const response: PromptTemplatePostResponse = await createPromptTemplate(name, scenario, content);

    logger.info(response);
    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/deletePromptTemplate", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "ID is required" });
      return;
    }

    const response: PromptTemplateDeleteResponse = await deletePromptTemplate(id);

    logger.info(response);
    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
