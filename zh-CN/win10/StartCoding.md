---
layout: default
title: 开始编写代码
permalink: /zh-CN/win10/StartCoding.htm
lang: zh-CN
---


<div class="row section-heading">
    <div class="col-md-6">
        <h1>文档和示例</h1>
        <p>下载代码示例以在设备上开始使用 Windows。此外，阅读文档可帮助你使用有助于开发的工具和资源。</p>
        <br/>
        <h4>是否已设置环境？</h4>
        <p>假设你已经<a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">设置环境</a>、拥有正常运行的 Visual Studio，并且拥有运行 Windows IoT 核心版（MinnowBoard Max 或 Raspberry Pi 2）的设备。</p>
        <br/>
        <h4>问题/建议</h4>
        <p>请记住，如需帮助和建议，请尽管<a href="{{site.baseurl}}/{{page.lang}}/Community.htm#contact">与我们联系</a>！</p>
		<br/>
		<h4>如何下载这些示例</h4>
		<p>下载这些示例的最简单方法是，通过单击<a href="https://github.com/ms-iot/samples">此处</a>导航到 GitHub repo ms-iot/samples，然后在右侧菜单上单击“下载 ZIP”按钮。下载文件并在本地解压缩该文件后，将能够看到所有示例。</p>
    </div>
    <div class="col-md-6">
        <div class="downloads-image"></div>
    </div>
