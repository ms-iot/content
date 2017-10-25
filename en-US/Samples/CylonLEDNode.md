---
layout: sample
title: Cylon LED controller
description: Blink an Arduino LED using Cylon in a Node.js console app
keywords: Windows 10 IoT Core, arduino
permalink: /en-US/Samples/CylonLEDNode.htm
samplelink: N/A
lang: en-US
---

# Cylon LED controller

In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 or 3 to blink the LED on an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed) once per second.

{% include note.html text="This sample only works with the Windows 10 IoT Core Anniversary Update (Build 14393) release with Visual Studio 2015 and does not currently work with any newer Windows releases or Visual Studio 2017. We are looking into adding Node.js support to UWP in a future release of Windows 10 IoT Core." %}

### Hardware required
* Raspberry Pi 2 or 3.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Leonardo is used in this sample).
* USB to Micro USB cable.

### Set up your PC
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install Arduino software from [here](https://www.arduino.cc/en/Main/Software).
* Install [Git for Windows](http://git-scm.com/download/win). Ensure that Git is included in your 'PATH' environment variable.


### Upload Firmata to your Arduino
* Connect the Arduino board with your PC using the USB cable.
* Open Arduino software.
* Go to Tools->Port and select your device.
* Go to Tools->Board and click on the type of Arduino you have.
* Go to File->Examples->Firmata and select StandardFirmata. This will open up a new window with the Firmata sketch.
* Click the upload button to upload the sketch to the Arduino board. You should see a "Done uploading" message when the upload is complete.


### Copy Node.js to your Raspberry Pi 2 or 3
* Download the zip file with ARM Node.js (ChakraCore) from [here](http://aka.ms/nodecc_arm) to your PC and extract the files (node.exe and chakracore.dll).
* Use [Windows file sharing]({{site.baseurl}}/{{page.lang}}/Docs/WindowsFileSharing.htm), [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm), 
or [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm) to create `C:\Node.js (ChakraCore)` folder on your Raspberry Pi 2 or 3.
* Copy node.exe and chakracore.dll to `C:\Node.js (ChakraCore)` on your Raspberry Pi 2 or 3.


### Create a file with the code to control the Arduino LED
Create new folder called "CylonSample" on your PC. Open the folder and create a new file called cylonsample.js and place the contents below to it.
<UL>
{% highlight JavaScript %}
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM5' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
{% endhighlight %}
</UL>

### Get Cylon
* Open a command window.
* Navigate to the CylonSample folder (created in the previous section).
* Run `npm install cylon cylon-firmata cylon-gpio cylon-i2c --target_arch=arm`


### Copy the sample to your Raspberry Pi 2 or 3
Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials (if you have not changed them) are:

   username: <IP address or device name, default is minwinpc>\Administrator  
   password: p@ssw0rd  

Copy the CylonSample folder on your PC to C:\CylonSample on the Raspberry Pi 2 or 3.


### Set up the connection between your Arduino and Raspberry Pi 2 or 3
Connect your Arduino and Raspberry Pi 2 or 3 with the USB cable. When you do, if your Raspberry Pi 2 or 3 is connected to a monitor, 
you should see the device getting recognized like in the image below:

![Arduino Start Screen]({{site.baseurl}}/Resources/images/Nodejs/arduino-startscreen.jpg)

We also need to assign a port name to (e.g. 'COM5') to the Arduino. Follow these steps to do this:

* In PowerShell connected to the Raspberry Pi 2 or 3, run `devcon status usb*`. When you do this, you should see a device similar to the one below:

   USB\VID_2341&PID_8036\5&3753427A&0&4  
   Name: USB Serial Device  
   Driver is running.
* Run `reg add "HKLM\SYSTEM\ControlSet001\Enum\usb\VID_2341&PID_8036\5&3753427A&0&4\Device Parameters" /v "PortName" /t REG_SZ /d "COM5" /f`.
* Run `shutdown /r /t 0` to reboot the device.
* When the device restarts, reconnect PowerShell and you can run the sample code!


### Run the sample!
In PowerShell, run the command `& 'C:\Node.js (ChakraCore)\Node.exe' C:\CylonSample\cylonsample.js`.
After running the command, the LED (shown with the arrow in the picture below) on the Arduino should start blinking every 1 second.

![Arduino RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-rpi2.jpg)


### GitHub
* Node.js (ChakraCore) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
