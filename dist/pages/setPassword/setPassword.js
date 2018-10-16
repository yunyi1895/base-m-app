const app = getApp()
import { api_getSMSVerifyCode } from '../../utils/api.js';
import { watch, computed } from '../../utils/vuefy.js';
import util from '../../utils/util.js';
Page({
  data: {
    canSub: false,
    ps1: '',
    ps2: '',
    visible:false
  },
  initWatch() {
    watch(this, {
      
      ps1(val) {
        this.setData({
          canSub: val.length > 5 ? true : false
        })
      }
    })
  },
  onLoad() {
    this.initWatch()
  },
  handleGetCode() { 
    let a=util.checkPassword(this.data.ps1);
    if(a){

    }else{
      wx.showToast({
        title: '（字母/数 字/特殊字符）组合的密码',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    }
  },
  setPassword1(e) {
    var inputValue = e.detail.value;
    this.setData({
      ps1: inputValue
    })
  },
  changeVisible(){
    this.setData({
      visible:!this.data.visible
    })
  }
 
})