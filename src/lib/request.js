// import axios from 'axios'
// import { message } from 'antd'
//
// const defaultAxionsConf = {   // 请求的过期时间
//   timeout: 5000
// }
//
// const _request = (params = {}, fn = () => {}) => {
//   return axios({ ...defaultAxionsConf, ...params })
//     .then(res => {
//       const { success, data, err, code } = res.data
//
//       if (code === 401) {
//         window.location.href = '/'
//
//         return
//       }
//
//       if (success) {
//         fn(false)
//
//         return data
//       }
//
//       throw err
//     })
//     .catch(err => {
//       fn(false)
//
//       message.err(String(err || '网络错误'))
//     })
// }
//
// export default (param) => {
//   const type = typeof param
//
//   if(type === 'function') {
//     param(true)
//
//     return (obj) => _request(obj, param)
//   }
//
//   if(type === 'object' && type !== null) {
//     return __request(param)
//   }
// }

import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

const _request = (params = {}, fn = () => {}) => {
  return axios({ ...defaultAxiosConf, ...params })
    .then(res => {
      const { success, data, err, code } = res.data

      if (code === 401) {
        window.location.href = '/'

        return
      }

      if (success) {
        fn(false)

        return data
      }

      throw err
    })
    .catch(err => {
      fn(false)

      message.error(String(err || '网络错误'))
    })
}

export default (param) => {
  const type = typeof param

  if (type === 'function') {
    param(true)

    return (obj) => _request(obj, param)
  }

  if (type === 'object' && type !== null) {
    return _request(param)
  }
}
