# git 规范
feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动

『perf』: 优化相关内容，比如提升性能、体验、算法等
『revert』: 回滚到上一个版本
『merge』: 代码合并
example:
fix(server): send cors headers
github email change test

# 在 commit message 里用 emoji
example:
$ git commit -m ':tada: init commit'
$ git commit -m 'added image to repo :art:'

|emoji|emoji 代码|commit 说明
| --- | ---      |---
|:tada: (庆祝)|	`:tada:`|	初次提交
|:new: (全新)|	`:new:` |	引入新功能|
|:bookmark: (书签)|	:bookmark:	发行/版本标签
|:bug: (bug)|	:bug:	修复 bug
|:ambulance: (急救车)|	:ambulance:	重要补丁
|:globe_with_meridians: (地球)|	:globe_with_meridians:	国际化与本地化
|:lipstick: (口红)|	:lipstick:	更新 UI 和样式文件
|:clapper: (场记板)	|:clapper:	更新演示/示例
|:rotating_light: (警车灯)|	:rotating_light:	移除 linter 警告
|:wrench: (扳手)|	:wrench:	修改配置文件
|:heavy_plus_sign: (加号)|	:heavy_plus_sign:	增加一个依赖
|:heavy_minus_sign: (减号)|	:heavy_minus_sign:	减少一个依赖
|:arrow_up: (上升箭头)|	:arrow_up:	升级依赖
|:arrow_down: (下降箭头)	|:arrow_down:	降级依赖
|:zap: (闪电)|
|:racehorse: (赛马)|	:zap:
|:racehorse:	提升性能|
|:chart_with_upwards_trend: (上升趋势图)	|:chart_with_upwards_trend:	添加分析或跟踪代码
|:rocket: (火箭)|	:rocket:	部署功能
|:white_check_mark: (白色复选框)|	:white_check_mark:	增加测试
|:memo: (备忘录)|`:memo:`
|:book: (书) |`:book:`|	撰写文档|
|:hammer: (锤子)|	:hammer:	重大重构
|:art: (调色板)	:art:	改进代码结构/代码格式
|:fire: (火焰)	:fire:	移除代码或文件
|:pencil2: (铅笔)	:pencil2:	修复 typo
|:construction: (施工)	:construction:	工作进行中
|:wastebasket: (垃圾桶)	:wastebasket:	废弃或删除
|:wheelchair: (轮椅)	:wheelchair:	可访问性
|:construction_worker: (工人)	:construction_worker:	添加 CI 构建系|统
|:green_heart: (绿心)	:green_heart:	修复 CI 构建问题
|:lock: (锁)	:lock:	修复安全问题
|:whale: (鲸鱼)	:whale:	Docker 相关工作
|:apple: (苹果)	:apple:	修复 macOS 下的问题
|:penguin: (企鹅)	:penguin:	修复 Linux 下的问题
|:checkered_flag: (旗帜)	:checkered_flag:	修复 Windows 下的问题
|:twisted_rightwards_arrows: (交叉箭头)	|:twisted_rightwards_arrows:	分支合并


# 函数注释规范
/**
       * @author: mingo
       * @description: 计算两个日期距离今天几天
       * @param {String} date1 yyyy-mm-dd 格式日期
       * @param {String} date2
       * @return {Object}
       */