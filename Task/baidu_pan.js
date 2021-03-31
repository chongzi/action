/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-31 13:43:32 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-31 15:24:36
 */

const $ = Env('百度网盘签到')

const notify = $.isNode() ? require('./sendNotify') : '';

$.message = ''

$.totalScore = 0
$.totalFinishScore = 0

const BDYP_API_HOST = 'https://pan.baidu.com'

const CookieArr = []

const TaskUrl = [
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=f08d3c4fbb9c6f80faa4f22abb509e12dfe4c46c&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617171560&clienttype=1&logid=MjAyMTAzMzExNDE5MjA0NjQsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCwzNjc3&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=2f793a2ebb6a8284e8edd885bd422ae9&task_id=1098642731602315`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=736d60b5066262d0de83dc5af2aacb97577451d8&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617172823&clienttype=1&logid=MjAyMTAzMzExNDQwMjM1MjksM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCw5MDY3&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=f08d0e90e263e39c68a4e2a52fd4803b&task_id=1098835761569556`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=2544666e73c9238ac05a3d69a4f2335c12a046cd&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617174047&clienttype=1&logid=MjAyMTAzMzExNTAwNDcyNTcsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCw0NTI2&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=c2d0f9b941b97223423ef7d0c74ae3d8&task_id=1098946571569557`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=0fa689a060156ac1c7f90f7fe85d6bc38b937e8c&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617174213&clienttype=1&logid=MjAyMTAzMzExNTAzMzM2OTEsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCwyMjY2&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=62b4e660f6ba95a5dfc5becdc7f72e93&task_id=1098798341567741`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=49cd29dd1242cceba2c9398608ecf353efe8f567&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617174271&clienttype=1&logid=MjAyMTAzMzExNTA0MzE4MTAsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCw3NDAw&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=1ff527152d2da7197e12b338da323056&task_id=1098452711602314`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=163dd97fd43d239c2e592cd58ada8b177022f7cb&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617174325&clienttype=1&logid=MjAyMTAzMzExNTA1MjU3NzYsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCw0ODQ1&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=8cce9f45e42a684a5a0e6c5ea4fc841e&task_id=1098945871611293`,
  `api/taskscore/tasksave?app_id=250528&vip=0&queryfree=0&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&apn_id=1_0&rand=b1a0799ee057627edb90eb2edd9395191d6dd96d&network_type=wifi&freeisp=0&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&time=1617174442&clienttype=1&logid=MjAyMTAzMzExNTA3MjIwMTIsM2E4YjQ1MjlkYzI2NzQwNGQ3M2JkMjQ0Y2U1NzQ0N2U3MGM0OTkzMCw4NzI2&uk=1yG3V5x9lj2LCGCbi8jr0ucmaMTb67cS&task_from=netdisk_activity&token=6f45f00ebd1101797b2be0de8a910c0c&task_id=1098789211614157`,
  `api/taskscore/tasksave?app_id=16051585&version=3.0.1&channel=iPhone_14.3_iPhone13%2C2_chunlei_1024100a_wifi&idfa=0CDF5067-D3F2-49C7-AB9B-60440A608B49&rand=beafc37005b360f83a960afe0c672082e6e556f9&network_type=wifi&time=1617174547940&devuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&cuid=CAE48EEAFE8CA830CADDF5A9CEEFF8E6A52BDB731FSFDFTTMND&zid=rw4OZABIDmXg2MW3w2X10f_kfLorp-7uCKu96HIwJMr55KXPZFSo0gyNHMb_X3qkHogaboAiSej7gobTFbVKfIA&clienttype=71&idfv=B54F1343-F152-4279-AF44-1E06629E79AE&logid=MjAyMTAzMzExNTA5MDc5MzEsQ0FFNDhFRUFGRThDQTgzMENBRERGNUE5Q0VFRkY4RTZBNTJCREI3MzFGU0ZERlRUTU5ELDg3MDE%3D&baiduid=40C3D4F29DB5DD6D28D69CFAA29984B6%3AFG%3D1&task_from=netdisk_activity&uk=956481363&token=a7bd0ec747d0bbda7bdf5986b7fd53a7&task_id=1098763941590575`,
]


if ($.isNode()) {
  if (process.env.BDYP_COOKIE && process.env.BDYP_COOKIE.indexOf('#') > -1) {
    cookie = process.env.BDYP_COOKIE.split('#');
  }else if(process.env.BDYP_COOKIE && process.env.BDYP_COOKIE.indexOf('#') > -1) {
    cookie = process.env.BDYP_COOKIE.split('\n');
  }else{
    cookie = [process.env.BDYP_COOKIE]
  }

  Object.keys(cookie).forEach((item) => {
    if (cookie[item]) {
      CookieArr.push(cookie[item])
    }
  })
}

