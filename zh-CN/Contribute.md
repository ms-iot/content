---
layout: default
title: 如何参与
permalink: /zh-cn/Contribute.htm
lang: zh-cn
---

# 如何参与
感谢你对参与面向 IoT 的 Windows 开发人员计划感兴趣。

我们正在积极主动地为以下领域接受相关工作：

* <a href="https://github.com/ms-iot/content" target="_blank">入门指南</a>
* <a href="https://github.com/ms-iot/galileo-sdk" target="_blank">Galileo SDK</a>
* 教程
* 添加或删除指向项目的指针
* 添加或删除指向库端口的指针
* 添加或删除指向 Arduino Shield 端口的指针

___

## 参考
1. <a href="https://help.github.com/" title="GitHub documentation" target="_blank">GitHub 文档</a>
1. <a href="https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true" title="Git Cheatsheet!" target="_blank">Git Cheatsheet!</a>
1. <a href="http://www.git-scm.com/book/en/" title="Git Documentation" target="_blank">Git 文档</a>

___

## Git 指南

1. 必须是可自动合并的。
    * 你应该做好相关工作，这样我们便可以自动针对存储库的当前状态合并你的更改。否则，我们将拒绝你的拉取请求，并一直等到你完成修复。
1. 永远不要重复提交
___

## 分叉存储库
1. 从 <a href="https://github.com/" target="_blank">GitHub 主页</a>开始创建 GitHub 帐户
1. 转到 <a href="https://github.com/" target="_blank">GitHub 主页</a>并导航到你想要参与的存储库，单击“分叉” ![分叉]({{site.baseurl}}/Resources/images/GitHubFork.png)
1. 在 GitHub 上，导航至你的帐户的存储库分叉
1. 用以下两种方式之一克隆存储库：
    1. 可使用命令行 <br/> <kbd>git clone \[链接至 .git\] \[NameYourLocalFolder\]</kbd>
    1. 或通过单击存储库 ![克隆]({{site.baseurl}}/Resources/images/GitHubClone.png) 右侧的“在桌面中克隆”来启动 GitHub 应用

___

##使用 Git
如果你正在编辑 ms-iot/content 的分叉，请提交开发的拉取请求。<br/> 如果你正在编辑 ms-iot/galileo-sdk 的分叉，请提交开发的拉取请求。

作为解释，以下描述的含义：<br/> **本地存储库：**你在计算机上所拥有的克隆存储库<br/> **分叉存储库：**你从主存储库中所做的分叉。它位于 github 的服务器上。（也称为 <b>“原点”</b>）<br/> **主存储库：**你从中分叉的原始存储库。这是在 github 服务器上承载的常见 ms-iot 存储库。（也称为 <b>“上游”</b>）<br/>

###设置
1. 设置上游
    * <kbd>git 远程添加上游 \[链接至 .git\]</kbd>

###进行更改
1. 进行编辑、生成和测试。使用任何特定编辑要求、生成说明和测试方法的存储库自述文件。
    * <kbd>git 添加 \[文件\]</kbd>
1. 将更改提交到本地存储库。
    * <kbd>git 提交 -m“\[描述性消息\]”</kbd>

###提交拉取请求
1. 提交首个拉取请求后，如果你尚未签署所占份额许可协议，我们的所占份额许可协议服务将要求你签署。我们将要求你完成此电子要求。若没有完成此步骤，我们无法接受拉取请求，对此我们表示遗憾。此操作只需执行一次。
1. 提取上游
    * <kbd>git 提取 --所有</kbd>
1. 重新设定上游的基址（现在这应将更改放置于主存储库历史记录顶部。）
    * <kbd>git 重新设定基址 -i 上游/开发</kbd>
    * 这会突出显示你必须手动合并的冲突。
        * 为此，可使用最中意的合并工具甚至是记事本。
    * 手动合并后，可继续重新设定基址
        * <kbd>git 添加 \[fileYouHandMerged\]</kbd>
        * <kbd>git 重新设定基址 - 继续</kbd>
1. 强制 - 将更改推送至分叉存储库。
    * <kbd>git 推送 -f 原点开发</kbd>
1. 现在，使用 GitHub 网站从分叉存储库提交你的拉取请求。

###对拉取请求进行更改
1. 进行新的更改、提取上游、重新设定上游基址并且强制推送更改。
    * 如果拉取请求从未关闭，无需提交新的拉取请求。它会自动更新。

___

#在 Galileo SDK 上进行迭代
按如上所述，在参与部分中分叉 ms-iot/galileo-sdk 并遵循 README 说明。

___

#最佳做法

##请勿签入二进制文件
二进制文件添加到存储库后，将永远位于该库中。

请不要将以下二进制文件添加到 Git，包括：

* 来自生成（调试/发布）的输出
* SDF 文件（代码数据库）
* Nuget 程序包目录

可接受的二进制文件：\* PNG、JPG 或其他图像格式
