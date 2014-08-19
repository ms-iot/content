---
layout: code
title: Writing to UART
permalink: /UART.htm
---

# Writing to UART
Learn how to use HardwareSerial to read and write to the UART port.

# Info on using UART and HardwareSerial

* Serial1 = COM2 = UART port<br/>
* To use <code>serialEvent1()</code> you’ll need to edit the project settings
    * Right click on the Project in the Solution Explorer, then select <kbd>Properties</kbd>.
    * Under Configuration Properties -> C/C++ -> Preprocessor, add <kbd>SERIAL_EVENT1;</kbd> to Preprocessor Definitions.

# Required Components
* <a href="http://www.amazon.com/SF-Cable-Female-Serial-Cable-6/dp/B004T9BBJC/ref=sr_1_1?ie=UTF8&qid=1407960957&sr=8-1&keywords=audio+to+serial+cable" target="_blank">DB9 Female to 3.5mm Cable</a>
* <a href="http://www.amazon.com/TRENDnet-RS-232-Serial-Converter-TU-S9/dp/B0007T27H8/ref=sr_1_1?ie=UTF8&qid=1407961117&sr=8-1&keywords=serial+to+usb" target="_blank">USB to Serial Cable</a>

# Allow UART to be used for HardwareSerial (This will change it from kernel debugger use)

1. Shut down Galileo and remove power
1. Remove microSD card and plug it in to a PC (Windows will automatically assign a drive letter, in our case it is K)
1. Open an Administrative command prompt on your development machine:
	* <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /enum</kbd>
	* Verify you got bcd contents
	* <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /set {default} debug No</kbd>
	* <kbd>bcdedit /store c:\efi\microsoft\boot\bcd /set {default} testsigning OFF</kbd>
	* <kbd>bcdedit /store k:\efi\microsoft\boot\bcd /enum</kbd>
	* Verify debug and testsigning are now “No”
1. Safe dismount of microSD from PC by ejecting in Windows Explorer.
1. Put microSD in Galileo and powered up

# Create a new project

1. Create a new project from the template.
1. Plug the two serial ends of the cables together.
1. Plug the 3.5mm end of the cable into the UART jack on the Galileo board.<br/>
<img src="images/uart.png">
1. Plug the USB end of the cable into your computer's USB port.
1. Open up Device Manager on your development machine and find out which COM port is being used by the adapter.
1. Open a terminal program and set it to monitor the serial connection from the COM port you found above in order to view the serial data coming in.
1. Replace the existing code in main.cpp with the following code:

# Code

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

int count = 0;

void loop()
{
    if (Serial1.write('a' + count) != 1)
    {
        Log(L"Serial1.write failed\n");
    }
    else
    {
        Log(L"%c being sent\n", 'a' + count++);
    }
    if (count == 26) { count = 0; }
    Sleep(1000);
}
{% endhighlight %}
  <hr/>

<a class="btn btn-default" href="SampleApps.htm" role="button">&laquo; Return to Samples</a>
