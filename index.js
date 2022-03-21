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
var Koa = require('koa');
// 引入koa-bodyparser中间件，这个中间件可以将post请求的参数转为json格式返回
var bodyParser = require('koa-bodyparser');
var app = new Koa();
var Router_1 = require("./Router");
var router = new Router_1.default();
//console.log(datas)
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var start, e_1, ms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("#START;METHOD:[".concat(ctx.method, "]URL:[").concat(ctx.url, "]"));
                start = Date.now();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, next()];
            case 2:
                _a.sent();
                if (ctx.status == 404) {
                    ctx.body = "非礼勿视！";
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log("祸事了！祸事了！", e_1);
                ctx.body = "别慌，问题不大！";
                return [3 /*break*/, 4];
            case 4:
                ms = Date.now() - start;
                console.log("#END;METHOD:[".concat(ctx.method, "]URL:[").concat(ctx.url, "]TIME:[").concat(ms, "]"));
                return [2 /*return*/];
        }
    });
}); });
/*app.on('error', function(err){
    console.log("祸事了！祸事了！",err)
    //ctx.body="别慌，问题不大！";
});*/
// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json!!!!!!!!(注意要匹配路由器之前注册中间件，否则不管用)
app.use(bodyParser());
// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
app.use(router.router.routes(app));
app.listen(8080);
//# sourceMappingURL=index.js.map