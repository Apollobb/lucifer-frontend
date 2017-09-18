<template>
    <div>
        <div class="head-lavel">
                <div class="table-search">
                    <el-input @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item"
                              placeholder="用户"
                              v-model="listQuery.user" icon="circle-close"
                              :on-icon-click="handleUserClick">
                    </el-input>
                    <el-input @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item"
                              placeholder="命令"
                              v-model="listQuery.cmd" icon="circle-close"
                              :on-icon-click="handleCmdClick">
                    </el-input>
                    <el-button class="filter-item" type="primary" icon="search" @click="searchClick">搜索
                    </el-button>
                </div>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop='user' label='用户' sortable></el-table-column>
                <el-table-column prop='cmd' label='命令'></el-table-column>
                <el-table-column prop='hosts' label='主机'>
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" style="text-align: center">
                            {{scope.row.hosts}}
                        </div>
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
                    :page-size="listQuery.limit"
                    layout="prev, pager, next, sizes"
                    :total="tabletotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getCmdrun} from 'api/salt';
    import {LIMIT} from '@/config'

    export default {

        data() {
            return {
                tableData: [],
                tabletotal: 0,
                searchdata: '',
                currentPage: 1,
                offset: '',
                pagesize: [10, 25, 50, 100],
                listQuery: {
                    offset: 0,
                    limit: LIMIT,
                    cmd: '',
                    user: '',
                },
            }
        },

        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                const parms = {
                    limit: this.limit,
                    offset: this.offset,
                    cmd__contains: this.listQuery.cmd,
                    user__username__contains: this.listQuery.user
                };
                getCmdrun(parms).then(response => {
                    this.tableData = response.data.results;
                    this.tabletotal = response.data.count;
                })
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
            handleUserClick() {
                this.listQuery.user = ''
            },
            handleCmdClick() {
                this.listQuery.cmd = ''
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
    }

    .table-search {
        float: right;
    }

    .table-pagination {
        padding: 10px 0;
        float: right;
    }
</style>