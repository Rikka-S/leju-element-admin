<template>
  <div>
    <el-dialog
      title="编辑用户"
      :visible.sync="isShow"
      width="30%"
    >
      <span>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="small">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" />
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-box"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="uploadSucc"
            >
              <img v-if="form.salt" :src="form.salt" class="avatar">
              <i v-else class="el-icon-plus avatar" />
            </el-upload>

          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" :show-password="true" type="password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.roles" multiple placeholder="请选择">
              <el-option
                v-for="item in rolels"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleName"
              />
            </el-select>
          </el-form-item>
        </el-form>

      </span>
      <span slot="footer">
        <el-button size="small" @click="isShow = false">取消</el-button>
        <el-button size="small" type="primary" @click="submit">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import accountApi from '@/api/competence/account'
import mixin from '@/mixins/mixin'
export default {
  mixins: [mixin],
  props: ['rolels'],
  data() {
    return {
      imgUrl: '',
      isShow: false,
      form: {},
      rules: {}
    }
  },
  created() {
  },
  methods: {
    open(val = { roles: [] }) {
      var form = JSON.parse(JSON.stringify(val))
      console.log(form)
      this.isShow = true
      if (form.roles.length !== 0) {
        form.roles = form.roles.split(',')
      }
      form.nickName = form.nick_name
      this.form = form
    },
    uploadSucc(res) {
      this.form.salt = res.data.fileUrl
      this.$forceUpdate()
    },
    save(url, form, type) {
      accountApi[url](form).then(res => {
        if (res.success) {
          this.$message.success(type + '成功')
          this.isShow = false
          this.$emit('break')
        }
      })
    },
    submit() {
      var form = this.form
      form.roleIds = []
      form.roles.forEach(el => {
        this.rolels.forEach(item => {
          if (el === item.roleName) {
            form.roleIds.push(item.id)
          }
        })
      })
      if (this.form.id) {
        this.save('updateUserRolesApi', form, '修改')
      } else {
        this.save('saveUserRolesApi', form, '添加')
      }
    }
  }
}
</script>
<style lang="scss"  scoped>
.avatar-box{
    margin: 10px;
    width:50px;
    height:50px;
    overflow:hidden;
    background-color:#ccc;
    border-radius: 50%;
    .avatar{
  width:50px;
    height:50px;
    }
}
</style>
