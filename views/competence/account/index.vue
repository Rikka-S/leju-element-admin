<template>
  <div>
    <el-card shadow="never" class="card">
      <!-- card body -->
      <el-form ref="form" size="mini" :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input
                v-model="searchForm.nickName"
                placeholder="昵称模糊查询"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="searchForm.username"
                placeholder="用户名模糊查询"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item style="float:right;margin-right:100px;margin-top:20px">
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="never" class="card">
      <div slot="header">
        <span>
          <el-button type="primary" size="small" @click="addAccount">新增</el-button>

        </span>
      </div>
      <!-- card body -->

      <el-table :data="accountLs" border stripe>
        <el-table-column
          label="#"
          type="index"
          align="center"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="nick_name"
          label="昵称"
          align="center"
        />
        <el-table-column
          label="头像"
          align="center"
        >
          <template slot-scope="scope">
            <img style="width:100px" :src="scope.row.salt" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          align="center"
        />
        <el-table-column
          prop="create_time"
          label="添加时间"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editAcc(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="delAcc(scope.row)">删除</el-button>

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
    <Dialog ref="dialog" :rolels="roleLs" @break="init" />
  </div>
</template>
<script>
import accountApi from '@/api/competence/account'
import Dialog from './components/Dialog/index'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      accountLs: [],
      total: 0,
      roleLs: [],
      searchForm: {},
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30],
        size: 10
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      accountApi.findUsersByPageApi(this.page.start, this.page.limit).then(res => {
        if (res.success) {
          this.accountLs = res.data.rows
          this.total = res.data.total
        }
      })
      accountApi.findAllRolesApi().then(res => {
        this.roleLs = res.data.items
      })
    },
    addAccount() {
      this.$refs.dialog.open()
    },
    onSearch() {
      this.init()
    },
    reset() {
      this.searchForm = {}
      this.init()
    },
    editAcc(row) {
      this.$refs.dialog.open(row)
    },
    delAcc(row) {
      accountApi.removeUserApi(row.id).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
          this.init()
        }
      })
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
