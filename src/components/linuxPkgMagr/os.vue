<template>
	<div>
		<div>
            <p class="header-line"><i class="fa fa-sliders c-blue m-r-10" aria-hidden="true"></i>{{$t('bspmagr.bspList')}}</p>
        </div>
		<div class="cf panel-header">
            <div class="fr m-r-10"> 
                <el-input 
                size="small" class="w-250 m-l-10" 
                v-model="keywords" :placeholder="$t('bspmagr.keyword')" 
                @keyup.enter.native="search"
                @input="search"
                suffix-icon="el-icon-search"> 
                </el-input>
            </div>
        </div>
		<el-table
		:data="tableData"
		style="width: 100%"
        @selection-change="selectItem"
        v-loading="listLoading"
        class="card-shadow"
		>
            <!-- <el-table-column
                type="selection"
                min-width="50">
             </el-table-column> -->
            <el-table-column
            label=""
            width="70"
            >
                <template slot-scope="scope">
                    <img src="@/assets/imgs/linux-os.png" alt="no img">
                </template>
            </el-table-column>
            <el-table-column
                prop="filename"
                :label="$t('upload.fileName')"
                min-width="100"
                >
            </el-table-column>  
            <el-table-column 
                :label="$t('upload.fileSize')"
                prop="size">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.size|size}}
                    </div>
                </template>
                
             </el-table-column>  
            <el-table-column
                prop="md5"
                label="MD5"
                min-width="110"
                >
            </el-table-column>
            <el-table-column
            :label="$t('bspmagr.createTime')"
			min-width="115">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.updateTimeStamp|time}}
                    </div>
                </template>
			</el-table-column>
            
            <el-table-column
                :label="$t('bspmagr.action')"
                v-if="repoState"
                width="180">
                <template slot-scope="scope">
                    <div>
                        <el-button-group>
                            <el-button size="mini" type="danger" @click="confirmDelete(scope.row)"  >{{$t('global.delete')}}</el-button>
                        </el-button-group>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="p-t-20 p-b-20 cf">
            <div class="fl" v-if="repoState">
                <el-button size="small" @click="showAddDialog" type="primary">{{$t("global.add")}}</el-button> 
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .quill-editor{
        background: #FFFFFF;
    }
</style>
<script>
    import { 
        getBspsByPageApi,
    deleteBspApi} from "../restfulapi/bspmagrApi"
    import handleResponse from "../restfulapi/handleResponse"
    import {getSession, setLocal, getLocal, removeLocal, checkLocal, setSession} from "../../assets/js/storage"
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                dataCount: 1,
                currentPage: 1,
                limit: 10,
                keywords: '',
                isshow: false,
                listLoading: false,
                loading: false,
                dialogVisible: false,
                btnLoading: false,
            }
        },
        methods: {

            closeDialogViseble(){
                this.dialogVisible = false;
            },
            
            search() {
                this.currentPage = 1;
                this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, currentPage: this.currentPage }})
            },
            //batch selected
            selectItem(val) {
                this.multipleSelection = val;
            },

            getKeywords() {
                let data = this.$route.query
                if (data) {
                    if (data.keywords) {
                        this.keywords = data.keywords
                    } else {
                        this.keywords = ''
                    }
                }
            },
            getCurrentPage() {
                let data = this.$route.query
                if (data) {
                    if (data.currentpage) {
                        this.currentPage = parseInt(data.currentpage)
                    } else {
                        this.currentPage = 1
                    }
                }
            },
            handleCurrentChange(currentPage) {
                if(currentPage){
                    this.currentPage = currentPage;
                }else{
                    this.currentPage = 1
                }
                this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, currentPage: this.currentPage }})
            },
            confirmDelete(item) {
                _g.swalInfoDo(this.$t('global.areYouSure'), this.$t('global.delete'), this.$t('global.confirm'), this.$t('global.cancel')).then((isDelete) => {
                    if(isDelete){
                        _g.openGlobalLoading();
                        deleteBspApi(item.id).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.code === 200){
                                    this.$swal("", this.$t('global.success'), 'success').then(() => {
                                        this.getAllBsps();
                                    })
                                }else{
                                    _g.handleError(data);
                                }
                                
                            })
                        })
                    }   
                })
            },

            getAllBsps() {
                const data = {
                    keywords: this.keywords,
                    currentPage: this.currentPage,
                    limit: this.limit
                }
                this.listLoading = true;
                getBspsByPageApi(data).then((res) => {
                    this.listLoading = false;
                    handleResponse(res, (data) => {
                        if(data.code === 200){
                        
                            this.tableData = data.data.list;
                            this.dataCount = data.total;
                            this.isshow = this.dataCount > this.limit;
                        }
                    })
                })
            }, 

            showAddDialog(){
                this.$router.push("/main/linuxOs/add");
            },  

            checkResult(val){
                if(val === "success"){
                    this.getAllBsps();
                }
            },
            init() {
                this.getCurrentPage(),
                this.getKeywords(),
                this.getAllBsps()
            
            },
        },     
        created() {
            this.init();
        },

        watch: {
            '$route' (to, from) {
                this.init()
            },
            cloudConfig(){
                this.getConfig();
            }
        },

        computed: {
            ...mapState({
                cloudConfig: "cloudConfig",
                repoState:"repoState"
            }),  
        },
    }
</script>
