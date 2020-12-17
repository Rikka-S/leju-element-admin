<template>
  <div>
    <el-card shadow="never" class="card">
      <div slot="header">
        <span><!-- card title --></span>
      </div>
      <!-- card body -->
      <el-table
        :data="allCategory"
        border
        stripe
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="name"
          label="名称"
          width="200"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="200"
        />
        <el-table-column
          prop="showStatus"
          label="是否显示"
        />
        <el-table-column
          prop="navStatus"
          label="是否最新"
        />
        <el-table-column
          prop="keywords"
          label="关键词"
        />
      </el-table>
    </el-card>

  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
    }
  },
  created() {
    this.getAllCategory()
  },
  methods: {
  }
}
</script>
<style lang="scss"  scoped>
</style>
