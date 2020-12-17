<template>
  <div>
    <el-card class="card" shadow="never">
      <el-collapse :v-model="1">
        <el-collapse-item title="条件搜索" name="1">
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
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="card" shadow="never">
      <div slot="header">
        <span style="display:flex">
          <el-button type="primary" size="small" @click="goAddProduct">新增</el-button>
          <el-input v-model="excelName" style="width:200px;margin:0 10px" placeholder="导出文件名" size="small" clearable />
          <el-button :loading="excelLoading" type="primary" size="small" @click="toExcel">导出成Excel</el-button>

        </span>
      </div>
      <!-- card body -->
      <el-table
        v-loading="mixinLoading"
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
          label="商品图片"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <img style="width:100px;" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="sku"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSku(scope.row.id)">编辑sku</el-button>
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
          label="标签"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div style="margin-bottom:10px">最新:
              <el-switch v-model="scope.row.newStatus" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)" />
            </div>
            <div>推荐:
              <el-switch v-model="scope.row.recommendStatus" :active-value="1" :inactive-value="0" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">

            <el-tag style="margin-right:10px;cursor: pointer;" @click="editProduct(scope.row)">编辑</el-tag>
            <el-tag style="cursor: pointer;" type="danger" @click="delProduct(scope.row)">删除</el-tag>

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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-button type="primary" size="default" @click="addSku">添加</el-button>

      <el-table
        v-loading="loading"
        :data="skuTable"
        border
        stripe
      >

        <el-table-column label="展示图片" width="150" align="center">
          <!-- :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload" -->
          <template slot-scope="scope">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="skuUploadSuccess"
              @click.native="choseSku(scope.row)"
            >

              <img v-if="scope.row.pic" style="width:100px;height:100px" :src="scope.row.pic" class="avatar">
              <i v-else style="width:100px;height:100px" class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </template>
        </el-table-column>

        <!-- 循环sku -->
        <el-table-column
          v-for="(item, index) in keySku"
          :key="index"
          :label="item"
          :width="200"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.spData [index].value" placeholder="" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" :width="200">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              placeholder="请输入价格"
              size="mini"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="skuCode" label="sku编码" :width="200">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.skuCode"
              placeholder="请输入sku编码"
              size="mini"
              clearable
            />
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="sku库存" :width="200">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.stock"
              placeholder="请输入sku库存"
              size="mini"
              clearable
            />
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" :width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="color: red"
              size="mini"
              @click="delSku(scope.row)"
            >删除</el-button>
            <el-button type="text" size="small" @click="saveSku(scope.row)">{{ scope.row.isAdd?'保存':'保存修改' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </el-dialog>

  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import productApi from '@/api/product/product'
import request from '@/api/request'
export default {
  mixins: [mixin],
  data() {
    return {
      searchForm: {},
      skuTable: [],
      dialogVisible: false,
      keySku: [],
      pilotSku: {},
      productId: '',
      loading: false,
      excelName: '',
      excelLoading: false
    }
  },
  created() {
    this.getBrand()
    this.getProductsByPage()
    request({ url: 'http://leju.bufan.cloud/admin/sysAuth/index/getInitMenus' })
  },
  methods: {
    changeStatus(row) {
      console.log(row)
    },
    choseSku(res) {
      this.pilotSku = res
    },
    skuUploadSuccess(file) {
      if (file.success) {
        this.pilotSku.pic = file.data.fileUrl
        this.$forceUpdate()
      }
    },
    addSku() {
      var obj = {
        skuCode: '', // 编码
        price: '', // 价格
        pic: '', // 图片
        stock: '', // 库存
        lowStock: '', // 预警库存
        productId: this.productId,
        isAdd: true,
        // uuid:,
        spData: []
      }
      obj.spData = this.keySku.map((item, index) => {
        return { key: item, value: '' }
      })
      this.skuTable.push(obj)
    },
    delSku(row) {
      this.$confirm('确认删除', '提示', { type: 'warning' }).then(() => {
        productApi.delSkuApi(row.id).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.getSkuList()
          }
        })
      })
    },

    editSku(id) {
      this.productId = id
      this.dialogVisible = true
      this.getSkuList()
    },
    getSkuList() {
      this.loading = true
      productApi.getSkusByProductIdApi(this.productId).then(res => {
        if (res.success) {
          var data = res.data.items
          data.forEach(el => {
            el.spData = JSON.parse(el.spData)
          })
          data.isAdd = false
          this.skuTable = data
          var arr = []
          this.skuTable[0].spData.forEach(el => {
            arr.push(el.key)
          })
          this.keySku = arr
          this.loading = false
        }
      })
    },
    isAddSku(pmsSkuStockList) {
      productApi.addProductSkusApi(pmsSkuStockList).then(res => {
        if (res.success) {
          this.getSkuList()
          this.$message.success('添加成功')
        }
      })
    },
    isUpdataSku(pmsSkuStockList) {
      productApi.updateSkuInfoApi(pmsSkuStockList).then(res => {
        if (res.success) {
          this.getSkuList()
          this.$message.success('修改成功')
        }
      })
    },
    saveSku(row) {
      var pmsSkuStockList = this.skuTable.filter(el => el.id === row.id)[0]
      pmsSkuStockList.spData = JSON.stringify(pmsSkuStockList.spData)
      if (pmsSkuStockList.isAdd) {
        this.isAddSku(pmsSkuStockList)
      } else {
        this.isUpdataSku(pmsSkuStockList)
      }
    },
    editProduct(row) {
      this.$router.push({ name: 'EditProduct', params: { id: row.id }})
    },
    delProduct(row) {
      this.$confirm('删除', '提示', { type: 'warning' }).then(() => {
        productApi.delProductApi(row.id).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.getProductsByPage()
          }
        })
      })
    },
    goAddProduct() {
      this.$router.push({ path: '/addProduct' })
    },
    toExcel() {
      this.excelLoading = true
      const theader = ['商品名称', '商品价格', '商品类别']
      const type = ['name', 'price', 'productCategoryName']
      const data = this.productLs.map(el => {
        return type.map(item => {
          return el[item]
        })
      })
      console.log(data)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: theader, // 表头 必填
          data, // 具体数据 必填
          filename: this.excelName || 'excel', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
        this.excelLoading = false
      })
    }
  }
}
</script>
<style lang="scss"  scoped>
</style>
