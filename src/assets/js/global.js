
import swal from 'sweetalert'
import router from '../../router'
const commonFn = {
    shallowRefresh(name){
        router.replace({path: '/home/refresh', query: {name: name}})
    },

    j2s(obj) {
        return JSON.stringify(obj)
    },
    closeGlobalLoading() {
        setTimeout(() => {
        store.dispatch('showLoading', false)
        }, 0)
    },
    openGlobalLoading() {
        setTimeout(() => {
        store.dispatch('showLoading', true)
        }, 0)
    },

    onlineDeviceCount(val){
        store.dispatch('onlineDeviceCount', val)
    },
    licenseStatusCount(val){
        store.dispatch('licenseStatusCount', val)
    },

    swalWarnDo(title= "Are You Sure?", subject, confirmButtonText="confirm", cancelButtonText="cancel"){
        return swal({
            title,
            text: subject,
            icon: "warning",
            buttons: true,  
            dangerMode: true,
            buttons: [ cancelButtonText, confirmButtonText]
        })
    },

    swalSuccessDo(title= "Are You Sure?", subject,  confirmButtonText="confirm", cancelButtonText="cancel"){
        return swal({
            title,
            text: subject,
            icon: "success",
            buttons: true,  
            dangerMode: true,
            buttons: [ cancelButtonText, confirmButtonText]
        })
    },

    swalErrorDo(title= "Are You Sure?", subject,  confirmButtonText="confirm", cancelButtonText="cancel"){
        return swal({
            title,
            text: subject,
            icon: "error",
            buttons: true,  
            dangerMode: true,
            buttons: [ cancelButtonText, confirmButtonText]
        })
    },

    swalInfoDo(title= "Are You Sure?", subject,  confirmButtonText="confirm", cancelButtonText="cancel"){
        return swal({
            title,
            text: subject,
            icon: "info",
            buttons: true,  
            dangerMode: true,
            buttons: [ cancelButtonText, confirmButtonText]
        })
    },

    isObject(subject){
        if(Object.prototype.toString.call(subject) === "[object Object]"){
            return true;
        }else{
            return false;
        }
    },

    isArray(array){
        if(Object.prototype.toString.call(array) === "[object Array]"){
            return true;
        }else{
            return false;
        }
    },

    getIdArrayFromData(data, tid){
        let tidArray = [];
        data.forEach((res) => {
            tidArray.push(res[tid])
        })
        return tidArray
    },

    handleError(res, cb){
        if(res.status != undefined){
            let msg = res.data == undefined ? res.error: res.data;
            if(cb){
                swal("", msg, "error").then(() => {
                    cb()
                })
            }else{
                swal("", msg, "error")
            }
        }else{
            if(cb){
                swal("", res, "error").then(() => {
                    cb()
                })
            }else{
                swal("", res, "error")
            }
        }
    },
    //loginout 
    loginOut(){
        cookie.setCookie("EIToken",'',0);
        cookie.setCookie("apphubRefreshToken",'',0);
        cookie.setCookie("apphub_username", '', 0);
        cookie.setCookie("apphub_logintime", '', 0);
        window.clearInterval(_g.timer);
        _g.timer = null;
    },
     timer: null,
    // trim string
    trim(str){
        return str.replace(/^\s+|\s+$/g,"");
    },

    verifyName(name){
        let reg=new RegExp(/^(?![\._\-\s\\@])[\u4E00-\u9FA5A-Za-z0-9_\-\.\s\\@]{1,32}$/);
        if(reg.test(name)){
            return true;
        }else{
            return false;
        }
    },
    verifyDescription(description){
        let reg=new RegExp(/[\s]{2,}/);
        if(reg.test(description)){
            return false;
        }else if(description.length>256|| description.length<0){
            return false;
        }else{
            return true;
        }
    },

    verifyPwd(pwd){
        let reg=new RegExp(/^[A-Za-z0-9_\-\.\s@&$#]{3,32}$/);
        if(!reg.test(pwd)){
            return false;
        }else{
            return true;
        };
    }
}

export default commonFn
