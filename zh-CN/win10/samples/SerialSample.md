---
layout: default
title: 串行示例
permalink: /zh-cn/win10/samples/SerialSample.htm
lang: zh-cn
---

#串行端口示例

{% include VerifiedVersion.md %}

我们将创建一个简单的应用，该应用允许通过串行接口在桌面和 IoT 设备之间通信。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm){:target="_blank"}的说明操作。

###在 Visual Studio 中加载项目

你可以在[此处](https://github.com/ms-iot/samples/tree/develop/SerialSample/){:target="_blank"}找到此示例的 C\# 和 C++ 版本。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

此应用是一个通用 Windows 应用，并且可在电脑和 IoT 设备上运行。

###连接串行连接 

有两个选项可用来连接你的开发板：

1. 使用板载 UART 控制器
2. 使用 USB-to-TTL 适配器电缆，例如[此电缆](http://www.adafruit.com/products/954){:target="_blank"}

####<a name="MBM_UART"></a>板载 UART \(MinnowBoard Max\)

MinnowBoard Max 有两个板载 UART。有关 MBM GPIO 引脚的更多详细信息，请参阅 [MBM 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm)。

* UART1 使用 GPIO 引脚 6、8、10 和 12。 
* UART2 使用 GPIO 引脚 17 和 19。 

在此示例中，我们将使用 UART2。

建立以下连接：

* 将 USB-to-TTL 电缆的 USB 端插入电脑上的 USB 端口
* 将 USB-to-TTL 电缆的 GND 线连接到 MBM 板上的引脚 1 \(GND\)
* 将 USB-to-TTL 电缆的 RX 线（白色）连接到 MBM 板上的引脚 17 \(TX\)
* 将 USB-to-TTL 电缆的 TX 线（绿色）连接到 MBM 板上的引脚 19 \(RX\)

*注意： 让 USB-to-TTL 电缆的电源线保持未连接状态。*

<img src="{{site.baseurl}}/Resources/images/SerialSample/SiLabs-UART.png">

####<a name="RPi2_UART"></a>板载 UART \(Rasperry Pi2\)

Rasperry Pi2 有一个板载 UART。有关 MBM GPIO 引脚的更多详细信息，请参阅 [Raspberry Pi 2 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPI2.htm)。

* UART0 使用 GPIO 引脚 6 \(GND\)、8 \(TX\) 和 10 \(RX\)。 

建立以下连接：

* 将 USB-to-TTL 电缆的 USB 端插入电脑上的 USB 端口
* 将 USB-to-TTL 电缆的 GND 线连接到 RPi2 板上的引脚 6 \(GND\)
* 将 USB-to-TTL 电缆的 RX 线（白色）连接到 RPi2 板上的引脚 8 \(TX\)
* 将 USB-to-TTL 电缆的 TX 线（绿色）连接到 RPi2 板上的引脚 10 \(RX\)

*注意： 让 USB-to-TTL 电缆的电源线保持未连接状态。*

<img src="{{site.baseurl}}/Resources/images/SerialSample/RPi2_UART.png">

####板载 UART \(DragonBoard 410c\)

DragonBoard 有两个板载 UART。

* UART0 使用 GPIO 引脚 3、5、7 和 9。
* UART1 使用 GPIO 引脚 11 和 13。

在此示例中，将使用 UART1。建立以下连接：

* 将 USB-to-TTL 电缆的 USB 端插入电脑上的 USB 端口
* 将 USB-to-TTL 电缆的 GND 线连接到引脚 1 \(GND\)
* 将 USB-to-TTL 电缆的 RX 线（白色）连接到引脚 11 \(UART1 TX\)
* 将 USB-to-TTL 电缆的 TX 线（绿色）连接到引脚 13 \(UART1 RX\)

_注意： 让 USB-to-TTL 电缆的电源线保持未连接状态。_

###<a name="USB_TTL_Adapter"></a>使用 USB-to-TTL 适配器

**注意： USB-to-TTL 电缆和模块以及 Silicon Labs 芯片集仅受 MinnowBoard Max 和 Raspberry Pi2 本机支持。**

你将需要：

* 1 X USB-to-TTL 模块（这便是我们即将连接到 RPI2 或 MBM 设备的模块。我们使用了[此基于 Silicon Labs CP2102 的 USB-to-TTL 模块](http://www.amazon.com/gp/product/B00LODGRV8){:target="_blank"}）

* 1 X USB-to-TTL 电缆（这将连接到我们的电脑。我们使用了[此电缆](http://www.adafruit.com/products/954){:target="_blank"}）

建立以下连接：

* 将 USB-to-TTL **电缆**的 USB 端插入电脑上的 USB 端口

* 将 USB-to-TTL **模块**的 USB 端插入 RPI2 或 MBM 设备上的 USB 端口

* 将 USB-to-TTL **模块**的 GND 引脚连接到 USB-to-TTL 电缆的 GND 线

* 将 USB-to-TTL **模块**的 RX 引脚连接到 USB-to-TTL 电缆的 TX 线（绿色）

* 将 USB-to-TTL **模块**的 TX 引脚连接到 USB-to-TTL 电缆的 RX 线（白色）

让 USB-to-TTL 电缆的电源引脚保持未连接状态。因为不会用到它。

下面是 RPi2 中已连接到 USB 端口的 USB-to-TTL 模块的图像。将该模块的 GND、TX 和 RX 引脚分别连接到已接入电脑的 USB-to-TTL 电缆的 GND 线、RX 线和 TX 线。

<img src="{{site.baseurl}}/Resources/images/SerialSample/CP2102_Connections_500.png">

###部署和启动 SerialSample 应用

现在我们的电脑与 RPi2 或 MBM 已建立连接，接下来我们将设置和部署该应用。如果你不熟悉如何在 Visual Studio 中设置目标设备和目标体系结构，请参阅[本部分]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device)获取详细信息。

1. 下载 Visual Studio 2015 [SerialSample 源项目](https://github.com/ms-iot/samples/tree/develop/SerialSample/){:target="_blank"}。 

2. 为该应用创建两个独立的副本。我们将其称为“设备副本”和“电脑副本”。

3. 打开你的电脑上的 Visual Studio 2015 的两个实例。我们将其称为“实例 A”和“实例 B”。

4. 在 VS 实例 A 中打开 SerialSample 应用的设备副本。

5. 在 VS 实例 B 中打开 SerialSample 应用的电脑副本。

6. 在 VS 实例 A 中，[配置该应用以便部署到你的 RPi2 或 MBM 设备]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device)）
	
	*\*对于 RPi2，将目标设备设置为“远程计算机”，而将目标体系结构设置为“ARM”
	
	*\*对于 MBM，将目标设备设置为“远程计算机”，而将目标体系结构设置为“x86”

7. 在 VS 实例 B 中，将目标体系结构设置为“x86”。这便是我们在电脑上运行的示例的实例。

8. 在 VS 实例 A 中，按 F5 以在你的 RPi2 或 MBM 上部署和启动该应用。

9. 在 VS 实例 B 中，按 F5 以在你的电脑上部署和启动该应用。

###使用 SerialSample 应用 

当 SerialSample 应用在电脑上启动时，将打开一个窗口，此时用户界面的外观类似于以下所示的屏幕截图。当在 RPi2 和 MBM 上启动时，SerialSample 将显示如下全屏显示的用户界面。

<img src="{{site.baseurl}}/Resources/images/SerialSample/SerialSampleRunningPC.PNG">

####选择串行设备

当 SerialSample 应用启动时，它将查找已连接到设备的所有串行设备。找到的已连接到设备的所有串行设备的设备 ID 将在 SerialSample 应用窗口的顶部列表框中列出。

通过执行以下操作，选择并连接到电脑和 RPi2 或 MBM 上的串行设备：

1. 通过单击“选择设备：”旁的顶部列表框中的设备 ID 字符串，来选择所需的串行设备。 

	* 在电脑上，该示例中连接的 USB-to-TTL 电缆的设备 ID 以“\\?\\USB\#VID\_067B”开头。
	
	* 在 MBM 上，如果将 GPIO 用于串行通信，则选择其中带有 **UART2** 的设备 ID。**UART1** 可能需要使用 CTS/RTS 信号。
    
    * 在 DragonBoard 上，选择其中带有 **QCOM24D4** 和 **UART1** 的设备。这可能是列表框中的最后一台设备（可能需要向下滚动）。
	
	* 在 MBM 和 RPi2 上，如果使用的是 USB-to-TTL 适配器模块，则选择以 **\\?\\USB\#** 开头的设备 ID。对于该示例中所使用的 USB-to-TTL 模块，设备 ID 应以“\\?\\USB\#VID\_10C4”开头。

2. 单击“连接”。

该应用将尝试连接并配置所选的串行设备。当应用成功连接到已接入的串行设备时，它将显示该串行设备的配置。默认情况下，应用将串行设备配置为 9600 波特、八个数据位、无奇偶校验位和一个停止位（无任何握手）。

<img src="{{site.baseurl}}/Resources/images/SerialSample/SerialSampleRunningPC_ConnectDevice.PNG">

####发送和接收数据

在使用可在电脑和 RPi2 或 MBM 上运行的 SerialSample 应用连接所需的串行设备后，我们可以开始通过这两台设备间的串行连接发送和接收数据。

若要将数据从一台设备发送到另一台连接的设备，请执行以下操作：

1. 选择要从中传输的设备。在传输设备上，在“写入数据”文本框中键入要发送的消息。对于我们的示例，我们在电脑上运行的 SerialSample 应用的“写入数据”文本框中键入了“Hello World!”。

2. 单击“写入”按钮。

传输设备上的应用将显示已发送的消息，并在应用显示底部的状态文本框中显示“字节已成功写入！”。

<img src="{{site.baseurl}}/Resources/images/SerialSample/SendMessageB.PNG">

正在接收消息的设备将自动在“读取数据:”窗口中显示文本。

**已知问题：**

* 当首次从 IoT 设备连接到 USB-to-TTL 设备时，如果单击 `Connect`，可能会看到错误“对象未实例化”。如果你看到此错误，则断开设备电源，然后重新为其接通电源，并刷新连接或重新部署应用。
* 如果你将多台 Silicon Labs USB-to-TTL 设备连接到你的 IoT 设备，则只能识别第一台连接的设备。若要运行此示例，只能连接一台设备
* 当将 USB-to-TTL 设备连接到 MinnowBoard Max 时，使用已通电的 USB 集线器或底部 USB 端口


###我们来看看代码

此示例代码使用 [Windows.Devices.SerialCommunication](https://msdn.microsoft.com/zh-cn/library/windows.devices.serialcommunication.aspx){:target="_blank"} 命名空间。

SerialDevice 类将用于枚举、连接、读取和写入已连接到设备的串行设备。

**注意：** SerialDevice 类仅用于（电脑、Raspberry Pi 2 和 MinnowBoard Max 上）受支持的 USB-to-TTL 设备，以及（MinnowBoard Max 上）板载 UART。

若要访问串行端口，必须将 **DeviceCapability** 添加到项目中的 **Package.appxmanifest** 文件。

你可以通过在 XML 编辑器中打开 **Package.appxmanifest** 文件（右键单击该文件 -\>“打开方式”-\>“XML\(文本\)编辑器”）并添加如下所示的功能来添加此功能：

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If 
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child 
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the 
    context menu.

{% highlight xml %}
  <Capabilities>
    <DeviceCapability Name="serialcommunication">
      <Device Id="any">
        <Function Type="name:serialPort" />
      </Device>
    </DeviceCapability>
  </Capabilities>
{% endhighlight %}

###连接到所选的串行设备

此示例应用将枚举已连接到设备的所有串行设备，并将列表显示在**列表框** ConnectDevices 中。以下代码将连接和配置所选的设备 ID 并创建 **SerialDevice** 对象。

{% highlight C# %}
private async void comPortInput_Click(object sender, RoutedEventArgs e)
{
    var selection = ConnectDevices.SelectedItems; // Get selected items from ListBox

    // ...

    DeviceInformation entry = (DeviceInformation)selection[0];         

    try
    {                
        serialPort = await SerialDevice.FromIdAsync(entry.Id);

        // ...

        // Configure serial settings
        serialPort.WriteTimeout = TimeSpan.FromMilliseconds(1000);
        serialPort.ReadTimeout = TimeSpan.FromMilliseconds(1000);                
        serialPort.BaudRate = 9600;
        serialPort.Parity = SerialParity.None;
        serialPort.StopBits = SerialStopBitCount.One;
        serialPort.DataBits = 8;

        // ...
    }
    catch (Exception ex)
    {
        // ...
    }
}
{% endhighlight %}

###在串行端口上执行读取操作

在初始化串行端口后，立刻由调用的 **Listen\(\)** 执行从串行端口读取输入的操作。我们在此示例代码中执行此操作，方法是使用 **DataReader** 对象（它会等待 **SerialDevice** 对象的 **InputStream**）来创建异步读取任务。

由于并发任务处理方式的不同，**Listen\(\)** 在 C\# 和 C++ 中的实现会有所不同：

* C\# 允许等待 **ReadAsync\(\)**。我们只需持续读取处于无限循环的在引发异常时（由取消令牌触发）中断的串行端口。

{% highlight C# %}

private async void Listen()
{
    try
    {
        if (serialPort != null)
        {
            dataReaderObject = new DataReader(serialPort.InputStream);

            // keep reading the serial input
            while (true)
            {
                await ReadAsync(ReadCancellationTokenSource.Token);
            }
        }
    }
    catch (Exception ex)
    {
        ...
    }
    finally
    {
        ...
    }
}

private async Task ReadAsync(CancellationToken cancellationToken)
{
    Task<UInt32> loadAsyncTask;

    uint ReadBufferLength = 1024;

    // If task cancellation was requested, comply
    cancellationToken.ThrowIfCancellationRequested();

    // Set InputStreamOptions to complete the asynchronous read operation when one or more bytes is available
    dataReaderObject.InputStreamOptions = InputStreamOptions.Partial;

    // Create a task object to wait for data on the serialPort.InputStream
    loadAsyncTask = dataReaderObject.LoadAsync(ReadBufferLength).AsTask(cancellationToken);

    // Launch the task and wait
    UInt32 bytesRead = await loadAsyncTask;
    if (bytesRead > 0)
    {
        rcvdText.Text = dataReaderObject.ReadString(bytesRead);
        status.Text = "bytes read successfully!";
    }            
}
{% endhighlight %}

* 由于会阻止 UI，因此 C++ 不允许在 Windows 运行时 STA（单线程单元）线程中等待 **ReadAsync\(\)**。为了可以从串行端口进行链延续读取，我们通过“递归”任务创建动态地生成重复任务 - 在延续链的末尾“递归”调用 **Listen\(\)**。“递归”调用不是真正的递归。由于每个递归都在新任务中创建，因此它不会累积堆栈。

{% highlight C++ %}

void MainPage::Listen()
{
    try
    {
        if (_serialPort != nullptr)
        {
            // calling task.wait() is not allowed in Windows Runtime STA (Single Threaded Apartment) threads due to blocking the UI.
            concurrency::create_task(ReadAsync(cancellationTokenSource->get_token()));
        }
    }
    catch (Platform::Exception ^ex)
    {
        ...
    }
}

Concurrency::task<void> MainPage::ReadAsync(Concurrency::cancellation_token cancellationToken)
{
    unsigned int _readBufferLength = 1024;
    
    return concurrency::create_task(_dataReaderObject->LoadAsync(_readBufferLength), cancellationToken).then([this](unsigned int bytesRead)
    {
        if (bytesRead > 0)
        {
            rcvdText->Text = _dataReaderObject->ReadString(bytesRead);
            status->Text = "bytes read successfully!";

            /*
            Dynamically generate repeating tasks via "recursive" task creation - "recursively" call Listen() at the end of the continuation chain.
            The "recursive" call is not true recursion. It will not accumulate stack since every recursive is made in a new task.
            */

            // start listening again after done with this chunk of incoming data
            Listen();
        }
    });
}
{% endhighlight %}

###对串行端口执行写入操作

在字节准备好发送时，我们使用 **DataWriter** 对象以异步方式写入到 **SerialDevice** 对象的 **OutputStream**。

{% highlight C# %}
private async void sendTextButton_Click(object sender, RoutedEventArgs e)
{	
    // ...
	
    // Create the DataWriter object and attach to OutputStream   
    dataWriteObject = new DataWriter(serialPort.OutputStream);

    //Launch the WriteAsync task to perform the write
    await WriteAsync();   
	
    // ..

    dataWriteObject.DetachStream();
    dataWriteObject = null;	
}

private async Task WriteAsync()
{
    Task<UInt32> storeAsyncTask;

    // ...
	
    // Load the text from the sendText input text box to the dataWriter object
    dataWriteObject.WriteString(sendText.Text);                

    // Launch an async task to complete the write operation
    storeAsyncTask = dataWriteObject.StoreAsync().AsTask();

    // ...    
}
{% endhighlight %}

###取消读取操作

你可以通过在该任务上使用 **CancellationToken** 来取消读取操作。初始化 **CancellationToken** 对象并将其以参数形式传递给读取任务。

{% highlight C# %}

private async void comPortInput_Click(object sender, RoutedEventArgs e)
{
    // ...

    // Create cancellation token object to close I/O operations when closing the device
    ReadCancellationTokenSource = new CancellationTokenSource();
	
    // ...	
}

private async void rcvdText_TextChanged(object sender, TextChangedEventArgs e)
{
    // ...

    await ReadAsync(ReadCancellationTokenSource.Token);

    // ...	
}

private async Task ReadAsync(CancellationToken cancellationToken)
{
    Task<UInt32> loadAsyncTask;

    uint ReadBufferLength = 1024;

    cancellationToken.ThrowIfCancellationRequested();
    
    // ...
	
}
 
private void CancelReadTask()
{         
    if (ReadCancellationTokenSource != null)
    {
        if (!ReadCancellationTokenSource.IsCancellationRequested)
        {
            ReadCancellationTokenSource.Cancel();
        }
    }         
}
{% endhighlight %}

###关闭设备

在关闭与设备的连接后，我们将取消所有挂起的 I/O 操作并安全地释放所有对象。

在此示例中，我们还将继续刷新已连接设备的列表。

{% highlight C# %}
private void closeDevice_Click(object sender, RoutedEventArgs e)
{
    try
    {
        CancelReadTask();
        CloseDevice();
        ListAvailablePorts(); //Refresh the list of available devices
    }
    catch (Exception ex)
    {
       // ...
    }          
}    

private void CloseDevice()
{            
    if (serialPort != null)
    {
        serialPort.Dispose();
    }    

    // ...
}    
{% endhighlight %}


总结：

* 首先，我们枚举所有已连接的串行设备并允许用户使用设备 ID 连接到所需设备

* 我们创建一个异步任务，用于读取 **SerialDevice** 对象的 **InputStream**。

* 当用户提供输入时，我们将字节写入 **SerialDevice** 对象的 **OutputStream**。

* 我们将添加使用 **CancellationToken** 取消读取任务的功能。

* 最后，在完成操作后，我们将关闭设备连接并进行清理。
