---
layout: default
title: NodejsWUBlinky
permalink: /win10/samples/NodejsWUBlinky.htm
---

<div class="container" markdown="1">
##Blinky Node.js Server Sample (Windows Universal)


###Set up your PC
* Follow the instructions [here]({{site.baseurl}}/win10/SetupPC.htm) to install Visual Studio 2015 Preview.
* Install [Node.js Tools 1.1 Beta for Visual Studio 2015](http://aka.ms/ntvslatest).
* Install [NTVS IoT Extension]({{site.downloadurl}})


###Set up your hardware
The setup for this sample is the same as the C# 'Blinky' [sample]({{site.baseurl}}/win10/samples/Blinky.htm).


###Create a new Node.js (Windows Universal) project
Start Visual Studio 2015 RC and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).
Use the `Basic Node.js Web Server (Windows Universal)` template.

When the project has been created, open up server.js and replace the existing code with the code shown below:
<UL>
{% highlight JavaScript %}
var http = require('http');

var winrt = require("winrt");
winrt.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(6);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output)
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);

http.createServer(function (req, res) {
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high){
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    }else{
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('LED value: ' + currentValue + '\n');
}).listen(1337);
{% endhighlight %}
</UL>
Here's what the code above is doing:

* `GpioController.getDefault()` is called to get the GPIO controller.
* Then we attempt to open the pin by calling `GpioController.openPin()` with the LED pin value.
* Once we have the `pin`, we set it to be off (high) by default using the `GpioController.write()` function.
* When a request is made to the server, the value of the LED is checked and then set to the opposite of the current value. Doing this will toggle the LED on and off with each request made to the server.

###Deploy the server to your Windows IoT Core device
* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties). Enter the IP Address in the Remote Machine text box. If you're building for Minnowboard Max, select `x86` in the dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging the server.

* When the server is running, open up a browser and enter the address http://&lt;IP address of your device&gt;:1337. Refreshing the page will turn toggle the on/off state of the LED.

</div>
