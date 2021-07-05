import { get, post, upload } from '@/axios';
/**
 * 获取可用发送短信国家
 * @param {} 
 */
export const getAreaCodeList = async () => {
  return await get('/common/sms/list');
}
/**
 * 发送验证码
 * @param {json} data 
 */
export const sendCodeApi = async (data) => {
  return await post('/common/sms/send', data);
}

// 获取App版本
export const getAppUrl = async () => {
  return await get('/app/new/version');
}

/**
 * 注册App
 * @param {json} data 
 */
export const checkRegisterAndLogin = async (data) => {
  return await post('/v2/api/auth/login', data);
}

/**
 * 获取用户信息
 * @param {}  
 */
export const getUesrInfo = async () => {
  return await get('/v1/user/info');
}

/**
 * 上传图片（单图）
 * @param {}  
 */
export const upLoadImg = async (data) => {
  return await upload('/image/upload', data);
}

/**
 * 上传图片（多图）
 * @param {}  
 */
export const upLoadMultiUploadImg = async (data) => {
  return await upload('/image/multiUpload', data);
}

/**
 * 投诉建议
 * @param {data-form} data
 */
export const complaints = async (data) => {
  return await post('/complaints', data);
}