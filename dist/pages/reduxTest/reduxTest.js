import {
  connect
} from '../../utils/redux'
import actionsType from '../../store/actions/reduxTest';
import { watch, computed } from '../../utils/vuefy.js';
Page(
  connect(
    (state) => {
      return {
        count: state.reduxTest.count
      }
    },
    {
      data: {
        
      },
      initWatch() {
        watch(this, {
          count(val){
            console.log('count变化'+val)
          }
        })
      },
      initComputed(){
        computed(this,{
          hh(){
            return this.data.count+ 'computed'
          }
        })
      },
      handleJia: function () {
        this.dispatch({ type: actionsType.JIA });
      },
      handleJian: function () {
        this.dispatch({ type: actionsType.JIAN });
      },
      onLoad(){
        console.log(1)
      },
      onReady(){
        this.initWatch();
      },
      onShow(){
      
        this.initComputed();
        
      }
      
    })
)
