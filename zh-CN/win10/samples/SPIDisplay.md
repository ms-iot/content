---
layout: default
title: SPI 显示器示例
permalink: /zh-cn/win10/samples/SPIDisplay.htm
lang: zh-cn
---

##SPI 屏幕示例

{% include VerifiedVersion.md %}

在本示例中，我们会将一个基于 SPI 的 [OLED 屏幕](http://www.adafruit.com/product/938){:target="_blank"}连接到 Raspberry Pi 2、MinnowBoard Max 或 DragonBoard 410c。然后，我们将创建一个应用，以便于将文本行写入到该屏幕。因为已提供分步说明，所以无需具备任何 SPI 背景知识。但是，如果你希望了解详细信息，Sparkfun 提供了一个出色的[与 SPI 相关的教程](https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi){:target="_blank"}。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

###在 Visual Studio 中加载项目

你可以通过在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载所有示例的 zip 并导航到 `samples-develop\SPIDisplay` 来查找此示例的源代码。在磁盘上创建文件夹的副本，然后从 Visual Studio 中打开项目。请注意，此应用需要使用一台带有物理 SPI 端口的设备，否则它在仿真环境中运行时将不起作用。

###将 SPI 显示器连接到你的设备

首先，我们需要将显示器连接到你的设备。你将需要以下几个组件：

* <a name="SPI_Display"></a>一台 Adafruit 的[单色 1.3" 128 x64 OLED 图形显示器](http://www.adafruit.com/product/938){:target="_blank"}，且其上已焊接排针

* 一块试验板以及多根公母头连接线（Raspberry Pi 2 或 MinnowBoard Max）或双公头连接线 \(DragonBoard 410c\)

* <a name="SPI_Display"></a>如果使用的是 DragonBoard 410c，还需要 Adafruit 的 [8 通道双向逻辑电平转换器](http://www.adafruit.com/products/395)（其上已焊接排针）

根据自己所拥有的设备，查看以下 **Raspberry Pi 2、MinnowBoard Max 或 DragonBoard 410c** 部分：

![电子元件]({{site.baseurl}}/Resources/images/SPIDisplay/components.png)

####Raspberry Pi 2
对于 Raspberry Pi 2，我们需要将电源、地线、SPI 和多个 GPIO 引脚接入 OLED 显示器。有关 Raspberry Pi 2 引脚的其他信息，请访问 [Raspberry Pi 2 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm)

**注意： 确保在连接电路时关闭 RPi2 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

OLED 显示器上具有 8 个 IO 引脚，应按如下方式连接它们：

1. **DATA：** 连接到 RPi2 上的 MOSI（引脚 19）。这是 SPI 主数据输出线。
2. **CLK：** 连接到 RPi2 上的 SCLK（引脚 23）。这是 SPI 时钟线。
3. **SA0/DC：** 连接到 RPi2 上的 GPIO 22（引脚 15）。这是显示器的数据/命令线。（有关显示器引脚功能的详细信息，请参阅[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}）
4. **RST：** 连接到 RPi2 上的 GPIO 23（引脚 16）。这是显示器的硬件重置线。（有关显示器引脚功能的详细信息，请参阅[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}）
5. **CS：** 连接到 RPi2 上的 CE0（引脚 24）。这是 SPI 芯片选择线。
6. **3V3：** 保持不连接。显示器具有其自己的板载电源调节器，可提供 3.3V 电源
7. **VIN：** 连接 RPi2 上的 5V（引脚 2）。
8. **GND：** 连接到 RPi2 上的地线（引脚 6）。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/SPIDisplay/breadboard_assembled_rpi2.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![SPI 电路原理图]({{site.baseurl}}/Resources/images/SPIDisplay/schematics_rpi2.png)

####MinnowBoard MAX
对于 MinnowBoard Max，我们需要将电源、地线、SPI 和多个 GPIO 引脚接入 OLED 显示器。有关 MBM IO 引脚的更多详细信息，请参阅 [MBM 引脚映射页面]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm)。

**注意： 确保在连接电路时关闭 MBM 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

OLED 显示器上具有 8 个 IO 引脚，应按如下方式连接它们：

1. **DATA：** 连接到 MBM 上的 MOSI（引脚 9）。这是 SPI 主数据输出线。
2. **CLK：** 连接到 MBM 上的 SCLK（引脚 11）。这是 SPI 时钟线。
3. **SA0/DC：** 连接到 MBM 上的 GPIO 3（引脚 14）。这是显示器的数据/命令线。（有关显示器引脚功能的详细信息，请参阅[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}）
4. **RST：** 连接到 MBM 上的 GPIO 4（引脚 16）。这是显示器的硬件重置线。（有关显示器引脚功能的详细信息，请参阅[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}）
5. **CS：** 连接到 MBM 上的 CS1（引脚 5）。这是 SPI 芯片选择线。
6. **3V3：** 保持不连接。显示器具有其自己的板载电源调节器，可提供 3.3V 电源
7. **VIN：** 连接 MBM 上的 5V（引脚）。
8. **GND：** 连接到 MBM 上的地线（引脚 2）。

下面是试验板上所示的连接：

![试验板连接]({{site.baseurl}}/Resources/images/SPIDisplay/breadboard_assembled_mbm.png)

<sub>\*使用 [Fritzing](http://fritzing.org/) 制作的图像\*</sub>

以下是电路原理图：

![SPI 电路原理图]({{site.baseurl}}/Resources/images/SPIDisplay/schematics_mbm.png)

####DragonBoard 410c

对于 DragonBoard 410c，需要建立单板计算机的电源、接地、SPI 和多个 GPIO 连接与 OLED 屏幕之间的连接。

**注意： 确保在连接电路时关闭 DragonBoard 410c 电源。若要降低构建期间意外出现短路的几率，这是一个很好的做法。**

OLED 屏幕上有 8 个可连接到逻辑电平转换器的 IO 引脚，如下所示：

1.  **DATA：** 连接到引脚 B5。这是 SPI 主数据输出线。
2.  **CLK：** 连接到引脚 B4。这是 SPI 时钟线。
3.  **SA0/DC：** 连接到引脚 B3。这是屏幕的数据/命令线。
4.  **RST：** 连接到引脚 B2。这是屏幕的硬件重置线。
5.  **CS：** 连接到引脚 B1。这是 SPI 芯片选择线。
6.  **3V3：** 此连接_未使用_。
7.  **VIN：** 连接到 VCCB。
8.  **GND：** 连接到 GND。

逻辑电平转换器按如下方式连接到 DragonBoard：

1.  **A5：** 连接到引脚 14 \(SPI0 MOSI\)。  
2.  **A4：** 连接到引脚 8 \(SPI0 CLK\)。  
3.  **A3：** 连接到引脚 24 \(GPIO 12\)。  
4.  **A2：** 连接到引脚 26 \(GPIO 69\)。  
5.  **A1：** 连接到引脚 12 \(SPI0 CS N\)。  
6.  **VCCA：** 连接到引脚 35 \(1.8V PWR\)。
7.  **VCCB：** 连接到引脚 37 \(5V PWR\)。
8.  **GND：** 连接到引脚 40 \(GND\)。

下图显示组装了电路的试验板的可能外观：

![DragonBoard SPI 屏幕试验板]({{site.baseurl}}/Resources/images/SPIDisplay/breadboard_assembled_db410c.png)

电路示意图如下所示：

![DragonBoard SPI 屏幕示意图]({{site.baseurl}}/Resources/images/SPIDisplay/schematics_db410c.png)


###部署和运行应用

完成所有设置后，重新打开你的设备的电源，然后在 Visual Studio 中打开示例应用。根据你正在使用的设备配置代码。

{% highlight C# %}
public sealed partial class MainPage : Page
{
        /* Important! Uncomment the code below corresponding to your target device */

        /* Uncomment for MinnowBoard Max */
        //private const string SPI_CONTROLLER_NAME = "SPI0";  /* For MinnowBoard Max, use SPI0                            */
        //private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 5 on the MBM          */
        //private const Int32 DATA_COMMAND_PIN = 3;           /* We use GPIO 3 since it's conveniently near the SPI pins  */
        //private const Int32 RESET_PIN = 4;                  /* We use GPIO 4 since it's conveniently near the SPI pins  */

        /* Uncomment for Raspberry Pi 2 */
        //private const string SPI_CONTROLLER_NAME = "SPI0";  /* For Raspberry Pi 2, use SPI0                             */
        //private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 24 on the Rpi2        */
        //private const Int32 DATA_COMMAND_PIN = 22;          /* We use GPIO 22 since it's conveniently near the SPI pins */
        //private const Int32 RESET_PIN = 23;                 /* We use GPIO 23 since it's conveniently near the SPI pins */

        /* Uncomment for DragonBoard 410c */
        //private const string SPI_CONTROLLER_NAME = "SPI0";  /* For DragonBoard, use SPI0                                */
        //private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 12 on the DragonBoard */
        //private const Int32 DATA_COMMAND_PIN = 12;          /* We use GPIO 12 since it's conveniently near the SPI pins */
        //private const Int32 RESET_PIN = 69;                 /* We use GPIO 69 since it's conveniently near the SPI pins */
        
        //...
}
{% endhighlight %}

接下来，右键单击“解决方案资源管理器”中的“SPIDisplay”项目，然后选择“设置为启动项目”。按照[设置远程调试并部署应用]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#csharp)的说明进行操作。SPIDisplay 应用将部署并启动，随后你应该看到 OLED 显示器上显示的文本数据。现在，你可以在该应用中键入内容，并且可在已连接的 OLED 显示器上对文本进行镜像操作。

![SPI 运行]({{site.baseurl}}/Resources/images/SPIDisplay/spidisplay_screenshot.png)

恭喜！ 你已连接 SPI 图形显示器。

###我们来看看代码
此示例中的代码可以拆分为以下两个主要部分：

1. **初始化代码：** 这会针对 GPIO、SPI 和 OLED 显示器执行初始化操作。需要先设置这些先决条件，然后才能将图形数据发送到 OLED 显示器。

2. **文本显示代码：** 此代码监视 UI 中的文本框控制，并等待用户输入文本。当发生这种情况时，应用会将文本转换为可通过 SPI 发送到显示器的图形数据。

让我们从深入了解初始化代码开始吧。

###初始化代码
下面是适用于顶级初始化函数的 C\# 代码。

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.Spi;
using Windows.Devices.Gpio;
using DisplayFont;

/* Initialize GPIO, SPI, and the display */
private async void InitAll()
{
    try
    {
        InitGpio();             /* Initialize the GPIO controller and GPIO pins */
        await InitSpi();        /* Initialize the SPI controller                */
        await InitDisplay();    /* Initialize the display                       */
    }
    /* If initialization fails, display the exception and stop running */
    catch (Exception ex)
    {
        Text_Status.Text = "Exception: " + ex.Message;
        if (ex.InnerException != null)
        {
            Text_Status.Text += "\nInner Exception: " + ex.InnerException.Message;
        }
        return;
    }

    /* Register a handler so we update the SPI display anytime the user edits a textbox */
    Display_TextBoxLine0.TextChanged += Display_TextBox_TextChanged;
    Display_TextBoxLine1.TextChanged += Display_TextBox_TextChanged;
    Display_TextBoxLine2.TextChanged += Display_TextBox_TextChanged;
    Display_TextBoxLine3.TextChanged += Display_TextBox_TextChanged;

    /* Manually update the display once after initialization*/
    DisplayTextBoxContents();

    Text_Status.Text = "Status: Initialized";
}
{% endhighlight %}

* SPI 显示器需要使用 GPIO 和 SPI，所以我们将依次初始化以下各项：
1. 初始化 GPIO 控制器和引脚
2. 初始化 SPI 总线
3. 初始化 OLED SPI 显示器

* 如果任意初始化操作失败，将显示一个错误并停止其他进程。如果显示器中的布线不正确，或者如果主机设备中没有 SPI 总线（例如，当你尝试在 Windows 台式机上运行时），则可能会发生这种情况

* 在所有这些初始化均已成功完成后，我们将在相应文本框上针对 **TextChanged** 事件注册 **Display\_TextBox\_TextChanged\(\)** 函数。这将确保每次用户编辑文本时都会调用我们的函数，以更新显示内容。

* 最后，我们对 **DisplayTextBoxContents\(\)** 进行了一次调用，从而在首次启动时会在屏幕上显示一些默认的示例文本。

接下来，让我们从细微处出发更进一步地了解每一个初始化函数所执行的操作。

####InitGPIO\(\)

SPI OLED 显示器上有以下两个引脚需要控制：数据/命令引脚和重置引脚。若要与这两个引脚通信，我们需要初始化 GPIO 控制器并将这些引脚配置为输出引脚。

{% highlight C# %}
/* Initialize the GPIO */
private void InitGpio()
{
    try
    {
        IoController = GpioController.GetDefault(); /* Get the default GPIO controller on the system */

        /* Initialize a pin as output for the Data/Command line on the display  */
        DataCommandPin = IoController.OpenPin(DATA_COMMAND_PIN);
        DataCommandPin.Write(GpioPinValue.High);
        DataCommandPin.SetDriveMode(GpioPinDriveMode.Output);

        /* Initialize a pin as output for the hardware Reset line on the display */
        ResetPin = IoController.OpenPin(RESET_PIN);
        ResetPin.Write(GpioPinValue.High);
        ResetPin.SetDriveMode(GpioPinDriveMode.Output);
    }
    /* If initialization fails, throw an exception */
    catch (Exception ex)
    {
        throw new Exception("GPIO initialization failed", ex);
    }
}
{% endhighlight %}

* 我们从通过 **GpioController.GetDefault\(\)** 函数检索设备上的默认 GPIO 控制器开始。

* 接下来，我们将 **DATA\_COMMAND\_PIN** 初始化为输出引脚。此引脚可供显示器用于确定 SPI 总线上的数据是已解释为图形数据还是已解释为命令。

* 最后，我们将 **RESET\_PIN** 初始化为输出引脚。此引脚用于对显示器进行硬件重置，以作为显示器初始化的一部分。

* 无论何时出现故障，都将引发顶级 **InitAll\(\)** 函数的异常。

####InitSpi\(\)
按照 GPIO 初始化的步骤，初始化 SPI 总线。该总线用于将图形数据和命令发送到 OLED 屏幕以供显示，并且必须先进行配置，然后我们才能向显示器发送指令。

{% highlight C# %}
/* Initialize the SPI bus */
private async Task InitSpi()
{
    try
    {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE); /* Create SPI initialization settings                               */
        settings.ClockFrequency = 10000000;                             /* Datasheet specifies maximum SPI clock frequency of 10MHz         */
        settings.Mode = SpiMode.Mode3;                                  /* The display expects an idle-high clock polarity, we use Mode3
                                                                         * to set the clock polarity and phase to: CPOL = 1, CPHA = 1
                                                                         */

        string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);       /* Find the selector string for the SPI bus controller          */
        var devicesInfo = await DeviceInformation.FindAllAsync(spiAqs);         /* Find the SPI bus controller device with our selector string  */
        SpiDisplay = await SpiDevice.FromIdAsync(devicesInfo[0].Id, settings);  /* Create an SpiDevice with our bus controller and SPI settings */

    }
    /* If initialization fails, display the exception and stop running */
    catch (Exception ex)
    {
        throw new Exception("SPI Initialization Failed", ex);
    }
}
{% endhighlight %}

* 首先，我们为 SPI 总线指定以下配置设置：
1. 指定要使用的芯片选择线。将此线连接到显示器上的 **CS** 引脚，以通知显示控制器我们将启动 SPI 总线事务的时间。
2. 时钟频率设置为 10MHz。这是显示器的额定速率，如[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}中所述。
3. **settings.Mode** 设置为 **SpiMode.Mode3**。这将为总线配置时钟极性和时钟相位，如[数据表](http://www.adafruit.com/datasheets/SSD1306.pdf){:target="_blank"}中所述。

* 接下来，我们为 SPI 控制器获取类选择字符串。此控制器可控制外露排针上的 SPI 线。然后，我们使用该选择字符串来获取与字符串名称匹配的 SPI 总线。

* 最后，我们将通过之前获取的设置和总线控制器创建一个新的 **SpiDevice**。

* 无论何时出现故障，都将引发顶级 **InitAll\(\)** 函数的异常。

####InitDisplay\(\)
在初始化 GPIO 和 SPI 后，即可与显示器通信。但是，我们必须先在显示控制器上配置一些设置，然后才可以发送图形数据。

{% highlight C# %}
/* Send SPI commands to power up and initialize the display */
private async Task InitDisplay()
{
    /* Initialize the display */
    try
    {
        /* See the datasheet for more details on these commands: http://www.adafruit.com/datasheets/SSD1306.pdf             */
        await ResetDisplay();                   /* Perform a hardware reset on the display                                  */
        DisplaySendCommand(CMD_CHARGEPUMP_ON);  /* Turn on the internal charge pump to provide power to the screen          */
        DisplaySendCommand(CMD_MEMADDRMODE);    /* Set the addressing mode to "horizontal"                                  */
        DisplaySendCommand(CMD_SEGREMAP);       /* Flip the display horizontally, so it's easier to read on the breadboard  */
        DisplaySendCommand(CMD_COMSCANDIR);     /* Flip the display vertically, so it's easier to read on the breadboard    */
        DisplaySendCommand(CMD_DISPLAY_ON);     /* Turn the display on                                                      */
    }
    catch (Exception ex)
    {
        throw new Exception("Display Initialization Failed", ex);
    }
}
{% endhighlight %}

* 首先，通过调用 **ResetDisplay\(\)** 来执行硬件重置。该函数只能将硬件重置引脚切换为重置显示器。

* 接下来，我们将使用 **DisplaySendCommand\(\)** 函数，向该显示器发送一组命令。此函数是 **SpiDevice.Write\(\)** 函数的包装，后者可通过 SPI 发送实际命令。利用这些命令，不仅能打开显示器，还能使其进入可随时接受图形数据的状态。

* 无论何时出现故障，都将引发顶级 **InitAll\(\)** 函数的异常。

###文本显示代码

现在屏幕已初始化，我们可以将文本发送到屏幕。我们之前已在该初始化函数中将 **Display\_TextBox\_TextChanged\(\)** 注册为用户一更改该文本框就执行触发操作。此函数将调用下面的 **DisplayTextBoxContents\(\)** 函数，这将贯穿于将文本写出屏幕这一过程：

{% highlight C# %}
/* Update the SPI display to mirror the textbox contents */
private void DisplayTextBoxContents()
{
    try
    {
        ClearDisplayBuf();  /* Blank the display buffer             */
        WriteLineDisplayBuf(Display_TextBoxLine0.Text, 0, 0);
        WriteLineDisplayBuf(Display_TextBoxLine1.Text, 0, 1);
        WriteLineDisplayBuf(Display_TextBoxLine2.Text, 0, 2);
        WriteLineDisplayBuf(Display_TextBoxLine3.Text, 0, 3);
        DisplayUpdate();    /* Write our changes out to the display */
    }
    /* Show an error if we can't update the display */
    catch (Exception ex)
    {
        Text_Status.Text = "Status: Failed to update display";
        Text_Status.Text = "\nException: " + ex.Message;
    }
}

/* Updates the display when the textbox contents change */
private void Display_TextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    DisplayTextBoxContents();
}
{% endhighlight %}

* **ClearDisplayBuf\(\)** 仅将本地显示缓冲区中的所有字节设置为“0”，以便于我们可以从头开始操作。

* 接下来，我们将调用 **WriteLineDisplayBuf\(\)**，以将文本框中的某行文本写入到本地显示缓冲区。

* 借助 **DisplayUpdate\(\)**，我们可以通过 SPI 将本地缓冲区中的内容写出显示器。

在以下部分中，我们将详细介绍 **WriteCharDisplayBuf\(\)** 和 **DisplayUpdate\(\)** 函数，它们可执行与呈现字符数据和通过 SPI 发送数据相关的大量工作。

####WriteCharDisplayBuf\(\)

**WriteCharDisplayBuf\(\)** 函数可执行将单个字符转换为表示该字符图像数据的字节数组的工作。此函数通常由 **WriteLineDisplayBuf\(\)** 调用，以便于以字符串的形式呈现单个字符。让我们来看看操作方法。

{% highlight C# %}
/*
 * NAME:        WriteCharDisplayBuf
 * DESCRIPTION: Writes one character to the display screen buffer (DisplayUpdate() needs to be called subsequently to output the buffer to the screen)
 * INPUTS:
 *
 * Character: The character we want to draw. In this sample, special characters like tabs and newlines are not supported.
 * Col:       The horizontal column we want to start drawing at. This is equivalent to the 'X' axis pixel position.
 * Row:       The vertical row we want to write to. The screen is divided up into 4 rows of 16 pixels each, so valid values for Row are 0,1,2,3.
 *
 * RETURN VALUE:
 * We return the number of horizontal pixels used. This value is 0 if Row/Col are out-of-bounds, or if the character isn't available in the font.
 */
private UInt32 WriteCharDisplayBuf(Char Chr, UInt32 Col, UInt32 Row)
{
    /* Check that we were able to find the font corresponding to our character */
    FontCharacterDescriptor CharDescriptor = DisplayFontTable.GetCharacterDescriptor(Chr);
    if (CharDescriptor == null)
    {
        return 0;
    }

    /* Make sure we're drawing within the boundaries of the screen buffer */
    UInt32 MaxRowValue = (SCREEN_HEIGHT_PAGES / DisplayFontTable.FontHeightBytes) - 1;
    UInt32 MaxColValue = SCREEN_WIDTH_PX;
    if (Row > MaxRowValue)
    {
        return 0;
    }
    if ((Col + CharDescriptor.CharacterWidthPx + DisplayFontTable.FontCharSpacing) > MaxColValue)
    {
        return 0;
    }

    UInt32 CharDataIndex = 0;
    UInt32 StartPage = Row * 2;
    UInt32 EndPage = StartPage + CharDescriptor.CharacterHeightBytes;
    UInt32 StartCol = Col;
    UInt32 EndCol = StartCol + CharDescriptor.CharacterWidthPx;
    UInt32 CurrentPage = 0;
    UInt32 CurrentCol = 0;

    /* Copy the character image into the display buffer */
    for (CurrentPage = StartPage; CurrentPage < EndPage; CurrentPage++)
    {
        for (CurrentCol = StartCol; CurrentCol < EndCol; CurrentCol++)
        {
            DisplayBuffer[CurrentCol, CurrentPage] = CharDescriptor.CharacterData[CharDataIndex];
            CharDataIndex++;
        }
    }

    /* Pad blank spaces to the right of the character so there exists space between adjacent characters */
    for (CurrentPage = StartPage; CurrentPage < EndPage; CurrentPage++)
    {
        for (; CurrentCol < EndCol + DisplayFontTable.FontCharSpacing; CurrentCol++)
        {
            DisplayBuffer[CurrentCol, CurrentPage] = 0x00;
        }
    }

    /* Return the number of horizontal pixels used by the character */
    return CurrentCol - StartCol;
}
{% endhighlight %}

* 首先，在字体表 **DisplayFontTable** 中搜索给定的字符。此表包含常用的 ASCII 字符的像素数据。注意，诸如换行符等特殊字符在本示例中不受支持，并且会被 **WriteCharDisplayBuf\(\)** 忽略。

* 一旦我们有了适用于字符的像素大小，便会执行一些检查，以确保它可以适合屏幕的边界。

* 然后，将字符像素数据复制到本地屏幕缓冲区数组 **DisplayBuffer\[,\]** 中。此缓冲区会保留屏幕内容的本地副本。我们先使用此缓冲区（因为借助它可更快速地在本地缓冲区上执行像素操作），然后在完成像素操作后通过 SPI 将相关数据发送到屏幕。

* 随后，填充字符右侧区域的部分空间。这样一来，打印彼此相邻的字符时会出现一些分隔空间。同样，这些情况也会出现在本地屏幕缓冲区中。尚未向屏幕发送任何数据。


####DisplayUpdate\(\)
在将所有数据写入到本地缓冲区之后。随时可以通过 SPI 将其写出屏幕。为此，我们将调用 **DisplayUpdate\(\)**：

{% highlight C# %}
/* Writes the Display Buffer out to the physical screen for display */
private void DisplayUpdate()
{
    int Index = 0;
    /* We convert our 2-dimensional array into a serialized string of bytes that will be sent out to the display */
    for (int PageY = 0; PageY < SCREEN_HEIGHT_PAGES; PageY++)
    {
        for (int PixelX = 0; PixelX < SCREEN_WIDTH_PX; PixelX++)
        {
            SerializedDisplayBuffer[Index] = DisplayBuffer[PixelX, PageY];
            Index++;
        }
    }

    /* Write the data out to the screen */
    DisplaySendCommand(CMD_RESETCOLADDR);         /* Reset the column address pointer back to 0 */
    DisplaySendCommand(CMD_RESETPAGEADDR);        /* Reset the page address pointer back to 0   */
    DisplaySendData(SerializedDisplayBuffer);     /* Send the data over SPI                     */
}
{% endhighlight %}

* 先通过循环访问我们的显示缓冲区，将二维缓冲区数组转换为单一的序列化数据数组，以便于通过 SPI 发送。由于我们之前在“横向模式”下配置了显示器，因此我们将显示器分成若干个水平“分片”，并按顺序将其存储在序列化的缓冲区中。

* 完成数据的序列化之后，我们将发送相关命令，以将显示器的列和页面地址指针重新重置为“0”。这将确保我们可以从屏幕的左上角开始写入操作。

* 最后，我们将调用 **DisplaySendData\(\)**，以通过 SPI 发送缓冲区内容。此函数是 **SpiDevice.Write\(\)** 的包装，后者将通过 SPI 发送整个缓冲区。

{% highlight C# %}
/* Send graphics data to the screen */
private void DisplaySendData(byte[] Data)
{
    /* When the Data/Command pin is high, SPI data is treated as graphics data  */
    DataCommandPin.Write(GpioPinValue.High);
    SpiDisplay.Write(Data);
}
{% endhighlight %}
