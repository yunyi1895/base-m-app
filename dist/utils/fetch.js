const baseURL = `https://csms-test.evcard.vip/evcard-rest-api/api`
const wxURL = 'http://10.2.49.161:3000'
function fetch(url, method, data, params, isLoading = false, title = '请求中') {
  let headers = { 'content-type': 'application/json' }
  return new Promise((resolve, reject) => {
    var R_URL = url.substring(0, 3) == '/wx' ? wxURL : baseURL;
    isLoading && wx.showLoading({
      icon: 'loading',
      title: title
    })
    isLoading && wx.showNavigationBarLoading()
    const URL = R_URL + url + urlEncode(params)
    console.log('[HTTP]', method, URL)
    wx.request({
      url: URL,
      method: method,
      data: Object.assign({}, data),
      header: headers,
      success: res => {
        isLoading && wx.hideLoading()
        isLoading && wx.hideNavigationBarLoading()
        resolve(res.data)
      },
      fail: error => {
        isLoading && wx.hideLoading()
        isLoading && wx.hideNavigationBarLoading()
        reject(error)
        console.log('fetch error', error)
      }
    })
  })
}
function uploadFile(url, filePath, formData, isLoading = false, title = '上传中') {
  return new Promise((resolve, reject) => {
    isLoading && wx.showLoading({
      icon: 'loading',
      title: title
    })
    isLoading && wx.showNavigationBarLoading()
    wx.uploadFile({
      url: baseURL + url,
      filePath: filePath,
      name: 'file',
      formData: Object.assign({}, formData),
      success: function (res) {
        isLoading && wx.hideLoading()
        isLoading && wx.hideNavigationBarLoading()
        resolve(typeof res === 'string' ? JSON.parse(res) : res);
      },
      fail: function (error) {
        isLoading && wx.hideLoading()
        isLoading && wx.hideNavigationBarLoading()
        reject(typeof error === 'string' ? JSON.parse(error) : error)
      }
    })
  })
}

function urlEncode(params) {
  if (params) {
    var result = '?'
    for (let key in params) {
      result += `${key}=${params[key]}&`
    }
    return result
  }
  return ''
}

function hpost(url, body, params) {
  return fetch(url, 'POST', body, params)
}
function hpostl(url, body, params) {
  return fetch(url, 'POST', body, params, true)
}
function hget(url, params) {
  return fetch(url, 'GET', null, params)
}
function hgetl(url, params) {
  return fetch(url, 'GET', null, params, true)
}
function upFile(url, path, formData) {
  return uploadFile(url, path, formData, true)
}
export default {
  post: hpost,
  postl: hpostl,
  get: hget,
  getl: hgetl,
  upFile: upFile
}


