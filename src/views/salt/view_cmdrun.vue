<template>
    <div>
        <div class="head-lavel">
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
                    :page-size="limit"
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
                limit: LIMIT,
                offset: '',
                pagesize: [10, 25, 50, 100],
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
                    name__contains: this.searchdata
                };
                getCmdrun(parms).then(response => {
                    console.log(response.data)
                    this.tableData = response.data;
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