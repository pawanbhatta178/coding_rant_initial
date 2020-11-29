"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Lang_1 = require("./entities/Lang");
const submission_1 = require("./entities/submission");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [submission_1.Submission, Lang_1.Lang],
    dbName: "codingrant",
    type: "postgresql",
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map