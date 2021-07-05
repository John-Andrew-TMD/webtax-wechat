import { get, post } from '@/axios';
/**
 * 提交企业申请会员V2(Token)
 * @param {json} data
 */
export const applyHandle = async (data) => {
  return await post('/member/v2/apply', data);
}

/**
 * 获取会员申请信息(Token)
 * @param {json} data
 */
export const getApplyInfo = async (data) => {
  return await get('/member/apply/info');
}

/**
 * 激活权益(Token)
 * @param {String} data
 * @param {String} Json
 */
export const handleAct = async (id, data) => {
  return await post('/activity/apply/' + id, data);
}

/**
 * 价格表(Token)
 * @param {String} data
 * @param {String} Json
 */
export const memberPrice = async () => {
  return await get('/member/level/price');
}
