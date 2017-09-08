<template>
    <div>
        <div class="item-title">{{title}}</div>
        <div class="host-select">
            <el-transfer
                    filterable
                    :titles="['未选择', '已选择']"
                    :button-texts="['滚回来', '滚过去']"
                    :footer-format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                    @change="handleChange"
                    v-model="value"
                    :data="alldata">
                <el-button type="info" class="transfer-footer" slot="left-footer" size="small" @click="transferData">重置数据</el-button>
            </el-transfer>
        </div>
    </div>
</template>

<script>
    import {getUserList} from 'api/user';
    export default {
        props: ['selectdata', 'title'],
        data() {
            return {
                alldata: [],
                value: [],
                changedata: false
            };
        },

        created() {
            this.transferData();
        },

        methods: {
            transferData() {
                this.alldata = [];
                this.value = [];
                const parms = {
//                    status: "used"
                };
                getUserList(parms).then(response => {
                    const results = response.data;
                    for (var i = 0, len = results.length; i < len; i++) {
                        this.alldata.push({
                            key: results[i].id,
                            label: results[i].name
                        });
                    }
                });
            },
            handleChange(value, direction, movedKeys) {
                this.$emit('getSelectData', value);
            }
        }
    };
</script>

<style>
    .item-title {
        font-weight: 100;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #58ff28;
        line-height: 1;
        padding: 11px 9px;
        margin-left: 25px;
        box-sizing: border-box;
    }

    .host-select {
        margin-bottom: 20px;
    }

    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }
</style>