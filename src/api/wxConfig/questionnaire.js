import { post } from '@/axios';

const wechatConfig = data => {
  return new Promise((resolve, reject) => {
    try {
      post('/mp/jssdk/signature',data).then(res => {
        resolve(res);
      });
    } catch {
      reject(new Error());
    }
  });
};
export default wechatConfig;
