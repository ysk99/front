import request from '@/utils/request'

export function baidu_suggest(wd) {
  return request({
    url: '/baidu_suggest',
    method: 'post',
    data: {
      wd
    }
  })
}
// https://api.douban.com/v2/movie/top250
export function douban250() {
  return request({
    url: '/doubanapi',
    method: 'get'
  })
}

export function maoyan100() {
  return request({
    url: '/maoyanapi',
    method: 'get'
  })
}

export function jiexiapi_query() {
  return request({
    url: '/jiexiapi_query',
    method: 'get'
  })
}

export function hotsearchs_query() {
  return request({
    url: '/hotsearchs_query',
    method: 'get'
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
