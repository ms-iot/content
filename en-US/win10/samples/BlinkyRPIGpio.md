###For Raspberry Pi 2 (RPi2)

We will connect the one end of the LED to GPIO 5 (pin 29 on the expansion header) on the RPi2, the other end to the resistor, and the resistor to the 3.3 volt power supply from the RPi2.
Note that the polarity of the LED is important. Make sure the shorter leg (-) is connected to GPIO 5 and the longer leg (+) to the resistor or it won't light up.

And here is the pinout of the RPi2:

<img src="{{site.baseurl}}/images/PinMappings/RP2_Pinout.png" height="400">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>

Here is an example of what your breadboard might look like with the circuit assembled:

<img src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2.png" height="500">

<sub>*Image made with [Fritzing](http://fritzing.org/){:target="_blank"}*</sub>