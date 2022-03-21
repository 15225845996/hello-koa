const koaRouter = require('koa-router');
const fs = require("fs")
import Handler from "./Handler";

let handler = new Handler();

export default class Router {
    public router;
    constructor() {
        this.router = new koaRouter()
        this.router.get("/manager/list",handler.list);
        this.router.get("/manager/findByMobile",handler.findByMobile);
        this.router.get("/manager/starByMobile",handler.starByMobile);
        this.router.post("/manager/updateByMobile",handler.updateByMobile);
        this.router.post("/manager/add",handler.add);
    }
}
