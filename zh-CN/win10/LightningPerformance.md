---
layout: default
title: 性能报告
permalink: /zh-cn/win10/LightningPerformance.htm
lang: zh-cn
---

##Windows IoT Lightning 性能测试

使用一个简单的 GPIO 切换应用来测试 Windows IoT Lightning 功能的 GPIO 性能。通过以尽可能快的速度切换 0 和 1 之间的 GPIO 5 来执行测试。使用 Tektronix TDS 2012C 示波器测量每种情况的切换频率。通过分析得出以下结果：

{:.table.table-bordered}
| 测试平台 | 语言 | 频率 | 测试日期 | 
| -------------------------------------   | --------------------------------- | ---------- | -------------- |
| Arduino Uno | Arduino 草图 | 75\.06 kHz | 2015 年 10 月 8 日 |
| Windows 10 IoT 核心版 TH1 | C\# | 41\.15 kHz | 2015 年 10 月 29 日 |
| Windows 10 IoT 核心版 TH2 本机堆栈 | 带有 .NET Native 工具链的 C\# | \~40 kHz | 2015 年 10 月 29 日 |
| Windows 10 IoT 核心版 TH2 本机堆栈 | 无 .NET Native 工具链的 C\# | 95\.5 kHz | 2015 年 10 月 29 日 |
| Windows 10 IoT 核心版 TH2 本机堆栈 | C++/CX | 107\.8 kHz | 2015 年 10 月 28 日 |
| Windows 10 IoT 核心版 TH2 本机堆栈 | WinJS | 17\.4 kHz | 2015 年 10 月 28 日 |
| Windows 10 IoT 核心版 TH2 Arduino 接线 | Arduino 接线 | **6.05 MHz** | 2015 年 10 月 28 日 |
| Windows 10 IoT 核心版 TH2 DMAP 堆栈 | 带有 .NET Native 工具链的 C\# | 135\.1 kHz | 2015 年 11 月 13 日 |
| Windows 10 IoT 核心版 TH2 DMAP 堆栈 | 无 .NET Native 工具链的 C\# | **1.45 MHz** | 2015 年 11 月 13 日 |
| Windows 10 IoT 核心版 TH2 DMAP 堆栈 | C++/CX | **4.71 MHz** | 2015 年 11 月 13 日 |
| Windows 10 IoT 核心版 TH2 DMAP 堆栈 | WinJS | 23\.4 kHz | 2015 年 10 月 28 日 |
| 远程 Arduino - 蓝牙 | C\# | 1\.92 kHz | 2015 年 10 月 29 日 |
| 远程 Arduino - USB | C\# | 1\.97 kHz | 2015 年 10 月 29 日 |
| Arduino 提供程序\* | C\# | 1\.96 kHz | 2015 年 11 月 13 日 |

\* Arduino 提供程序测试使用通过 USB 连接到 Arduino Uno 的 Raspberry Pi 2 完成。使用了 115200 的串行波特率。
