---
layout: default
title: BLE GATT 示例 - 概述
permalink: /zh-cn/win10/samples/BLEGatt.htm
lang: zh-cn
---

## 低耗电 Bluetooth \(BLE\) 通用属性配置文件 \(GATT\) 示例概述

{% include VerifiedVersion.md %}

在此示例中，我们将了解如何通过使用 GATT 配置文件和 TI CC2541 SensorTag 处理低耗电 Bluetooth 设备。通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip){:target="_blank"}下载所有示例的 zip 并导航到 [`BluetoothGATT/CS`](https://github.com/ms-iot/samples/tree/develop/BluetoothGATT/CS){:target="_blank"} 文件夹来找到此示例的源代码。

可在[此处]({{site.baseurl}}/{{page.lang}}/win10/Bluetooth.htm){:target="_blank"}找到有关对 Windows IoT 核心版设备的蓝牙支持的信息。

此示例在所有 Windows IoT 核心版设备上受支持。DragonBoard 410c 具有板载蓝牙的增加优势，这意味着你将无需额外的蓝牙 USB 硬件保护装置即可完成此示例或其他蓝牙示例。

### 低耗电 Bluetooth和 GATT 是什么？
低耗电 Bluetooth \(BLE\)（或蓝牙智能）是蓝牙 4.0 核心规范的一部分的无线协议。BLE 的主要功能是其低能耗，这使其广泛应用在 IoT 和可穿戴设备上。

通用属性配置文件 \(GATT\) 是 BLE 设备之间将用于通信的蓝牙配置文件。数据将组织到称为配置文件、服务和特征的嵌套对象中，如下图所示：

![GATT 结构图]({{site.baseurl}}/Resources/images/BLEGatt/GattDiagram.png)

强烈建议在继续操作前理解这些概念。Adafruit 在[此处](https://learn.adafruit.com/introduction-to-bluetooth-low-energy/introduction){:target="_blank"}出色地概述了低耗电 Bluetooth \(BLE\) 和 GATT 配置文件的工作原理。

### TI CC2541 SensorTag

![SensorTag 图片]({{site.baseurl}}/Resources/images/BLEGatt/SensorTag_with_iPad.jpg) <sub>\*[来自 Texas Instruments 的图像](http://processors.wiki.ti.com/index.php/File:SensorTag_with_iPad.jpg){:target="_blank"}\*</sub>

在此示例中，我们通过 BLE 将 Windows IoT 核心版设备与 [Texas Instruments CC2541 SensorTag 开发工具包](http://www.ti.com/tool/cc2541dk-sensor){:target="_blank"}配对并连接在一起。SensorTag 是 TI CC2541 芯片支持的 BLE 设备，具有可编程的蓝牙 4.0 堆栈。该设备上也有以下 6 种传感器，可通过 GATT 配置文件公开数据：

1. 非接触式红外温度传感器（Texas 仪器 TMP006）

2. 湿度传感器 \(Sensirion SHT21\)

3. 陀螺仪 \(Invensense IMU 3000\)

4. 加速计 \(Kionix KXTJ9\)

5. 磁力计 \(Freescale MAG3110\)

6. 大气压力传感器 \(Epcos T5400\)

此示例需要 Visual Studio 更新 1 SDK 版本 10586 才能在设备上的最新版本的 IoT 核心版操作系统上生成和运行。

在此示例中，我们正在 SensorTag 上运行固件版本 1.4.1。可在[此处](http://processors.wiki.ti.com/index.php/SensorTag_User_Guide){:target="_blank"}找到有关 SensorTag 的更多详细信息。

[单击此处来预定 Texas Instruments 的 SensorTag。](http://www.ti.com/tool/cc2650stk#buy){:target="__blank"}

### 硬件支持

请在[此处]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm)查找受支持的蓝牙硬件保护装置的列表（DragonBoard 410c 不需要蓝牙硬件保护装置）。

### 下一步操作是什么？
1. [将 BLE 设备和 GATT 属性表转储工具配对]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt1.htm) - 了解如何将 SensorTag 与 Windows IoT 核心版设备配对，以及如何在 Windows 中检索 GATT 属性表。

2. [使用和分解代码]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt2.htm) - 了解如何使用示例以及代码的操作实例。
