const ioredis = require('ioredis')
const utils = require("../utils")

var redis = new ioredis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    db: 1
})

async function zincrby(key,member){
    var star ;
    if(!utils.isEmpty(key) && !utils.isEmpty(member)){
        await redis.zincrby(key,1,member).then((result) => {
            star = result;
        });
    }
    return star;
}

async function zscore(key,member){
    var star ;
    if(!utils.isEmpty(key) && !utils.isEmpty(member)){
        await redis.zscore(key,member).then((result) => {
            star = result;
        });
    }
    if(!star){
        star = 0
    }
    return star;
}

async function zpage(key,start,end){
    const result = {};
    if(!utils.isEmpty(key) && start >= 0 && end > start){
        await redis.zrange(key,start,end,'withscores').then((elements) => {
            for(var i=0;i<elements.length;i+=2){
                result[elements[i]] = elements[i+1];
            }
        });
    }
    return result;
}

exports.zincrby = zincrby;
exports.zpage = zpage;
exports.zscore = zscore;
