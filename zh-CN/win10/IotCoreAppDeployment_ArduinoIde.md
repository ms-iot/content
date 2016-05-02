---
layout: default
title: 远程连接的 Arduino IDE 扩展
permalink: /zh-cn/IotCoreAppDeployment_ArduinoIde.htm
lang: zh-CN
---
# 使用 Arduino IDE 创建远程连接应用

Arduino IDE 是用于创建和上载 Arduino 运行时的非常流行的工具。可以利用相同的 INO 文件和 Arduino IDE 来为 Windows 10 IoT 核心版创建远程连接应用！

* 必须安装 Visual Studio 的工具。你可以从[此处](https://go.microsoft.com/fwlink/?LinkId=691978&clcid=0x409)安装 Visual Studio。注意：请务必包含 C++ 工具，它们不再默认包含。

若要支持在 Arduino IDE 中进行 Windows 10 IoT 核心版应用部署，请按照这些步骤进行操作：

1. 在[此处](https://www.arduino.cc/en/Main/Software)下载 Arduino IDE（1.6.8 是当前受支持的唯一版本）。

2. 打开 Arduino IDE

3. 依次选择“文件”\>“首选项”

4. 将以下 URL 添加到“其他开发板管理器 URL”：https://github.com/ms-iot/iot-utilities/raw/master/IotCoreAppDeployment/ArduinoIde/package_iotcore_ide-1.6.6_index.json

5. 选择“确定”

6. 依次选择“工具”\>“开发板”\>“开发板管理器”

7. 选择“Windows 10 IoT核心版”并单击“安装”按钮

现在，你已准备好将远程连接应用上载到 Windows 10 IoT 核心版设备，就像上载到 Arduino 一样轻松。只需：

1. 根据需要更新 INO 文件。

2. 依次选择“工具”\>“开发板”\>“Windows 10 IoT 核心版”

3. 通过依次选择“工具”\>“处理器”中的 `x86` 或 `arm` 指定处理器类型。

4. 依次选择“工具”\>“程序员”\>“Windows 10”

5. 依次选择“草图”\>“上载”以部署你的应用。系统将提示你在部署期间输入设备的 IP 地址或名称。



