const Router = require('koa-router');
const handler = require("./handler")
const fs = require("fs")

const router = new Router();

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<p>This is about page!</p>'
};

router.get("/manager/findByMobile",handler.findByMobile);
router.get("/manager/starByMobile",handler.starByMobile);
router.get("/manager/list",handler.list);

exports.router = router
