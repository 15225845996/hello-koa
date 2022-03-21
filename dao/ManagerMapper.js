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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
var Utils_1 = require("../utils/Utils");
var ManagerMapper = /** @class */ (function () {
    function ManagerMapper(config) {
        this.config = config;
        // @ts-ignore
        this.conn = new knex({
            client: "mysql",
            version: '8.0',
            connection: {
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            },
            debug: config.enableDebug,
            log: {
                debug: function (message) {
                    console.log("EXECUTE:" + message.sql);
                }
            }
        });
    }
    ManagerMapper.prototype.findByMobile = function (mobile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Utils_1.default.isNotEmpty(mobile)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).where('mobile', '=', mobile)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    ManagerMapper.prototype.updateByMobile = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utils_1.default.isNotEmpty(info) && Utils_1.default.isNotEmpty(info.mobile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).where('mobile', '=', info.mobile).update(info)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ManagerMapper.prototype.delByMobile = function (mobile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Utils_1.default.isNotEmpty(mobile)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).where('mobile', '=', mobile).del()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    ManagerMapper.prototype.add = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Utils_1.default.isNotEmpty(info) && Utils_1.default.isNotEmpty(info.mobile) && Utils_1.default.isNotEmpty(info.mail) && Utils_1.default.isNotEmpty(info.name)
                            && Utils_1.default.isNotEmpty(info.managerId) && Utils_1.default.isNotEmpty(info.workId) && Utils_1.default.isNotEmpty(info.status) && Utils_1.default.isNotEmpty(info.mobile))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).insert(info)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    ManagerMapper.prototype.list = function (begin, num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(begin > 0 && num > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).select().limit(num).off(begin)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    ManagerMapper.prototype.findByManagerIds = function (managerIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(managerIds && managerIds.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.conn(ManagerMapper.TABLE).select().where('managerId', 'in', managerIds)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    ManagerMapper.TABLE = "manager";
    return ManagerMapper;
}());
exports.default = ManagerMapper;
//# sourceMappingURL=ManagerMapper.js.map