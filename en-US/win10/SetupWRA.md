---
layout: default
title: Setup your Windows Remote Arduino
permalink: /en-US/win10/SetupWRA.htm
lang: en-US
deviceName: WRA
---

#Get Started

This section explains how to set up your Arduino and how to add the Windows Remote Arduino library to your Windows projects!

{% include steps.html device=page.deviceName %}

##What you need

In this section, we prepare an Arduino device to be controlled remotely by the Windows 10 device prepared previously.  The Arduino needs to be running a version of Firmata, which will allow the board to communicate with our app via USB, Bluetooth, or Wi-Fi.  You can decide which of these communication connections you want - be sure to choose your parts below accordingly.

You'll need:

1. **A Windows device** - not necessarily the one prepared in the previous step, but any device you can use to upload sketches to your Arduino.
2. **An Arduino board** - our sample is tested to work with the Arduino Uno.
3. **Standard A to Standard B USB cord** - needed no matter what to upload the Arduino sketch, regardless of connection choice.
4. **OPTIONAL Bluetooth device for Arduino** - only needed if you choose to connect by Bluetooth. We recommend the [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}.
5. **OPTIONAL Wi-Fi device for Arduino** - only needed if you choose to connect by Wi-Fi. We recommend this [Arduino Wi-Fi Shield](https://www.arduino.cc/en/Main/ArduinoWiFiShield){:target="_blank"}.

##Arduino Setup

Windows Remote Arduino uses the [Firmata protocol](https://github.com/firmata/protocol){:target="_blank"}, which has implementations in many languages including Arduino. The Arduino implementation is called [StandardFirmata](https://github.com/firmata/arduino/blob/master/examples/StandardFirmata/StandardFirmata.ino){:target="_blank"} and comes pre-packaged with the Arduino software when you install it. Follow the steps below to upload the StandardFirmata sketch to your Arduino.

1. Download and install the Arduino software from [http://arduino.cc](http://arduino.cc){:target="_blank"}.
2. Connect your Arduino device to the computer using USB.
3. Launch the Arduino application.
4. Verify that you have the correct Arduino board selected under *Tools > Board*.
5. Verify that you have the correct COM Port selected under *Tools > Port*.  The name of the board should appear next to each option, making it much easier to choose the correct option.
6. In the Arduino IDE, navigate to *File > Examples > Firmata > StandardFirmata*.
7. Press “Upload” to deploy the StandardFirmata sketch to the Arduino device.

Your Arduino will now run the StandardFirmata sketch forever unless reprogrammed with a different sketch. You can now optionally disconnect your Arduino from the computer and power it in any way you choose.

At this point, you can use the USB connection with no additional work - if you choose this option, move on to the next page.  Otherwise, follow one of the instruction sets below to setup a Bluetooth or Wi-Fi device.

If you wish to use the recommended Bluetooth pairing between your devices, you will need to [hook up a Bluetooth device to the Arduino](https://github.com/ms-iot/remote-wiring/blob/master/bluetooth.md){:target="_blank"}.  Follow the steps on our GitHub to setup the Bluetooth module before moving on to the next step.

If you wish to use the Wi-Fi pairing between your devices, you will need to [hook up a Wi-Fi device to the Arduino](https://github.com/ms-iot/remote-wiring#notes-on-wifi-and-ethernet){:target="_blank"}.  Follow the steps on our GitHub to setup the Bluetooth module before moving on to the next step.

{% include nextsteps.html device=page.deviceName %}
