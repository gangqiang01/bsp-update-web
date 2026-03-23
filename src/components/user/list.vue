<template>
	<div>
        <div class="m-t-10 ">
            <p class="header-line"><i class="fa fa-sliders c-blue m-r-10" aria-hidden="true"></i>
            {{$t('user.userList')}}
            </p>
        </div>
		<div class="cf panel-header">
            <div class="fr m-r-10">
                <el-input 
                size="small" class="w-250 m-l-10" 
                v-model="keywords" :placeholder="$t('user.keyword')" 
                @keyup.enter.native="search"
                @input="search"
                suffix-icon="el-icon-search"> 
                </el-input>
            </div>
        </div>
		<el-table
		:data="tableData"
		style="width: 100%"
        class="card-shadow"
        v-loading="listloading">
            <el-table-column
            label=""
            width="60"
            >
                <template slot-scope="scope">
                    <div>
                        <i class="fa fa-user c-primary" style="fontSize: 21px" ></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
			:label="$t('user.userName')"
			prop="name"
			min-width="80">
			</el-table-column>
            <el-table-column
			:label="$t('user.email')"
			prop="email"
			min-width="150">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.email}}
                        <i class="el-icon-edit c-primary pointer p-5" @click="editClick(scope.row.name, 'email')" v-show="role==0"></i> 
                    </div>
                </template>
			</el-table-column>

			<el-table-column
			:label="$t('user.create')"
			min-width="150">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.ts|time}}
                    </div>
                </template>
			</el-table-column>
      
			<el-table-column
			:label="$t('user.role')"
			min-width="150">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.role|roleFunc}}
                        <i class="el-icon-edit c-primary pointer p-5" @click="editClick(scope.row.name, 'role')" v-show="scope.row.role != 0 && role==0"></i> 
                    </div>
                </template>
			</el-table-column>
            <el-table-column
                :label="$t('global.action')"
                min-width="165"
                align="center">
                <template slot-scope="scope">
                    <el-button 
                        size="mini" 
                        type="danger"
                        @click="deleteUser(scope.row.uid)"
                        :disabled="(scope.row.role!=2 && role!=0)|| scope.row.role==0"
                        >
                        {{$t('global.delete')}}
                    </el-button>
                </template>
            </el-table-column>
		</el-table>
   
		<div class="p-t-20 fr">
			<div>
				<el-pagination
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:page-size="limit"
				:current-page="currentPage"
				:total="dataCount"
                 v-show="isshow">
				</el-pagination>
			</div>
		</div>
        <el-button  
            size="small" 
            @click="dialogAddUserVisible=true" 
            type="primary" 
            class="fl m-t-10 cf m-b-20">
            {{$t('global.add')}}
        </el-button>
        <el-dialog :visible.sync="dialogAddUserVisible" @close="initForm" width="45%" :close-on-click-modal="false">
             <div slot="title" class="dialog-title">
                <i class="fa fa-plus-square-o m-r-10" aria-hidden="true"></i>
                {{$t('user.addUser')}}
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="m-l-30">
                <el-form-item :label="$t('label.userName')" :label-width="formLabelWidth" prop="username" >
                    <el-input size="small" v-model="form.username" autocomplete="off" style="width: 320px" :placeholder="$t('user.userName')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.password')" :label-width="formLabelWidth" prop="password">
                    <el-input size="small" v-model="form.password" autocomplete="off" style="width: 320px" :placeholder="$t('user.password')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.email')" :label-width="formLabelWidth" prop="email">
                    <el-input size="small" v-model="form.email" autocomplete="off" style="width: 320px" :placeholder="$t('user.email')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.isReport')" :label-width="formLabelWidth">
                    <el-switch
                        v-model="form.isReport">
                    </el-switch>
                </el-form-item>
                <el-form-item :label="$t('label.userRole')" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.addRole">
                        <!-- <el-radio  label="0">{{$t('user.administrator')}}</el-radio> -->
                        <el-radio  label="2">{{$t('user.generalUser')}}</el-radio>
                        <el-radio  label="1" v-show="role!=1">{{$t('user.superUser')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>           
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogAddUserVisible = false">{{$t('global.cancel')}}</el-button>
                <el-button size="small" type="primary" @click="addUser()" :loading="btnLoading">{{$t('global.add')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogEditUserRoleVisible" @close="closeEditDialog" width="45%" :close-on-click-modal="false">
             <div slot="title" class="dialog-title">
                <i class="fa fa-plus-square-o m-r-10" aria-hidden="true"></i>
                {{$t('user.editUserRole')}}
            </div>
            <el-form ref="editForm" :model="editForm" :rules="rules" label-width="130px" class="m-l-30">
                <el-form-item :label="$t('label.userName')" :label-width="formLabelWidth" prop="username" >
                    <el-input size="small" v-model="editForm.username" autocomplete="off" style="width: 320px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.userRole')" :label-width="formLabelWidth">
                    <el-radio-group v-model="editForm.role">
                        <!-- <el-radio  label="0">{{$t('user.administrator')}}</el-radio> -->
                        <el-radio  label="2">{{$t('user.generalUser')}}</el-radio>
                        <el-radio  label="1" v-show="role == 0">{{$t('user.superUser')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditUserRoleVisible = false">{{$t('global.cancel')}}</el-button>
                <el-button size="small" type="primary" @click="updateRole()">{{$t('global.save')}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogEditEmailVisible" @close="closeEmailDialog" width="42%" :close-on-click-modal="false">
             <div slot="title" class="dialog-title">
                <i class="fa fa-plus-square-o m-r-10" aria-hidden="true"></i>
                {{$t('user.editEmail')}}
            </div>
            <el-form ref="emailForm" :model="emailForm" :rules="emailrules" label-width="130px" class="m-l-30">
                <el-form-item :label="$t('label.userName')" :label-width="formLabelWidth" prop="username" >
                    <el-input size="small" v-model="emailForm.username" autocomplete="off" style="width: 320px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.email')" :label-width="formLabelWidth" prop="email">
                   <el-input size="small" v-model="emailForm.email" autocomplete="off" style="width: 320px" :placeholder="$t('user.email')"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogEditEmailVisible = false">{{$t('global.cancel')}}</el-button>
                <el-button size="small" type="primary" @click="updateEmail()">{{$t('global.save')}}</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
    import {
        getAllUserInfoApi, 
        deleteUserApi, 
        addUserApi, 
        getUserByNameApi, 
        updateUserByNameApi, 
        updateEmailApi
    } from "../restfulapi/userApi"
    import handleResponse from "../restfulapi/handleResponse"
    import {getSession} from "../../assets/js/storage"

    export default {
        data() {
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

            let validateEmail = (rule,value,callback)=>{
                let reg=new RegExp(/^([a-zA-Z]|[0-9])(\w|\-|\.|_|\s)+@[a-zA-Z0-9\.\-_\s]+\.([a-zA-Z\.]{2,6})$/);
                if(!reg.test(value)){
                    return callback(new Error (this.$t('global.verifyEmailError')))
                }else{callback()};
            };
            return {
                tableData: [],
                dataCount: null,
                currentPage: 1,
                keywords: '',
                multipleSelection: [],
                limit: 10,
                dialogAddUserVisible:false,
                dialogEditUserRoleVisible: false,
                formLabelWidth: "130px",
                isshow: false,
                form: {
                    username: '',
                    password: '',
                    addRole: "2",
                    email: '',
                    isReport:true
                },
                rules: {
                    username: {validator: validateName, trigger: 'blur'},
                    password: {validator: validatePwd, trigger: 'blur'},
                    email: {validator: validateEmail, trigger: 'blur'},
                },
                editForm: {
                    username: '',
                    role: "0"
                },
                role: "",
                btnLoading: false,

                dialogEditEmailVisible: false,
                emailForm: {
                    username: '',
                    email: ""
                },
                emailrules: {
                    email: {validator: validateEmail, trigger: 'blur'},
                },
                listloading: false
            }
        },
        methods: {
            getRole(){
                let uname = cookie.getCookie("apphub_username")
                if(uname){
                    getUserByNameApi(uname).then((res) => {
                        handleResponse(res, (data) => {
                            if(_g.isObject(data)){
                                this.role = data.data.role;
                            }
                        })
                    })
                }
            },

            search() {
                let reg=new RegExp(/^[a-zA-Z0-9\.\-_]{0,24}$/);
                if(!reg.test(this.keywords)){
                    this.$swal("", this.$t('global.keywordsInfo'), "info", {button: this.$t('global.confirm')})
                    return;
                }
                this.currentPage = 1;
                this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: this.currentPage }})
            },
            handleCurrentChange(currentPage) {
                if(currentPage){
                    this.currentPage = currentPage;
                }else{
                    this.currentPage = 1
                }
                this.$router.push({ path: this.$route.path, query: { keywords: this.keywords, currentpage: this.currentPage }})
            },

            editClick(uname, type){
                getUserByNameApi(uname).then((res) => {
                    handleResponse(res, (data) => {
                        if(_g.isObject(data)){
                            if(type=="email"){
                                this.emailForm.email = data.data.email;
                                this.emailForm.username = data.data.name;
                                this.dialogEditEmailVisible = true;
                            }else{
                                this.editForm.role = data.data.role+"";
                                this.editForm.username = data.data.name;
                                this.dialogEditUserRoleVisible = true;
                            }
                        }
                    })
                })
            },

            updateRole(){
                this.listloading = true;
                updateUserByNameApi(this.editForm.username, this.editForm.role).then((res) => {
                    this.listloading = false;
                    handleResponse(res, (data) => {
                        if(data.status == "success"){
                            this.dialogEditUserRoleVisible = false;
                            this.$swal("",this.$t('global.success'),"success", {button: this.$t('global.confirm')}).then(() => {
                                this.getAllUsers();
                            });
                        }
                    })
                })
            },

            updateEmail(){
                this.$refs.emailForm.validate((valid) => {
                   if(valid){
                        this.listloading = true;
                        updateEmailApi(this.emailForm.username, this.emailForm.email).then((res) => {
                            this.listloading = false;
                            handleResponse(res, (data) => {
                                if(data.status == "success"){
                                    this.dialogEditEmailVisible = false;
                                    this.$swal("",this.$t('global.success'),"success", {button: this.$t('global.confirm')}).then(() => {
                                        this.getAllUsers();
                                    });
                                }
                            })
                        })
                   }
                })
               
            },
            closeEmailDialog(){
                this.emailForm={
                    username: "",
                    email: ""
                }
            },

            closeEditDialog(){
                this.editForm = {
                    username: '',
                    role: "0"
                };
            },

            deleteUser(uid) {
                _g.swalInfoDo(this.$t('global.areYouSure'), this.$t('global.delete'), this.$t('global.confirm'), this.$t('global.cancel')).then((result) => {
                    if(result){
                        deleteUserApi(uid).then((res) => {
                            handleResponse(res, (data) => {
                                if(data.status === "success"){
                                    this.$swal("",this.$t('global.success'),"success", {button: this.$t('global.confirm')}).then(() => {
                                        this.getAllUsers();
                                    })
                                }
                                
                            })
                        })
                    }
                })
               
            },

            getAllUsers() {
                const data = {
                    keywords: this.keywords,
                    currentpage: this.currentPage,
                    limit: this.limit
                }
                this.listloading = true;
                getAllUserInfoApi(data).then((res) => {
                    this.listloading = false;
                    handleResponse(res, (data) => {
                        if(_g.isArray(data.data)){
                            this.tableData = data.data;
                            this.dataCount = data.count;
                            this.isshow = this.dataCount > this.limit;
                        }
                    })
                })
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

            getKeywords() {
                let data = this.$route.query
                if (data) {
                    if (data.keywords) {
                        this.keywords = data.keywords
                    }else {
                        this.keywords = ''
                    }
                }
            },

           addUser() {
               this.$refs.form.validate((valid) => {
                   if(valid){
                        this.btnLoading = true;
                        addUserApi(this.form).then((res) => {
                            this.btnLoading = false;
                            handleResponse(res, (data) => {
                                this.dialogAddUserVisible = false;
                                if(data.status === "success"){
                                    this.$swal("",this.$t('global.success'),"success", {button: this.$t('global.confirm')}).then(() => {
                                        this.getAllUsers();
                                    })
                                }else{
                                    _g.handleError(data);
                                }
                                this.initForm();
                            })
                        })
                    }
               })
            },

            initForm(){
                this.form.username = "";
                this.form.password = "";
                this.form.addRole =  "2";
                this.form.email = '';
            },

            init() {
                this.getKeywords()
                this.getCurrentPage()
                this.getAllUsers()
            }
        },
        created() {
            this.init();
        },
        watch: {
            '$route' (to, from) {
                this.init()
            }
        },
    }
</script>