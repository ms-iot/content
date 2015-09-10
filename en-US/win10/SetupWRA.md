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

##Arduino Setup

Windows Remote Arduino uses the [Firmata protocol](https://github.com/firmata/protocol){:target="_blank"}, which has implementations in many languages including Arduino. The Arduino implementation is called [StandardFirmata](https://github.com/firmata/arduino/blob/master/examples/StandardFirmata/StandardFirmata.ino){:target="_blank"} and comes pre-packaged with the Arduino software when you install it. Follow the steps below to upload the StandardFirmata sketch to your Arduino.

1. Download and install the Arduino software from [http://arduino.cc](http://arduino.cc){:target="_blank"}.
2. Connect your Arduino device to the computer using USB.
3. Launch the Arduino application.
4. Verify that you have the correct Arduino board selected under *Tools > Board*
5. Verify that you have the correct COM Port selected under *Tools > Port*
6. In the Arduino IDE, navigate to *File > Examples > Firmata > StandardFirmata*
7. Press “Upload” to deploy the StandardFirmata sketch to the Arduino device.

Your Arduino will now run the StandardFirmata sketch forever unless reprogrammed with a different sketch. You can now optionally disconnect your Arduino from the computer and power it in any way you choose. If you wish to use the recommended Bluetooth pairing between your devices, you will need to [hook up a Bluetooth device to the Arduino](https://github.com/ms-iot/remote-wiring/blob/master/bluetooth.md){:target="_blank"}. We recommend the [SparkFun Bluetooth Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"}.


####Notes on Serial Communication

Some hardware setups may require additional considerations when it comes to setting up your Bluetooth device over the serial pins 0 and 1.

- StandardFirmata uses the Serial lines to talk to a Bluetooth device or over USB. By default, it uses a baud rate of 57,600 bps. Depending on the configuration of your Bluetooth device, you may need to modify that rate. It can be found in the `setup` method and looks like this:

 `Firmata.begin(57600);`

 Simply change the `begin` parameter to match the configuration of your Bluetooth device. The most common configurations are 115200, 57600, and 9600. The recommended SparkFun Bluetooth Mate devices use 115200 by default. If you are not sure of the default baud rate of your Bluetooth device, check the device documentation.

- Many Arduino devices, such as the Leonardo and the Yun, use `Serial1` (Rather than just `Serial`) for serial communications over pins 0 and 1. If you are using one of these devices, you will need to change the serial initialization procedure. You will want to remove the line `Firmata.begin(57600);` and replace it with the code below:


{% highlight C++ %}
Serial1.begin( 57600 );	//or your baud rate here, it will be 115200 if using the Bluetooth Mate Silver or Gold
while( !Serial1 );
Firmata.begin( Serial1 );
{% endhighlight %}

{% include nextsteps.html device=page.deviceName %}
