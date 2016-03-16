---
layout: default
title: Windows 10 IoT Core API 移植工具
permalink: /zh-cn/win10/tools/IoTAPIPortingTool.htm
lang: zh-cn
---

#Windows 10 IoT Core API 移植工具

Windows 10 IoT Core 中是否提供你的当前 Win32 应用程序或库所依赖的 API？ 如果不提供，是否存在可使用的等效 API？ 此工具可以为你回答这些问题，并协助你将你的当前 Win32 应用程序和库迁移到 Windows IoT Core。

##用法

Windows 10 IoT 核心版 API 移植工具可在 [ms-iot/iot-utilities](https://github.com/ms-iot/iot-utilities) github 存储库中找到。下载存储库 [zip](https://github.com/ms-iot/iot-utilities/archive/master.zip) 并将 IoTAPIPortingTool 文件夹复制到本地计算机。在 Visual Studio 2015 中打开 **IoTAPIPortingTool.sln** 并生成项目。这将生成 `IotAPIPortingTool.exe`。

可通过运行 `IoTAPIPortingTool.exe <path> [-os]` 使用该工具。

*  `<path>` 应提供你的 exe 和/或 dll 文件所在的目录的路径。

*  如果你不计划使用 UWP，应指定 `-os`。默认情况下，该工具针对 WindowsUWP 平台验证你的二进制文件。

        NOTE: IoTAPIPortingTool.exe must be run from a Visual Studio Developer Command Prompt.

##输出

该工具将生成名为 `IoTAPIPortingTool.csv`（如果已指定操作系统则为 `IoTAPIPortingToolOS.csv`）的逗号分隔的值 \(csv\) 文件，并且摘要将在命令行上。在 Excel 中打开 `.csv` 文件来分析完整输出。
