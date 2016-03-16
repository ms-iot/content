---
layout: default
title: 移植指南
permalink: /zh-cn/PortingGuide.htm
lang: zh-cn
---

#移植指南
将现有代码迁移到 Windows！

##AVR 和 Quark 之间的体系结构差异
___

###实时操作系统和常规操作系统
常规计算操作系统和实时操作系统之间的主要区别是在实时系统中需要“确定性的”计时行为 - belhob.wordpress.com

- [实时操作系统](http://en.wikipedia.org/wiki/Real-time_operating_system){:target="_blank"} - 计划算法保证确定性的计时（即 AVR）
- [常规操作系统](http://en.wikipedia.org/wiki/Operating_system){:target="_blank"} - 计划算法不对计时进行保证（即 Windows）

___

###微控制器和微处理器 \(CPU\)

微控制器为嵌入式应用程序设计，而微处理器则用于个人计算机或其他常规用途的应用程序。- wikipedia.org

- [微控制器](http://en.wikipedia.org/wiki/Microcontroller){:target="_blank"} - 包含处理器核心、内存和可编程的输入/输出外设（即 Atmel ATmega328）的单个集成电路上的小型计算机。
- [微处理器](http://en.wikipedia.org/wiki/Microprocessor){:target="_blank"} - 多功能、可编程设备，可将数字数据接受为输入、根据存储在内存中的指令进行处理，并将结果作为输出提供（即 Intel Quark）。

##序列

###[逻辑级别电压](http://en.wikipedia.org/wiki/Logic_level#Logic_voltage_levels){:target="_blank"}

内部使用电压级别称为“逻辑级别”，外部使用的电压级别称为“线级别”。值得一提的是，在将使用 TTL 级别的系统内部连接到 RS-232 电缆时，TTL 级别是“逻辑级别”。在将使用 3.3 V CMOS 级别的系统内部连接到 IEEE 1284 总线时，TTL 级别是“线级别”。

- CMOS
   - 低 - 0V 到 1/3Vdd
   - 高 - 2/3Vdd 到 Vdd

- TTL

   - 低 - 0V 到 0.8V</li>
   - 高 - 2V 到 5V</li>

###[RS232](http://en.wikipedia.org/wiki/RS-232){:target="_blank"}

  RS-232 标准常用于计算机串行端口。该标准定义信号的电子特征和计时、信号的意义和连接器的物理大小和引出线。当前版本的标准是数据终端设备和数据电路端接设备之间的 TIA-232-F 接口，采用串行二进制数据交换，发布于 1997 年。

___

##移植代码

###Arduino/AVR

直接端口操作

- [端口寄存器](http://www.arduino.cc/en/Reference/PortManipulation){:target="_blank"}： 端口寄存器允许你通过单个指令设置 Arduino 引脚的块，从而产生性能增益。
  - 这可以通过为位掩码中呈现的每个引脚发出等效的指令来移植。
- DDR\[B/C/D\] = pinMode\(\);
- PORT\[B/C/D\] = digitalWrite\(\);
- PIN\[B/C/D\] = digitalRead\(\);


- [SPI 寄存器](http://www.arduino.cc/en/Tutorial/SPIEEPROM){:target="_blank"}（串行外设接口的简介）<br/> 此细粒度级别的控制不是由 Windows Developer Program for IoT 提供的，并且在大部分情况下，只需使用 SPI 库即可替换此功能。

###GCC

不可移植 GCC 编译器命令/选项

- **`__atrribute__(__packed__)`** 这可通过将包属性推送到数据对齐堆栈上来替换 \[即 <code>\#pragma 包（推送，1）</code>\]，然后在定义你的结构后将其弹出 \[即 `#pragma pack(pop)</code>`\]。

   有关详细信息，请参阅 \[MSDN\]\(http://msdn.microsoft.com/zh-cn/library/vstudio/2e70t5y1(v=vs.100).aspx){:target="_blank"\)。

- **`asm volatile("nop");`** Windows 上存在相同的功能，但语法是不同的 <code>\_\_asm nop</code>。MSVC 编译器不会优化周围程序集，因此 `volatile` 无效。

   有关更深入的讨论，请查看 [StackOverflow](http://stackoverflow.com/questions/25878898/is-asm-nop-the-windows-equivalent-of-asm-volatilenop-from-gcc-compile){:target="_blank"}
