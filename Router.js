"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koaRouter = require('koa-router');
var fs = require("fs");
var Handler_1 = require("./Handler");
var handler = new Handler_1.default();
var Router = /** @class */ (function () {
    function Router() {
        this.router = new koaRouter();
        this.router.get("/manager/list", handler.list);
        this.router.get("/manager/findByMobile", handler.findByMobile);
        this.router.get("/manager/starByMobile", handler.starByMobile);
        this.router.post("/manager/updateByMobile", handler.updateByMobile);
        this.router.post("/manager/add", handler.add);
    }
    return Router;
}());
exports.default = Router;
//# sourceMappingURL=Router.js.map