"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const util_1 = require("@sap-cloud-sdk/util");
const logger = (0, util_1.createLogger)({
    package: "prompt-registry",
    messageContext: "orchestration",
});
exports.logger = logger;
