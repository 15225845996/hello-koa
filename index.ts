const Koa = require('koa');
// 引入koa-bodyparser中间件，这个中间件可以将post请求的参数转为json格式返回
const bodyParser = require('koa-bodyparser');
const app = new Koa();


import Router from "./Router";

let router = new Router();
//console.log(datas)

app.use(async (ctx, next) => {
    console.log(`#START;METHOD:[${ctx.method}]URL:[${ctx.url}]`)
    const start = Date.now();
    try{
        await next();
        if(ctx.status == 404){
            ctx.body="非礼勿视！";
        }
    } catch (e) {
        console.log("祸事了！祸事了！",e)
        ctx.body="别慌，问题不大！";
    }
    const ms = Date.now() - start;
    console.log(`#END;METHOD:[${ctx.method}]URL:[${ctx.url}]TIME:[${ms}]`)
});

/*app.on('error', function(err){
    console.log("祸事了！祸事了！",err)
    //ctx.body="别慌，问题不大！";
});*/

// 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json!!!!!!!!(注意要匹配路由器之前注册中间件，否则不管用)
app.use(bodyParser());

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
app.use(router.router.routes(app));



app.listen(8080);
