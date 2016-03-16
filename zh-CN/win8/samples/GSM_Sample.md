---
layout: default
title: GSM Shield
permalink: /zh-cn/win8/samples/GSM Shield.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代上的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台的 Windows 支持。我们看到了平台的一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# SeedStudio GSM Shield
了解如何使用 SeedStudio GSM Shield

![]({{site.baseurl}}/Resources/images/GSM.jpg){:width="400"}

# 所需组件
* [Seed Studio GSM Shield](http://www.seeedstudio.com/depot/GPRS-Shield-V20-p-1379.html){:target="_blank"}

# Shield 设置
* 将两个开关移到右侧（所选串行端口，如图像中所示）以选择硬件串行

![]({{site.baseurl}}/Resources/images/GPRS_Shield_interface_function.jpg){:width="400"}

# 创建一个新项目

1. 从模板创建新项目。
2. 使用以下代码替换 main.cpp 中的现有代码：
3. 将[ GSM 库](https://github.com/dacolgit/GSM-GPRS-GPS-Shield){:target="_blank"}中找到的文件 GSM.cpp、HWSerial.cpp、SIM900.cpp 和 sms.cpp 添加到项目。

# 代码

### Main.cpp

{% highlight C++ %}
	// Main.cpp : Defines the entry point for the console application.
	//
	// Sample application for sending SMS using GSM library - dacol 07/2014
	//

	#include "stdafx.h"
	#include "arduino.h"
	#include "SIM900.h"
	#include "sms.h"

	SMSGSM sms;

	// Helper function for logging to debug output and the console
	void CustomLogging(char* str)
	{
		OutputDebugStringA(str); // for VS Output
		printf(str); // for commandline output
	}

	int _tmain(int argc, _TCHAR* argv[])
	{
		return RunArduinoSketch();
	}

	void setup()
	{
		CustomLogging("Init GSM module.\n");
		gsm.begin(19200);
	}

	void loop()
	{
		// Add your phone number
		char phoneNumber[] = { "+49151123456" };
		char smstext[] = { "Hi, This message was sent to you By Galileo" };
		int smsCounter = 0;
		int maxSMSSent = 1;

		CustomLogging("Sending sms.\n");

		if (smsCounter < maxSMSSent)
		{
			sms.SendSMS(phoneNumber, smstext);
			smsCounter++;
		}

		CustomLogging("sms sent.\n");
	}




{% endhighlight %}

---

[&laquo; 返回到示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
