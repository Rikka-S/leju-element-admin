<template>
  <div>
    <el-card class="card" shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>
          <el-upload
            ref="upload"
            action="/lejuAdmin/material/uploadFileOssSave"
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadSucc"
          >
            <el-button size="small" type="primary">点击上传素材</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </span>
      </div>
      <!-- card body -->
      <el-row :gutter="20">
        <div v-loading="loading" class="main">
          <el-card v-for="item in materialLs" :key="item.id" class="material-card" shadow="always">
            <div slot="header">
              <span>创建时间:{{ item.createTime }}</span>
            </div>
            <!-- card body -->
            <img :src="item.ossUrl" alt="" style="width:183px;height:250px">
            <div class="btn">
              <el-button size="small" type="danger" style="float:right;margin-top:10px" @click="del(item.id)">删除</el-button>
            </div>
          </el-card>
          <el-card v-for="el in (5-total%5)" :key="el" class="material-card hidden" />
        </div>
      </el-row>

    </el-card>
    <el-pagination
      :current-page.sync="page.start"
      :page-sizes="page.sizes"
      :page-size="page.size"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getToken } from '@/utils/myAuth'
import materialApi from '@/api/content/material'
export default {
  data() {
    return {
      materialLs: [],
      loading: false,
      total: 0,
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30],
        size: 10
      }
    }
  },
  computed: {
    headers() {
      const token = getToken()
      return { token }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      materialApi.findMaterialByPageApi(this.page.start, this.page.limit).then(res => {
        if (res.success) {
          this.materialLs = res.data.rows
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    uploadSucc(file) {
      this.init()
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        materialApi.delMaterialApi(id).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.init()
          }
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
.main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .hidden{
        height: 0;
        overflow: hidden;
    }
}
.material-card{
    width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
