import {
  connect
} from '../../utils/redux'
import actionsType from '../../store/actions/reduxTest';
import * as echarts from '../../components/ec-canvas/echarts';
import { watch, computed } from '../../utils/vuefy.js';
//import geoJson from './mapData.js';
import geoJson from './china.js';
import option from './options.js';


Page(
  connect(
    (state) => {
      return {
        count: state.reduxTest.count
      }
    },
    {
      data: {
        showCover:true,
        tooltipObj:{
          left:'-1000px',
          top:'-1000px',
          content:''
        },
        ec: {
          lazyload: true 
        }
      },
      initWatch() {
        watch(this, {
          count(val) {
            console.log('count变化' + val)
          }
        })
      },
      initComputed() {
        computed(this, {
          hh() {
            return this.data.count + 'computed'
          }
        })
      },
      handleJia: function () {
        this.dispatch({ type: actionsType.JIA });
      },
      handleJian: function () {
        this.dispatch({ type: actionsType.JIAN });
      },
      initMap() {
        let vm = this;
        this.mapComponent.init((canvas, width, height,dpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
          });
          canvas.setChart(chart);
          echarts.registerMap('henan', geoJson);
          var options = Object.assign({},option,{
            position: function (point, params, dom, rect, size) {
              vm.setData({
                showCover:false
              })
              let x = point[0],
                y = point[1],
                viewWidth = size.viewSize[0],
                boxWidth = size.contentSize[0],
                posX = 0;
              if (x + boxWidth > viewWidth) {
                posX = x - boxWidth;
              } else {
                posX = x;
              }
              vm.setData({
                tooltipObj:{
                  left:posX+'px',
                  top:y+'px',
                  content:params.name+':'+params.value
                }
              })
              setTimeout(()=>{
                vm.setData({
                  showCover:true
                })
              },200)
              
              return [posX*1000, y*1000];
            }
          })
          chart.setOption(options);

          return chart;
        })
      },
      onLoad() {
        this.mapComponent = this.selectComponent('#mychart-dom-area');
        this.initMap()
      },
      onReady() {
        
        this.initWatch();
      },
      onShow() {
        this.initComputed();
      }

    })
)
