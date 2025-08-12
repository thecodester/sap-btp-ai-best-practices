import pdf from "pdf-parse";
import { logger } from "../utils/logger";

export interface PDFProcessingResult {
  text: string;
  metadata: {
    pages: number;
    info?: any;
  };
}

export class PDFProcessor {
  /**
   * Extract text from PDF buffer
   */
  async extractTextFromPDF(buffer: Buffer): Promise<PDFProcessingResult> {
    try {
      logger.info("Starting PDF text extraction");

      const data = await pdf(buffer);

      const result: PDFProcessingResult = {
        text: data.text,
        metadata: {
          pages: data.numpages,
          info: data.info
        }
      };

      logger.info(`PDF extraction completed. Pages: ${result.metadata.pages}, Text length: ${result.text.length}`);

      return result;
    } catch (error) {
      logger.error("Error extracting text from PDF:", error);
      throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Clean and preprocess extracted text
   */
  preprocessText(text: string): string {
    return (
      text
        // Remove excessive whitespace
        .replace(/\s+/g, " ")
        // Remove page breaks and form feeds
        .replace(/[\f\r]/g, "")
        // Normalize line breaks
        .replace(/\n+/g, "\n")
        // Trim whitespace
        .trim()
    );
  }

  /**
   * Split text into logical sections for better processing
   */
  splitIntoSections(text: string): string[] {
    // Split by common section headers or double line breaks
    const sections = text
      .split(/\n\s*\n|\n(?=[A-Z][A-Za-z\s]+:)/)
      .map((section) => section.trim())
      .filter((section) => section.length > 0);

    return sections;
  }

  /**
   * Process PDF buffer and return cleaned, structured text
   */
  async processPDF(buffer: Buffer): Promise<{
    originalText: string;
    cleanedText: string;
    sections: string[];
    metadata: PDFProcessingResult["metadata"];
  }> {
    try {
      const result = await this.extractTextFromPDF(buffer);
      const cleanedText = this.preprocessText(result.text);
      const sections = this.splitIntoSections(cleanedText);

      return {
        originalText: result.text,
        cleanedText,
        sections,
        metadata: result.metadata
      };
    } catch (error) {
      logger.error("Error processing PDF:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const pdfProcessor = new PDFProcessor();
