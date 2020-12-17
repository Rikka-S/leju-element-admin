import activityApi from '@/api/marketing/activity'
import { getToken } from '@/utils/myAuth'
import { getAllCategoryApi } from '@/api/category/category'
export default {
  data() {
    return {
      // 上传接口
      uploadUrl: '/lejuAdmin/material/uploadFileOss',
      searchForm: {},
      category: [],
      allCategory: [],
      brand: [],
      productLs: [],

      mixinLoading: false,
      // 分页器
      total: 0,
      page: {
        start: 1,
        limit: 10,
        sizes: [5, 10, 15, 20],
        size: 5
      }
    }
  },
  computed: {
    headers() {
      var token = getToken()
      return { token }
    }
  },
  methods: {
    // 获取所有商品列表
    getProductsByPage() {
      this.mixinLoading = true
      activityApi
        .productsByPageApi(this.page.start, this.page.limit, this.searchForm)
        .then((res) => {
          this.productLs = res.data.rows
          this.total = res.data.total
          this.mixinLoading = false
        })
    },
    // 分页器切换
    handleSizeChange(e) {
      this.page.limit = e
      this.getProductsByPage()
    },

    handleCurrentChange(e) {
      this.page.start = e
      this.getProductsByPage()
    },

    // form搜索
    onSearch() {
      this.getProductsByPage()
    },

    // 重置搜索form
    reset() {
      this.searchForm = {}
      this.getProductsByPage()
    },

    // 获取分类
    getAllCategory() {
      getAllCategoryApi().then(res => {
        if (res.success) {
          this.category = res.data.items[1].children
          var category = []
          res.data.items.forEach((el, index) => {
            category.push(el.category)
            category[index].children = el.children
          })
          this.allCategory = category
        }
      })
    },
    // 获取品牌列表
    getBrand() {
      activityApi.findAllBrandApi().then(res => {
        if (res.success) {
          this.brand = res.data.items
        }
      })
    }
  }
}
