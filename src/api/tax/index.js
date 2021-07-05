import { get, post } from '@/axios';

/**
 * 问税详情
 * @param {object} data 
 */
export const getDetail = async (orderNo) => {
  return await get(`/order/expert/query/${orderNo}`);
}