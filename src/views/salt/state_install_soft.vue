<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="选择主机" prop="hosts">
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </el-form-item>
            <el-form-item label="安装的软件" prop="sls">
                <el-card class="software">
                    <el-row class="software">
                        <el-col :span="4" class='text-center' v-for="item in btns" :key="item">
                            <el-button class="pan-btn yellow-btn" @click="selectSoft(item)">{{item}}</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postForm('ruleForm')">开始安装</el-button>
                <el-button v-show="showlog" type="success">安装中</el-button>
            </el-form-item>
        </el-form>
        <el-collapse v-show="showlog" v-model="activeNames" class="runlog">
            <el-collapse-item title="运行日志" :name="status">
                即将安装的软件：<span class="select">{{ruleForm.sls}}</span>
                安装的服务器：<span v-for="item in ruleForm.hosts" class="select">{{item}}</span>
                <span style="color: #ff1324">(下面打印后端的测试日志)</span>
                <p v-for="item in results" :key="item">{{item}}</p>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>
<script>
    import sesectHosts from '../components/hosttransfer.vue'
    import {postState} from "@/api/salt"
    import ViewStateInstall from './view_state_install.vue'
    import {ws_url} from '@/config'

    export default {
        components: {
            sesectHosts, ViewStateInstall
        },

        data() {
            return {
                activeNames: ['open'],
                status: 'close',
                showlog: false,
                ruleForm: {
                    user: 'admin',
                    hosts: [],
                    sls: '',
                    log_file: ''
                },

                rules: {
                    sls: [
                        {required: true, message: '请选择安装软件', trigger: 'blur'},
                    ],
                    hosts: [
                        {required: true, type: 'array', message: '请选择主机', trigger: 'change'},
                    ]
                },
                results: [],
                btns: ['zabbix', 'nginx', 'python', 'tomcat', 'php'],
                ws_stream: '/salt/state_install/',
                ws: '',
            }
        },

        created() {
            this.wsInit();  //ws 初始化
        },
        methods: {
            postForm(formName) {
                this.status = 'open';
                this.showlog = true;
                this.results = [];
                this.ruleForm.log_file = this.ruleForm.sls + '_' + (new Date()).getTime() + '.log';
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
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
            selectSoft(data) {
                this.ruleForm.sls = data;
            },
            wsInit() {
                let self = this;
                self.ws = new WebSocket(ws_url + self.ws_stream);
                self.ws.onopen = function open() {
                    console.log('WebSockets connection created.');
                };
                self.ws.onmessage = function (e) {
                    self.results.push(e.data);
                };
            }
        }
    }
</script>

<style lang='scss'>
    .software {
        .pan-btn {
            padding: 12px;
            &:focus {
                color: #ffffff!important;
                background: #000000!important;
            }
        }
    }

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