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
exports.Submission = void 0;
const core_1 = require("@mikro-orm/core");
const Lang_1 = require("./Lang");
let Submission = class Submission {
    constructor(type, code) {
        this.submittedAt = new Date();
        this.updatedAt = new Date();
        this.type = type;
        this.code = code;
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Submission.prototype, "id", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", Object)
], Submission.prototype, "submittedAt", void 0);
__decorate([
    core_1.Property({ onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], Submission.prototype, "updatedAt", void 0);
__decorate([
    core_1.ManyToOne(() => Lang_1.Lang),
    __metadata("design:type", Lang_1.Lang)
], Submission.prototype, "type", void 0);
__decorate([
    core_1.Property(),
    __metadata("design:type", String)
], Submission.prototype, "code", void 0);
Submission = __decorate([
    core_1.Entity(),
    __metadata("design:paramtypes", [Lang_1.Lang, String])
], Submission);
exports.Submission = Submission;
//# sourceMappingURL=submission.js.map