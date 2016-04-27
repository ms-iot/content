<h3> 所需内容 </h3>
运行 Windows 10 的电脑（在上一步中已准备就绪）。<br>
DragonBoard 410c<br>
12V 电源，至少 1.0A 电流。 如果计划使用多个高耗电 USB 外设，请改用电流较高的电源 (>2.0A)。<br>
HDMI 电缆和监视器<br>
USB 键盘和鼠标 - <a href="{{site.baseurl}}/{{page.lang}}/Faqs.htm#dragonboard" target="_blank">USB 是否有问题？</a><br>
逻辑级别移位器（建议）许多外围设备都需要 3.3V 或 5V 的逻辑级别电压。Dragonboard 410c 提供 1.8V 逻辑，因而将 DragonBoard 连接到这些类型的外围设备时可能需要逻辑级别移位器。一些移位器示例包括： <a href="https://www.adafruit.com/products/395" target="_blank">Adafruit 8 个通道的逻辑级别转换器</a>和 <a href="https://www.sparkfun.com/products/11771" target="_blank">SparkFun 4 个通道的电压级别转换器</a>。
我们将向你展示如何在任意示例中使用这些移位器，这些示例需要将它们用于 DragonBoard。若要查看此类示例的示例，请参阅 <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SPIAccelerometer.htm" target="_blank">SPI 加速计示例</a>的 DragonBoard 部分。 你还可以参阅 <a href="https://learn.sparkfun.com/tutorials/txb0104-level-shifter-hookup-guide?_ga=1.63563695.1225669924.1446058808" target="_blank"> SparkFun 的连接指南</a>。无需此设备即可开始使用 DragonBoard。<br>
  <h4> 注意： </h4>
  <p>与 Raspberry Pi 2 和 Minnowboard Max 不同，*无需* SD 卡即可将 Windows IoT 核心版映像加载到 DragonBoard。该映像将直接上载到开发板！</p>
  <h3> 将 DragonBoard 连接到主机电脑</h3>
  <ol class="setup-content-list">
    <div class="row">
      <div class="col-md-6 col-sm-12">
          <li>首先，我们必须启用下载模式，方法是将开发板背面的首次启动开关设置为：“USB 启动”。有关正确配置的演示，请参阅下图。</li>
      </div>
      <div class="col-md-6 col-sm-12">
        <img class="image-border" src="{{site.baseurl}}/Resources/images/SetupDB410c/dragonboard_usbboot.png">
        <p>第一个开关（共四个）设置为“开”，而另外三个开关设置为“关”。</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <li>将 USB 电缆连接到 Dragonboard 的 microUSB 端口，并将另一端连接到主机电脑上的空 USB 端口。</li>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <li>将 DragonBoard 连接到电源。</li>
      </div>
    </div>
  </ol>
<h3>将 Windows 10 IoT 核心版映像下载到 DragonBoard</h3>
    <ol class="setup-content-list">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>启动你在上一步期间安装的 DragonBoard 更新工具。</li>
        </div>
         <div class="col-md-6 col-sm-12">
          <img class="image-border" src="{{site.baseurl}}/Resources/images/SetupDB410c/DB410c_UpdateTool.png" height="200">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>该更新工具应该会检测到 DragonBoard，连接状态应显示： “已连接”。</li>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>在 DragonBoard 更新工具中，单击“浏览”按钮并找到你在 HostPC 设置过程中下载的 Win10 IoT 核心版映像文件。</li>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>
            <p>单击“程序”按钮并等待映像下载到开发板。</p>
            <p>注意： 该下载将覆盖 eMMC 内存中的所有以前内容。</p>
          </li>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>下载完成后，断开开发板的电源并将启动开关更改回“关”位置。</li>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <li>DragonBoard 现在随时可以启动到 Win10 IoT 核心版操作系统中。</li>
        </div>
      </div>
    </ol>
<h3> 首次启动 </h3>
  <ol class="setup-content-list">
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <li>将鼠标、键盘和屏幕连接到 DragonBoard 并接通电源。</li>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <li>几秒后，你应该可以看到 Win10 IoT 启动徽标，并且很快就能看到 Win10 IoT 核心版默认应用程序：</li>
      </div>
      <div class="col-md-6 col-sm-12">
        <img class="image-border" src="{{site.baseurl}}/Resources/images/SetupDB410c/DB410c_DefaultApp.jpg" height="200">
      </div>
    </div>
  </ol>
<h3> 连接到网络 </h3>
<div class="row" style="margin-left: 0">
  <div class="col-md-6 col-sm-12 col-no-padding">
    <p>DragonBoard410c 有板载 WLAN，但你也可以选择使用 USB 以太网适配器来通过以太网电缆连接到本地网络。</p>
  </div>
</div>
<h4> 连接到无线网络 </h4>
  <ol class="setup-content-list">
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <li>在 Win10 IoT 核心版默认应用程序上，单击时钟旁边的“设置”按钮。</li>
        <li>在“设置”页面上，通过左侧的菜单选择“网络和 WLAN”。</li>
        <li>DragonBoard 将自动开始扫描无线网络。</li>
        <li>在你的网络出现在列表中后，选择该网络，然后单击“连接”按钮进行连接。</li>
      </div>
    </div>
  </ol>
<h4> 使用 USB 以太网适配器 </h4>
<p>DragonBoard 支持 <a href="http://www.trendnet.com/products/proddetail.asp?status=view&prod=280_TU2-ET100" target="_blank">TRENDnet TU2-ET100</a> USB 以太网适配器。你只需使用标准的以太网电缆将适配器通过 USB 连接到本地网络。</p>
<p>尽管未对其他网络适配器进行测试，但它们也有可能与 DragonBoard 兼容。</p>
<div class="row">
  <div class="col-md-6 col-sm-12 col-no-padding">
    <li>
      按照<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">此处</a>的 PowerShell 文档使用 PowerShell 来连接到正在运行的设备。 也可按照<a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm" target="_blank">此处</a>的说明使用 SSH 来连接到设备。
    </li>
  </div>
</div>
<h3>连接到设备</h3>
<ol class="setup-content-list">
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <li>
        你可以使用 <a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> 通过你最喜爱的 Web 浏览器来连接到设备。除了高级诊断工具外，设备门户还提供了配置和设备管理功能，从而帮助你排除 Windows IoT 设备的故障并查看其实时性能。<a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">单击此处以了解如何连接到 Windows Device Portal！</a>
      </li>
    </div>
    <div class="col-md-6 col-sm-12">
      <img class="device-images" src="{{site.baseurl}}/Resources/images/deviceportal/deviceportal_small_db.png">
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <li>
        你还可以使用 PowerShell 通过命令外壳来连接到设备。按照 <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">PowerShell 文档</a>使用 PowerShell 来连接到正在运行的设备。 也可按照 <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm" target="_blank">SSH 说明</a>使用 SSH 来连接到设备。
      </li>
    </div>
    <div class="col-md-6 col-sm-12">
      <img class="device-images" src="{{site.baseurl}}/Resources/images/powershell/connection.png">
    </div>
  </div>
</ol>
<div>
  强烈建议你更新 Administrator 帐户的默认密码。<a href="{{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm" target="_blank">Windows Device Portal</a> 或 <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm" target="_blank">Powershell</a> 的相关文档中有说明。
</div>
<h3> 其他资源 </h3>
<p><a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm" target="_blank">受支持的外围接口和设备</a></p>