---
layout: default
title: SetupPCWVSA
permalink: /zh-CN/win10/SetupPCWVSA.htm
lang: zh-CN
---

#入门

了解如何使电脑为使用 Windows Remote Arduino 开发 IoT 应用程序做好准备。

{% include steps.html device="WVSA" %}

##针对 Windows Virtual Shields for Arduino 进行设置（手机和电脑）

##硬件

###所需内容
 1. Windows 10 手机（[Lumia 520](http://www.microsoft.com/zh-CN/mobile/phone/lumia520/){:target="_blank"}、[Lumia 635](http://www.microsoft.com/zh-CN/mobile/phone/lumia635/){:target="_blank"}）

###设置 Windows 10 手机
 1. 许多 Windows Phone 8 用户可从应用商店获取“Windows 预览体验会员”应用程序。这允许用户选择将 Windows 10 Technical Previews 作为更新进行接收。

##软件

###所需内容
 1. Visual Studio 2015，用于将 UWA（手机应用）旁加载至开发人员解锁的手机上。（为了避免旁加载，我们正努力将此应用提交到应用商店中）
 2. 此[存储库](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"}

###设置你的 Visual Studio 2015
 1. 从 [dev.windows.com](https://dev.windows.com/zh-CN/windows-10-developer-preview-tools){:target="_blank"} 中获取 Windows 10 Technical Preview 工具，包括 Visual Studio 2015。
 2. 从此[存储库](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"}加载 Shield.sln。
 3. 请确保你的手机已由开发人员解锁。[此页面](https://msdn.microsoft.com/zh-CN/library/windows/apps/dn614128.aspx){:target="_blank"}引用 Windows Phone 8.1、8 和 7.1。但是，对于 Windows 10 手机，注册步骤完全相同。
 4. 部署到你的设备。
 5. 运行 Virtual Shields for Arduino 应用程序。
