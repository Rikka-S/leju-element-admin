<template>
  <div>
    <el-card shadow="never" class="card">
      <!-- card body -->
      <div class="title">
        订单信息：
        <el-tag effect="dark" :type="status[index].type">{{ status[index].title }}</el-tag>
      </div>
      <el-table :data="backTable" border stripe>
        <el-table-column
          label="商品名称"
          prop="productName"
        />
        <el-table-column
          label="价格"
          prop="productPrice"
        />
        <el-table-column
          label="数量"
          prop="productCount"
        />
        <el-table-column
          label="小计"
          prop="productRealPrice"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-tag v-if="index===2" effect="dark" :type="status[index].type">{{ status[index].title }}</el-tag>
            <el-button v-else type="text" size="small" @click="toProductDetail(scope.row)">查看详细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
      <div class="title">
        费用信息：
      </div>
      <div>退单金额<span style="color:red;margin:0 10px">{{ backDetail.returnAmount }}</span>运费<span style="color:red;margin:0 10px">0</span></div>

      <el-form v-if="index===0" ref="form" :model="backForm" :rules="rules" label-width="100px" :inline="false" size="small">
        <el-divider />
        <el-row style="margin:10px">
          <el-col :span="5" :offset="0">  <el-form-item label="确认退矿金额">
            <el-input-number
              v-model="backForm.returnAmount"
              :min="0"
              :max="backForm.returnAmount"
              :step="1"
            />

          </el-form-item></el-col>
          <el-col :span="8" :offset="0">  <el-form-item label="处理人" prop="handleMan">
            <el-input v-model="backForm.handleMan" />
          </el-form-item></el-col>
          <el-col :span="8" :offset="0">  <el-form-item label="处理备注" prop="handleNote">
            <el-input v-model="backForm.handleNote" />
          </el-form-item></el-col>
        </el-row>
        <div class="flex-center">
          <el-form-item>
            <el-button type="primary" @click="agree">同意退货</el-button>
            <el-button type="primary" @click="reject">拒绝退货</el-button>
          </el-form-item></div>
      </el-form>
      <div v-if="index>=1">
        <el-divider />
        <div class="title">
          处理结果
        </div>
        <div>处理人:{{ backDetail.handleMan }}</div>
      </div>
      <el-form v-if="index===1" ref="form" :model="receiveForm" label-width="100px" :inline="false" size="small">
        <el-divider />
        <el-row>
          <el-col :span="5" :offset="0">  <el-form-item label="收货人" prop="handleMan">
            <el-input v-model="receiveForm.receiveMan" />
          </el-form-item></el-col>
          <el-col :span="5" :offset="0">    <el-form-item label="收货备注" prop="handleNote">
            <el-input v-model="receiveForm.receiveNote" />
          </el-form-item></el-col>
          <el-col :span="5" :offset="0">    <el-form-item>
            <el-button type="primary" @click="receive">确认收货</el-button>
          </el-form-item></el-col>
        </el-row>

      </el-form>
      <div v-if="index === 2">
        <el-divider />
        <div class="title">
          收货信息
        </div>
        <div>退单收货人:{{ backDetail.receiveMan }}</div>
      </div>
    </el-card>

  </div>
</template>
<script>
import orderApi from '@/api/order/order'
export default {
  data() {
    return {
      id: '',
      index: 0,
      backDetail: {},
      backTable: [],
      backForm: {},
      receiveForm: {},
      status: [
        { title: '待处理',
          type: 'danger'
        }, {
          title: '退货中',
          type: 'warning'
        }, {
          title: '已完成',
          type: ''
        }, {
          title: '已拒绝',
          type: ''
        }],
      rules: {
        handleMan: [
          { required: true, message: '请填写处理人', trigger: 'blur' }
        ],
        handleNote: [
          { required: true, message: '请填写处理备注', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getBackDetail()
  },
  methods: {
    getBackDetail() {
      orderApi.orderReturnApi(this.id).then(res => {
        if (res.success) {
          this.backDetail = res.data.orderReturnApply
          this.backTable = [this.backDetail]
          this.index = this.backDetail.status
          this.backForm.returnAmount = this.backDetail.returnAmount
        }
      })
    },
    toProductDetail(row) {
      this.$router.push({ name: 'OrderDetail', params: { id: row.orderId }})
    },
    agree() {
      orderApi.agreeApplyApi(this.id, { ...this.backForm, id: this.id }).then(res => {
        if (res.success) {
          this.$message.success('成功')
          this.getBackDetail()
        }
      })
    },
    reject() {
      orderApi.rejectApplyApi(this.id, { ...this.backForm, id: this.id }).then(res => {
        if (res.success) {
          this.$message.success('成功')
          this.getBackDetail()
        }
      })
    },
    receive() {
      orderApi.receiveProductApi(this.id, { ...this.receiveForm, id: this.id }).then(res => {
        if (res.success) {
          this.$message.success('成功')
          this.getBackDetail()
        }
      })
    }
  }
}
</script>
<style lang="scss"  scoped>
.title{
        color: rgba(0,0,0,.85);
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 20px;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
