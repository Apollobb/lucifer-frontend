<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-card class="software">
            <div slot="header" class="clearfix">
                <span>选择需要安装的软件</span>
                <el-button style="float: right;" type="danger">黑色代表被选中</el-button>
            </div>
            <el-row class="software">
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn light-blue-btn">Zabbix</el-button>
                </el-col>
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn pink-btn">Nginx</el-button>
                </el-col>
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn green-btn">Tomcat</el-button>
                </el-col>
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn tiffany-btn">Php</el-button>
                </el-col>
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn yellow-btn">Pyenv</el-button>
                </el-col>
                <el-col :span="4" class='text-center'>
                    <el-button class="pan-btn blue-btn">Mysql</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <div>
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </div>
            <el-form-item>
                <el-button type="primary" @click="postForm('ruleForm')">执行</el-button>
                <el-button v-show="showlog" type="success">执行中</el-button>
            </el-form-item>
        </el-form>
        <el-collapse v-show="showlog" v-model="activeNames" class="runlog">
            <el-collapse-item title="运行日志" :name="status">
                <p v-for="item in results" :key="item">{{item}}</p>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>
<script>
    import sesectHosts from '../components/hosttransfer.vue'
    import {saltCmdrun} from "@/api/salt"

    export default {
        components: {
            sesectHosts
        },

        data() {
            return {
                activeNames: ['open'],
                status: 'close',
                showlog: false,
                ruleForm: {
                    hosts: [],
                    cmd: '',
                },
                rules: {
                    cmd: [
                        {required: true, message: '请输入命令', trigger: 'blur'},
                    ]
                },
                results: [],
                options: ['ping -c 4 www.baidu.com', 'ping -c 4 www.taobao.com', 'df -h', 'free -m']
            };
        },

        created() {
        },
        methods: {
            postForm(formName) {
                this.status = 'open';
                this.showlog = true;
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        saltCmdrun(this.ruleForm).then(response => {
                            this.results = response.data;
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getHosts(data) {
                this.ruleForm.hosts = data
            }
        }
    }
</script>

<style lang='scss'>
    .software {
        .pan-btn {
            padding: 14px;
            margin-right: 0;
            &:focus {
                color: #ffffff;
                background: #000000;
            }
        }
    }

    .runcmd {
        width: 80%;
        margin-left: 40px;
    }

    .runlog {
        margin: 25px;
    }

    .shan {
        text-decoration: blink
    }

    .ruleForm {
        margin-top: 20px;
    }
</style>