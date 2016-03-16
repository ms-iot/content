---
layout: default
title: 写入 UART
permalink: /zh-cn/win8/samples/UART.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# 写入 UART
了解如何使用 HardwareSerial 读取和写入 UART 端口。

# 有关使用 UART 和 HardwareSerial 的信息

* HardwareSerial 定义一个名为 Serial1 的对象。
    * 这会读取并写入 Windows 映像上的 COM2（已链接到 Galileo 开发板上 UART 端口）<br/>
* 尽管此示例不使用串行事件，但如果你想使用 serialEvent1，则需要：
    * 为 <code>serialEvent1\(\)</code> 创建一种返回空值的方法，并且 main.cpp 中没有参数。当数据在循环末尾的 serial1 端口上可用时，将调用此方法。
    * 在解决方案资源管理器中右键单击“项目”，然后选择“属性”<kbd></kbd>。
    * 在“配置属性”-\>“C/C++”-\>“预处理器”下，将 <kbd>SERIAL\_EVENT1;</kbd> 添加到“预处理器定义”。

# 所需组件
* [DB9 母头转 3.5 毫米电缆](http://www.amazon.com/SF-Cable-Female-Serial-Cable-6/dp/B004T9BBJC/ref=sr_1_1?ie=UTF8&qid=1407960957&sr=8-1&keywords=audio+to+serial+cable){:target="_blank"}
* [USB 转串行电缆](http://www.amazon.com/TRENDnet-RS-232-Serial-Converter-TU-S9/dp/B0007T27H8/ref=sr_1_1?ie=UTF8&qid=1407961117&sr=8-1&keywords=serial+to+usb){:target="_blank"}

# 允许 UART 用于 HardwareSerial（这会在使用内核调试程序时进行更改）

1. 关闭 Galileo 并移除电源
1. 移除 microSD 卡并将其插入电脑（Windows 会自动分配驱动器号，在本例中是“k”）
1. 在开发计算机上打开管理命令提示符：
	* <kbd>bcdedit /store k:\\efi\\microsoft\\boot\\bcd /enum</kbd>
	* 验证你是否已获取 bcd 内容
	* <kbd>bcdedit /store k:\\efi\\microsoft\\boot\\bcd /set {default} debug No</kbd>
	* <kbd>bcdedit /store k:\\efi\\microsoft\\boot\\bcd /set {default} testsigning OFF</kbd>
	* <kbd>bcdedit /store k:\\efi\\microsoft\\boot\\bcd /enum</kbd>
	* 验证 debug 和 testsigning 现在是"No"。
1. 从电脑安全卸除 microSD（从 Windows 资源管理器弹出）。
1. 将 microSD 放置在 Galileo 中并接通电源

# 创建一个新项目

1. 使用模板创建新项目。
1. 将电缆的两个串行端插在一起。
1. 在 Galileo 开发板上将电缆 3.5 毫米的那一端插入 UART 插孔。<br/> ![]({{site.baseurl}}/Resources/images/uart.png)
1. 将电缆的 USB 端插入计算机的 USB 端口。
1. 在开发计算机上打开设备管理器，并查找适配器使用的 COM 端口。
1. 打开终端程序，例如 [Tera Term](http://download.cnet.com/Tera-Term/3000-20432_4-75766675.html){:target="_blank"}
1. 将程序设置为从步骤 5 中所找到的 COM 端口监视串行连接。
1. 确保你的选项是否如下所示（端口设置为在步骤 5 中找到的 COM 端口）：<br/> ![]({{site.baseurl}}/Resources/images/TeraTermSerialConfig.png)<br/>
    * 如果使用 Tera Term，可通过依次单击“设置”-\>“串行端口”来转到如上所示的菜单。
1. 使用以下代码替换 main.cpp 中的现有代码：

# 代码

### Main.cpp

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

void setup()
{
    Serial1.begin(CBR_9600, Serial.SERIAL_8N1);
}

char output = 'a';  // The character being written

void loop()
{
    // Handles the writing
    if (Serial1.write((uint8_t)output) != 1)
    {
        Log(L"Serial1.write failed\n");
    }
    else
    {
        Log(L"%c being sent\n", output);
    }

    // Loops the character from a to z
    if (output == 'z')
    {
        output = 'a';
    }
    else
    {
        output++;
    }

    Sleep(1000);
}
{% endhighlight %}

---

[&laquo; 返回示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
