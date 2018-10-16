import actionType from '../actions/reduxTest.js';
const initState={
  count:0
}

export default function(state=initState,action){
  switch(action.type){
    case actionType.JIA :
    return {...state,count: state.count+1}
    case actionType.JIAN :
    return {...state,count:state.count-1}
    default :
    return state
  }
}