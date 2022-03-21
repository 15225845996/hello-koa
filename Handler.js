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
var RedisClient_1 = require("./redis/RedisClient");
var RedisConfig_1 = require("./redis/RedisConfig");
var Constant_1 = require("./Constant");
var ManagerMapper_1 = require("./dao/ManagerMapper");
var DataConfig_1 = require("./dao/DataConfig");
var Utils_1 = require("./utils/Utils");
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.list = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var pageNum, pageSize, start, end, starInfo, managerIds, maragers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1;
                        pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10;
                        if (pageSize <= 0 || pageSize >= 1000) {
                            pageSize = 10;
                        }
                        if (pageNum <= 0) {
                            pageNum = 1;
                        }
                        start = (pageNum - 1) * pageSize;
                        end = start + pageSize - 1;
                        return [4 /*yield*/, Handler.REDIS_CLIENT.zpage(Constant_1.default.MANAGER_STAR_KEY, start, end)];
                    case 1:
                        starInfo = _a.sent();
                        managerIds = Object.keys(starInfo);
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.findByManagerIds(managerIds)];
                    case 2:
                        maragers = _a.sent();
                        maragers.forEach(function (item, index) {
                            item.likeCount = starInfo[item.managerId];
                        });
                        maragers = maragers.sort(function (x, y) {
                            return x.likeCount - y.likeCount;
                        });
                        ctx.response.body = maragers;
                        return [2 /*return*/];
                }
            });
        });
    };
    Handler.prototype.updateByMobile = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var managerInfo, num;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        managerInfo = ctx.request.body;
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.updateByMobile(managerInfo)];
                    case 1:
                        num = _a.sent();
                        if (num >= 1) {
                            ctx.response.body = managerInfo;
                        }
                        else {
                            ctx.response.body = {};
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Handler.prototype.add = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var result, managerInfo, isExist, managers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        managerInfo = ctx.request.body;
                        isExist = false;
                        if (!Utils_1.default.isNotEmpty(managerInfo.mobile)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.findByMobile(managerInfo.mobile)];
                    case 1:
                        managers = _a.sent();
                        isExist = Utils_1.default.isNotEmpty(managers) && managers.length >= 1;
                        _a.label = 2;
                    case 2:
                        if (!!isExist) return [3 /*break*/, 4];
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.add(managerInfo)];
                    case 3:
                        _a.sent();
                        result = managerInfo;
                        _a.label = 4;
                    case 4:
                        ctx.response.body = result;
                        return [2 /*return*/];
                }
            });
        });
    };
    Handler.prototype.findByMobile = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var query, mobile, managers, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = ctx.query;
                        mobile = query.mobile;
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.findByMobile(mobile)];
                    case 1:
                        managers = _b.sent();
                        if (!(!managers || managers.length == 0)) return [3 /*break*/, 2];
                        result = this.mobileNotFound();
                        return [3 /*break*/, 4];
                    case 2:
                        result = managers[0];
                        _a = result;
                        return [4 /*yield*/, Handler.REDIS_CLIENT.zscore(Constant_1.default.MANAGER_STAR_KEY, result.managerId)];
                    case 3:
                        _a.likeCount = _b.sent();
                        _b.label = 4;
                    case 4:
                        ctx.response.body = result;
                        return [2 /*return*/];
                }
            });
        });
    };
    Handler.prototype.starByMobile = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var query, mobile, managers, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = ctx.query;
                        mobile = query.mobile;
                        return [4 /*yield*/, Handler.MANAGER_MAPPER.findByMobile(mobile)];
                    case 1:
                        managers = _b.sent();
                        if (!(!managers || managers.length == 0)) return [3 /*break*/, 2];
                        result = this.mobileNotFound();
                        return [3 /*break*/, 4];
                    case 2:
                        result = managers[0];
                        _a = result;
                        return [4 /*yield*/, Handler.REDIS_CLIENT.zincrby(Constant_1.default.MANAGER_STAR_KEY, result.managerId)];
                    case 3:
                        _a.likeCount = _b.sent();
                        _b.label = 4;
                    case 4:
                        ctx.response.body = result;
                        return [2 /*return*/];
                }
            });
        });
    };
    Handler.prototype.mobileNotFound = function () {
        return { error: { message: '手机号不存在' } };
    };
    Handler.REDIS_CLIENT = new RedisClient_1.default(new RedisConfig_1.default('127.0.0.1', 6379, 1));
    Handler.MANAGER_MAPPER = new ManagerMapper_1.default(new DataConfig_1.default('127.0.0.1', "3306", "root", "123456", "koa", true));
    return Handler;
}());
exports.default = Handler;
//# sourceMappingURL=Handler.js.map