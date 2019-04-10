import request from '@/utils/request'

export function query(keywd,page) {
  return request({
    url: '/query',
    method: 'post',
    data: {
      keywd,
      page
    }
  })
}

export function query_download(keywd,page) {
  return request({
    url: '/query_download',
    method: 'post',
    data: {
      keywd,
      page
    }
  })
}

// export function querychange(page) {
//   return request({
//     url: '/query?page=' + page,
//     method: 'get'
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
