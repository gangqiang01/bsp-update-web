import {apiGet, apiPost, apiPostfile, apiDelete} from "../../assets/js/baseApi";



let deleteBspApi = function(rbid){
    return new Promise((resolve, reject) => {
        apiDelete('/v1/bsp/'+rbid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
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
            resolve(err.response)
        })
    })
}


export {
    getBspsByPageApi,
    deleteBspApi
}
