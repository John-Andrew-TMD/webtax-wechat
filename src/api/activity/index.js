import { get, post } from '@/axios';
/**
 * 获取详情
 * @param {number} id 
 */
export const detail = async (id) => {
  return await get(`/html/${id}`);
}

/**
 * 兑换码
 * @param {object} data 
 */
export const exchange = async (data) => {
  return await post('/redeemCode/exchange', data);
}