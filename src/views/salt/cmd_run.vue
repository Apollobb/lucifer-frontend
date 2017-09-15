<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div>
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </div>
            <el-form-item>
                <el-button type="danger" size="small" v-for="item in commands" :key="item.name" @click="changeCmd(item.cmd)">{{item.name}}</el-button>
            </el-form-item>
            <el-form-item label="执行命令" prop="cmd">
                <el-input v-model="ruleForm.cmd"></el-input>
            </el-form-item>
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
    import ElInput from "../../../node_modules/vue-data-tables/node_modules/element-ui/packages/input/src/input";

    export default {
        components: {ElInput, sesectHosts},

        data() {
            const denycmd = ['rm','rf','shutdown', 'reboot','init', 'halt','rmdir', 'mkdir',  'iptables', 'mv', 'wget', 'mk', '>', 'dev', '&', 'dd', '^'];
            const cmdRule = (rule, value, callback) => {
                let num = 1;
                for (var i in denycmd) {
                    if (value.indexOf(denycmd[i]) > -1) {
                        num = 0;
                    } else {
                        num = num * num
                    }
                }
                if (num==0) {
                    callback(new Error('你坏坏！'));
                } else {
                    callback();
                }
            };
            return {
                activeNames: ['open'],
                status: 'close',
                showlog: false,
                ruleForm: {
                    hosts: [],
                    cmd: '',
                    username: 'admin'
                },
                rules: {
                    cmd: [
                        {required: true, message: '请输入命令', trigger: 'blur'},
                        {validator: cmdRule, trigger: 'blur'}
                    ]
                },
                results: [],
                commands: [
                    {name: 'ping', cmd: 'ping -c 4 www.baidu.com'},
                    {name: '查看磁盘', cmd: 'df -h'},
                    {name: '查看内存', cmd: 'free -m'},
                    {
                        name: '乘法口诀',
                        cmd: 'for ((i=1;i<=9;i++)); do for ((j=1;j<=i;j++)); do result=$(($i*$j));echo -n "$i"x"$j"=$result" ";done;echo;done'
                    }
                ],
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
            },
            changeCmd(cmd) {
                this.ruleForm.cmd = cmd
            }
        }
    }
</script>

<style lang='scss'>
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
</style>