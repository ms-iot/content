---
layout: default
title: 发行说明
permalink: /zh-cn/ReleaseNotes.htm
lang: zh-cn
---

#发行说明

硬件和软件的限制以及已知 Bug。</p>

##Intel Galileo Gen2 软件限制

1. PWM 尚未实现</li>
2. ADC 尚未实现</li>

##软件限制

1. `LED_BUILTIN` 常数仅在直接调用到 embprpusr.dll 功能中时才有效。
2. `millis()` 在应用程序运行时大约每 50 天滚动一次。
3. `INPUT_PULLUP` 尚未实现。
4. `strncmp()` 功能可用于 <code>\#include &lt;string.h&gt;</code>
5. `int` 表示不同 Arduino 平台上的不同位长度。若要使用按位运算保证特定行为，你应使用 inttypes.h 标头（即 `uint8_t`）中的变量类型将数据强制转换为所需的显式类型。
6. `analogReference()` 不受 Galileo 板支持。无论 IOREF 跳线的设置如何（5v 或 3.3v），模拟输入的缩放范围为 0-5 伏（产生模拟读数 0-4095）。但是，当 IOREF 跳线设置为 3.3v 位置时，模拟输入信号仅对 0-3.3 伏是安全的。
7. 除非重新启动 Galileo，否则当草图启动时 GPIO 引脚将在“最近一次的已知”操作状态下启动。
8. Wire API 不包括 <code>onReceive\(\)</code> 或 <code>onRequest\(\)</code>，因为 Galileo 不支持 I2C 从属功能。
9. 没有 USB 主机库的计划。尽管 Intel Galileo 硬件支持此功能，但未针对此版本的 Windows 计划主机 USB 堆栈。
10. 没有实现 Arduino USB 键盘和鼠标标准库的计划。
11. 当前未实现 `SoftwareSerial`。

___

##硬件限制

1. Intel Galileo Gen1： GPIO 引脚可更改的最快速度约为每 25 毫秒一次。这是由于 Galileo 上使用的 Cypress I/O 端口扩展器的速度所致。引脚 2、3 和 10 可由处理器直接驱动，约每 2 毫秒可更改。
2. CPU 体系结构不支持内核说明上的 LOCK\_ 前缀。
3. 没有 SSE 寄存器，要求此硬件的 Windows 功能无法工作。

___

##在 Galileo 上运行的处理器

* 系统进程
   * 系统
      * smss.exe

* csrss.exe
* wininit.exe
   * services.exe
      * C:\\windows\\system32\\svchost.exe -k DcomLaunch
      * C:\\windows\\system32\\svchost.exe -k RPCSS
      * C:\\windows\\system32\\svchost.exe -k netsvcs
      * C:\\windows\\System32\\svchost.exe -k LocalServiceNetworkRestricted</li>
      * C:\\windows\\system32\\svchost.exe -k LocalService
      * C:\\windows\\system32\\svchost.exe -k NetworkService
      * C:\\windows\\system32\\svchost.exe -k Bootshsvc
         * httpsrv.exe
         * ftpd.exe
         * telnetd.exe
         * mwstartnet.exe

      * C:\\windows\\system32\\svchost.exe -k CoreUI
   * lsass.exe
* csrss.exe
* winlogon.exe
* C:\\windows\\system32\\cmd.exe /K C:\\Windows\\System32\\Boot\\synctime.cmd
* C:\\Tools\\RemoteDebugger\\msvsmon.exe /silent /nostatus /nosecuritywarn /nofirewallwarn /noclrwarn
   * C:\\Tools\\RemoteDebugger\\msvsmon.exe /CHILDSERVER f8 "+:4018" {7CD1671D-D6E3-4455-8FE8-22C0AA188E15} 0x0 f4 ec e8 f0 /silent+ /servicemode-
* Galileo\_eboot.exe
* cmd.exe
