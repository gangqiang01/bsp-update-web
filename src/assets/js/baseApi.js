import Qs from "qs"
import swal from 'sweetalert'
import axios from 'axios'
import self from "../../main"

let cancelArr = [];
//intercept axios api 
axios.interceptors.request.use((config) => {
    // before send request
    if(config.method === "put"){
        // send msg to exec device
        config.timeout = 1000*30;
    }else if(config.method === "post"){
        if (config.isFileUpload) {
            config.timeout = 0;
        }else{
            config.timeout = 1000*30;
        }
    }else{
        config.timeout = 1000 * 1;
    }
    config.withCredentials = false;
    config.headers.Authorization = "Bearer "+cookie.getCookie("EIToken");
    config.cancelToken = new axios.CancelToken((cancel) => {
        cancelArr.push({cancel});
    })
    return config;
}, function (err){
    return Promise.reject(err);
});
axios.interceptors.response.use(
    response => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            swal("", self.$t('global.loginExpired'), "error").then((val) => {
                if (val) {
                    _g.doBeforeLoginout();
                    router.replace({
                        path: '/',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            });
        }
        return Promise.reject(error)
    }
)

let apiGet = function(url, object, config) {
    let geturl, fconfig;
    if(config == undefined){
        fconfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };
        
    }else{
        fconfig = config;
    }
    if(object){
        fconfig.params = object;
    }
    geturl = encodeURI(url);
    return new Promise((resolve, reject) => {
        axios.get(geturl, fconfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiGet]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiGet]"+err);
                resolve(err);
            }
            
        })
    })
}
let apiGetFile = function(url, object, config) {
    let geturl, fconfig;
    if(config == undefined){
        fconfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            timeout: 0
        };
        
    }else{
        fconfig = config;
    }

    geturl = encodeURI(url);
    return new Promise((resolve, reject) => {
        axios.get(geturl,{params: object, responseType: "blob", timeout: 0}, fconfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiGet]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiGet]"+err);
                resolve(err);
            }
        })
    })
}

let apiPost = function(url, data, config) {
    let fconfig;
    if(config == undefined){
        fconfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };
        
    }else{
        fconfig = config;
        data = Qs.stringify(data)
    }
    return new Promise((resolve, reject) => {
        axios.post(url, data, fconfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiPost]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiPost]"+err);
                resolve(err);
            }
        })
    })
}

let apiPostfile = function(url, data, config) {
    let fconfig;
    if(config == undefined){
        fconfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 0,
            isFileUpload: true  
        }
    }else{
         fconfig = {
            ...config,
            timeout: 0,  // 确保设置为永久等待
            isFileUpload: true  // 标记为文件上传
        };
    }
    return new Promise((resolve, reject) => {
        axios.post(url, data, fconfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiPostfile]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiPostfile]"+err);
                resolve(err);
            }
        })
    })
}

let apiDelete = function(url) {
    return new Promise((resolve, reject) => {
        axios.delete(url).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiDelete]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiDelete]"+err);
                resolve(err);
            }
        })
    })
}

let apiPut = function(url, data, config) {
    let fconfig;
    if(config == undefined){
        fconfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };
        
    }else{
        fconfig = config;
        data = Qs.stringify(data)
    }
    return new Promise((resolve, reject) => {
        axios.put(url, data, fconfig).then((response) => {
            resolve(response)
        }).catch((err) => {
            if(err.response){
                resolve(err.response);
            }else if(err.code === "ECONNABORTED" && err.message.indexOf('timeout') != -1){
                console.error("[apiPut]"+err.message);
                let msgData = {data: "request timeout"};
                resolve(msgData);
            }else{
                console.error("[apiPut]"+err);
                resolve(err);
            }
        })
    })
}


export {
    apiGet, 
    apiPost, 
    apiPostfile, 
    apiDelete, 
    apiPut, 
    apiGetFile,
    cancelArr
}
