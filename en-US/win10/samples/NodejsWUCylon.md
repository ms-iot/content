---
layout: default
title: NodejsWUCylon
permalink: /en-US/win10/samples/NodejsWUCylon.htm
lang: en-US
---

## Cylon Node.js (Universal Windows) Sample

{% include VerifiedVersion.md %}

In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 or 3 to control a servo connected to an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed).


### Hardware required
* Raspberry Pi 2 or 3.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Uno is used in this sample).
* USB to USB B cable.
* Servo.


### Set up your PC
* Install Windows 10 [with November update](http://windows.microsoft.com/en-us/windows-10/windows-update-faq).
* Install Visual Studio 2015 Update 1.
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


### Set up the connection between your Arduino and Raspberry Pi 2 or 3
Connect your Arduino and Raspberry Pi 2 or 3 with the USB cable. If your Raspberry Pi 2 or 3 is connected to a monitor, 
you should see the device getting recognized as shown in the image below (the name of the device may be "Arduino Uno" instead of "USB Serial Device"):

![Arduino Uno Start Screen]({{site.baseurl}}/Resources/images/Nodejs/arduino-uno-startscreen.png)

Now we need to get the string that identifies the Arduino and will be used in sample code. Follow these steps to do this:

* In a PowerShell window connected to the Raspberry Pi 2 or 3, run `devcon status usb*`. When you do this, you should see a device similar to the one below:

   USB\VID_2341&PID_0043\85436323631351311141  
   Name: USB Serial Device  
   Driver is running.
* Replace the code in app.js with the code shown below. If using a USB device ID, be sure to add extra \ after both \\ characters
  E.g. in the example above, the final string in the code should be "USB\\\VID_2341&PID_0043\\\85436323631351311141".
  
<UL>
{% highlight JavaScript %}
var Cylon = require('cylon');

Cylon.robot({
    connections: {
        arduino: { adaptor: 'firmata', port: 'USB\\VID_2341&PID_0043\\85436323631351311141' }
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

* Attach the servo to the the arduino board using pin 3 (you can also change the pin number in app.js). In the setup shown below, the signal wire is connected to pin 3 and the power source is the Raspberry Pi 2 or 3.

![Arduino Servo RPi2]({{site.baseurl}}/Resources/images/Nodejs/arduino-servo-rpi2.png)


### Deploy the app to your Raspberry Pi 2 or 3
* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties). Enter the IP Address in the Remote Machine text box. Since you're building for Raspberry Pi 2 or 3, select `ARM` in the dropdown menu.

* Now we're ready to deploy the app to the Raspberry Pi 2 or 3. Simply press F5 (or select Debug \| Start Debugging) to start debugging the app. This step will also start rotating the motor on the servo.


### GitHub
* Node.js (Chakra) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
