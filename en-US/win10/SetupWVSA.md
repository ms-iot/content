---
layout: default
title: SetupWindowsVirualShieldsArduino
permalink: /en-US/win10/SetupWVSA.htm
lang: en-US
deviceName: WVSA
---

#Get Started

This section explains how to set up your Arduino to run with Virtual Shields for Arduino!

{% include steps.html device=page.deviceName %}

#Setup for Windows Virtual Shields for Arduino (Arduino and PC)

##Hardware

###What you need
This application establishes a connection between your Arduino and your Windows 10 virtual shield using either USB, Bluetooth, or Wi-Fi.  This particular tutorial will explain how to complete setup using a Bluetooth connection, but feel free to experiment with the other options.

 1. Arduino Uno or compatible device.
 2. Connecting wires.
 3. A PC - used to upload your Arduino sketches.
 4. Standard A to Standard B USB - needed to upload sketches to your Arduino device.
 5. OPTIONAL Bluetooth module - only needed if you choose to connect by Bluetooth, we recommend the [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}.
 6. OPTIONAL Wi-Fi module - only needed if you choose to connect by Wi-Fi, we recommend this [Arduino Wi-Fi Shield](https://www.arduino.cc/en/Main/ArduinoWiFiShield){:target="_blank"}.

###Set up your Arduino
 1. Prepare the Bluetooth module if necessary (the Bluetooth module may need to have headers soldered onto it).
 2. Except for the one difference noted below, connect the Bluetooth module to the Arduino per the wiring diagram ([BlueSMiRF wiring diagram](https://learn.sparkfun.com/tutorials/using-the-bluesmirf/hardware-hookup){:target="_blank"}).

		DIFFERENCE: Use pins 0 and 1 instead of 2 and 3:
		The Bluetooth TX should connect to pin 0 (Arduino RX or RX0).
		The Bluetooth RX should connect to pin 1 (Arduino TX or TX0).

##Software

###What you need
 1. Arduino IDE 1.6 or better.
 2. ArduinoJson library.
 3. This [repository](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"}, which contains the example sketch which will run on the Arduino.

###Set up your Arduino IDE
 1. Download and install the [Arduino IDE](http://www.arduino.cc/en/Main/Software){:target="_blank"}.  Launch the program.
 2. Verify that you have the correct Arduino board selected under *Tools > Board*.
 3. Verify that you have the correct COM Port selected under *Tools > Port*.  The name of the board should appear next to each option, making it much easier to choose the correct option.

###Set up ArduinoJson library
 1. From the [ArduinoJson repository](https://github.com/bblanchon/ArduinoJson){:target="_blank"}, clone the repository or download the zip.
 2. Place the whole repository into your libraries folder (i.e. Documents\Arduino\libraries\ArduinoJson\).

###Set up this repository
 1. Clone this [repository](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"} or download the ZIP.  If you're not familiar with git and want to do a proper clone, follow the instructions [here](https://help.github.com/articles/cloning-a-repository/){:target="_blank"}.
 2. Copy the "VirtualShield" folder, found in the "Arduino\Libraries" folder of the repository you just downloaded, to your Arduino library folder (i.e. Documents\Arduino\libraries\VirtualShield\).

###Test your setup
 1. From the Arduino IDE, go to the menu item File->Examples->Virtual Shields->HelloWorld-Speech-Eventing. This should load the speech-recognition based Hello World example we're using for this tutorial.
 2. Before uploading the sketch to your Arduino, temporarily remove the Bluetooth TX and RX wires from the Arduino (there is only one serial port shared between the USB and Bluetooth - the Bluetooth interferes with the upload).
 3. Upload the sketch by pressing the "Upload" button in the IDE.
 4. Replace the Bluetooth TX and RX wires into the Arduino pins (Bluetooth TX to Arduino RX (or RX0) and Bluetooth RX to Arduino TX or (TX0)).
 5. On the phone (or other Windows device) you prepared on the previous page, pair to the Bluetooth device on your Arduino in the Bluetooth settings. If you're using the BlueSMiRF, the default pin code is 1234. NOTE: The red blinking light on the BlueSMiRF continues to blink red after a successful pairing. This is expected. It only turns green after a connecting with the application.

You should now be ready to run our sample on the next page!

 {% include nextsteps.html device=page.deviceName %}
