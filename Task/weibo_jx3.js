/*
 * @Author: Xin https://github.com/Xin-code 
 * @Date: 2021-03-23 13:08:45 
 * @Last Modified by: Xin 
 * @Last Modified time: 2021-03-26 13:38:09
 */

const $ = Env('微博剑网三签到')

const notify = $.isNode() ? require('./sendNotify') : '';

const TokenArr = []

if ($.isNode()) {
  if (process.env.WEIBO_TOKEN && process.env.WEIBO_TOKEN.indexOf('#') > -1) {
    signToken = process.env.WEIBO_TOKEN.split('#');
  } else {
    signToken = process.env.WEIBO_TOKEN.split()
  }
  Object.keys(signToken).forEach((item) => {
    if (signToken[item]) {
      TokenArr.push(signToken[item])
    }
  })
}

!(async () => {
  for(let i = 0 ; i<TokenArr.length;i++){

        console.log(`···帐号【${i}】开始···`)

        token = TokenArr[i]
        var index = token.indexOf(`aid=`)

        // 签到
        await signSuper(token)

        // 获取活动ID
        await Tricket_ID(token)

        // 领取奖励
        if($.day!==undefined){
          console.log(`当前签到的是第【${$.day}】天,当前活动地址为:【${$.RewardURL}】`)
          await getReward($.RewardURL,token.slice(index+4,token.length))
        }else{
          console.log(`❌ 当前已经签到，不会返回任何消息\n`)
        }
        
        //推送消息
        await sendMsg()

        console.log(`···帐号【${i}】结束···`)

  }

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function signSuper(token) {
  return new Promise((resolve) => {
    $.get(taskUrl(`https://api.weibo.cn/2/page/button?gsid=${token}&sourcetype=page&page_id=10080832fb612861131313011fa86bdcda7c7a&since_id=4617894895551074&extparam=%E5%89%91%E7%BD%913&orifid=231619%24%24102803_ctg1_1770_-_ctg1_1770%24%240%24%24100103type%3D1%26q%3D%E5%89%91%E7%BD%913%26t%3D2%24%24100103type%3D1%26q%3D%E5%89%91%E7%BD%913%E8%B6%85%E8%AF%9D%26t%3D3&count=15&luicode=10000003&fid=10080832fb612861131313011fa86bdcda7c7a&featurecode=10000085&uicode=10000011&oriuicode=10000010_10000327_10000003_10000003_10000003&request_url=http%3A%2F%2Fi.huati.weibo.com%2Fmobile%2Fsuper%2Factive_checkin%3Fpageid%3D10080832fb612861131313011fa86bdcda7c7a%26in_page%3D1&page=1&lfid=100103type%3D1%26q%3D%E5%89%91%E7%BD%913%E8%B6%85%E8%AF%9D%26t%3D3&moduleID=pagecard&page_interrupt_enable=1&ul_sid=DCC83BD5-1195-4303-AB45-1BD074DFA898&ul_hid=827988EE-99CC-478B-BC91-1CA90663145B&ul_ctime=1616475510131`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
         console.log(result)
         if(result.button!==undefined){
          $.day = (result.button.name.slice(4,5))-0
          // 签到成功
          console.log(`✅:${result.button.name}\n`)
         }else{
           // 重复签到
           console.log(`❌:${result.error_msg}\n`)
         }
       }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}


// 获取领奖ID?不知道会不会活动结束移除
async function Tricket_ID(token) {
  return new Promise((resolve) => {
    $.get(taskUrl(`https://api.weibo.cn/2/page?gsid=${token}&client_key=1f010e1d88debcfa7ba76846859b9d4f&page_id=10080832fb612861131313011fa86bdcda7c7a&card159164_emoji_enable=0&extparam=%E5%89%91%E7%BD%913&refresh_type=0&fid=10080832fb612861131313011fa86bdcda7c7a_-_feed&count=20&uicode=10000011&show_layer=1&image_type=heif&moduleID=pagecard&sourcetype=page&page_interrupt_enable=1&lon=120.1037660608988&need_head_cards=0&need_new_pop=1&containerid=10080832fb612861131313011fa86bdcda7c7a_-_feed&luicode=10000003&open_searchall_164card=1&orifid=231619%24%24102803_ctg1_1770_-_ctg1_1770%24%240%24%24100103type%3D1%26q%3D%E5%89%91%E7%BD%913%E8%B6%85%E8%AF%9D%26t%3D1&featurecode=10000085&oriuicode=10000010_10000327_10000003_10000003&location_accuracy=1&no_location_permission=0&lat=30.26916224993534&page=1&new_comment_171card=1&lfid=100103type%3D1%26q%3D%E5%89%91%E7%BD%913%E8%B6%85%E8%AF%9D%26t%3D1&st_bottom_bar_new_style_enable=1&new_topic_header=1`),async(error, response, data) =>{
     try{
       if (error) {
         console.log(`${JSON.stringify(error)}`)
         console.log(`API请求失败，请检查网路重试`)
       } else {
         const result = JSON.parse(data)
         // 反馈信息
        //  console.log(result)
        // 卡片模块
        // console.log(result.cards)
        result.cards.forEach((item)=>{
          // 中间奖励模块ID 点击领取里面的信息
          if(item.itemid==='pagemanual_1'){
            console.log(`打印出前四天活动ID奖励：`)
            // console.log(item)
            // 整组卡片的详细信息
            item.card_group.forEach((card)=>{
              // 前四天所有的信息
              console.log(card.group)
              // 每个具体卡片的内容
              card.group.forEach((i)=>{
                // 第几天签到
                // console.log(i.title_sub)
                // console.log(i.title_sub.slice(0,1)-0)
                // 当返回的是第几天的时候就拿出来第几天的领取奖励地址
                if($.day===i.title_sub.slice(0,1)-0){
                  let url = decodeURIComponent(i.scheme)
                  let index = url.indexOf(`1`)
                  $.RewardURL = (url.slice(index,i.scheme.length))
                }
              })
            })
          }

          else if (item.itemid==='pagemanual_2'){
            console.log(`打印出后四天活动ID奖励：`)
            // console.log(item)
            // 整组卡片的详细信息
            item.card_group.forEach((card)=>{
              // 后四天所有的信息
              console.log(card.group)
              // 每个具体卡片的内容
              card.group.forEach((i)=>{
                // 第几天签到
                // console.log(i.title_sub)
                // console.log(i.title_sub.slice(0,1)-0)
                // 当返回的是第几天的时候就拿出来第几天的领取奖励地址
                if($.day===i.title_sub.slice(0,1)-0){
                  let url = decodeURIComponent(i.scheme)
                  let index = url.indexOf(`1`)
                  $.RewardURL = (url.slice(index,i.scheme.length))
                }
              })
            })
          }
        })
         }}catch(e) {
           console.log(e)
         } finally {
         resolve();
       } 
     })
    })
}
    
// 获取奖励
async function getReward(url,aid){
 return new Promise((resolve) => {
   $.get(BodytaskUrl(`https://games.weibo.cn/prize/lottery?ticket_id=${url}&aid=${aid}&from=10B3393010`),async(error, response, data) =>{
    try{
      if (error) {
        console.log(`API请求失败，请检查网路重试`)
      } else {
        const result = JSON.parse(data)
        // 反馈信息
        console.log(`💰奖励反馈信息:`);
        console.log(result)
        if(result.data.msg==='success'){
          // 中奖
          console.log(`\n💰${result.data.layer_conf.success_desc1}:【${result.data.prize_data.card_name}】的${result.data.prize_data.type}为:${result.data.prize_data.card_no}`)
          $.message+=` 💰 ${result.data.layer_conf.success_desc1}:【${result.data.prize_data.card_name}】的${result.data.prize_data.type}为:${result.data.prize_data.card_no}}`
        }else{
          // 未中奖&失败
          console.log(`\ n❗ ${result.data.none_desc1}||${result.data.fail_desc1}`)
          $.message+=` ❗ ${result.data.none_desc1}||${result.data.fail_desc1}`
        }
      }}catch(e) {
          console.log(e)
        } finally {
        resolve();
      } 
    })
   })
}

async function sendMsg() {
  await notify.sendNotify(`微博超话 - JX3`,`${$.message}`);
}

/*
{
  "code":1000,
  "msg":"success",
  "data":{
    "layer_conf":{
      "fail_bt_url":"",
      "none_bt2_url":"",
      "success_img":"http:\/\/n.sinaimg.cn\/games\/680774ce\/20210322\/1ChunRiPuZhaoDaLiBao.png",
      "success_desc1":"恭喜你获得",
      "success_desc2":"3月25日8:00起可兑换",
      "success_attention_text":"关注已发博",
      "success_bt_text":"复制",
      "success_bg_img":"http:\/\/n.sinaimg.cn\/default\/94236c52\/20210318\/BianZu5.png",
      "fail_desc1":"未达到签到天数",
      "fail_bg_img":"http:\/\/n.sinaimg.cn\/default\/94236c52\/20210318\/BianZu5.png",
      "fail_img":"http:\/\/n.sinaimg.cn\/default\/94236c52\/20210318\/BianZu6.png",
      "fail_bt_text":"返回超话",
      "none_desc1":"抱歉，未中奖",
      "none_desc2":"详细记录可在【福利中心查看】",
      "none_bg_img":"http:\/\/n.sinaimg.cn\/default\/94236c52\/20210318\/BianZu5.png",
      "none_img":"http:\/\/n.sinaimg.cn\/default\/94236c52\/20210318\/BianZu6.png",
      "none_bt2_text":"返回超话",
      "none_bt1_url":"https:\/\/huati.weibo.cn\/discovery\/super?extparam=ctg1_126",
      "none_bt1_text":"去活动首页",
      "address_url":"sinaweibo:\/\/browser?share_menu=0&disable_sinaurl=1&sinainternalbrowser=topnav&url=https://games.weibo.cn/address/index?type=0"
    },
    "prize_data":{
      "type":"cdkey",
      "code_id":"244",
      "list_bt_text":"查看详情",
      "card_no":"AEAUQ7CHPP72KP66344",
      "game_name":"剑网3",
      "card_name":"签到1天-春日普照大礼包",
      "prize_name":"春日普照大礼包"
    }
  }
}
*/

function taskUrl(activity) {
  return {
    url: activity,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'api.weibo.cn',
      'User-Agent': 'Weibo/52760 (iPhone; iOS 14.3; Scale/3.00)',
    }
  }
}


 // BODYURL
 function BodytaskUrl(activity) {
  return {
    url: activity,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'games.weibo.cn',
      'Cookie': `SCF=AsYbPx6c7sI8_OTMTTLBsG6foGyg0MM2MSJr5q5GIV8kksHQrj0Me0vGvnqKj0Ou2Q..; SUB=_2A25NOAFWDeRhGeRO6FYW8y3Nyz6IHXVuEkkerDV6PUJbitAKLUHikWtNUGFlbHMkNUdyBkg2wOEZ8UeBgKdg-yqo; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFxNBfnPX8_hLsd6XE8lPDP5NHD95QEeheXS0e0eK5EWs4DqcjMi--NiK.Xi-2Ri--ciKnRi-zNeo50ShM0e027entt; TV-G0=09a9937c8ab9f8b1ed33122bd159217f`,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone13,2__weibo__11.3.3__iphone__os14.3)',
      'Referer':'https://games.weibo.cn/prize/lottery?ticket_id=1026&source=chaohua_sign',
    }
  }
}

// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}