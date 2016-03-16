---
layout: default
title: ZWaveTutorial
permalink: /zh-cn/win10/samples/ZWaveTutorial.htm
lang: zh-cn
---

## Z-Wave 示例

{% include VerifiedVersion.md %}

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\AllJoyn\Samples\ZWaveAdapter` 来查找此示例的源代码。示例代码在 C++ 中可用。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

本教程将演示 AllJoyn 设备系统网桥 \(DSB\) 公开和控制 Z-Wave 设备的功能，并介绍在 Raspberry Pi2 映像包含的 //Build/2015 中提供的 AllJoyn Z-Wave 演示的设置。它将演示 Z-Wave AllJoyn 设备系统网桥 \(DSB\) 公开和控制 Z-Wave 设备的功能。

### 什么是 Z-Wave？

Z-Wave 是无线通信协议，旨在允许家庭中的设备（如照明、家庭装置）之间进行通信，以实现家庭自动化目的。

## 先决条件

1. 带有 Windows 10 IOT 核心版映像的 Raspberry Pi2
2. <a name="AllJoyn_Z_Wave"></a>此演示需要 Z-Wave 设备和两台 Aeon Labs Z-Wave 设备：
  * Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick 系列 2 USB 硬件保护装置
  * Aeon Labs DSC24-ZWUS 智能交换机 Z-Wave 装置模块
3. 具有安装了 [IoT Explorer for AllJoyn]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} 应用的 Windows 10 的 PC 或笔记本电脑。


## 设置 Raspberry Pi2

1. 将 Raspberry Pi2 连接到 LAN（通过集线器或直接通过跨越或自动 MDI-X）
2. 连接电源以启动 Raspberry Pi2
3. 验证电脑是否可以访问带有 Windows IoT Core Watcher 的 Raspberry Pi2

## 部署 Z-Wave DSB

### 运行上一个安装

对于大多数 Windows 10 IOT 核心版映像，Z-Wave 适配器 DSB 已预安装。在这种情况下，只需使用 SSH 或 Windows Device Portal 启动该示例。

1. 使用 [SSH]({{site.baseurl}}/zh-cn/win10/samples/SSH.htm){:target="_blank"} 或 [Windows Device Portal]({{site.baseurl}}/zh-cn/win10/tools/DevicePortal.htm){:target="_blank"} 运行以下命令 `iotstartup.exe add headless ZWave`
2. 重新启动设备。将在启动时立即启动 Z-wave 适配器应用程序。

### 从源运行
1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。
2. 在 Visual Studio 中打开 `samples-develop\AllJoyn\Samples\ZWaveAdapter\ZWaveAdapter.sln`。
3. 在 Visual Studio 中打开解决方案后，请导航至解决方案资源管理器，并右键单击 ZWaveBackgroundService 项目。选择“设置为启动项目”。![set\_startup]({{site.baseurl}}/Resources/images/AllJoyn/startup_proj.png)

4.  在主菜单栏中，依次选择“调试”-\>“ZWaveBackgroundService 属性...”
5.  按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)的说明进行操作

## 配对 Z-Wave 设备

注意： 不要在配对时插入 Z-Wave USB 硬件保护装置。此外，Z-Wave 硬件保护装置和 Z-Wave 开关需紧密相邻

1. 点击圆形按钮，将 Z-Stick 置于包含模式下。LED 灯应开始缓慢闪烁。
2. 在 Z-Stick 进入包含模式后，插入 Z-Wave 开关（它将在连接到电源后起作用），并按“电源”按钮以将其添加至 Z-Wave 网络。控制器上的指示灯在邻近发现期间将快速闪烁，并保持不变 3 秒钟，以指示成功将设备包含到网络中。
3. LED 灯变回缓慢闪烁后，再次点击 Z-Stick 上的按钮以关闭包含模式。
4. 将 USB Z-Stick 插入 RPi 中。

设置的外观应如下图所示

![Rpi\_ZStick]({{site.baseurl}}/Resources/images/AllJoyn/ZStick_RPi.png)

## 通过 AllJoyn 控制 Z-Wave 开关

让我们打开 Z-Wave 电源开关吧！ 我们将使用 Alljoyn 的 IoT 资源管理器应用程序来导航设备、对象和接口。

启动 IoT Explorer for AllJoyn 应用。AJX 应查找以下三台设备：

* ZWaveAdapter – Microsoft DSB： 这是 Z-Wave DSB
* HomeID\_xxx… – Aeon Labs 智能能源开关： 这是 Z-Wave 电源开关，已与 Z-Wave 硬件保护装置配对
* HomeID\_xxx… – Aeon Labs Z-Stick S2： 这是 Z-Wave USB 硬件保护装置，选择 Aeon Labs 智能能源开关。

![AJx\_ZWave1]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot1.png)

选择开关对象。

![AJx\_ZWave2]({{site.baseurl}}/Resources/images/AllJoyn/ajx_shot2.png)

  该开关对象的接口视图列出了多个接口。大多数接口均为默认的 AllJoyn 接口，如 Introspectable 接口。选择 com.microsft.ZWaveAdapterHome… 接口。


![AJx\_ZWave3]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot3.png)


选择值属性。

![AJx\_ZWave4]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot4.png)

  根据开关的当前状态（打开或关闭），如果状态为 ON，“当前值”字段将显示“true”；如果为 OFF，将显示“false”。在“新值”下拉列表中，选择新的设置。选择新设置后，按“设置”。

![AJx\_ZWave5]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot5.png)

  视图将报告“当前值”字段中的值的更改以及返回操作的状态代码：

![AJx\_ZWave6]({{site.baseurl}}/Resources/images/AllJoyn/Ajx_shot6.jpg)


