"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Lang_1 = require("./entities/Lang");
const submission_1 = require("./entities/submission");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const language = orm.em.create(Lang_1.Lang, { id: 'js' });
    const sub = orm.em.create(submission_1.Submission, { type: language, code: "console.log(1+1)" });
    yield orm.em.persistAndFlush(sub);
});
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map