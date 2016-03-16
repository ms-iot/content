---
layout: default
title: 安装 Raspberry Pi 2
permalink: /zh-CN/win10/SetupRPI.htm
lang: zh-CN
---

#入门

了解如何设置 Raspberry Pi 2 并将其连接到计算机。

{% include steps.html device="RPI2" %}

##需要具备的条件

1. **运行 Windows 10 的电脑**（在上一步中已准备就绪）
1. **Raspberry Pi 2**
1. **5V 微型 USB 电源** - 使用至少 1.0A 电流。如果计划使用多个高耗电 USB 外围设备，请改用电流较高的电源 \(\>2.0A\)。
1. <a name="RPi2_SDcard"></a>\*\*8GB 微型 SD 卡\*\* - 类 10 或更高。（我们建议使用[这个](http://www.amazon.com/gp/product/B00IVPU786){:target="_blank"}或[这个](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445){:target="_blank"}）
1. **HDMI 电缆和监视器**
1. **以太网电缆**
1. **微型 SD 卡读卡器**（因为大多数内部 SD 卡读卡器均会出现问题，所以我们建议使用外部 USB 卡读卡器，例如[这个](http://www.amazon.com/dp/B009D79VH4){:target="_blank"}或[这个](http://www.amazon.com/dp/B0096FB5CW){:target="_blank"}）

## 安装 Windows 10 IoT 核心版工具

1. 从 Microsoft 下载中心[下载](http://go.microsoft.com/fwlink/?LinkId=616847)用于 Raspberry Pi 2 的 ISO。

2. **将 ISO 保存**到本地文件夹

	<img class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/Iso.PNG">

3. 双击 ISO（IoT 核心版 RPi.iso）。它将自动将其本身作为虚拟驱动器进行装载，以便你可以访问内容。

	<img class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/MSI.PNG">

4. 安装 **Windows\_10\_IoT\_Core\_RPi2.msi**。安装完成后，flash.ffu 将位于 **C:\\Program Files \(x86\)\\Microsoft IoT\\FFU\\RaspberryPi2**

	<img class="image-border" src="{{site.baseurl}}/Resources/images/SetupRPI/rpiffu.PNG">

5. 完成后将弹出虚拟 CD

##将 Windows 10 IoT Core Insider Preview 映像放置在 SD 卡上

1. **将微型 SD 卡插入** SD 卡读卡器。

2. **使用 IoTCoreImageHelper.exe** 切换 SD 卡。从“开始”菜单搜索“WindowsIoT”，并选择快捷方式“WindowsIoTImageHelper”

	<img src="{{site.baseurl}}/Resources/images/ImagerHelperSearch.PNG">

3. 该工具将按照显示方式枚举设备。选择希望切换的 SD 卡，然后提供 FFU 的位置并切换映像。

	<img src="{{site.baseurl}}/Resources/images/SetupRPI/ImageHelper.PNG">

4. 单击任务栏中的“安全删除硬件”图标，然后选择你的 USB SD 读卡器以将其从系统中安全删除。如果未正确执行此操作，可能导致映像损坏。

	**注意：** 如果希望在使用完 Windows 10 IoT 核心版后将其从 SD 卡中删除，请参阅标题为**如何从 SD 卡中删除 Windows 10 IoT 核心版？**的[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)部分。

	**注意：** IoTCoreImageHelper.exe 是推荐用来切换 SD 卡的工具。但是，说明可用于直接使用 [DISM 命令行工具]({{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm)

##连接电路板

1. 插入已准备的**微型 SD 卡**（插槽在如下所示的电路板的另一侧）。
2. **将网络电缆**从本地网络连接到电路板上的以太网端口。请确保开发电脑在同一网络上。

	**注意：** 如果没有本地有线网络，请参阅[此处]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm)获取其他连接选项。

3. **将 HDMI 监视器连接到**电路板上的 HDMI 端口。
4. **将电源连接到**开发板上的微型 USB 端口。

<img class="device-images" src="{{site.baseurl}}/Resources/images/rpi2.png">

##启动 Windows 10 IoT 核心版
1. 连接电源后，Windows 10 IoT 核心版将自动启动。这可能需要几分钟时间。
2. 启动设备后，DefaultApp 将启动并显示 RPi2 的 IP 地址。

	<img class="device-images" src="{{site.baseurl}}/Resources/images/DefaultAppRpi2.png">

3. 遵循[此处的 PowerShell 文档]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)，使用 PowerShell 连接到正在运行的设备。也可按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm)的说明使用 SSH 连接到设备。
4. **强烈推荐**更新管理员帐户的默认密码。若要执行此操作，请在 PowerShell 连接中发出以下命令：

    使用强密码替换 `[new password]`：

        net user Administrator [new password]

    此操作完成后，将需要使用 psSession 和新凭据重新建立当前会话。

##其他资源
* [受支持的外围接口和设备]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}

