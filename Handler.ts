import RedisClient from './redis/RedisClient'
import RedisConfig from "./redis/RedisConfig";
import Constant from "./Constant";
import ManagerMapper from "./dao/ManagerMapper";
import DataConfig from "./dao/DataConfig";
import ManagerInfo from "./entry/ManagerInfo";
import Utils from "./utils/Utils";

export default class Handler {
    public static REDIS_CLIENT:RedisClient = new RedisClient(new RedisConfig('127.0.0.1',6379,1));
    public static MANAGER_MAPPER:ManagerMapper = new ManagerMapper(new DataConfig('127.0.0.1',"3306","root","123456","koa",true));

    public async list(ctx){
        let pageNum:number = ctx.query.pageNum?ctx.query.pageNum:1;
        let pageSize:number = ctx.query.pageSize?ctx.query.pageSize:10;
        if(pageSize <= 0 || pageSize >= 1000){
            pageSize = 10;
        }
        if(pageNum <= 0){
            pageNum = 1;
        }
        let start:number = (pageNum-1)*pageSize;
        let end:number = start + pageSize -1;
        let starInfo = await Handler.REDIS_CLIENT.zpage(Constant.MANAGER_STAR_KEY,start,end);
        let managerIds:string[] = Object.keys(starInfo);
        let maragers:ManagerInfo[] = await Handler.MANAGER_MAPPER.findByManagerIds(managerIds)
        maragers.forEach(function (item,index) {
            item.likeCount = starInfo[item.managerId];
        })
        maragers = maragers.sort(function (x,y) {
            return x.likeCount - y.likeCount
        })

        ctx.response.body = maragers;
    }

    public async updateByMobile(ctx){
        let managerInfo:ManagerInfo = ctx.request.body;
        let num:number = await Handler.MANAGER_MAPPER.updateByMobile(managerInfo)
        if(num >= 1){
            ctx.response.body = managerInfo;
        }else{
            ctx.response.body = {};
        }
    }

    public async add(ctx) {
        let result: any = {};
        let managerInfo: ManagerInfo = ctx.request.body;
        let isExist: boolean = false;
        if (Utils.isNotEmpty(managerInfo.mobile)) {
            let managers: ManagerInfo[] = await Handler.MANAGER_MAPPER.findByMobile(managerInfo.mobile);
            isExist = Utils.isNotEmpty(managers) && managers.length >= 1;
        }
        if (!isExist) {
            await Handler.MANAGER_MAPPER.add(managerInfo)
            result = managerInfo;
        }
        ctx.response.body = result;
    }

    public async findByMobile(ctx){
        let query = ctx.query;
        let mobile = query.mobile;
        let managers:ManagerInfo[] = await Handler.MANAGER_MAPPER.findByMobile(mobile);
        let result:any;
        if(!managers || managers.length == 0){
            result = this.mobileNotFound();
        }else{
            result = managers[0];
            result.likeCount = await Handler.REDIS_CLIENT.zscore(Constant.MANAGER_STAR_KEY,result.managerId)
        }
        ctx.response.body = result;
    }

    public async starByMobile(ctx){
        let query = ctx.query;
        let mobile = query.mobile;
        let managers:ManagerInfo[] = await Handler.MANAGER_MAPPER.findByMobile(mobile);
        let result:any;
        if(!managers || managers.length == 0){
            result = this.mobileNotFound();
        }else{
            result = managers[0];
            result.likeCount = await Handler.REDIS_CLIENT.zincrby(Constant.MANAGER_STAR_KEY,result.managerId)
        }
        ctx.response.body = result;
    }

    private mobileNotFound(){
        return {error: {message: '手机号不存在'}};
    }

}
