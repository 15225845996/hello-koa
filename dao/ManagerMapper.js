const knex = require("./DataExecuter")
const utils = require("../utils")

const table = 'manager';

function findByMobile(mobile) {
    if(mobile){
        return knex.conn(table).where('mobile','=',mobile);
    }
    return null;
}


function updateByMobile(mobile,detail) {
    if(mobile){
        return knex.conn(table).where('mobile','=',mobile).update(detail)
    }
    return null;
}


function delByMobile(mobile) {
    if(mobile){
        return knex.conn(table).where('mobile','=',mobile).del();
    }
    return null;
}

function add(detail) {
    if(!utils.isEmpty(detail.mobile) && !utils.isEmpty(detail.managerId) && !utils.isEmpty(detail.name) && !utils.isEmpty(detail.mail) && !utils.isEmpty(detail.workId)){
        return knex.conn(table).insert(detail);
    }
    return null;
}


function list(begin,num) {
    if(begin >= 0 && num > 0){
        return knex.conn(table).select().limit(num).offset(begin);
    }
    return null;
}

function findByManagerIds(managerIds) {
    if(managerIds && managerIds.length > 0){
        return knex.conn(table).select().where('managerId','in',managerIds)
    }
    return null;
}


exports.findByMobile = findByMobile;
exports.updateByMobile = updateByMobile;
exports.list = list;
exports.add = add;
exports.delByMobile = delByMobile;
exports.findByManagerIds = findByManagerIds;
