<template>
    <div class="wrapper" >
        <home-header :isCollapse="isCollapse" @collapseAsideNavbar="collapse"></home-header>
        <div class="body">
            <!-- <div class="menu">
                <el-menu 
                    :default-active="activeItem" 
                    class="el-menu-vertical"  
                    :unique-opened="isUnique"
                    :collapse="isCollapse">
                    <router-link to="/main/os/list">
                        <el-menu-item index="os">
                            <i class="fa fa-microchip m-r-10 icon-left"></i>
                            <span slot="title">{{$t('home.os')}}</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </div> -->
            <div  >
                    <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div> 
    </div>

</template>


<style lang='scss'>
.el-menu{
    .el-menu-item{
        height: 46px;
        line-height: 46px;
    } 
    .el-submenu:not(.is-active){
        .el-submenu__title{
            height: 46px;
            line-height: 46px;
            .el-submenu__icon-arrow{
                color: rgba(0,0,0,.85);
            }
        }
        .el-submenu__title:hover {
            background: linear-gradient(90deg, #FFFFFF, #80CEF8);
            color: #38474e !important;
            i{
            color: #38474e !important;  
            }
        }
    } 
    .el-submenu.is-active{
        .el-submenu__title{
            background-color: #008cd6;
            color: #fff;
            height: 46px;
            line-height: 46px;
            i{
                color: #fff;  
            }
        } 
        .el-submenu__title:hover {
             background-color: #008cd6;
            // font-weight: 700;
            color: #fff;
            height: 46px;
            line-height: 46px;
            i{
                color: #fff;  
            }
            svg path{
                fill: #fff;
            }
        }
    }
}
    
</style>
<style lang='scss' scoped>
    @import "../assets/css/colors";
    $nav-icon-color : $primary-color; 
    $header-height : 56px;
    $aside-width : 256px;

    .wrapper{
        display: -webkit-flex;
        display: flex;
        height: 100vh;
        flex-flow: column nowrap;
        .body{
            display: -webkit-flex;
            flex: 1 1 auto;
            height: -webkit-calc(100% - 56px);
            height: -moz-calc(100% - 56px);
            height: calc(100% - 56px);
            display: flex;
            flex-flow: row nowrap;
            background: #E4ECF2;
            .menu{
                // border-top: 2px solid #E4ECF2;
                box-sizing: border-box;
                // box-shadow: 0px 0px 14px 0px rgba(2, 72, 109, 0.2);
                background: linear-gradient(0deg, #E6EDF3, #FFFFFF) !important;
                ul{
                    padding-top: 20px;
                    background: linear-gradient(0deg, #E6EDF3, #FFFFFF) !important;
                }
                height: 100%; 
                overflow-y: auto;
                overflow-x: hidden;
                span:hover{
                    text-decoration: none !important;
                }
                .el-menu>a>.el-menu-item:hover{
                    outline: 0;
                    background-color: #008cd6;
                    color: #fff !important;
                    i{
                        color: #fff;
                    }
                    svg path{
                        fill: #fff;
                    }
                }
                .el-menu>a>.el-menu-item.is-active{
                    background-color: #008cd6;
                    font-weight: 700;
                    color: #fff !important;
                    svg path{
                        fill: #fff;
                    }
                }
                //关闭侧边栏
                .el-menu-vertical:not(.el-menu--collapse){
                    @media (max-width: 1024px){
                        width: 210px;
                    } 
                    @media (min-width: 1025px) and (max-width:1680px){
                        width: 230px;
                    } 
                    @media (min-width: 1681px) {
                        width: $aside-width;
                    } 
                }
                .el-menu{
                    height: 100%; 
                    box-sizing: border-box;
                    i {
                        display: inline-block;                    
                    } 
                    .el-submenu{
                        .el-menu-item-group{
                            .el-menu-item.is-active{
                                background: linear-gradient(90deg, #FFFFFF, #80CEF8);
                                border-right: 4px solid #008cd6;
                                color: #008cd6 !important;
                            }
                            .el-menu-item:hover {
                                outline: 0;
                                background: linear-gradient(90deg, #FFFFFF, #80CEF8);
                                color: #303133 !important;
                                i{
                                    color:  #909399 !important;
                                }
                            }
                        }
                        
                    }
                    
                }
                .el-menu--collapse{
                    height: 100%;
                }
            }
            .content{
                flex:1;
                padding-bottom: 0;
                margin-right: 0;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                .fade-enter-actice, .fade-leave-active{
                    transition: opacity .5s
                } 
                .fade-enter, .fade-leave-active{
                    opacity: 0;
                }
                .content-box{
                    @media (max-width: 1024px){
                        padding: 0 5px 0 5px;
                    } 
                    @media (min-width: 1025px) and (max-width:1680px){
                        padding: 0 10px 0 10px;
                    } 
                    @media (min-width: 1681px) {
                        padding: 0 20px 0 20px;
                    } 
                }
            }
        }

        
    }

    
</style>

<script>
    import {mapState} from 'vuex'
    import homeHeader from './main/header'
    import homeFooter from './main/footer'

    export default {
        name: 'home',
        data() {
            return {
                defaultIconColor:"#909399",
                activeIconColor: "#fff",
                subActiveIconColor: "#019FF3",
                isCollapse: false,
                activeItem: 'productList',
                isUnique: true,
            };
        },
        methods: {
            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },
        },

        created(){
            this.activeItem = this.$route.meta.menuName;
        },

        computed: {
            ...mapState({
                showLoading: "globalLoading",
            })
        },

        watch: {
            $route(to, from){
                this.activeItem = to.meta.menuName;
            },
        },
        components:{
            homeHeader,
            homeFooter
        },
    }
</script>