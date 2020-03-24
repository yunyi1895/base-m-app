function randomValue() {
  return Math.round(Math.random() * 1000);
}

const option = {
  tooltip: {
    show: true,
    showContent:true,
    alwaysShowContent:false,
    renderMode:'richText',
    //trigger: 'axis',
    trigger: 'item',
   
   

  },

  visualMap: {
    min: 0,
    max: 300,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    inRange: {
      color: ['#e0ffff', '#006edd']
    },
    show: true
  },
  toolbox: {
    trigger: 'item'
    // show: true,
    // orient: 'vertical',
    // left: 'right',
    // top: 'center',
    // feature: {
    //   dataView: { readOnly: false },
    //   restore: {},
    //   saveAsImage: {}
    // }
  },
  series: [{
    type: 'map',
    mapType: 'henan',
    label: {
      // normal: {
      //   show: true
      // },
      emphasis: {
        textStyle: {
          color: 'blue'
        }
      }
    },
    itemStyle: {

      normal: {
        borderColor: 'rgba(0, 0, 0, 0.2)',
      },
      emphasis: {
        areaColor: '#F3B329',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    animation: false,

    data: [
      { name: "南海诸岛", value: 0 },
      { name: '北京', value: randomValue() },
      { name: '天津', value: randomValue() },
      { name: '上海', value: randomValue() },
      { name: '重庆', value: randomValue() },
      { name: '河北', value: randomValue() },
      { name: '河南', value: randomValue() },
      { name: '云南', value: randomValue() },
      { name: '辽宁', value: randomValue() },
      { name: '黑龙江', value: randomValue() },
      { name: '湖南', value: randomValue() },
      { name: '安徽', value: randomValue() },
      { name: '山东', value: randomValue() },
      { name: '新疆', value: randomValue() },
      { name: '江苏', value: randomValue() },
      { name: '浙江', value: randomValue() },
      { name: '江西', value: randomValue() },
      { name: '湖北', value: randomValue() },
      { name: '广西', value: randomValue() },
      { name: '甘肃', value: randomValue() },
      { name: '山西', value: randomValue() },
      { name: '内蒙古', value: randomValue() },
      { name: '陕西', value: randomValue() },
      { name: '吉林', value: randomValue() },
      { name: '福建', value: randomValue() },
      { name: '贵州', value: randomValue() },
      { name: '广东', value: randomValue() },
      { name: '青海', value: randomValue() },
      { name: '西藏', value: randomValue() },
      { name: '四川', value: randomValue() },
      { name: '宁夏', value: randomValue() },
      { name: '海南', value: randomValue() },
      { name: '台湾', value: randomValue() },
      { name: '香港', value: randomValue() },
      { name: '澳门', value: randomValue() }
    ]

  }],

};

export default option;