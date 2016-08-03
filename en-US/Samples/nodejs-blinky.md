---
layout: sample
title: Nodejs Console Blinky
permalink: /en-US/Samples/nodejs-blinky.htm
lang: en-US
---

# Blinky Node.js (Console Application) Sample



This page will take you through the steps to blink an LED from a Node.js console app running on a Raspberry Pi. This sample is similar to the 
[Node.js (UWP) blinky sample]({{site.baseurl}}/{{page.lang}}/Samples/NodejsWUBlinky.htm). 
The difference is that we'll be using the win32 console version of Node.js (Chakra) and running it via command line.


### Set up your hardware
The hardware setup for this sample is the same as the C# 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/Samples/Blinky.htm).


### Set up your PC
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install x64 or x86 Node.js (Chakra) from [here](http://aka.ms/node-chakra-installer). Even though we'll be running an ARM version
  of Node.js on the Raspberry Pi, we still need this step to install the npm package used in the next steps.
* Create a folder on your PC that will contain the files for your app. Let's call it c:\MyNodejsBlinky.
* In a command window, cd to c:\MyNodejsBlinky.
* Run `npm install uwp --target_arch=arm`. This step will install the [uwp npm package](https://www.npmjs.com/package/uwp) 
  that will allow you to access UWP APIs from your Node.js code.
* In the same folder, create new file called blinky.js, copy the content below and save:
<UL>
{% highlight JavaScript %}
var http = require('http');

// Inject 'Windows' namespace to global
var uwp = require("uwp");
uwp.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output)
pin.write(Windows.Devices.Gpio.GpioPinValue.high);

setInterval(function () {
  if (pin.read() == Windows.Devices.Gpio.GpioPinValue.high) {
    pin.write(Windows.Devices.Gpio.GpioPinValue.low);
  } else {
    pin.write(Windows.Devices.Gpio.GpioPinValue.high);
  }
}, 1000);
{% endhighlight %}
</UL>

Here's what the code above is doing:

* We use the [node-uwp](https://www.npmjs.com/package/uwp) npm package to allow the code to use UWP APIs (within Windows namespace).
* `GpioController.getDefault()` is called to get the GPIO controller.
* Then we attempt to open the pin by calling `GpioController.openPin()` with the LED pin value.
* Once we have the `pin`, we set it to be off (high) by default using the `GpioController.write()` function.
* Every second, the value of the pin will be changed to blink the LED.


### Copy your app to the Raspberry Pi
* Open up an explorer window on your PC and enter **\\\\\<IP address of your device\>\\C$** to access files on your device. The credentials (if you have not changed them) are:

   username: <IP address or device name, default is minwinpc>\Administrator  
   password: p@ssw0rd  
* Copy your MyNodejsBlinky folder to C:\ drive root. 


### Copy Node.js to your Raspberry Pi
* Download node.exe for ARM from [here](http://aka.ms/node-chakra-installer) to your PC.
* Create `C:\NodejsChakra` folder on your Raspberry Pi and copy node.exe to that location.


### Run the app!
* Connect to the device using [SSH]({{site.baseurl}}/{{page.lang}}/Docs/SSH.htm) or [PowerShell]({{site.baseurl}}/{{page.lang}}/Docs/PowerShell.htm).
* Run the command `C:\NodejsChakra\Node.exe C:\MyNodejsBlinky\app.js` to start the app.


### Notes
* npm can be run on your Windows 10 IoT Core device. However, installation of packages will only succeed if they do not depend on native addons.
  Before running npm you need to follow the steps below.
  * Copy the following folder and file to C:\NodejsChakra (assuming this is where you put node.exe):
    * C:\Program Files\NodejsUwp\Console\node_modules
    * C:\Program Files\NodejsUwp\Console\npm.cmd
  * Run `setx APPDATA c:\Users\Default\AppData\Roaming /M` to set the APPDATA environment variable permanantly.
  * Run `shutdown /r /t 0` to restart your device. When the device has booted you can now run `c:\NodejsChakra\npm.cmd`
* If you get an error/crash when using a native addon with Node.js (Chakra), one of the reasons may be that the addon is using an API that's not supported on IoT Core.
  You can use the [API Porting Tool]({{site.baseurl}}/{{page.lang}}/Docs/IoTAPIPortingTool.htm) to find out.
* While Node.js (Chakra) supports using the uwp npm package, the open source [Node.js (ChakraCore)](https://github.com/nodejs/node-chakracore) does not.  
