---
layout: default
title: SetupBoard
permalink: /zh-CN/win10/SetupMBM.htm
lang: zh-CN
---

#入门

了解如何设置 MinnowBoard Max 硬件并将其连接到计算机。

{% include steps.html device="MBM" %}

##需要具备的条件
* 一台运行 Windows 10 的电脑。
* MinnowBoard Max。
* 电源供应。
* 一个 8GB 的 Class 10（或更好）Micro SD 卡。如果你没有 SD 卡，建议使用此 [SD 卡](http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189)或此 [SD 卡](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd)。
* HDMI 线缆（如果显示器需要使用）。
* 以太网线缆。

##连接电路板
* 将 USB 键盘连接到电路板上的 USB 端口之一。
* 将 HDMI 显示器连接到电路板上的 Micro HDMI 端口。
* 将网络线缆连接到电路板上的以太网端口。

![mbm]({{site.baseurl}}/images/mbm.bmp){:device-images}

##更新固件

* 对于当前版本，仅支持 32 位 Windows 10 IoT Core。从 [firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"} 下载最新版的 32 位预生成的 BIOS 固件
* 解压缩已下载的文件并将以下文件复制到 FAT 格式化的 U 盘
	* \*.efi
	* \*.bin
* 关闭 Minnowboard Max 电源
* 删除任何 SD 卡和外部硬盘
* 将 U 盘插入 Minnowboard Max
* 连接 HDMI/DVI 显示器和 USB 键盘。\* 还可通过串行连接与 UEFI和 BIOS 交互。
* 打开 Minnowboard Max 电源
* 你应该看到 UEFI 提示。在 UEFI 提示下运行以下命令：
	* 如果你当前的固件是 64 位（这是 Minnowboard Max 的原始状态）

		<kbd>fs0:</kbd>

		<kbd>.\\MinnowBoard.MAX.FirmwareUpdateX64.efi _filename_.bin</kbd>

    * 如果你当前的固件是 32 位（你已将原始固件修改为 32 位）

		<kbd>fs0:</kbd>

		<kbd>.\\MinnowBoard.MAX.FirmwareUpdateIA32.efi _filename_.bin</kbd>

		例如

        Shell\> fs0：

        fs0:\> .\\MinnowBoard.MAX.FirmwareUpdateIA32.efi MinnowBoard.MAX.I32.079.R01.bin

* 系统应在固件更新完成后自动关机。

注意： 你可能想知道为什么你需要调用“MinnowBoard.MAX.FirmwareUpdateX64.efi”，即便是我们仅支持 32 位版本的 Windows 10 IoT 核心板也是如此。该板通常已预装 64 位固件。EFI 的位数必须与当前固件的位数匹配。另外，bin 文件的位数还必须与更新该固件所需的位数匹配。因此，首次更新时你可能会需要使用 64 位 EFI 和 32 位 BIN。第二次更新以及其他任意一次更新时你需要使用 32 位 EFI 和 32 位 BIN。固件的位数必须与操作系统的位数匹配的原因是，在启动操作系统时加载的操作系统映像中存在一个 EFI，该 EFI 的位数也必须与固件的位数相同。

注意 2： 如果你无法转到 fs0 分区，请尝试使用不同的闪存驱动器。即使在你复制 efi/bin 文件后，某些闪存驱动器仍无法启动。



##将 Windows 10 IoT Core 映像放在 SD 卡上
我们提供了一个实用工具，可让你在SD 卡上部署 Windows 10 IoT Core 设置 。如果你没有 SD 卡，建议使用此 [SD 卡](http://www.amazon.com/gp/product/B00IVPU786?tag=thewire06-20&linkCode=as2&creative=374929&camp=211189)或此 [SD 卡](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445/ref=sr_1_15?ie=UTF8&qid=1415926730&sr=8-15&keywords=micro+sd+xd)。以下步骤只能在运行 [Windows 10](https://insider.windows.com)（版本 10069 或更高版本）的系统上执行。遵循以下说明来配置 SD 卡：

* 注意：你将需要在物理 Windows 计算机（而不是 VM）上遵循这些说明操作，因为你需要对 SD 卡读卡器的访问权限。
* 请在 [Microsoft Connect](https://connect.microsoft.com/windowsembeddediot/SelfNomination.aspx?ProgramID=8558) 上注册我们的计划，它是我们的软件发布管理平台。你将需要拥有 [Microsoft 帐户](http://www.microsoft.com/zh-CN/account/default.aspx)。如果已在 Microsoft Connect 上注册我们的计划（或不确定之前是否注册过）并尝试重新注册，请不必担心，你将只会看到一个空白页面。如果你之前尚未在 Connect 上注册我们的计划，它将提示你创建社交资料并接受许可协议。你可以在[此处](https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783)找到注册 Microsoft Connect 的分步说明。
* 从 Microsoft Connect [下载](https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57783)包“适用于 MinnowBoard MAX 的Windows 10 IoT Core 映像”。如果你看到一个空白页面或页面上未列出任何下载内容，请通过查看屏幕右上方的登录信息确认已登录到 Microsoft Connect。如果你未登录，请通过单击登录。
* 将 SD 卡插入 SD 读卡器。
* 打开管理员命令提示符，并导航到包含本地 flash.ffu 的文件夹。
* 找到 SD 卡在你计算机上的磁盘号。在下一步中应用映像时，将会用到此磁盘编号。为此，你可以使用 diskpart 实用工具。运行以下命令：<br />

	<kbd>diskpart</kbd>

    <kbd>list disk</kbd>

    <kbd>exit</kbd>

* 使用管理员命令提示符，通过运行以下命令将映像应用到 SD 卡（请务必将 PhysicalDriveN 替换为你在上一步找到的值，例如，如果 SD 卡的磁盘号是 3，则在以下命令中使用 <kbd>/ApplyDrive:\\.\\PhysicalDrive3</kbd>）：

	<kbd>dism.exe /Apply-Image /ImageFile:<fullpath>flash.ffu /ApplyDrive:\\.\\PhysicalDriveN /SkipPlatformCheck</fullpath></kbd>

* 单击任务栏中的“安全删除硬件”图标，然后选择你的 USB SD 读卡器以将其从系统中安全删除。如果未正确执行此操作，可能导致映像损坏。**注意：** 如果你希望在使用完 Windows 10 IoT Core后将其从 SD 卡中删除，请参阅**如何从我的 SD 卡中删除 Windows 10 IoT Core？**标题的[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)部分。


##设置所需的 BIOS 设置并启动 Windows 10 IoT Core

* 将新刷入的 SD 卡插入 MBM。无论你在何时打开 MBM，只要其中未插入 SD 卡，系统都会要求你重新配置启动顺序。
* 将物理键盘连接到 MBM 上的 USB 端口。对于显示器，你可以连接 HDMI 显示器或使用串行端口。
* 启动后，按 F2 以访问 BIOS 设置。
* 导航到“Device Manager”-\>“System Setup”-\>“South Cluster Configuration”-\>“LPSS & SCC Configuration”
    * 将“LPSS & SCC Device Mode”设置为“ACPI Mode”
    * 将“DDR50 Capability Support for SDCard”设置为“Disable”
    * 将“ACPI Reporting MMC/SD As”设置为“Non-Removable”
* 导航回顶层并选择“Boot Mainenance Manager”-\>“Boot Options”\>“Change Boot Order”
* 突出显示启动顺序列表（当其突出显示时，你将在屏幕右侧看到“Change the order”），然后按 Enter 键
* 突出显示“EFI Misc Device”并按“+”以将其移至列表顶部。如果它无法通过“+”移动，只需选择“EFI Misc Device”，然后按 Enter 键启动到它即可。
* 提交这些更改并退出。
* MBM 应自动启动到卡（此初始启动可能需要 2 分钟，后续启动所需的时间应该会少于 30 秒）。不然的话，它会启动到 UEFI shell，此时你必须在 UEFI shell 中执行以下命令来启动 Windows：

	<kbd>fs1:</kbd><br/>

	<kbd>efi\\boot\\bootia32.efi</kbd>

* 首次启动 Windows 10 IoT Core时将先进行一些启动配置，此时将显示一个默认颜色为蓝色的应用程序。等待几分钟，板将自动重新启动。这只会发生一次，然后 DefaultApp 将出现，显示 MBM 的 IP 地址。![mbm]({{site.baseurl}}/images/DefaultAppMBM.png){:device-images}


* 按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)的说明使用 PowerShell 连接到你的正在运行的设备。
* **强烈建议**你更新管理员帐户的默认密码。请按照 [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) 文档中提供的说明操作。
* 当你的设备启动时，远程调试程序将自动启动。
