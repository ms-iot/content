---
layout: default
title: 发行说明
permalink: /zh-cn/win10/ReleaseNotesInsiderPreview.htm
lang: zh-cn
---

#Windows 10 IoT 核心版的发行说明
内部版本号 11099。2016 年 1 月

&copy; 2016 Microsoft Corporation.保留所有权利

本文档提供最新进展或其他信息，用于补充 Windows 10 IoT 核心版随附的文档。

感谢下载 Windows 10 IoT 核心版。Windows 10 IoT 核心版是用于开发嵌入式或专用设备的 Windows 10 版本，可供制造商社区选择使用。此程序包包含在基于 Intel&reg; Atom E38xx 系列 SoC 的 MinnowBoard Max（也称为 MBM 板）、基于 ARM Cortex-A7 SoC 的 Raspberry PI2（也称为 RPI）和基于 QualComm Snapdragon™ 400 系列处理器上的 DragonBoard 410c（也称为 Dragon）上安装 Windows 10 IoT 核心版所需的位和工具。

##隐私声明

在此处查看此 Windows 操作系统版本的隐私声明：[http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

可通过将正向链接粘贴到浏览器窗口中，查看链接的条款。

##新增功能
* Windows 10 IoT 核心版公共版本
   * 支持服务更新
   * 已更新基础操作系统版本
   * Windows IoT 核心版安全 Shell 稳定性改进
   * Windows Device Portal 的增强功能
   * Bug 修复

##发行说明

默认的管理员用户名和密码已硬编码在 Windows 10 IoT 核心版映像中。这使设备具有安全风险，因此在更改密码之前，请不要向开放的 Internet 连接公开此信息。

除非固件版本是 .082 或更高版本，否则 MinnowBoard Max 将不会启动。推荐的最低固件版本是“MinnowBoard MAX 0.83 32 位”。固件更新可从 [http://go.microsoft.com/fwlink/?LinkId=708613](http://go.microsoft.com/fwlink/?LinkId=708613){:target="_blank"} 下载。

此发布中包含的 Windows 10 IoT 核心版映像支持在 MinnowBoard MAX 板上公开的外设。随后，Intel&reg; 将提供对 Baytrail 处理器的完整功能集（包括 Intel Celeron&trade; 处理器 J1900/N2930/N2807 和 Intel Atom&trade; 处理器 E38XX）的支持。

在 DragonBoard 上，关机命令不会关闭开发板电源。系统将会重新启动。请通过断开电源连接来关闭开发板电源。

使用 Visual Studio RC 创建的 Windows 10 UWP 项目不与当前的 Visual Studio 版本兼容。用户应创建新的空白 UWP 项目或后台应用程序 \(IoT\) 项目，并将其源代码复制到新项目中。

Windows 10 IoT 核心版仍处于移植到 Raspberry PI 的过程中。Raspberry PI 的视频驱动程序仍处于开发阶段，其性能尚待优化。动画式用户元素（尤其是基于 XAML 的下拉菜单）的显示效果可能很差。

适用于 Raspberry Pi 2 的此版本的 Windows 10 IoT 核心版限制了对相机外围设备的支持。直接连接到板载相机总线的 PiCam 设备当前不受支持，因为它要求 GPU 服务，但由于 DirectX 驱动程序尚未实现，因此该服务当前在 Raspberry Pi 上不可用。现代 USB 摄像头可在 USB 主控制器上生成要求极度严苛的数据流。即使摄像头结合使用低分辨率设置，还将需要其他 USB 微调和专用控件逻辑。我们计划在不久的将来支持多种 USB 相机，并将尽快发布有关受支持设备的特定信息。

依赖于 Windows 系统更改系统音量的 USB 麦克风和扬声器的硬件音量控件当前在 Windows 10 IoT 核心版上不受支持。

某些 USB 键盘和鼠标可能在 Raspberry PI2 上不起作用。使用其他键盘或鼠标。有关已验证的外围设备的列表，请参阅 [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"} 上的文档。

在 Raspberry Pi2 上，GPIO 引脚 0 和 GPIO 引脚 1 可用于 Windows 10 IoT 核心版的 4 月 Insider Preview 版中的用户模式应用程序，但现已不再可用。尝试使用 Windows::Devices::Gpio::GpioController::OpenPin\(\) 打开这些引脚将返回 HRESULT\_FROM\_WIN32\(ERROR\_NOT\_FOUND\)。GPIO 引脚 0 和 1 将由 HAT 规范 \(https://github.com/raspberrypi/hats\) 保留在 Raspberry Pi 上，并受 VC 固件的控制。根据此规范，这些 PIN 应保留为未连接状态。


##已知问题

*	Windows Device Portal 在一天连续正常运行后可能会停止工作。\(5458435\) 解决方法： 重新启动设备。
*	将方向设置为“纵向”在通用应用 \(3039042\) 中可能不受支持。解决方法： 无
*	在 Raspberry Pi 和 Dragonboard 上，从非默认驱动器模式切换到其他非默认驱动器模式可能会在 GPIO 引脚上产生故障。\(3890679\) 解决方法： 在应用程序开端处设置一次驱动器模式。
*	如果默认启动应用也是在 Visual Studio \(4266059\) 上部署，则其可能会跟自身发生冲突。解决方法： 将默认启动应用更改为不希望部署的应用程序。
*	BackgroundMediaPlayer.MessageReceivedFromForeground 可能会崩溃。\(2199869\) 解决方法： 以下代码行可能崩溃： “BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;”。若要防止崩溃，请添加此代码，以便它首先执行“var player = BackgroundMediaPlayer.Current;”
*	已在 Raspberry Pi2 \(4266252\) 上禁用数据断点。解决方法： 目前尚无解决方法
*	Azure Active Directory 身份验证库可能在 Windows 10 IoT 核心版 \(4266261\) 上不可用。解决方法： 不使用 Azure Active Directory 身份验证库。
*	MediaEncodingProfile.CreateWma\( Windows.Media.MediaProperties.AudioEncodingQuality.Auto\) 方法调用在 Raspberry Pi2 上可能失败，错误消息为“未找到合适的转换以对内容进行编码或解码。（HRESULT 中的异常： 0xC00D5212）。\(4510128\) 解决方法： 无。
*	More.com!PAGER::DisplayString 可能会返回 INVALID\_POINTER\_READ 异常。\(1552523\) 解决方法： 无。
*	在部署 Node.JS 项目时，BackgroundTaskHost.exe 可能因为某个错误而失败。\(4873190\) 解决方法： 无。
*	在使用 windbg 连接到 DragonBoard 时，将禁用 GPIO/I2C/SPI/UART 驱动程序。\(4710796\) 解决方法： 无。
*	Dragonboard BSP 具有耳机插孔和麦克风插孔的驱动程序，但它在开发板上没有任何这些插孔。\(4791855\) 解决方法： 不手动禁用这些设备就无法使用 USB 耳机。
*	Dragonboard 上的 SPI 将会忽略所请求的速度，并始终以 4.8 Mhz 的速度运行。\(5055938\) 解决方法： 无。
*	在使用商业许可证时，ICD 映像版本可能会失败。（5291899、5382557）解决方法： 请查看以下链接中的信息：[http://go.microsoft.com/fwlink/?LinkId=708623](http://go.microsoft.com/fwlink/?LinkId=708623){:target="_blank"}
*	如果网络摄像机和 USB 音频适配器或耳机相同连接到 Raspberry Pi2，这可能会导致冲突。\(5383535\) 解决方法： 使用插入到 Raspberry Pi2 的板载音频插孔的模拟耳机。
*	如果设备名称设置为长度超过 15 个字符的值，这可能会导致启动失败。如果发生此问题，设备需要进行刷机才能恢复。\(5474244\) 解决方法： 不要使用长度超过 15 个字符的设备名称。
*	在尝试打开 Silicon Labs USB 串行适配器时，SerialDevice.FromIdAsync\(\) 可能会返回一个 NULL 值。\(5385500\) 解决方法： 运行 `iotstartup headless remove ZWaveHeadlessAdapterApp` 并重新启动。
*	在 MinnowBoardMax 上，当时钟速度小于 250kHz 时，SPI 驱动程序将为 FullDuplex 和 TransferSequential 传输生成格式错误的总线通信。\(3076149\) 解决方法： 使用 250kHz 或更高的时钟速度。
*   在 MinnowBoardMax 上，因为错误 31 而无法加载基于 Silicon Labs 的 USB 串行转换器 \(USB\\VID\_10C4&PID\_EA60\)。\(5307602\) 解决方法： 确保设备已拔出，然后运行：`reg add "HKEY_LOCAL_MACHINE\system\controlset001\enum\usb\VID_10C4&PID_EA60\0001\Device Parameters" /v PortName /t REG_SZ /d COM3`
*   在 MinnowBoardMax 上，FTDI USB 串行适配器将忽略所请求的波特率，并使用 3.8Mhz。\(5348073\) 解决方法： [适用于基于 x86 的 FTDI 设备的解决方法](#ftdiworkaround)
*	在 MinnowBoardMax 上，当设备在 MinnowBoardMax 上连接到顶部 USB 端口时，SerialDevice::FromIdAsync\(\) 可能会返回 NULL 值。\(2175837\) 解决方法： Intel 网站上对固件版本 0.83 或更高版本的更新：[http://firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"}。
*   通过使用 WinRT WLAN direct API，WLAN direct 在 IoT 核心版上部分受支持。有关更多详细信息，请参阅 [IoTCore 上的 WLAN Direct 限制](#wifidirect)。

### <a name="ftdiworkaround"></a>适用于基于 x86 的 FTDI 设备的解决方法

 1. 将 FTDI 设备插入你的 MBM。
 2. 运行 `devcon status FTDIBUS\*` 并记录设备的*设备实例路径*。

    <pre>
    C:\Data>devcon status ftdibus\*
    <i>FTDIBUS\VID_0403+PID_6001+A700EXHLA\0000</i>
        名称： USB 串行端口
        驱动程序正在运行。
    已找到 1 台匹配的设备。
</pre>

 3. 创建一个名为 ftdi-fix.reg 的文件，内容如下所示，其中 `<device instance path>` 将替换为在上一步中确定的设备实例路径。

{% highlight registry %}
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\system\controlset001\enum\<device instance path>\Device Parameters]
"ConfigData"=hex:11,00,3f,3f,10,27,00,00,88,13,00,00,c4,09,00,00,e2,04,00,00,\
  71,02,00,00,38,41,00,00,9c,80,00,00,4e,c0,00,00,34,00,00,00,1a,00,00,00,0d,\
  00,00,00,06,40,00,00,03,80,00,00,00,00,00,00,d0,80,00,00
"LatencyTimer"=dword:00000010
"MinReadTimeout"=dword:00000000
"MinWriteTimeout"=dword:00000000
{% endhighlight %}

 4. 将 ftdi-fix.reg 复制到你的设备，并运行 `reg import ftdi-fix.reg` 以应用注册表项。
 5. 拔下并重新插入 FTDI 设备。
 
### <a name="wifidirect"></a>IoTCore 上的 WLAN Direct 限制

1. IoTCore 设备必须是连接设备，因为在其他设备初始化连接时，该设备无法作为广告设备运行。  
2. 必须使用高级配对。示例应用演示了如何在连接前使用高级配对 API 对设备进行配对。
3. 并非所有无线适配器都支持 WLAN direct。我们已测试并验证“Realtek RTL8188EU 无线 LAN 802.11n USB 2.0 网络适配器”有效，但其他适配器可能不受支持。
 
