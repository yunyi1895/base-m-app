//import util from './util.js';

export default function getQuery(id,query){
  console.log(id)
  return {
    appKey: query.appKey ? query.appKey : '',
    shareUid: query.shareUid ? query.shareUid : ''
  }
}