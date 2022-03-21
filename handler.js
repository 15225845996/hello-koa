const constant = require("./constant")
const moment = require('moment');
const managerMapper = require('./dao/ManagerMapper')
const utils = require("./utils")
const redis = require('./redis/RedisClient')


async function findByMobile(ctx) {
    const query = ctx.query
    const mobile = query.mobile;
    //处理数据库必须有一处是阻塞状态，等待数据处理完成
    var resultInfo = await managerMapper.findByMobile(mobile);
    if(!resultInfo || resultInfo.length == 0){
        resultInfo = mobileNotFound();
    }else{
        resultInfo = resultInfo[0];
        resultInfo.likeCount = await redis.zscore(constant.MANAGER_STAR_KEY,resultInfo.managerId)
    }

    ctx.response.body = resultInfo;
}



async function starByMobile(ctx){
    const query = ctx.query
    const mobile = query.mobile;
    //处理数据库必须有一处是阻塞状态，等待数据处理完成
    var resultInfo = await managerMapper.findByMobile(mobile);
    if(!resultInfo || resultInfo.length == 0){
        resultInfo = mobileNotFound();
    }else{
        resultInfo = resultInfo[0];
        resultInfo.likeCount = await redis.zincrby(constant.MANAGER_STAR_KEY,resultInfo.managerId)
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
    var start = (pageNum-1)*pageSize;
    var end = start + pageSize -1;
    var starInfo = await redis.zpage(constant.MANAGER_STAR_KEY,start,end);
    var managerIds = Object.keys(starInfo);
    var list = await managerMapper.findByManagerIds(managerIds)
    list.forEach(function (item,index) {
        item.likeCount = starInfo[item.managerId];
    })
    list = list.sort(function (x,y) {
        return x.likeCount - y.likeCount
    })

    ctx.response.body = list;
}



function mobileNotFound(){
    return {error: {message: '手机号不存在'}};
}



exports.findByMobile=findByMobile;
exports.starByMobile=starByMobile;
exports.list=list;
