/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-02-27 16:17:32 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-01 14:31:46
 * 
 */
const $ = Env('微博签到')

const UrlArrs = [
  // xin 10
`https://api.weibo.cn/2/checkin/add?gsid=_2A25NOPncDeRxGeRO6FYW8y3Nyz6IHXVsbAoUrDV6PUJbkdAKLWThkWpNUGFlbErggaKFbnjJmd0BK1UsWuIk_EdG&wm=3333_2001&launchid=default&b=0&from=10B2193010&c=iphone&networktype=wifi&v_p=87&skin=default&v_f=1&s=2d3a6cc7&lang=zh_CN&sflag=1&ua=iPhone13,2__weibo__11.2.1__iphone__os14.3&ft=0&aid=01A0oddeHLkj68cNlIQLI2waVUCBzWNHgU-xnBve6-kmv_5Vs.`,
  // 小号 97
`https://api.weibo.cn/2/checkin/add?gsid=_2A25NOPmrDeRxGeRL61EW8C7Nyz6IHXVsbApjrDV6PUJbkdAfLRLlkWpNU0Z1A2QaEPwh5LHcOSm9iTS_WYgKkHen&wm=3333_2001&launchid=default&b=0&from=10B2193010&c=iphone&networktype=wifi&v_p=87&skin=default&v_f=1&s=bdc6e969&lang=zh_CN&sflag=1&ua=iPhone13,2__weibo__11.2.1__iphone__os14.3&ft=0&aid=01A0oddeHLkj68cNlIQLI2waVUCBzWNHgU-xnBve6-kmv_5Vs.`,
]

const AuthorizationArr =[
  // xin
  'WB-SUT _2A95NOPncDeRxGeRO6FYW8y3Nyz6IHXVsbAoUrDV6PUJbkdAKLVT4kWpNUGFlbI1KfBJUk8CXFwKWIO4K2iOr96Rs',
  // 小号
  'WB-SUT _2A95NOPmrDeRxGeRL61EW8C7Nyz6IHXVsbApjrDV6PUJbkdAfLXbDkWpNU0Z1AxeDnxoRcu0C7vf5CXIscpdxkwTo',
]

const SessionidArr =[
  // xin
  'EA811523-37E3-464C-97F8-9EB2CFEA6B5E',
  // 小号
  '39C954E0-1B36-4598-917F-B280E61FEA27',
]

const ValidatorArr =[
  // xin
  'ZIOF/KVmD2iGiKobzYhLFEDBNJ+e3Fh9ccHGpzlz0jI=',
  // 小号
  'kTSS5yaaYlrh0z6AWnWBTFWPNUKzXQk3hpo7DiiOPrQ=',
]

const cronetridArr = [
  // xin
  '1078067',
  // 小号
  '10470602'
]

const logUidArr = [
  // xin
  '2034733102',
  // 小号
  '2503700102'
]

const ContentLengthArr =[
  // xin
  '346',
  // 小号
  '346'
]

!(async () => {
if (!UrlArrs[0]) {
  console.log(`请获取微博cookie`);
  return;
  }
  console.log(`------------- 共${UrlArrs.length}个账号----------------\n`)
  for (let i = 0; i < UrlArrs.length; i++) {
      await $.wait(500);
      Url = UrlArrs[i];
      await $.wait(500);
      Authorization = AuthorizationArr[i]
      await $.wait(500);
      Sessionid = SessionidArr[i]
      await $.wait(500);
      Validator = ValidatorArr[i]
      await $.wait(500);
      cronetrid = cronetridArr[i]
      await $.wait(500);
      logUid = logUidArr[i]
      await $.wait(500);
      ContentLength = ContentLengthArr[i]
      await $.wait(500);
      $.index = i + 1;
      await $.wait(500);
      console.log(`\n开始【微博${$.index}】`)
      await $.wait(500);
      await checkin() 
      await $.wait(500);
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
    
//checkin
async function checkin(){
 return new Promise((resolve) => {
    let checkin_url = {
   	url: Url,
    	headers: {
       'Accept': '*/*',
       'Accept-Encoding': 'gzip,deflate',
       'Authorization':Authorization,
       'Content-Length':ContentLength,
       'X-Sessionid':Sessionid,
       'Accept-Language': 'zh-cn',
       'Connection': 'keep-alive',
       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
       'Host': 'api.weibo.cn',
       'cronet_rid':cronetrid,
       'SNRT':'normal',
       'X-Log-Uid':logUid,
       'X-Validator':Validator,
       'User-Agent': `Weibo/52021 (iPhone; iOS 14.3; Scale/3.00)`
       },
    	}
   $.get(checkin_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        console.log(result);
        // 签到成功 
        if(result.status===5000){
          console.log(`执行签到：`+result.msg)
          console.log(`连续签到时间:`+result.data.desc)
        }
        // 已签到反馈信息
        if(result.errno===30000||result.errno===-100){
          console.log(result.errmsg);
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}

// 签到成功反馈
/*
{
  "time": 1614558946,
  "status": 5000,
  "msg": "操作成功",
  "data": {
    "icon": "",
    "continuous": 2,
    "desc": "已连续签到2天",
    "button": {
      "show": 1,
      "text": "今日已签到",
      "type": 0,
      "scheme": "https:\/\/m.weibo.cn\/c\/checkin?luicode=20000103"
    },
    "title": "明日签到+0.2元"
  }
}
*/

// 已签到反馈
/*
{
  errmsg: '今天已经签过到啦',
  errno: 30000,
  errtype: 'DEFAULT_ERROR',
  isblock: false
}
*/


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}