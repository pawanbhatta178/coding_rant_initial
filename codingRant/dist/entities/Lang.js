"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lang = void 0;
const core_1 = require("@mikro-orm/core");
const submission_1 = require("./submission");
let Lang = class Lang {
    constructor(id) {
        this.submissions = new core_1.Collection(this);
        this.id = id;
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", String)
], Lang.prototype, "id", void 0);
__decorate([
    core_1.OneToMany(() => submission_1.Submission, submission => submission.type),
    __metadata("design:type", Object)
], Lang.prototype, "submissions", void 0);
Lang = __decorate([
    core_1.Entity(),
    __metadata("design:paramtypes", [String])
], Lang);
exports.Lang = Lang;
//# sourceMappingURL=Lang.js.map