<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>在本项目中，我们将使用 Windows Remote Arduino 打开和关闭 LED。这是一个简单示例，但将显示该库可为你提供的用于创建更多高级项目的功能。开始吧！</p>
    </div>
</div>
<h3>硬件</h3>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>你始终可以使用 USB 连接开始操作，但让我们介绍蓝牙设备和 LED 的简单连接，我们将使用 Windows Remote Arduino 库通过蓝牙打开和关闭该 LED！</p>
    </div>
</div>
<h3>组成部分</h3>
<div class="row">
    <div class="col-md-12 col-xs-24">
        <p>你需要以下组成部分：</p>
        <p>一个 Arduino （此处所示的 Uno），如上一步中进行的设置。</p>
        <p>一台蓝牙设备（此处所示的 <a href="https://www.sparkfun.com/products/12576" target="_blank">Sparkfun Mate Silver</a>）或一个标准 A 到标准 B 的 USB 电缆</p>
        <p>一块试验板</p>
        <p>一个 330Ω 电阻器</p>
        <p>一个 LED</p>
        <p>一些双公头连接线</p>
    </div>
    <div class="col-md-12 col-xs-24">
        <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/parts.JPG">
    </div>
</div>

<h3> 设置 </h3>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>本部分将介绍如何连接蓝牙设备和 LED，以便使用 Windows Remote Arduino 切换 LED。如果你偏好使用 USB 连接，可以跳过有关蓝牙设置的任何步骤！</p>
    </div>
</div>
<ol class="setup-content-list">
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>在 Arduino 上，将试验板上的电源轨和地轨分别连接到 5V 和 GND 引脚。使用颜色编码电线（红色和黑色）将使跟踪电源连接更容易。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step01.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>后续步骤涉及设置 Arduino 的蓝牙功能。在试验板上插入你的蓝牙设备，并在试验板上将 VCC 和 GND 引脚分别连接到电源轨和地轨。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step02.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>将蓝牙设备上的 TX-0 引脚连接到 Arduino 上的 RX 引脚。同样，将蓝牙设备上的 RX-1 引脚连接到 Arduino 上的 TX 引脚。 如果你的 Arduino 具有多个 RX 和 TX 引脚，请将 TX-0 蓝牙引脚连接到 RX0 Arduino 引脚，并将 RX-1 蓝牙引脚连接到 TX0 Arduino 引脚。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step03.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>请注意图像中的黄色电线从蓝牙设备的传输引脚转到 Arduino 的接收引脚，对于橙色电线则相反。此步骤对蓝牙设备和 Arduino 之间建立串行通信非常重要，从而允许从一台设备传输的消息由其他设备接收。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step03_2.JPG">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step03_3.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>请确保你的代码在建立此连接之前已在 Arduino 上上载。Arduino Uno 使用相同的串行（TX 和 RX）引脚用于对设备进行刷机，这将在另一台设备连接到这些串行引脚时阻止任何代码上载到它。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>将 LED 添加到试验板。请注意较长（或弯曲）的腿是阳极（正值），较短的腿是阴极（负值）。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step04.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>使用 330Ω 电阻器将 LED 的阴极连接到试验板的地轨。如图所示，330Ω 电阻器带有橙色、棕色、金色条纹。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step05.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>将 LED 的阳极连接到 Arduino 上的任何数字 I/O 引脚 - 你的选择将反映在代码中。我们在示例中使用引脚 5。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/step06.JPG">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>你的安装程序现在已准备好！ 它应该类似于下图所示的安装程序。同样，如果你喜欢使用 USB，则可能没有在此处显示的串行线连接。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/final.JPG">
        </div>
    </div>
</ol>

<h4>软件</h4>
<p>将你的硬件组合在一起后，即可远程控制你的 Arduino！  如果你在此教程的“设置你的电脑”部分上选择选项 1（意味着你已从应用商店中下载我们的应用），你现在可以在准备好的 Windows 10 设备上打开该应用。 按照“连接”页上的提示查找 Arduino，并开始远程控制你的引脚！</p>

