const Router = require('koa-router');
const handler = require("./handler")
const fs = require("fs")

const router = new Router();

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<p>This is about page!</p>'
};

router.get("/api/time",handler.time)
    .get("/api/hello",handler.hello)
    .get("/api/users/list",handler.users)
    .get("/api/users",handler.getUserById)
    .post("/api/addUser",handler.addUser)
    .get("/view/addUser",async function(ctx) {
    ctx.response.body = fs.readFileSync("./views/addUser.html", "utf8")
    });

exports.router = router
