import {
  connect
} from '../../utils/redux'
import actionsType from '../../store/actions/reduxTest';
import * as echarts from '../../components/ec-canvas/echarts';
import { watch, computed } from '../../utils/vuefy.js';
//import geoJson from './mapData.js';
import geoJson from './china.js';
import option from './options.js';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  echarts.registerMap('henan', geoJson);

 

  chart.setOption(option);

  return chart;
}

Page(
  connect(
    (state) => {
      return {
        count: state.reduxTest.count
      }
    },
    {
      data: {
        ec: {
          onInit: initChart
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
      onLoad() {
        console.log(1)
      },
      onReady() {
        this.initWatch();
      },
      onShow() {

        this.initComputed();

      }

    })
)
