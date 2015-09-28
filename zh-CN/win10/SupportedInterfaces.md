---
layout: default
title: 支持的外围接口和设备
permalink: /zh-CN/win10/SupportedInterfaces.htm
lang: zh-CN
---

##支持的外围接口和设备

Windows 10 IoT 核心版支持各种外围接口和协议。以下是已在 **Raspberry Pi 2** 和 **MinnowBoard Max** 上进行验证的设备列表：

{:.table.table-bordered}
|-----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------------------------|
| 接口 | Raspberry Pi 2 | MinnowBoard MAX | 参考外围设备 |
|-----------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------------------------|
| AllJoyn | [是][1] | [是][1] | \* [Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick 系列 2 USB 硬件保护装置][20] <br> \* [Aeon Labs DSC24-ZWUS 智能交换机 Z-Wave 装置模块][20] |
| 音频（模拟） | 是（板载 3.5 毫米立体声耳机插孔） | 否 | [Rpi2 3.5 毫米 TRRS 音频/视频插孔][34] |
| 音频（数字） | 否 | 是（通过 HDMI） | |
| 音频 \(USB\) | 是（通过 USB 适配器） | 是（通过 USB 适配器） | [Sabrent USB 外部立体声音响适配器，型号 AU EMAC][12]\[^1\] |
| 蓝牙 v4.0 | [是][31]（[LE/GATT][32]、RFCOMM、HID）通过 USB 适配器 | [是][31]（[LE/GATT][32]、RFCOMM、HID）通过 USB 适配器 | \* [微型 USB 蓝牙 CSR V4.0 适配器][13] <br> \* [微型蓝牙键盘，内置触摸板，型号： IS11-BT05][14] <br> \* [Orico 型号 A 蓝牙硬件保护装置][2]|
| 以太网 | 是 \(10/100 Mbps\) | 是 \(10/100/1000 Mbps\) | |
| GPIO | [13x GPIO][3] | [10x GPIO][4] | |
| HDMI | 是 | 是（微型 HDMI） | |
| I<sup>2</sup>C | [是][5] | [是][6] | \* [Sparkfun ADXL345 加速计板][26] <br> \* [MCP23008 8 位 I/O 端口扩展器][27] |
| 微型 SD \(SDIO\) | [是][7] | [是][8] | [通用媒体阅读器 F4U003][23] |
| SPI | [2x SPI][9] | [是][10] | \* [Sparkfun ADXL345 加速计板][28] <br> \* [单色 1.3” 128x64 OLED 图形显示][29] |
| UART（板载） | 否 | [2x UART][11] | [USB-to-TTL 适配器][25] |
| UART \(USB\) | 是（通过 USB 适配器） | 是（通过 USB 适配器） | \* [USB-to-TTL 适配器][24] <br> \* [Arduino Leonardo][33] |
| USB | 4x USB 2.0（主机） | 1x USB 2.0（主机）、1x USB 3.0（主机） | \* [Sabrent USB 2.0 软盘驱动器][19] <br> \* [Perixx Peripad-201 加纤薄 USB 键盘][21] <br> \* [Perixx Peripad-501 专业触摸板][22] <br> \* [Microsoft LifeCam HD-3000][30] |
| WiFi | 是（通过 USB 适配器） | 是（通过 USB 适配器） | [外部 USB WiFi 适配器][18] |
| HID | | | \* [Rii 微型无线键盘，型号： RT-MWK01][15] <br> \* [Xbox-360 控制器（有线）][16]\[^2\] <br> \* [Xbox-360 控制器（无线）][17]\[^2\] |

null*[GPIO]: 通用输入/输出
*[RFCOMM]: 收音机频率通信
*[HDMI]: 高清多媒体接口
*[I2C]: 内部集成电路
*[SD]: 安全数码
*[SPI]: 串行外围接口
*[UART]: 通用异步接收器/传输器
*[USB]: 通用串行总线
*[HID]: 人机接口设备

