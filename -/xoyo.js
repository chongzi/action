/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-06 10:20:53 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-08 15:13:27
 */

const $ = new Env("JX3推栏")

const Cookie = []
const Token = []

// 从云函数拿到Cookie
if ($.isNode()) {
  if (process.env.XOYO_COOKIE && process.env.XOYO_COOKIE.indexOf('&') > -1) {
    signCookie = process.env.XOYO_COOKIE.split('&');
  } else {
    signCookie = process.env.XOYO_COOKIE.split()
  }
  Object.keys(signCookie).forEach((item) => {
    if (signCookie[item]) {
      Cookie.push(signCookie[item])
    }
  })
}

// 从云函数拿到Token
if ($.isNode()) {
  if (process.env.XOYO_TOKEN && process.env.XOYO_TOKEN.indexOf('&') > -1) {
    signToken = process.env.XOYO_TOKEN.split('&');
  } else {
    signToken = process.env.XOYO_TOKEN.split()
  }
  Object.keys(signToken).forEach((item) => {
    if (signToken[item]) {
      Token.push(signToken[item])
    }
  })
}


// 文章ID存放
const ids = []

const XOYO_API_HOST = "https://m.pvp.xoyo.com"


!(async () => {

  if(!Cookie[0]){
    console.log(`未拿到Cookie`)
    return
  }

  for (let i = 0; i < Cookie.length; i++) {
    cookie = Cookie[i]
    token = Token[i]
    console.log(`执行 -> 【获取任务列表】`)
    await getTaskProgressList()
    await $.wait(1000)
    console.log(`\n执行 -> 【每日签到】`)
    await dailyCheckin()
    // await $.wait(1000)
    // console.log(`\n执行 -> 【浏览社区】`)
    // await browserCommunity()
    // await $.wait(1000)
    // console.log(`\n执行 -> 【点赞动态】`)
    // await refresh()
    // for (let i = 0; i < ids.length; i++) {
    //   id=ids[i]
    //   await like(id)
    //   await $.wait(1000)
    //   await unlike(id)
    // }
    
  }
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())



// 获取任务列表
function getTaskProgressList() {
  return new Promise((resolve) => {
    $.post(taskUrl("trade/bonus/task-progress-list", {"ts":"20210306030339614"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            if(result.code==0&&result.msg=='success'){
              // 正则表达式取值
              console.log(`\n帐号:${token.match(`\:(.+?)\:`)[1]}\n`+result.msg+` ✅ 登录成功`)
              console.log('当前用户碎银：'+result.data.bonusBalance)
              // 拿到任务列表
              // console.log(result.data.bonusTaskList)
              result.data.bonusTaskList.forEach((task)=>{
                console.log(`任务【${task.name}】${task.progress}/${task.qtyLimit}  \b奖励${task.bonus}碎银`)
              })
            }else{
              console.log(`❌ 登录失败 检查Cookie`)
            }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}

// 每日签到
function dailyCheckin() {
  return new Promise((resolve) => {
    $.post(taskUrl("trade/bonus/task-check-in", {"ts":"20210306030339614"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            // console.log(result)
            if(result.code!==null){
              console.log((result.msg=='repeat bonus task request'?' ❗ 重复签到':`${result.msg}`))
            }else{
              console.log(`❌ 签到任务失败 检查Cookie`);
            }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}

// 待检验浏览社区
function browserCommunity() {
  return new Promise((resolve) => {
    $.post(taskUrl("socialgw/pop-up-window/query-by-game", {"game":"jx3","ts":"20210306075432714"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            // Tag = QueryCompositePagePlates
            // console.log(result)
            if(result!==null){
              console.log(`查询社区页面:`+result.msg)
              // 待检验浏览社区
            }

        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}

// 刷新文章获得文章ID 用来点赞
function refresh() {
  return new Promise((resolve) => {
    $.post(taskUrl("socialgw/recommend/dynamic",{"cursor":0,"size":10,"ts":"20210306074647091"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            if(result.code!==null){
              console.log(`查询文章:`+result.msg)
              console.log(result.data.data)
              result.data.data.forEach((item)=>{
                // 获取文章的ids
                ids.push(item.id)
              })
              // 存放文章id
              console.log(ids)
            }
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}

// 点赞动态
function like(id) {
  return new Promise((resolve) => {
    $.post(taskUrl(`socialgw/like/add`,{"type":"Article","contentSrcId":`${id}`,"server":"破阵子","school":"霸刀","roleName":"九娄的灵蛇","globalRoleId":"288230376159817831","roleLevel":0,"ts":"20210306074654449"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            // console.log(result)
            console.log(`点赞文章`+id+`${result.msg}`);
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}

// 取消点赞
function unlike(id) {
  return new Promise((resolve) => {
    $.post(taskUrl(`socialgw/like/cancel`,{"likeId":`${id}`,"ts":"20210306074647091"}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`API请求失败，请检查网路重试`)
        } else {
            result = JSON.parse(data)
            // console.log(result)
            console.log(`取消点赞文章♥`+id+`${result.msg}`);
        }
      } catch (e) {
        console.log(e)
      } finally {
        resolve(data)
      }
    })
  })
}






 //URL
 function taskUrl(activity, body={}) {
  return {
    url: `${XOYO_API_HOST}/${activity}`,
    headers: {
      'Host': 'm.pvp.xoyo.com',
      'Connection': 'keep-alive',
      'Accept': 'application/json',
      'X-Sk':'9a1f3a2bec7aa7da4880235194a903039dc6a5e16f8db93c63bafb4eb8ef93cc',
      'token': token,
      'deviceid': 'OYcLn8zNSsT4zLUCHnEHeg==',
      'User-Agent': '%E6%8E%A8%E6%A0%8F/52 CFNetwork/1209 Darwin/20.2.0',
      'Cookie': cookie,
    },
    body:`${JSON.stringify(body)}`
  }
}


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}