---
layout: default
title: 发行说明
permalink: /zh-cn/win10/ReleaseNotes.htm
lang: zh-cn
---

#Windows 10 IoT 核心版的发行说明
Insider Preview 内部版本号 10556.0

&copy; 2015 Microsoft Corporation。保留所有权利

此文档提供最新进展或其他信息，用于补充 Windows 10 IoT Core Insider Preview 随附的文档。

感谢下载 Windows 10 IoT Core Insider Preview。Windows 10 IoT 核心版是用于开发嵌入式或专用设备的 Windows 10 版本，可供制造商社区选择使用。此程序包包含在基于 Intel&reg; Atom E38xx 系列 SoC 的 MinnowBoard Max（也称为 MBM 板）和基于 ARM Cortex-A7 SoC 的 Raspberry PI2（也称为 RPI）上安装 Windows 10 IoT 核心版所需的位和工具。

##隐私声明

在此处查看此 Windows 操作系统版本的隐私声明：[http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

可通过将正向链接粘贴到浏览器窗来查看隐私声明。

##新增功能
* Windows 10 IoT Core Insider Preview 10 月 15 日版本
   * Raspberry Pi 上对 TX 和 RX 引脚的串行支持
   * 改进超过 100x 的高性能 GPIO 驱动程序选项
   * Visual Studio 的 Arduino 接线项目系统
   * 已更新基础操作系统版本
   * Bug 修复

##发行说明

运行 IoT 核心版的设备在使用某些 8GB 类 10 SD 卡时，首次启动将可能极其缓慢。启动时间可能慢到超过 15 分钟。后续启动在受影响的卡上将快得多。

默认的管理员用户名和密码已硬编码在 Windows 10 IoT 核心版映像中。这使设备具有安全风险，因此在更改密码之前，请不要向开放的 Internet 连接公开此信息。

除非固件为版本 .082 或更高版本，否则 MinnowBoard Max 将无法使用高于 10240 版本的 Windows 10 IoT 核心版启动。推荐的最低固件版本是“MinnowBoard MAX 0.82 32 位”。固件更新可从 [http://firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max) 下载。

此发布中包含的 Windows 10 IoT 核心版映像支持在 MinnowBoard MAX 板上公开的外设。随后，Intel&reg; 将提供对 Baytrail 处理器的完整功能集（包括 Intel Celeron&trade; 处理器 J1900/N2930/N2807 和 Intel Atom&trade; 处理器 E38XX）的支持。

使用 Visual Studio RC 创建的 Windows 10 UWP 项目不与当前的 Visual Studio 版本兼容。用户应创建新的空白 UWP 项目或后台应用程序 \(IoT\) 项目，并将其源代码复制到新项目中。

Windows 10 IoT 核心版仍处于移植到 Raspberry PI 的过程中。Raspberry PI 的视频驱动程序仍处于开发阶段，其性能尚待优化。动画式用户元素（尤其是基于 XAML 的下拉菜单）的显示效果可能很差。

适用于 Raspberry Pi 2 的此版本的 Windows 10 IoT 核心版限制了对相机外围设备的支持。直接连接到板载相机总线的 PiCam 设备当前不受支持，因为它要求 GPU 服务，但由于 DirectX 驱动程序尚未实现，因此该服务当前在 Raspberry Pi 上不可用。现代 USB 摄像头可在 USB 主控制器上生成要求极度严苛的数据流。即使摄像头结合使用低分辨率设置，还将需要其他 USB 微调和专用控件逻辑。我们计划在不久的将来支持多种 USB 相机，并将尽快发布有关受支持设备的特定信息。

依赖于 Windows 系统更改系统音量的 USB 麦克风和扬声器的硬件音量控件当前在 Windows 10 IoT 核心版上不受支持。

某些 USB 键盘和鼠标可能在 Raspberry PI2 上不起作用。使用其他键盘或鼠标。有关已验证的外围设备的列表，请参阅 [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"} 上的文档。

在 Raspberry Pi2 上，GPIO PIN 0 和 GPIO PIN 1 可用于 Windows 10 IoT 核心版的 4 月版中的用户模式应用程序，但现已不再可用。尝试使用 Windows::Devices::Gpio::GpioController::OpenPin\(\) 打开这些引脚将返回 HRESULT\_FROM\_WIN32\(ERROR\_NOT\_FOUND\)。GPIO引脚 0 和 1 将由 HAT 规范 [https://github.com/raspberrypi/hats](https://github.com/raspberrypi/hats) 保留在 Raspberry Pi 上，并受 VC 固件的控制。根据此规范，这些引脚应保留为未连接状态。

##已知问题

*	将方向设置为“纵向”在通用应用 \(3039042\) 中可能不受支持。解决方法： 无
*	在 Raspberry Pi 和 Dragonboard 上，从非默认驱动器模式切换到其他非默认驱动器模式可能会在 GPIO 引脚上产生故障。\(3890679\) 解决方法： 在应用程序开端处设置一次驱动器模式。
*	如果默认启动应用也是在 Visual Studio \(4266059\) 上部署，则其可能会跟自身发生冲突。解决方法： 将默认启动应用更改为不希望部署的应用程序。
*	GetNetworkUsageAsync 可能会引发 System.UnauthorizedAccessException \(1972129\)。解决方法： 无。
*	在 MinnowBoardMax 上，当时钟速度小于 250kHz 时，SPI 驱动程序将为 FullDuplex 和 TransferSequential 传输生成格式错误的总线通信。\(3076149\) 解决方法： 使用 250kHz 或更高的时钟速度。
*	IoT 核心版默认应用程序可为相同的适配器显示两个不同的 IP 地址，其中一个地址已过时。\(3303771\)。解决方法： 无。
*	当设备在 MinnowBoardMax \(2175837\) 上连接到顶部 USB 端口时，SerialDevice::FromIdAsync\(\) 可能会返回 NULL 值。解决方法： Intel 网站上对固件版本 0.83 或更高版本的更新：[http://firmware.intel.com/projects/minnowboard-max](http://firmware.intel.com/projects/minnowboard-max){:target="_blank"}。
*	已在 Raspberry Pi2 \(4266252\) 上禁用数据断点。解决方法： 数据断点会在以后的版本中启用。
*	Azure Active Directory 身份验证库可能在 Windows 10 IoT 核心版 \(4266261\) 上不可用。解决方法： 不使用 Azure Active Directory 身份验证库。
*	More.com!PAGER::DisplayString 可能会返回 INVALID\_POINTER\_READ 异常。\(1552523\) 解决方法： 无。
*	运行 IoT 核心版的设备可能不会同步时间。\(4444681\) 手动更新时间或以编程方式强制时间同步。
*   在 MinnowBoardMax 上，因为错误 31 而无法加载基于 Silicon Labs 的 USB 串行转换器 \(USB\\VID\_10C4&PID\_EA60\)。\(5307602\) 解决方法： 确保设备已拔出，然后运行：`reg add "HKEY_LOCAL_MACHINE\system\controlset001\enum\usb\VID_10C4&PID_EA60\0001\Device Parameters" /v PortName /t REG_SZ /d COM3`
*   在 MinnowBoardMax 上，FTDI USB 串行适配器将忽略所请求的波特率，并使用 3.8Mhz。\(5348073\) 解决方法： [适用于基于 x86 的 FTDI 设备的解决方法](#ftdiworkaround)
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
 1.	IoTCore 设备必须是连接设备，因为在其他设备初始化连接时，该设备无法作为广告设备运行。  
 2.	必须使用高级配对。示例应用演示了如何在连接前使用高级配对 API 对设备进行配对。
 3.	并非所有无线适配器都支持 WLAN direct。我们已测试并验证“Realtek RTL8188EU 无线 LAN 802.11n USB 2.0 网络适配器”有效，但其他适配器可能不受支持。