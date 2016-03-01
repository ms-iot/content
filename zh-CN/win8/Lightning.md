---
layout: default
title: Intel Galileo Gen 1 和 Gen2 Lightning 支持
permalink: /zh-cn/win8/Lightning.htm
lang: zh-cn
---

# 新 Lightning 功能
除了对 Intel Galileo Gen1 和 Gen2 的基本 Windows 支持，我们很高兴地宣布将提升这两个平台上的 I/O 性能。这些性能提升（称为 **Lightning**）表示通过 Windows Developer Program for IoT 重新设计 Windows 中引脚硬件 I/O 的用户模式/内核模式模型的体系结构。作为程序员，你以完全相同的方式使用引脚。已为你改进了响应时间。

所有模拟和数字引脚都比在没有 **Lightning** 的情况下快。

#设置说明
请按照[设置电脑](SetupPC.htm){:target="_blank"}的说明进行操作，因为 Visual Studio 扩展已进行了更新以在 Gen1 和 Gen2 上支持 Lightning。

# 此版本
* 包含适用于 Intel Galileo Gen1 和 Gen2 的单个 WIM。
* 支持在 Visual Studio 创建新项目时支持不可知地面向 Intel Galileo Gen1 和 Gen2 平台。
* 支持 Intel Galileo Gen1 和 Gen2 的数字 I/O（GPIO、I2C、SPI、UART）。
* Intel Galileo Gen1 和 Gen2 支持模拟 I/O（PWM、ADC）。
* 为 Intel Galileo Gen1 和 Gen2 支持 **Lightning**。
