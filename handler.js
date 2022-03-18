const constant = require("./constant")
const moment = require('moment');
const managerMapper = require('./dao/ManagerMapper')
const utils = require("./utils")


async function findByMobile(ctx) {
    const query = ctx.query
    const mobile = query.mobile;
    //处理数据库必须有一处是阻塞状态，等待数据处理完成
    var resultInfo = await managerMapper.findByMobile(mobile);
    if(!resultInfo || resultInfo.length == 0){
        resultInfo = mobileNotFound();
    }else{
        resultInfo = resultInfo[0];
    }

    ctx.response.body = resultInfo;
}



async function updateByMobile(ctx){
    const body = ctx.request.body
    const mobile = body.mobile;
    const name = body.name;
    const mail = body.mail;
    var resultInfo = mobileNotFound();
    if(mobile && (name || mail)){
        const num = await managerMapper.updateByMobile(mobile,ctx.request.body);
        if(num == 1){
            resultInfo = await managerMapper.findByMobile(mobile);
        }
        console.log("update:"+resultInfo)

    }
    ctx.response.body = resultInfo;
}

async function delByMobile(ctx){
    const query = ctx.query
    const mobile = query.mobile;
    var resultInfo;
    if(mobile){
        resultInfo = await managerMapper.findByMobile(mobile);
        if(resultInfo.length == 1){
            await managerMapper.delByMobile(mobile)
        }

    }
    if(!resultInfo || resultInfo.length == 0){
        resultInfo = mobileNotFound()
    }
    ctx.response.body = resultInfo;
}


async function add(ctx){
    const body = ctx.request.body
    var resultInfo = {};
    if(!utils.isEmpty(body.mobile) & !utils.isEmpty(body.managerId) & !utils.isEmpty(body.name) & !utils.isEmpty(body.mail) & !utils.isEmpty(body.workId)){
        const result = await managerMapper.add(ctx.request.body);
        //不报错就插进去了
        resultInfo = ctx.request.body;
    }
    ctx.response.body = resultInfo;
}


async function list(ctx){
    var pageNum = ctx.query.pageNum?ctx.query.pageNum:1;
    var pageSize = ctx.query.pageSize?ctx.query.pageSize:10;
    if(pageSize <= 0 || pageSize >= 1000){
        pageSize = 10;
    }
    if(pageNum <= 0){
        pageNum = 1;
    }
    ctx.response.body = await managerMapper.list((pageNum-1)*pageSize,pageSize);;
}



function mobileNotFound(){
    return {error: {message: '手机号不存在'}};
}



exports.findByMobile=findByMobile;
exports.updateByMobile=updateByMobile;
exports.delByMobile=delByMobile;
exports.list=list;
exports.add=add;
