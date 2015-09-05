---
layout: default
title: NodejsWUBlinky
permalink: /en-US/win10/samples/NodejsWUBlinky.htm
lang: en-US
---

##Blinky Node.js Server Sample (Windows Universal)


###Set up your PC
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm) to install Visual Studio 2015 Preview.
* Install [Node.js Tools 1.1 Beta for Visual Studio 2015](http://aka.ms/ntvslatest){:target="_blank"}.
* Install [NTVS IoT Extension]({{site.downloadurl}}) (This step requires that you have signed up with our program on Microsoft Connect. Instructions on how to do that can be found [here]({{site.baseurl}}/{{page.lang}}/Downloads.htm)).


###Set up your hardware
The setup for this sample is the same as the C# 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).


###Create a new Node.js (Windows Universal) project
Start Visual Studio 2015 RC and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).
Use the `Basic Node.js Web Server (Windows Universal)` template.

When the project has been created, open up server.js and replace the existing code with the code shown below:
<UL>
{% highlight JavaScript %}
var http = require('http');

var uwp = require("uwp");
uwp.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
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

uwp.close();
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

  **Note:** In the Output window, you may see the message "Error - Cannot load packages." This doesn't affect the build process and can be ignored. Using the npm feature in your project is not yet supported.

* When the server is running, open up a browser and enter the address http://&lt;IP address of your device&gt;:1337. Refreshing the page will turn toggle the on/off state of the LED.
