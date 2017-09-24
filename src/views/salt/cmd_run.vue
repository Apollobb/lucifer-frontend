<template xmlns="http://www.w3.org/1999/html">
    <el-card class="runcmd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="选择主机" prop="hosts">
                <sesect-hosts :selecthost="ruleForm.hosts" @gethosts="getHosts"></sesect-hosts>
            </el-form-item>
            <el-form-item label="命令列表">
                <el-button type="danger" size="small" v-for="item in commands" :key="item" @click="changeCmd(item.cmd)">
                    {{item.name}}
                </el-button>
            </el-form-item>
            <el-form-item label="执行命令" prop="cmd">
                <el-input v-model="ruleForm.cmd" placeholder="防止恶意命令，暂时禁止直接输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postForm('ruleForm')">执行</el-button>
                <el-button type="success" @click="viewForm=true">查看历史</el-button>
            </el-form-item>
        </el-form>
        <el-collapse v-show="showlog" v-model="activeNames" class="runlog">
            <el-collapse-item title="运行日志" :name="status">
                <p v-for="line in results" v-html="line"></p>
            </el-collapse-item>
        </el-collapse>

        <el-dialog :visible.sync="viewForm" size="small">
            <view-cmdrun></view-cmdrun>
        </el-dialog>
    </el-card>
</template>
<script>
    import sesectHosts from '../components/hosttransfer.vue'
    import {postCmdrun} from '@/api/salt'
    import ViewCmdrun from './view_cmdrun.vue'
    import {ws_url} from '@/config'

    export default {
        components: {sesectHosts, ViewCmdrun},


        data() {
            const cmdRule = (rule, value, callback) => {
                let num = 1;
                for (var i in this.denycmd) {
                    if (value.indexOf(this.denycmd[i]) > -1) {
                        num = 0;
                        let cmd = value.split(' ')[0];
                        this.results = ['你坏坏！命令【' + cmd + '】已进入黑名单']
                    } else {
                        num = num * num
                    }
                }
                if (num == 0) {
                    callback(new Error(this.results));
                } else {
                    callback();
                }
            };
            return {
                activeNames: ['open'],
                status: 'close',
                showlog: false,
                viewForm: false,
                ruleForm: {
                    hosts: [],
                    cmd: 'ls /tmp',
                    user: 'admin'
                },
                rules: {
                    cmd: [
                        {required: true, message: '请输入命令', trigger: 'blur'},
                        {validator: cmdRule, trigger: 'blur'}
                    ],
                    hosts: [
                        {required: true, type: 'array', message: '请选择主机', trigger: 'change'},
                    ]
                },
                results: [],
                commands: [
                    {name: 'ping', cmd: 'ping -c 4 www.baidu.com'},
                    {name: '磁盘', cmd: 'df -h'},
                    {name: '内存', cmd: 'free -m'},
                    {
                        name: '乘法口诀',
                        cmd: 'for ((i=1;i<=9;i++)); do for ((j=1;j<=i;j++)); do result=$(($i*$j));echo -n "$i"x"$j"=$result" ";done;echo;done'
                    },
                    {name: '关机', cmd: 'init 0'},
                    {name: '删除', cmd: 'rm -rf /tmp'},
                    {name: '移动', cmd: 'mv aaa /tmp'},
                    {name: '防火墙', cmd: 'iptables -I INPUT -p tcp -j DORP'},
                ],
                denycmd: ['rm', 'rf', 'shutdown', 'reboot', 'init', 'halt', 'rmdir', 'mkdir', 'iptables', 'mv', 'wget', 'mk', '>', 'dev', '&', 'dd', '^'],
                ws_stream: '/salt/cmdrun/',
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
                this.results = this.rawLines = [];
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
                this.ruleForm.hosts = data;
            },
            changeCmd(cmd) {
                this.ruleForm.cmd = cmd
            },
            wsInit() {
                let self = this;
                self.ws = new WebSocket(ws_url + self.ws_stream);
                if (self.ws.readyState == WebSocket.OPEN) self.ws.onopen();
                self.ws.onmessage = (e) => {
                    self.results.push(e.data);
                };
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