<p>如果你在“设置你的电脑”页上选择选项 2 或选项 3，你需要对你之前开始生成的代码解决方案进行一些更多的更改。 继续到下一部分来进行相应的更改。</p>

<h3>代码</h3>
<ol class="setup-content-list">
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li> 现在，一切准备就绪，让我们来看一些代码！  我已按照设置指南中的步骤设置了一个称为 RemoteBlinky 的项目 -  你可以在你之前设置的解决方案顶部直接开始编码。在下面的屏幕截图中，你将会看到代码隐藏文件 MainPage.xaml.cs，它只创建蓝牙连接对象并将其传递到构造函数中的 RemoteDevice 类。你将看到我已在此示例中指定我的设备名称。构建你的对象之前，你还可以通过调用 BluetoothSerial（和 USBSerial）类中的静态 <code>.listAvailableDevicesAsync()</code> 函数枚举可用设备。 看一下下面的代码，然后开始手动传输所需的新增内容。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/project00.png">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <ul>
                <li>
                    <p><b>针对 USB 的注意事项：</b><code>USBSerial</code> 具有许多可用于指定设备的选项。在构造函数中，你可以提供你的设备的 VID 和 PID、仅提供 VID 或提供一个 <code>DeviceInformation</code> 对象（从上面提到的 <code>listAvailableDevicesAsync</code> 函数中获取）。同样，<code>BluetoothSerial</code> 允许你提供设备 ID（作为字符串）、设备名称（也是字符串）或 <code>DeviceInformation</code> 对象。</p>

                    <p>可以通过执行以下步骤获取你的 USB 设备的 VID 和 PID 组合：</p>
                    <ul>
                        <li>通过控制面板，或者按 <i>Windows + Pause</i> 键，然后选择左侧的“设备管理器”<i></i>链接来打开设备管理器。</li>
                        <li>展开“端口(COM 和 LPT)”<i></i>菜单</li>
                        <li>右键单击“Arduino 设备”并选择“属性”</li>
                        <li>在“详细信息”<i></i>选项卡上，从下拉菜单中选择“硬件 ID”<i></i>。</li>
                        <li>你可以在“值”<i></i>框中看到多个项，但任何项都有匹配的 PID 和 VID。</li>
                        <li>这些项将具有格式“USB\VID_****&amp;PID_****”，其中“****”是数字 ID 值。</li>
                        <li>你可以只放入数字，或者还包含“VID_”来保证你正确地标识设备。<br/></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col-md-12 col-xs-24">
             <p>例如： <code>USBSerial usb = new USBSerial( "VID_2341", "PID_0043" );</code><br/>
            保证**仅**适用于以下硬件设备：</p>
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/vidpid.png">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>接下来，我会将回调函数添加到 BluetoothSerial 对象上的 ConnectionEstablished 事件。在连接蓝牙设备时，将会自动调用此函数。你将注意到此时我尚未在该函数中实现任何操作。最后，调用连接对象上的 <code>.begin()</code> 来告诉它进行连接。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/project01.png">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <ul>
                <li> <b>有关 USB/蓝牙的波特率的说明：</b> 当在串行引脚 0 和 1 上设置蓝牙设备时，某些硬件设置可能需要其他注意事项。

                <p>StandardFirmata 使用串行线或通过 USB 与蓝牙设备进行连接。默认情况下，它使用的波特率为 57600 bps。根据蓝牙设备的配置，你可能需要修改该速率。可在 <code>setup</code> 方法中找到它，如下所示：</p>

                <p><code>Firmata.begin(57600);</code></p>

                <p>只需更改 <code>begin</code> 参数即可与你的蓝牙设备的配置相匹配。最常见的配置为 115200、57600 和 9600。默认情况下，推荐的 SparkFun Bluetooth Mate 设备使用 115200。如果你不确定蓝牙设备的默认波特率，请查看设备文档。</p>

               <p>许多 Arduino 设备（例如 Leonardo 和 Yun）针对引脚 0 和 1 上的串行通信使用 <code>Serial1</code>（而不仅仅是 <code>Serial</code>）。如果你使用的是其中一台设备，你将需要更改串行初始化过程。你将希望删除行 <code>Firmata.begin(57600);</code> 并将其替换为下面的代码：</p>
                {% highlight C# %}
                    Serial1.begin( 57600 ); //or your baud rate here, it will be 115200 if using the Bluetooth Mate Silver or Gold
                    while( !Serial1 );
                    Firmata.begin( Serial1 );
                {% endhighlight %}
                </li>
                <li>
                    <p><b>针对 USB 的注意事项：</b> USBSerial 类仍有你可订阅的 ConnectionEstablished 事件。它将始终在正确的时间在这两个类中调用，以便你能够在任一情况下重复使用你的代码！</p>

                    <p>但是，请注意在进行任何连接尝试之前，必须调用 <code>.begin()</code> 函数。<code>.begin()</code> 函数的参数对蓝牙<b>不重要</b>，但如果连接到 Arduino 设备，则必须使用 <code>SerialConfig.SERIAL_8N1</code> 作为第二个参数！ 无论你使用哪种连接类型，该示例的其余部分都将完全相同地工作。</p>
                </li>
            </ul>
        </div>
        <div class="col-md-12 col-xs-24">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>跳转到 MainPage.xaml 文件，方法是在解决方案资源管理器中右键单击 MainPage.xaml 并选择“查看设计器”- XAML 代码将显示在“设计器”视图旁边。 我们现在将创建用于打开和关闭 LED 的按钮。你会注意到我已将按钮回调添加到 <code>Click</code> 事件并将 <code>IsEnabled</code> 属性设置为 false，你会在下一步看到原因！</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/project02.png">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li> 我已在此步骤中实现了三个函数。首先，<code>OnConnectionEstablished</code> 函数现在启用 UI 线程上的按钮！ 因为发生此操作通常要花费数秒钟，所以这可保证仅在蓝牙连接准备就绪时启用这些按钮。</li>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>我还在按钮回调函数 <code>OnButton_Click</code> 和 <code>OffButton_Click</code> 中设置了 <code>.digitalWrite()</code> 调用</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/project04.png">
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 col-xs-24">
            <li>生成！ 使用下图中所示的设置来运行你在 Windows 设备上编写的应用。</li>
        </div>
        <div class="col-md-12 col-xs-24">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/screenshot.png">
        </div>
    </div>
</ol>
<ul class="setup-content-list">
    <div class="row">
        <div class="col-md-12 col-xs-24 col-no-padding">
            <li>在建立连接时将启用你的按钮，而且你可以自由地随意打开和关闭你的 LED！ 当在 Windows 10 电脑上运行应用时，其外观将如下图所示。</li>
        </div>
        <div class="col-md-12 col-xs-24 col-no-padding">
            <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/regularstart.PNG">
        </div>
    </div>
</ul>

<h3> 部署到 Windows Phone </h3>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>你还可以将代码部署到另一台 Windows 10 设备，并在该设备上使用相同的功能。 为了获取在 Windows Phone 上运行的代码，请使用 microUSB 线将你的手机插入到部署电脑（你用于编写上述代码的电脑）中。 在 Visual Studio 中将部署目标设置为“设备”，并将体系结构设置为“ARM”。 可以在下图中看到此部署的正确设置。</p>
    </div>
    <div class="col-md-12 col-xs-24">
         <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/devicedeploy.PNG">
    </div>
</div>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>当你进行生成和部署时，你应看到以下在你的手机上运行的应用。</p>
    </div>
    <div class="col-md-12 col-xs-24">
         <img src="{{site.baseurl}}/Resources/images/remote-wiring/samples/basic/screenshot.png">
    </div>
</div>
<p></p>
<p>我们真切希望你享受复制此项目并以它为基准创建一组不可思议的新“制造商”项目的过程！</p>
