<template>
  <div>
    <el-dialog
      title="编辑用户"
      :visible.sync="isShow"
      width="30%"
    >
      <span>
        <el-form ref="form" :model="roleDetail" label-width="80px" :inline="false" size="small">
          <el-form-item label="角色名称">
            <el-input v-model="roleDetail.roleName" />
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input v-model="roleDetail.roleCode" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleDetail.remark" :show-password="true" type="textarea" />
          </el-form-item>
          <el-form-item label="选择菜单">
            <div>
              <el-checkbox v-model="isAllShow" label="" :indeterminate="false" @change="unfoldTree">展开</el-checkbox>
              <el-checkbox v-model="isAllCheck" label="" :indeterminate="false" @change="checkAll">全选/取消</el-checkbox>
            </div>
            <el-tree
              ref="tree"
              :data="permissions"
              :show-checkbox="true"
              :default-expand-all="false"
              node-key="id"
              highlight-current
              :props="defaultProps"
            />
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
import roleApi from '@/api/competence/role'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['permissions'],
  data() {
    return {
      id: '',
      isShow: false,
      isAllShow: false,
      isAllCheck: false,
      roleDetail: {},
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
  },
  methods: {
    look() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    unfoldTree() {
      // this.$refs.tree.defaultExpandAll = this.isAllShow
    },
    checkAll() {
      if (this.isAllCheck) {
        var arr = []
        this.permissions.forEach(el => arr.push(el.id))
        this.$refs.tree.setCheckedKeys(arr)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    open(id) {
      if (id) {
        this.id = id
        roleApi.roleApi(id).then(res => {
          if (res.success) {
            this.roleDetail = res.data.role
            var permissionIds = res.data.role.permissionIds || []
            this.$refs.tree.setCheckedKeys(permissionIds)
          }
        })
      } else {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
        })
        this.roleDetail = {}
      }
      this.isShow = true
    },
    save(data, url, type) {
      roleApi[url]({ ...this.roleDetail, permissionIds: data }).then(res => {
        if (res.success) {
          this.$message.success(type + '成功')
          this.isShow = false
          this.$emit('break')
        }
      })
    },
    submit() {
      var permissionIds = this.$refs.tree.getCheckedKeys()
      if (this.id) {
        this.save(permissionIds, 'updateRolePermissionsApi', '修改')
      } else {
        this.save(permissionIds, 'saveRolePermissionsApi', '添加')
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
