<template>
  <div>
    <el-card shadow="never">
      <!-- card body -->
      <div class="step">
        <el-steps :active="step" finish-status="success">
          <el-step title="商品基本信息" />
          <el-step title="添加库存信息" />
          <el-step title="添加移动端详细" />
        </el-steps>
      </div>
    </el-card>
    <el-card shadow="never" class="card">
      <!-- card body -->
      <el-form
        ref="form"
        :model="productInfo"
        size="small"
        :rules="rules"
        label-width="100px"
        :inline="false"
      >
        <div v-show="step==1">
          <div class="title">基本信息</div>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="name" label="商品名称">
                <el-input
                  v-model="productInfo.name"
                  placeholder="商品名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="商品编码">
                <el-input
                  v-model="productInfo.productSn"
                  placeholder="商品编码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="商品分类">
                <el-select v-model="productInfo.productCategoryId" style="width:100%" placeholder="商品分类" @change="changeSelect($event,'category','productCategoryName')">
                  <el-option
                    v-for="item in category"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="商品品牌">
                <el-select v-model="productInfo.brandId" style="width:100%" placeholder="品牌" @change="changeSelect($event,'brand','brandName')">
                  <el-option
                    v-for="item in brand"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="商品描述">
                <el-col :span="15" :offset="0">
                  <el-input v-model="searchForm.description" type="textarea" placeholder="商品描述" />

                </el-col>

              </el-form-item>
            </el-col>
          </el-row>
          <div class="title">商品属性</div>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item label="商品原价">
                <el-input-number v-model="productInfo.price" style="width:100%" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="促销类型">
                <el-input-number style="width:100%" :disabled="true" placeholder="没有" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="活动价格">
                <el-input-number value="0" :disabled="true" style="width:100%" :min="0" />

              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="重量(kg)">
                <el-input-number v-model="productInfo.weight" style="width:100%" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-col :span="7" :offset="0">
                <el-form-item label="审核状态">
                  <el-switch v-model="productInfo.verifyStatus" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="是否上架">
                  <el-switch v-model="productInfo.publishStatus" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="缩略图">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <img v-if="productInfo.pic" :src="productInfo.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>
          <div class="title">其他信息</div>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item label="推荐状态">
                <el-switch v-model="productInfo.recommendStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="新品状态">
                <el-switch v-model="productInfo.newStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="预告商品">
                <el-switch v-model="productInfo.previewStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="搜搜关键词">
                <el-input
                  v-model="productInfo.keywords"
                  placeholder="搜搜关键词"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="库存预警">
                <el-input-number v-model="productInfo.lowStock" style="width:100%" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="商品排序">
                <el-input-number v-model="productInfo.sort" style="width:100%" :min="0" />

              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="产品服务">
                <el-checkbox-group v-model="productInfo.serviceIds">
                  <el-checkbox label="1">无忧退货</el-checkbox>
                  <el-checkbox label="2">快速退款</el-checkbox>
                  <el-checkbox label="3">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

          </el-row>
        </div>
        <div v-show="step==2">
          <div class="title">sku信心</div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="标题">
                <el-input v-model="productInfo.detailTitle" placeholder="标题" />
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="0">
              <el-form-item label="副标题">
                <el-input v-model="productInfo.detailDesc" placeholder="副标题" />
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="画册图片">
                <el-upload
                  :action="uploadUrl"
                  :headers="headers"
                  list-type="picture-card"
                  :file-list="albumPics"
                  :on-success="albumPicsSuccess"
                  :on-remove="removeAlbumPics"
                >
                  <i class="el-icon-plus" />
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="sku设置">
                <div v-for="(value,key,index) in sku" :key="index">
                  <div v-if="value.Ls.length!=0" style="display:flex">
                    <div style="margin-right:10px"> {{ value.name }}:</div>
                    <el-checkbox-group v-model="value.select">
                      <el-checkbox v-for="(el,vindex) in value.Ls" :key="vindex" :label="el">{{ el }}
                        <el-button type="text" size="small" style="color:red" @click="delEle(el,key)">删除</el-button>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <!-- <div v-if="sku.size.length!=0" style="display:flex">
                  <div style="margin-right:10px"> 大小:</div>
                  <el-checkbox-group v-model="selectEle.sizeLs">
                    <el-checkbox v-for="item in sku.size" :key="item" :label="item">{{ item }}
                      <el-button type="text" size="small" style="color:red" @click="delEle(item,'size')">删除</el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </div> -->
                <el-col :span="5" :offset="0">
                  <el-input v-model="sku.color.val" placeholder="颜色" />
                </el-col>
                <el-col :span="3" :offset="0">
                  <el-button size="small" @click="addEle('color')">添加颜色选项</el-button>
                </el-col>

                <el-col :span="5" :offset="0">
                  <el-input v-model="sku.size.val" placeholder="大小" />
                </el-col>
                <el-col :span="3" :offset="0">
                  <el-button size="small" @click="addEle('size')">添加大小选项</el-button>
                </el-col>
                <el-col :span="7" :offset="0">
                  <el-button type="primary" size="small" @click="createSku">生成sku列表</el-button>
                  <el-button type="primary" size="small" @click="addSku">新增sku</el-button>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-table
                v-if="skuTable.length > 0"
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
                  </template>
                </el-table-column>
              </el-table>

            </el-col>

          </el-row>

        </div>
        <div v-show="step==3">
          <TinEditor ref="tin" />
        </div>
        <div class="center">
          <el-form-item style="center">
            <el-button v-show="step!=1" @click="preStep">上一步</el-button>
            <el-button v-show="step!=3" type="primary" @click="nextStep">下一步</el-button>
            <el-button v-show="step===3" type="success" @click="submit">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import TinEditor from '@/components/Tinymce'
