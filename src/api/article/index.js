import { get, post } from '@/axios';
/**
 * 获取文章详情
 * @param {number} id 
 */
export const getDetail = async (id) => {
  return await get(`/cms/article/${id}`);
}
/**
 * 获取文号id
 * @param {JSON} data
 */
export const getWritNoApi = async (data) => {
  return await post('/cms/article/query/dn', data);
}

