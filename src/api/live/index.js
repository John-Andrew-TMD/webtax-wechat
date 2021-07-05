import { get, post } from '@/axios';
/**
 * 获取列表
 * @param {Object} data
 */
export const getList = async (data) => {
  return await post('/live/playback/list', data);
}
/**
 * 获取详情
 * @param {number} id 
 */
export const getDetail = async () => {
  return await get(`/live/playback/new`);
}

/**
 * 财税课堂播放（埋点）接口
 * @param {number} id 
 */
export const countStat = async (id, data) => {
  return await post(`/live/playback/play/${id}`, data);
}

export const getDetailV2 = async (id) => {
  return await get(`/v2/live/playback/detail/${id}`);
}
