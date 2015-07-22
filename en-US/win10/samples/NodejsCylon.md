---
layout: default
title: NodejsCylon
permalink: /en-US/win10/samples/NodejsCylon.htm
lang: en-US
---

##Cylon Node.js (Console Application) Sample
In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 to blink the LED on an Arduino once per second.

###Hardware required
* Raspberry Pi 2.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Leonardo is used in this sample).
* USB to Micro USB cable.

###Set up your PC
* Install Windows 10.
* Install Visual Studio 2015.
* Install the latest NTVS (Node.js Tools for Visual Studio) Bundle Installer from [here](https://github.com/ms-iot/ntvsiot/releases).
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install Arduino software from [here](https://www.arduino.cc/en/Main/Software).


###Upload Firmata to your Arduino
* Connect the Arduino board with your PC using the USB cable.
* Open Arduino software.
* Go to Tools->Port and select on your device.
* Go to Tools->Board and click on the type of Arduino you have.
* File->Examples->Firmata and select StandardFirmata
* Click the upload button to upload the sketch to the Arduino board. You should see a "Done uploading" message when the upload is complete.


###Copy Node.js to your Raspberry Pi 2
* Open a PowerShell window.
* Run `& 'C:\Program Files (x86)\Node.js (chakra)\CopyNodeChakra.ps1' -arch <ARM | x86 | x64 > -ip <Device IP Address>`. Use `ARM` if you have a Raspberry Pi 2. Use `x86` if you have a MinnowBoard Max. 
  After completing this step, Node.js will be in `c:\Node.js (Chakra)` on your device.


###Build serialport
First we will copy serialport, a Cylon dependency, to the Raspberry Pi 2. Since [serialport](https://www.npmjs.com/package/serialport) is a native module, 
we cannot run npm install on Windows IoT core to build  the code. We will do this on the PC and then copy the package to the device.

* Clone [serialport](https://github.com/voodootikigod/node-serialport).
* Clone [Node.js (Chakra)](http://github.com/Microsoft/node){:target="_blank"}.
* Edit serialport_win.cpp with the change in https://github.com/voodootikigod/node-serialport/pull/550. This is temporary until the pull request is merged.
* Run `node.exe [Node.js (Chakra) clone path]\deps\npm\node_modules\node-gyp\bin\node-gyp.js rebuild --nodedir=[Node.js (Chakra) clone path] --module_name=serialport --module_path=. --target_arch=arm`
* If the last step is successful, you will see serialport.node in [serialport clone path]\build\Release
* Last step is to change "module_path" in [serialport clone path]\package.json to "./build/release/".


###Create the Node.js file
Create a new file called cylon.js and place the contents below to it.
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


###Copy the sample code to Windows IoT Core device
Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials are:

    username: <IP address or device name, default is minwinpc>\Administrator
    password: p@ssw0rd

NOTE: It is **highly recommended** that you update the default password for the Administrator account.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).  

Create folder for Node on the device, C:\CylonSample, and copy cylon.js to this folder.

Connect to the device using PowerShell.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

Allow Node.exe to communicate through the firewall with the following command:

* netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Node.js (Chakra)\Node.exe" enable=yes


###Install Cylon and dependencies to your device
* In PowerShell, cd to C:\CylonSample.
* Run `& 'C:\Node.js (Chakra)\npm.cmd install cylon cylon-firmata'`.
* In C:\CylonSample\node_modules, create a folder called serialport (you can run `mkdir serialport`).
* With the explorer window opened in the previous section, copy the folders in the serialport clone to the serialport folder.


###Set up the connection between your Arduino and Raspberry Pi 2
First, connect your Arduino and Raspberry Pi 2 with the USB cable. When you do, if your Raspberry Pi 2 is connected to a monitor, 
you should see the device getting recognized like in the image below:

![Arduino Start Screen]({{site.baseurl}}/images/Nodejs/arduino-startscreen.jpg)

We also need to assign a port name to (e.g. 'COM5') to the Arduino. Follow these steps to do this:

* In PowerShell, run `devcon status usb*`. When you do this you should see a device similar to the one below:
  USB\VID_2341&PID_8036\5&3753427A&0&4
  Name: USB Serial Device
  Driver is running.
* Run `reg add "HKLM\SYSTEM\ControlSet001\Enum\usb\VID_2341&PID_8036\5&3753427A&0&4\Device Parameters" /v "PortName" /t REG_SZ /d "COM5" /f`.
* Run `shutdown /r /t 0` to reboot the device
* When the device restarts, you can run the sample code!


###Run the sample!
In PowerShell, run the command `& 'C:\Node.js (Chakra)\Node.exe' C:\CylonSample\server.js`.
After running the command, the LED (shown with the arrow in the picture below) on the Arduino should start blinking every 1 second.

![Arduino RPi2]({{site.baseurl}}/images/Nodejs/arduino-rpi2.jpg)


### GitHub
* Node.js (Chakra) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
