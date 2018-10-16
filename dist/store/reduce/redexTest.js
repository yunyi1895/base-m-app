import actionsType from '../action/redexTest.js';

const initState={
  code:0
}

export default function(state=initState,actions){
  switch(actions.type){
    case actionsType.JIA:
    return {...state,code:state+1}
    case actionsType.JIAN:
    return {
      ...state,
      code:state-1
    }
    default :
    return state
  }
}