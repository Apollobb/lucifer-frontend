<template>
    <div>
            <div class="head-lavel">
                <div class="table-button">
                </div>
                <div class="table-search">
                    <el-input @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item"
                              placeholder="操作者"
                              v-model="listQuery.staff" icon="circle-close"
                              :on-icon-click="handleIconClick">
                    </el-input>
                    <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.method"
                               placeholder="操作类型">
                        <el-option v-for="item in methods" :key="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-date-picker
                            class="filter-item"
                            v-model="datefilter"
                            type="daterange"
                            placeholder="操作时间范围">
                    </el-date-picker>
                    <el-button class="filter-item" type="primary" icon="search" @click="searchClick">搜索
                    </el-button>
                </div>
            </div>
            <div>
                <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
                    <el-table-column prop='staff' label='操作者' sortable></el-table-column>
                    <el-table-column prop='userip' label='ip' sortable></el-table-column>
                    <el-table-column prop='operate' label='操作类型' sortable></el-table-column>
                    <el-table-column prop='olddata' label='旧数据'></el-table-column>
                    <el-table-column prop='newdata' label='新数据'></el-table-column>
                    <el-table-column prop='date' label='创建时间' sortable>
                        <template scope="scope">
                            <span>{{scope.row.date | parseDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='comment' label='备注'></el-table-column>
                </el-table>
            </div>
            <div class="table-footer">
                <div class="table-button">
                </div>
                <div class="table-pagination">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="listQuery.offset"
                            :page-sizes="pagesize"
                            :page-size="listQuery.limit"
                            layout="prev, pager, next, sizes"
                            :total="tabletotal">
                    </el-pagination>
                </div>
            </div>
    </div>
</template>

<script>
    import {getRecordList} from 'api/tool'
    import {LIMIT} from '@/config'
    import format from '@/utils/dateformat'
    export default {
        data() {
            return {
                tableData: [],
                tabletotal: 0,
                searchdata: '',
                photo: '',
                content: '',
                images: [],
                pagesize: [10, 25, 50, 100],
                rowdata: {},
                selectId: [],
                butstatus: true,
                listQuery: {
                    offset: 0,
                    limit: LIMIT,
                    staff: '',
                    method: '',
                    time_lte: '',
                    time_gte: '',
                },
                parms: {},
                datefilter: [],
                methods: ['post','get','put','patch','delete'],
            }
        },
        computed: {},
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                getRecordList(this.listQuery).then(response => {
                    this.tableData = response.data;
                    this.tabletotal = response.data.count;
                })
            },
            handleSelectionChange(val) {
                this.selectId = [];
                for (var i = 0, len = val.length; i < len; i++) {
                    this.selectId.push(val[i].id);
                }
                if(this.selectId.length>0){
                    this.butstatus = false
                } else {
                    this.butstatus = true
                }
            },
            handleIconClick() {
                this.listQuery.username__contains = ''
            },
            searchClick() {
                this.listQuery.time_gte = format(new Date(this.datefilter[0]), 'YYYY-MM-DD');
                this.listQuery.time_lte = format(new Date(this.datefilter[1]), 'YYYY-MM-DD');
                this.fetchData();
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.offset = val - 1;
                this.fetchData();
            },
            deleteForm() {
                for (var i = 0, len = this.selectId.length; i < len; i++) {
                    deleteDuty(this.selectId[i]).then(response => {
                        delete this.selectId[i]
                    })
                }
                setTimeout(this.fetchData, 3000);
            },
            showImg(id) {
                getUploadList(this.parms, id).then(res => {
                    console.log(res.data.file);
                    return res.data.file
                });
            },
            bigPhoto(img) {
                this.showPhoto = true;
                this.photo = img
            },
            bigContent(content) {
                this.showContent = true;
                this.content = content
            }
        }
    }
</script>

<style lang='scss'>
    .head-lavel {
        padding-bottom: 50px;
    }
    .table-button {
        padding: 10px 0;
        float: left;
    }
    .table-search {
        float: right;
        padding: 10px 0;
    }
    .table-pagination {
        padding: 10px 0;
        float: right;
    }
    .photo-align {
        clear: both;
        display: block;
        margin: auto;
    }
    .content-align {
        text-align: center;
    }
    .showimg {
        padding: 1px 10px;
    }
</style>