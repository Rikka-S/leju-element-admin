import request from '@/api/request'

export function uploadImg(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`,
    method: 'post',
    data
  })
}
