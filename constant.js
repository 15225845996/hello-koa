var users = [
    {'id':1,'name':'秦皇','age':2000},
    {'id':2,'name':'汉武','age':2000},
    {'id':3,'name':'唐宗','age':2000},
    {'id':4,'name':'宋祖','age':2000},
];

var MANAGER_STAR_KEY = "MANAGER_STAR"

function getById(id){
    if(id){
        return users.find(function (item,index) {
            return item.id == id;
        })
    }
}

function getUsers(){
    return users;
}

function addTemporary(user){
    if(users.length < 100 && user.name && user.age){
        user.id = users.length+1;
        users.push(user)
        return true;
    }
    return false;
}


exports.getById = getById;
exports.getUsers = getUsers;
exports.addTemporary = addTemporary;
exports.MANAGER_STAR_KEY = MANAGER_STAR_KEY;
