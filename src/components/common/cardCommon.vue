<template>
    <div class="card-box">
        <div class="card" v-if="isShowAdd">
            <div class="card-add-body" @click="addClick">
                <i class="fa fa-plus fa-3x " aria-hidden="true"></i>
                <p class="productname">{{addProductname}}</p>
            </div>
        </div>
        <div v-for="(item, index) in data" class="card pointer" 
            v-if="isAllShow|| typeArray.indexOf(item[typeKey])> -1">
            <div  class="card-body" @click="bodyClick(item)">
                <div class="body-left text-center">
                    <slot name="card-body-img" :item= "item"></slot>
                </div>
                <div class="body-right">
                    <p class="title">
                        <slot name="card-body-title" :item= "item"></slot>
                    </p>
                    <p class="desc">
                        <slot name="card-body-desc" :item= "item"></slot>
                    </p>
                </div>
            </div>
            <div class="card-footer">
                <span class="footer-left">
                    <slot name="card-footer-left" :item= "item"></slot>
                </span>
                <span class="footer-right">
                    <slot name="card-footer-right" :item= "item"></slot>
                </span>
            </div>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
    @import "../../assets/css/colors";
    .card-box{
        .card:hover{
            border: 1px solid #019FF3;
            box-shadow: 0px 3px 12px 0px rgba(1, 159, 243, 0.36);
        }
        @media (max-width: 1024px){
            .card{  
                width: -webkit-calc((100% - 10px * 2) / 3);
                width: -moz-calc((100% - 10px * 2) / 3);          
                width: calc((100% - 10px * 2) / 3);
                &:nth-child(3n) {
                    margin-right: 0
                }
            }
        } 
        @media (min-width: 1025px) and (max-width:1680px){
            .card{  
                width: -webkit-calc((100% - 10px * 3) / 4);
                width: -moz-calc((100% - 10px * 3) / 4);          
                width: calc((100% - 10px * 3) / 4);
                &:nth-child(4n) {
                    margin-right: 0
                }
            }
        } 
        @media (min-width: 1681px) {
            .card{    
                width: -webkit-calc((100% - 10px * 4) / 5);
                width: -moz-calc((100% - 10px * 4) / 5);        
                width: calc((100% - 10px * 4) / 5);
                &:nth-child(5n) {
                    margin-right: 0
                }
            }
        } 
        .card {
            background: #FFFFFF;
            border: 1px solid  #CADAE6;
            box-shadow: 0px 3px 8px 0px rgba(2, 72, 109, 0.15);
            margin: 10px 10px 0 0;
            padding: 10px;
            box-sizing: border-box;
            .card-body{
                height: 125px;
                display: flex;
                flex-direction: row; 
                justify-content: flex-start;
                .body-left{
                    flex-basis: 40%;
                    vertical-align: middle;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .body-right{
                    flex-basis: 60%;
                    color: #38474E;
                    text-align: left;
                    margin-top:10px;
                    .title{
                        font-size: 18px;
                        font-family: Arial;
                        font-weight: bold;
                        
                    }
                    .desc{
                        margin-top: 10px;
                        font-size: 12px;
                        font-family: Arial;
                        font-weight: 400;
                        line-height: 18px;
                        opacity: 0.6;
                    }
                }
            }
            .card-footer{
                height: 30px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                .footer-left{
                    float: left;
                }
                .footer-right{
                    float: right;
                }
            }
            
            .card-add-body{
                height:130px;
                flex: 1;
                z-index: 0; /* back on .desc */
                text-align: center;
                margin: 10px;
                border: 1px dashed #C7CFD9;
                cursor: pointer;
                .productname{
                    margin-top: 10px;
                    font-size: 16px;
                    font-family: Arial;
                    font-weight: 400;
                    color: #019FF3;
                }
                i{
                    margin-top: 25px;
                    color: $primary-color;
                }
            }
           
           
        }
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
</style>
<script>
export default {
    data() {
        return {
            
        }
    },

    props: {
        //all data
        data: {
            default: [],
            type: Array
        },

        isShowAdd: {
            default: false,
            type: Boolean
        },

        width: {
            default: "300px",
            type: String
        },
        height: {
            default: "170px",
            type: String
        },
        headerBg:{
            default: "#ffffff",
            type: String
        },
        
        imgUrl: {
            default: "",
            type: String
        },

        addProductname: {
            default: "Add",
            type: String
        },

        // if show all item
        isAllShow: {
            default: true,
            type: Boolean
        },
        //if condition show item
        typeArray: {
            default: ()=>[],
            type: Array
        },
        //if condition key show item
        typeKey: {
            default: "",
            type: String
        },
    },

    methods: {
        addClick(){
            this.$emit("addCard")
        },
        bodyClick(item){
            this.$emit("clickBody", item)
        }
    },

}
</script>

