<template>
    <el-transfer
            filterable
            v-model="value"
            :data="data">
    </el-transfer>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                value: [],
            }
        },
        created() {
            this.generateData();
        },

        methods: {
            generateData () {
                const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
                for (var i = 0, len = cities.length; i < len; i++) {
                    console.log(cities[i]);
                    this.data.push({
                        label: cities[i],
                        key: i
                    })
                }
                console.log(this.data)
            }
        }
    }
</script>