---
layout: default
title: TX/RX 示例
permalink: /zh-cn/win8/samples/TXRX.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 通过 TX/RX 引脚进行通信
了解如何使用 HardwareSerial 跨 TX/RX 引脚进行通信，以及如何在使用 USB TTL 串行电缆的计算机上查看它

# 有关使用 HardwareSerial 的信息
* 串行 = COM1 = TX/RX 引脚<br/>
* 尽管此示例未使用串行事件，但如果你想使用 serialEvent，则需要：
    * 为 <code>serialEvent\(\)</code> 创建一种返回空值的方法，并且 main.cpp 中没有参数。当数据在循环末尾的 serial1 端口上可用时，将调用此方法。
    * 在解决方案资源管理器中右键单击“项目”，然后选择“属性”<kbd></kbd>。
    * 在“配置属性”-\>“C/C++”-\>“预处理器”下，将 <kbd>SERIAL\_EVENT;</kbd> 添加到“预处理器定义”。

# 所需组件
* [FTDI 电缆](https://www.sparkfun.com/products/9717){:target="_blank"}
* 用于将 TX 和 RX 引脚连接到 FTDI 电缆的 2 条线

# 创建项目

1. 使用模板创建新项目。
1. 将电缆的 USB 端插入计算机的 USB 端口。
1. 在开发计算机上打开设备管理器，并查找适配器使用的 COM 端口。
1. 打开终端程序，例如 [Tera Term](http://download.cnet.com/Tera-Term/3000-20432_4-75766675.html){:target="_blank"}
1. 将程序设置为从步骤 5 中所找到的 COM 端口监视串行连接。
1. 确保你的选项是否如下所示（端口设置为在步骤 5 中找到的 COM 端口）：<br/> ![]({{site.baseurl}}/Resources/images/TeraTermSerialConfigForTXRX.png)<br/>
    * 如果使用 Tera Term，可通过依次单击“设置”-\>“串行端口”来转到如上所示的菜单。
1. 将橙色引脚从电缆连接到 Galileo 上的 RX（引脚 0）
1. 将黄色引脚从电缆连接到 Galileo 上的 TX（引脚 1）
1. 将项目的 main.cpp 中的现有代码替换为以下代码：

# 代码

### “写入”项目中的 main.cpp

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
	return RunArduinoSketch();
}

void setup()
{
    Serial.begin(CBR_300, Serial.SERIAL_7O2);
}

int count = 0;

void loop()
{
    if (Serial.write('a' + count) != 1)
    {
        Log(L"Serial.write failed\n");
    }else{
        Log(L"%c being sent\n", 'a' + count++);
    }
    if (count == 26) { count = 0; }
    Sleep(1000);
}
{% endhighlight %}

---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
