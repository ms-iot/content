---
layout: default
title: 使用 DISM 将映像应用到 Windows IoT 核心版设备的 SD 卡
permalink: /zh-cn/win10/samples/DISM.htm
lang: zh-cn
---

##使用 DISM 可将微型 SD 卡刷入 Windows IoT 核心版设备

###WindowsIoTImageHelper 的替代方法

如果你已按照说明来设置 [Raspberry PI]({{site.baseurl}}/{{page.lang}}/win10/SetupRPI.htm) 或 [Minnowboard Max]({{site.baseurl}}/{{page.lang}}/win10/SetupMBM.htm)，则 **Dism.exe** 将安装在“C:\\Program Files \(x86\)\\Microsoft IoT\\Dism”下。

* 打开管理员命令提示符，并导航到包含本地 flash.ffu 的文件夹。

* 找到 SD 卡在你的计算机上所显示的磁盘编号。在下一步中应用映像时，将会用到此磁盘编号。为此，你可以使用 diskpart 实用工具。运行以下命令：<br />

	<kbd>diskpart</kbd>

    <kbd>list disk</kbd>

    <kbd>exit</kbd>

* 使用管理员命令提示符，通过运行以下命令将映像应用到 SD 卡（请务必将 PhysicalDriveN 替换为你在上一步找到的值；例如，如果 SD 卡的磁盘号是 3，则在下面使用 <kbd>/ApplyDrive:\\.\\PhysicalDrive3</kbd>）：
	
	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

* 单击任务栏中的“安全删除硬件”图标，然后选择你的 USB SD 读卡器以将其从系统中安全删除。如果未正确执行此操作，可能导致映像损坏。

**注意：** 如果你希望在使用完 Windows 10 IoT 核心版后将其从 SD 卡中删除，请参阅标题为**如何从我的 SD 卡中删除 Windows 10 IoT 核心版？**的[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)部分。
