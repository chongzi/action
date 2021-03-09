/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-09 14:09:45 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-09 17:32:01
 * 
 *  host = priviege-getway.91cpsa.com
 */


const $ = Env('走路赚钱')


const TokenArr = [
  `hwH83BQrQDNlE8G6I/5k2wXVDHKf7kiELKsJiTzM4CzUBTYyge2RTTr7sYicCD1kX61vdJqqYNoN2vAv9I+b3fLoxYuqCF2xAOvGKhY8lGstiXowpin7Xy7Z/nhrjq10`
]

const signArr = [
  `P/z0IdUjf7KgF874tdFeLw==`
]


const WEM_API_HOST = 'https://privilege-getway.91cpsa.com/gateway/k8s-happy-go-api/api'

// if ($.isNode()) {
//   if (process.env.XXXX_XXXX && process.env.XXXX_XXXX.indexOf('#') > -1) {
//     signcookie = process.env.XXXX_XXXX.split('#');
//   } else {
//     signcookie = process.env.XXXX_XXXX.split()
//   }
//   Object.keys(signcookie).forEach((item) => {
//     if (signcookie[item]) {
//       XXXX.push(signcookie[item])
//     }
//   })
// }

!(async () => {
  for (let i = 0; i < TokenArr.length; i++) {
    token = TokenArr
    sign = signArr
    await UserInfo()
    $.nickName =''
    $.gold = ''
    $.stepNum = ''
    
    // 开始任务
    await doTask()
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
// 用户信息
async function UserInfo(){
 return new Promise((resolve) => {
   $.get(taskUrl(`customer/getCustomerBasicInfo`),async(error, response, data) =>{
    try{
      if (error) {
        console.log(`${JSON.stringify(err)}`)
        console.log(`API请求失败，请检查网路重试`)
      } else {
          const result = JSON.parse(data)
          // 反馈信息
          // console.log(result)
          // 登录失败
          if(result.code!==1){
            console.log(`登录失效，请检查token/sign`)
          }else{
            // 登录成功
            $.nickName = result.result.phone
            $.gold = result.result.balanceCoin
            $.stepNum = result.result.steps
            console.log(`------帐号【${$.nickName}】金币数量:【${$.gold}】步数:【${$.stepNum}】------`)
          }
      }}catch(e) {
          console.log(e)
        } finally {
        resolve();
      } 
    })
   })
}

// 任务
async function doTask() {

  console.log(`开始执行->【每日签到】`)
  await DailySign()


  // TODO 未拿到接口
  // console.log(`\n开始执行->【运动收益】`)
  // await sportCollect()

  // TODO 看首页视频 报错
  // console.log(`\n开始执行->【首页视频】`)
  // $.stepLimit = ''
  // $.doneStep = ''
  // $.waitTime = ''
  // await HomeMVNum()
  // for(let i = $.doneStep ;i<$.stepLimit+1;i++){
  //   console.log(`等待${$.waitTime}秒···`);
  //   await $.wait($.waitTime-0*1000)
  //   await WatchMV()
  // }

  // 喝水领步
  console.log(`\n开始执行->【喝水领步】`)
  $.drinkgameStep = ''
  $.drinkstepLimit = ''
  await drinkInfo()
  if($.drinkgameStep!==$.drinkstepLimit){
    await drink()
  }else{
    return
  }

  // 开宝箱
  // 宝箱信息能拿到 但是开宝箱 提示 参数解析失败
  // console.log(`\n开始执行->【开宝箱】`)
  // $.activityCode = ''
  // // 活动ID 
  // $.activityId =''
  // // 任务ID
  // $.taskIds = []
  // await openBoxInfo()
  // for(let i = 0;i<$.taskIds.length;i++){
  //   taskId = $.taskIds[i]
  //   await openBox(taskId)
  // }


  // 早起打卡
  console.log(`\n开始执行->【早起打卡】`)
  await morningCheckIn()
}


// 每日签到
async function DailySign() {
  return new Promise((resolve) => {
    $.get(taskUrl(`sign/getSevenSignInfoByCustomerId?=`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
           console.log(result)
           // 签到失败
          if(result.code!==1){
            console.log(` ❌ 登录失效，请检查token/sign`)
          }else{
            if(result.result.customerSignInfo.isSign!==1){
              console.log(`签到:${result.message}`)
              // 双倍金币
              console.log(`等待60秒，获取双倍金币···`)
              await $.wait(60000)
              await DoubleCoins(`sign/signDoubleCoins`,`{"taskCode":""}`)
            }else{
              console.log(`重复签到 签到天数：${result.result.customerSignInfo.signNum}天,总共签到:${result.result.customerSignInfo.totalSingNum}天`)
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

// 运动收益
async function sportCollect() {
  return new Promise((resolve) => {
    $.get(taskUrl(`home/addCustomerEarnCoin`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(err)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
          // 反馈信息
           console.log(result)
          // 首页收集金币失败
          if(result.code!==1){
            console.log(` ❌ 首页收集失败 ${result.message}`)
          }else{
            
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 首页视频信息
async function HomeMVNum() {
  return new Promise((resolve) => {
    $.get(taskUrl(`stepTask/getStepTaskInfo`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
          //  console.log(result)
           // 视频信息失败
          if(result.code!==1){
            console.log(` ❌ 获取视频信息失败：${result.message}`)
          }else{
            console.log(`获取视频信息：${result.message}`)
            $.stepLimit = result.result.stepLimit
            $.doneStep = result.result.doneStep
            $.waitTime = result.result.waitTime
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 去看视频
async function WatchMV() {
  return new Promise((resolve) => {
    let body = `{}`
    $.post(bodyTaskUrl(`stepTask/addCustomerStepRecordInfo`,body),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
           console.log(result)
           // 看视频失败
          if(result.code!==1){
            console.log(` ❌ 看视频失败 ${result.message}`)
          }else{
           console.log(`sssss`)
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 喝水领步信息
async function drinkInfo() {
  return new Promise((resolve) => {
    $.get(taskUrl(`drinkStep/getDrinkStepGameInfoByCustomerId`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
           console.log(result)
           // 视频信息失败
          if(result.code!==1){
            console.log(` ❌ 获取视频信息失败：${result.message}`)
          }else{
            console.log(`获取视频信息：${result.message}`)
            $.drinkgameStep = result.result.gameStep
            $.drinkstepLimit = result.result.stepLimit
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })  
}

// 喝水领步
async function drink() {
  return new Promise((resolve) => {
    let body = '{}'
    $.post(bodyTaskUrl(`drinkStep/collectCustomerStepInfo`,body),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
         // 领步数失败
         if(result.code!==1){
          console.log(` ❌ 领步数失败 ${result.message}`)
        }else{
          console.log(`领取步数：${result.result.step} ${result.message}`);
        }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 宝箱任务信息
async function openBoxInfo() {
  return new Promise((resolve) => {
    $.get(taskUrl(`activity/getActivityTaskOrderInfo?activityCode=shareMoney`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
           console.log(result)
           // 视频信息失败
          if(result.code!==1){
            console.log(` ❌ 获取宝箱任务信息：${result.message}`)
          }else{
            $.activityCode = result.result.activityCode
            // 活动id
            $.activityId = result.result.activityId
            result.result.taskList.forEach((item)=>{
              // 获得任务ID
              console.log(item.taskId)
              $.taskIds.push(item.taskId)
            })
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })  
}
// TODO 开箱子
// 参数解析失败
async function openBox(taskId) {
  return new Promise((resolve) => {
    let body = `{"activityCode":"${JSON.stringify($.activityCode)}","activityId":"${JSON.stringify($.activityId)}","taskId":"${JSON.stringify(taskId)}"}`
    $.post(bodyTaskUrl(`activity/updateActivityTaskStateFinish`,body),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
         // 领取钥匙失败
         if(result.code!==1){
          console.log(` ❌ 领取钥匙失败 ${result.message}`)
        }else{
          console.log(`领取钥匙 ${result.result.remainingNum}个 ${result.message}`);
        }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}

// 早起打卡报名
async function morningCheckIn() {
  return new Promise((resolve) => {
    $.post(taskUrl(`activity/signUpMorningActivityWithVideo`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
           console.log(result)
           // 早起打卡报名失败
          if(result.code!==1){
            console.log(` ❌ 早起打卡报名失败信息：${result.message}`)
          }else{
            console.log(`早起打卡报名信息：${result.message}`)
            console.log(`早上打卡时间：${result.result.signInTime}`)
            console.log(`早上打卡结算：${result.result.distributionTime}`)
          }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })  
}






// 双倍金币
function DoubleCoins(URL,body={}) {
  return new Promise((resolve) => {
    $.post(bodyTaskUrl(`${URL}`,body),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
           const result = JSON.parse(data)
           // 反馈信息
          //  console.log(result)
           // 双倍金币
          if(result.code!==1){
            console.log(` ❌ 未拿到双倍金币`)
          }else{
            if(result.result.customerSignInfo.isSign!==1){
              console.log(`签到:${result.message}`)
            }else{
              console.log(`获取双倍金币：${result.result.coins.signNum}个`)
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

// URL
function taskUrl(activity) {
  return {
    url: `${WEM_API_HOST}/${activity}`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'privilege-getway.91cpsa.com',
      'token': token,
      'sign': sign,
      'User-Agent': 'zou lu zhuan qian/3.2.0 (iPhone; iOS 14.3; Scale/3.00)',
      'appKey': '5d9fef033fc19557de0006ed',
      'appId': 'com.zouluzq.app',
      'deviceUMId': 'a710acbadfd026b2adf987a3d1ea8875',
      'deviceTDId': 'TDIDheb0a8fe79c634cb159ade1163a659e78',
      'channel': 'main',
      'versionName': '3.2.0',
      'LXUiType': 'UI05',
      'versionCode': '320',
      'subChannel': 'main_main',
      'projectName': 'k8s-happy-go-api',
      'appStore': 'ios',
      'deviceType': 'ios'
    }
  }
}

// BODYURL
 function bodyTaskUrl(activity, body) {
  return {
    url: `${WEM_API_HOST}/${activity}`,
    body:body,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'privilege-getway.91cpsa.com',
      'token': token,
      'sign': sign,
      'User-Agent': 'zou lu zhuan qian/3.2.0 (iPhone; iOS 14.3; Scale/3.00)',
      'appKey': '5d9fef033fc19557de0006ed',
      'appId': 'com.zouluzq.app',
      // 'deviceUMId': 'a710acbadfd026b2adf987a3d1ea8875',
      // 'deviceTDId': 'TDIDheb0a8fe79c634cb159ade1163a659e78',
      // 'channel': 'main',
      // 'versionName': '3.2.0',
      // 'LXUiType': 'UI05',
      // 'versionCode': '320',
      // 'subChannel': 'main_main',
      // 'projectName': 'k8s-happy-go-api',
      // 'appStore': 'ios',
      // 'deviceType': 'ios',
      // 'Content-Length':'100',
    }
  }
}


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}