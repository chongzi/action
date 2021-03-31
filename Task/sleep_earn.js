/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-31 15:53:53 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-31 19:12:46
 */

const $ = Env('睡眠赚')

const CookieArr = []

const BodyArr = []

const SLEEP_API_HOST = 'http://sleep.zouluzhuan.com'

$.go = false
$.turntableTime = 1

if ($.isNode()) {
  
  if (process.env.SLEEP_EARN_COOKIE && process.env.SLEEP_EARN_COOKIE.indexOf('#') > -1) {
    signCookie = process.env.SLEEP_EARN_COOKIE.split('#');
  }else if(process.env.SLEEP_EARN_COOKIE && process.env.SLEEP_EARN_COOKIE.indexOf('#') > -1) {
    signCookie = process.env.SLEEP_EARN_COOKIE.split('\n');
  }else{
    signCookie = [process.env.SLEEP_EARN_COOKIE]
  }
  
  Object.keys(signCookie).forEach((item) => {
    if (signCookie[item]) {
      CookieArr.push(signCookie[item])
    }
  })
  
  if (process.env.SLEEP_EARN_BODY && process.env.SLEEP_EARN_BODY.indexOf('#') > -1) {
    signbody = process.env.SLEEP_EARN_BODY.split('#');
  }else if(process.env.SLEEP_EARN_BODY && process.env.SLEEP_EARN_BODY.indexOf('#') > -1) {
    signbody = process.env.SLEEP_EARN_BODY.split('\n');
  }else{
    signbody = [process.env.SLEEP_EARN_BODY]
  }

  Object.keys(signbody).forEach((item) => {
    if (signbody[item]) {
      BodyArr.push(signbody[item])
    }
  })
  
}


!(async () => {
  for(let i = 0 ; i < CookieArr.length;i++){

    cookie =  CookieArr[i]
    body = BodyArr[i]
    
    // 首页喝水
    console.log(`💎执行 -> 首页喝水`)
    // await drink()
    
    // 签到
    console.log(`\n💎执行 -> 签到`)
    await sign()

    // 幸运大抽奖
    console.log(`\n💎执行 -> 幸运大抽奖`)
    let start = body.indexOf('imei')
    let end = body.indexOf('&source')
    const nowimei = body.slice(start+5,end)
    for(let j = 0 ; j<$.turntableTime;j++){
      if($.nowTime===undefined) return
      console.log(`\n当前循环第[${j+1}]次，获得:`)
      await turntable(nowimei)
      // if((j+1)===5||(j+1)===30||(j+1)===60||(j+1)===100){
      if($.nowTime===5||$.nowTime===30||$.nowTime===60||$.nowTime===100){
        console.log(`当前可以开启宝箱，当前次数为:【${$.nowTime}】`)
        await openbox($.nowTime,nowimei)
      }else{
        console.log(`当前次数为:【${$.nowTime}】`)
      }
      console.log(`等待了10s···`)
      await $.wait(10000) // 等待10s
    }
    
    // 每天获取的钻石💎
    console.log(`\n💎执行 -> 刷钻石`)
    for (let a = 0; a < 10000; a++) {
      await loop(a)
      await $.wait(1000) // 等待1s
      if($.go){
        return
      }
    }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 签到💎
async function sign(){
  return new Promise((resolve) => {
    $.post(taskUrl(`api/member/signCoin`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         // console.log(result)
         if(result.code!==200){
           console.log(`签到失败！`)
         }else{
           console.log((result.data.is_signed===1?'当日已签到':`签到成功`)+`,获得:【${result.data.setting[result.data.next_days-2]}个】钻石💎\n总签到【${result.data.signCount}】天\n下一次签到是：第${result.data.next_days}天`)
         }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
 }

// 幸运大转盘
async function turntable(nowimei){
  return new Promise((resolve) => {
    $.get(NobodytaskUrl(`api/turntable/turntableCoin?imei=${nowimei}&source=ios&device=ios`,nowimei),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
        if(result.code!==200){
          console.log(`❌ 执行大转盘错误！`)
        }else{
          $.turntableTime = result.data.leftNum
          $.nowTime = (result.data.hasNum)-0
          if(result.data.coin!==0){
            console.log(`获得钻石:【${result.data.coin}个】钻石`)
          }else{
            console.log(`获得空气~`)
          }
        }
        }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
 }

 // 开启宝箱
async function openbox(time,nowimei) {
  return new Promise((resolve) => {
    let body = `source=ios&device=ios&num=${time}`
    $.post(bodytaskUrl(`api/turntable/chestcoin?imei=${nowimei}&jsoncallback=`,body,nowimei),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         // console.log(result)
        if(result.code!==200){
          console.log(`❌ 执行开宝箱错误！`)
        }else{
          console.log(`开宝箱本次获得钻石💎:【${result.data}】个`)
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
  "code":200,
  "message":"Request Success.",
  "data":5
}
 */

// 刷钻石💎
async function loop(a){
 return new Promise((resolve) => {
   $.post(taskUrl(`api/member/randCoin`),async(error, response, data) =>{
    try{
      if (error) {
        console.log(`${JSON.stringify(error)}`)
        console.log(`API请求失败，请检查网路重试`)
      } else {
        const result = JSON.parse(data)
        // 反馈信息
        // console.log(result)
        if(result.code===200){
          // 本次
          console.log(`第[${a+0}]次循环，本次钻石+10`)
        }else{
          console.log(result.message)
          console.log(`结束刷钻石`)
          $.go = true
        }
      }}catch(e) {
          console.log(e)
        } finally {
        resolve();
      } 
    })
   })
}



// URL
function taskUrl(activity) {
  return {
    url: `${SLEEP_API_HOST}/${activity}`,
    body:body,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Connection": "close",
      'Content-Length': '110',
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'sleep.zouluzhuan.com',
      'Cookie': cookie,
      'User-Agent': 'SMMon/1.0.7 (iPhone; iOS 14.3; Scale/3.00)',
    }
  }
}

function NobodytaskUrl(activity,nowimei) {
  return {
    url: `${SLEEP_API_HOST}/${activity}`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Connection": "keep-alive",
      'Content-Length': '110',
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'sleep.zouluzhuan.com',
      'Cookie': cookie,
      'Referer':`http://sleep.zouluzhuan.com/api/turntable/index?imei=${nowimei}&version=1.0.7&device=ios&source=ios`,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    }
  }
}

function bodytaskUrl(activity,body,nowimei) {
  return {
    url: `${SLEEP_API_HOST}/${activity}`,
    body:body,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Connection": "keep-alive",
      'Content-Length': '110',
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'sleep.zouluzhuan.com',
      'Cookie': cookie,
      'Referer':`http://sleep.zouluzhuan.com/api/turntable/index?imei=${nowimei}&version=1.0.7&device=ios&source=ios`,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    }
  }
}

// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}