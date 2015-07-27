---
layout: default
title: 发行说明
permalink: /zh-CN/win10/ReleaseNotes.htm
lang: zh-CN
---

#Windows 10 IoT Core 的发行说明
&copy; 2015 Microsoft Corporation。保留所有权利

此文档提供最新进展或其他信息，用于补充 Windows 10 IoT Core 随附的文档。

感谢你下载 Windows 10 IoT Core。Windows 10 IoT 核心版是用于开发嵌入式或专用设备的 Windows 10 版本，可供制造商社区选择使用。此程序包包含在基于 Intel Atom E38xx 系列 SoC 的 MinnowBoard Max（也称为 MBM 板）和基于 ARM Cortex-A7 SoC 的 Raspberry PI2（也称为 RPI）上安装 Windows 10 IoT 核心版的预发布版本所需的位和工具。

##隐私声明

在此处查看此 Windows 操作系统的预发布版本的隐私声明：[http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

你可以通过将正向链接粘贴到你的浏览器窗口中，查看链接的条款。

##新增功能
* Windows 10 IoT Core 5/12 版本

    * 已更新基础操作系统版本
    * 针对设备设置、启动应用程序配置和反馈功能，已更新基于登录的 Web 界面。

##发行说明

默认的管理员用户名和密码已硬编码在 Windows 10 IoT Core 映像中。这使设备具有安全风险，因此在更改密码之前，请不要向开放的 Internet 连接公开此信息。

此发布中包含的 Windows 10 IoT 核心版映像支持在 MinnowBoard MAX 板上公开的外设。后续 IntelÆ 将提供对 Baytrail 处理器的完整功能集（包括 IntelÆ CeleronÆ 处理器 J1900/N2930/N2807 和 IntelÆ AtomÆ 处理器 E38XX）的支持。

Windows 10 IoT 核心版仍处于移植到 Raspberry PI 的过程中。RPI 上对音频输入和输出的支持仍处于开发阶段，而在此版本中则根本不提供。Raspberry PI 的视频驱动程序仍处于开发阶段，其性能尚待优化。尤其是动画形式的用户元素（例如，基于 XAML 的下拉菜单），其显示效果可能很差。

此版本的 MinnowBoard Max 或 Raspberry PI2 未完全实现蓝牙连接。

此版本的 Raspberry PI2 未完全实现无线网络连接。

##已知问题

* 在同时运行的多个应用之间切换时，键盘输入可能会丢失。\(1304429\)
* 某些 USB 键盘和鼠标可能在 Raspberry PI2 上不起作用。\(2365290\)。解决方法： 使用其他键盘或鼠标。几个特定的模型中出现了此问题，并且怀疑 USB 端口存在电源问题。使用通电的 USB 集线器可能能够解决此问题。
* XAML WebView 可能不接受键盘输入 \(2477598\)。解决方法： 使用其他控件接收输入。
* 使用 Tab 键在文本框之间导航时，可能会错误地将制表符插入到最后一个文本框中 \(2504096\)。解决方法： 手动删除制表符。
* 在 Raspberry PI 上，单个键盘击键可能不会被识别，或者可能会插入多个字符。\(2573557\)。解决方法： 无
* 某些摄像头驱动程序缺失。\(2187095\)。解决方法： 无
* Logitech USB 扬声器可能不会在 MBM 上生成音频输出 \(2460925\)。解决方法： 使用备用音频输出设备。
* 有关已验证的外设设备列表，请参阅 [http://WindowsOnDevices.com](http://WindowsOnDevices.com) 上的文档 \(2296724\)。解决方法： 查看已验证的设备的列表。
* Windows 10 IoT Core 映像中不支持常用的 Raspberry PI WiFi 适配器。\(2310140\)。解决方法： 使用以太网连接进行网络连接。
* 重启 Raspberry PI 后，无线网络可能无法重新连接 \(2367736\)。解决方法： 重新建立 WiFi 连接。
* WiFi/Bluetooth USB 组合设备可能不适用于 Raspberry PI 或 MinnowBoard Max \(2293778\)。解决方法： 使用另一组硬件。
* 基于 USB 的以太网适配器可能会在 Raspberry PI 上出现间歇性停止 \(2459108\)。解决方法： 使用板载以太网适配器。
* 在 MinnowBoard Max 上添加企业 EAP WiFi 配置文件可能会失败并出现 EAP\_E\_EAPHOST\_METHOD\_NOT\_INSTALLED \(0x80420011\) 错误 \(1416414\)。解决方法：无。
* MinnowBoard Max 并不支持所有显示器，尤其是某些正方形显示器。（2222035 和 2062893）。解决方法： 使用其他显示器。
* 在 MBM 正在运行时拔出 HDMI 视频电缆然后将其重新插入，随后 MinnowBoard Max 上的视频输出可能会崩溃。（2096834 和 2368396）。解决方法： 在 MBM 正在运行时，使 HDMI 电缆保持插入状态。
* 将 MinnowBoard Max 连接到触摸屏显示器后，触摸屏输入可能在 MinnowBoard Max 上不起作用。\(2171550\)。解决方法： 使用其他输入方式。
* 在 MinnowBoard Max 上断开连接或连接 USB 音频适配器时，视频可能会冻结 \(2534527\)。解决方法： 在连接或断开连接 USB 音频适配器时，不要播放视频。
* 某些动画形式的用户元素呈现速度可能会很慢或者对用户输入的响应速度很慢。\(2643284\)。解决方法： 无。
* IoT Core Default Application 可能在 1280 x 1024 显示器上无法正确显示 \(2536713\)。解决方法： 使用其他分辨率的显示器。
* GPIO API 图面中的 DebounceTimeout 可能无法正常工作 \(1874956\)。解决方法： 无
* 在设备管理器的 UEFI 设置中启用 GPIO 唤醒功能后，可能无法使用 GPIO WinRT API 切换任何 GPIO 输出或读取 GPIO 值 \(1894235\)。解决方法： 请不要在设备管理器中启用 GPIO 唤醒功能。
* 在附加按钮后或者在中断的速度大于系统可处理中断的速度时，GPIO 中断处理程序可能无法同步 GPIO 引脚的实际状态。解决方法： 减少中断的频率。
* 更改 GPIO 引脚的驱动器模式后，GPIO 中断可能是虚假的。\(2116871\)。解决方法： 无
* 将 100KHz 方波传入 GPIO 输入引脚并附加中断处理程序后，系统可能会锁定 \(2148240\)。解决方法： 无
* 部署启动应用程序后，Visual Studio 和 IoT ShellExt 可能会发生冲突。\(1244550\)。解决方法： 无
* 如果在部署的应用完成启动之前遇到了调试断点 F5，Sihost 可能会消失。\(1244514\)。解决方法： 终止 DefaultApp.exe 并重新启动 sihost。
* ICD 可能无法为 NUC 生成可启动的 Windows 10 IoT 核心版映像。\(1415629\)。解决方法： 无
* 由于默认应用在较慢的 4 速 SD 卡上失败，因此在启动期间可能会看到黑屏。\(2462306\)。解决方法： 不要使用 4 速 SD 卡。
* 设备关闭后，可能会再次看到启动时的初始屏幕。\(2502991\)。解决方法： 无
* 在启动 IoT Core Default App 之前，当前版本的 Windows 10 IoT Core 启动了两次。\(2504963\)。解决方法： 这是预期的行为。
* 在 Raspberry PI 上使用板载网卡初始化 Windows 10 IoT 核心版时，可能会导致大量的网络广播。\(2322325\)。解决方法： 在连接到网络后初始化设备，不会造成干扰。
* 蓝牙低能耗 Gatt 接口不适用于 Windows 10 IoT Core \(2382852\)。解决方法： 无。此版本未完全实现蓝牙。
* 墨迹书写识别器可能在此版本的  Windows 10 IoT 核心版中不可用 \(2552947\)。解决方法： 无。
* 加载墨迹控件可能会导致应用程序崩溃 \(2221749\)。解决方法： 无
* SPI 示例在首次部署到 MinnowBoard Max 时可能无法工作 \(2524399\)。解决方法： 将示例重新部署到 MBM。
* 在 MinnowBoard Max 上以 100KHz 传输 SPI 序列时，可能会出现格式不正确 \(1666855\)。解决方法： 使用全双工以 100 KHz 传输。
* Visual Studio 可能无法同时调试两个启动任务 \(2202979\)。解决方法： 无
* 在 Visual Studio 中停止后台任务可能会导致错误检查 \(2366900\)。解决方法： 请不要在 Visual Studio 中停止后台任务。
* 在调试使用 IoT 调试代理的有外设应用程序时，若已选中“调试”\>“停止”菜单项，将触发断言。\(2385747\)。解决方法： 无。
* 打开 package.json 文件可能会导致 Visual Studio 崩溃 \(2457310\)。解决方法： 无。
* Windows.UI.Popups.MessageDialog 不适用于此版本的 Windows 10 IoT 核心版 \(1214773\)。解决方法： 无。
* GetNetworkUsageAsync 可能会引发 System.UnauthorizedAccessException \(1972129\)。解决方法： 无。
* Windows.Devices.SerialCommunications 可能不会从 WinRT UAP 应用枚举设备。\(2266901\)。解决方法： 无。
* 此版本的 Windows 10 IoT 核心版不包含 WinRT Windows.System.Profile.HardwareIdentification。\(2311696\)。解决方法： 无。
* 将 Telent 用于在 MinnowBoard Max 上发送“devcon status usb”命令时，可能会返回错误编号 28。\(1097931\)。解决方法： 无
* SPI 上的 CS 信号可能一开始很弱，直到 MinnowBoard MAx 上进行了首次数据传输。\(1682876\)。解决方法： 在首次数据传输后，信号应该是正常的。
* Web 界面可能无法删除 Raspberry PI2 上的 APPX 程序包。\(1910993\)。解决方法： 使用 Powershell 删除 APPX 程序包。
* 剪贴板可能会返回“无法识别的类”异常。\(2221417\)。解决方法： 无
* 音频任务可能在通用 Windows 应用程序中无法启动。\(2221634\)。解决方法： 无
* 后台传输可能会失败，并在通用 Windows 应用程序中出现异常。\(2221657\)。解决方法： 无。
* Windows 10 IoT Core 映像缺少 fileinfo.sys。\(2230476\)。解决方法： 无。
* 更改 Windows 10 IoT 核心版设备的名称后，将该名称用作参数可能无法连接。\(2300166\)。解决方法： 使用设备的 IP 地址进行连接。
* I2C 重新启动可能会使用不正确的 CLK 级别。\(2392063\)。解决方法： 无。
* BackgroundService 任务可能会同时注册为有外设和无外设的任务。\(2455442\)。解决方法： 无。
* System.Diagnostics.Debug.WriteLine 可能不会发送到通用 Windows 应用程序中的输出窗格。\(2455800\)。解决方法： 无。
* CBT 故障可能会导致在 sihost.exe 中进行错误检查 \(2478779\)。解决方法： 无。
* 初始部署空白的后台任务时，可能会引发错误。\(2551584\)。解决方法： 无。
* 将 IoT Core Default Application 连接到 WiFi 网络时，即使设备已成功连接，也可能会针对 IP 地址值显示 <empty>。\(2640478\)。解决方法： 无。
