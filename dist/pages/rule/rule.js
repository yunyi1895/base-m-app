const app = getApp()
import { api_queryMemberClauseAddress} from '../../utils/api.js';
import { watch, computed } from '../../utils/vuefy.js';
Page({
  data:{
    clausePic:[]
  },
  initWatch() {
    watch(this, {
      
    })
  },
  initComputed(){
    computed(this,{

    })
  },
  onShow(){

  },
  onLoad(){
    this.initWatch();
    this.initComputed();
    this.init();
  },
  init(){
    app.ajax.post(api_queryMemberClauseAddress,{

    }).then(res=>{
      if(res.status==0){
        this.setData({
          clausePic:res.data.clausePic||[]
        })
      }
      console.log(res)
    })
  }
})