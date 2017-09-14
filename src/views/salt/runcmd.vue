<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div>
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </div>
            <el-form-item label="执行命令" prop="cmd">
                <el-select v-model="ruleForm.cmd">
                    <el-option v-for="item in options" :key="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postForm('ruleForm')">执行</el-button>
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
        components: {sesectHosts},

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
    .runcmd {
        width: 80%;
        margin-left: 40px;
    }

    .runlog {
        margin: 25px;
    }
</style>