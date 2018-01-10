![蓝眼博客logo](https://github.com/eyebluecn/blog/blob/master/src/main/resources/static/img/logo.png?raw=true)

# 蓝眼博客

#### [在线Demo](http://blog.eyeblue.cn)

#### [配套后端blog](https://github.com/eyebluecn/blog)

### 简介
蓝眼博客是 [蓝眼系列开源软件](https://github.com/eyebluecn) 中的第二个

- 可用于快速搭建个人博客。
- 可以作为私人笔记使用。
- 支持多用户写作，评论，邮件通知等核心功能。

蓝眼博客力求小而精，可以作为团队内部或个人私有的博客使用，同时也可作为学习资源使用。

如果您觉得蓝眼博客对您有帮助，请不要吝惜您的star :smile:

### 技术栈

vue2.0 + vue-router + vuex + vue-resource + webpack + es6 + less

### 运行

```
npm install

npm run dev
```
如果您有自己的blog后端，也可以在`config/index.js`中`proxyTable.target`修改为自己blog后端所在地址

### 打包

```
npm run build
```
 打包的结果在`dist`文件夹下，将该文件夹下的内容放置在[后端blog](https://github.com/eyebluecn/blog)的`build/html`文件夹下即可。


### 总结
1、 蓝眼的宗旨是专注于开源精致而优雅的软件，所以在代码的构建过程中我们不停地思考与迭代，追求最优质的代码。

2、 蓝眼博客致力于为用户创建个人博客平台以及团队博客平台，后台管理系统包含管理员以及普通用户角色，同时我们支持响应式。

3、 蓝眼博客拥有强力的[配套后端blog](https://github.com/eyebluecn/blog)，如果您只是简单的想搭建自己的博客，后端项目中包含了此项
目的打包文件，如果你想高度定制化，那么请参考打包步骤。

### 部分截图

博客网站的个性化设置、备案信息、logo等都在里面，在这里面最多可以自定义五个菜单显示在博客展示页面的右上方
![蓝眼博客后台](https://github.com/eyebluecn/blog-front/blob/dev/screenshots/preference.png)

博客展示页面
![蓝眼博客首页](https://github.com/eyebluecn/blog/blob/master/doc/screenshot/home.png)

登录页面
![蓝眼博客后台](https://github.com/eyebluecn/blog/blob/master/doc/screenshot/backyard.png)

文章列表页
![蓝眼博客后台](https://github.com/eyebluecn/blog-front/blob/dev/screenshots/article_list.png)

文章详情页
![蓝眼博客后台](https://github.com/eyebluecn/blog-front/blob/dev/screenshots/article_detail.png)

用户详情页
![蓝眼博客后台](https://github.com/eyebluecn/blog-front/blob/dev/screenshots/user_detail.png)


### Contribution

感谢所有蓝眼博客的贡献者 [@zicla](https://github.com/zicla)，[@seaheart](https://github.com/seaheart)，[@yemuhe](https://github.com/yemuhe)，[@hxsherry](https://github.com/hxsherry)

如果您也想参与进来，请尽情的fork, star, post issue, pull requests


### 项目布局 

```
├── build                                          // webpack配置文件
├── bystatic                                       // editormd所需加载资源的本地目录
├── config                                         // 项目打包路径及反向代理配置
├── doc                                            // vue-cli创建后配置文档
├── node_modules                                   // 依赖包存放目录
├── screenshots                                    // 项目部分截图
├── node_modules                                   // 依赖包存放目录
├── static                                         // 打包文件存放目录
├── src                                            // 源码目录
│   ├── assets                                     // 静态资源
│   │   ├── css                                    // css目录
│   │   │   ├── bootstrap                          // bootstrap全局less
│   │   │   ├── global                             // 自定义全局less
│   │   │   ├── inspinia                           // 引用外部插件less
│   │   │   ├── mixin                              // bootstrap部分样式
│   │   │   ├── app.less                           // less入口文件
│   │   ├── img                                    // 静态图片存放目录
│   ├── backyard                                   // 后台管理
│   │   ├── article                                // 文章
│   │   │   ├── widget                             // 文章相关组件
│   │   │   │   ├── ArticleCell.vue                // 文章单元组件
│   │   │   │   ├── ArticleHot.vue                 // 热门文章单元组件
│   │   │   │   ├── ArticleInfo.vue                // 文章基本信息单元组件
│   │   │   ├── Create.vue                         // 文章创建编辑
│   │   │   ├── Detail.vue                         // 文章详情
│   │   │   ├── List.vue                           // 文章列表
│   │   ├── comment                                // 评论
│   │   │   ├── widget                             // 评论相关组件
│   │   │   │   ├── CommentList.vue                // 评论列表组件
│   │   │   │   ├── CommentTextarea.vue            // 发表评论组件
│   │   ├── layout                                 // 布局  
│   │   │   ├── BottomNavigation.vue               // 尾部布局组件
│   │   │   ├── SideMenu.vue                       // 侧边栏菜单组件
│   │   │   ├── SideNavigation.vue                 // 侧边栏布局组件
│   │   │   ├── TopNavigation.vue                  // 头部布局组件
│   │   ├── preference                             // 个性化
│   │   │   ├── Edit.vue                           // 个性化编辑
│   │   │   ├── Index.vue                          // 个性化显示
│   │   ├── report                                 // 举报
│   │   │   ├── widget                             // 举报相关组件
│   │   │   │   ├── ReportCell.vue                 // 举报单元组件
│   │   │   ├── List.vue                           // 举报列表
│   │   ├── tag                                    // 标签
│   │   │   ├── widget                             // 标签相关组件
│   │   │   │   ├── TagCell.vue                    // 标签单元组件
│   │   │   ├── Create.vue                         // 标签创建
│   │   │   ├── List.vue                           // 标签列表
│   │   ├── user                                   // 用户
│   │   │   ├── widget                             // 用户相关组件
│   │   │   │   ├── UserAchievement.vue            // 用户成就组件
│   │   │   │   ├── UserInputSelection.vue         // 用户异步输入筛选组件
│   │   │   ├── ChangePassword.vue                 // 用户修改密码
│   │   │   ├── Create.vue                         // 用户创建
│   │   │   ├── Detail.vue                         // 用户详情
│   │   │   ├── List.vue                           // 用户列表
│   │   │   ├── Login.vue                          // 用户登录
│   │   ├── widget                                 // 与页面有关的公用组件
│   │   │   ├── CreateSaveButton.vue               // 保存创建按钮组件
│   │   │   ├── LoadingFrame.vue                   // 框架加载组件
│   │   ├── Frame.vue                              // 大框架
│   ├── common                                     // 公共目录
│   │   ├── directive                              // 自定义指令
│   │   │   ├── directive.js                       // 验证规则指令
│   │   ├── filter                                 // 过滤器
│   │   │   ├── index.js                           // 过滤器入口文件
│   │   │   ├── number.js                          // 数字格式过滤器
│   │   │   ├── str.js                             // 字符串格式过滤器
│   │   │   ├── time.js                            // 时间格式过滤器
│   │   │   ├── validate.js                        // 正则表达式
│   │   ├── fork                                   // 引用外部插件
│   │   ├── model                                  // 类模型目录
│   │   │   ├── article                            // 文章
│   │   │   │   ├── Article.js                     // 文章类
│   │   │   ├── base                               // 基
│   │   │   │   ├── Base.js                        // 基类
│   │   │   │   ├── BaseEntity.js                  // 实体基类
│   │   │   │   ├── Filter.js                      // 过滤器类
│   │   │   │   ├── Pager.js                       // 分页类
│   │   │   ├── comment                            // 评论
│   │   │   │   ├── Comment.js                     // 评论类
│   │   │   ├── feature                            // 权限点
│   │   │   │   ├── FeatureType.js                 // 权限点类
│   │   │   ├── preference                         // 个性化
│   │   │   │   ├── Preference.js                  // 个性化类
│   │   │   ├── report                             // 举报
│   │   │   │   ├── Report.js                      // 举报类
│   │   │   ├── tag                                // 标签
│   │   │   │   ├── Tag.js                         // 标签类
│   │   │   ├── tank                               // 上传文件
│   │   │   │   ├── Tag.js                         // 上传文件类
│   │   │   ├── user                               // 用户
│   │   │   │   ├── User.js                        // 用户类
│   │   │   ├── validation                         // 验证
│   │   │   │   ├── ImageCaptcha.js                // 验证码类
│   │   ├── router                                 // 路由
│   │   │   ├── index.js                           // 路由入口文件
│   │   ├── util                                   // 通用
│   │   │   ├── MimeUtil.js                        // 后缀名判别文件
│   │   │   ├── Utils.js                           // 客户端判别文件
│   │   ├── vuex                                   // vuex状态管理
│   │   │   ├── index.js                           // vuex入口文件
│   │   ├── widget                                 // 公用轮子文件（里面存放各种通用型轮子）
│   │   │   ├── filter                             // 筛选
│   │   │   │   ├── NbFilter.vue                   // 筛选入口组件
│   │   │   │   ├── NbFilterCheck.vue              // 单/多项选择筛选
│   │   │   │   ├── NbFilterDateTime.vue           // 时间筛选
│   │   │   │   ├── NbFilterHttpInputSelection.vue // 异步输入筛选
│   │   │   │   ├── NbFilterHttpSelection.vue      // 异步下拉筛选
│   │   │   │   ├── NbFilterMultiSelection.vue     // 多选下拉筛选
│   │   │   │   ├── NbFilterSelection.vue          // 下拉筛选
│   │   │   │   ├── NbFilterSort.vue               // 布尔值筛选
│   │   │   ├── markdown                           // 文本编辑
│   │   │   │   ├── EMAttachment.js                // 自定义上传附件
│   │   │   │   ├── EMAttachmentPanel.vue          // 上传附件容器
│   │   │   │   ├── EMPicture.js                   // 自定义上传图片
│   │   │   │   ├── EMPicturePanel.vue             // 上传图片容器
│   │   │   │   ├── NbMarkdown.vue                 // Markdown编辑器组件
│   │   │   │   ├── NbMarkdownPreview.vue          // Markdown编辑器预览组件
│   │   │   ├── NbBtnDropdown.vue                  // 按钮下拉组件
│   │   │   ├── NbCheckbox.vue                     // 复选框组件
│   │   │   ├── NbExpanding.vue                    // 收缩展开组件
│   │   │   ├── NbPager.vue                        // 分页组件
│   │   │   ├── NbRadio.vue                        // 单选框组件
│   │   │   ├── NbSlidePanel.vue                   // 动画组件
│   │   │   ├── NbSwitcher.vue                     // 开关按钮组件
│   ├── App.vue                                    // 页面入口文件
│   ├── main.js                                    // Js入口文件
├── index.html                                     // 入口Html文件
```


### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, eyeblue.cn
