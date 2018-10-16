function initMpState () {
  const reducers = {};
  const finalState = {};
  const listeners = [];
  let injectMethod = null;//生命周期钩子函数触发一次 dispatch

  function getStore() {
    return finalState;
  }
  //创建store
  //modules 是 reduce对象包含多个reduce方法，用来具体的改变state。
  //injectFunc 是生命周期触发函数。
  function createStore(modules, injectFunc) {
    if (injectFunc && typeof injectFunc === 'string') {
      injectMethod = injectFunc;
    }
    if (modules && typeof modules === 'object') {
      const keys = Object.keys(modules);
      const len = keys.length;

      for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (modules.hasOwnProperty(key) && typeof modules[key] === 'function') {
          reducers[key] = modules[key];
        }
      }
    }
    dispatch({type: '@MPSTATE/INIT'});//第一次触发dispatch赋值state
  }


  function dispatch(action) {
    // debugger
    const keys = Object.keys(reducers);
    const len = keys.length;
    
    for (let i = 0; i < len; i++) { 
      const key = keys[i];
      const currentReduce = reducers[key];
      const currentState = finalState[key];

      const newState = currentReduce(currentState, action);
      finalState[key] = newState;
    }

    if (this) {//this代表组件
      const componentState = this.mapStoreToState(finalState) || {}; //获取新的数值
      //赋值
      if (this.setData) { // 小程序
        this.setData({ ...componentState })
      } 
    }
  }
//mapStoreToState 将store里面的state数据赋值给组件数值的函数。
//component 传入一个旧的组件
//connect 方法返回值 是一个新的 component
  function connect(mapStoreToState, component) {
    if (!component || typeof component !== 'object') {
      throw new Error('mpState[connect]: Component must be a Object!');
    }

    if (!mapStoreToState || typeof mapStoreToState !== 'function') {
      throw new Error('mpState[connect]: mapStoreToState must be a Function!');
    }

    const newComponent = { ...component };

    const data = component.data || {};

    const extraData = mapStoreToState(finalState);

    if (!extraData || typeof extraData !== 'object') {
      throw new Error('mpState[connect]: mapStoreToState must return a Object!');
    }

    let newData = null;

    if (typeof data === 'function') {
      newData = {
        ...data(),
        ...extraData
      }
    } else {
      newData = {
        ...data,
        ...extraData
      }
    }

    if (newData) {
      newComponent.data = newData;
    }

    const injectFunc = component.getInjectMethod;//组件自定义的初始化事件

    const methods = component.methods || {};

    const newLiftMethod = injectFunc && injectFunc() || injectMethod;
    const oldLiftMethod = component[newLiftMethod];

    methods.dispatch = dispatch;//在组件里面使用this.dispatch来更新数据

    newComponent.methods = methods;
    newComponent.dispatch = dispatch;
    newComponent.mapStoreToState = mapStoreToState;
    
    if (newLiftMethod) {
      newComponent[newLiftMethod] = function() {
        if (this) {
          this.dispatch({});
          oldLiftMethod && oldLiftMethod.call(this, arguments);
        }
      }
    }

    return newComponent;
  }

  return {
    createStore,
    dispatch,
    connect,
    getStore
  }
}

module.exports = initMpState();