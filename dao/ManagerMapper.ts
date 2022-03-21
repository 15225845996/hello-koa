import knex = require("knex");
import DataConfig from "./DataConfig";
import Utils from "../utils/Utils";
import ManagerInfo from "../entry/ManagerInfo";

export default class ManagerMapper {
    private static TABLE:string = "manager";
    // @ts-ignore
    private conn:knex;
    constructor(public config:DataConfig) {
        // @ts-ignore
        this.conn = new knex({
            client:"mysql",
            version: '8.0',
            connection:{
                host:config.host,
                port:config.port,
                user:config.user,
                password:config.password,
                database:config.database
            },
            debug:config.enableDebug,
            log:{
                debug(message){
                    console.log("EXECUTE:"+message.sql)
                }
            }
        })
    }

    public async findByMobile(mobile:string){
        if(Utils.isNotEmpty(mobile)){
            return await this.conn(ManagerMapper.TABLE).where('mobile','=',mobile);
        }
        return null;
    }

    public async updateByMobile(info:ManagerInfo){
        if(Utils.isNotEmpty(info) && Utils.isNotEmpty(info.mobile)){
            return await this.conn(ManagerMapper.TABLE).where('mobile','=',info.mobile).update(info)
        }
    }

    public async delByMobile(mobile:string){
        if(Utils.isNotEmpty(mobile)){
            return await this.conn(ManagerMapper.TABLE).where('mobile','=',mobile).del();
        }
        return null;
    }

    public async add(info:ManagerInfo){
        if(Utils.isNotEmpty(info) && Utils.isNotEmpty(info.mobile) && Utils.isNotEmpty(info.mail) && Utils.isNotEmpty(info.name)
            && Utils.isNotEmpty(info.managerId) && Utils.isNotEmpty(info.workId) && Utils.isNotEmpty(info.status) && Utils.isNotEmpty(info.mobile)){
            return await this.conn(ManagerMapper.TABLE).insert(info);
        }
        return null;
    }

    public async list(begin:number,num:number){
        if(begin > 0 && num > 0){
            return await this.conn(ManagerMapper.TABLE).select().limit(num).off(begin);
        }
        return null;
    }

    public async findByManagerIds(managerIds:string[]){
        if(managerIds && managerIds.length > 0){
            return await this.conn(ManagerMapper.TABLE).select().where('managerId','in',managerIds)
        }
        return null;
    }
}
