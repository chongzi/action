### Secrets



#### 喜马拉雅

| Name | 属性 | 说明 |
| --- | --- | --- |
| `XMLY_SPEED_COOKIE` | 必须 | [Cookie 获取请参考](https://github.com/Zero-S1/xmly_speed/blob/master/xmly_speed.md),仅支持 git actions 执行,多个 Cookie 用换行即可 |
| `XMLY_ANDROID_AGENT` | 非必须 | 仅安卓用的 Agent 配置，不填的话也会默认用红米 8 的 |
| `XMLY_ACCUMULATE_TIME` | 非必须 | 需要刷时长任务的话，填入`zero_s1`；可能会黑号，请知悉 |
| `XMLY_ACCUMULATE_INDEX` | 非必须 | 需配合`XMLY_ACCUMULATE_TIME`使用，用于限定某个索引的账号不进行刷时长 |
| `XMLY_ACCUMULATE_HOURS` | 非必须 | 需配合`XMLY_ACCUMULATE_TIME`使用，用于限定每天收听的小时数,尽量避免黑号 |

- 关于`XMLY_ACCUMULATE_INDEX`

> 用于指定哪几个账号不执行时长任务

比如我有 5 个账号，我第 1 个和第 5 个不想执行刷时长任务，则填入内容为`1,5` 例如我只有两个号，第 2 个号不想执行刷时长，则直接填入`2`即可

- 关于`XMLY_ACCUMULATE_HOURS`

> 用于指定时长任务最大时间，防止现在时长任务直接是 24 小时的，过于容易发生黑号情况

传入`1`~`24`之间的数字即可



#### 推送通知

| Name                          |          归属          | 属性   | 说明                                                         |
| ----------------------------- | :--------------------: | ------ | ------------------------------------------------------------ |
| `PUSH_KEY`                    |          推送          | 非必须 | cookie 失效推送[server 酱的微信通知](http://sc.ftqq.com/3.version) |
| `BARK_PUSH`                   |          推送          | 非必须 | cookie 失效推送 BARK 这个 APP,此 token 是https://api.day.app/后面的内容 |
| `BARK_SOUND`                  |          推送          | 非必须 | bark 推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
| `TG_BOT_TOKEN`                |          推送          | 非必须 | tg 推送,填写自己申请[@BotFather](https://t.me/BotFather)的 Token,如`10xxx4:AAFcqxxxxgER5uw` |
| `TG_USER_ID`                  |          推送          | 非必须 | tg 推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字 ID，[关于 TG 推送的说明](#关于TG推送的说明) |
| `DD_BOT_TOKEN`                |        钉钉推送        | 非必须 | 钉钉推送[官方文档](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq) ,只需`https://oapi.dingtalk.com/robot/send?access_token=XXX` 等于符号后面的 XXX， 注：如果钉钉推送只填写`DD_BOT_TOKEN`，那么安全设置需勾选`自定义关键词`，内容输入输入`账号`即可，其他安全设置不要勾选 |
| `DD_BOT_SECRET`               |        钉钉推送        | 非必须 | 密钥，机器人安全设置页面，加签一栏下面显示的 SEC 开头的字符串,填写了`DD_BOT_TOKEN`和`DD_BOT_SECRET`，钉钉机器人安全设置只需勾选`加签`即可，其他选项不要勾选 |
| `IGOT_PUSH_KEY`               |          推送          | 非必须 | IGOT 推送                                                    |
| `PUSH_PLUS_TOKEN`             |      pushplus推送      | 非必须 | 微信扫码登录后一对一推送或一对多推送下面的token(您的Token) [官方网站](http://pushplus.hxtrip.com/) |
| `PUSH_PLUS_USER`              |      pushplus推送      | 非必须 | 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码）注:(1、需订阅者扫描二维码 2、如果您是创建群组所属人，也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送)，只填`PUSH_PLUS_TOKEN`默认为一对一推送 |
| `QQ_SKEY`                     |  酷推(Cool Push)推送   | 非必须 | 推送所需的Skey,登录后获取Skey [参考文档](https://cp.xuthus.cc/) |
| `QQ_MODE`                     |  酷推(Cool Push)推送   | 非必须 | 推送方式(send或group或者wx，默认send) [参考文档](https://cp.xuthus.cc/) |
| `PET_NOTIFY_CONTROL`          |    东东萌宠推送开关    | 非必须 | 控制京东萌宠是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `FRUIT_NOTIFY_CONTROL`        |    东东农场推送开关    | 非必须 | 控制京东农场是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `JD_JOY_REWARD_NOTIFY`        | 宠汪汪兑换京豆推送开关 | 非必须 | 控制 jd_joy_reward.js 脚本是否静默运行,`false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `MARKET_REWARD_NOTIFY`        | 京小超兑换奖品推送开关 | 非必须 | 控制 jd_blueCoin.js 兑换奖品成功后是否静默运行, `false`为否(发送推送通知消息),`true`为是(即：不发送推送通知消息) |
| `DREAMFACTORY_NOTIFY_CONTROL` |    京喜工厂推送开关    | 非必须 | jd_dreamFactory.js, 默认 true (不推送)                       |
| `JXSTORY_NOTIFY_CONTROL`      |    京喜故事推送开关    | 非必须 | jd_jxstory.js, 默认 true (不推送)                            |



#### Telegram推送

> 需要`TG_BOT_TOKEN`和`TG_USER_ID`一起使用，前者用于调用 bot，后者用于指定推送目标

私聊[@getuseridbot](https://t.me/getuseridbot)，点击 start 以后，收到的第一条纯数字消息就是你的 userid 了

<img src="https://user-images.githubusercontent.com/6993269/93156198-3b1ad700-f73a-11ea-8f51-5ee71d06ef8a.png" alt="获取userid" style="zoom:40%;" />

私聊[@BotFather](https://t.me/BotFather)，创建自己的 bot

<img src="https://user-images.githubusercontent.com/6993269/93155923-b0d27300-f739-11ea-928a-803134f0f416.png" alt="获取bot的token" style="zoom:40%;" />
