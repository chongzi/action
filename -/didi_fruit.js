/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-31 11:10:57 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-31 13:37:25
 */

const $ = Env('滴滴出行 - 免费水果')

const notify = $.isNode() ? require('../Task/sendNotify') : '';

$.message = ''

const DIDI_API_HOST = `https://tree.xiaojukeji.com:8443`

const BodyArr = []

const InitBody = []

// if ($.isNode()) {
  // if (process.env.DIDI_API_HOST && process.env.DIDI_API_HOST.indexOf('#') > -1) {
  //   cookie = process.env.DIDI_API_HOST.split('#');
  // }else if(process.env.DIDI_API_HOST && process.env.DIDI_API_HOST.indexOf('#') > -1) {
  //   cookie = process.env.DIDI_API_HOST.split('\n');
  // }else{
  //   cookie = [process.env.DIDI_API_HOST]
  // }

  // Object.keys(cookie).forEach((item) => {
  //   if (cookie[item]) {
  //     BodyArr.push(cookie[item])
  //   }
  // })
// }

!(async () => {
  for (let i = 0; i < BodyArr.length; i++) {

    console.log(`········【帐号${i+1}】开始········`)

    // 初始化信息
    initbody = InitBody[i]
    console.log(`🌳执行 -> 初始化信息`)
    await initFarm()

    // 日常签到
    Curbody = BodyArr[i]
    console.log(`\n🌳执行 -> 日常签到`)
    await dailyCheck()
    
    // // 除草
    // console.log(`\n🌳执行 -> 除草`)
    // if($.totalWeed!==3){
    //   for(let i = 0 ; i<3-$.totalWeed;i++){
    //     console.log(`当前执行第${i+1}次除草`)
    //     await $.wait(2000) // 等待5s
    //     await weed() 
    //   }
    // }else{
    //   console.log(`当前已经除草【${$.totalWeed}】次，不执行除草任务`)
    // }

    // 浇水操作
    console.log(`\n🌳执行 -> 浇水`)
    if(($.totalWater/10)>1){
      for(let i = 0 ; i<($.totalWater/10);i++){
        console.log(`当前执行第${i+1}次浇水`)
        await $.wait(2000) // 等待5s
        await water()
      }
    }else{
      console.log(`当前水滴不够，剩余水滴【${$.totalWater}g】水滴`)
    }

      
  

    
    //推送消息
    // await sendMsg()

    console.log(`········【帐号${i+1}】结束········`)

  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

    
// 初始化信息
async function initFarm() {
  return new Promise((resolve) => {
    $.post(BodytaskUrl(`user/login`,initbody),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
        //  console.log(result)
        console.log(`当前化肥：【${result.data.fer}袋】化肥`)
        console.log(`当前水壶容量：【${result.data.wat}g】水滴💧`)
        $.totalWater = result.data.wat
        console.log(`当前已经除草：【${result.data.weed.wmy}】次🌿`)
        $.totalWeed = result.data.weed.wmy
        console.log(`奖励盒子：在浇【${result.data.dbox.water/10}】次水即可领取奖励`)
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

/*
{
  uid: 'vQ8ql/FhQKrXMq5w6gx/+w==',
  data: {
    twat: 10,
    other: '{"kettleGetTip":"20210331|1|0","xmt":false,"ifp":0,"nst":0,"dflt":1617160156092}',
    ewt: 1617146640000,
    sigext: 0,
    dbox: { bid: 0, water: 90 }, //🎁盒子 奖励 在浇水多少领取奖励
    ewat: 20,
    wrace: 0,
    fr: [],
    lx_sig: {},
    tsk: null,
    tid: 201,
    kouling: 0,
    qwt: 0,
    sig: { t: 1617160177000, n: 1 },
    fer: 2, // 🎁化肥
    igw: false,
    weed: { wmf: 0, wmy: 0, wfm: 0 }, // 🎁当前已经除草次数 wmy
    notice: 0,
    st: 1,
    newbie: 0,
    tfer: 10,
    cty: '177',
    wat: 440,// 🎁水壶 一次消耗10点💧
    lty: { t: 1617161251000, exn: 0, n: 1 },
    cxUid: '0',
    astFlag: 0,
    gui: 6,
    register: 1616435705000
  },
  d: 1617163134523
}
*/


// 日常签到
async function dailyCheck(){
 return new Promise((resolve) => {
   $.post(BodytaskUrl(`user/sign`,Curbody),async(error, response, data) =>{
    try{
      if (error) {
        console.log(`${JSON.stringify(error)}`)
        console.log(`API请求失败，请检查网路重试`)
      } else {
        const result = JSON.parse(data)
        // 反馈信息
        // console.log(result)
        if(result.day!==1){
          console.log(`❌ ${result.errMsg}`)
        }else{
          console.log(`签到成功✅ 当前第：【${result.day}】天`)
          console.log(`获得:${result.evtChange}`)
        }
      }}catch(e) {
          console.log(e)
        } finally {
        resolve();
      } 
    })
   })
}
/*
{
  "evtChange":{
    "weed":0,
    "fri":0
  },
  "day":1
} 
*/


// 除草
async function weed() {
  return new Promise((resolve) => {
    $.post(BodytaskUrl(`plant/weed`,Curbody),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
         if(result.wmy!==0){
          console.log(`❌ ${result.errMsg}`)
        }else{
         console.log(`今天已经除草【${result.wmy}】次`)
         }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 浇水
async function water() {
  return new Promise((resolve) => {
    $.post(BodytaskUrl(`plant/water`,Curbody),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
         if(result.wat!==0){
           console.log(`❌ ${result.errMsg}`)
         }else{
           console.log(`当前水壶剩余水量：【${result.wat}g】水滴`)
         }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}
/*
{
  "twat":20,
  "st":1,
  "ewt":1617146640000,
  "tfer":10,
  "oncew":10,
  "ewat":20,
  "evtChange":{
    "weed":0,
    "fri":0
  },
  "wat":430
}
*/

async function sendMsg() {
  await notify.sendNotify(`xxxx`,`${$.message}`);
}


// URL
function taskUrl(activity) {
  return {
    url: `${XXXX_API_HOST}/${activity}`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': '',
      'Cookie': cookie,
      'User-Agent': '',
    }
  }
}


 // BODYURL
 function BodytaskUrl(activity, NB) {
  return {
    url: `${DIDI_API_HOST}/${activity}`,
    body: NB,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': `tree.xiaojukeji.com:9443`,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.1.14 FusionKit/1.2.20',
      'Origin': 'https://fine.udache.com',
      'Referer': 'https://fine.udache.com/',
    }
  }
}

// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}