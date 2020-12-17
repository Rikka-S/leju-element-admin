<template>
  <div>
    <el-card shadow="never" class="card">
      <div style="width: 80%; margin: 30px auto">
        <el-steps :active="orderBase.status + 1">
          <el-step title="代付款" :description="orderBase.createTime" />
          <el-step title="代发货" :description="orderBase.modifyTime" />
          <el-step title="已发货" :description="orderBase.deliveryTime" />
          <el-step title="已完成" :description="orderBase.receiveTime" />
          <el-step title="已关闭" :description="orderBase.finishTime" />
        </el-steps>
      </div>
      <el-divider />

      <div>
        <span>
          <div class="title">
            订单信息：
            <el-tag effect="dark" :type="status[index].type">{{ status[index].title }}</el-tag>
          </div>
          <el-row :gutter="20">
            <el-col
              class="order-info"
              :span="6"
            >订单金额:<span style="color:red">{{ orderBase.totalAmount }}</span></el-col>
            <el-col
              class="order-info"
              :span="6"
            >订单编号:{{ orderBase.orderSn }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >用户账号:{{ orderBase.memberUsername }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >备注:{{ orderBase.payAmount }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >下单时间:{{ orderBase.createTime }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >付款时间:{{ orderBase.paymentTime }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >发货时间:{{ orderBase.deliveryTime }}</el-col>
            <el-col
              class="order-info"
              :span="6"
            >收货时间:{{ orderBase.receiveTime }}</el-col>
          </el-row>
        </span>
      </div>
      <el-divider />
      <div>
        <div class="title">
          收货人信息:
          <!-- <el-tag effect="dark" :type="status[orderBase.status].type">{{ status[orderBase.status].title }}</el-tag> -->
        </div>
        <el-row :gutter="20">
          <el-col
            class="order-info"
            :span="6"
          >收货人:<span>{{ orderBase.receiverName }}</span></el-col>
          <el-col
            class="order-info"
            :span="6"
          >用户姓名:{{ orderBase.memberUsername }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >手机号码:{{ orderBase.receiverPhone }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >邮政编码:{{ orderBase.payAmount }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >地方:{{ orderBase.receiverProvince }}-{{ orderBase.receiverCity }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >详细地址:{{ orderBase.receiverDetailAddress }}</el-col>

        </el-row>
      </div>
      <el-divider />

      <div>
        <div class="title">
          商品信息:
        </div>
        <el-row>
          <el-table :data="orderItems" border stripe>
            <el-table-column
              label="商品名称"
              prop="productName"
            />
            <el-table-column
              label="是否退货"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isReturn===1" style="color:red">是</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              label="价格"
              prop="productPrice"
            />
            <el-table-column
              label="数量"
              prop="productQuantity"
            />
            <el-table-column
              label="小计"
              prop="totalPrice"
            />
          </el-table>

        </el-row>

      </div>
      <el-divider />

      <div>
        <div class="title">
          费用信息:
        </div>
        <el-row>
          <el-col
            class="order-info"
            :span="6"
          >运费:<span>0</span></el-col>
          <el-col
            class="order-info"
            :span="6"
          >订单总金额:{{ orderBase.totalAmount }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >实际金额:{{ orderBase.payAmount }}</el-col>
          <el-col
            class="order-info"
            :span="6"
          >促销优惠金额:0</el-col>
          <el-col
            class="order-info"
            :span="6"
          />
        </el-row>
      </div>

      <el-form v-if="orderBase.status===1" ref="form" :model="shipForm" :rules="rules" label-width="80px" :inline="false" size="small">
        <el-form-item label="物流公司" prop="deliveryCompany">
          <el-select v-model="shipForm.deliveryCompany" placeholder="物流公司">
            <el-option
              label="中通"
              value="中通"
            />
            <el-option
              label="申通"
              value="申通"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="deliverySn">
          <el-input v-model="shipForm.deliverySn" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发货</el-button>
        </el-form-item>
      </el-form>
      <div v-if="orderBase.status===2">
        <div class="title">
          物流信息:{{ orderBase.deliveryCompany }}{{ orderBase.deliverySn }}
        </div>
      </div>
      <div v-if="orderBase.status===3" class="close">
        <el-button type="primary" size="small" @click="closeOrder">关闭订单</el-button>
      </div>
      <div v-if="isReturn===1&&orderBase.status===2" class="close">
        <el-button type="primary" size="small" @click="qCloseOrder">强制确认收货</el-button>
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
      shipForm: {},
      isReturn: '',
      orderItems: [],
      orderBase: {},
      status: [
        { title: '代付款', type: 'danger' },
        {
          title: '代发货',
          type: 'warning'
        },
        {
          title: '已发货',
          type: ''
        },
        {
          title: '已完成',
          type: ''
        },
        {
          title: '已关闭',
          type: ''
        },
        { title: '无效订单', type: 'danger' }
      ],
      rules: {
        deliveryCompany: [
          { required: true, message: '请选择物流公司', trigger: 'blur' }
        ],
        deliverySn: [
          { required: true, message: '请填写单号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      orderApi.orderDetailApi(this.id).then((res) => {
        if (res.success) {
          this.orderItems = res.data.orderDetail.orderItems
          this.orderBase = res.data.orderDetail.orderBase
          this.index = this.orderBase.status
          this.isReturn = this.orderItems[0].isReturn
        }
      })
    },
    closeOrder() {
      orderApi.finishOrderApi(this.id).then(res => {
        if (res.success) {
          this.$router.push({ path: '/orderLs' })
        }
      })
    },
    qCloseOrder() {
      orderApi.receiveProductsForceApi(this.id).then(res => {
        if (res.success) {
          this.$message.success('成功')
          this.getOrderDetail()
        }
      })
    },
    onSubmit() {
      orderApi.sendDoneApi({ ...this.shipForm, orderId: this.id }).then(res => {
        if (res.success) {
          this.$message.success('发货成功')
          this.getOrderDetail()
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
.order-info {
  line-height: 40px;
  font-size: 14px;
  padding-bottom: 10px;
  color: #393c3e;
}
.close{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
