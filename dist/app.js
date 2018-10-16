//app.js
import fetch from './utils/fetch.js';
import day from './assets/js/day.js'//https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/README.zh-CN.md
import wxPromise from './utils/wxPromise.js';
import { api_getOpenId } from './utils/api.js';
import getQuery from './utils/scene.js';
import QQMapWX from './utils/qqmap-wx-jssdk.min.js';
import {createStore} from './utils/redux.js';
import reduce from './store/reduce/index.js';
createStore(reduce,'onLoad');//创建redux
var qqMapWX = new QQMapWX({
  key: 'IGLBZ-LC6LP-IS5DM-VBXX3-S4A4F-DCBNF' // 必填
});
App({
  ajax: fetch,//ajax封装
  day: day,//day.js
  wxP: wxPromise,//微信方法Promise化
  qqMapWX:qqMapWX,//腾讯地图插件
  onLaunch(e) { //全局只触发一次
    this.getAppKey(e.scene, e.query);
    this.getSetting()
  },
  globalData: {
    userInfo: null,
    userSetting: {},
    openid: '',
    session_key: '',
    query: {},
    codeTime:20,
    codeInterval:null,
    loginPhoneNum:'12111111111'
  },
  setGlobalData(key, val) {
    if (key && val) {
      console.log('Key: ' + key)
      console.log('Val: ' + JSON.stringify(val))
      this.globalData[key] = val
    } else {
      console.log('globalData设置出错')
    }
  },
  getSetting() {
    wxPromise.getSetting().then(res => {
      this.userSetting = res.authSetting
    })
  },
  login() {
    wx.login({
      success: res => {
        this.getOpenId(res.code)
      }
    })
  },
  getOpenId(code) {
    fetch.get(api_getOpenId, {
      js_code: code
    }).then(res => {
      if (res.openid) {
        this.session_key = res.session_key;
        this.openid = res.openid;
      }
      console.log(res)
    })
  },
  getAppKey(sceneId, query) {
    let q = getQuery(sceneId, query)
    this.globalData.query = q
    console.log(q)
  }
})