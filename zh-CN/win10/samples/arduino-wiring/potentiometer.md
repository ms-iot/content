---
layout: default
title: Arduino 接线电位计示例
permalink: /zh-cn/win10/samples/arduino-wiring/Potentiometer.htm
lang: zh-cn
---

# Arduino 接线电位计示例
此示例演示了如何使用 Arduino 接线将旋转电位计和 LED 连接到 Raspberry Pi 2 或 MinnowBoard Max。我们使用基于 SPI 的 ADC（模拟数字转换器）从该电位计读取值，并根据旋钮位置控制 LED。

此示例类似于 [C\# 电位计示例]({{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm)，但使用 Arduino 接线而非 C\#。接线和硬件配置几乎完全相同。但是，DragonBoard 410c 当前不支持 Arduino 接线。

## 硬件
- 试验板 - 仅限以下内容之一
	- Raspberry Pi 2
	- MinnowBoard Max
- ADC - 仅限以下内容之一
	- [一个 MCP3002 10 位 ADC](http://www.microchip.com/wwwproducts/Devices.aspx?product=MCP3002){:target="_blank"} 或
	- [一个 MCP3008 10 位 ADC](http://www.microchip.com/wwwproducts/Devices.aspx?dDocName=en010530){:target="_blank"} 或
	- [一个 MCP3208 12 位 ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go){:target="_blank"}
- [1 个 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832){:target="_blank"}
- [1 个 330 &#x2126; 电阻器](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}
- [1 个 10k &#x2126; 微调电位计](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540){:target="_blank"}或相似仪器
- 一块试验板和各种电线

## 硬件设置

在此示例中，你可以选择使用 MCP3002、MCP3008 或 MCP3208 ADC（模拟数字转换器）。芯片之间的差异在于输入通道数和分辨率。12 位的分辨率比 10 位选项更准确，而通道数则决定可以读取的不同输入数。其中任意选项均适用于该示例。

以下是 MCP3002 和 MCP3208 ADC 的引出线。

| MCP3002 | MCP3008 或 MCP3208 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![MCP3002 引出线]({{site.baseurl}}/Resources/images/Potentiometer/MCP3002.PNG) | ![MCP3208 引出线]({{site.baseurl}}/Resources/images/Potentiometer/MCP3208.PNG) |

###Raspberry Pi

####Raspbery Pi 引出线

![Raspberry Pi 2 引出线]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

####电线和连接

#####MCP3002
如果你已选择使用 **MCP3002**，则按如下方式组装电路。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3002 上的 `CH0`。有关详细信息，你还可以参阅[数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf){:target="_blank"}。

连接详细信息如下：

![整体电路图]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3002.PNG)

MCP3002 应该按如下方式进行连接：

- VDD/VREF - Raspberry Pi 2 上的 3.3V（引脚 1）
- CLK - Raspberry Pi 2 上的“SPI0 SCLK”（引脚 23）
- Dout - Raspberry Pi 2 上的“SPI0 MISO”（引脚 21）
- Din - Raspberry Pi 2 上的“SPI0 MOSI”（引脚 19）
- CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”（引脚 24）
- Vss - Raspberry Pi 2 上的 GND（引脚 6 或任何其他 GND 引脚）
- CH0 - 电位计 wiper 引脚


#####MCP3208 或 MCP3008
如果你已选择使用 **MCP3208** 或 **MCP3008**，则按如下方式组装电路（引出线在每块芯片上均相同）。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3208 上的 `CH0`。有关详细信息，你还可以参阅 [MCP3208 数据表](http://pdf.datasheetcatalog.com/datasheets2/43/435228_1.pdf){:target="_blank"}或 [MCP3008 数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21295C.pdf){:target="_blank"}。

连接详细信息如下：

![RPi2 Fritzing 3008]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3208.PNG)

MCP3208 应该按如下方式进行连接：

- VDD - Raspberry Pi 2 上的 3.3V（引脚 1）
- VREF - Raspberry Pi 2 上的 3.3V（引脚 1）
- AGND - Raspberry Pi 2 上的 GND（引脚 6 或任何其他 GND 引脚）
- CLK - Raspberry Pi 2 上的“SPI0 SCLK”（引脚 23）
- Dout - Raspberry Pi 2 上的“SPI0 MISO”（引脚 21）
- Din - Raspberry Pi 2 上的“SPI0 MOSI”（引脚 19）
- CS/SHDN - Raspberry Pi 2 上的“SPI0 CS0”（引脚 24）
- DGND - Raspberry Pi 2 上的 GND（引脚 6 或任何其他 GND 引脚）
- CH0 - 电位计 wiper 引脚

###MinnowBoard Max

####MinnowBoard Max 引出线

![MinnowBoard Max 引出线]({{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png)

####电线和连接

#####MCP3002
如果你已选择使用 **MCP3002**，则按如下方式组装电路。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3002 上的 `CH0`。有关详细信息，你还可以参阅[数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf){:target="_blank"}。

连接详细信息如下：

![MBM Fritzing 3002]({{site.baseurl}}/Resources/images/arduino_wiring/MBM_pot3002.png)

MCP3002 应该按如下方式进行连接：

- VDD/VREF - MBM 上的 3.3V（引脚 4）
- CLK - MBM 上的“SPI0 SCLK”（引脚 11）
- Dout - MBM 上的“SPI0 MISO”（引脚 7）
- Din - MBM 上的“SPI0 MOSI”（引脚 9）
- CS/SHDN - MBM 上的“SPI0 CS0”（引脚 5）
- Vss - MBM 上的 GND（引脚 1 或引脚 2）
- CH0 - 电位计 wiper 引脚

#####MCP3208 或 MCP3008
如果你已选择使用 **MCP3208** 或 **MCP3008**，则按如下方式组装电路（引出线在每块芯片上均相同）。请注意，wiper 引脚（10k 电位计上的中间引脚）应连接到 MCP3208 上的 `CH0`。有关详细信息，你还可以参阅 [MCP3208 数据表](http://pdf.datasheetcatalog.com/datasheets2/43/435228_1.pdf){:target="_blank"}或 [MCP3008 数据表](http://ww1.microchip.com/downloads/en/DeviceDoc/21295C.pdf){:target="_blank"}。

连接详细信息如下：

![MBM Fritzing 3208]({{site.baseurl}}/Resources/images/arduino_wiring/MBM_pot3208.png)

- VDD - MBM 上的 3.3V（引脚 4）
- VREF - MBM 上的 3.3V（引脚 4）
- AGND - MBM 上的 GND（引脚 1）
- CLK - MBM 上的“SPI0 SCLK”（引脚 11）
- Dout - MBM 上的“SPI0 MISO”（引脚 9）
- Din - MBM 上的“SPI0 MOSI”（引脚 7）
- CS/SHDN - MBM 上的“SPI0 CS0”（引脚 5）
- DGND - MBM 上的 GND（引脚 1）
- CH0 - 电位计 wiper 引脚

##代码

使用以下代码替换主 .ino 文件中的现有代码：

{% highlight C++ %}

/*
 * we'll set this channel number to match the channel we've plugged our potentiometer's
 * wiper pin into. In this case, channel 0 (C0). If you use a different channel,
 * you'll need to update this number.
 */
int channel = 0;

void setup()
{
    /*
     * it is not necessary to set the channel to input, as the analogRead command must
     * assume the 'pin number' it is given refers to a channel on the ADC chip.
     */
}

void loop()
{
    //read the value from the ADC channel
    int value = analogRead( channel );

    //report the value to the output console
    Log( L"Analog value: " );
    Log( value.ToString()->Begin() );
    Log( "\n" );

    //delay for 500ms
    delay( 500 );
}

{% endhighlight %}


##生成和部署
按 F5 来生成并部署项目。

有关如何部署应用的详细说明，请参阅 [Arduino 接线项目指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)！

##结果
你将看到 LED 亮起，指示电源在流动，并且在输出控制台中每秒读取并显示电位计 wiper 引脚的当前值两次。

##是否遇到难题?

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
