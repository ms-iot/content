<div class="row">
    <div class="col-md-6 col-sm-12">
        <p>在本教程中，我们将创建一个简单的 LED 闪烁应用，并将 LED 连接到你的 Windows 10 IoT 核心版设备。</p>
        <p>这是一个有外设示例。 若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照<a href="{{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm">此处</a>的说明操作。</p>
        <p>另外，还请注意 GPIO API 仅在 Windows 10 IoT 核心版上可用，因此该示例无法在你的桌面上运行。</p>
      <h3>在 Visual Studio 中加载项目</h3>
        <p>你可以通过在<a href="https://github.com/ms-iot/samples/archive/develop.zip" target="_blank">此处</a>下载所有示例的 zip 并导航到 <code>samples-develop\Blinky</code> 来查找此示例的源代码。 C++ 或 C# 中都提供了示例代码，但此处的文档仅详细介绍了 C# 变体。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。</p>
      <h3>将 LED 连接到你的 Windows IoT 设备</h3>
        <p>你将需要以下几个组件：</p>
        <p>一个 220 Ω 电阻器</p>
        <p>一块试验板和几根连接线</p>
        <p>一个 LED（任何你喜欢的颜色）</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <img src="{{site.baseurl}}/Resources/images/Blinky/components.png">
    </div>
  </div>
    {% include_relative BlinkyRPIGpio.md %}
    {% include_relative AppDeploymentCS.md %}
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <p>完成所有设置后，你应可以在 Visual Studio 中按 F5。 如果有任何缺少的程序包未在设置期间安装，Visual Studio 可能会提示你立即获取它们。 Blinky 应用将在 Windows IoT 设备上部署并启动，此时你应看到 LED 与屏幕上的模拟图像同步闪烁。</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <img src="{{site.baseurl}}/Resources/images/Blinky/blinky-screenshot.png" height="400">
    </div>
  </div>
  <p>恭喜你！ 你已控制了 Windows IoT 设备上的一个 GPIO 引脚。</p>

  {% include_relative BlinkyCodeCS.md%}