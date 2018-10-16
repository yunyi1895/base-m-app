export function onShareAppMessage(res){
     if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        path: 'pages/index/index?id=123'
      }
}