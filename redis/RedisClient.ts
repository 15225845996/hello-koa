import ioredis = require("ioredis");
import Utils from "../Utils/Utils";
import RedisConfig from "./RedisConfig";

export default class RedisClient {
    private redisInstance: ioredis;

    constructor(config:RedisConfig) {
        this.redisInstance = new ioredis({
            host:config.host,
            port:config.port ,
            db:config.db
        })
    }


    public async zincrby(key:string,member:string){
        let star:number = -1;
        if(!Utils.isEmpty(key) && !Utils.isEmpty(member)){
            await this.redisInstance.zincrby(key,1,member).then((result) => {
                star = result;
            });
        }
        return star;
    }

    public async zscore(key:string,member:string){
        var star:number = 0 ;
        if(!Utils.isEmpty(key) && !Utils.isEmpty(member)){
            await this.redisInstance.zscore(key,member).then((result) => {
                star = result;
            });
        }
        return star;
    }

    public async zpage(key:string,start:number,end:number){
        let result = {};
        if(!Utils.isEmpty(key) && start >= 0 && end > start){
            await this.redisInstance.zrange(key,start,end,'withscores').then((elements) => {
                for(var i=0;i<elements.length;i+=2){
                    result[elements[i]] = elements[i+1];
                }
            });
        }
        return result;
    }

}
