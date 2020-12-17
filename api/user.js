import request from '@/api/request'

export function login(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'post',
    data
  })
}
export function baseDataApi() {
  return request({
    url: `/lejuAdmin/dashboard/baseData`
  })
}
export function findMembersByPageApi(start, limit) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`
  })
}

