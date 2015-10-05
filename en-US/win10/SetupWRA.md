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

1. **A PC running Windows** - as prepared in the previous step.
1. **An Arduino board** - our sample is tested to work with the Arduino Uno.
1. **Standard A to Standard B USB cord**
1. **OPTIONAL Bluetooth device for Arduino** - we recommend the [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}.

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

If you wish to use the recommended Bluetooth pairing between your devices, you will need to [hook up a Bluetooth device to the Arduino](https://github.com/ms-iot/remote-wiring/blob/master/bluetooth.md){:target="_blank"}. We recommend the [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}.  Follow the steps on our GitHub to setup the Bluetooth module before moving on to the next step; otherwise, you can use USB connection with no further setup.

{% include nextsteps.html device=page.deviceName %}
