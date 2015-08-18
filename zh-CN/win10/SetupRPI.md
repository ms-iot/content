---
layout: default
title: SetupBoard
permalink: /zh-CN/win10/SetupRPI.htm
lang: zh-CN
---

#入门

了解如何设置 Raspberry Pi 2 并将其连接到你的计算机。请注意，这要求你拥有运行 Windows 10 Technical Preview 的电脑。

{% include steps.html device="RPI2" %}

##需要具备的条件
1. **Windows 10** - 必须是 Windows 计算机（不是虚拟机）。
2. **Raspberry Pi 2**。
3. **5V 微型 USB 电源** - 使用至少 1.0A 电流。
4. **8GB 微型 SD 卡** - 类 10 或更高。（我们建议使用[这个](http://www.amazon.cn/%E4%B8%89%E6%98%9F-32G-Class10-48MB-S-TF-%E5%AD%98%E5%82%A8%E5%8D%A1-%E5%8D%87%E7%BA%A7%E7%89%88-%E6%96%B0%E8%80%81%E5%8C%85%E8%A3%85%E9%9A%8F%E6%9C%BA%E5%8F%91%E8%B4%A7/dp/B00A6MCGU4/ref=sr_1_fkmr0_1?ie=UTF8&qid=1439922632&sr=8-1-fkmr0&keywords=Samsung+32GB+EVO+Class+10+Micro+SDHC+up+to+48MB%2Fs+with+Adapter+%28MB-MP32DA%2FAM%29)或[这个](http://www.amazon.cn/SanDisk-%E9%97%AA%E8%BF%AA%E8%87%B3%E5%B0%8A%E9%AB%98%E9%80%9F%E7%A7%BB%E5%8A%A8-microSDHC%E5%AD%98%E5%82%A8%E5%8D%A1-SDSDQUAN-016G-Z4A-Class10-16G/dp/B007XZL7PC/ref=sr_1_1?ie=UTF8&qid=1439922522&sr=8-1&keywords=SanDisk+Ultra+Micro+SDHC%2C+16GB+Card)）
5. **HDMI 电缆**（如果需要显示）。
6. **以太网电缆**。

如果要使用多个 USB 外设或高电流设备，请使用电流较高的电源 \(\>2.0A\)。


##将 Windows 10 IoT Core 映像放在 SD 卡上
我们提供了一个实用工具，用于使用 Windows 10 IoT Core 设置你的 SD 卡。以下步骤只能在运行 [Windows 10](https://insider.windows.com)（版本 10069 或更高版本）的系统上执行。

注意：你将需要在**物理 Windows 计算机**（而不是 VM）上遵循这些说明操作，因为你需要对 SD 卡读卡器的访问权限。

遵循以下说明配置 SD 卡：

1. 请在 **[Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558) 上注册**，它是我们的软件发布管理平台。
	* 你将需要拥有 [Microsoft 帐户](http://www.microsoft.com/zh-CN/account/default.aspx)
	* 如果已在 [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558) 上注册加入了我们的计划（或不确定之前是否注册过），你将只会看到一个空白页面。
	* 如果你之前尚未在 Connect 上注册加入我们的计划，它将提示你创建社交资料并接受许可协议。按照[注册 Microsoft Connect](http://ms-iot.github.io/content/SigninMSConnect.htm) 的分步说明进行操作。

2. 登录后，请导航到“调查”，并完成所有调查。

	<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/connect1.PNG">

3. 从 Microsoft Connect [下载](http://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782)**程序包**“适用于 Raspberry Pi 2 的 Windows 10 IoT Core 映像”。
	* 如果你看到空白页面或未列出下载，请通过查看屏幕右上方的登录信息，确保你已登录到 Microsoft Connect。如果你未登录，请通过单击登录。
4. 从下载选择**板类型**，然后继续下载这些文件

	<img src="{{site.baseurl}}/images/SetupRPI/connect3.PNG">

	<img src="{{site.baseurl}}/images/SetupRPI/connect4.PNG">

5. 一个窗口将在桌面上弹出。单击“浏览”，选择你希望放置文件夹的位置，然后单击“传输”

	<img src="{{site.baseurl}}/images/SetupRPI/download1.PNG">

	当完成传输时，请关闭窗口。

	<img src="{{site.baseurl}}/images/SetupRPI/download2.PNG">
6. 创建包含在 <a href="{{site.downloadurl}}" target="_blank">Windows\_IoT\_Core\_RPI2\_BUILD.zip</a> 中的 flash.ffu 的**本地副本**

	<img src="{{site.baseurl}}/images/SetupRPI/flash2.PNG">

7. **将 SD 卡插入**你的 SD 读卡器。
8. 打开“管理员命令提示符”，并导航到包含本地 flash.ffu 的文件夹。

	<img class="device-images" src="{{site.baseurl}}/images/SetupRPI/cmd.jpg">

9. **找到 SD 卡**在你的计算机上所显示的磁盘编号。在下一步中应用映像时，将会用到此磁盘编号。为此，你可以使用 **diskpart** 实用工具。运行以下命令：

	<kbd>diskpart</kbd>

	<kbd>list disk</kbd>

	<kbd>exit</kbd>

	<img  src="{{site.baseurl}}/images/SetupRPI/diskpart.PNG">

10. 使用管理员命令提示符，将映像应用到 SD 卡。运行以下命令：

	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

	* 请务必将 PhysicalDriveN 替换为你在上一步骤中找到的值；例如，如果你的 SD 卡磁盘号为 3，请使用

	<kbd>/ApplyDrive:\\.\\PhysicalDrive3</kbd>

	<img  src="{{site.baseurl}}/images/SetupRPI/applyDrive.PNG">

11. 单击任务栏中的“安全删除硬件”图标，然后选择你的 USB SD 读卡器以将其从系统中安全删除。如果未正确执行此操作，可能导致映像损坏。


##连接开发板

1. 插入你在上述部分中准备的**微型 SD 卡**（插槽在如下所示的开发板的另一侧）。
2. **将网络电缆连接到**开发板上的以太网端口。
3. **将 HDMI 监视器连接到**开发板上的 HDMI 端口。
4. **将电源连接到**开发板上的微型 USB 端口。

	<img class="device-images" src="{{site.baseurl}}/images/rpi2.png">


##启动 Windows 10 IoT Core
1. 连接电源后，Windows 10 IoT Core 将自动启动。
2. 首次启动时，Windows IoT Core 将进行一些首次启动配置，并且同时将显示一个默认的蓝色应用程序。**等待几分钟**，开发板将自动重新启动。这只会发生一次，然后 DefaultApp 将出现，显示 Raspberry Pi 2 的 IP 地址。<img class="device-images" src="{{site.baseurl}}/images/DefaultAppRpi2.png">
3. 遵循<a href="{{site.baseurl}}/win10/samples/PowerShell.htm">此处</a> [Powershell 文档]({{site.baseurl}}/win10/samples/PowerShell.htm)，使用 PowerShell 连接到正在运行的设备。
4. **强烈建议**你更新管理员帐户的默认密码(默认用户名:``Administrtor``，默认密码: ``p@ssw0rd``)
5. 当 Raspberry Pi 2 启动时，远程调试程序将自动启动。
