<template>
    <div class="body-main">
        <div class="head-lavel">
            <div class="table-button">
                <el-button type="info" icon="plus" @click="handleCreate">新建项目</el-button>
                <div class="checkbox">
                    <el-checkbox v-model="checkList.expiredate">租期</el-checkbox>
                    <el-checkbox v-model="checkList.staff">项目负责人</el-checkbox>
                    <el-checkbox v-model="checkList.sn">SN</el-checkbox>
                </div>
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
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop='name' label='主机名' sortable>
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" style="text-align: center">
                            <el-button type="text" @click="handleEdit(scope.row)">{{ scope.row.name }}


                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop='publicip' label='外网ip'></el-table-column>
                <el-table-column prop='privateip' label='内网ip'></el-table-column>
                <el-table-column prop='idc' label='机房' sortable>
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" style="text-align: center">
                            {{scope.row.idc.name}}


                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-if="checkList.sn" prop='sn' label='sn'></el-table-column>
                <el-table-column prop='cpu' label='cpu'></el-table-column>
                <el-table-column prop='memory' label='内存(M)' sortable></el-table-column>
                <el-table-column prop='disktype' label='磁盘类型'></el-table-column>
                <el-table-column prop='diskcapacity' label='磁盘大小(G)'></el-table-column>
                <el-table-column v-if="checkList.expiredate" prop='expiredate' label='租约到期时间'
                                 sortable></el-table-column>
                <el-table-column v-if="checkList.staff" prop='staff' label='项目负责人'>
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" style="text-align: center">
                            {{scope.row.staff.name}}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop='comment' label='备注'></el-table-column>
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

        <el-dialog title="添加新主机" :visible.sync="addForm" size="small">
            <add-host @DialogStatus="getDialogStatus"></add-host>
        </el-dialog>
        <el-dialog title="编辑主机信息" :visible.sync="editForm" size="small">
            <edit-host :rowdata="rowdata" @DialogStatus="getDialogStatus"></edit-host>
        </el-dialog>
    </div>
</template>

<script>
    import {getHostList} from 'api/asset';
    import {LIMIT} from '@/config'
    import addHost from './addhost.vue'
    import editHost from './edithost.vue'

    export default {
        components: {addHost, editHost},
        data() {
            return {
                checkList: {
                    expiredate: false,
                    staff: false,
                    sn: false
                },
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
                dialogStatus: '',
            }
        },

        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                const parms = {
//                    limit: this.limit,
//                    offset: this.offset,
//                    name__contains: this.searchdata
                };
                getHostList(parms).then(response => {
                    this.tableData = response.data;
                    this.tabletotal = response.data.count;
                })
            },

            getDialogStatus(data) {
                this.editForm = data;
                this.addForm = data;
                this.fetchData();
            },

            handleCreate() {
                this.reseRowdata();
                this.dialogStatus = 'create';
                this.addForm = true;
            },
            handleEdit(row) {
                this.editForm = true;
                this.rowdata = row
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
            reseRowdata() {
                this.rowdata = {
                    hostname: '',
                    ip: '',
                    other_ip: '',
                    group: '',
                    asset_type: '',
                    status: '',
                    os: '',
                    cpu_model: '',
                    cpu_num: '',
                    memory: '',
                    disk: '',
                    memo: ''
                }
            }
        },
    }
</script>

<style lang='scss'>
    .head-lavel {
        padding-bottom: 50px;
    }

    .table-button {
        float: left;
        .checkbox {
            padding: 8px;
            float: right;
        }
    }

    .table-search {
        float: right;
    }

    .table-pagination {
        padding: 10px 0;
        float: right;
    }
</style>