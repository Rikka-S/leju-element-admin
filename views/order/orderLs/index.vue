<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <!-- card body -->
      <el-form ref="form" size="mini" :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input
                v-model="searchForm.orderSn"
                placeholder="订单编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型">
              <el-select v-model="searchForm.orderType" placeholder="订单类型">
                <el-option label="正常订单" :value="0" />
                <el-option label="秒杀订单" :value="0" />
              </el-select> </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="支付方式">
              <el-select
                v-model="searchForm.payType"
                placeholder="支付方式"
              >
                <el-option label="未支付" :value="0" />
                <el-option label="支付宝" :value="1" />
                <el-option label="微信" :value="2" />
              </el-select> </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单状态">
              <el-select
                v-model="searchForm.status"
                placeholder="订单状态"
              >
                <el-option v-for="(item,index) in status" :key="index" :label="item.title" :value="index" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item style="float:right;margin-right:100px;margin-top:20px">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div slot="header">
        <span><!-- card title --></span>
      </div>
      <!-- card body -->
      <el-table v-loading="loading" :data="orderLs" border stripe>
        <el-table-column
          type="index"
          label="#"
          width="50"
          align="center"
          fixed="left"
        />
        <el-table-column
          prop="orderSn"
          label="商品编号"
          width="200"
          align="center"
        />
        <el-table-column
          label="支付方式"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payType===0" type="info" effect="dark">未支付</el-tag>
            <svg-icon v-else-if="scope.row.payType===1" icon-class="支付宝" class-name="custom-class" />
            <svg-icon v-else icon-class="微信" class-name="custom-class" />
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag effect="dark" :type="status[scope.row.status].type">{{ status[scope.row.status].title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200"
          align="center"
        />
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          width="200"
          align="center"
        />
        <el-table-column
          label="订单类型"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.orderType?'秒杀订单':'正常订单' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          width="200"
          align="center"
        />
        <el-table-column
          label="操作"
          width="150"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="lookOrder(scope.row)">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="page.start"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

  </div>
</template>
<script>
import orderApi from '@/api/order/order'
export default {
  data() {
    return {
      loading: false,
      total: 0,
      page: {
        start: 1,
        limit: 10,
        sizes: [5, 10, 15, 20],
        size: 5
      },
      searchForm: {},
      orderLs: [],
      status: [
        { title: '代付款',
          type: 'danger'
        }, {
          title: '代发货',
          type: 'warning'
        }, {
          title: '已发货',
          type: ''
        }, {
          title: '已完成',
          type: ''
        }, {
          title: '已关闭',
          type: ''
        }, { title: '无效订单',
          type: 'danger'
        }]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      orderApi.findOrdersByPageApi(this.page.start, this.page.limit, this.searchForm).then(res => {
        if (res.success) {
          this.loading = false
          this.total = res.data.total
          this.orderLs = res.data.rows
        }
      })
    },
    onSearch() {
      this.init()
    },
    reset() {
      this.searchForm = {}
      this.init()
    },
    lookOrder(row) {
      this.$router.push({ name: 'OrderDetail', params: { id: row.id }})
    },
    handleSizeChange(e) {
      this.page.limit = e
      this.init()
    },
    handleCurrentChange(e) {
      this.page.start = e
      this.init()
    }
  }
}
</script>
<style lang="scss"  scoped>
.custom-class{
  font-size: 40px;
}
</style>
