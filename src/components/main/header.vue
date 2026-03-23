<template>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"> -->
<div>
    <div class="nav-header">
        <ul class="nav-left pointer" >
            <li @click="collapse()">
                <i class="fa fa-bars collapseIcon pointer" aria-hidden="true" @click="collapseAsideNavbar()"></i> 
            </li>
            <li>
                <span  class="title">
                    {{productname}}
                </span>
            </li>

        </ul>
        <ul class="nav-right">
            <li> 
                <el-dropdown trigger="click" @command="switchLang">
                    <span class="el-dropdown-link">
                        <el-tooltip class="item"  :content="$t('header.language')" placement="bottom">
                            <i class="fa fa-globe pointer"></i> 
                        </el-tooltip>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="text-center" command="zh">
                            <p class="pointer">简体中文</p>
                        </el-dropdown-item>
                        <el-dropdown-item class="text-center" command="en">
                            <p class="pointer">English</p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </li>
            <li> 
                <el-dropdown trigger="click" >
                    <span class="el-dropdown-link">
                        <el-tooltip class="item" :content="$t('header.user')" placement="bottom">
                            <i class="fa fa-user-circle-o header-user pointer"></i> 
                        </el-tooltip>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="text-center" >
                            <img src="@/assets/imgs/face_black.png" alt="">
                            <p style="font-size: 23px"> {{username}}</p>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <b class="w-150">{{$t('header.lastAccessed')}}</b>{{logintime}}
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button type="warning" size="small" class="w-100p" @click="loginout()">
                                <i class="fa fa-sign-out c-white m-r-5" aria-hidden="true"></i>
                                {{$t('header.loginOut')}}
                            </el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </li>
            <li> 
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <el-tooltip class="item" effect="dark" :content="$t('header.about')" placement="bottom">
                            <i class="fa fa-exclamation-circle header-config pointer" aria-hidden="true"></i>
                        </el-tooltip>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span class="pointer config-item">
                                <i class="fa fa-exclamation-circle m-r-5 icon-left"></i>
                                {{version}}
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>  
            </li>
        </ul>
    </div>

</div>
</template>
<style lang="scss"  scoped>
    @import "../../assets/css/colors"; 
    //header font color and icon color
    $header_icon_color: #ffffff;
    //header background color
    $header_background:  #fff;
    .nav-header{
        height: 56px !important;
        box-sizing:border-box;
        background: $header_background;
        border-top: 8px solid;
        border-image-source: linear-gradient(90deg, #008CD6 0%, #004280 100%);
        border-image-slice: 1;
        display: -webkit-flex;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        padding:0 24px;
        box-shadow: 0px 2px 4px rgba(50, 50, 51, 0.3);
        position: relative;
        z-index: 1002;
        .nav-left{
            padding: 0;
            margin: 0;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding-top:2px;
            li{ 
                margin-right:10px;
                img{
                    // width: 320px;
                    height:56px;
                    position: relative;
                    top:-1px;
                }
                &:nth-child(1){
                    margin-right: 0;
                    width: 16px;
                    height: 16px;
                }
                color:#89898A;  
                .title {
                    margin-left: 10px;
                    color: #24a4ee;
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 800;
                    font-size: 25px;
                }
                .subTitle{
                    display: inline-block;
                    color: #323233;
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
        .nav-right{
            padding:0;
            margin:0;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            li{  
                vertical-align: middle;
                i{
                    color: #89898A;
                    font-size:1.5rem;
                    line-height: 56px;
                }
                margin-left: 16px;
                color: #89898A;  
            }                   
        }
    }
    .el-dropdown-menu__item.is-disabled{
        color: #606266;
    }
    .el-dropdown-menu__item{
        cursor: default;
    }

    .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #fff;
        color: #606266;
    }

    .user-manager{
        color: $primary-color;
        padding: 5px;
        cursor:  pointer !important;
    }

</style>
<script>

    import {mapState} from 'vuex'
    import {setLang} from '../../lang/lang'
    import handleResponse from '../restfulapi/handleResponse'
    import {getSession, setLocal, getLocal, removeLocal, checkLocal, setSession} from "../../assets/js/storage"
    import {applicationTitle, releaseDate, version} from "../../assets/js/constant.js"
    import {getUserByNameApi, resetPasswd} from "../restfulapi/userApi"

    const copy = require("clipboard-copy");

    export default{
        name: 'mainHeader',
        data(){
            let validateServerAddress = (rule,value,callback)=>{
                let reg=new RegExp(/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/);
                if(value&&!reg.test(value)){
                    return callback(new Error (this.$t('global.verifyServerAddress')))
                }else{callback()};
            };
            let validateUsername = (rule,value,callback)=>{
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
            return {
                formLabelWidth: "230px",
                img:"",
                loginstate: this.$t('header.loginOut'),
                username:'',
                logintime:'',
                devicecount:'',
                msgData: [],
                allowleft: "fa fa-long-arrow-left",
                allowright: "fa fa-bars",
                applicationTitle,
                releaseDate,
                version,
                role: "",
                resetPasswordForm: {
                    oldPwd: "",
                    newPwd: "",
                    confirmNewPwd: ""
                },
                productname:"System Update",
                isRepoShow:true
            }
        },

        props:{
            isCollapse: {
                type: Boolean,
                default: false
            }
        },

        methods:{
            managerUser(){
                this.$router.replace("/main/user/list");
            },

            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },

            getuserinfo(){
                this.username = cookie.getCookie("apphub_username");
                let logintime = cookie.getCookie("apphub_logintime");
                if(logintime){
                    this.logintime = this.$moment(parseInt(logintime)).format("YYYY-MM-DD HH:mm:ss");
                }
            },

            loginout(){
                this.$router.replace('/');
            },

            switchLang(lang){
                cookie.setCookie("link_lang", lang,  60*24*30*6);
                setLang(lang);
            },
            collapseAsideNavbar(){
                this.$emit("collapseAsideNavbar", "")
            },
        },
        computed: {
            ...mapState({
                repoState:"repoState"
            }),
        },
        created(){
            this.getuserinfo();  
        },

       
    }
</script>

