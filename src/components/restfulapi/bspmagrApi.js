import {apiGet, apiPost, apiPostfile, apiDelete, apiPut} from "../../assets/js/baseApi";



let deleteBspApi = function(rbid){
    return new Promise((resolve, reject) => {
        apiDelete('/v1/bsp/'+rbid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(error.response)
        })
    })
} 




let getBspsByPageApi = function({keywords, currentPage, limit}){
    let data = {
        keywords, 
        currentPage, 
        limit
    }
    return new Promise((resolve, reject) => {
        apiGet('/v1/bsp/byPage', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(error.response)
        })
    })
}

let rebootApi = function(){
    return new Promise((resolve, reject) => {
        apiPost('/v1/system/reboot').then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(error.response)
        })
    })
}
let getProcessApi = function(){
    return new Promise((resolve, reject) => {
        apiGet('/v1/system/process').then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(error.response)
        })
    })
}

let getIsUpdateApi = function(){
    return new Promise((resolve, reject) => {
        apiGet('/v1/system/isUpdate').then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(error.response)
        })
    })
}

export {
    getBspsByPageApi,
    deleteBspApi,
    rebootApi,
    getProcessApi,
    getIsUpdateApi

}
