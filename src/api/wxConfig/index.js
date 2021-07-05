import { post } from '@/axios';

const wechatConfig = url => {
  return new Promise((resolve, reject) => {
    try {
      post('/wechat/share/signature',{shareUrl:url}).then(res => {
        resolve(res);
      });
    } catch {
      reject(new Error());
    }
  });
};
export default wechatConfig;