</div>
<div class="row section-heading">
    <div role="tabpanel">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#first" aria-controls="first" role="tab" data-toggle="tab"><h3>文档和教程</h3></a></li>
            <li role="presentation"><a href="#second" aria-controls="second" role="tab" data-toggle="tab"><h3>示例</h3></a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="first">
               <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>设备上的命令行实用工具</h4>
                        <p>设备上的一组可用工具，用于帮助你配置大量选项</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/CommandLineUtils.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Windows 10 IoT 核心版移植工具</h4>
                        <p>用于帮助将现有 Win32 和 Windows CE 应用程序移植到 Windows 10 IoT 核心版的工具</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/IoTAPIPortingTool.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>使用 PowerShell</h4>
                        <p>允许远程管理和配置，以便你可以远程配置和管理任何 Windows IoT 核心版设备</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm">了解详细信息</a>
                    </div>
					<div class="col-md-3">
						<h4>使用 SSH</h4>
						<p>允许通过 SSH 远程管理和配置 Windows IoT 核心版设备</p>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm">了解详细信息</a>
					</div>
                </div>
                <div class="row section-heading">
					<div class="col-md-3">
                        <h4>硬件引脚映射</h4>
                        <p>GPIO、SPI 和 I2C 引出线和接口信息</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm">Raspberry Pi 2 引出线</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm">MinnowBoard Max 引出线</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>AllJoyn 连接性</h4>
                        <p>了解有关 AllJoyn 的详细信息并使用 Windows 10 IoT 核心版探索 AllJoyn 设备系统网桥的功能</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>不可用的通用 API</h4>
                        <p>Windows IoT 核心版现处于开发阶段。下面是尚未在我们的平台上实现的 UWP API</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/UnavailableApis.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>支持的外围接口和设备</h4>
                        <p>查找受支持的 Window 10 IoT 核心版设备的外围接口和协议的列表</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm">了解详细信息</a>
                    </div>
                </div>
                <div class="row section-heading">
					<div class="col-md-3">
                        <h4>Visual Studio 应用部署</h4>
                        <p>在 Windows 10 IoT 核心版设备上使用 Visual Studio 部署和调试应用程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm">了解详细信息</a>
                    </div>
				    <div class="col-md-3">
                        <h4>使用 WINDBG</h4>
                        <p>使用要调试的 WINDBG</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/Windbg.htm">了解详细信息</a>
                    </div>
					<div class="col-md-3">
                        <h4>术语表</h4>
                        <p>常用的短语及其含义列表</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/Glossary.htm">了解详细信息</a>
                    </div>
					<div class="col-md-3">
                        <h4>基于 Web 的设备管理</h4>
                        <p>从 Web 获取关于你的计算机的高级诊断信息</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm">了解详细信息</a>
                    </div>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>有外设和无外设设备</h4>
                        <p>Windows IoT 核心版可处于有外设模式下，也可处于无外设模式下。区别在于是否存在任何形式的 UI。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>使用 FTP 访问文件</h4>
                        <p>使用 FTP 访问设备上的文件</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/FTP.htm">了解详细信息</a>
                    </div>
					<div class="col-md-3">
                        <h4>使用 Windows 文件共享访问文件</h4>
                        <p>使用 Windows 文件共享访问设备上的文件</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SMB.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>WiFi 连接性</h4>
                        <p>在 Windows IoT 核心版设备上设置和配置 WiFi</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/SetupWiFi.htm">了解详细信息</a>
                    </div>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>蓝牙支持</h4>
                        <p>Windows IoT 核心版蓝牙支持信息</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/Bluetooth.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <!-- Placeholder for spacing -->
                    </div>
                    <div class="col-md-3">
                        <!-- Placeholder for spacing -->
                    </div>
                    <div class="col-md-3">
                        <!-- Placeholder for spacing -->
                    </div>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="second">
                <div class="row section-heading">
                    <h2>Windows 10 IoT 核心版</h2>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Hello, World!</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上运行的“Hello World”应用程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm">Hello World (C#)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/Python.htm">Hello World (Python)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/NodejsWU.htm">Hello World (Node.js)</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>Hello Blinky（无外设应用）</h4>
                        <p>创建不带 UI 的应用，该应用可在运行 Windows 10 IoT 核心版的设备上切换 LED 灯</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyHeadless.htm">Blinky (C#)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PythonBlinky.htm">Blinky (Python)</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>UI Blinky 应用</h4>
                        <p>创建基于 UI 的应用，该应用可在运行 Windows 10 IoT 核心版的设备上切换 LED 灯</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm">UI Blinky (C#/C++)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Webserver</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上控制 LED 灯的 Webserver 应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/BlinkyWebServer.htm">Webserver Blinky (C#)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PythonBlinkyServer.htm">Webserver Blinky (Python)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/NodejsWUBlinky.htm">Webserver Blinky (Node.js)</a><br>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>控制台应用</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上监视内存使用情况的控制台应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/ConsoleApp.htm">控制台应用 (C++)</a><br>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/Nodejs.htm">控制台应用 (Node.js)</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>I2C/SPI 加速计</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上利用 I2C 或 SPI 的应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/I2CAccelerometer.htm">I2C 加速计 (C#)</a><br>
						<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SPIAccelerometer.htm">SPI 加速计 (C#)</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>SPI 显示器</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上使用 SPI 的应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm">SPI 显示器 (C#)</a>
                    </div>
					<div class="col-md-3">
                        <h4>AllJoyn 连接性</h4>
                        <p>了解有关 AllJoyn 的详细信息并使用 Windows 10 IoT 核心版探索 AllJoyn 设备系统网桥的功能</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm">了解详细信息</a>
                    </div>
                </div>

                <div class="row section-heading">
					<div class="col-md-3">
                        <h4>驱动程序示例</h4>
                        <p>在运行 Windows 10 IoT 核心版的设备上创建通用驱动程序并与之交互</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/DriverLab.htm">驱动程序示例 (C++)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>I2C 端口扩展器（RPi2 基本工具包实验室）</h4>
                        <p>Raspberry Pi 2 基本工具包实验室 - 创建使用 Raspberry Pi 2 I2C 总线与端口扩展器进行通信的应用。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/I2CPortExpander.htm">I2C 端口扩展器 (C#)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>串行输入、并行输出移位寄存器（RPi2 基本工具包实验室）</h4>
                        <p>RPi2 基本工具包实验室 - 创建使用 Raspberry Pi 2 控制使用串行输入、并行输出移位寄存器的 LED 灯的应用。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/ShiftRegisterSample.htm">移位寄存器 (C#)</a>
                    </div>
                   <div class="col-md-3">
                        <h4>RGB LED（RPi2 基本工具包实验室）</h4>
                        <p>Raspberry Pi 2 基本工具包实验室 - 创建使用 Raspberry Pi 2 切换 RGB LED 灯的应用。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/RGBLED.htm">RGB LED (C#)</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>“推送”按钮（RPi2 基本工具包实验室）</h4>
                        <p>Raspberry Pi 2 基本工具包实验室 - 创建使用 Raspberry Pi 2 读取“推送”按钮状态和控制 LED 灯的应用。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PushButton.htm">“推送”按钮 (C#)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>电位计传感器示例（RPi2 基本工具包实验室）</h4>
                        <p>Raspberry Pi 2 基本工具包实验室 - 通过 ADC 转换器将模拟传感器连接到 RaspBerry Pi 以及通过监视器和 LED 灯显示数字输出数据 </p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm">电位计传感器示例 (C#)</a>
                    </div>
                   <div class="col-md-3">
                        <h4>GpioTestTool（控制台）</h4>
                        <p>此简单命令行实用工具显示了如何从标准 C++ 使用 Gpio WinRT API。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/GpioTestTool.htm">GpioTestTool (C++)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>I2cTestTool（控制台）</h4>
                        <p>此简单实用工具显示了如何在命令行程序中使用 C++/CX。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/I2cTestTool.htm">I2cTestTool (C++)</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>SpiTestTool（控制台）</h4>
                        <p>在命令行上从 SPI 设备进行写入和读取。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SpiTestTool.htm">SpiTestTool (C++)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Express Node.js 应用 (UWP)</h4>
                        <p>创建可在运行 Windows 10 IoT 核心版的设备上运行的 Express Node.js 应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/NodejsWUExpress.htm">Express (Node.js)</a>
                    </div>
                    <div class="col-md-3">
                         <h4>数字签名示例</h4>
                        <p>展示了在 Windows 10 IoT 核心版上运行的数字签名应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/DigitalSignage.htm">DigitalSignageUWP (C#)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>串行 UART 示例（Windows 通用）</h4>
                        <p>创建用于在 Windows IoT 核心版上读取和写入 UART 接口的应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm">SerialSample (C#/C++)</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>USB Web 相机示例（Windows 通用）</h4>
                        <p>创建用于在 Windows IoT 核心版上使用 USB Web 相机拍摄照片、记录视频和音频的应用</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/WebCamSample.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Cylon Node.js 应用（控制台）</h4>
                        <p>使用在具有 Windows 10 IoT 核心版的 RaspBerry Pi 2 上运行的 Cylon Node.js 应用控制 Arduino</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/NodejsCylon.htm">Cylon (Node.js)</a>
                    </div>
                    <div class="col-md-3">
                        <h4>低耗电 Bluetooth GATT（Windows 通用）</h4>
                        <p> 了解如何与 Windows 10 IoT 核心版上的低耗电 Bluetooth 设备交互。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm">Bluetooth GATT (C#)</a><br>
                    </div>
                    <div class="col-md-3">
                        <h4>IoT 浏览器示例（Windows 通用）</h4>
                        <p> 了解如何创建适用于 Windows 10 IoT 核心版的简单 Web 浏览器。</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/IoTBrowser.htm">IoT 浏览器 (C#)</a><br>
                    </div>
                </div>

                <div class="row section-heading">
                    <h2>以前版本的 Windows</h2>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 Hello Blinky</h4>
                        <p>可在诸如 Intel Galileo 的设备上运行的 Windows IoT 平台</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/HelloBlinky.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 TX/RX</h4>
                        <p>可用于创建出色 IoT 应用的先进 IDE、工具和服务</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/TXRX.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 UART</h4>
                        <p>提供集成开发环境，用于创建适用于运行 Windows 8.1 的设备的高效优质驱动程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/UART.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 RGB 像素</h4>
                        <p>提供集成开发环境，用于创建适用于运行 Windows 8.1 的设备的高效优质驱动程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/RGBPixel.htm">了解详细信息</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的天气屏蔽传感器</h4>
                        <p>可在诸如 Intel Galileo 的设备上运行的 Windows IoT 平台</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/WeatherShieldSensors.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的使用 http 的 OneNote API</h4>
                        <p>可用于创建出色 IoT 应用的先进 IDE、工具和服务</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/TODO_Sample.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 Servo</h4>
                        <p>提供集成开发环境，用于创建适用于运行 Windows 8.1 的设备的高效优质驱动程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/Servo.htm">了解详细信息</a>
                    </div>
                    <div class="col-md-3">
                        <h4>适用于 Galileo 的 Phidget 传感器</h4>
                        <p>提供集成开发环境，用于创建适用于运行 Windows 8.1 的设备的高效优质驱动程序</p>
                        <a href="{{site.baseurl}}/{{page.lang}}/win8/samples/PhidgetsSensors.htm">了解详细信息</a>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
