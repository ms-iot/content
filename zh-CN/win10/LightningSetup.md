---
layout: default
title: 项目设置
permalink: /zh-cn/win10/LightningSetup.htm
lang: zh-cn
---

##Lightning 设置指南

本指南将为你演练将默认控制器驱动程序更改为 Windows IoT 核心版设备上的 Lightning 驱动程序的步骤。此操作将允许在该设备上使用支持 Lightning 的应用程序。

###更改默认控制器驱动程序

我们将需要打开 Windows Device Portal

1. 通过使用 Windows IoT Core Watcher 应用程序或将开发板连接到监视器来找到设备的 IP 地址。

1. 在本地计算机中，可通过在 Web 浏览器中输入地址 http://{BoardIPAddress}:8080/ 来打开 Windows Devices Portal 网页。![Windows Devices Portal]({{site.baseurl}}/Resources/images/Lightning/dmap1.png)

1. Windows Devices Portal 页面应该会要求你提供凭据。默认的用户名是 `Administrator`，密码是 `p@ssw0rd`。请注意，输入用户名和密码后，该门户将询问你是否需要更改密码。最好更改密码。![Windows Devices Portal 凭据]({{site.baseurl}}/Resources/images/Lightning/dmap2.png)

1. 单击导航菜单中的“设备”以打开“设备”页面 ![设备页面]({{site.baseurl}}/Resources/images/Lightning/dmap3.png)

1. “设备”页面列出了可用的控制器驱动程序。默认情况下，收件箱驱动程序会设置为当前驱动程序。

1. 通过从下拉菜单中选择“直接内存映射驱动程序”切换到 Lightning 驱动程序，然后单击“更新驱动程序”按钮<br/> ![选择直接内存映射的驱动程序]({{site.baseurl}}/Resources/images/Lightning/dmap4.png)

1. 在页面通知你驱动程序安装完成之前，请稍作等待。![驱动程序安装完成]({{site.baseurl}}/Resources/images/Lightning/dmap5.png)

1. 如果需要重新启动，该页面也将通知你。你可以通过使用页面顶部的“重新启动”按钮来重新启动。

1. 现在你可以随时创建和使用可利用 Lightning 直接内存映射的驱动程序的应用程序。
