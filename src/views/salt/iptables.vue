<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="选择主机" prop="hosts">
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="postForm('ruleForm')">修改iptabels</el-button>
                <el-button type="primary" @click="getForm('ruleForm')">预览iptabels</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="viewForm" size="small">
            <div class="runlog">
                <p style="color: white">服务器：<span v-for="item in ruleForm.hosts" class="select">{{item}}</span></p>
                <el-card>
                    <pre v-for="item in results" :key="item">{{item}}</pre>
                </el-card>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="editForm" size="small">
            <div class="runlog">
                <p style="color: white">服务器：<span v-for="item in ruleForm.hosts" class="select">{{item}}</span></p>
                <el-card>
                    <mavon-editor default_open='edit' v-model="results" :toolbars="toolbars"/>
                </el-card>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
    import sesectHosts from '../components/hosttransfer.vue'
    import {postState} from "@/api/salt"
    import ViewStateInstall from './view_state_install.vue'
    import {ws_url} from '@/config'
    import ElCard from "../../../node_modules/element-ui/packages/card/src/main";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";

    export default {
        components: {
            ElInput, ElCard, sesectHosts, ViewStateInstall
        },

        data() {
            return {
                activeNames: ['open'],
                status: 'close',
                viewForm: false,
                editForm: false,
                ruleForm: {
                    action: 'view',
                    data: {
                        user: 'admin',
                        hosts: [],
                        rule: '',
                        filename: 'iptables'
                    }
                },
                rules: {
                    hosts: [
                        {required: true, type: 'array', message: '请选择主机', trigger: 'change'},
                    ],
                    rule: [
                        {required: true, message: '请填写规则', trigger: 'blur'},
                    ]
                },
                results: '',
                ws_stream: '/salt/viewfile/',
                ws: '',
                toolbars: {
                    subfield: true, // 是否需要分栏
                },
            }
        },

        created() {
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
                        this.viewForm = true;
                        this.ws.send(JSON.stringify(this.ruleForm));
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getHosts(data) {
                this.ruleForm.hosts = data
            },
            wsInit() {
                let self = this;
                self.ws = new WebSocket(ws_url + self.ws_stream);
                self.ws.onopen = function open() {
                    console.log('WebSockets connection created.');
                };
                console.log('the websocket on ' + self.ws.url);
                self.ws.onmessage = function (e) {
                    self.results.push(e.data);
                };
            }
        }
    }
</script>

<style lang='scss'>
    .runlog {
        margin: 25px;
        .select {
            color: #f423ff;
            font-size: 20px;
            margin-right: 20px;
        }
    }

    .shan {
        text-decoration: blink
    }

    .ruleForm {
        margin-top: 20px;
    }
</style>