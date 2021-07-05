import { get, post } from '@/axios';
/**
 * 登录接口
 * @param {} 
 */
export const authLogin = async (data,appId) => {
    return await post('/auth/login', data);
}
/**
 * 开始答题
 * @param {} 
 */
export function setExamBegin(data)  {
    return post('/exam/begin', data);
}
/**
 * 获取下一题
 * @param {} 
 */
export function getExamNextInfo(data)  {
    return post('/exam/getNextInfo', data);
}
/**
 * 获取邀请页面信息
 * @param {} 
 */
export function getExamInvitePage(data)  {
    return post('/exam/invite/page', data);
}

/**
 * 查询用户邀请明细
 * @param {} 
 */
export function getExamInviteRecord(data)  {
    return post('/invite/record', data);
}
/**
 * 分页查询榜单列表
 * @param {} 
 */
export function getRankPage(data)  {
    return post('/rank/page', data);
}
export function getExamRankingInvite(data)  {
    return post('/exam/ranking/invite', data);
}
/**
 * 分页查询答题记录列表
 * @param {} 
 */
export function getRecordPage(data)  {
    return post('/record/page', data);
}
/**
 * 答题首页
 * @param {} 
 */
export function getExamInit(data)  {
    return post('/exam/init',data);
}
/**
 * 保存答案获取结果
 * @param {} 
 */
export function getExamSaveResult(data)  {
    return post('/exam/saveResult', data);
}
/**
 * 用户提现红包余额
 * @param {} 
 */
export function getRedpackWithdraw(data)  {
    return post('/redpack/withdraw', data);
}
/**
 * 查询用户红包明细
 * @param {} 
 */
export function getRedpackRecord(data)  {
    return post('/redpack/record', data);
}
/**
 * 填写考试排行奖励收货信息
 * @param {} 
 */
export function getRedpackReward(data)  {
    return post('/receive/exam/ranking/reward', data);
}
/**
 * 领取任务奖励
 * @param {} 
 */
export function getTaskReward(data)  {
    return post('/receive/exam/task/reward', data);
}
/**
 * 领取活动规则
 * @param {} 
 */
export function getRulesText(data)  {
    return get(`/static/html/${data.id}`);
}
