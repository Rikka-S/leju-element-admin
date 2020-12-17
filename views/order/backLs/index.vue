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
            <svg v-else-if="scope.row.payType===1" style="height:40px" t="1607504341056" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2600" width="200" height="200"><path d="M902.095 652.871l-250.96-84.392s19.287-28.87 39.874-85.472c20.59-56.606 23.539-87.689 23.539-87.689l-162.454-1.339v-55.487l196.739-1.387v-39.227H552.055v-89.29h-96.358v89.294H272.133v39.227l183.564-1.304v59.513h-147.24v31.079h303.064s-3.337 25.223-14.955 56.606c-11.615 31.38-23.58 58.862-23.58 58.862s-142.3-49.804-217.285-49.804c-74.985 0-166.182 30.123-175.024 117.55-8.8 87.383 42.481 134.716 114.728 152.139 72.256 17.513 138.962-0.173 197.04-28.607 58.087-28.391 115.081-92.933 115.081-92.933l292.486 142.041c-11.932 69.3-72.067 119.914-142.387 119.844H266.37c-79.714 0.078-144.392-64.483-144.466-144.194V266.374c-0.074-79.72 64.493-144.399 144.205-144.47h491.519c79.714-0.073 144.396 64.49 144.466 144.203v386.764z m-365.76-48.895s-91.302 115.262-198.879 115.262c-107.623 0-130.218-54.767-130.218-94.155 0-39.34 22.373-82.144 113.943-88.333 91.519-6.18 215.2 67.226 215.2 67.226h-0.047z" fill="#02A9F1" p-id="2601" /></svg>
            <svg v-else style="height:40px" t="1607504777775" class="icon" viewBox="0 0 1735 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6654" width="200" height="200"><path d="M999.442124 1024H301.672212c-90.619469 0-163.115044-72.495575-163.115044-163.115044V163.115044c0-90.619469 72.495575-163.115044 163.115044-163.115044h697.769912c90.619469 0 163.115044 72.495575 163.115044 163.115044v697.769912c3.020649 90.619469-72.495575 163.115044-163.115044 163.115044z" fill="#6BC839" p-id="6655" /><path d="M784.976047 389.663717c9.061947 0 18.123894 0 27.185841 3.020649C787.996696 283.941003 673.212035 205.40413 543.32413 205.40413 395.31233 205.40413 277.507021 305.085546 277.507021 431.952802c0 72.495575 39.268437 132.908555 105.722714 181.238938L356.043894 694.749263l93.640118-48.330384c33.227139 6.041298 60.412979 12.082596 93.640118 12.082596h24.165192c-6.041298-18.123894-9.061947-36.247788-9.061947-57.39233 0-117.80531 99.681416-211.445428 226.548672-211.445428z m-141.970501-72.495575c21.144543 0 33.227139 12.082596 33.227138 33.227138 0 21.144543-12.082596 33.227139-33.227138 33.227139-21.144543 0-39.268437-12.082596-39.268437-33.227139-3.020649-21.144543 18.123894-33.227139 39.268437-33.227138zM455.72531 383.622419c-21.144543 0-39.268437-12.082596-39.268437-33.227139 0-21.144543 21.144543-33.227139 39.268437-33.227138 18.123894 0 33.227139 12.082596 33.227138 33.227138 0 21.144543-15.103245 33.227139-33.227138 33.227139z" fill="#FFFFFF" p-id="6656" /><path d="M1029.648614 598.088496c0-105.722714-105.722714-193.321534-226.548673-193.321534-126.867257 0-226.548673 87.59882-226.548673 193.321534 0 105.722714 99.681416 193.321534 226.548673 193.321533 27.185841 0 54.371681-6.041298 81.557522-12.082595l72.495575 39.268436-21.144542-66.454277c54.371681-39.268437 93.640118-93.640118 93.640118-154.053097z m-302.064897-33.227139c-12.082596 0-27.185841-12.082596-27.185841-27.185841 0-12.082596 12.082596-27.185841 27.185841-27.18584 21.144543 0 33.227139 12.082596 33.227138 27.18584s-12.082596 27.185841-33.227138 27.185841z m148.011799 0c-12.082596 0-27.185841-12.082596-27.18584-27.185841 0-12.082596 12.082596-27.185841 27.18584-27.18584 21.144543 0 33.227139 12.082596 33.227139 27.18584s-12.082596 27.185841-33.227139 27.185841z" fill="#FFFFFF" p-id="6657" /></svg>
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
        { title: '待处理',
          type: 'danger'
        }, {
          title: '退货中',
          type: 'warning'
        }, {
          title: '已完成',
          type: ''
        }, {
          title: '已拒绝',
          type: ''
        }]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      orderApi.findReturnApplyApi(this.page.start, this.page.limit, this.searchForm).then(res => {
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
      this.$router.push({ name: 'BackDetail', params: { id: row.id }})
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
</style>
