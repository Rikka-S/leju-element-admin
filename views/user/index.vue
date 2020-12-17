<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span>注册用户列表</span>
      </div>
      <!-- card body -->
      <el-table
        :data="userLs"
        border
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="150"
        />
        <el-table-column
          label="头像"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <div class="img-box">
              <img style="width:60px;" :src="scope.row.icon" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
        />
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="120"
        />
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
import { findMembersByPageApi } from '@/api/user'
export default {
  data() {
    return {
      userLs: [],
      loading: false,
      total: 0,
      page: {
        start: 1,
        limit: 10,
        sizes: [5, 10, 15, 20],
        size: 5
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      findMembersByPageApi(this.page.start, this.page.limit).then(res => {
        if (res.success) {
          this.loading = false
          this.userLs = res.data.rows
          this.total = res.data.total
        }
      })
    },
    del(id) {

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
.img-box{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
}
</style>
