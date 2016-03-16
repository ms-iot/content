---
layout: default
title: NodejsCylon
permalink: /en-US/win10/samples/NodejsCylon.htm
lang: en-US
---

## Cylon Node.js (Console Application) Sample

{% include VerifiedVersion.md %}

In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 or 3 to blink the LED on an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed) once per second.

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
* Use [Windows file sharing]({{site.baseurl}}/{{page.lang}}/win10/samples/SMB.htm), [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm), 
or [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to create `C:\Node.js (ChakraCore)` folder on your Raspberry Pi 2 or 3.
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
* Run `npm install cylon cylon-firmata cylon-gpio cylon-i2c`


### Get Serialport
**Note:** Even though serialport is installed when Cylon is installed, you still need to get a version that:

* Corresponds with the processor architecture of the device you are targeting (in this case ARM for Raspberry Pi 2 or 3).
* Includes an [update](https://github.com/voodootikigod/node-serialport/pull/550) for serialport to work on Windows 10 IoT Core.

Steps to get serialport:

* Copy and unzip the file [here](http://aka.ms/spcc_zip) to your PC.
* Copy &lt;Unzipped folder&gt;\console\arm\serialport.node to [CylonSample folder path]\node_modules\serialport\build\Release\node-v47-win32-arm\serialport.node  
  **Note:** node-v47-win32-arm is a new folder you will create.


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
