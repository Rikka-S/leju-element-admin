<template>
  <el-card shadow="never" class="card">
    <div slot="header">
      <span><!-- card title -->
        <el-row :gutter="20">
          <el-col v-for="(item,index) in header" :key="index" :span="6">
            <el-card shadow="never" :body-style="{ padding: '20px' }">
              <div style="margin:10px 0">{{ item.add }}:<span style="color:blue">{{ baseData[item.addValue] }}</span></div>
              <div>{{ item.total }}:<span style="color:blue">{{ baseData[item.totalValue] }}</span></div>
              <!-- card body -->
            </el-card>
          </el-col>
        </el-row>

      </span>
    </div>
    <!-- card body -->
    <div ref="histogram" style="width:500px;height:400px" />
  </el-card>

</template>
<script>
import { baseDataApi } from '@/api/user'
export default {
  data() {
    return {
      header: [
        { add: '今日新增用户量', addValue: 'userTodayCount', total: '用户总量', totalValue: 'memberCount' },
        { add: '今日新增订单量', addValue: 'orderTodayCount', total: '订单总量', totalValue: 'orderCount' },
        { add: '今日新增退单量', addValue: 'orderReturnTodayCount', total: '退单总量', totalValue: 'orderReturnCount' },
        { add: '今日新增商品量', addValue: 'productTodayCount', total: '商品总量', totalValue: 'productCount' }
      ],
      baseData: {}
    }
  },
  created() {
    this.getBaseData()
  },
  mounted() {
  },
  methods: {
    getBaseData() {
      baseDataApi().then(res => {
        if (res.success) {
          this.baseData = res.data
          this.initEcharts(res.data.orderBydayList, res.data.orderReturnBydayList)
        }
      })
    },
    initEcharts(orderData, backData) {
      var myEcharts = this.$MyEcharts.init(this.$refs.histogram)
      const xData = orderData.map(el => el.date)
      const yOrderData = orderData.map(el => el.count)
      const yBackData = [3, 10, 22, 4, 6, 10, 15, 9]
      const max = Math.max(...yOrderData) + 10
      myEcharts.setOption({
        title: {
          text: '订单柱状图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          scale: true,
          name: '数量',
          max: max,
          min: 0
        },
        series: [{
          name: '订单',
          data: yOrderData,
          type: 'bar'
        },
        {
          name: '退单',
          data: yBackData,
          type: 'line'
        }
        ]
      })
    }
  }
}
</script>
<style lang="scss"  scoped>
</style>
