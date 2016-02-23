---
layout: default
title: ZWaveTutorial
permalink: /zh-CN/win10/samples/ZWaveTutorial.htm
lang: zh-CN
---

## ZWave 示例

[获取 Github 上的代码](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapter.zip?raw=true)

本文档介绍了 AllJoyn Z-Wave 演示的设置，该演示作为 Raspberry Pi2 映像的一部分提供在 //Build/2015 中。它将演示 Z-Wave AllJoyn 设备系统网桥 \(DSB\) 公开和控制 ZWave 设备的功能。

### 什么是 ZWave？

Z-Wave 是无线通信协议，旨在允许家庭中的设备（如照明、家庭装置）之间进行通信，以实现家庭自动化目的。

## 先决条件

1. 带有 //Build/2015 映像的 Raspberry Pi2此映像包含 Aeon Labs Z-Wave Stick 和 Z-Wave DSB 的驱动程序。 
2. <a name="AllJoyn_Z_Wave"></a>此演示需要 Z-Wave 设备和两台 Aeon Labs Z-Wave 设备： 

  • Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick 系列 2 USB 硬件保护装置
  • Aeon Labs DSC24-ZWUS 智能交换机 Z-Wave 装置模块 3。具有 Windows 10 的电脑或笔记本电脑
  • Windows 10 预览版 – 版本 10069 或更高版本
  • AllJoyn 资源管理器 \(AJX\)
  
  *[AllJoynExplorer\_1.0.0.2.zip](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.2.zip?raw=true){:target="_blank"} - 此 zip 包含 AllJoyn 资源管理器 AppX 捆绑包。
  *[AllJoyn\_Explorer\_Setup\_Guide\_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - 手有关安装和启动 AllJoyn 资源管理器的手册。
  *[AllJoyn\_Explorer\_User\_Guide\_v1.0.pdf](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} -此 pdf 包含有关如何使用 AllJoyn 资源管理器的文档

## 设置 Raspberry Pi2   

1. 将 Raspberry Pi2 连接到 LAN（通过集线器或直接通过跨越或自动 MDI-X）
2. 连接电源以启动 Raspberry Pi2
3. 验证电脑是否可以访问带有 Windows IoT 核心版观察程序的 Raspberry Pi2   
  
## 部署 ZWave DSB  

1. 在[此处](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynZWaveDemo/ZWaveAdapter.zip?raw=true)下载 ZWaveAdapter.zip 文件
2. 导航到下载了 zip 文件的文件夹。右键单击该文件以及“提取所有...”以提取到所选的文件夹。
3. 导航至提取的文件夹，并在 Visual Studio 中打开 ZWaveAdapter.sln 解决方案文件。
4. 在 Visual Studio 中打开解决方案后，请导航至解决方案资源管理器，并右键单击 ZWaveBackgroundService 项目。选择“设置为启动项目”。![set\_startup]({{site.baseurl}}/Resources/images/AllJoyn/startup_proj.png)

5. 	在主菜单栏中，依次选择“调试”-\>“ZWaveBackgroundService 属性...”
6.	按照[设置远程调试和部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#cpp)的说明进行操作

## 配对 Z-Wave 设备  

1. 注意： 不要先插入 Z-Wave USB 硬件保护装置。此外，Z-Wave 硬件保护装置和 Z-Wave 开关需紧密相邻  
2. 点击圆形按钮，将 Z-Stick 置于包含模式下。LED 灯应开始缓慢闪烁。   
3. 在 Z-Stick 进入包含模式后，插入 Z-Wave 开关（它将在连接到电源后起作用），并按“电源”按钮以将其添加至 Z-Wave 网络。控制器上的指示灯在邻近发现期间将快速闪烁，并保持不变 3 秒钟，以指示成功将设备包含到网络中。  
4. LED 灯变回缓慢闪烁后，再次点击 Z-Stick 上的按钮以关闭包含模式。  
6. 将 USB Z-Stick 插入 RPi2 中。  

设置的外观应如下图所示
 
![Rpi\_ZStick]({{site.baseurl}}/Resources/images/AllJoyn/ZStick_RPi.png)

## 通过 AllJoyn 控制 Z-Wave 开关  

让我们打开 Z-Wave 电源开关！ 我们将使用 AllJoyn 资源管理器 \(AJX\) 导航设备、对象和接口。

启动 AlljoynExplorer。AJX 应查找以下三台设备：

• ZWaveAdapter – Microsoft DSB： 这是 Z-Wave DSB • HomeID\_xxx… – Aeon Labs 智能能源开关： 这是 Z-Wave 电源开关，已与 Z-Wave 硬件保护装置配对 • HomeID\_xxx… – Aeon Labs Z-Stick S2： 这是 Z-Wave USB 硬件保护装置，选择 Aeon Labs 智能能源开关。

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
  

