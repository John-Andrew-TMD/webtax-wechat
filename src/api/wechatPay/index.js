import { get, post } from '@/axios';
/**
 * 订单号
 * @param {Object} orderNo
 */
export const wechatPay = async (orderNo) => {
  return await post(`/order/${orderNo}/pay/wxpay`, {});
}

