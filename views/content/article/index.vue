<template>
  <div>
    <el-card class="card" shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form
        ref="form"
        :model="searchForm"
        label-width="80px"
        :inline="false"
        size="small"
      >
        <el-row :gutter="20">
          <el-col
            :span="6"
            :offset="0"
          ><el-form-item label="作者">
            <el-input v-model="searchForm.author" placeholder="作者" /> </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="名称">
              <el-input v-model="searchForm.title" placeholder="名称" /> </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item>
              <el-button type="primary" @click="doSearch">搜索</el-button>
              <el-button @click="doReset">重置</el-button>
            </el-form-item></el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="card" shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span><el-button type="primary" size="small" @click="toAddArticle">新增</el-button>
        </span>
      </div>
      <el-table v-loading="loading" :data="articleLs" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
          fixed="left"
        />
        <el-table-column
          prop="author"
          label="作者"
          width="200"
          align="center"
        />
        <el-table-column
          prop="title"
          label="名称"
          width="200"
          align="center"
        />
        <el-table-column
          prop="coverImg"
          label="预览图"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.coverImg" style="width:100px;height:100px" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          width="200"
          align="center"
        />
        <el-table-column
          label="是否显示"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" @change="changeEditorType(scope.row)" />

          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag> {{ scope.row.editorType==0?'富文本框':'markd' }}</el-tag>

          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">

            <el-tag style="margin-right:10px;cursor: pointer;" @click="edit(scope.row)">编辑</el-tag>
            <el-tag style="cursor: pointer;" type="danger" @click="del(scope.row)">删除</el-tag>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="page.start"
        :page-sizes="page.sizes"
        :page-size="page.size"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import articleApi from '@/api/content/article'
export default {
  data() {
    return {
      searchForm: { author: '', title: '' },
      articleLs: [],
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
      articleApi
        .findArticles(this.page.start, this.page.limit, this.searchForm)
        .then((res) => {
          if (res.success) {
            this.articleLs = res.data.rows
            this.total = res.data.total
            this.loading = false
          }
        })
    },
    doSearch() {
      console.log(this.searchForm)
      this.init()
    },
    doReset() {
      this.searchForm = this.$options.data().searchForm
      this.init()
    },
    changeEditorType(val) {
      const tempShow = val.isShow === 1 ? 0 : 1
      console.log(val)
      articleApi.changeShowStatus({ id: val.id, isShow: val.isShow }).then(res => {
        if (res.success) {
          this.$message.success('切换成功')
        } else {
          this.$message.error('切换失败')
          val.isShow = tempShow
        }
      })
        .catch(rej => {
          this.$message.error(rej)
          val.isShow = tempShow
        })
    },
    edit(val) {
      this.$router.push({ name: 'EditArticle', params: { id: val.id }})
    },
    del(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.delArticle(val.id).then(res => {
          if (res.success) {
            this.init()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    toAddArticle() {
      this.$router.push({ path: '/addArticle' })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  margin: 30px;
}
</style>
