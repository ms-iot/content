---
layout: default
title: NodejsWUCylon
permalink: /en-US/win10/samples/NodejsWUCylon.htm
lang: en-US
---

##Cylon Node.js (Universal Windows) Sample
In this sample, you will use [Cylon](https://www.npmjs.com/package/cylon) running on a Raspberry Pi 2 to control a servo connected to an Arduino (with [Firmata](https://www.npmjs.com/package/firmata) installed).

###Hardware required
* Raspberry Pi 2.
* [Arduino Board](https://www.arduino.cc/en/main/products) (Uno is used in this sample).
* USB to USB B cable.
* Servo.

###Set up your PC
* Install Windows 10.
* Install Visual Studio 2015.
* Install the latest Node.js Tools for Windows IoT from [here](https://github.com/ms-iot/ntvsiot/releases).
* Install npm v3 (to take advantage of the flat node module dependency structure npm v3 introduced):
  * Open a command window (as Administrator) and run `npm install -g npm-windows-upgrade`
  * Then run `npm-windows-upgrade --version:3.2.2`
* Install [Python 2.7](https://www.python.org/downloads/){:target="_blank"}.
* Install Arduino software from [here](https://www.arduino.cc/en/Main/Software).


###Upload Firmata to your Arduino
* Connect the Arduino board with your PC using the USB cable.
* Open Arduino software.
* Go to Tools->Port and select your device.
* Go to Tools->Board and click on the type of Arduino you have.
* Go to File->Examples->Firmata and select StandardFirmata. This will open up a new window with the Firmata sketch.
* Click the upload button to upload the sketch to the Arduino board. You should see a "Done uploading" message when the upload is complete.


###Create a new Cylon (Universal Windows) project
Start Visual Studio 2015 and create a new project (File \| New Project...). In the `New Project` dialog, navigate to `Node.js` as shown below (in the left pane in the dialog: Templates \| JavaScript \| Node.js).

Select the template `Basic Node.js Cylon Application (Universal Windows)`

![Node.js Cylon Project Dialog]({{site.baseurl}}/images/Nodejs/nodejswucylon-newprojectdialog.png)

You may get a prompt (shown below) to run npm dedupe. If you do, make sure to run it.

![npm dedupe dialog]({{site.baseurl}}/images/Nodejs/npm-dedupe-dialog.PNG)

If you don't get the prompt, you still need to run npm dedupe to avoid node module paths that are too long for deployment on the Raspberry Pi 2.
To do this, right click on the node_modules folder in the Solution Explorer window. Then click on "Open Command Prompt Here...". 
When the command window opens, run `npm dedupe`.


###Build Serialport
**Note:** Even though serialport is installed when a new Cylon project is created, you still need to build the native serialport.node addon that:

* Corresponds with the processor architecture of the device you are targeting (in this case ARM for Raspberry Pi 2).
* Is UWP (Universal Windows Platform) compatible.

Steps to build serialport:

(**You can skip steps 1-8 by copying the zip file [here](https://github.com/ms-iot/ntvsiot/releases/download/1.7.4-uwp/serialport_uwp.zip) which contains prebuilt serialport.node binaries and serialport.js with a UWP patch**)

1. From your Git shell, clone [this](https://github.com/Microsoft/node) temporary fork of node.js.
2. Run `git checkout ch0.12-uwp`
3. Run `.\vcbuild.bat arm chakra uwp-dll openssl-no-asm` and wait for node to build.
4. Clone [this](https://github.com/ms-iot/node-serialport) temporary fork of serialport and checkout the 'uwp' branch.
5. In a cmd window, go to the serialport clone root.
6. Run `npm install nan`
7. Run `node.exe [node.js clone root]\deps\npm\node_modules\node-gyp\bin\node-gyp.js rebuild --nodedir=[node.js clone root] --node_win_onecore --winplat=uwp --target_arch=arm --module_name=serialport --module_path=.`
8. If the last step is successful, you will see **serialport.node** in [serialport clone path]\build\release.
9. Copy [serialport clone root]\build\release\serialport.node to [Cylon project root]\node_modules\serialport\build\serialport\v1.7.4\Release\node-v14-win32-arm\serialport.node
  (**Note:** node-v14-win32-arm is a new folder you will create).
  "Cylon project root" is the the folder created by your new project in the previous section.
10. Copy [serialport clone root]\serialport.js to [Cylon project root]\node_modules\serialport\serialport.js.


###Set up the connection between your Arduino and Raspberry Pi 2
Connect your Arduino and Raspberry Pi 2 with the USB cable. If your Raspberry Pi 2 is connected to a monitor, 
you should see the device getting recognized as shown in the image below (the name of the device may be "Arduino Uno" instead of "USB Serial Device"):

![Arduino Uno Start Screen]({{site.baseurl}}/images/Nodejs/arduino-uno-startscreen.png)

Now we need to get the string that identifies the Arduino and will be used in sample code. Follow these steps to do this:

* In a PowerShell window connected to the Raspberry Pi 2, run `devcon status usb*`. When you do this, you should see a device similar to the one below:

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

* Attach the servo to the the arduino board using pin 3 (you can also change the pin number in app.js). In the setup shown below, the signal wire is connected to pin 3 and the power source is the Raspberry Pi 2.

![Arduino Servo RPi2]({{site.baseurl}}/images/Nodejs/arduino-servo-rpi2.png)


###Deploy the app to your Raspberry Pi 2
* Go to the Project menu and select '&lt;Your project name&gt; Properties' (You could also right-click on the project node in solution explorer to access Properties). Enter the IP Address in the Remote Machine text box. Since you're building for Raspberry Pi 2, select `ARM` in the dropdown menu.

* Now we're ready to deploy the app to the Raspberry Pi 2. Simply press F5 (or select Debug \| Start Debugging) to start debugging the app. This step will also start rotating the motor on the servo.


### GitHub
* Node.js (Chakra) source code: [https://github.com/Microsoft/node](https://github.com/Microsoft/node)
* NTVS IoT Extension source code: [https://github.com/ms-iot/ntvsiot](https://github.com/ms-iot/ntvsiot)
