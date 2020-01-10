import {get, post,deletes,put} from '@/common/axios.js' ;//导入axios实例文件中方法
//视频分类列表
export const getCategoriesList=(id)=>{
    return get(`/video/getCategoriesList`);
}
//视频列表分页
export const getVideoPage=(data)=>{
  return get('/video/getVideoPage',data);
}
//查询所有标签
export const getLabel=()=>{
  return get('/video/getLabel');
}
//猜你喜欢
export const getGuessLike=()=>{
  return get('/video/getGuessLike?limit=12');
}
//根据id查询视频
export const getVideoById=(id)=>{
  return get('/video/getVideoById?id='+id);
}
 //PC注册
 export const register=(data)=>{
  return post('api/register',data);
}
 //PC注册
 export const login=(data)=>{
  return post('api/login',data);
}
