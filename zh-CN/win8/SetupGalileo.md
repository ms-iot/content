---
layout: default
title: 设置 Intel Galileo
permalink: /zh-cn/win8/SetupGalileo.htm
lang: zh-cn
deviceName: Galileo
---

#使用入门

本指南将向你演示如何在 Intel Galileo Gen1 或 Gen2 上安装并运行面向 IoT 的 Windows 开发人员计划。

{% include steps.html device=page.deviceName %}

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持已于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>	
</div>

## 步骤 1： 注册 Microsoft Connect
我们通过 Microsoft Connect 计划发布适用于 Galileo 的 Windows。请转到 [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} 站点注册。你可以在[此处]({{site.baseurl}}/{{page.lang}}/SigninMSConnect.htm){:target="_blank"}找到注册 Microsoft Connect 的分步说明。

## 创建 Microsoft Windows 可启动的 microSD 卡

### 在创建 microSD 卡映像前
请确保出于已知原因来创建 microSD 卡映像。如果遇到 Windows 问题，请访问 [Microsoft Connect](http://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558){:target="_blank"} 以提出 Bug，MS IoT 团队将作出回应。

创建 microSD 卡映像的已知原因包括：

* 设置新的 Intel Galileo
* 更新到作为面向 IoT 的 Windows 开发人员计划一部分而提供的新版 Microsoft Windows 映像。
* 你已更新了 Intel Galileo 固件，但未更新 Microsoft Windows 映像。
* 你的 Intel Galileo 已启动，但无法运行草图。
* SD 卡已损坏。


要求：

* 装有 microSD 卡适配器的 microSD 卡读卡器或 SD 卡读卡器
* 16gig 或更大的 microSD 卡

软件程序包：

* [apply-BootMedia.cmd](http://go.microsoft.com/fwlink/?LinkID=403796){:target="_blank"}
* [适用于 Intel Galileo 的 Microsoft Windows](http://go.microsoft.com/fwlink/?LinkID=513083&clcid=0x409){:target="_blank"}

***注意：*** 截止到 2014 年 12 月，Intel Galileo Gen1 或 Gen2 仅需要单个 Windows 映像。

# 将 Windows 写入 microSD 卡

* 通过 Fat32 文件系统格式化 microSD 卡。
* 打开管理命令提示符：
  * 打开“开始”屏幕
  * 键入 `cmd`
  * 右键单击或长按 `Command Prompt`，然后选择 `Run as Administrator`
* 如果在 Windows 7 上运行，请在继续之前按照[这些指示](ImageOnWin7.htm){:target="_blank"}进行操作。
* 在命令窗口中键入以下内容：

~~~
cd /d %USERPROFILE%\Downloads
apply-bootmedia.cmd -destination {YourSDCardDrive} -image {.wimFile downloaded above} -hostname mygalileo -password admin
~~~


## Intel Galileo 第 1 代固件更新
Intel 已发布固件版本 1.0.3，该版本需要在运行 Microsoft Windows 之前应用到开发板。

请按照 [Intel 入门指南](https://communities.intel.com/docs/DOC-22796){:target="_blank"}进行操作。按照固件更新指示操作后，你无需继续按照入门指南操作，因为这些指示不适用于在 Intel Galileo 开发板上运行的 Microsoft Windows。

**注意：**
: 提取 Intel Galileo 程序包时，请提取到驱动器的根目录，并确保路径不包含空格。

## Intel Galileo 第 2 代固件更新
<p><span class="label label-default">更新： 2015/3/30</span></p>
Intel Galileo 第 2 代需要固件版本 1.0.4。

请按照 [Intel 入门指南](https://software.intel.com/zh-cn/articles/getting-started-with-the-intel-galileo-board-on-windows#terminal){:target="_blank"}进行操作。按照固件更新指示操作后，你无需继续按照入门指南操作，因为这些指示不适用于在 Intel Galileo 开发板上运行的 Microsoft Windows。

## 连接和启动 Windows
将 Galileo 直接连接到计算机可允许你仅与 Galileo 通信。你的计算机仍连接到 Internet，并且可以与 Galileo 通信。

**重要说明：**
: Intel Galileo Gen1 和 Gen2 使用不同的电源。请仅对 Gen2 使用 12 伏电源，仅对 Gen1 使用 5 伏电源。


1. 将网线的一段连接到 Galileo 上的以太网端口
1. 使用内置以太网端口或 USB 以太网适配将网线的另一端连接到计算机。
1. 插入电源线
1. 启动时，你应看到 microSD 光在闪烁。下图中的 LED 显示转圈的绿色。

<!--![](/Resources/images/SDLed.png)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/SDLed.png">

<!--![](/Resources/images/IntelGalileoGen2.jpg)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/IntelGalileoGen2.jpg">

注意:
: Windows 在 Galileo 上启动需要花费 2 分钟。在此期间，你将看到 microSD 活动 LED 快速闪烁。在它停止几秒闪烁后，Galileo 即已完全启动。

## 远程登录 Galileo
要远程登录 Galileo 的主要原因是可以与 Galileo 交互并将其正常关闭。

在桌面上，依次选择“开始”屏幕-\>“运行”，然后键入 ```telnet mygalileo```。当远程登录出现提示时，使用以下用户名和密码：

~~~
Username: Administrator
Password: admin
~~~

<!--![](/Resources/images/TelnetLogin.png)-->
<img class="device-images" src="{{site.baseurl}}/Resources/images/TelnetLogin.png">

## 关闭 Galileo
拔下 Galileo 的电源之前，最好将其正常关闭。具体步骤为：

1. 远程登录 Galileo，如上所述
1. 输入以下关闭命令： ```shutdown /s /t 0``` microSD 活动 LED 停止闪烁后，可以拔下 Galileo。

注意
: 如果你未关闭 Galileo，则下次启动耗时更长。在此期间，Windows 将在 SD 卡上检查磁盘，验证文件系统的完整性。请允许完成此操作。

{% include nextsteps.html device=page.deviceName %}
