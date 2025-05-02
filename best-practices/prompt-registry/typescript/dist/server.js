"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.tsx
const express_1 = __importDefault(require("express"));
const aiOrchestration_1 = require("./services/aiOrchestration");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT ?? 3000;
app.post("/askCapitalOfCountry", async (req, res) => {
    try {
        const { country } = req.body;
        if (!country) {
            res.status(400).json({ error: "Country is required" });
            return;
        }
        const response = await (0, aiOrchestration_1.askCapitalOfCountry)(country);
        logger_1.logger.info(response.getContent());
        res.send(response.getContent());
    }
    catch (error) {
        logger_1.logger.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/createPromptTemplate", async (req, res) => {
    try {
        const { name, scenario, content } = req.body;
        if (!name || !scenario || !content) {
            res.status(400).json({ error: "Name, Scenario and Content are required" });
            return;
        }
        const response = await (0, aiOrchestration_1.createPromptTemplate)(name, scenario, content);
        logger_1.logger.info(response);
        res.send(response);
    }
    catch (error) {
        logger_1.logger.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/deletePromptTemplate", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ error: "ID is required" });
            return;
        }
        const response = await (0, aiOrchestration_1.deletePromptTemplate)(id);
        logger_1.logger.info(response);
        res.send(response);
    }
    catch (error) {
        logger_1.logger.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