!(async () => {
  for (let i = 0; i < CookieArr.length; i++) {
    cookie  = CookieArr[i]

    console.log(`········【帐号${i+1}】开始········`)

    // 每日签到
    console.log(`📝执行 -> 日常签到`)
    await DailySign()

    // 每日任务
    console.log(`\n📝执行 -> 每日任务`)
    await DailyTask()

    // 去完成任务
    console.log(`\n📝执行 -> 完成任务`)
    for(let i = 0 ; i<TaskUrl.length;i++){
      url = TaskUrl[i]
      await doTask(url)
    }

    //推送消息
    await sendMsg()

    console.log(`········【帐号${i+1}】结束········`)

  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    

// 每日签到
async function DailySign(){
 return new Promise((resolve) => {
   $.get(taskUrl(`pmall/points/signin?rand=055449b52f96626c9005b2fa4a397ac1ab84fcbf&clienttype=1&channel=iphone&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&time=1617169178&version=11.8.0&_t=1617169178`),async(error, response, data) =>{
    try{
      if (error) {
        console.log(`${JSON.stringify(error)}`)
        console.log(`API请求失败，请检查网路重试`)
      } else {
        const result = JSON.parse(data)
        // 反馈信息
        // console.log(result)
        if(result.errno!==0){
          // 已经签到
          console.log(`❌ 已经签到过`);
        }else{
          console.log(`获得积分:${result.points}`)
          $.message+=`获得积分:${result.points}`
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
  "errno":0,
  "request_id":2809205753,
  "is_first":true,
  "points":5,
  "extra_info":null,
  "data":{
    "present_actinfo":{
      "gift_info":{
        "hit_pop_conf":[],
        "id":"",
        "recharge_type":false,
        "title":""
      },
      "hit_gift":0,
      "un_hit_pop_conf":[]
    }
  }
}

*/


// 每日任务
async function DailyTask(){
  return new Promise((resolve) => {
    $.get(taskUrl(`act/task/tasklist?id=987141565000&task_from=netdisk_activity&version=11.8.0`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
        //  console.log(result)
         if(result.errno!==0){
           // 获取任务失败
           console.log(`❌ 获取任务失败`)
         }else{
           dailyTaskList = result.data.daily
           dailyTaskList.forEach((item)=>{
            // 每个任务详细详细
            // console.log(item)
            console.log(`任务【${item.task_name}】,可获得【${item.task_score}】积分`)
            $.totalScore += item.task_score
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


 
// 完成任务
async function doTask(url){
  return new Promise((resolve) => {
    $.get(taskUrl(`${url}`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
        //  console.log(result)
         if(result.errno===0){
           // 完成任务成功
           console.log(`💰 完成任务，获得积分:【${result.result.finishScore}】`)
           $.message+=`💰 完成任务，获得积分:【${result.result.finishScore}】`
           $.totalFinishScore += result.result.finishScore
         }else if(result.errno===40004){
          console.log(`❌ ${result.show_msg}任务重复完成`)
         }else{
           // 反馈信息失败
          console.log(`❌ 任务失败`)
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
  "errno":0,
  "newno":"",
  "request_id":"3048035690819262069",
  "result":{
    "addRewardNum":0,
    "addScore":10,
    "addSpace":0,
    "finishCount":1,
    "finishScore":10,
    "limitCount":1,
    "task_extra":"{\"alert_type\":\"0\",\"task_type\":\"24\",\"task_auto_prize\":\"0\",\"target_url\":\"https:\\/\\/pan.baidu.com\\/lifeactivity\\/task\\/mainpage?action=main\u0026id=987141565000\u0026from=tooast\"}","task_id":1098642731602315,"task_text":"{\"end_text\":\"\\u4efb\\u52a1\\u5b8c\\u6210\\uff0c\\u79ef\\u5206+10\"}"},
    "show_msg":""
  }
*/




async function sendMsg() {
  await notify.sendNotify(`百度云盘`,`${$.message},总共获得积分[${$.totalFinishScore/$.totalScore}]`);
}


// URL
function taskUrl(activity) {
  return {
    url: `${BDYP_API_HOST}/${activity}`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'pan.baidu.com',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;netdisk;11.8.0;iPhone12;ios-iphone;14.3;zh_CN;JSbridge4.4.2;jointBridge;1.1.0;',
      'Referer':'https://pan.baidu.com/lifeactivity/task/mainpage?vip=0&logid=MjAyMTAzMzExMzM5MzY0MDksMGY2MDcyNjRmYzYzMThhOTJiOWUxM2M2NWRiN2NkM2MsODQ3NQ==&devuid=3a8b4529dc267404d73bd244ce57447e70c49930&clientType=1&version=11.8.0&channel=iPhone_14.3_iPhone12_chunlei_1099a_wifi&action=main&id=987141565000&from=wodeicon&hybrid_log_id=MjAyMTAzMzExMzM5MzYzNzAsMGY2MDcyNjRmYzYzMThhOTJiOWUxM2M2NWRiN2NkM2MsMjIyNA%3D%3D'
    }
  }
}


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}