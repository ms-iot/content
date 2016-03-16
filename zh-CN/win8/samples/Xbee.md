---
layout: default
title: 与 XBee 设备通信
permalink: /zh-cn/win8/samples/XBee.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 与 XBee 设备通信
了解如何使用 HardwareSerial 在 TX/RX 引脚上与 XBee 设备通信。

# 有关使用 HardwareSerial 的信息

* HardwareSerial 定义一个名为 Serial 的对象。
    * 这会读取并写入链接到 Galileo 开发板上的 RX 和 TX 引脚的 Windows 映像上的 COM1。<br/>
* 串行 = COM1 = TX/RX 引脚

# 所需组件
* [XBee ZB 设备](http://www.digi.com/products/xbee-rf-solutions/modules/xbee-zigbee){:target="_blank"}
* 将 RX、TX、3.3v 电源和地线连接到 XBee 的电线

此示例要求 XBee 在 API 模式中运行，方法是设置 AP=2。如果使用的是系列 2 XBee，则需要通过 [X-CTU](http://www.digi.com/support/productdetail?pid=3352&osvid=57&type=utilities){:target="_blank"} 安装 API 固件（系列 2 通过 AT 固件制造），然后设置 AP=2。此软件在设置为 AP=1 时无法正常工作

# 创建一个新项目

1. 使用模板创建新项目。
    * 在解决方案资源管理器中右键单击“项目”，然后选择“属性”<kbd></kbd>。
    * 在“配置属性”-\>“C/C++”-\>“预处理器”下，将 <kbd>SERIAL\_EVENT;</kbd> 添加到“预处理器定义”。
1. 将 Galileo 开发板上的 TX 引脚连接到 XBee 上的 RX 引脚 \(3 号\)
1. 将 Galileo 开发板上的 RX 引脚连接到 XBee 上的 TX 引脚 \(2 号\)
1. 将 Galileo 开发板上的 GND 引脚连接到 XBee 上的 GND 引脚 \(10 号\)
1. 将 Galileo 开发板上的 3.3v 引脚连接到 XBee 上的 3.3v 引脚 \(1 号\)

<img src="{{site.baseurl}}/Resources/images/XbeeGalileoWiring.png">

如果你有 XBee 适配器，请将电线连接到适配器上的等效引脚。

# 代码

### Main.cpp

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
  return RunArduinoSketch();
}

/**
  Writes a message to the XBee device using the API protocol (AP=2).

  @param[in]  messageType The XBee API Message type
  @param[in]  frameId     An ID for the message frame to associate with the response. Set to 0x00 if no response is required
  @param[in]  frame       A byte array with the payload of the message
  @param[in]  frameLen    The length of the frame array
*/
void writeXBeeApiMessage(uint8_t messageType, uint8_t frameId, uint8_t* frame, USHORT frameLen)
{
  int sentLen = Serial.write((uint8_t) 0x7E); //Write header
  //Write message length
  USHORT len = frameLen + 2;
  sentLen += Serial.write((uint8_t) (len >> 8));
  sentLen += Serial.write((uint8_t) (len & 0xFF));
  sentLen += Serial.write(messageType); //write message type
  byte checksum = 0xFF - messageType;
  sentLen += Serial.write(frameId); //write frame id
  checksum -= frameId;
  for (int i = 0; i < frameLen; i++) //write body
  {
    sentLen += Serial.write(frame[i]);
    checksum -= frame[i];
  }
  sentLen += Serial.write(checksum); //write checksum
  if (sentLen == frameLen + 6)
    Log(L"Sent %d bytes\n", sentLen);
  else
    Log(L"Error writing bytes");
}

void setup()
{
  Serial.begin(CBR_9600, Serial.SERIAL_8N1);
  //Send the AT Request (0x08) for the device's ID (0x49, 0x44)
  uint8_t idRequest[8] = { 0x49, 0x44 };
  writeXBeeApiMessage(0x08, 0x01, idRequest, 2);
}

// This method will be called when data is available on the Serial port at the end of the loop
void serialEvent()
{
  int available = Serial.available();
  if (available)
  {
    Log("Received %d bytes: ", available);
    for (int i = 0; i < available; i++)
    {
      auto byte = (uint8_t) Serial.read();
      Log("%.2X,", byte);
    }
    Log("\n");
   }
}

void loop()
{
  Sleep(250);
}
{% endhighlight %}

---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
