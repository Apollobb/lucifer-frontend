<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                <el-option v-for="item in sex" :key="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="用户分组" prop="group">
            <el-select v-model="ruleForm.group" placeholder="请选择用户分组">
                <el-option v-for="item in groups" :key="item.name" :value="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="telno">
            <el-input v-model="ruleForm.telno"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
            <el-input v-model="ruleForm.comment"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" :disabled="true">
                <template slot="append">
                    <el-button type="info" size="small" @click="setPasswd()">生成密码</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="postForm('ruleForm')">提交</el-button>
            <el-button type="danger" @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import {postUser, getGroupList, getRoleList} from 'api/user';

    export default {
        components: {},

        data() {
            return {
                ruleForm: {
                    name: 'rose',
                    sex: '未知',
                    position: '',
                    group: 'jack',
                    telno: '',
                    password: '',
                    comment: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请输入性别', trigger: 'change'}
                    ],
                    position: [
                        {required: true, message: '请输入职位', trigger: 'blur'}
                    ],
                    group: [
                        {required: true, message: '请选择用户组', trigger: 'change'},
                    ],
                    telno: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                    ]
                },
                groups: '',
                sex: ['未知','男','女'],
            };
        },

        created() {
            this.getGroups();
        },
        methods: {
            postForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postUser(this.ruleForm).then(response => {
                            if (response.statusText = 'ok') {
                                this.$message({
                                    type: 'success',
                                    message: '恭喜你，新建成功'
                                });
                            }
                        }).catch(error => {
                            this.$message.error('新建失败');
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.$emit('DialogStatus', false);
            },

            resetForm(formName) {
                this.ruleForm.hosts = [];
                this.$refs[formName].resetFields();
            },
            getHosts(data) {
                this.ruleForm.hosts = data
            },
            getGroups() {
                getGroupList().then(response => {
                    this.groups = response.data;
                })
            },
            setPasswd() {
                this.ruleForm.password = Math.random().toString(35).slice(2);
            },
        }
    }
</script>

<style lang='scss'>

</style>