[1]: {{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm "AllJoyn 连接性"
[2]: {{site.baseurl}}/{{page.lang}}/win10/Bluetooth.htm#Bluetooth_Dongle "Orico 型号 A 蓝牙硬件保护装置"
[3]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_GPIO "Raspberry Pi 2 GPIO"
[4]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_GPIO "MinnowBoard Max GPIO"
[5]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_I2C "Raspberry Pi 2 I2C 总线"
[6]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_I2C "MinnowBoard Max I2C 总线"
[7]: {{site.baseurl}}/{{page.lang}}/win10/SetupRPI.htm#RPi2_SDcard "Raspberry Pi 2 microSD 卡"
[8]: {{site.baseurl}}/{{page.lang}}/win10/SetupMBM.htm#MBM_SDcard "MinnowBoard Max microSD 卡"
[9]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_SPI "Raspberry Pi 2 SPI 总线"
[10]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_SPI "MinnowBoard Max SPI 总线"
[11]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_UART "MinnowBoard Max UART"
[12]: http://www.sabrent.com/category/audio/AU-EMAC/ "Sabrent USB 外部立体声音响适配器，型号 AU EMAC"
[13]: http://www.amazon.com/RuiLing-Bluetooth-Adapter-Dongle-Class/dp/B00WMET36O "微型 USB 蓝牙 CSR V4.0 适配器"
[14]: http://www.newegg.com/Product/Product.aspx?Item=9SIA1GK0TS7891 "微型蓝牙键盘，内置触摸板，型号： IS11-BT05"
[15]: http://www.riitek.com/goods/detail/39.htm "Rii 微型无线键盘，型号： RT-MWK01"
[16]: http://www.xbox.com/en-US/xbox-360/accessories/controllers/wired-controller "Xbox-360 控制器（有线）"
[17]: http://www.xbox.com/en-US/xbox-360/accessories/controllers/wireless-controller "Xbox-360 控制器（无线）"
[18]: {{site.baseurl}}/{{page.lang}}/win10/SetupWiFi.htm#WiFi_Devices "外部 USB WiFi 适配器"
[19]: http://www.sabrent.com/category/accesories/SBT-UFDB/ "Sabrent USB 2.0 软盘驱动器"
[20]: {{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveTutorial.htm#AllJoyn_Z_Wave "Aeon Labs Z-Wave"
[21]: http://perixx.com/en/products/perixx-pro-16.html "Perixx Peripad-201 加纤薄 USB 键盘"
[22]: http://www.perixx.com/en/products/perixx-pro-2.html "Perixx Peripad-501 专业触摸板"
[23]: http://cache-www.belkin.com/support/dl/man_f4u003_pm00758_mediareader.pdf "通用媒体阅读器 F4U003"
[24]: {{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm#USB_TTL_Adapter "USB-to-TTL 适配器"
[25]: {{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm#MBM_UART "USB-to-TTL 适配器"
[26]: {{site.baseurl}}/{{page.lang}}/win10/samples/I2CAccelerometer.htm#I2C_Accelerometer "Sparkfun ADXL345 加速计板"
[27]: {{site.baseurl}}/{{page.lang}}/win10/samples/I2CPortExpander.htm#I2C_PortExpander "MCP23008 8 位 I/O 端口扩展器"
[28]: {{site.baseurl}}/{{page.lang}}/win10/samples/SPIAccelerometer.htm#SPI_Accelerometer "Sparkfun ADXL345 加速计板"
[29]: {{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm#SPI_Display "单色 1.3"128 x64 OLED 图形显示"
[30]: {{site.baseurl}}/{{page.lang}}/win10/samples/WebCamSample.htm#USB_WebCam "Microsoft LifeCam HD-3000"
[31]: {{site.baseurl}}/{{page.lang}}/win10/Bluetooth.htm "蓝牙支持"
[32]: {{site.baseurl}}/{{page.lang}}/win10/BLEGatt.htm "通用属性配置文件示例"
[33]: {{site.baseurl}}/{{page.lang}}/win10/samples/NodejsCylon.htm "Arduino Leonardo"
[34]: http://www.raspberrypi-spy.co.uk/2014/07/raspberry-pi-model-b-3-5mm-audiovideo-jack/ "Rpi2 3.5 毫米音频/视频插孔"

\[^1\]: 将外部 USB 声卡附加到 RPi2 会将外部音频端点（播放设备）添加到现有板载 PWM 耳机插孔。因为在重新启动时无法保证音频设备的默认顺序，所以建议应用程序枚举音频端点并确保使用正确的端点。\[^2\]： 当前由于操作系统中出现错误，所以 Xbox-360 控制器无法运行。
