---
layout: default
title: SpeechTranslator 示例
permalink: /zh-cn/win10/samples/speechtranslator.htm
lang: zh-cn
---

#生成 SpeechTranslator 项目

###组件列表：

- 两个 Raspberry Pi 2 板
- 两个 Raspberry Pi 2 电源 
- 两个 [Microsoft LifeChat-3000 耳机](https://www.microsoft.com/hardware/zh-cn/p/lifechat-lx-3000/JUG-00013) 
- 两个鼠标 
- 两条以太网电缆 
- 两块 micro-SD 卡 
- 两台 HDMI 监视器 
- 两条 HDMI 电缆 
- 一个路由器 
- 一个 micro-SD 读卡器


### 设置你的硬件
- 按照[说明](http://ms-iot.github.io/content/zh-cn/win10/SetupRPI.htm)刷入 micro-SD 卡
- 重复上述操作以设置其他设备
- 两台设备都启动后，应该可以在屏幕上看到设备名称和设备 IP；务必将两台设备都连接到路由器，然后将该路由器连接到 Internet。
- 通过 SSH/Telnet/powershell 复制到该设备，键入 `setcomputername speechtransrpi2` 以重命名其中一台设备，键入 `setcomputername speechtransrpi1` 以重命名另一台设备；

	注意：还可以选择其他设备名称，但在 constantParam.cs 文件（下载示例并打开解决方案后将看到此文件，如下面的步骤所示）中，需要对它们进行匹配。稍后即可查看详细信息。

- 重新启动设备：关机 /r /t 0

### 设置你的示例：


1. 从[此处](https://github.com/ms-iot/samples/archive/develop.zip)将示例下载到本地电脑
2. 在 Visual Studio 中打开解决方案文件
3. 需要指定你自己的 Azure clientid 和 clientsecret，才可以打开 constantParam.cs 文件

	注意： 需要帐户才可以访问 Azure 中的 MS 翻译服务；访问此[链接](http://www.microsoft.com/zh-cn/translator/getstarted.aspx)以获取一个帐户，获取帐户后，将 clientid 和 clientsecret 替换为你的帐户信息。

4. 生成解决方案
5. 部署到设备；

	如果要部署到设备 `speechtransrpi1`，在 ConstantParam.cs 的第 3 行中，确保它读取为 ````#define RPI1````，然后右键单击该项目并在“属性/调试”下填写 `speechtransrpi1` 的 IP 地址。
	
	如果要部署到设备 `speechtransrpi2`，在 ConstantParam.cs 的第 3 行中，确保它读取为 ````#define RPI2````，然后右键单击该项目并在“属性/调试”下填写 `speechtransrpi2` 的 IP 地址。
	
	基本上，该演示的工作方式类似电话线。需要指定 ServerHostName，它指示要发送数据的目标位置。这是 `Define` 在此处执行的内容。
	
6. 部署完成后，打开 [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm) RUL（它应该是类似于 http://yourdeivceipaddress:8080 的 URL），在“应用/已安装应用”下，选择 `speechtranslator` 应用，然后单击“开始”；对于其他设备同样执行此操作。
	
	现在你可以随时使用语音转换器！