import mixin from '@/mixins/mixin'
import { v4 as myV1 } from 'uuid'
import productApi from '@/api/product/product'
export default {
  components: {
    TinEditor
  },
  mixins: [mixin],
  data() {
    return {
      id: '',
      step: 1,
      albumPics: [],
      productInfo: { price: 0, serviceIds: [], lowStock: 0, sort: 0 },
      keySku: [],
      sku: {
        color: {
          val: '',
          name: '颜色',
          Ls: [],
          select: []
        },
        size: {
          val: '',
          name: '大小',
          Ls: [],
          select: []
        }
      },
      skuTable: [],
      skuList: [],
      pilotSku: {},
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id) {
      this.isEdit()
    }
    this.getBrand()
    this.getAllCategory()
  },
  methods: {
    changeSelect(val, arr, type) {
      this[arr].forEach(el => {
        if (el.id === val) {
          this.productInfo[type] = el.name
        }
      })
      console.log(this.productInfo)
      // this.productInfo[type] = val
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
    uploadSuccess(file) {
      if (file.success) {
        this.productInfo.pic = file.data.fileUrl
        this.$forceUpdate()
      }
    },
    // 照片墙
    albumPicsSuccess(res, file, fileList) {
      this.productInfo.albumPics = []
      fileList.forEach(el => {
        this.productInfo.albumPics.push(el.response.data.fileUrl)
      })
    },
    removeAlbumPics(file, fileList) {
      this.productInfo.albumPics = []
      fileList.forEach(el => {
        this.productInfo.albumPics.push(el.url)
      })
    },
    addEle(type) {
      var ele = this.sku[type]
      if (ele.val === '' || ele.Ls.includes(ele.val)) {
        this.$message.warning('填写或已有元素')
      } else {
        ele.Ls.push(ele.val)
        ele.val = ''
      }
    },
    delEle(val, type) {
      var eleLs = this.sku[type].Ls
      var index = eleLs.findIndex(el => el === val)
      eleLs.splice(index, 1)
    },

    createSku() {
      this.skuTable = []
      var valueSku = []
      var keySku = []
      for (const key in this.sku) {
        if (this.sku[key].select.length !== 0) {
          valueSku.push(this.sku[key].select)
          keySku.push(this.sku[key].name)
        }
      }
      if (valueSku.length === 0) {
        this.$message.warning('请选必要的元素')
        return
      }
      const arr = valueSku.reduce((total, next) => {
        var list = []
        total.forEach(el => {
          next.forEach(item => {
            if (typeof el === 'object') {
              list.push([...el, item])
            } else {
              list.push([el, item])
            }
          })
        })
        return list
      })
      // this.sku.color.select.forEach(color => {
      //   this.sku.size.select.forEach(size => {
      //     spData.push([color, size])
      //   })
      // })
      this.$confirm('xxxxxx', '提示').then(() => {
        this.keySku = keySku
        console.log(arr)
        this.initSkuTable(arr)
      }).catch(() => { return })
    },

    delSku(row) {
      this.$confirm('确认删除', '提示', { type: 'warning' }).then(() => {
        for (let index = 0; index < this.skuTable.length; index++) {
          if (this.skuTable[index].id === row.id || this.skuTable[index].uuid === row.uuid) {
            this.skuTable.splice(index, 1)
            break
          }
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    initSkuTable(arr) {
      arr.forEach(el => {
        var obj = {
          skuCode: '', // 编码
          price: '', // 价格
          pic: '', // 图片
          stock: '', // 库存
          lowStock: '', // 预警库存
          uuid: myV1(),
          // uuid:,
          spData: []
        }
        obj.spData = this.keySku.map((item, index) => {
          return { key: item, value: el[index] }
        })
        this.skuTable.push(obj)
      })
    },
    addSku() {
      if (this.skuTable.length === 0) {
        this.message.warning('请先生成sku')
        return
      }
      var obj = {
        skuCode: '', // 编码
        price: '', // 价格
        pic: '', // 图片
        stock: '', // 库存
        lowStock: '', // 预警库存
        uuid: myV1(),
        // uuid:,
        spData: []
      }
      obj.spData = this.keySku.map((item, index) => {
        return { key: item, value: '' }
      })
      this.skuTable.push(obj)
    },
    preStep() {
      this.step--
    },
    nextStep() {
      this.step++
    },

    isEdit() {
      productApi.productSkusDetailApi(this.id).then(res => {
        if (res.success) {
          var data = res.data
          data.product.albumPics = data.product.albumPics.split(',')
          data.product.serviceIds = data.product.serviceIds.split(',')
          this.productInfo = data.product
          this.productInfo.albumPics.forEach(el => {
            this.albumPics.push({ url: el })
          })
          if (data.skus.length > 0) {
            data.skus.forEach(el => {
              el.spData = JSON.parse(el.spData)
            })
            this.skuTable = data.skus
            this.skuTable.forEach(el => {
              el.spData.forEach((item, index) => {
                for (const key in this.sku) {
                  if (item.key === this.sku[key].name) {
                    if (this.sku[key].select.includes(item.value)) {
                      return
                    } else {
                      this.sku[key].select.push(item.value)
                    }
                    this.sku[key].Ls = this.sku[key].select
                  }
                }
              })
            })
            this.skuTable[0].spData.forEach(el => {
              this.keySku.push(el.key)
            })
          }
        }
      })
    },
    isUpdata(obj) {
      productApi.updateProductAndSkusApi(obj).then(res => {
        if (res.success) {
          this.$message.success('修改成功')
          this.$router.push({ path: '/productLs' })
        }
      })
    },
    isAdd(obj) {
      productApi.addProductAndSkusApi(obj).then(res => {
        if (res.success) {
          this.$message.success('添加成功')
          this.$router.push({ path: '/productLs' })
        }
      })
    },
    submit() {
      this.productInfo.detailMobileHtml = this.$refs.tin.getContent()
      var productInfo = this.productInfo
      productInfo.albumPics = productInfo.albumPics.join()
      productInfo.serviceIds = productInfo.serviceIds.join()
      var pmsSkuStockList = this.skuTable
      pmsSkuStockList.forEach(el => {
        el.spData = JSON.stringify(el.spData)
      })
      var obj = {
        pmsSkuStockList: pmsSkuStockList,
        product: productInfo
      }
      if (this.id) {
        console.log('updata')
        this.isUpdata(obj)
      } else {
        console.log('add')
        this.isAdd(obj)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.step {
  width: 65%;
  margin: 20px auto;
}
.title {
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
</style>
