<template>
    <div class="loginStyle">
        <div id="login-wrapper">
        <div class="flexContainer">
            <div style="flex:1"></div>
            <div class="loginContentStyle">
            <div id="login-box">
                <div id="center-logo-wrapper">
                <div class="loginTitle">
                    <span class="subTitle">
                        System Update
                    </span>
                </div>

                </div>
                <div id="login-message">{{$t('login.subTitle')}} {{documentTitle}}</div> <!-- 請自行填入適當訊息 -->
                <div id="login-form" ref="form">
                    <input id="login-username" type="text" class="form-control" placeholder="Username" maxlength="253" v-model="form.username">
                    <input id="login-pwd" type="password" class="form-control" placeholder="Password" minlength="8" v-model="form.password"
                    maxlength="20" @keyup.enter="handleSubmit()">
                </div>
                <label id="login-rememberme">
                    <input type="checkbox" v-model="checked">
                    <span class="noselect">{{$t('login.remember')}}</span>
                </label>
                <div id="login-btn" @click="handleSubmit()" v-loading="loading">
                    <span class="noselect">{{$t('login.login')}}</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
   
    import {loginApi} from '@/components/restfulapi/authApi'
    import handleResponse from "../restfulapi/handleResponse"
    import utils from "../../assets/js/utils"
    import {setSession, setLocal, getLocal, removeLocal, checkLocal} from "../../assets/js/storage"
    import {applicationTitle} from "../../assets/js/constant"
    export default {
        
        name: 'login',
        data() {
            const validateVerifycode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('login.verifycodeEmpty')))
                } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    callback(new Error(this.$t('login.verifycodeError')))
                } else {
                    callback()
                }
            }

            let validateName = (rule,value,callback)=>{
                let isValid = _g.verifyName(value)
                if(!isValid){
                    return callback(new Error (this.$t('global.verifyNameError')));
                }else{callback()};
            };

            let validatePwd = (rule,value,callback)=>{
                let isValid = _g.verifyPwd(value)
                if(!isValid){
                    return callback(new Error (this.$t('global.verifyPwdError')));
                }else{callback()};
            };

            let username="";
            let password="";
            let checked=false;
            if(checkLocal("aimlinkData")){
                try{
                    let aimlinkData = JSON.parse(getLocal("aimlinkData"))
                    if(aimlinkData.isRemember){
                        checked = aimlinkData.isRemember;
                        username = aimlinkData.username;
                        password = utils.decrypt(aimlinkData.password);
                    }
                }catch(e){
                    console.error(e);
                }
            }
            
            return {
                title: '',
                appTitle: applicationTitle,
                loading: false,
                redirectUrl: '',
                form: {
                    username: username,
                    password: password,
                    verifycode: '', 
                },

                rules2: {
                    username: [
                        { required: true, trigger: 'blur', validator: validateName}
                    ],
                    password: [
                        { required: true, trigger: 'blur', validator: validatePwd}
                    ],
                },
                checked: checked,
                loginIcon: "static/imgs/apphub.png?t="+Math.random(),
                documentTitle: ""
            }
        },
        methods: {
            handleSubmit() {
		        this.form.username = _g.trim(this.form.username);
                this.form.password = _g.trim(this.form.password);
                if(this.form.username&& this.form.password){
                    this.loading = true
                    loginApi(this.form.username, this.form.password).then((res) => {
                        this.loading = false;
                        handleResponse(res, (res) => {
                            if(res.code == "200"){
                                let aimlinkData = {};
                                aimlinkData.username = this.form.username;
                                aimlinkData.password = utils.encrypt(this.form.password);
                                if(this.checked){
                                    aimlinkData.isRemember = this.checked;
                                    setLocal("aimlinkData", aimlinkData);
                                }else{
                                    removeLocal("aimlinkData");
                                }
                                setSession("aimlinkData", aimlinkData);
                                cookie.setCookie("EIToken", res.data.accessToken, 60*8);
                                cookie.setCookie("apphub_username", this.form.username, 60*9);
                                cookie.setCookie("apphub_logintime", new Date().getTime(), 60*9);
                 
                                this.$router.replace({name:'main'});
                                

                            }else{
                                _g.handleError(res);
                            }
                        })
                    })
                }
            },
        },
        created(){
            if(this.$route.query.redirect){
                this.redirectUrl = this.$route.query.redirect;
            }
            this.documentTitle = document.title;
        },
    }
</script>
<style src='../../../static/ensaas_login/libs/bootstrap/css/bootstrap.min.css' scoped></style> 
<style src='../../../static/ensaas_login/css/wisepaas-login_template.css' scoped></style> 
<style src='../../../static/ensaas_login/css/wisepaas-login_template_login.css' scoped></style> 

<style lang="scss" scoped>
    @import "../../assets/css/colors";
    #center-logo{
        position: relative;
        top: -15px
    }
.verify-pos {
	position: absolute;
	right: 100px;
	top: 0px;
}
.card-box {
	padding: 20px;
	/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin-bottom: 20px;
	background-color: #F9FAFC;
	margin: 120px auto;
	width: 400px;
	border: 2px solid #8492A6;
    .login_btn{
        // background: #1A82C5;
        background: linear-gradient(to right top,  #1382c6,#004889)
    }
}

.title {
	margin: 0px auto 40px auto;
    text-align: center;
    h1{
        margin-bottom:5px;
        color: $primary-color;
    }
    p{
        color: $darkgray-color;
    }
}

.loginform {
	width: 350px;
	padding: 35px 35px 15px 35px;
}
.identifyInput{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 200px;
    vertical-align: top;
    margin-right: 6px;
} 
input::-webkit-input-placeholder{
    color: #c0c5d7;
}
::-moz-placeholder {
    color: #c0c5d7;
}
.refresh{
    color: #c0c5d7;
    vertical-align: middle;
    margin-left: 5px;
    margin-bottom: 22px;
    cursor: pointer
}

.loginTitle{
    .title{
        margin-left:10px;
        color: #09457D;
        font-family: 'Roboto';
        font-style: normal;
        font-weight:800;
        font-size: 30px;
    }  
    .subTitle{
        position:relative;
        left: -8px;
        display: inline-block;
        color: #1E86C2;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 32px;
    }
}
</style>