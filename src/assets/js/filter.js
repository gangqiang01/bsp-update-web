import Vue from 'vue'
import moment from 'moment';
import self from "../../main"

export default (function () {
    Vue.filter("time", (value) => { 
        if(value){
            return moment(value).format("YYYY-MM-DD HH:mm:ss")
        }else{
            return "";
        }
    })

    

    Vue.filter("size", (value) =>{
        const num = Number(value);
        if(!isNaN(num)&&value>-1){
            if(value > 1024*1024*1024){
                return (value/(1024 * 1024 * 1024)).toFixed(2) + "GB";
            } else if(value > 1024*1024){
                return (value/(1024 * 1024)).toFixed(2) + "MB";
            }else {
                return (value/(1024)).toFixed(2) + "KB";
            }
            
        }
        return "N/A";
    })
    Vue.filter("md5", (value) =>{
        if(value){
            return "Calculating..."
        }
        return value;
    })

    Vue.filter("none", (value) =>{
        if(value == null || value == ''){
            return "None";
        } else {
            return value;
        }
    })

    Vue.filter("roleFunc", (value) => {
        let val = parseInt(value); 
        switch (val){
            case 0:
            return self.$t('header.administrator');
            case 3:
            return self.$t('header.administrator');
            case 1:
            return self.$t('header.superUser');
            case 2:
            return self.$t('header.generalUser');
            default:
            return "";
        }
    })

})()
