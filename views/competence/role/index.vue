<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span>
          <el-button type="primary" size="small" @click="addRole">新增</el-button>

        </span>
      </div>
      <!-- card body -->
      <el-table :data="roleLs" border stripe>
        <el-table-column
          type="index"
          label="#"
        />
        <el-table-column
          v-for="col in columns"
          :key="col.id"
          :prop="col.id"
          :label="col.label"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="delRole(scope.row)">删除</el-button>

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
    <Dialog ref="roleDialog" :permissions="permissions" @break="init" />
  </div>
</template>
<script>
import roleApi from '@/api/competence/role'
import Dialog from './components/Dialog'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      permissions: [],
      roleLs: [],
      columns: [
        { id: 'roleName',
          label: '角色名称'
        },
        { id: 'roleCode',
          label: '角色编码'
        },
        { id: 'remark',
          label: '备注'
        },
        { id: 'createTime',
          label: '创建时间'
        }
      ],
      total: 0,
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
    this.findAllPermissions()
  },
  methods: {
    init() {
      roleApi.findRolesByPageApi(this.page.start, this.page.limit).then(res => {
        if (res.success) {
          this.roleLs = res.data.rows
          this.total = res.data.total
        }
      })
    },
    findAllPermissions() {
      roleApi.findAllPermissionsApi().then(res => {
        if (res.success) {
          this.permissions = res.data.menus
        }
      })
    },
    addRole() { this.$refs.roleDialog.open() },
    editRole(row) {
      this.$refs.roleDialog.open(row.id)
    },
    delRole(row) {
      this.$confirm('确认删除', '提示', { type: 'warning' }).then(() => {
        roleApi.removeRoleApi(row.id).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.init()
          }
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
</style>
