<template>
    <div class="bsp-box">
        <div>
            <p class="title">
                {{$t('home.os')}}
            </p>
        </div>
        <div class="center"> 
            <uploader
                browse_button="browse_button"
                :url="this.server_config+'/v1/upload/chunk'"
                chunk_size="5MB"
                :max_retries="3"
                :multi_selection="false"
                :filters="{prevent_duplicates:true}"
                :FilesAdded="filesAdded"
                :BeforeUpload="beforeUpload"
                @inputUploader="inputUploader"
                :Error="handleError"
            />

            <div class="uploadBtn">
                <el-button
                size="mini"
                type="primary"
                id="browse_button"
                :disabled="tableDataChange()"
                class="m-r-10"
                >
                <i class="fa fa-cloud-upload m-r-5"></i>
                {{$t('upload.uploadFile')}}
                </el-button>
                <!-- <span class="note">
                    <i>{{$t('bspmagr.note')}}</i>
                    {{$t('bspmagr.noteOsContent')}}
                </span> -->
            </div>
            <br />
            <el-table :data="tableData" style="width: 100%; margin: 10px 0;">
                <el-table-column :label="$t('upload.fileName')">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('upload.fileSize')">
                    <template slot-scope="scope">
                        <span>{{scope.row.size|size}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="MD5">
                    <template slot-scope="scope">
                        <span>{{scope.row.md5}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('upload.uploadStatus')">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === -1">{{$t('upload.calculated')}}</span>
                        <span v-if="scope.row.status === 1" class="c-primary">{{$t('upload.completed')}}</span>
                        <span v-if="scope.row.status === 4" class="c-danger">ERROR:{{scope.row.errormsg}}</span>
                        <span
                        v-if="scope.row.status === 5"
                        class="c-success"
                        >{{$t('upload.success')}}</span>
                        <el-tooltip
                        :content="$t('bspmagr.pkgSizeInfo')"
                        placement="top"
                        v-if="scope.row.status === 6"
                        >
                        <span class="c-danger">{{$t("upload.fileTooLarge")}}</span>
                        </el-tooltip>
                        <el-tooltip
                        :content="$t('bspmagr.pkgInfo')"
                        placement="top"
                        v-if="scope.row.status === 7"
                        >
                        <span class="c-danger">{{$t("upload.formatError")}}</span>
                        </el-tooltip>
                    
                        <el-progress
                        v-if="scope.row.status === 2"
                        :text-inside="true"
                        :stroke-width="20"
                        :percentage="scope.row.percent"
                        ></el-progress>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('upload.action')">
                    <template slot-scope="scope">
                        <el-button
                        size="small"
                        type="danger"
                        @click="deleteFile(scope.row.id)"
                        >{{$t('upload.delete')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p>
                <span class="note">
                    <i>{{$t('global.note')}}</i>
                    {{$t('global.addNotLeaveInfo')}}
                </span>
            </p>
            <br />
            <el-button size="small" @click="back()">{{$t('upload.back')}}</el-button>
            <el-button
                size="small"
                type="primary"
                :disabled="submitBtnDisabled"
                @click="start()"
            >{{$t('upload.upload')}}</el-button>
            <el-button
                size="small"
                type="success"
                :disabled="uploadBtnDisabled"
                @click="update()"
            >{{$t('global.updateSystem')}}</el-button>
                
        </div>
        <el-dialog :visible.sync="dialogProcessVisible" :close-on-click-modal="false"  width="45%">
            <div class=content>
                <div class="waiting" v-show="isWaiting">
                    {{$t('upload.rebooting')}}
                </div>
                <div class="process" v-show="!isWaiting">
                    <p class="updateing">
                        {{$t('upload.updating')}}
                    </p>
                    <el-progress        
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="process"
                    ></el-progress>
                </div>
               
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogProcessVisible = false" size="small">
                    {{$t('global.cancel')}}
                </el-button>
                <el-button type="primary" @click="confirmResetPwd()" size="small">
                    {{$t('global.confirm')}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang='scss' scoped>
@import "../../assets/css/colors";
$subContentColor: #606266;
.bsp-box {
    position: relative; 
    top: 20px;
}
.center {
    position: absolute;
    width: 70%;
    top: 300px;
    left: 50%;
    transform: translate(-50%, -50%);
}
.process, .waiting {
    text-align: center;
    font-size: 18px;
}
.title {
    text-align: center;
    font-weight: 800;
    font-size: 24px;
    color:#004889;
}
.bspInput {
  min-height: 40px;
  width: 80%;
  min-width: 380px;
}
.bspSelect {
  height: 40px;
  width: 80%;
  min-width: 380px;
}
.uploadBtn {
  display: inline-block;
  text-align: left;
  input[type="file"] {
    display: none;
  }
  .fileList {
    font-size: 14px;
    color: $subContentColor;
  }

  .exp{
      cursor: pointer;
      color: #aaa;
      display: inline-block;
      padding: 10px;
      font-size: 14px;
  }
}
.quill-editor{
    width: 80%;
    background: #FFFFFF;
}
</style>

<script>
import handelResponse from "../restfulapi/handleResponse";
import FileMd5 from "../../models/file-md5.js";
import Uploader from "../Uploader";
import { bspMaxLength, linuxOs, maxTagCount} from "../../assets/js/constant";
import {uploadServerUrl} from "../../assets/js/config"
import {rebootApi, getProcessApi} from "../restfulapi/bspmagrApi.js";


export default {
    name: "bspmagrAdd",
    data() {
        let validateDes = (rule,value,callback)=>{
            let isValid = _g.verifyDescription(value)
            if(!isValid){
                return callback(new Error (this.$t('global.verifyDescriptionError')));
            }else{callback()};
        };
        return {
            server_config: uploadServerUrl,
            submitBtnDisabled: false,
            uploadBtnDisabled: true,
            dialogProcessVisible: false,
            isWaiting: true,
            up: {},
            files: [],
            tableData: [],
            file_form: {
            },
            file_rules: {
                description: {
                    // required: true,
                    validator: validateDes,
                    trigger: "blur"
                },
            },
            dialogVisible: false,
            process: 0,
        };
    },
    components: {
        uploader: Uploader,
    },
    methods: {
        handleError(up, errorInfo){
            let response = JSON.parse(errorInfo.response);
            if(response.status == "error"){
                let file = errorInfo.file;
                this.files.forEach((item, index) => {
                    if(item.id == file.id){
                        this.files[index].errormsg = response.data;
                    }
                })
            }else{
                let response = JSON.parse(errorInfo.response);
                let file = errorInfo.file;
                this.files.forEach((item, index) => {
                    if(item.id == file.id){
                        let msg = response.message;
                        this.files[index].errormsg = msg.substring(msg.lastIndexOf(".")+1);
                    }
                })
            }
        },

        tableDataChange() {
            if (this.tableData.length == 1) {
                return true;
            } else {
                return false;
            }
        },

        inputUploader(up) {
            this.up = up;
            this.files = up.files;
        },
        filesAdded(up, files) {
            files.forEach(f => {
                f.status = -1;
                FileMd5(f.getNative(), (e, md5) => {
                    f["md5"] = md5;
                    f.status = 1;
                });
            });
        },
        deleteFile(id) {
            let file = this.up.getFile(id);
            this.up.removeFile(file);
            this.submitBtnDisabled = false;
            this.uploadBtnDisabled = true;
        },
        beforeUpload(up, file) {
            up.setOption("multipart_params", {
                size: file.size,
                md5: file.md5,
                os: linuxOs,
            });
        },

        start() {
            if(this.tableData.length == 0){
                this.$message({
                    message: this.$t("upload.emptyFileInfo"),
                    type: 'warning'
                });
                return;
            }
            let flag = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].status == -1) {
                flag = true;
                break;
                }
            }
            if (flag) {
                this.$message({
                    message: this.$t("upload.calculated"),
                    type: 'warning'
                });
                return;
            }
            this.up.start();
             
        },
        back() {
            let flag = false;
            for (var i = 0; i < this.tableData.length; i++){
                if (this.tableData[i].status == 2) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                this.$message({
                    message: this.$t('global.addNotLeaveInfo'),
                    type: 'warning'
                });
                return;
            }
            this.$router.push("/main/linuxOs/list");
        },
        update(){
            rebootApi().then(res => {
                handelResponse(res, (data) => {
                    if(data.code == 200){
                        this.dialogProcessVisible = true;
                        interval = setInterval(() => {
                            this.getProcess();
                        }, 1000);
                    }
                });
            })
        },
        getProcess(){
            getProcessApi().then(res => {
                handelResponse(res, (data) => {
                    if(data.code == 200){
                        this.isWaiting = false;
                        this.process = data.data;
                    }else{
                        this.isWaiting = true;
                    }
                });
            })
        }
    },

    watch: {
        files: {
            handler() {
                this.tableData = [];
                this.uploadBtnDisabled = true;
                this.submitBtnDisabled = false;

                this.files.forEach(e => {
                    let filename = e.name;
                    let isMatch = false;
                    if(filename.indexOf(".img") > -1||filename.indexOf(".zip") > -1||filename.indexOf(".tar") > -1){
                        isMatch = true;
                    }
                    if (!isMatch) {
                        this.submitBtnDisabled = true;
                        this.tableData.push({
                        name: e.name,
                        size: e.size,
                        md5: e.md5,
                        status: 7,
                        id: e.id,
                        percent: e.percent,
                        errormsg: ""
                        });
                    }else if (e.size > bspMaxLength) {
                        this.submitBtnDisabled = true;
                        this.tableData.push({
                        name: e.name,
                        size: e.size,
                        md5: e.md5,
                        status: 6,
                        id: e.id,
                        percent: e.percent,
                        errormsg: ""
                        });
                    } else {
                        let percent = e.percent;
                        if(e.percent>95){
                            percent = 98;
                        }
                        let errormsg = e.errormsg?  e.errormsg: "";
                        this.tableData.push({
                        name: e.name,
                        size: e.size,
                        md5: e.md5,
                        status: e.status,
                        id: e.id,
                        percent: percent,
                        errormsg: errormsg
                        });
                    }
                    if(e.status == 1){
                        this.submitBtnDisabled = false;
                    }else{
                        this.submitBtnDisabled = true;
                    }  
                    if(e.status == 5){
                        this.uploadBtnDisabled = false;
                    }else{
                        this.uploadBtnDisabled = true;
                    } 
                });
            },

            deep: true
        },
       
    },
    created() {
        // this.getAllRepos();
    }
};
</script>
