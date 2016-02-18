---
layout: default
title: GSM Shield
permalink: /en-US/win8/samples/GSM_Sample.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# SeedStudio GSM shield
Learn how to use the SeedStudio GSM shield

![]({{site.baseurl}}/Resources/images/GSM.jpg){:width="400"}

# Required Components
* [Seed Studio GSM shield](http://www.seeedstudio.com/depot/GPRS-Shield-V20-p-1379.html){:target="_blank"}

# Shield setup
* Move the two switches to the rigth (Serial port select as indicates in the image) to select the hardware serial
![]({{site.baseurl}}/Resources/images/GPRS_Shield_interface_function.jpg){:width="400"}

# Create a new project

1. Create a new project from the template.
2. Replace the existing code in main.cpp with the following code:
3. Add to the project the files GSM.cpp, HWSerial.cpp, SIM900.cpp and sms.cpp
   found in [GSM Library](https://github.com/dacolgit/GSM-GPRS-GPS-Shield){:target="_blank"}

# Code

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

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
