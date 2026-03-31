
import swal from 'sweetalert'
import self from "../../main"
import router from '../../router'
let handleResponse = function(res, cb, errcb){
    _g.closeGlobalLoading();
    if(res === undefined){
        console.error("data is undefined")
        return;
    }
    if(res.status != 401){
        cb(res.data)
    }else{
        if(typeof(errcb) == 'function'){
            errcb()
        }
        handleError(res)
    }
};
let handleError = function(res) {
    switch (res.status) {
        case 401:
            swal("",self.$t('global.loginExpired'),"error").then((val) =>{
                if(val){
                    _g.loginOut();
                    router.replace({
                        path: '/',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                }
            });
            
            break
        default :
            console.log(res)
    }
}
export default handleResponse;