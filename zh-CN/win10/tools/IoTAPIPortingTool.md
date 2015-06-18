---
layout: default
title: Windows 10 IoT Core API 移植工具
permalink: /zh-CN/win10/tools/IoTAPIPortingTool.htm
lang: zh-CN
---

#Windows 10 IoT Core API 移植工具

Windows 10 IoT Core 中是否提供你的当前 Win32 应用程序或库所依赖的 API？ 如果不提供，是否存在可使用的等效 API？ 此工具可以为你回答这些问题，并协助你将你的当前 Win32 应用程序和库迁移到 Windows IoT Core。

##用法

你可以在 `C:\Program Files (x86)\Microsoft IoT` 下找到 `IoTAPIPortingTool.exe`。通过运行 `WindowsDeveloperProgramforIoT.msi`（可在你下载此文档的下载位置找到）来安装它。

可通过运行 `C:\Program Files (x86)\Microsoft IoT\IoTAPIPortingTool.exe <path> [-os]` 使用该工具。

*  `<path>` 应提供你的 exe 和/或 dll 文件所在的目录的路径。

*  如果你未计划使用 UAP，应指定 `-os`。默认情况下，该工具针对 Windows UAP 平台验证你的二进制文件。

        NOTE: IoTAPIPortingTool.exe must be run from a Visual Studio Developer Command Prompt.

##输出

该工具将生成名为 `IoTAPIPortingTool.csv`（如果已指定操作系统则为 `IoTAPIPortingToolOS.csv`）的逗号分隔的值 \(csv\) 文件，并且摘要将在命令行上。在 Excel 中打开 `.csv` 文件来分析完整输出。
