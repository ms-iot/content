
- [存储](#Storage)
- [Pi Hats](#Pi-Hats)
- [传感器](#Sensors)
- [端口扩展器](#Port-Expanders)
- [NFC/RFID/邻近感应](#NFC)
- [其他](#OtherDevicesMisc)

### 存储介质 {\#Storage}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
-------------------------------------|-------------------|----------------------------------------------------------------------------------------------------|-------|----------------------------------------------------------------------------------------------|------------------------------------|
Samsung 32GB EVO Class 10 Micro SDHC | RPI2，MBM | 已知能够支持在 Raspberry Pi 2 和 MBM 上运行 Windows 10 IoT 核心版的 SD 卡。 | | [Amazon.com 产品页](http://www.amazon.com/gp/product/B00IVPU786) |!\[Verified\]\[MSVerified\]{:.MsVerified}
SanDisk Ultra Micro SDHC 16GB | RPI2，MBM | 已知能够支持在 Raspberry Pi 2 和 MBM 上运行 Windows 10 IoT 核心版的 SD 卡。 | | [Amazon.com 产品页](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445) |!\[Verified\]\[MSVerified\]{:.MsVerified}

### Pi Hats {\#Pi-Hats}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
Adafruit 16-Channel PWM | RPI2 | 在不增加其他 Raspberry Pi 处理开销的情况下，添加可以控制最多 16 个伺服的功能。能够执行最多 1.6KHz 的 PWM，且精度达到 12 位。 | 相当易于使用。它还可以驱动 LED。 | [Adafruit 产品页](http://www.adafruit.com/products/2327#description-anchor) <br> [Adafruit 教程](https://learn.adafruit.com/adafruit-16-channel-pwm-servo-hat-for-raspberry-pi/overview) <br> [C\# IoT 示例](https://github.com/golaat/Adafruit.Pwm)|
FEZ HAT | RPI2 | FEZ HAT 支持使用快速和轻松 \(FEZ\) 的方法将所有种类的传感器和设备连接到 Raspberry Pi。FEZ HAT 与 RPi 2 模型 B 兼容。提供整个 C\# 驱动程序以配合 Windows 10 直接使用。（通过 GHI 进行描述） | 适合结合 Azure 实验室一起使用。包括模拟和 PWM、温度和灯光传感器、多色 LED 等 | [GHI 产品页](https://www.ghielectronics.com/catalog/product/500) <br>[Azure 集成示例](http://aka.ms/iot-ctd-field-labs)<br> [开发人员指南](https://www.ghielectronics.com/docs/329/fez-hat-developers-guide) |!\[Verified\]\[MSVerified\]{:.MsVerified}
FEZ Cream | RPI2 | FEZ Cream 通过使用 .NET Gadgeteer 样式套接字，支持使用快速和轻松 \(FEZ\) 的方法将所有种类的传感器和设备连接到 Raspberry Pi。FEZ Cream 与 RPi 2 模型 B 兼容。提供整个 C\# 驱动程序以配合 Windows 10 直接使用。（通过 GHI 进行描述） | 虽然完整的 Gadgeteer 端口还在由 Microsoft 和 GHI 进行开发，但这可以让你现在就使用许多 Gadgeteer 模块/传感器。 | [GHI 产品页](https://www.ghielectronics.com/catalog/product/541) <br> [开发人员指南](https://www.ghielectronics.com/docs/331/fez-cream-developers-guide) |!\[Verified\]\[MSVerified\]{:.MsVerified}
FEZ 实用程序 | RPI2 | FEZ 实用程序通过使用板载标头，支持使用快速和轻松 \(FEZ\) 的方法将所有种类的传感器和设备连接到 Raspberry Pi。它还包括提供 PWM 输出和模拟输入所需的电路。FEZ 实用程序与 RPi 2 模型 B 兼容。提供整个 C\# 驱动程序以配合 Windows 10 直接使用。（通过 GHI 进行描述） | 包括容差为 5v 的 GPIO 引脚、14 个 PWM 输出、8 个模拟输入和 4 个 LED 以及所有的原始 PI 引脚。 | [GHI 产品页](https://www.ghielectronics.com/catalog/product/545) <br> [开发人员指南](https://www.ghielectronics.com/docs/332/fez-utility-developers-guide) |

### 传感器 {\#Sensors}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
------------------------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|------------------------------------|
DHT11 基本温度-湿度传感器 | RPI2，MBM | 超低成本的基本数字温度和湿度传感器。它使用容量湿度传感器和热敏电阻来测量周围空气，并在数据引脚上显示数字信号（无需模拟输入引脚）。（通过 Adafruit 进行描述和注释） | 它相当易于使用，但需要仔细计时才能获取数据。实际上，此传感器唯一的缺点在于，你只能每隔 2 秒从它这里获取新数据，所以在使用我们的库时，传感器读数最多维持 2 秒。 | \[GpioOneWire 示例 \(DHT11\)\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
DHT22 温度-湿度传感器 | RPI2，MBM | 超低成本的基本数字温度和湿度传感器。它使用容量湿度传感器和热敏电阻来测量周围空气，并在数据引脚上显示数字信号（无需模拟输入引脚）。（通过 Adafruit 进行描述和注释） | 它相当易于使用，但需要仔细计时才能获取数据。实际上，此传感器唯一的缺点在于，你只能每隔 2 秒从它这里获取新数据，所以在使用我们的库时，传感器读数最多维持 2 秒。 | \[GpioOneWire 示例 \(DHT11\)\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
SparkFun 三轴加速计突围 - ADXL345 | RPI2，MBM | 精简、低功耗、3 轴的 MEMS 加速计，使用最高 &plusmn;16 g 的高分辨率（13 位）测量。数字输出数据的格式设置为 16 位的二进制补码，并可通过 SPI（3 线或 4 线）或 I2C 数字接口访问。 | | \[I2C 加速计示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
Adafruit BMP280 温度和气压传感器 | RPI2 | 测量温度、气压的 Bosch 环境传感器 | &plusmn;1 hPa 绝对精度的气压和 1.0&deg;C 摄氏度精度的温度。 | \[Adafruit 初学者包\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
Adafruit TCS34725 色彩传感器 | RPI2 | 使用 IR 筛选器和白色 LED 的 RGB 色彩传感器 - TCS34725 | [Adafruit 上的产品的链接](http://www.adafruit.com/products/1334) | \[Adafruit 初学者包\] |!\[Verified\]\[MSVerified\]{:.MsVerified}

### 端口扩展器 {\#Port-Expanders}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
----------------------------------|-------------------|--------------------------------------------------------------------------------|--------------------------------------------------|------------------------------|------------------------------------|
MCP23008 8 位 I/O 端口扩展器 | RPI2，MBM | I<sup>2</sup>C 接口芯片，GPIO 端口扩展器。8 个端口，18 PDIP 程序包 | 在多个 MS-IoT 示例项目中使用 | \[I2C 端口扩展器示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
MCP23S17 16 位 I/O 端口扩展器 | RPI2，MBM | I<sup>2</sup>C 接口芯片，GPIO 端口扩展器。16 个端口，28 SPDIP 的程序包 | 有关直流马达的信息，请参阅 [Arduino 外设](#Arduino) | \[//build 2014 - Piano\] |!\[Verified\]\[MSVerified\]{:.MsVerified}

### NFC/RFID/邻近感应 {\#NFC}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
-----------------------|-------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
NXP OM5577 演示板 | RPI2 | NXP PN7120 NFC 芯片的演示板。 | 此演示板会插入 Raspberry Pi 2 中，并且 NXP 网站具有提供有关安装驱动程序 INF 和 ACPI 模式以在 Windows 10 IoT 中启用它的[安装指南 \(AN11767\)](http://www.nxp.com/documents/application_note/AN11767.pdf) 和[下载程序包](http://www.nxp.com/documents/software/SW349710.zip)。你可以使用与在手机和桌面上惯于使用的相同 Windows.Networking.Proximity API 编写跨平台应用，并且 NXP 网站下载具有可部署的示例 AppX（源代码在应用程序注释说明中）。 | [ProximityDevice WinRT 文档](https://msdn.microsoft.com/zh-cn/library/windows/apps/windows.networking.proximity.proximitydevice.aspx), \[NFC 设备驱动程序接口文档\]\(https://msdn.microsoft.com/zh-cn/library/windows/hardware/dn905575(v=vs.85).aspx)|![Verified][MSVerified]{:.MsVerified}
NXP PN547/PN548/PN7120 | RPI2，MBM | 受支持的 NXP NFC 芯片 | Windows 10 IoT 支持 NXP PN547、PN548 和 PN7120 NFC 芯片，并且最佳入门方法是使用上述 OM5577 演示板（包含 PN7120 芯片）。 | |!\[Verified\]\[MSVerified\]{:.MsVerified}

### 其他 {\#OtherDevicesMisc}

{:.table.table-bordered .devices}
部件名称/编号 | 兼容板 | 描述 | 注释 | 项目, 示例, 库 |Microsoft 验证 |
----------------------------------------------|-------------------|------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|------------------------------|------------------------------------|
单色 1.3" 128 x64 OLED 图形显示 | RPI2，MBM | 1\.3" 对角，高对比度 B/W OLED 显示。128x64 单个白色 OLED 像素，每个 OLED 均由控制器芯片打开或关闭。 | | \[SPI 屏幕示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
SN74HC595N 移位寄存器 IC | RPI2，MBM | IC 8 位移位寄存器 16 DIP | | \[移位寄存器示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
微芯片技术 ADC MCP3002-I/P | RPI2，MBM | MCP3002 10 位模拟数字转换器 | 请参阅 [Arduino 外设](#Arduino)中的 DMap 信息 | \[电位计传感器示例\]|!\[Verified\]\[MSVerified\]{:.MsVerified}
微芯片技术 ADC MCP3208-CI/P | RPI2，MBM | MCP3208 12 位模拟数字转换器 | | \[电位计传感器示例\]|!\[Verified\]\[MSVerified\]{:.MsVerified}
ADS1115 | RPI2，MBM | 超小，低功耗，16 位 ADC | 在库部分中提供的 ADC 总线提供程序库 | \[ADC 总线提供程序\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
TTL 模块串行转换器的 CP2102 USB 2.0 | RPI2，MBM | TTL UART 6PIN CP2102 模块串行转换器的 USB 2.0 | | \[串行端口示例\] |!\[Verified\]\[MSVerified\]{:.MsVerified}
PCA9685 | RPI2，MBM | 16 个通道，12 位 PWM Fm+ I2C- 总线 LED 控制器 | 在库部分中提供的 PWM 总线提供程序库 | \[PWM 总线提供程序\] |!\[Verified\]\[MSVerified\]{:.MsVerified}

