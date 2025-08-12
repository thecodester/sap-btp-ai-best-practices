// server.tsx
import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { processDocument, processPDFDocument } from "./services/tariffProcessing";
import { logger } from "./utils/logger";

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const maxUploadMb = Number(process.env.MAX_UPLOAD_MB || 50);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxUploadMb * 1024 * 1024 // configurable limit (default 50MB)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});

const port = process.env.PORT ?? 3001;

app.post("/processDocument", async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "text is required" });
      return;
    }

    const response = await processDocument(text);
    if (response.error) {
      res.status(400).json({ error: response.error });
      return;
    }
    logger.info(response);
    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/processPDF", upload.single("pdf"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "PDF file is required" });
      return;
    }

    const response = await processPDFDocument(req.file.buffer);
    if ("error" in response) {
      res.status(400).json({ error: response.error });
      return;
    }
    logger.info("PDF processed successfully");
    res.send(response);
  } catch (error) {
    logger.error("Error processing PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
