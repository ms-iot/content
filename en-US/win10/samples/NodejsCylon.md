---
layout: default
title: NodejsCylon
permalink: /en-US/win10/samples/NodejsCylon.htm
lang: en-US
---

##Cylon Node.js (Console Application) Sample
In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 to blink the LED on an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed) once per second.

###Hardware required
* Raspberry Pi 2.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Leonardo is used in this sample).
* USB to Micro USB cable.

###Set up your PC
* Install Windows 10.
* Install Visual Studio 2015.
* Install the latest Node.js Tools for Windows IoT from [here](https://github.com/ms-iot/ntvsiot/releases).
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install Arduino software from [here](https://www.arduino.cc/en/Main/Software).


###Upload Firmata to your Arduino
* Connect the Arduino board with your PC using the USB cable.
* Open Arduino software.
* Go to Tools->Port and select your device.
* Go to Tools->Board and click on the type of Arduino you have.
* Go to File->Examples->Firmata and select StandardFirmata. This will open up a new window with the Firmata sketch.
* Click the upload button to upload the sketch to the Arduino board. You should see a "Done uploading" message when the upload is complete.


###Copy Node.js to your Raspberry Pi 2
* Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials are:

   username: <IP address or device name, default is minwinpc>\Administrator  
   password: p@ssw0rd  

  NOTE: It is **highly recommended** that you update the default password for the Administrator account.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).  

* Run `& 'C:\Program Files (x86)\Node.js (chakra)\CopyNodeChakra.ps1' -arch <ARM | x86 | x64 > -ip <Device IP Address>`. Use `ARM` if you have a Raspberry Pi 2. Use `x86` if you have a MinnowBoard Max. 
  After completing this step, Node.js will be in `c:\Node.js (Chakra)` on your device. **Note:** If you haven't entered the credentials through the explorer window you will get an "Access Denied" error.


###Create the Cylon Node.js file
Create a new file called cylonsample.js and place the contents below to it.
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
Create folder for Node on the device using an explorer window called C:\CylonSample. Then copy cylonsample.js to this folder.


###Build Serialport
Build [serialport](https://www.npmjs.com/package/serialport), a Cylon dependency, that you will copy to the Raspberry Pi 2. Since serialport is a native module, 
we cannot run `npm install` on Windows IoT core to build the code. We will build on the PC and then copy the package to the device.

* Clone [this](https://github.com/ms-iot/node-serialport) temporary fork of serialport and checkout the 'master' branch.
* In the node-serialport root, run `npm install nan` from a command window.
* Run `"[Node.js (Chakra) installation path]\node_modules\npm\bin\node-gyp-bin\node-gyp.cmd" rebuild --module_name=serialport --module_path=. --target_arch=arm` 
  The default Node.js (Chakra) installation path is "c:\Program Files (x86)\Node.js (chakra)".
* If the last step is successful, you will see **serialport.node** in [serialport clone path]\build\Release
* Change "module_path" in [serialport clone path]\package.json to "./build/release/".


###Install Cylon and copy Serialport to your Raspberry Pi 2
* Connect to the device using PowerShell. Instructions to do this can be found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).
* cd to C:\CylonSample.
* Create a folder called node_modules (you can run `mkdir node_modules`).
* cd to C:\CylonSample\node_modules and create a folder called serialport (you can run `mkdir serialport`). The final path should be C:\CylonSample\node_modules\serialport
* Copy the folders and files in the serialport clone on your PC to the serialport folder on the device.
* cd back to C:\CylonSample.
* Run `& 'C:\Node.js (Chakra)\npm.cmd' install cylon cylon-firmata cylon-gpio cylon-i2c`. You may see some warnings about version mismatches which you can ignore. Make sure to run this command **after** serialport is copied.



###Set up the connection between your Arduino and Raspberry Pi 2
Connect your Arduino and Raspberry Pi 2 with the USB cable. When you do, if your Raspberry Pi 2 is connected to a monitor, 
you should see the device getting recognized like in the image below:

![Arduino Start Screen]({{site.baseurl}}/images/Nodejs/arduino-startscreen.jpg)

We also need to assign a port name to (e.g. 'COM5') to the Arduino. Follow these steps to do this:

* In PowerShell connected to the Raspberry Pi 2, run `devcon status usb*`. When you do this, you should see a device similar to the one below:

   USB\VID_2341&PID_8036\5&3753427A&0&4  
   Name: USB Serial Device  
   Driver is running.
* Run `reg add "HKLM\SYSTEM\ControlSet001\Enum\usb\VID_2341&PID_8036\5&3753427A&0&4\Device Parameters" /v "PortName" /t REG_SZ /d "COM5" /f`.
* Run `shutdown /r /t 0` to reboot the device.
* When the device restarts, reconnect PowerShell and you can run the sample code!


###Run the sample!
In PowerShell, run the command `& 'C:\Node.js (Chakra)\Node.exe' C:\CylonSample\cylonsample.js`.
After running the command, the LED (shown with the arrow in the picture below) on the Arduino should start blinking every 1 second.

![Arduino RPi2]({{site.baseurl}}/images/Nodejs/arduino-rpi2.jpg)


### GitHub
* Node.js (Chakra) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
