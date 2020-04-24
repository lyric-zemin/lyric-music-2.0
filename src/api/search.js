import http from './http'

export function search(k, p = 1) {
  return http({
    url: '/getSearchByKey',
    params: {
      key: k,
      page: p
    }
  }).then(res => {
    return res.data.song.list
  })
}