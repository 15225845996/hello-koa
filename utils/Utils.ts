export default class Utils {
    public static isEmpty(obj:any){
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return true;
        }else{
            return false;
        }
    }

    public static isNotEmpty(obj:any){
        return !Utils.isEmpty(obj)
    }
}
