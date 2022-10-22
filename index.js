/**
 * 企业微信API-应用管理
 */
 const fetch = require('node-fetch');
 const debug = require('debug')('wecom-agent:debug');
 const warn = require('debug')('wecom-agent:warn');
const { getToken, qyHost } = require('wecom-common');
 const { AGENT_SECRET } = process.env;
 
 /**
  * 设置关键数据型工作台展示
  * @param {Number} agentid 应用ID
  * @param {Array} keydata 显示的数据
  * @see https://work.weixin.qq.com/api/doc/90000/90135/92535
  * @returns 
  */
 const set_keydata = async (agentid, keydata, options = {}) => {
  const secret = options.secret || AGENT_SECRET;
   const token = await getToken(options);
   debug(`set_keydata::token::${token}`);
   const res = await fetch(`${qyHost}/agent/set_workbench_template?access_token=${token}`, {
     method: 'POST',
     body: JSON.stringify({
       agentid,
       type: 'keydata',
       keydata: {
         items: keydata,
       },
       replace_user_data: true,
     }),
   });
   const { errcode, errmsg } = await res.json();
   // 处理错误
   switch (errcode) {
     default:
       if (errcode) warn('set_keydate失败::', `${errmsg}(${errcode})`);
       return errcode;
   }
 };
 
 module.exports = {
   set_keydata,
 };