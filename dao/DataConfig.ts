export default class DataConfig {
    public host:string;
    public port:string;
    public user:string;
    public password:string;
    public database:string;
    public enableDebug:boolean;


    constructor(host:string,port:string,user:string,password:string,database:string,enableDebug:boolean) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
        this.enableDebug = enableDebug;
    }
}
