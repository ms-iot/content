---
layout: code
title: Standard Firmata
permalink: /Firmata.htm
---

# Firmata and Cylon
[Firmata](http://firmata.org/) is a protocol for communicating with Microcontrollers, typically over a serial channel. This protocol exposes the hardware GPIO - allowing an application running on another computer to control or query them directly. Standard Firmata is an implementation of the protocol for Arduino compatible broards, and has been updated to work for the Windows Developer Program for IoT release.

[Cylon.js](http://cylonjs.com/) is a Node.js extenions for controlling devices such as Robots or Internet Of Things. 

In this sample, we will show you how to use these technologies to remotely control and expose a webpage from your Intel Galileo running Windows.

# Firmata
The Standard Firmata software will be running in Windows on the Intel Galileo board. This project will use the _NetworkSerial_ implementation - which allows Arduino HardwareSerial to work over a Network Socket instead of a serial port.

First, you'll need to create a new project. Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app.

Next, you'll need to download files from Firmata and add them to your project directory. These files should not be added to the project in Visual Studio as they are included by main.cpp.

* [Boards.h](https://raw.githubusercontent.com/ms-iot/arduino/master/Boards.h){:target="_blank"}
* [Firmata.h](https://raw.githubusercontent.com/ms-iot/arduino/master/Firmata.h){:target="_blank"}
* [Firmata.cpp](https://raw.githubusercontent.com/ms-iot/arduino/master/Firmata.cpp){:target="_blank"}
* [StandardFirmata.ino](https://raw.githubusercontent.com/ms-iot/arduino/master/examples/StandardFirmata/StandardFirmata.ino){:target="_blank"}

_ino_ files require additional headers when compiling on Microsoft Windows. To support building an ino file, we are including them into a C++ file.

You'll need to edit the project settings - right click on the Project in the Solution Explorer, then select Properties. Under Configuration Properties -> C/C++ -> Preprocessor, add `USE_NETWORKSERIAL;_CRT_SECURE_NO_WARNINGS;INTEL_GALILEO;` to Preprocessor Definitions.

![Preprocessor](images/FirmataProjectSettings.png)

Next, replace the content of main.cpp with the following:
{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include "Servo.h"
#include "Firmata.h"
#include "Firmata.cpp"

#include "StandardFirmata.ino"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}


{% endhighlight %}

Finally, build and deploy this app to your board.

# Cylon
You'll use Cylon.js through Node.js on your development to communicate with Standard Firmata over a network socket. 

* Install [Node.js](http://nodejs.org/){:target="_blank"}. 
* Optionally install the [Node.js extension for Visual Studio](https://nodejstools.codeplex.com/){:target="_blank"}. This will allow you to debug your Node.js app.
* Open the Node.js command prompt, and navigate to your Intel Galileo project
* Create a directory called Server
* Install cylon - `npm install cylon`
* Install cylon-firmata - `npm install cylon-firmata`
* Create a file called main.js in the Server directory

Copy the following code into main.js:

{% highlight js %}
var Cylon = require("cylon");
var net = require("net");


var socket = net.createConnection(27015, 'mygalileo');

// Initialize the robot
var robot = Cylon.robot(
{
  // Change the port to the correct port for your Arduino.
  connection: 
  {
      name: 'arduino',
      adaptor: 'firmata',
      port: socket
  },
  device: { name: 'led', driver: 'led', pin: 13 },

  work: function(my) 
  {
    // we do our thing here
    every((1).second(), function() { my.led.toggle(); });
  }
});

// start working
robot.start();

{% endhighlight %}

# Run Cylon on your development machine
From the Node.js command prompt, launch your program:

`node main.js`

You should see the LED blinking.

---
[&laquo; Return to Samples](SampleApps.htm){: .btn .btn-default} 
