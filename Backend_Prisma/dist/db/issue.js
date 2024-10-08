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
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./index"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield index_1.default.issues.findMany({});
    res.json(response);
}));
router.get('/numIssue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield index_1.default.issues.count();
    res.json(response);
}));
router.get('/depnumIssue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = String(req.query.department);
    const response = yield index_1.default.issues.count({
        where: {
            department: department
        }
    });
    res.json(response);
}));
router.get('/labIssue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const department = String(req.query.department);
    const labno = Number(req.query.labno);
    const response = yield index_1.default.issues.findMany({
        where: {
            department: department,
            labno: labno
        }
    });
    res.json(response);
}));
exports.default = router;
