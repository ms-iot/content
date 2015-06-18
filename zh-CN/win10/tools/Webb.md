---
layout: default
title: 基于 Web 的设备管理
permalink: /zh-CN/win10/tools/Webb.htm
lang: zh-CN
---

<div class="container" markdown="1">

##基于 Web 的设备管理

![Web 主页]({{site.baseurl}}/images/webb/webb.png)

###了解如何从 Web 获取有关你的计算机的高级诊断信息

除了高级诊断工具外，基于 Web 的设备管理还提供基本的配置和设备管理功能，从而帮助你排除 Windows IoT 设备的故障并查看其实时性能。连接到本地网络之后，每个 Windows 10 IoT 核心版设备都将允许你访问这些工具。

###将你的开发板连接到 Internet

若要使基于 Web 的设备管理正常工作，首先需要将设备连接到网络。为此，请将以太网电缆从你的开发板连接到本地网络中。


### 查找你的设备 IP 地址

你可以使用以下两种方法查找 IP 地址：

1.	如果你的设备已连接到监视器，IP 地址将在首页上列出。如果未看到 IP 地址，则开发板未正确连接到网络。  

    ![DefaultApp IP]({{site.baseurl}}/images/webb/defaultapp_ip.png)

2.	如果你已[设置电脑]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm)，应当已在电脑上安装了 **Windows IoT 核心版观察程序**。启动 Windows IoT 核心版观察程序，并找到你的计算机名。计算机名旁边列出的是开发板的 IP 地址。如果找不到你的计算机，则表明你的电脑或开发板未正确连接到网络。

    ![IotWatcher IP]({{site.baseurl}}/images/IoTCoreWatcher.PNG)

###通过浏览器连接到基于 Web 的设备管理

1.	使用你最喜欢的浏览器，在地址栏中输入 IP 地址

	![浏览器 IP]({{site.baseurl}}/images/webb/browser_ip.png)

2.	基于 Web 的设备管理应启动并显示 Web 管理主屏幕：

	![Web 主页]({{site.baseurl}}/images/webb/webb.png)

    还可以通过右键单击设备，然后单击“在浏览器中启动”，从 Windows IoT 核心版观察程序启动基于 Web 的设备管理工具

###顶部工具栏
顶部工具栏使你能够关机、重新启动并提供反馈。

![Web 工具栏]({{site.baseurl}}/images/webb/toolbar.png)

* 关机 - 关闭设备
* 重新启动 - 重新启动设备
* 反馈 - 打开 Windows 10 反馈工具，你可以在其中输入任何有价值的反馈
* 帮助 -“帮助”按钮当前正在开发，将很快更新

    注意： 对于 Rpi2 用户，“关机”按钮无法正常工作，将会重新启动设备。修补程序即将推出


###基于 Web 的设备管理功能的说明

    This tool is still in beta. Some of the features are untested or still being worked on.

* ####**主页**

	本部分即将推出！ 敬请关注

* ####**应用**

	为设备上的 AppX 程序包和捆绑包提供安装/卸载功能。

	    Windows 10 IoT Core only allows you to have one app running in the foreground at a time.

* ####**进程**

	与电脑上的任务管理器非常相似，进程允许你查看当前正在运行的进程以及每个进程占用的内存使用情况。单击进程旁的 X 可将其终止。

* ####**性能**

	显示 CPU 和 I/O 使用率以及内存统计数据的实时诊断。

* ####**调试、ETW 实时、性能跟踪**

	这些部分当前正在进行开发。更多详细信息即将发布。

* ####**设备管理器**

	枚举连接到你的设备的所有外围设备。

* ####**网络**

	将开发板连接到 Internet 后，你可以通过 IP 配置部分查看高级网络诊断信息（例如 IP 地址）以及连接的说明。

	    Wi-Fi adapters are not currently supported.  This will be coming soon.



</div>
