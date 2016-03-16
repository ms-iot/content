---
layout: default
title: 设置 Raspberry Pi 2
permalink: /zh-CN/win10/KitSetupRPI.htm
step: win10/KitSetupRPI.htm
lang: zh-CN
deviceName: RPI2
kit: Adafruit Starter Pack for Windows 10 IoT Core on Raspberry Pi2
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">初学者包概述</a></li>
  <li class="active">设置 Raspberry Pi 2</li>
</ol>

<h1 class="thin-header">第 1 课： 简介和设置</h1>
{% include kit-steps.html device=page.deviceName %}

<hr/>

##连接开发板

1. 插入包含在工具包中的 MicroSD 卡（插槽位于开发板的对面，如下所示）。
2. 将包含在工具包中的 WLAN 硬件保护装置插入 Raspberry Pi 2 上的其中一个 USB 端口。
3. 插入以太网电缆并将其连接到本地网络。
4. 将电源连接到开发板上的微型 USB 端口。



    <img class="device-images" src="{{site.baseurl}}/Resources/images/rpi2Headless.png">


##下载并安装 IoT 仪表板工具

IoT 仪表板工具将显示网络上的所有 Windows 10 IoT 核心版设备。单击[此处](https://iottools.blob.core.windows.net/iotdashboard/setup.exe)下载它，然后按照说明进行安装。安装完成后，应启动一次。

下载和使用 Windows 10 IoT 核心版仪表板即表示你同意 Windows 10 IoT 核心版仪表板的[许可条款](http://go.microsoft.com/fwlink/?LinkID=703960&clcid=0x4809)和[隐私声明](http://go.microsoft.com/fwlink/?LinkId=521839)。

##启动 Windows 10 IoT 核心版
1. 连接电源后，Windows 10 IoT 核心版将自动启动。Pi 在首次启动时将需要约 5 分钟的时间。
2. 在 IoT 仪表板应用程序中找到你的设备。运行时，应用程序将自动查找本地网络上的所有 Windows IoT 核心版设备，并显示诸如名称、设备类型、IP 地址等设备信息。选择“我的设备”选项卡来查看网络上的当前设备。![Windows IoT 仪表板]({{site.baseurl}}/Resources/images/HeadlessMode/IoTDashboard.png)

##配置 Raspberry Pi 2

最后，你将需要使用基于 Web 的管理工具配置 Raspberry Pi 2 以进行 WLAN 连接。在 **Windows IoT Core Watcher** 中，*右键单击* Raspberry Pi，然后选择“此处的 Web 浏览器”。

<!-- This content is replicated at zh-cn/win10/SetupWiFi.md  -->

1. 请输入 **Administrator** 作为用户名，并提供密码（默认情况下为 p@ssw0rd）
2. 单击左侧窗格中的“网络”
3. 在“可用网络”下，选择要连接的网络，并提供连接凭据。单击“连接”以启动连接

![基于 Web 的 WLAN 配置]({{site.baseurl}}/Resources/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->

{% include kit-nextsteps.html device=page.deviceName %}
