import { get, post } from '@/axios';
/**
 * 获取详情
 * @param {number} id 
 */
export const getPromote = async (id, promoteNo) => {
  return await get(`/p/p/${id}?promoteNo=${promoteNo}`);
}
