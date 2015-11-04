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
* Install npm v3 (to take advantage of the flat node module dependency structure npm v3 introduced):
  * Open a command window (as Administrator) and run `npm install -g npm-windows-upgrade`
  * Then run `npm-windows-upgrade --version:3.3.3 --npm-path:"C:\Program Files (x86)\Node.js (Chakra)"` (Note: Change npm-path if you picked a different installation path for Node.js (Chakra)).
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


###Create a file with the code to control the Arduino LED
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

###Get Cylon
* Open a command window.
* Navigate to the CylonSample folder (created in the previous section).
* Run `npm install cylon cylon-firmata cylon-gpio cylon-i2c`


###Build Serialport
**Note:** Even though serialport is installed when Cylon is installed, you still need to build the native serialport.node addon that:

* Corresponds with the processor architecture of the device you are targeting (in this case ARM for Raspberry Pi 2).
* Includes an [update](https://github.com/voodootikigod/node-serialport/pull/550) for serialport to work on Windows 10 IoT Core.

Steps to build serialport:

1. From your Git shell (get GitHub Desktop for Windows [here](https://desktop.github.com/)),  clone [this](https://github.com/Microsoft/node) temporary fork of node.js.
2. Run `git checkout ch0.12`
3. Run `.\vcbuild.bat arm chakra openssl-no-asm` and wait for node to build.
4. Clone [this](https://github.com/ms-iot/node-serialport) temporary fork of serialport and checkout the 'master' branch.
5. In a command window, go to the serialport clone root.
6. Run `npm install nan`
7. Run `node.exe [node.js clone root]\deps\npm\node_modules\node-gyp\bin\node-gyp.js rebuild --nodedir=[node.js clone root] --target_arch=arm --module_name=serialport --module_path=.`
8. If the last step is successful, you will see **serialport.node** in [serialport clone path]\build\release.
9. Copy [serialport clone root]\build\release\serialport.node to [CylonSample folder path]\node_modules\serialport\build\serialport\v1.7.4\Release\node-v14-win32-arm\serialport.node
  (**Note:** node-v14-win32-arm is a new folder you will create).


###Copy the sample to your Raspberry Pi 2
* Copy the CylonSample folder on your PC to C:\CylonSample on the Raspberry Pi 2.


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
