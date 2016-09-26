---
layout: sample
title: Cylon servo controller
description: Control a servo connected to an Arduino using Cylon in a Node.js UWP app
keywords: Windows 10 IoT Core, azure, uploader, data
permalink: /en-US/Samples/CylonServoNode.htm
samplelink: N/A
lang: en-US
---

# Cylon servo controller

In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 or 3 to control a servo connected to an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed).


### Hardware required
* Raspberry Pi 2 or 3.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Uno is used in this sample).
* USB to USB B cable.
* Servo.


### Set up your PC
* Install Windows 10 [with November update](http://windows.microsoft.com/en-us/windows-10/windows-update-faq).
* Install Visual Studio 2015 Update 3.
* Install the latest Node.js Tools for Windows IoT from [here](http://aka.ms/ntvsiotlatest).
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


### Create a new Cylon (Universal Windows) project
Start Visual Studio 2015 and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).

Select the `Basic Node.js Cylon Application (Universal Windows)` template (shown below), enter a name for your project, then press OK.

![Node.js Cylon Project Dialog]({{site.baseurl}}/Resources/images/Nodejs/nodejswucylon-newprojectdialog.png)

Wait for the Cylon package and its dependencies to complete downloading. This will be indicated by the message below in the npm output window.

![Node.js Output Window]({{site.baseurl}}/Resources/images/Nodejs/npm-output-window.png)

Right-click on the npm node in the Solution Explorer (shown below) and select Update npm Packages.
This step will run npm dedupe and update [serialport](https://www.npmjs.com/package/serialport) (a Cylon dependency) with a [version](https://github.com/ms-iot/node-serialport/tree/uwp) that works with Node.js UWP.

![Node.js Npm Menu]({{site.baseurl}}/Resources/images/Nodejs/npm-update-menu.png)


### Connect your Arduino to your Raspberry Pi 2 or 3
Connect your Arduino and Raspberry Pi 2 or 3 with the USB cable. If your Raspberry Pi 2 or 3 is connected to a monitor, 
you should see the device getting recognized as shown in the image below (the name of the device may be something like "Arduino Uno" instead of "USB Serial Device"):

![Arduino Uno Start Screen]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)


### Get the port name of the Arduino
* Let's get the device ID that is associated with your Arduino (we will need this later in the Cylon code). To do that replace the code in app.js with the code shown below.

<UL>
{% highlight JavaScript %}
var SerialPort = require('serialport');
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});
{% endhighlight %}
</UL>

* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties). 
  Enter the IP Address in the Remote Machine text box. Since you're building for Raspberry Pi 2 or 3, select `ARM` in the dropdown menu.

* Press F5 (or select Debug \| Start Debugging) to deploy and start the app. When the app runs, it will output the names of ports that are attached to your
  Raspberry Pi (see image below). Make a note of the ID (value of 'port.comName' in the code above) for the Arduino since we'll use it in the next step.
  
  ![Serial port list]({{site.baseurl}}/Resources/images/Nodejs/nodejs-serialportlist.png)

### Deploy and start your Cylon app
* Replace the code in app.js with the Cylon code shown below. Also replace the port value with the ID of your device. 
  Be sure to double the backslashes in the string. e.g. `\\?\` should be `\\\\?\\`.
  
<UL>
{% highlight JavaScript %}
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { 
	  adaptor: 'firmata', 
	  port: '\\\\?\\USB#VID_2341&PID_8036&MI_00#6&35ca7e90&0&0000#{86e0d1e0-8089-11d0-9ce4-08003e301f73}' 
	}
  },

  devices: {
    servo: { driver: 'servo', pin: 3 }
  },

  // The "work" will move the servo from angle 45 to 90 to 135.
  work: function (my) {
    var angle = 45;
    my.servo.angle(angle);
    every((1).second(), function () {
      angle = angle + 45;
      if (angle > 135) {
        angle = 45
      }
      my.servo.angle(angle);
    });
  }
}).start();
{% endhighlight %}
</UL>

* Attach the servo to the the arduino board using pin 3 (you can also change the pin number in app.js). In the setup shown below, 
  the signal wire is connected to pin 3 and the power source is the Raspberry Pi.

  ![Arduino Servo RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-servo-rpi2.png)

* Press F5 (or select Debug \| Start Debugging) to deploy and start the app. This step will also start rotating the motor on the servo.


### GitHub
* Node.js (Chakra) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
