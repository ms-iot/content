---
layout: default
title: Windows Device Portal
permalink: /zh-cn/win10/tools/DevicePortal.htm
lang: zh-cn
---

<div class="container" markdown="1">

##Windows Device Portal
   除了高级诊断工具外，Windows Device Portal 还提供基本的配置和设备管理功能，从而帮助你排除 Windows IoT 设备的故障并查看其实时性能。
   
   连接到本地网络之后，每台 Windows 10 IoT 核心版设备都将允许你访问这些工具。![Device Portal 主页]({{site.baseurl}}/Resources/images/deviceportal/deviceportal.png)

<hr>


##设置
1. **将开发板连接到 Internet**

   若要使 Windows Device Portal 正常工作，首先需要将设备连接到网络。为此，请将开发板的以太网电缆连接到本地网络。

2. **查找你的设备 IP 地址**
    * 如果你的设备已连接到监视器，IP 地址将在首页上列出。如果未看到 IP 地址，则开发板未正确连接到网络。![DefaultApp IP]({{site.baseurl}}/Resources/images/deviceportal/defaultapp_ip.png)
	* 如果你已[设置电脑]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm)，应当已在电脑上安装了 **Windows IoT Core Watcher**。启动 Windows IoT 核心版观察程序，并找到你的计算机名。计算机名旁边列出的是开发板的 IP 地址。如果找不到计算机，则表明你的电脑或开发板未正确连接到网络。![IotWatcher IP]({{site.baseurl}}/Resources/images/IoTCoreWatcher.PNG)

3. **通过浏览器连接到 Windows Device Portal**
    * 将 IP 地址输入到地址栏中。将 :8080 添加到末尾。![浏览器 IP]({{site.baseurl}}/Resources/images/deviceportal/browser_ip.png)
    * 在凭据对话框中，使用默认的用户名和密码。用户名： `Administrator` 密码：`p@ssw0rd`
    * Windows Device Portal 应启动并显示 Web 管理主屏幕！

 还可以通过右键单击设备并单击浏览器中的“启动”，从 Windows IoT Core Watcher 启动 Windows Device Portal 工具

<hr>






##功能

此工具仍然处于测试阶段。一些功能未经测试或仍然处于开发阶段。

###**顶部工具栏**
    
可通过顶部工具栏关机、重新启动和提供反馈。![Windows Device Portal 工具栏]({{site.baseurl}}/Resources/images/deviceportal/toolbar.png)

* 关机 - 关闭设备。
* 重新启动 - 重新启动设备。
* 反馈 - 打开 Windows 10 反馈工具，你可以在其中输入任何有价值的反馈。
* 帮助 - 将你带到此文档页。

###**主页**

本部分即将推出！ 敬请关注

###**应用**

为设备上的 AppX 程序包和捆绑包提供安装/卸载功能。

``` Note that Windows 10 IoT Core only allows you to have one app running in the foreground at a time.```

**安装应用**

1.	创建你的第一个应用后，可以远程将其安装到设备上。在从 Visual Studio 进行生成后，将生成一个输出文件夹。<img class = "screen-snippet" src="{{site.baseurl}}/Resources/images/deviceportal/installapp0.png">	
2.	在 Windows Device Portal 中，单击“浏览”并查找 .appx。
3.	单击“证书浏览”，查找 .cer 文件。 
4.	添加依赖项。如果你有多个项，你将必须逐个添加。 	
5.	点击“安装”。 
6.	若要安装另一个应用，请点击“重置”按钮以清除字段。


**卸载应用**

1.	确保应用未在运行。 
2.	如果正在运行，请转到“正在运行的应用”并关闭它。如果你尝试在应用正在运行时卸载，它将在尝试重新安装应用时导致问题。 
3.	准备就绪后，请点击“卸载”。
    

**部署日志** <img class="screen-snippet" src="{{site.baseurl}}/Resources/images/deviceportal/deploymentlog.png"> 部署日志是进度清单，用于指示你部署应用的进度。

###**进程**
与电脑上的任务管理器非常相似，此部分允许你查看当前正在运行的进程以及每个进程占用的内存使用情况。单击进程旁的 X 可将其终止。

###**性能**
显示 CPU 和 I/O 使用情况以及内存统计数据的实时诊断。<img src="{{site.baseurl}}/Resources/images/deviceportal/iograph.png">

* CPU 使用情况映射中央处理单元的使用情况。

<img src="{{site.baseurl}}/Resources/images/deviceportal/cpugraph.png">

* I/O 显示磁盘利用率（即读取和写入存储）

###**调试**
调试部分适用于标识应用程序内的问题。

<img src="{{site.baseurl}}/Resources/images/deviceportal/debug1.png">

* 将自动记录任何系统崩溃，并且可通过 Web 管理工具查看这些崩溃。然后你可以下载内核转储，并尝试查明发生了什么情况。

<img src="{{site.baseurl}}/Resources/images/deviceportal/debug2.png">

* 这类似于动态内核转储，但适用于用户模式处理。 
* 单击“下载”按钮将导致“小型转储”，并将下载该进程的整个状态。这非常适用于调试悬挂进程。

<img src="{{site.baseurl}}/Resources/images/deviceportal/debug3.png">

* 当 IoT 核心版设备崩溃时，你的计算机将尝试向 Windows 错误报告服务发送报告。当发生这种情况时，将存储报告的日志，并且该日志可供查看。
* 错误报告不包含转储信息，并且更面向应用和进程。 
* 它还提供设备上发生的一切情况的良好历史记录。 

类型： 报告上载到 Windows 错误报告服务的状态。

###**ETW**
Windows 事件跟踪

更多内容即将推出。

###**性能跟踪**

本部分允许你为 CPU、磁盘使用情况和内存记录一个跟踪日志。

详细信息即将推出。

###**设备管理器**

枚举连接到你的设备的所有外围设备。

###**网络**

将开发板连接到 Internet 后，你可以通过 IP 配置部分查看高级网络诊断信息（例如 IP 地址）以及连接的说明。

当前不支持 Wi-Fi 适配器。此功能即将推出。<hr>


##其他信息

###更改默认端口
1. 启动 PowerShell 并[连接到设备。]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)
2. 设置端口：

    `Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v HttpPort /t REG_DWORD /d <your port number>`
	
3. 如果要设置 https 端口

	`Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v UseHttps /t REG_DWORD /d 1 /f`
	
	`Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\webmanagement /v HttpsPort /t REG_DWORD /d <your port number> /f`
	
3. 通过重新启动服务 \(```net stop webmanagement & net start webmanagement```\) 或重新启动设备来重新启动该进程。




</div>
