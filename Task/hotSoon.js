/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-04 15:21:37 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-05 08:57:17
 */


const $ = new Env('火山视频提现')

!(async () => {
  const ts = new Date().getTime()
  await Withdraw(ts)
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 提现
async function Withdraw(ts){
 return new Promise((resolve) => {
    let URL = {
   	url: `https://i.snssdk.com/luckycat/hotsoon/v1/wallet/check_take_cash?&polaris_version=2.0.0&version_code=7.6.4&code=1&app_name=live_stream_lite&vid=98143B35-B286-410F-A83F-D8F11A711E44&device_id=2568877913678359&new_nav=0&channel=App%20Store&resp_js_time=${ts}&aid=1350&recv_js_call_time=${ts}`,
    	headers: {
       'Host': 'i.snssdk.com',
       'Connection':'keep-alive',
       'Content-Length':'73',
       'Accept':'application/json',
       'x-Tt-Token':'002e6324393589e2f4c1ee7df2bb124f35011bd8c9f4303ccd4b958462cc1bc2577dedeb306bd1458c2203d9aa4d4bf7efc0791b971619ad9609b171104f0502160c906f6da23234449718a132cbbfdda1d9b76d93cabf8faeda59eb0dad1ea0752cd-1.0.1',
       'Cookie':'passport_csrf_token_default=573297bd728d08f437e6e9a5141df7fc; odin_tt=bb9807167028f2ee7cb6a4f24ea59d9341b47f5adecb414f0036fda04e391bf3a609595174ad9acfd06053050f558dd1e5fa0cf0fe47fe55d29ddd7b3393a596; n_mh=L5N-Ug_WHddGoCQFTe0ZIkB5OqdNl75bDEr79RhaaY4; d_ticket=0b3e35056e0fca924ff6f06849c71639f6587; passport_csrf_token=573297bd728d08f437e6e9a5141df7fc; sid_guard=2e6324393589e2f4c1ee7df2bb124f35%7C1614351178%7C5184000%7CTue%2C+27-Apr-2021+14%3A52%3A58+GMT; uid_tt=099c26cc1c4b3e1c8eb9fa52500bfa4c; uid_tt_ss=099c26cc1c4b3e1c8eb9fa52500bfa4c; sid_tt=2e6324393589e2f4c1ee7df2bb124f35; sessionid=2e6324393589e2f4c1ee7df2bb124f35; sessionid_ss=2e6324393589e2f4c1ee7df2bb124f35; MONITOR_WEB_ID=6691b411-f8e4-4b12-82ad-3979626911da; install_id=246709429220727; ttreq=1$fc46ee27d4942c615b8ece30fa742f0a81d83d7a;',
       'Content-Type':'application/json; encoding=utf-8',
       'X-SS-Cookie':'MONITOR_WEB_ID=6691b411-f8e4-4b12-82ad-3979626911da; install_id=246709429220727; ttreq=1$fc46ee27d4942c615b8ece30fa742f0a81d83d7a; sessionid=2e6324393589e2f4c1ee7df2bb124f35; sessionid_ss=2e6324393589e2f4c1ee7df2bb124f35; sid_guard=2e6324393589e2f4c1ee7df2bb124f35%7C1614351178%7C5184000%7CTue%2C+27-Apr-2021+14%3A52%3A58+GMT; sid_tt=2e6324393589e2f4c1ee7df2bb124f35; uid_tt=099c26cc1c4b3e1c8eb9fa52500bfa4c; uid_tt_ss=099c26cc1c4b3e1c8eb9fa52500bfa4c; d_ticket=0b3e35056e0fca924ff6f06849c71639f6587; n_mh=L5N-Ug_WHddGoCQFTe0ZIkB5OqdNl75bDEr79RhaaY4; odin_tt=bb9807167028f2ee7cb6a4f24ea59d9341b47f5adecb414f0036fda04e391bf3a609595174ad9acfd06053050f558dd1e5fa0cf0fe47fe55d29ddd7b3393a596; passport_csrf_token=573297bd728d08f437e6e9a5141df7fc; passport_csrf_token_default=573297bd728d08f437e6e9a5141df7fc',
       'tt-request-time':`${ts}`,
       'User-Agent':'HotsoonLite 7.6.4 rv:7642 (iPhone; iOS 14.3; zh_CN) Cronet',
       'sdk-version':'1',
       'X-SS-STUB':'ADBA2DD71665AF6229537A287801E395',
       'x-tt-trace-id':'00-fc350c7b0d920617f84221726c7f0546-fc350c7b0d920617-01',
       'Accept-Encoding':'gzip, deflate',
       'X-Khronos':`${JSON.parse((ts.toString()).slice(0,10))}`,
       'X-Gorgon':'8402808e00002ee8bfe6d70f55a09616ccd8fd59f16401f8122a',
       },
       body:`{
        "task_id" : 215,
        "account" : "180****9809",
        "cash_amount" : -20,
        "is_auto" : true,
        "name" : "",
        "take_cash_way" : "alipay"
      }`
    	}
   $.post(URL,async(error, response, data) =>{
    try{
      result = JSON.parse(data)
      console.log(result)

        }catch(e) {
          console.log(e)
      } finally {
        resolve();
      } 
    })
   })
}




 // pretty-ignore
 function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}