<template>
<div class="text-center page_footer">
    {{version}} © {{releaseDate}}
</div>
    
</template>

<style lang='scss' scoped>
    @import "../../assets/css/colors";
    .page_footer{
        background-color: $nav-bg-color;
        color: $white-color;
        font-size: 13px;
        padding: 3px;
        z-index: 2001;
        position: relative;
        
    }
   
</style>

<script>
    import {releaseDate, power, version} from "../../assets/js/constant"
    export default{
        data(){
            return {
                releaseDate,
                power,
                version
            }
        }
    }
</script>