<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-card class="software">
            <div slot="header" class="clearfix">
                <span>选择需要安装的软件</span>
                <el-button style="float: right;" size="small" type="danger">黑色代表被选中</el-button>
            </div>
            <el-row class="software">
                <el-col :span="4" class='text-center' v-for="item in btns" :key="item">
                    <el-button class="pan-btn yellow-btn" @click="selectSoft(item)">{{item}}</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">
            <div>
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </div>
            <el-form-item>
                <el-button type="primary" @click="postForm('ruleForm')">开始安装</el-button>
                <el-button v-show="showlog" type="success">安装中</el-button>
            </el-form-item>
        </el-form>
        <el-collapse v-show="showlog" v-model="activeNames" class="runlog">
            <el-collapse-item title="运行日志" :name="status">
                即将安装的软件：<span class="select">{{softname}}</span>
                安装的服务器：<span v-for="item in ruleForm.hosts" class="select">{{item}}</span>
            </el-collapse-item>
        </el-collapse>
    </el-card>
</template>
<script>
    import sesectHosts from '../components/hosttransfer.vue'
    import {postCmdrun} from "@/api/salt"

    export default {
        components: {
            sesectHosts
        },

        data() {
            return {
                activeNames: ['open'],
                status: 'close',
                showlog: false,
                softname: '',
                ruleForm: {
                    hosts: [],
                    softname: '',
                },
                results: [],
                btns: ['zabbix', 'nginx', 'python', 'tomcat', 'php'],
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
                        postCmdrun(this.ruleForm).then(response => {
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
            },
            selectSoft(data) {
                this.softname = data
            }
        }
    }
</script>

<style lang='scss'>
    .software {
        margin: 0 30px;
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