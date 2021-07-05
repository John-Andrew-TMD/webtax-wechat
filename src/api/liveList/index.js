import { get, post } from '@/axios';
/**
 * 获取列表
 * @param {Object} data
 */
export const getList = async (data) => {
  return await post('/v2/live/playback/list', data);
}
export const orderCreate = async (data) => {
  return await post('/order/create', data);
}
export const orderValid = async (data) => {
  return await post('/order/valid', data);
}
export const orderPay = async (data) => {
  return await post(`/order/${data.orderNo}/pay/wxpay`, data);
}
export const filterlist = async (data) => {
  return await get(`/live/search/condition`);
}
export const getDetail = async (data) => {
  return await get(`/v2/live/playback/detail/${data.id}`);
}
export const getPayInfo= async (data) => {
  return await get(`/order/waitPay/info/${data.orderNo}`);
}
/**
 * 点赞
 * @param {number} id 
 */
 export const handleLike = async (id) => {
  return await get(`/live/playback/like/${id}`);
}

