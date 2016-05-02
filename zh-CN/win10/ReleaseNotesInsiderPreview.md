---
layout: default
title: 发行说明
permalink: /zh-cn/win10/ReleaseNotesInsiderPreview.htm
lang: zh-CN
---

# Windows 10 IoT 核心版的发行说明
内部版本号 14295。2016 年 3 月

&copy; 2016 Microsoft Corporation。保留所有权利

本文档提供最新进展或其他信息，用于补充 Windows 10 IoT 核心版随附的文档。

感谢下载 Windows 10 IoT 核心版。Windows 10 IoT 核心版是用于开发嵌入式或专用设备的 Windows 10 版本，可供制造商社区选择使用。此程序包包含在基于 Intel&reg; Atom E38xx 系列 SoC 的 MinnowBoard Max（也称为 MBM 板）、基于 ARM Cortex-A7 SoC 的 Raspberry PI2（也称为 RPI）和基于 QualComm Snapdragon™ 400 系列处理器上的 DragonBoard 410c（也称为 Dragon）上安装 Windows 10 IoT 核心版所需的位和工具。

## 隐私声明

在此处查看此 Windows 操作系统版本的隐私声明：[http://go.microsoft.com/fwlink/?LinkId=506737](http://go.microsoft.com/fwlink/?LinkId=506737){:target="_blank"}

可通过将正向链接粘贴到浏览器窗口中，查看链接的条款。

## 此版本中的新增功能： 

* 远程屏幕体验现已包含在映像中
* 更新了服务引擎以更好地支持 Windows 即服务
* 为删除已安装的无外设应用程序提供更好的支持
* IoTCoreImageHelper 和 IoTWatcher 已从安装程序包中删除，因为它们的功能已包含在 IoT 仪表板应用程序中。 
* 更新了操作系统文件，包括核心操作系统 Bug 修复

## 此版本中的已知问题： 

* 此版本已启用了积极的防火墙设置，并且默认设置为阻止为侦听打开端口。若要解除应用阻止，你需要通过 SSH 或 Powershell 连接到设备并使用以下命令：
	* 解除特定端口阻止：
<pre>
netsh advfirewall firewall add rule name=[Any name to identify rule] dir=in action=allow protocol=TCP localport=[Port number]
</pre>

	* For Node.JS the default port is 1337 and you can use the following command:   
<pre>
netsh advfirewall firewall add rule name=”Node.js UWP” dir=in action=allow protocol=TCP localport=1337
</pre>
* 从 Visual Studio 部署 Python 项目可能会导致 Visual Studio 挂起或“无法附加调试程序”错误。这是由于防火墙阻止了 Python 调试程序。若要启用 Python 开发，请通过 SSH 或 Powershell 连接到设备，并运行以下命令： 
<pre>
netsh advfirewall firewall add rule name="TCP5678-TCP-in" dir=in action=allow protocol=TCP localport=5678
netsh advfirewall firewall add rule name="TCP5678-TCP-out" dir=out action=allow protocol=TCP localport=5678
</pre>

* AllJoyn DSB Visual Studio 模板可能不会从最新版本的 Visual Studio 中部署到 IoT 核心版。
* Raspberry PI 3 板载串行端口的 UART/串行 \(miniUART\) 驱动程序无法用于此版本。



## 发行说明

#### Minnowboard Max 启动和固件更新
除非固件版本是 .082 或更高版本，否则 MinnowBoard Max 将不会启动。推荐的最低固件版本是“MinnowBoard MAX 0.83 32 位”。固件更新可从 [http://go.microsoft.com/fwlink/?LinkId=708613](http://go.microsoft.com/fwlink/?LinkId=708613){:target="_blank"} 下载。

#### 默认管理员用户名和密码
默认的管理员用户名和密码已硬编码在 Windows 10 IoT 核心版映像中。这使设备具有安全风险，因此在更改密码之前，请不要向开放的 Internet 连接公开此信息。

#### Dragonboard 410c 关机
在 DragonBoard 上，关机命令不会关闭开发板电源。系统将会重新启动。请通过断开电源连接来关闭开发板电源。

#### Minnow 开发板外设支持
此发布中包含的 Windows 10 IoT 核心版映像支持在 MinnowBoard MAX 板上公开的外设。随后，Intel&reg; 将提供对 Baytrail 处理器的完整功能集（包括 Intel Celeron&trade; 处理器 J1900/N2930/N2807 和 Intel Atom&trade; 处理器 E38XX）的支持。

#### Raspberry Pi 视频性能
Raspberry Pi 平台上的视频播放性能尚未进行优化。动态用户元素（包括基于 XAML 的下拉菜单）可能表现不出最佳性能。

#### Raspberry Pi 相机支持
适用于 Raspberry Pi 2 的此版本的 Windows 10 IoT 核心版限制了对相机外围设备的支持。直接连接到板载相机总线的 PiCam 设备当前不受支持，因为它要求 GPU 服务，但由于 DirectX 驱动程序尚未实现，因此该服务当前在 Raspberry Pi 上不可用。现代 USB 摄像头可在 USB 主控制器上生成要求极度严苛的数据流。即使摄像头结合使用低分辨率设置，还将需要其他 USB 微调和专用控件逻辑。我们计划在不久的将来支持多种 USB 相机，并将尽快发布有关受支持设备的特定信息。

#### 音量控件
依赖于 Windows 系统更改系统音量的 USB 麦克风和扬声器的硬件音量控件当前在 Windows 10 IoT 核心版上不受支持。

#### USB 键盘 
某些 USB 键盘和鼠标可能无法在 IoT 核心版上工作。使用其他键盘或鼠标。有关已验证的外围设备列表，请参阅[此处的文档]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm){:target="_blank"}。

#### 屏幕方向
将方向设置为“纵向”在通用应用中可能不受支持

#### 使用 AllJoyn 模板引用适配器
尝试向 AllJoyn 适配器项目添加引用可能会在使用特定 SDK 版本时导致错误。若要解决这些错误，请更改 Visual Studio 的目标平台，以匹配当前的 SDK 版本，然后重新加载项目。

#### RPi2 上的串行端口用法和访问权限
Raspberry Pi 2 支持通过 PL011 UART 串行传输通信。这是内核调试方案中的默认设置。应用程序或设备驱动程序可以使用 PL011 UART 在 PL011 设备驱动程序使用以下命令关闭调试程序的情况下发送和接收数据：

bcedit /set debug off

#### <a name="wifidirect"></a>IoTCore 上的 WLAN Direct 限制
1. IoTCore 设备必须是连接设备，因为在其他设备初始化连接时，该设备无法作为广告设备运行。  
2. 必须使用高级配对。示例应用演示了如何在连接前使用高级配对 API 对设备进行配对。
3. 并非所有无线适配器都支持 WLAN Direct。我们已测试并验证“Realtek RTL8188EU 无线 LAN 802.11n USB 2.0 网络适配器”有效，但其他适配器可能不受支持。
 
#### 非默认驱动器模式 \(3890679\)
在 Raspberry Pi 和 Dragonboard 上，从非默认驱动器模式切换到其他非默认驱动器模式可能会在 GPIO 引脚上产生故障。解决方法： 在应用程序开端处设置一次驱动器模式。

#### 已处于运行状态的应用程序 \(1244550\)
如果默认启动应用也从 Visual Studio 部署，则该应用可能会跟自身发生冲突。解决方法： 将默认启动应用更改为不希望部署的应用程序。

#### BackgroundMediaPlayer.MessageReceivedFromForeground 可能会崩溃 \(2199869\)
以下代码行可能崩溃： "BackgroundMediaPlayer.MessageReceivedFromForeground += OnMessageReceivedFromForeground;"。若要防止崩溃，请添加此代码，以便首先执行它：“var player = BackgroundMediaPlayer.Current;”

#### 已在 Raspberry Pi2 \(4266252\) 上禁用数据断点。 
目前没有解决方法

#### Azure Active Directory 身份验证支持 \(4266261\)
Azure Active Directory 身份验证库在 Windows 10 IoT 核心版上不可用。

#### Dragon Board 和 windbg \(4710796\)
在使用 windbg 连接到 DragonBoard 时，将禁用 GPIO/I2C/SPI/UART 驱动程序。

#### Dragon Board 耳机和麦克风插孔 \(4791855\)
Dragonboard BSP 具有耳机插孔和麦克风插孔的驱动程序，但它在开发板上没有这两种插孔。

#### Dragonboard SPI 以 4.8Mhz 的速度运行 \(5055938\)
Dragonboard 上的 SPI 将会忽略所请求的速度，并始终以 4.8 Mhz 的速度运行。

#### <a name="shellcrashes"></a>应用程序崩溃的 Shell 管理
IoT 核心版的 shell 基础结构用于监视设备中运行的 APPX 类型的应用程序是否崩溃，并且会在发生崩溃时重新启动这些应用程序。如果重新启动的应用程序继续崩溃，shell 将采用 \_\_failfast 这一系统关键进程，可引起错误检测并重新启动以尝试恢复。可比较逻辑和处理用于有外设配置中的后台任务和前台应用程序。下面捕获的是崩溃处理和重试逻辑：

<pre>
  Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\CBTConfig（或适用于外设的 ForegroundAppConfig）
    Qword:"FailureResetIntervalMs"：为了将出现的故障重置为 0，应用需要成功运行的时长（默认值为 0x00000000000493E0 == 5 分钟）。
    Qword:"BaseRetryDelayMs"：等待时间系数。 默认值为 0xa。
    Dword:"MaxFailureCount"。默认值为 10
    DWord:"FallbackExponentNumerator"，默认值为 31。
    Dword:"FallbackExponentDenominator"，默认值为 20


Fallback_exponent = FallbackExponentNumerator / FallbackExponentDenominator; // 默认值是 1.55

当检测到应用崩溃时：
    if time_since_last_crash > failureresetinterval then crashes_seen = 1
    else ++crashes_seen;
    
    if crashes_seen > MaxFailureCount then __failfast;
    else
      delay = (dword) ((float)BaseRetryDelayMs * (crashes_seen ** Fallback_exponent))
      等待延迟并重新启动应用
</pre>

#### Raspberry Pi 音频和直接内存映射驱动程序 \(6678121\)

在 Raspberry Pi 上启用直接内存映射驱动程序时，通过 3.5mm 插孔的音频将停止播放。

解决方法： 在启用直接内存映射驱动程序后，请运行：

    reg add HKEY_LOCAL_MACHINE\SYSTEM\DriverDatabase\DeviceIds\ACPI\BCM2844 /v dmap.inf /t REG_BINARY /d 02ff0100
    reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\enum\ACPI\bcm2844\0 /v ConfigFlags /t REG_DWORD /d 0x20
    devcon restart acpi\bcm2844

验证 PWM 设备节点的驱动程序是否为 `BCM2836 PWM Controller`：

    C:\Data>devcon status acpi\bcm2844
    ACPI\BCM2844\0
        Name: BCM2836 PWM Controller
        Driver is running.
    1 matching device(s) found.
