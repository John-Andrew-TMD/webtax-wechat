import { get, post } from '@/axios';

/**
 * 绑定第三方接口
 * @param {} 
 */
export const authBind = async (data) => {
  return await post('/auth/bind', data);
}
/**
 * 登录接口
 * @param {} 
 */
export const authLogin = async (data) => {
  return await post('/auth/login', data);
}
/**
 * 获取账号信息(Mp端用户,自动识别专家与会员账号)
 * @param {} 
 */
export const getUserInfo = async (data) => {
  return await get('/user/info',data);
}

/**
 * 修改系统设置
 * @param {} 
 */
export const setUpInfo = async (data) => {
  return await post('/user/update/setup', data);
}

/**
 * 修改系统设置
 * @param {} 
 */
export const handleUnbind = async () => {
  return await get('/auth/unBind');
}
