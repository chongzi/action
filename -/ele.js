/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-07 11:22:50 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-08 17:27:48
 */

// TODO 浏览任务

const $ = new Env('饿了么赚豆')

const Cookies = [
  `_orbit_h5_utils_channel_=ios.default.default.1615086676799; isg=BAMDQ_AQZy6FaCuGLUGS5MMXmMOteJe6uCL1VzXiQ2LZ9C8WvUliCOomagK6z--y; l=eBLQPdARjNEreTiBBO5BFurza77TuQAMGkPzaNbMiInca1JP0F6C2NCQwjp6UdtfwtfXoetreVPXQd3w-ka_JEOiSeRLU1G9dxJwU; tfstk=csoPBNX4-204WAZTquZFOvuMl0GVa2hmNLw8rqDBXM7cks47QsVyv-OIF0ilJHUl.; UTUSER=2284102730; _m_h5_c=8d589a51398c2c06c7a6bc220990ec78_1615097057009%3Bdbf95503e9328968dc600b7d1fcc9fc0; xlly_s=1; DNT=0; SID=LAAAAACIJKRK7QEO4QA2JwE_6rJ9ryxbxEA5YqRE2AKpaKaNCDCJps76; USERID=2284102730; _tb_token_=fb736b1f6b133; cookie2=11742cf70846724e9608fecb76148dd7; csg=619002d4; munb=2205265840829; sgcookie=W100%2BdEAwsJXucpXZtm2I%2BybaCn5ayQo1JkNRJE84h0AkammBm8VODcyzdTd2l3EW07ta8ddqyN4UuBJPorcp1u%2BUiu%2BrLs4kB1cMvqQUvZec1Y%3D; t=dfc9abcacb280b69062bd8c89fd89477; unb=2205265840829; x5check_ele=hfhZlQv1zCwqI7Rb11iBORBJ%2FT4Mge1BH%2FU7nZDojZg%3D; ut_ubt_ssid=sq7oltf488gl5eu6l0o9s8uef1x2t0r2_2021-02-09; tzyy=e74b4f9b2280ced1997401ce7367184e; cna=UvaeGBD/u3kCAXAK7E5LfUmO`,
]

const position = {"longitude":120.09834289550781,"latitude":30.27116584777832}

const TaskArr = []

const tagCode = 0

// if ($.isNode()) {
//   if (process.env.ELE_COOKIE && process.env.ELE_COOKIE.indexOf('&') > -1) {
//     signCookie = process.env.ELE_COOKIE.split('&');
//   } else {
//     signCookie = process.env.ELE_COOKIE.split()
//   }
//   Object.keys(signCookie).forEach((item) => {
//     if (signCookie[item]) {
//       Cookies.push(signCookie[item])
//     }
//   })
// }


