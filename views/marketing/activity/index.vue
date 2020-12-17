<template>
  <div>
    <el-card class="card" shadow="never">
      <div slot="header">
        <span><el-button type="primary" size="small" @click="productLsVisible = true">
          新增</el-button></span>
      </div>
      <!-- card body -->
      <el-table :data="tableLs" style="width: 100%" :border="true">
        <el-table-column fixed type="index" label="序号" />
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img style="width: 100px" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column label="活动时间" width="250">
          <template slot-scope="scope">
            <div>开始时间:{{ scope.row.promotionStartTime }}</div>
            <div>结束时间:{{ scope.row.promotionEndTime }}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否过期">
          <template slot-scope="scope">
            {{ scope.row.promotionEndTime ? "否" : "过期" }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="200" />
        <el-table-column prop="brandName" label="商品品牌" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          width="100"
        />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color: red"
              @click.native.prevent="deleteRow(scope.row.recommendId)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="热销详细"
      :visible.sync="productLsVisible"
      width="75%"
      top="0"
    >
      <el-card shadow="never">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <!-- card body -->
        <el-form ref="form" size="mini" :model="searchForm" label-width="0">
          <el-row type="flex" justify="space-between">
            <el-col :span="4">
              <el-form-item label="">
                <el-input
                  v-model="searchForm.name"
                  placeholder="商品名称模糊查询"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <el-input
                  v-model="searchForm.productSn"
                  placeholder="商品货号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <el-select v-model="searchForm.brandId" placeholder="品牌">
                  <el-option
                    v-for="item in brand"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select> </el-form-item></el-col>
            <el-col :span="3" :offset="0">
              <el-form-item label="">
                <el-select
                  v-model="searchForm.publishStatus"
                  placeholder="上架状态"
                >
                  <el-option label="未上架" :value="0" />
                  <el-option label="已上架" :value="1" />
                </el-select> </el-form-item></el-col>
            <el-col :span="3" :offset="0">
              <el-form-item label="">
                <el-select
                  v-model="searchForm.verifyStatus"
                  placeholder="审核状态"
                >
                  <el-option label="未审核" :value="0" />
                  <el-option label="已审核" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="0">
              <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card style="margin-top:20px;height:500px;overflow: auto;" shadow="never">
        <div slot="header">
          <span><!-- card title -->商品列表</span>
        </div>
        <!-- card body -->
        <el-table
          :data="productLs"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            align="center"
            type="index"
          />
          <el-table-column
            label="选择"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              <el-radio v-model="isActivity" @change="addActivity(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column
            label="商品图片"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <img style="width:100px;" :src="scope.row.pic" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            align="center"
          />
          <el-table-column
            prop="price"
            label="商品价格"
            align="center"
          />
          <el-table-column
            prop="productCategoryName"
            label="商品类别"
            align="center"
          />
          <el-table-column
            prop="weight"
            label="重量"
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
    </el-dialog>
    <el-dialog
      title="编辑限时活动"
      :visible.sync="productDetailVisible"
      width="40%"
    >
      <el-date-picker
        v-model="value"
        type="datetime"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changedata"
      />
    </el-dialog>
  </div>
</template>
<script>
import activityApi from '@/api/marketing/activity'
import mixins from '@/mixins/mixin'
export default {
  mixins: [mixins],
  data() {
    return {
      tableLs: [],
      productLsVisible: false,
      productDetail: {},
      productDetailVisible: false,
      isActivity: false,
      value: ''
    }
  },
  created() {
    this.getBrand()
    this.init()
    this.getProductsByPage()
  },
  methods: {
    // 获取活动商品列表 和 品牌列表
    async init() {
      this.tableLs = (await activityApi.findAllRecommendsApi()).data.items
    },

    // 删除活动商品
    deleteRow(id) {
      this.$confirm('确认删除', '提示')
        .then(() => {
          activityApi.delRecommendApi(id).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              this.init()
            }
          })
        })
        .catch(() => {})
    },

    // 添加活动商品
    addActivity(row) {
      this.productDetailVisible = true
      this.productDetail = row
    },
    changedata() {
      console.log(this.value)
    }
  }
}
</script>
<style lang="scss"  scoped>
</style>
