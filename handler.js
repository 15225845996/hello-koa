const constant = require("./constant")
const moment = require('moment');

async function time(ctx) {
    const start = Date.now();
    /*while (true){//延时测试
        if(Date.now() - start > 1000){
            break;
        }
    }*/
    //ctx.throw(404, 'Not found')
    const result = {'time':moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
    ctx.response.body = result;
}

async function hello(ctx) {
    const query = ctx.query
    const name = query.name?query.name:'无名';
    ctx.response.body = {"name":name,"hello":'Hello,'+name+'!'}
}

async function users(ctx) {
    ctx.response.body = constant.getUsers();
};

async function getUserById(ctx) {
    const query = ctx.query;
    const userId = query.id;
    ctx.response.body = constant.getById(userId);
};

async function addUser(ctx) {
    var result = false;
    if(ctx.request.body.name && ctx.request.body.age){
        result = constant.addTemporary(ctx.request.body);
    }
    if(result){
        ctx.response.redirect('/api/users/list');
    }else{
        ctx.response.redirect('/view/addUser');
    }
};


exports.time=time;
exports.hello=hello;
exports.users = users;
exports.getUserById = getUserById;
exports.addUser = addUser;