!(async () => {
  if(!Cookies[0]){
    console.log(`未拿到Cookie`)
    return
  }
  for (let i = 0;i<Cookies.length;i++) {
    cookie = Cookies[i]
    await beansTask()
    for(let j = 0;j<TaskArr.length;j++){
      todoTask = TaskArr[j]
      await doTask(todoTask)
    }
    console.log(`\n查看任务完成情况`)
    await beansTask()
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 饿了么赚豆任务 Task
async function beansTask(){
  return new Promise((resolve) => {
  $.get(taskUrl(`https://h5.ele.me/restapi/biz.svip_scene/svip/engine/queryTrafficSupply?tagParams[]=%7B%22tagCode%22:%22219085%22%7D&bizCode=biz_card_main&longitude=${position.longitude}&latitude=${position.latitude}`),async(error, response, data) =>{
    try{
      if(error){
        console.log(`${JSON.stringify(error)}`)
        console.log(`API请求失败，请检查网路重试`)
      }else{
        result = JSON.parse(data)
        // 查看返回信息
        // console.log(result)
        //  开始执行 -> 【逛逛任务】
        // result.data是一个数组
        // console.log(result.data)
        result.data.forEach((item)=>{
        // 拿到tagCode
        $.tagCode = item.tagCode
        // console.log(tagCode)
        console.log(`活动场景 -> 【${item.attribute.bizScence}】\n`)
        })

        result.data.forEach((item)=>{
          // 拿到的是一个数组 [{{任务1},{任务2},{任务3}}]
          // console.log(item.data)
          item.data.forEach((i)=>{
            // 具体到每个任务
            // 再次forEach循环拿到的是对象{{任务1},{任务2},{任务3}}
            // console.log(i)
            // 任务推送到任务数组中
            TaskArr.push(i)
            console.log(`任务【${i.attribute.showTitle}】-> 任务状态【${i.attribute.rewardStatus}】`)
          })
        })
      }
      }catch(e) {
          console.log(e)
      } finally {
        resolve();
      }
    })
   })
}

async function doTask(todoTask) {
  // 每个具体任务
  task = todoTask.attribute
  // console.log(task)
  console.log(`\n去执行 -> 【${task.showTitle}】,等待【${task.widgetTitleUnFinish}】`)
  return new Promise((resolve) => {
    $.post(doTaskURL(`https://h5.ele.me/restapi/biz.svip_scene/svip/engine/xSupply`,`{"params":[{"tagCode":"219085","extra":{"missionDefId":${JSON.stringify(task.missionDefId)},"missionCollectionId":${JSON.stringify(task.missionCollectionId)}}}],"bizCode":"biz_code_main","longitude":${JSON.stringify(position.longitude)},"latitude":${JSON.stringify(position.latitude)}}`),async(error, response, data) =>{
      try{
        if (error) {
          console.log(`${JSON.stringify(error)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
          result = JSON.parse(data)
          // 查看返回信息
          console.log(data)
          console.log(`执行任务中···`)
          // await $.wait(16000)
          
        }
        }catch(e) {
            console.log(e)
        } finally {
          resolve();
        }
      })
  })
}

// 获取任务列表
function taskUrl(URL) {
  return {
    url: URL,
    headers: {
      'Host': 'h5.ele.me',
      'Accept': 'application/json, text/plain, */*',
      'x-shard': `loc=${JSON.stringify(position.longitude)},${JSON.stringify(position.latitude)}`,
      'f-pTraceId': 'WVNet_WV_15-15-981',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-cn',
      'f-refer': 'wv_h5',
      'Origin': 'https://tb.ele.me',
      'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/14.3 Eleme/9.8.5 ID/BF7DB91E-2877-44D2-B74E-3BDEF26155E4; IsJailbroken/0 ASI/0CDF5067-D3F2-49C7-AB9B-60440A608B49 Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/9.8.5) UT4Aplus/0.0.6 WindVane/8.7.2 1125x2436 WK',
      'Referer': 'https://tb.ele.me/wow/z/ele-market/supervip/dounikaixin?referPageId=a13.b_activity_kb_m21712_5ea7a8f6-7491-41f1-8126-8fc993521ca2_1615086607243&srcSpm=a13.b_activity_kb_m21712.ca1015_2.da3710&spm=a13.b_activity_kb_m21712.ca1015_2.da3710',
      'Connection': 'keep-alive',
      'Cookie': cookie,
    }
  }
}

// 做任务
function doTaskURL(URL,body={}) {
  return {
    url: `${URL}?missioncollectid=${JSON.stringify(task.missionCollectionId)}&missionid=${JSON.stringify(task.distinctId)}&taskfrom=${JSON.stringify(task.pageSpm)}&bizscene=svip&taskpageviewasac=2A21119A45TTVAEXP40N7N&spm-pre=a13.b_activity_kb_m21712&spm=a2ogi.21963270.0.0`,
    headers: {
      'Host': 'h5.ele.me',
      'Accept': 'application/json, text/plain, */*',
      'f-pTraceId': 'WVNet_WV_2-2-119',
      'Content-Type': 'application/json;charset=utf-8',
      'f-refer': 'wv_h5',
      'f-pTraceId': 'WVNet_WV_5-5-471',
      'Origin': 'https://h5.ele.me',
      'Referer': 'https://h5.ele.me/svip/task-list?taskType=38&spm=a2ogi.21963270.0.0',
      'User-Agent': 'Rajax/1 Apple/iPhone13,2 iOS/14.3 Eleme/9.8.5 ID/BF7DB91E-2877-44D2-B74E-3BDEF26155E4; IsJailbroken/0 ASI/0CDF5067-D3F2-49C7-AB9B-60440A608B49 Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(ELMC/9.8.5) UT4Aplus/0.0.6 WindVane/8.7.2 1125x2436 WK',
      'Connection': 'keep-alive',
      'Cookie': cookie,
    },
    body:body
  }
}

// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}