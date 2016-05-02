<h3>连接到你的 Arduino</h3>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>既然所有设置均已完成，请在你选择的 Windows 10 设备上打开 Windows Remote Arduino Experience 应用程序。你应该看到如右图所示的屏幕。</p>
        <p>选择在设置你的 Arduino 时所选的连接类型。 还需要选择波特率。 最常见的配置为 115200、57600 和 9600。默认情况下，推荐的 SparkFun Bluetooth Mate 设备使用 115200。如果你不确定蓝牙设备的默认波特率，请查看设备文档。</p>
        <p>选择了正确的设置后，单击“连接”即可远程连接到你的 Arduino！</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/connection-page-wrae.png">
    </div>
</div>

<h3>远程控制你的 Arduino</h3>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>如果连接成功，将转到右侧所示的屏幕。 如果连接失败，请仔细检查以确保正确设置了所有内容并且在应用上选择了合适的连接设置。</p>
        <p>从这里，可以开始控制你的 Arduino 上的引脚。 让我们来做一个简单的示范，即远程控制已连接到 Arduino 的 LED。</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/digital-page-wrae.png">
    </div>
</div>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>现在，你只需将 LED 连接到你的 Arduino！  按右图所示设置你的开发板 - 需要 1 个 LED、2 条连接线（双公头）和一个 330 欧姆的电阻器。</p>
        <p>如果正确完成所有设置，应该能够远程切换 LED。在应用的“数字”页面上，将你所选引脚（在我们的设置中，使用数字引脚 5）旁的开关切换到输出，然后将状态开关切换到 5V。 在你通过 Windows 10 设备进行控制时，你的 LED 应该会出现一闪一闪的情形！</p>
        <p>尝试控制 Arduino 上的所有引脚 - 你可以在“模拟”页面上控制模拟引脚，而在 PWM 页面上控制数字引脚的 PWM 功能。 了解了该技术后，查看 Windows Remote Arduino 库相关教程来开始开发你自己的项目。</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/led-setup.png">
    </div>
</div>
