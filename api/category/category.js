import request from '@/api/request'

export function getAllCategoryApi() {
  return request({
    url: `/lejuAdmin/category/getAllCategory`,
    method: 'get'
  })
}
