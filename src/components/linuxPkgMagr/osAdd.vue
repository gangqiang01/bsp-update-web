<template>
    <div class="cf">
        <div class="m-t-10">
        <p class="header-line">
            <i class="fa fa-arrow-left m-r-10 pointer" aria-hidden="true" @click="back()"></i>
            {{$t('bspmagr.bspUpload')}}
        </p>
        </div>
        <el-col :md="20" :offset="2">
            <el-form
            ref="file_form"
            :model="file_form"
            :rules="file_rules"
            label-width="180px"
            class="m-l-30"
            >
            <el-form-item :label="$t('label.selectBspPackage')">
                <div>
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
                <el-table :data="tableData" style="width: 80%; margin: 10px 0;">
                    <el-table-column :label="$t('upload.fileName')">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column :label="$t('upload.fileSize')">
                    <template slot-scope="scope">
                        <span>{{scope.row.size}}</span>
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
                </div>
                <br />
                <el-button size="small" @click="back()">{{$t('upload.back')}}</el-button>
                <el-button
                    size="small"
                    type="success"
                    :disabled="uploadBtnDisabled"
                    @click="start()"
                >{{$t('global.submit')}}</el-button>
            </el-form-item>
            </el-form>
        
        </el-col>


    </div>
</template>
<style lang='scss' scoped>
@import "../../assets/css/colors";
$subContentColor: #606266;

.header-line {
  i:hover {
    color: $primary-color;
  }
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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

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
            uploadBtnDisabled: false,
            up: {},
            files: [],
            tableData: [],
            repoOptions: [],
            file_form: {
            },
            file_rules: {
                description: {
                    // required: true,
                    validator: validateDes,
                    trigger: "blur"
                },
            },
            inputVisible: false,
            inputValue: '',
            editorOption: {
            },
            dialogVisible: false
        };
    },
    components: {
        uploader: Uploader,
        quillEditor,
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

        editorInit: function () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/mode/javascript')    //language
            require('brace/mode/less')
            require('brace/theme/twilight')
            require('brace/snippets/javascript') //snippet
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
    },

    watch: {
        files: {
            handler() {
                this.tableData = [];
                this.uploadBtnDisabled = false;

                this.files.forEach(e => {
                    let filename = e.name;
                    let isMatch = false;
                    if(filename.indexOf(".img") > -1||filename.indexOf(".zip") > -1||filename.indexOf(".tar") > -1){
                        isMatch = true;
                    }
                    if (!isMatch) {
                        this.uploadBtnDisabled = true;
                        this.tableData.push({
                        name: e.name,
                        size: e.size,
                        status: 7,
                        id: e.id,
                        percent: e.percent,
                        errormsg: ""
                        });
                    }else if (e.size > bspMaxLength) {
                        this.uploadBtnDisabled = true;
                        this.tableData.push({
                        name: e.name,
                        size: e.size,
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
                        status: e.status,
                        id: e.id,
                        percent: percent,
                        errormsg: errormsg
                        });
                    }
                });
            },

            deep: true
        },
       
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    created() {
        // this.getAllRepos();
    }
};
</script>
