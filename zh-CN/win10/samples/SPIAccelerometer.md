---
layout: default
title: SPI 加速计示例
permalink: /zh-cn/win10/samples/SPIAccelerometer.htm
lang: zh-cn
---

##SPI 加速计示例

{% include VerifiedVersion.md %}

我们会将 SPI 加速计连接到你的 Raspberry Pi 2、MinnowBoard Max 或 DragonBoard 410c，并创建一个用于从中读取数据的简单应用。我们将分步演示，所以你不需要具备任何 SPI 背景知识。不过，如果你感兴趣的话，Sparkfun 提供了一个出色的[与 SPI 相关的教程](https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi){:target="_blank"}。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\Accelerometer` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 SPI 加速计连接到你的设备

你将需要以下几个组件：

* <a name="SPI_Accelerometer"></a>一块[来自 Sparkfun 的 ADXL345 加速计板](https://www.sparkfun.com/products/9836){:target="_blank"}，该板上已焊接排针

* 一块试验板和几根公母头连接线

根据自己所拥有的设备，查看以下 **Raspberry Pi 2/MinnowBoard Max** 部分：

![电子元件]({{site.baseurl}}/Resources/images/SPIAccelerometer/components.png)

####Raspberry Pi 2
如果你有一个 Raspberry Pi 2，我们需要将电源线、地线和 SPI 线接入加速计。有关 RPi2 IO 引脚的更多详细信息，请参阅 [Raspberry Pi 2 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm)。

**注意： 确保在连接电路时关闭 RPi2 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

ADXL345 试验板上有 8 个 IO 引脚，应按如下方式连接它们：

1. **GND：** 连接到 RPi2 上的地线（引脚 6）
2. **VCC：** 连接到 RPi2 上的 3.3V（引脚 1）
3. **CS：** 连接到 RPi2 上的 SPI0 CS0（引脚 24）。这是 SPI 总线的芯片选择线。
4. **INT1：** 保持不连接，我们不会用到此引脚
5. **INT2：** 保持不连接，我们不会用到此引脚
6. **SDO：** 连接到 RPi2 上的 SPI0 MISO（引脚 21）
7. **SDA：** 连接到 RPi2 上的 SPI0 MOSI（引脚 19）
8. **SCL：** 连接到 RPi2 上的 SPI0 SCLK（引脚 23）。这是 SPI 总线的时钟线。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/SPIAccelerometer/breadboard_assembled_rpi2.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![加速计示意图]({{site.baseurl}}/Resources/images/SPIAccelerometer/schematics_rpi2.png)

####MinnowBoard Max
如果你有一个 MinnowBoard Max，我们需要将电源线、地线和 SPI 线接入加速计。有关 MBM IO 引脚的更多详细信息，请参阅 [MBM 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm)。

**注意： 确保在连接电路时关闭 MBM 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

ADXL345 试验板上有 8 个 IO 引脚，应按如下方式连接它们：

1. **GND：** 连接到 MBM 上的地线（引脚 2）
2. **VCC：** 连接到 MBM 上的 3.3V（引脚 4）
3. **CS：** 连接到 MBM 上的 SPI0 CS0（引脚 5）
4. **INT1：** 保持不连接，我们不会用到此引脚
5. **INT2：** 保持不连接，我们不会用到此引脚
6. **SDO：** 连接到 RPi2 上的 SPI0 MISO（引脚 7）
7. **SDA：** 连接到 RPi2 上的 SPI0 MOSI（引脚 9）
8. **SCL：** 连接到 RPi2 上的 SPI0 SCLK（引脚 11）。这是 SPI 总线的时钟线。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/SPIAccelerometer/breadboard_assembled_mbm.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![加速计示意图]({{site.baseurl}}/Resources/images/SPIAccelerometer/schematics_mbm.png)

####DragonBoard 410c

对于 DragonBoard 410c，你将需要[电压级别的转换器突围](https://www.sparkfun.com/products/11771)。需要通过电压级别的转换器建立单板计算机与加速计的电源线、地线和 SPI 线之间的连接。

**注意： 确保在连接电路时关闭 DragonBoard 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

ADXL345 突围板上有 8 个可连接到电压级别的转换器的 IO 引脚，如下所示：

1.  **GND：** 将地线连接到 GND
2.  **VCC：** 将电源连接到 VccB
3.  **CS：** 将芯片选择连接到 B4
4.  **INT1：** 中断输出 1 _未使用_
5.  **INT2：** 中断输出 2 _未使用_
6.  **SDO：** 将串行数据输出连接到 B3
7.  **SDA：** 将串行数据输入连接到 B2
8.  **SCL：** 将串行通信时钟连接到 B1

电压级别的转换器突围板引脚按如下方式连接到 DragonBoard：

1.  **GND：** 将地线连接到引脚 40
2.  **VccA：** 将较低电源连接到引脚 35 \(1.8V\)
3.  **VccB：** 将较高电源连接到引脚 37 \(5V\)
4.  **A1** 连接到引脚 8 \(SPI0\_CLK\)
5.  **A2** 连接到引脚 14\(SPI0\_MOSI\)
6.  **A3** 连接到引脚 10\(SPI0\_MISO\)
7.  **A4** 连接到引脚 12\(SPI0\_CS\)

下图显示组装了电路的试验板的可能外观：

![DragonBoard SPI 加速计试验板]({{site.baseurl}}/Resources/images/SPIAccelerometer/breadboard_assembled_db410c.png)

电路示意图如下所示：

![DragonBoard API 加速计示意图]({{site.baseurl}}/Resources/images/SPIAccelerometer/schematics_db410c.png)

###部署和运行应用

完成所有设置后，重新打开你的设备的电源，然后在 Visual Studio 中打开示例应用。打开文件 **MainPage.xaml.cs** 并将以下行从 **Protocol.NONE** 更改为 **Protocol.SPI**：

{% highlight C# %}
public sealed partial class MainPage : Page
{
    /* Important! Change this to either Protocol.I2C or Protocol.SPI based on how your accelerometer is wired   */
    private Protocol HW_PROTOCOL = Protocol.SPI; 
    // ...
}
{% endhighlight %}  

按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。SPIAccelerometer 应用将部署并启动，并且你应该会看到加速计数据显示在屏幕上。如果你将加速计平放在一个图面上，则 Z 轴所读取的值应接近 1.000G，而 X 和 Y 轴应接近 0.000G。这些值将会小幅度波动，即使设备静止不动也是如此。这是正常现象，这是因振动和电噪音而产生的。如果你倾斜或晃动传感器，你应该能看到响应中的值出现变化。注意，此示例在 4G 模式下配置设备，因此你不可能会看到高于 4G 的 G 读数。

![SPI 加速计运行]({{site.baseurl}}/Resources/images/SPIAccelerometer/spiaccelerometer_screenshot.png)

恭喜你！ 你已连接了一个 SPI 加速计。

###我们来看看代码
此示例中的代码将执行两个主要任务：

1. 第一，此代码将初始化 SPI 总线和加速计

2. 第二，我们会按照定义的时间间隔从加速计读取相关数据并更新显示

让我们从深入了解初始化开始吧。

###初始化 SPI 总线
若要使用加速计，我们需要先初始化 SPI 总线。下面是 C\# 代码。

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.Spi;

/* Initialization for SPI accelerometer */
private async void InitSPIAccel()
{
    try {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE);
        settings.ClockFrequency = 5000000;                              /* 5MHz is the rated speed of the ADXL345 accelerometer                     */
        settings.Mode = SpiMode.Mode3;                                  /* The accelerometer expects an idle-high clock polarity, we use Mode3    
                                                                         * to set the clock polarity and phase to: CPOL = 1, CPHA = 1         
                                                                         */

        string aqs = SpiDevice.GetDeviceSelector();                     /* Get a selector string that will return all SPI controllers on the system */
        var dis = await DeviceInformation.FindAllAsync(aqs);            /* Find the SPI bus controller devices with our selector string             */
        SPIAccel = await SpiDevice.FromIdAsync(dis[0].Id, settings);    /* Create an SpiDevice with our bus controller and SPI settings             */
        if (SPIAccel == null)
        {
            Text_Status.Text = string.Format(
                "SPI Controller {0} is currently in use by " +
                "another application. Please ensure that no other applications are using SPI.",
                dis[0].Id);
            return;
        }
    }

    // ...
}
{% endhighlight %}

下面概述了所发生的情况：

* 首先，我们创建 **SpiConnectionSettings** 对象，并设置时钟速度、时钟极性和芯片选择线。

* 接下来，我们获取设备上的所有 SPI 控制器的选择器字符串，并使用它找到系统上的所有 SPI 总线控制器。

* 最后，我们从系统 \(**dis\[0\]**\) 上的第一个 SPI 控制器创建新的 **SpiDevice**，然后检查其是否可供使用。

###初始化加速计

现在我们已有 **SpiDevice** 加速计实例，这表示我们已经完成了 SPI 总线的初始化。现在，我们可以通过 SPI 写入数据，从而启动加速计。我们使用 **Write\(\)** 函数执行此操作。对于这一特定加速计，存在两个内部寄存器，我们需要先配置它们，然后才能开始使用设备： 数据格式寄存器和电源控制寄存器。

1. 我们先将 0x01 写入数据格式寄存器。此操作可将设备范围配置为 +-4G 模式。当你查阅[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}时，你将看到设备可在多种测量模式（范围从 2G 到 16G）下进行配置。较高的 G 设置可扩展测量模式的范围，但会导致分辨率降低。在这两个临界值之间，我们会选择 4G 作为合理的折衷数值。

2. 我们将 0x08 写入电源控制寄存器，这会将设备从待机状态中唤醒并开始测量加速度。同样，[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}中包含有关设备设置和功能的其他信息。

{% highlight C# %}
private async void InitSPIAccel()
{
    // ...

    /* 
     * Initialize the accelerometer:
     *
     * For this device, we create 2-byte write buffers:
     * The first byte is the register address we want to write to.
     * The second byte is the contents that we want to write to the register. 
     */
    byte[] WriteBuf_DataFormat = new byte[] { ACCEL_REG_DATA_FORMAT, 0x01 };        /* 0x01 sets range to +- 4Gs                         */
    byte[] WriteBuf_PowerControl = new byte[] { ACCEL_REG_POWER_CONTROL, 0x08 };    /* 0x08 puts the accelerometer into measurement mode */

    /* Write the register settings */
    try
    {  
        SPIAccel.Write(WriteBuf_DataFormat);
        SPIAccel.Write(WriteBuf_PowerControl);
    }
    /* If the write fails display the error and stop running */
    catch (Exception ex)
    {
        Text_Status.Text = "Failed to communicate with device: " + ex.Message;
        return;
    }

    // ...
}
{% endhighlight %}

###计时器代码
在所有初始化均完成后，我们将启动一个计时器，以定期从加速计读取相关数据。下面介绍如何将计时器设置为每 100 毫秒触发。

{% highlight C# %}
private async void InitSPIAccel()
{
    // ...

    /* Now that everything is initialized, create a timer so we read data every 100mS */
    periodicTimer = new Timer(this.TimerCallback, null, 0, 100);

    // ...
}

private void TimerCallback(object state)
{
    string xText, yText, zText;
    string statusText;
    
    /* Read and format accelerometer data */
    try
    {
        Acceleration accel = ReadAccel();
        xText = String.Format("X Axis: {0:F3}G", accel.X);
        yText = String.Format("Y Axis: {0:F3}G", accel.Y);
        zText = String.Format("Z Axis: {0:F3}G", accel.Z);
        statusText = "Status: Running";
    }
    
    // ...
}
{% endhighlight %}

###从加速计读取数据
在 SPI 总线和加速计初始化后，我们可以开始从加速计读取数据。我们的 **ReadAccel\(\)** 函数可由计时器每 100 毫秒调用一次：

{% highlight C# %}
private Acceleration ReadAccel()
{
    const int ACCEL_RES = 1024;         /* The ADXL345 has 10 bit resolution giving 1024 unique values                     */
    const int ACCEL_DYN_RANGE_G = 8;    /* The ADXL345 had a total dynamic range of 8G, since we're configuring it to +-4G */
    const int UNITS_PER_G = ACCEL_RES / ACCEL_DYN_RANGE_G;  /* Ratio of raw int values to G units                          */

    byte[] ReadBuf;                 
    byte[] RegAddrBuf;

    /* 
     * Read from the accelerometer 
     * We first write the address of the X-Axis register, then read all 3 axes into ReadBuf
     */
    switch (HW_PROTOCOL)
    {
        case Protocol.SPI:
            ReadBuf = new byte[6 + 1];      /* Read buffer of size 6 bytes (2 bytes * 3 axes) + 1 byte padding */
            RegAddrBuf = new byte[1 + 6];   /* Register address buffer of size 1 byte + 6 bytes padding        */
            /* Register address we want to read from with read and multi-byte bit set                          */
            RegAddrBuf[0] =  ACCEL_REG_X | ACCEL_SPI_RW_BIT | ACCEL_SPI_MB_BIT ;
            SPIAccel.TransferFullDuplex(RegAddrBuf, ReadBuf);
            Array.Copy(ReadBuf, 1, ReadBuf, 0, 6);  /* Discard first dummy byte from read                      */
            break;
        case Protocol.I2C:
            // ...
        default:    /* Code should never get here */
            // ...
    }
    
    // ...
    
    /* In order to get the raw 16-bit data values, we need to concatenate two 8-bit bytes for each axis */
    short AccelerationRawX = BitConverter.ToInt16(ReadBuf, 0);
    short AccelerationRawY = BitConverter.ToInt16(ReadBuf, 2);
    short AccelerationRawZ = BitConverter.ToInt16(ReadBuf, 4);

    /* Convert raw values to G's */
    Acceleration accel;
    accel.X = (double)AccelerationRawX / UNITS_PER_G;
    accel.Y = (double)AccelerationRawY / UNITS_PER_G;
    accel.Z = (double)AccelerationRawZ / UNITS_PER_G;

    return accel;
}
{% endhighlight %}
以下是具体操作方式：

* 首先，我们通过 **TransferFullDuplex\(\)** 函数从加速计读取数据。此函数在同一事务中同时执行 SPI 写入和 SPI 读取。

* 初始写入时可指定我们要从中读取的寄存器地址（在本例中为 X 轴数据寄存器）。此写入操作可确保后续的读取操作都从此寄存器地址开始。我们将通过用于表示要写入（以及填充字节）的寄存器地址的单字节式字节数组提供相关函数。我们还设置了读取和多字节位，以便加速计知道我们正在读取多个字节。

* 接下来，我们将提供一个读取缓冲区大小为 6 的函数，以便我们能通过 SPI（以及填充字节）读取 6 个字节。由于此设备支持多字节读取操作，**且** X、Y 和 Z 数据寄存器紧挨在一起，因此读取 6 个字节能一次性为我们提供所有数据。这还能确保加速度值不会在执行不同的读取操作时出现更改。

* 我们可从读取操作中获得 6 个字节数据。它们分别代表 X、Y 和 Z 数据寄存器中的相关数据。我们将数据分离出，然后传入其各自的轴，并使用 **BitConverter.ToInt16\(\)** 连接字节。

* 原始数据采用的格式为 16 位整数，其中包含来自加速计的 10 位数据。它可以采用 -512 到 511 范围之内的值。读数 -512 对应于 -4G，而 511 则对应于 +4G。若要将此格式转换为以 G 为单位，我们需要用分辨率 \(1024\) 除以原尺寸范围的比例 \(8G\)

* 现在，数值已采用 G 为单位，我们可以在屏幕上显示相关数据。每 100 毫秒重复一次此过程，以便信息可持续更新。
