---
layout: default
title: SetupWindowsVirualShieldsArduino
permalink: /win10/SetupWVSA.htm
---

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="row">
    <h1>Get Started</h1>
    <div class="col-md-8">
        <p>This section explains how to set up your Windows Virtual Shields for Arduino!</p>
    </div>
    <ul class="nav nav-justified get-started-steps text-center">
        <li>
          <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/SetupWVSA.htm"><h3 class="active">2. Set up your Windows Virtual Shields for Arduino and PC</h3></a>
          <span class="glyphicon glyphicon-time"></span> 30min
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/SetupPCWVSA.htm"><h3 class="inactive">3. Set up your Phone and PC</h3></a>
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/samples/BlinkyWVSA.htm"><h3 class="inactive">4. Develop</h3></a>
        </li>
    </ul>
</div>

<div class="col-md-12" markdown="1">

#Setup for Windows Virtual Shields for Arduino (Arduino and PC)

##Hardware

###What you need
 1. Arduino Uno or compatible device.
 2. Bluetooth module: SparkFun BlueSMiRF Silver (https://www.sparkfun.com/products/12577) and 4 wires to connect.

###Set up your Arduino
 1. Prepare the Bluetooth module if necessary (the Bluetooth module may need to have headers soldered onto it).
 2. Except for one difference below, connect the Bluetooth module to the Arduino per your wiring diagram ([BlueSMiRF wiring diagram](https://learn.sparkfun.com/tutorials/using-the-bluesmirf/hardware-hookup)).
    DIFFERENCE: Use pins 0 and 1 instead of 2 and 3:
    The Bluetooth TX should connect to pin 0 (Arduino RX).
    The Bluetooth RX should connect to pin 1 (Arduino TX).

##Software

###What you need
 1. Arduino IDE 1.6 or better.
 2. ArduinoJson library.
 3. This repository.

###Set up your Arduino IDE
 1. Download and install the [Arduino IDE](http://www.arduino.cc/en/Main/Software).
 2. Try downloading an empty sketch (setup and loop only) to make sure that your board and port settings are correct (found under the Tools menu).

###Set up ArduinoJson library
 1. From the [ArduinoJson repository](https://github.com/bblanchon/ArduinoJson), clone the repository or download the zip.
 2. Place the whole repository into your libraries folder (i.e. Documents\Arduino\libraries\ArduinoJson\).

###Set up this repository.
 1. Clone this repository or download the zip.
 2.	Copy the Arduino/libraries/VirtualShield folder from your repository to your Arduino library (i.e. Documents\Arduino\libraries\VirtualShield\).

###Test your setup
 1. From the Arduino IDE, go to the menu item File->Examples->Virtual Shields->Hello Blinky. This should load the Hello Blinky example.
 2. Before uploading, temporarily remove the Bluetooth TX and RX wires from the Arduino. (There is only one serial port shared between the USB and Bluetooth. The Bluetooth interferes with the upload).
 3. Upload the sketch.
 4. Replace the Bluetooth TX and RX wires into the Arduino pins. (Bluetooth TX to Arduino RX and Bluetooth RX to Arduino TX).
 5. (In order to see anything on the phone, you will need to go to the next step (Set up your Phone and PC).

</div>
