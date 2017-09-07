<template xmlns="http://www.w3.org/1999/html">
    <el-form :model="rowdata" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="name">
            <el-input v-model="rowdata.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="comment">
            <el-input v-model="rowdata.comment"></el-input>
        </el-form-item>
        <div>
            <sesect-users :selecthost="rowdata.user" @gethosts="getHosts"></sesect-users>
        </div>
        <el-form-item>
            <el-button type="primary" @click="putForm('ruleForm')">提交</el-button>
            <el-button type="danger" @click="deleteForm">删除</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import {deleteRole, putRole, putStaffRole} from 'api/user';
    import sesectUsers from '../components/datatransfer.vue'

    export default {
        components: {sesectUsers},

        props: ['rowdata'],
        data() {
            return {
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    comment: [
                        {required: true, message: '请填写发布脚步', trigger: 'blur'}
                    ]
                },
                groups: '',
            };
        },

        created() {
            this.getGroups();
        },
        methods: {
            putForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        putJob(this.rowdata.id, this.rowdata).then(response => {
                            if (response.statusText = 'ok') {
                                this.$message({
                                    type: 'success',
                                    message: '恭喜你，更新成功'
                                });
                            }
                        }).catch(error => {
                            this.$message.error('更新失败');
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.$emit('DialogStatus', false);
            },
            deleteForm(id) {
                this.$alert('骚年，你确定要这么干！！', '删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ id }`
                        });
                    }
                });
            },
            getHosts(data) {
                this.rowdata.hosts = data
            },
            getGroups() {
                getJobGroupList().then(response => {
                    this.groups = response.data.results;
                })
            },
        }
    }
</script>

<style lang='scss'>

</style>