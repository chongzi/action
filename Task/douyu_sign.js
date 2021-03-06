/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-05 16:32:13 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-06 10:20:00
 */

// TODO 待确认 斗鱼Cookie时效

const $ = new Env('斗鱼签到')

const signCookiesArr =[]
const activityCookieArr =[]

if ($.isNode()) {
  if (process.env.SIGN_DOUYU && process.env.SIGN_DOUYU.indexOf('&') > -1) {
    signCookie = process.env.SIGN_DOUYU.split('&');
  } else {
    signCookie = process.env.SIGN_DOUYU.split()
  }
  Object.keys(signCookie).forEach((item) => {
    if (signCookie[item]) {
      signCookiesArr.push(signCookie[item])
    }
  })
}

if ($.isNode()) {
  if (process.env.ACTIVITY_DOUYU && process.env.ACTIVITY_DOUYU.indexOf('&') > -1) {
      activityCookie = process.env.ACTIVITY_DOUYU.split('&');
    } else {
    activityCookie = process.env.ACTIVITY_DOUYU.split()
  }
  Object.keys(activityCookie).forEach((item) => {
    if (activityCookie[item]) {
      activityCookieArr.push(activityCookie[item])
    }
  })
}

!(async () => {
  if(!signCookiesArr[0]){
    console.log(`请在斗鱼签到页面获取signCookie&&在每日打卡分鱼丸页面获取activityCookie`)
    return
  }
  for(let i = 0;i<signCookiesArr.length;i++){
    signcookie = signCookiesArr[i]
    activitycookie = activityCookieArr[i]
    // 签到
    await dySign()
    console.log(`\n参加活动->【每日打卡分鱼丸】`)
    // 参团
    await userSignActivity()
    // 获得活动信息
    console.log(`\n查看活动->【每日打卡分鱼丸】`)
    await getActivityInfo()
  }
 
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 斗鱼签到
async function dySign(){
 return new Promise((resolve) => {
    let URL = {
   	url: `https://apiv2.douyucdn.cn/h5nc/sign/sendSign`,
    headers: {
      'Host': 'apiv2.douyucdn.cn',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept-Language': 'zh-cn',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://apiv2.douyucdn.cn',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148, Douyu_IOS, Douyu_IOS',
      'Connection': 'keep-alive',
      'Referer': 'https://apiv2.douyucdn.cn/H5/Sign/info?client_sys=ios&ic=0',
      'Content-Length': '97',
      'Cookie': signcookie
     },
     body:`client_sys=ios&did=c0c14731d3f8e7c03c2afbba00001621&token=55110086_11_20dd8f35d959dd27_2_44082409`,
    }
  $.post(URL,async(error, response, data) =>{
    try{
        result = JSON.parse(data)
        // 查看返回信息
        console.log(result)
        if(result.error!==0){
          const today = JSON.stringify(new Date())
          console.log(`签到时间:${result.data.sign_today}`+(result.data.sign_today==today.slice(1,11)?` ✅ 已打卡`:` ❌ 未打卡`))
          console.log(`连续签到:${result.data.sign_md}天`)
          console.log(`总共签到:${result.data.sign_sum}天`)
          console.log(`获得经验:${result.data.sign_exps}`)
        }
      }catch(e) {
          console.log(e)
      } finally {
        resolve();
      }
    })
   })
}

/*
{
  "error": "0",
  "data": {
    "sign_today": "2021-03-06",
    "sign_cnt": "1",
    "sign_sum": "18",
    "sign_rd": "2",
    "sign_md": "2",
    "sign_exp": "15",
    "sign_exps": "177",
    "sign_cexp": "14",
    "sign_pl": [],
    "sign_silver": 0,
    "sign_siln": 10,
    "sign_silb": 0
  },
  "msg": ""
}
 */


//  参加活动 瓜分鱼丸活动
async function userSignActivity() {
  return new Promise((resolve) => {
    let URL = {
   	url: `https://apiv2.douyucdn.cn/h5nc/userSignActivity/joinSignActivity`,
    	headers: {
        'Host': 'apiv2.douyucdn.cn',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://apiv2.douyucdn.cn',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148, Douyu_IOS, Douyu_IOS',
        'Connection': 'keep-alive',
        'Referer': 'https://apiv2.douyucdn.cn/H5/Sign/info?client_sys=ios&ic=0',
        'Content-Length': '87',
        'Cookie': activitycookie
       },
       body:`token=55110086_11_20dd8f35d959dd27_2_44082409&dy_token=3bb2abeed608866b347c13c5df3def2`
    	}
   $.post(URL,async(error, response, data) =>{
    try{
      console.log(data)
         result = JSON.parse(data)
        // 查看返回信息
        console.log(result)
        if(result.error===0){
          console.log("鱼丸总共："+result.data.ywTotal)
          console.log("目前参加人数："+result.data.joinTotal)
          console.log("剩余时间："+result.data.clockLeftTime)
      }else{
        console.log("错误信息："+result.data)
      }
    }catch(e) {
        console.log(e)
    } finally {
      resolve();
    }
  })
 })
}

/*
{
  "error": 0,
  "data": {
    "ywTotal": 422000,
    "joinTotal": 2110,
    "clockLeftTime": 94386
  },
  "msg": ""
}
*/

// 查看现在瓜分鱼丸活动信息
async function getActivityInfo(){
  return new Promise((resolve) => {
    let URL = {
   	url: `https://apiv2.douyucdn.cn/h5nc/userSignActivity/getSignInfo`,
    	headers: {
        'Host': 'apiv2.douyucdn.cn',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://apiv2.douyucdn.cn',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148, Douyu_IOS, Douyu_IOS',
        'Connection': 'keep-alive',
        'Referer': 'https://apiv2.douyucdn.cn/H5/Sign/info?client_sys=ios&ic=0',
        'Content-Length': '87',
        'Cookie': activitycookie
       },
       body:`token=55110086_11_20dd8f35d959dd27_2_44082409&dy_token=2404d77d62cef1a35ef8e507ac5b5c2`
    	}
   $.post(URL,async(error, response, data) =>{
    try{
       result = JSON.parse(data)
      console.log(result)
      if(result.error===0){
        console.log(`参加活动是否成功:`+((result.data.signStatus===1)?'参加成功':'参团失败)'))
        console.log("鱼丸总共："+result.data.ywTotal)
        console.log("目前参加人数："+result.data.joinTotal)
        console.log("剩余时间："+result.data.clockLeftTime)
      }else{
        console.log("错误信息："+result.data)
      }
        }catch(e) {
          console.log(e)
      } finally {
        resolve();
      } 
    })
   })
}

/*
{
  "error": 0,
  "data": {
    "signStatus": 1,
    "ywTotal": 429400,
    "joinTotal": 2147,
    "clockLeftTime": 93485
  },
  "msg": ""
}

 */


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}