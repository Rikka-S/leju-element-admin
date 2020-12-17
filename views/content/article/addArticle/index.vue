<template>
  <div>
    <el-card class="card" shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>新增文章</span>
      </div>
      <!-- card body -->
      <el-form ref="form" :model="article" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label-width="200px" label="作者" prop="author">
              <el-input v-model="article.author" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label-width="200px" label="标题" prop="title">
              <el-input v-model="article.title" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label-width="200px" label="是否显示">
              <el-switch v-model="article.isShow" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <el-form-item label-width="200px" label="摘要" prop="summary">
              <el-input v-model="article.summary" :rows="2" type="textarea" placeholder="摘要" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <el-form-item label-width="200px" label="封面图片" prop="coverImg">
              <el-upload
                ref="upload"
                :action="uploadUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="uploadSucc"
              >
                <el-button size="small" type="primary">{{ id?'点击更换':'点击上传' }}</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  style="width:100px"
                  :src="coverImg"
                  alt=""
                >
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-form-item label-width="200px" label="切换富文本类型">
              <el-radio-group v-model="article.editorType">
                <el-radio :label="0">富文本</el-radio>
                <el-radio :label="1">Markdown</el-radio>
              </el-radio-group>
              <el-tag style="margin-left:20px" type="warning"> 注意!切换编辑器会清空编辑内容</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <TinEditor v-show="article.editorType===0" ref="tin" />
            <MarkEditor v-show="article.editorType===1" ref="mark" />
          </el-col>
        </el-row>
        <el-col :span="24" :offset="0">
          <div class="flex-center">
            <el-form-item>
              <el-button v-loading="loading" type="primary" @click="onSubmit">{{ id?'立即更新':'立即上传' }}</el-button>
            </el-form-item>
          </div>
        </el-col>

      </el-form>
    </el-card>

  </div>
</template>
<script>
import TinEditor from '@/components/Tinymce'
import MarkEditor from '@/components/MarkdownEditor'
import articleApi from '@/api/content/article'
import mixin from '@/mixins/mixin'
import { getToken } from '@/utils/myAuth'

export default {
  components: {
    TinEditor, MarkEditor
  },
  mixins: [mixin],
  data() {
    return {
      id: '',
      coverImg: '',
      loading: false,
      article: {
        editorType: 0,
        isShow: 1
      },
      rules: {
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
  },
  mounted() {
    if (this.id) {
      this.productArticle()
    }
  },
  methods: {

    // 获取文章详细
    async productArticle() {
      var res = await articleApi.productArticleApi(this.id)
      this.article = res.data.productArticle
      this.coverImg = res.data.productArticle.coverImg
      if (this.article.editorType === 0) {
        this.$refs.tin.setContent(res.data.productArticle.content1)
      } else {
        this.$refs.mark.setHtml(res.data.productArticle.content1)
      }
      console.log(res)
    },
    subMit(api, message) {
      this.loading = true
      var content1 = ''; var content2 = ''
      if (this.article.editorType === 0) {
        content1 = this.$refs.tin.getContent()
      } else {
        content1 = this.$refs.mark.getValue()
        content2 = this.$refs.mark.getHtml()
      }
      articleApi[api]({
        content1,
        content2,
        ...this.article
      }).then(res => {
        if (res.success) {
          this.loading = false
          this.$message.success(message)
          this.$router.push({ path: '/article' })
        }
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.article)
          if (this.id) {
            this.subMit('updateArticleApi', '编辑成功')
          } else {
            this.subMit('addArticleApi', '添加成功')
          }
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    },
    uploadSucc(file) {
      this.coverImg = file.data.fileUrl
      this.article.coverImg = file.data.fileUrl
    }

  }
}
</script>
<style lang="scss"  scoped>
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
