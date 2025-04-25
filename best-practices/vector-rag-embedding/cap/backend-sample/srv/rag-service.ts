import cds from "@sap/cds";
import { PassThrough, Transform } from "stream";
import { parse } from "csv-parse/sync";

const logger = cds.log("rag");

export default class RagService extends cds.ApplicationService {
  async init() {
    const { ScienceDataUpload } = this.entities("RagService");

    // Hooks
    this.on("PUT", ScienceDataUpload, this.onImportScienceData);

    await super.init();
  }

  /**
   * Handler for importing science data from CSV file
   * @param {Request} req
   * @returns {Promise<any>}
   */
  private readonly onImportScienceData = async (req: cds.Request) => {
    try {
      if (req.data.content && req.data.mediaType === "text/csv") {
        // Process csv file
        const fileContent = await this.readFileFromStream(req.data.content);
        logger.info(`File content: ${fileContent}`);
      } else {
        logger.error("Invalid file type or missing content");
        req.error({ code: 1, status: 400, message: "Invalid file type or missing content" });
      }
    } catch (ex) {
      if (ex instanceof Error) {
        logger.error(`Error while uploading file: ${ex.message}`);
        req.error({ code: 1, status: 400, message: `Error while uploading file: ${ex.message}` });
      }
    }
  };

  private readonly readFileFromStream = (file: NodeJS.ReadableStream) => {
    let content = "";
    //const stream = new PassThrough();
    //file.setEncoding("binary");

    // const addCRLF = new Transform({
    //   transform(chunk, encoding, callback) {
    //     const lines = chunk.toString().split("\n");
    //     const transformedChunk = lines.map((line) => line + "\r\n").join("");
    //     callback(null, transformedChunk);
    //   },
    // });

    //file.pipe(stream, { end: false });

    return new Promise((resolve, reject) => {
      try {
        // // Read stream
        // file.on("data", (dataChunk) => {
        //   content += dataChunk;
        //   stream.resume();
        // });
        // // Output stream
        // file.on("end", async () => {
        //   resolve(content);
        // });

        const value = file.read();
        const convertedValue = value.toString("utf8");
        logger.info(`Converted value: ${convertedValue}`);
      } catch (ex) {
        reject(ex);
      }
    });
  };
}
