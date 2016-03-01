---
layout: default
title: BLE GATT 示例 - 配对和工具
permalink: /zh-cn/win10/samples/BLEGatt1.htm
lang: zh-cn
---

## 将 BLE 设备和 GATT 属性表转储工具配对

### 配对 Sensortag
在启动示例之前，我们需要首先将 SensorTag 与 Windows IoT 核心版设备配对。可采用两种方法配对设备：通过 [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm){:target="_blank"} 或命令行工具：`C:\Windows\System32\IoTBluetoothPairing.exe`。当前只有命令行工具支持与 PIN 身份验证配对，而这也是 SensorTag 的要求。请确保已将 USB 蓝牙硬件保护装置插入到 Windows IoT 核心版设备，并且已使 SensorTag 准备就绪。

#### 步骤 1
使用 SSH 连接到 Windows IoT 核心版设备。可在[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm){:target="_blank"}找到有关如何执行此操作的说明。

#### 步骤 2
通过将此 `C:\Windows\System32\IoTBluetoothPairing.exe` 输入到 SSH 外壳中，运行命令行工具。应看到如下内容：

![配对工具 1]({{site.baseurl}}/Resources/images/BLEGatt/pairing1.png)

为导航工具和做出选择，请在所需命令之前输入字母或数字。有关从主菜单退出工具的示例，请依次按 `X` 和 `Enter` 键。

#### 步骤 3
请注意，该工具处于 BR 模式下（正如在主菜单顶部所示一样），需要在 LE 模式下才能与 BLE 设备配对。为此，请选择 `C - Change Bluetooth mode to LE.` 选项。应看到如下内容：

![配对工具 2]({{site.baseurl}}/Resources/images/BLEGatt/pairing2.png)

#### 步骤 4
现在，请选择 `P - Pair a device.` 选项，以显示配对接口。应看到如下内容：

![配对工具 3]({{site.baseurl}}/Resources/images/BLEGatt/pairing3.png)

#### 步骤 5
通过从列表中选择 SensorTag，启动配对过程。如果没有看到 SensorTag，请确保它处于公开模式下，此模式的激活方法是按侧按钮，并且指示灯将闪烁。也请记住在打开 SensorTag 后刷新列表！

如果成功启动配对过程，请输入 `000000` 作为 PIN。这是具有固件 1.4.1 的 SensorTag 的默认集。

![配对工具 4]({{site.baseurl}}/Resources/images/BLEGatt/pairing4.png)

配对运行后，应看到其成功的消息。

#### 步骤 6
若要确认已配对 SensorTag，请从主菜单中选择 `L - Display paired/pairable device list.`。如果在配对的设备列表下看到 SensorTag，则已成功配对 SensorTag！

![配对工具 5]({{site.baseurl}}/Resources/images/BLEGatt/pairing5.png)

### GATT 属性表转储工具
为使用 GATT 与 BLE 设备通信，将需要了解所需 GATT 服务和特征的 UUID。幸运的是，TI [在此处](http://processors.wiki.ti.com/images/a/a8/BLE_SensorTag_GATT_Server.pdf){:target="_blank"}为我们提供了 SensorTag 的 GATT 属性表。

如果未提供所用设备的 GATT 属性表，可使用蓝牙 GATT 数据库查看器 \(BthGATTDump.exe\) 生成 Microsoft Windows 可理解的 GATT 属性表。该工具是 Windows 驱动程序工具包 \(WDK\) 的一部分，可在 \[此处\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/ff557573(v=vs.85).aspx){:target="_blank"} 找到。安装工具后，包含指示的 README.txt 位于 `C:\Program Files (x86)\Windows Kits\10\Tools\<ARCH>\Bluetooth\BthGATTDump\` 处，其中 <ARCH> 是安装了该工具的系统的体系结构。

请记住，它是命令行工具，并且[此处]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGattDump.htm){:target="_blank"}是 SensorTag 的示例 GATT 属性表转储文件。

### 下一步操作是什么？
[使用和分解代码]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt2.htm) - 了解如何使用示例以及代码的操作实例。

#### 上一页
[示例概述]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm) - 了解 BLE、GATT 和 TI CC2541 SensorTag。
