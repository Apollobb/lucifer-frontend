<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="选择主机" prop="host">
                <el-select v-model="ruleForm.host" placeholder="请选择主机">
                    <el-option v-for="item in hosts" :key="item.id" :label="item.hostname" :value="item.hostname"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="getForm('ruleForm')">修改iptabels</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="editForm" size="small">
            <el-card>
                <div slot="header" class="clearfix">
                    主机：<span style="color: #f81925">{{ruleForm.host}}</span>
                    <el-switch
                            v-model="action"
                            on-text="show"
                            off-text="edit"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                    <el-button v-if="!action" style="float: right;" type="danger" size="small">保存</el-button>
                </div>
                <el-input v-if="action" type="textarea" :rows="25" v-model="results" disabled></el-input>
                <el-input v-else type="textarea" :rows="25" v-model="results"></el-input>
            </el-card>
        </el-dialog>
    </el-card>
</template>
<script>
    import {postState} from "api/salt"
    import {getHostList} from "api/asset"
    import {ws_url} from '@/config'

    export default {
        components: {},

        data() {
            return {
                activeNames: ['open'],
                status: 'close',
                editForm: false,
                hosts: [],
                ruleForm: {
                    user: 'admin',
                    host: '',
                    filename: 'salts/iptables'
                },
                rules: {
                    host: [
                        {required: true, message: '请选择主机', trigger: 'change'},
                    ],
                },
                results: '',
                ws_stream: '/salt/viewfile/',
                ws: '',
                action: true,
            }
        },

        created() {
            this.getHosts();
            this.wsInit();  //ws 初始化
        },
        methods: {
            postForm(formName) {
                this.status = 'open';
                this.results = [];
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.editForm = true;
                        this.ws.send(JSON.stringify(this.ruleForm));
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getForm(formName) {
                this.status = 'open';
                this.results = [];
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.editForm = true;
                        this.ws.send(JSON.stringify(this.ruleForm));
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getHosts() {
                getHostList().then(response => {
                    this.hosts = response.data.results;
                })
            },
            wsInit() {
                let self = this;
                self.ws = new WebSocket(ws_url + self.ws_stream);
                if (self.ws.readyState == WebSocket.OPEN) self.ws.onopen();
                self.ws.onmessage = (e) => {
                    self.results += e.data;
                };
            }
        }
    }
</script>

<style lang='scss'>
    .ruleForm {
        margin-top: 20px;
    }
</style>