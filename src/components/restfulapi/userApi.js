import {apiGet, apiPost, apiDelete} from "../../assets/js/baseApi";

let resetPasswd = function(username, oldPwd,  newPwd){
    return new Promise((resolve, reject) => {
        let data = {
            username: username,
            oldpasswd: oldPwd,
            newpasswd: newPwd
        }
        apiPost('/user/resetPasswd', data).then((data) => {
            resolve(data)
        }).catch((err) => {
            resolve(err.response)
        })
    })
}
let updateEmailApi = function(username, email){
    return new Promise((resolve, reject) => {
        let data = {
            username: username,
            email,
        }
        apiPost('/user/updateEmail', data).then((data) => {
            resolve(data)
        }).catch((err) => {
            resolve(err.response)
        })
    })
}
let addUserApi = function(form){
    return new Promise((resolve, reject) => {
        let data = {
        name: form.username,
        passwd: form.password,
        role: form.addRole,
        email: form.email,
        isReport: form.isReport
        }
        apiPost('/user', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let getUserByNameApi = function(username){
    let data = {
        username: username
    }
    return new Promise((resolve, reject) => {

        apiGet('/user/byname', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let deleteUserApi = function(uid){
    return new Promise((resolve, reject) => {

        apiDelete('/user/'+uid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let getAllUserInfoApi = function(data){
    return new Promise((resolve, reject) => {
        apiGet('/user', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let getUserInfoApi = function(uid){
    return new Promise((resolve, reject) => {

        apiGet('/user/'+uid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let setBlobConfigApi = function(data){
    return new Promise((resolve, reject) => {
        apiPost("/configMap", data).then((data) =>{
            resolve(data);
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let deleteAllApi = function(){
    return new Promise((resolve, reject) => {
        apiDelete("/user/deleteAll").then((data) => {
            resolve(data);
        }).catch((error) => {
            resolve(error.response);
        })
    })
}

let getBlobConfigApi = function(){
    return new Promise((resolve, reject) => {
        apiGet("/configMap").then((data) =>{
            resolve(data);
        }).catch((error) => {
            resolve(err.response)
        })
    })   
}

let updateUserByNameApi = function(username, role){
    let data = {
        username: username,
        role: role
    }
    return new Promise((resolve, reject) => {

        apiPost('user/byname', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    getAllUserInfoApi,
    deleteUserApi,
    getUserInfoApi,
    addUserApi,
    setBlobConfigApi,
    deleteAllApi,
    getBlobConfigApi,
    getUserByNameApi,
    resetPasswd,
    updateUserByNameApi,
    updateEmailApi
}