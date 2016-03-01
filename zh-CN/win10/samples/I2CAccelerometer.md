---
layout: default
title: I2C 加速计示例
permalink: /zh-cn/win10/samples/I2CAccelerometer.htm
lang: zh-cn
---

##I2C 加速计示例

{% include VerifiedVersion.md %}

我们会将 I2C 加速计连接到你的 Raspberry Pi 2/MinnowBoard Max/DragonBoard，并创建一个简单应用，用于从其中读取数据。我们将分步演示，所以你不需要具备任何 I2C 背景知识。不过，如果你感兴趣的话，SparkFun 提供了一个出色的[与 I2C 相关的教程](https://learn.sparkfun.com/tutorials/i2c){:target="_blank"}。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\I2CAccelerometer` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。

###将 I2C 加速计连接到你的设备

你将需要以下几个组件：

* <a name="I2C_Accelerometer"></a>一块[来自 Sparkfun 的 ADXL345 加速计板](https://www.sparkfun.com/products/9836){:target="_blank"}，该板上已焊接排针

* 一块试验板和几根公母头连接线

* 如果你使用的是 MinnowBoard Max，你将需要一个 100 &#x2126; 电阻器（这是[已知的 I2C 硬件问题]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm)的解决方法）

根据自己所拥有的设备，查看以下 **Raspberry Pi 2/MinnowBoard Max** 部分：

![电子元件]({{site.baseurl}}/Resources/images/I2CAccelerometer/components.png)

####Raspberry Pi 2
如果你有一个 Raspberry Pi 2，我们需要将电源、地线和 I2C 线接入加速计。那些熟悉 I2C 的用户会知道通常需安装上拉式电阻器。但是，Raspberry Pi 2 的 I2C 引脚上已经有上拉式电阻器，所以我们不需要在此处添加任何其他外部上拉式电阻器。有关 RPi2 IO 引脚的更多详细信息，请参阅 [Raspberry Pi 2 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm)。

**注意： 确保在连接电路时关闭 RPi2 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

ADXL345 试验板上有 8 个 IO 引脚，应按如下方式连接它们：

1. **GND：** 连接到 RPi2 上的地线（引脚 6）
2. **VCC：** 连接到 RPi2 上的 3.3V（引脚 1）
3. **CS：** 连接到 3.3V（实际上，ADXL345 既支持 SPI 协议，也支持 I2C 协议。若要选择 I2C，应将此引脚绑定到 3.3V。[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}包含关于引脚功能的更多详细信息）
4. **INT1：** 保持不连接，我们不会用到此引脚
5. **INT2：** 保持不连接，我们不会用到此引脚
6. **SDO：** 连接到地线（在 I2C 模式下，此引脚用于选择设备地址。如果你将此引脚连接到第二台设备上的 3.3V，则可以将两个 ADXL345 连接到相同的 I2C 总线。有关详细信息，请参阅[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}）
7. **SDA：** 连接到 RPi2 上的 SDA（引脚 3）。这是 I2C 总线中的数据线。
8. **SCL：** 连接到 RPi2 上的 SCL（引脚 5）。这是 I2C 总线中的时钟线。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/I2CAccelerometer/breadboard_assembled_rpi2.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![加速计示意图]({{site.baseurl}}/Resources/images/I2CAccelerometer/schematics_rpi2.png)

####MinnowBoard MAX
如果你有一个 MinnowBoard Max，我们需要将电源、地线和 I2C 线接入加速计。那些熟悉 I2C 的用户会知道通常需安装上拉式电阻器。但是，MBM 的 IO 引脚上已经有 10K 上拉式电阻器，所以我们不需要在此处添加任何其他外部上拉式电阻器。有关 MBM IO 引脚的更多详细信息，请参阅 [MBM 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm)。

**注意： 确保在连接电路时关闭 MBM 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

ADXL345 试验板上有 8 个 IO 引脚，应按如下方式连接它们：

1. **GND：** 连接到 MBM 上的地线（引脚 2）
2. **VCC：** 连接到 MBM 上的 3.3V（引脚 4）
3. **CS：** 连接到 3.3V（实际上，ADXL345 既支持 SPI 协议，也支持 I2C 协议。若要选择 I2C，应将此引脚绑定到 3.3V。[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}包含关于引脚功能的更多详细信息）
4. **INT1：** 保持不连接，我们不会用到此引脚
5. **INT2：** 保持不连接，我们不会用到此引脚
6. **SDO：** 连接到地线（在 I2C 模式下，此引脚用于选择设备地址。如果你将此引脚连接到第二台设备上的 3.3V，则可以将两个 ADXL345 连接到相同的 I2C 总线。有关详细信息，请参阅[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf)）
7. **SDA：** 连接到 MBM 上的 SDA（引脚 15）。这是 I2C 总线中的数据线。
8. **SCL：** 通过 100 &#x2126; 电阻器连接到 MBM 上的 SCL（引脚 13）。这是 I2C 总线中的时钟线。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/I2CAccelerometer/breadboard_assembled_mbm.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![加速计示意图]({{site.baseurl}}/Resources/images/I2CAccelerometer/schematics_mbm.png)

#### DragonBoard 410C

对于 DragonBoard 410C，需要建立单板计算机与加速计的电源线、地线和 I2C 线之间的连接。那些熟悉 I2C 的用户会知道通常需安装上拉式电阻器。但是，DragonBoard 已经有了 2k&#x2126; 电阻器，因为该电阻器具有 I2C 功能。

**注意： 确保在连接电路时关闭 DragonBoard 电源。这是一个很好的做法，可降低在构建期间意外出现短路的可能性。**

你还需要一个 LM317 电压调整器和 2x 120 &#x2126; 电阻器，才能使加速计获得电源。当如试验板图所示进行配置时，该调整器将输出 2.5V，从而允许 ADXL345 开发板与 1.8V DragonBoard 410c 连接。

LM317 有 3 个引脚需要连线：

1. **ADJ：** 通过 120 &#x2126; 电阻器连接地线
2. **输出：** 通过 120 &#x2126; 电阻器连接 **ADJ**LM317 连线后，该引脚将输出 2.5V。
3. **输入：** 连接 DragonBoard 上的 5V（引脚 37）

ADXL345 试验板上有 8 个可连接到 DragonBoard 的 IO 引脚，如下所示：

1. **GND：** 连接 DragonBoard 上的地线（引脚 2）
2. **VCC：** 连接 LM317 2.5V 输出轨
3. **CS：** 连接 2.5V（实际上，ADXL345 既支持 SPI 协议，也支持 I2C 协议。若要选择 I2C，应将此引脚绑定到 2.5V。[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}包含关于引脚功能的更多详细信息）
4. **INT1：** 保持不连接，我们不会用到此引脚
5. **INT2：** 保持不连接，我们不会用到此引脚
6. **SDO：** 连接到地线（在 I2C 模式下，此引脚用于选择设备地址。如果你将此引脚连接到第二台设备上的 3.3V，则可以将两个 ADXL345 连接到相同的 I2C 总线。有关详细信息，请参阅[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf)）
7. **SDA：** 连接 DragonBoard 上的 SDA（引脚 17）。这是 I2C 总线中的数据线。
8. **SCL：** 连接 DragonBoard 上的 SCL（引脚 15）。这是 I2C 总线中的时钟线。

下面是显示组装了电路的试验板的可能外观图：

![DragonBoard I2C 加速计试验板]({{site.baseurl}}/Resources/images/I2CAccelerometer/breadboard_assembled_db410c.png)

###部署和运行应用

完成所有设置后，重新打开你的设备的电源，然后在 Visual Studio 中打开示例应用。打开文件 **MainPage.xaml.cs**，并将以下行从 **Protocol.NONE** 更改为 **Protocol.I2C**：

{% highlight C# %}
public sealed partial class MainPage : Page
{
    /* Important! Change this to either Protocol.I2C or Protocol.SPI based on how your accelerometer is wired   */
    private Protocol HW_PROTOCOL = Protocol.I2C; 
    // ...
}
{% endhighlight %}  

按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。I2CAccelerometer 应用将部署并启动，并且你应该会看到加速计数据显示在屏幕上。如果你将加速计平放在一个图面上，则 Z 轴所读取的值应接近 1.000G，而 X 和 Y 轴应接近 0.000G。这些值将会小幅度波动，即使设备静止不动也是如此。这是正常现象，这是因振动和电噪音而产生的。如果你倾斜或晃动传感器，你应该能看到响应中的值出现变化。注意，此示例在 4G 模式下配置设备，因此你不可能会看到高于 4G 的 G 读数。

![I2C 加速计运行]({{site.baseurl}}/Resources/images/I2CAccelerometer/i2caccelerometer_screenshot.png)

恭喜！ 你已连接一个 I2C 加速计。

###我们来看看代码
此示例中的代码将执行两个主要任务：

1. 第一，此代码将初始化 I2C 总线和加速计

2. 第二，我们会按照定义的时间间隔从加速计读取相关数据并更新显示

让我们从深入了解初始化开始吧。

###初始化 I2C 总线
若要使用加速计，我们需要先初始化 I2C 总线。下面是 C\# 代码。

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

/* Initialization for I2C accelerometer */
private async void InitI2CAccel()
{
    try
    {
        var settings = new I2cConnectionSettings(ACCEL_I2C_ADDR);       
        settings.BusSpeed = I2cBusSpeed.FastMode;                       /* 400KHz bus speed */

        string aqs = I2cDevice.GetDeviceSelector();                     /* Get a selector string that will return all I2C controllers on the system */
        var dis = await DeviceInformation.FindAllAsync(aqs);            /* Find the I2C bus controller devices with our selector string             */
        I2CAccel = await I2cDevice.FromIdAsync(dis[0].Id, settings);    /* Create an I2cDevice with our selected bus controller and I2C settings    */
        if (I2CAccel == null)
        {
            Text_Status.Text = string.Format(
                "Slave address {0} on I2C Controller {1} is currently in use by " +
                "another application. Please ensure that no other applications are using I2C.",
                settings.SlaveAddress,
                dis[0].Id);
            return;
        }
    }

    // ...
}
{% endhighlight %}

下面概述了所发生的情况：

* 首先，我们获取适用于设备上的所有 I2C 控制器的选择器字符串。

* 接下来，我们在系统上查找所有 I2C 总线控制器，并检查是否存在至少一个总线控制器。

* 然后，我们创建一个 **I2CConnectionSettings** 对象，其中加速计地址为“ACCEL\_I2C\_ADDR”\(0x53\)，总线速度设置为“FastMode”\(400KHz\)

* 最后，我们创建一个新 **I2cDevice**，并检查它是否可供使用。

###初始化加速计

现在我们已经有了 **I2cDevice** 加速计实例，这表示我们已经完成了 I2C 总线的初始化。现在，我们可以通过 I2C 写入数据，从而启动加速计。我们使用 **Write\(\)** 函数执行此操作。对于这一特定加速计，存在两个内部寄存器，我们需要先配置它们，然后才能开始使用设备： 数据格式寄存器和电源控制寄存器。

1. 我们先将 0x01 写入数据格式寄存器。此操作可将设备范围配置为 +-4G 模式。当你查阅[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}时，你将看到设备可在多种测量模式（范围从 2G 到 16G）下进行配置。较高的 G 设置可扩展测量模式的范围，但会导致分辨率降低。在这两个临界值之间，我们会选择 4G 作为合理的折衷数值。

2. 我们将 0x08 写入电源控制寄存器，这会将设备从待机状态中唤醒并开始测量加速度。同样，[数据表](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf){:target="_blank"}中包含有关设备设置和功能的其他信息。

{% highlight C# %}
private async void InitI2CAccel()
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
        I2CAccel.Write(WriteBuf_DataFormat);
        I2CAccel.Write(WriteBuf_PowerControl);
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
private async void InitI2CAccel()
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
在 I2C 总线和加速计初始化后，我们可以开始从加速计读取数据。我们的 **ReadAccel\(\)** 函数可由计时器每 100 毫秒调用一次：

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
            // ...
        case Protocol.I2C:
            ReadBuf = new byte[6];  /* We read 6 bytes sequentially to get all 3 two-byte axes                 */
            RegAddrBuf = new byte[] { ACCEL_REG_X }; /* Register address we want to read from                  */
            I2CAccel.WriteRead(RegAddrBuf, ReadBuf);
            break;
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

* 首先，我们通过 WriteRead\(\) 函数从加速计读取数据。顾名思义，此函数先执行一次写入操作，随后执行一次读取操作。

* 初始写入时可指定我们要从中读取的寄存器地址（在本例中为 X 轴数据寄存器）。此写入操作可确保后续的读取操作都从此寄存器地址开始。我们将通过用于表示要写入的寄存器地址的单字节式字节数组提供相关函数。

* 接下来，我们将提供一个读取缓冲区大小为 6 的函数，以便我们能通过 I2C 读取 6 个字节。由于此设备支持连续的读取操作，**且** X、 Y 和 Z 数据寄存器紧挨在一起，因此读取 6 个字节能一次性为我们提供所有数据。这还能确保加速度值不会在执行不同的读取操作时出现更改。

* 我们可从读取操作中获得 6 个字节数据。它们分别代表 X、Y 和 Z 数据寄存器中的相关数据。我们将数据分离出，然后传入其各自的轴，并使用 **BitConverter.ToInt16\(\)** 连接字节。

* 原始数据采用的格式为 16 位整数，其中包含来自加速计的 10 位数据。它可以采用 -512 到 511 范围之内的值。读数 -512 对应于 -4G，而 511 则对应于 +4G。若要将此格式转换为以 G 为单位，我们需要用分辨率 \(1024\) 除以原尺寸范围的比例 \(8G\)

* 现在，数值已采用 G 为单位，我们可以在屏幕上显示相关数据。每 100 毫秒重复一次此过程，以便信息可持续更新。
