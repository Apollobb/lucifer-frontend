<template>
    <div>
        <el-card>
            <div class="head-lavel">
                <div class="table-button">
                    <el-button type="info" icon="plus" @click="addForm=true">新建角色对象</el-button>
                </div>
                <div class="table-search">
                    <el-input
                            placeholder="搜索 ..."
                            icon="search"
                            v-model="searchdata"
                            @keyup.enter.native="searchClick"
                            :on-icon-click="searchClick">
                    </el-input>
                </div>
            </div>
            <div>
                <el-table :data='tableData' border style="width: 100%">
                    <el-table-column prop='name' label='角色' sortable>
                        <template scope="scope">
                            <div slot="reference" class="name-wrapper" style="text-align: center">
                                <el-button type="text" @click="handleEdit(scope.row)">{{ scope.row.name }}
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='comment' label='描述'></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button @click="showGroup(scope.row.name)" type="success" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="table-pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="pagesize"
                        :page-size="limit"
                        layout="prev, pager, next, sizes"
                        :total="tabletotal">
                </el-pagination>
            </div>
        </el-card>

        <el-dialog :visible.sync="addForm" size="tiny">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="comment">
                    <el-input v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addGroupSubmit('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="viewForm" size="tiny">
            <view-role :groupName="roleName"></view-role>
        </el-dialog>

        <el-dialog :visible.sync="editForm" size="small">
            <edit-role :rowdata="rowdata" @DialogStatus="getDialogStatus"></edit-role>
        </el-dialog>
    </div>
</template>

<script>
    import {getRoleList, postRole, deleteRole} from 'api/user';
    import {LIMIT} from '@/config'
    import viewRole from './viewgroup.vue'
    import editRole from './editrole.vue'

    export default {
        components: {viewRole, editRole},
        data() {
            return {
                tableData: [],
                tabletotal: 0,
                searchdata: '',
                currentPage: 1,
                limit: LIMIT,
                offset: '',
                pagesize: [10, 25, 50, 100],
                addForm: false,
                editForm: false,
                rowdata: {},
                ruleForm: {
                    name: '',
                    comment: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入一个风骚的角色', trigger: 'blur'},
                    ],
                    comment: [
                        {required: true, message: '请输入一个风骚的备注', trigger: 'blur'},
                    ]
                },
                viewForm: false,
                roleName: ''
            }
        },

        created() {
            this.fetchData();
        },

        methods: {
            /*
             * 获取数据
             */
            fetchData() {
                const parms = {
//                    limit: this.limit,
//                    offset: this.offset,
//                    name__contains: this.searchdata
                };
                getRoleList(parms).then(response => {
                    this.tableData = response.data;
                    this.tabletotal = response.data.count;
                })
            },

            getDialogStatus(data) {
                this.editForm = data;
                this.fetchData();
            },
            addGroupSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postRole(this.ruleForm).then(response => {
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.fetchData();
                            this.addGroup = false
                        }).catch(error => {
                            this.$message.error('添加失败');
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            showGroup(roleName){
                this.viewForm = true;
                this.roleName = roleName
            },
            handleEdit(row){
                this.editForm = true;
                this.rowdata = row;
            },
            deleteGroup(id){
                deleteRole(id).then(response => {
                    this.$message({
                        message: '恭喜你，删除成功',
                        type: 'success'
                    });
                }).catch(error => {
                    this.$message.error('删除失败');
                    console.log(error);
                });
            },
            searchClick() {
                this.fetchData();
            },
            handleSizeChange(val) {
                this.limit = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.offset = val - 1;
                this.fetchData();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang='scss'>
    .head-lavel {
        padding-bottom: 50px;
    }

    .table-button {
        float: left;
    }

    .table-search {
        float: right;
    }

    .table-pagination {
        padding: 10px 0;
        float: right;
    }
</style>