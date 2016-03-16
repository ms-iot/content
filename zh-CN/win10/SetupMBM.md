---
layout: default
title: 设置 MinnowBoard Max
permalink: /zh-CN/win10/SetupMBM.htm
lang: zh-CN
---

#入门

了解如何设置 MinnowBoard Max 硬件并将其连接到计算机。

{% include steps.html device="MBM" %}

##需要具备的条件
1. **运行 Windows 10 的电脑**（在上一步中已准备就绪）
1. **MinnowBoard Max**
1. **电源供应**
1. <a name="MBM_SDcard"></a>\*\*8GB 微型 SD 卡\*\* - 类 10 或更高。（我们建议使用[这个](http://www.amazon.com/gp/product/B00IVPU786){:target="_blank"}或[这个](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445){:target="_blank"}）
1. **HDMI 电缆和监视器**
1. **以太网电缆**
1. **微型 SD 卡读卡器**（因为大多数内部 SD 卡读卡器均会出现问题，所以我们建议使用外部 USB 卡读卡器，例如[这个](http://www.amazon.com/dp/B009D79VH4){:target="_blank"}或[这个](http://www.amazon.com/dp/B0096FB5CW){:target="_blank"}）
1. **USB 键盘**

##连接电路板
1. **将 USB 键盘**连接到电路板上的 USB 端口之一。
2. **将 HDMI 监视器**连接到电路板上的 microHDMI 端口。
3. **将网络电缆**连接到电路板上的以太网端口。请确保开发电脑在同一网络上。

	**注意：** 如果没有本地有线网络，请参阅[此处]({{site.baseurl}}/{{page.lang}}/win10/ConnectToDevice.htm)获取其他连接选项。

![mbm]({{site.baseurl}}/Resources/images/mbm.bmp){:device-images}

##更新设备固件

* 当前版本仅支持 32 位 Windows 10 IoT 核心版。从 [firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"} 下载最新版的 32 位预生成的 BIOS 固件
* 解压缩已下载的文件并将以下文件复制到 FAT 格式化的 U 盘
	* \*.efi
        * \*.bin
* 关闭 MinnowBoard 电源
* 删除任何 SD 卡和外部硬盘驱动器
* 将 U 盘插入 MinnowBoard
* 连接 HDMI/DVI 监视器和 USB 键盘
* 打开 MinnowBoard 电源
* 应看到 UEFI 提示。在 UEFI 提示下运行以下命令：
	* 如果当前固件是 64 位（这是 MinnowBoard 的原始状态）

		<kbd>fs0:</kbd>

		<kbd>.\\MinnowBoard.MAX.FirmwareUpdateX64.efi _filename_.bin</kbd>

    * 如果你当前的固件是 32 位（你已将原始固件修改为 32 位）

		<kbd>fs0:</kbd>

		<kbd>.\\MinnowBoard.MAX.FirmwareUpdateIA32.efi _filename_.bin</kbd>

		例如

        <kbd>Shell\> fs0:</kbd>

        <kbd>fs0:\> .\\MinnowBoard.MAX.FirmwareUpdateIA32.efi MinnowBoard.MAX.I32.079.R01.bin</kbd>

* 系统应在固件更新完成后自动关闭。

		Note: If you are not able to go to the fs0: partition, try a different flash drive. Certain flash drives won't be bootable even after you copy efi/bin files.

你可能想知道为什么需要调用“MinnowBoard.MAX.FirmwareUpdateX64.efi”，即使我们仅支持 32 位版本的 Windows 10 IoT 核心版。该板通常随附已预安装在其上的 64 位固件。EFI 的位数必须与当前固件的位数匹配。另外，bin 文件的位数还必须与更新该固件所需的位数匹配。因此，首次更新时你可能会需要使用 64 位 EFI 和 32 位 BIN。第二次更新以及其他任意一次更新时你需要使用 32 位 EFI 和 32 位 BIN。固件的位数必须与操作系统的位数匹配的原因是，在启动操作系统时加载的操作系统映像中存在一个 EFI，该 EFI 的位数也必须与固件的位数相同。

## 安装 Windows 10 IoT 核心版工具

1. 可从 Microsoft 下载中心[下载](http://go.microsoft.com/fwlink/?LinkId=616848)用于 MinnowBoard MAX 的 ISO。

2. **将 ISO 保存**到本地文件夹

	<img class="image-border" src="{{site.baseurl}}/Resources/images/mbm_iso.png">

3. 双击 ISO \(IoT Core MBM.iso\) 会自动将其作为虚拟 CD 驱动器进行装载，以便你可以访问内容。

	<img class="image-border" src="{{site.baseurl}}/Resources/images/mbm_msi.PNG">

4. 安装 **Windows\_10\_IoT\_Core\_Mbm.msi**。安装完成后，flash.ffu 将位于 **C:\\Program Files \(x86\)\\Microsoft IoT\\FFU\\MinnowBoardMax**

	<img class="image-border" src="{{site.baseurl}}/Resources/images/mbmffu.PNG">

5. 完成后将弹出虚拟 CD

##将 Windows 10 IoT 核心版映像放置在 SD 卡上

1. **将微型 SD 卡插入** SD 卡读卡器。

2. **使用 IoTCoreImageHelper.exe** 切换 SD 卡。从“开始”菜单搜索“WindowsIoT”，并选择快捷方式“WindowsIoTImageHelper”

	<img src="{{site.baseurl}}/Resources/images/ImagerHelperSearch.PNG">。

3. 该工具将按照显示方式枚举设备。选择希望切换的 SD 卡，然后提供 FFU 的位置并切换映像。

	<img src="{{site.baseurl}}/Resources/images/mbm_imagehelper.PNG">

4. 单击任务栏中的“安全删除硬件”图标，然后选择你的 USB SD 读卡器以将其从系统中安全删除。如果未正确执行此操作，可能导致映像损坏。

**注意：** 如果希望在使用完 Windows 10 IoT 核心版后将其从 SD 卡中删除，请参阅标题为**如何从 SD 卡中删除 Windows 10 IoT 核心版？**的[常见问题]({{site.baseurl}}/{{page.lang}}/Faqs.htm)部分。

**注意：** IoTCoreImageHelper.exe 是推荐用来切换 SD 卡的工具。但是，说明可用于直接使用 [DISM 命令行工具]({{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm)

##设置所需的 BIOS 设置并启动 Windows 10 IoT 核心版

* 将微型 SD 卡插入 MBM 中。无论在何时打开 MBM，只要其中未插入 SD 卡，系统都将要求重新配置启动顺序。
* 启动后，按 F2 访问 BIOS 设置。
* 依次导航到“设备管理器”-\>“系统设置”-\>“南群集配置”-\>“LPSS 和 SCC 配置”
    * 将“LPSS PWM \#1 支持”设置为“禁用”
    * 将“LPSS PWM \#2 支持”设置为“禁用”
* 导航回顶层并依次选择“启动维护管理器”-\>“启动选项”\>“更改启动顺序”
* 突出显示启动顺序列表（突出显示时，将在屏幕右侧看到“更改顺序”），然后按 Enter 键
* 突出显示“EFI 杂项设备”并按“+”以将其移至列表顶部。如果它无法通过“+”移动，只需选择“EFI 杂项设备”，然后按 Enter 键启动到它即可。
* 提交这些更改并退出。
* MBM 应自动启动到卡（此初始启动可能需要 2 分钟，后续启动所需的时间应该会少于 30 秒）。不然的话，它会启动到 UEFI shell，此时你必须在 UEFI shell 中执行以下命令来启动 Windows：

	<kbd>fs1:</kbd><br/>

	<kbd>efi\\boot\\bootia32.efi</kbd>

* 启动设备后，DefaultApp 将启动并显示 MBM 的 IP 地址。![mbm]({{site.baseurl}}/Resources/images/DefaultAppMBM.png){:device-images}

* 如果已在 MBM 上加载以前版本的 IoT 核心版，将需要完成以下步骤才能完成首次启动（请确保已插入用于 IoT 核心版的 SD 卡）：
  1. 打开 MBM 设备并按 F2。
  2. 转到“启动管理器”，并选择“EFI Internal Shell”。
  3. 标识 EFIESP 分区（它可能是 FS1：因此假设 EFIESP 分区为 FS1：如下）
  4. 类型 FS1：
  5. Cd EFI
  6. 运行 DeleteSbcpVariableFW.efi（这将清除 UEFI 变量）
  7. 现在启动设备。

* 按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)的说明使用 PowerShell 连接到正在运行的设备。也可按照[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm)的说明使用 SSH 连接到设备。
* **强烈推荐**更新管理员帐户的默认密码。若要执行此操作，请在 PowerShell 连接中发出以下命令：

    使用强密码替换 `[new password]`：

        net user Administrator [new password]

    此操作完成后，将需要使用 psSession 和新凭据重新建立当前会话。

##其他资源
* [受支持的外围接口和设备]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}

