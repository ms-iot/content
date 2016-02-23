---
layout: default
title: 发行说明
permalink: /zh-CN/win10/ReleaseNotes.htm
lang: zh-CN
---

#Windows 10 IoT 核心版的发行说明
&copy; 2015 Microsoft Corporation。保留所有权利

本文档提供最新进展或其他信息，用于补充 Windows 10 IoT 核心版随附的文档。

感谢下载 Windows 10 IoT 核心版。Windows 10 IoT 核心版是用于开发嵌入式或专用设备的 Windows 10 版本，可供制造商社区选择使用。此程序包包含在基于 Intel&reg; Atom E38xx 系列 SoC 的 MinnowBoard Max（也称为 MBM 板）和基于 ARM Cortex-A7 SoC 的 Raspberry PI2（也称为 RPI）上安装 Windows 10 IoT 核心版所需的位和工具。

##隐私声明

在此处查看此 Windows 操作系统版本的隐私声明：[http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

可通过将正向链接粘贴到浏览器窗口中，查看链接的条款。

##新增功能
* Windows 10 IoT 核心版公共版本
   * Wi-Fi 支持
   * 蓝牙支持
   * 已更新基础操作系统版本
   * Bug 修复

##发行说明

默认的管理员用户名和密码已硬编码在 Windows 10 IoT 核心版映像中。这使设备具有安全风险，因此在更改密码之前，请不要向开放的 Internet 连接公开此信息。

此发布中包含的 Windows 10 IoT 核心版映像支持在 MinnowBoard MAX 板上公开的外围设备。随后，Intel&reg; 将提供对 Baytrail 处理器的完整功能集（包括 Intel Celeron&trade; 处理器 J1900/N2930/N2807 和 Intel Atom&trade; 处理器 E38XX）的支持。

使用 Visual Studio RC 创建的 Windows 10 UWP 项目不与当前的 Visual Studio 版本兼容。用户应创建新的空白 UWP 项目或后台应用程序 \(IoT\) 项目，并将其源代码复制到新项目中。

Windows 10 IoT 核心版仍处于移植到 Raspberry PI 的过程中。Raspberry PI 的视频驱动程序仍处于开发阶段，其性能尚待优化。动画式用户元素（尤其是基于 XAML 的下拉菜单）的显示效果可能很差。

适用于 Raspberry Pi 2 的此版本的 Windows 10 IoT 核心版限制了对相机外围设备的支持。直接连接到板载相机总线的 PiCam 设备当前不受支持，因为它要求 GPU 服务，但由于 DirectX 驱动程序尚未实现，因此该服务当前在 Raspberry Pi 上不可用。现代 USB 摄像头可在 USB 主控制器上生成要求极度严苛的数据流。即使摄像头结合使用低分辨率设置，还将需要其他 USB 微调和专用控件逻辑。我们计划在不久的将来支持多种 USB 相机，并将尽快发布有关受支持设备的特定信息。

依赖于 Windows 系统更改系统音量的 USB 麦克风和扬声器的硬件音量控件当前在 Windows 10 IoT 核心版上不受支持。

某些 USB 键盘和鼠标可能在 Raspberry PI2 上不起作用。使用其他键盘或鼠标。有关已验证的外围设备的列表，请参阅 [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"} 上的文档。

在 Raspberry Pi2 上，GPIO PIN 0 和 GPIO PIN 1 可用于 Windows 10 IoT 核心版的 4 月版中的用户模式应用程序，但现已不再可用。尝试使用 Windows::Devices::Gpio::GpioController::OpenPin\(\) 打开这些 PIN 将返回 HRESULT\_FROM\_WIN32\(ERROR\_NOT\_FOUND\)。GPIO PIN 0 和 1 将由 HAT 规范 \(https://github.com/raspberrypi/hats\) 保留在 Raspberry Pi 上，并受 VC 固件的控制。根据此规范，这些 PIN 应保留为未连接状态。


##已知问题

*	如果通过调试程序启动应用程序，将可能丢失默认启动应用程序的键盘输入。解决方法： 如果希望通过键盘使用默认启动应用程序，请在调试后重新启动。\(1304429\)
*	某些 USB 键盘和鼠标可能在 Raspberry PI2 上不起作用。解决方法： 使用其他键盘或鼠标。有关已验证外设设备的列表，请参阅 [http://go.microsoft.com/fwlink/?LinkId=619428](http://go.microsoft.com/fwlink/?LinkId=619428){:target="_blank"} 上的文档
*	在 MBM 正在运行时拔出 HDMI 视频电缆然后将其重新插入后，MinnowBoard Max 上的视频输出可能会崩溃。\(2096834\)。解决方法： 在 MBM 正在运行时，使 HDMI 电缆保持插入状态。
*	将方向设置为“纵向”在通用应用 \(3039042\) 中可能不受支持。解决方法： 无
*	某些动画式用户元素在 Raspberry Pi 上的呈现速度可能会很慢或者对用户输入的响应速度会很慢。\(2735596\)。解决方法： 不使用运行不加的动画式用户元素。
*	当在驱动器模式 \(2938068\) 之间切换时，GPIO PIN 4 的行为可能会出人意料。解决方法： 如果需要切换驱动器模式，请使用 PIN 而非 GPIO 4。
*	在设备管理器的 UEFI 设置中启用 GPIO 唤醒功能后，可能无法使用用于 MBM \(1894235\) 上的 PIN 0-2 的 GPIO WinRT API 切换 GPIO 输出或读取 GPIO 值。解决方法： 不启用 GPIO 唤醒功能 
*	如果默认启动应用也是从 Visual Studio \(1244550\) 部署的，则其可能会跟自身发生冲突。解决方法： 将默认启动应用更改为不希望部署的应用程序。
*	时间将可以从网络同步，并且在重新启动后同步时钟的速度将会减慢。（3283455、2942694）解决方法： 强制使用“w32tm /resync”命令更新时间。
*	在调试使用 IoT 调试代理的有外设应用程序时，如果已选择“调试”\>“停止”菜单项，可能会触发断言。\(2385747\)。解决方法： 无。
*	在 Web 浏览器中单击外部链接可使前台应用崩溃。崩溃是由于浏览器控件尝试使操作系统打开 IoT 核心版不支持的新窗口或选项卡。\(3468443\) 解决方法： 将 http 或 https 协议处理程序添加到应用程序，以便调用不会路由至操作系统。 
*	GetNetworkUsageAsync 可能会引发 System.UnauthorizedAccessException \(1972129\)。解决方法： 无。
*	BackgroundService 任务可能会同时列为有外设和无外设的任务。\(2455442\)。解决方法： 无。
*	SPI 驱动程序将在 MinnowBoard Max \(3076149\) 上返回格式错误的缓冲区，该缓冲区包括 WriteRead 序列的缓冲区开头的两个多余字节。解决方法： 通过分配大小为 x-2 字节的缓冲区，可在进行调用的代码中补偿多余的字节。
*	IoT 核心版默认应用程序可为相同的适配器显示两个不同的 IP 地址，其中一个地址已过时。\(3303771\)。解决方法： 无。
*	MBM 上的 UART1 流控制/序列握手默认为“打开”，且无法关闭 \(2995473\)。解决方法： 请使用 UART2，而非缺少流控制的设备。
*	位置 \(Geolocator.RequestAccessAsync\(\)\) 可能不会按预期运行。\(3359968\) 解决方法： 无。
*	BackgroundMediaPlayer.MessageReceivedFromForeground 可能会崩溃。\(3486027\) 解决方法： 以下代码行可能崩溃： “BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;”。若要防止崩溃，请添加此代码，以便它首先执行“var player = BackgroundMediaPlayer.Current;”
*	当设备在 MinnowBoardMax \(2175837\) 上连接到顶部 USB 端口时，SerialDevice::FromIdAsync\(\) 可能会返回 NULL 值。解决方法： 使用底部 USB 端口。
*	在 Raspberry Pi2 \(3370713\) 上已禁用数据断点。解决方法： 目前尚无解决方法
*	Azure Active Directory 身份验证库可能在 Windows 10 IoT 核心版 \(3379181\) 上不可用。解决方法： 不使用 Azure Active Directory 身份验证库。
*	使用某些 8GB 类 10 SD 卡时，MinnowBoard Max 和 Raspberry Pi2 在首次启动时将可能极其缓慢。启动时间可能慢到超过 15 分钟。后续启动在受影响的卡 \(3416260\) 上将快得多。解决方法： 不使用受影响的卡。
*	如果 SSH 客户端没有正常关闭会话，SSH 服务可能崩溃。（3581710、3602012）。解决方法： 在这种情况下，SSH 服务将重新启动。 
*	使用“CRITICAL\_PROCESS\_DIED”消息 \(3622767\) 启动时，如果设备名称长度超过 16 个字符，它将会出现蓝屏。解决方法： 使用少于 16 个字符的设备名称。
*	USB 扬声器可能无法在 Raspberry Pi2 \(3627304\) 上播放音频。解决方法： 禁用模拟音频以启用 USB 音频。
*	MediaEncodingProfile.CreateWma\(Windows.Media.MediaProperties.AudioEncodingQuality.Auto\) 在 Raspberry Pi2 上可能失败，错误消息为“未找到合适的转换以对内容进行编码或解码。（HRESULT 中的异常： 0xC00D5212）”。\(3634750\) 解决方法： 无。

