---
layout: default
title: Node.js
permalink: /en-US/win8/samples/NodeJS.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

#Node.js Sample
Learn to run node.js on a galileo and call APIs from a javscript file.

To make this work we decided to use the concept of [Forwarders and Stubs](Forwarders.htm) which allow changed or missing Win32 APIs to be emulated or redirected. We could have just made some changes to our implementation of User32.dll but then you would have been left with the possible problem of making native extensions work. We decided to give you a canonical example in our actual Node.js implementation.

##Running Node on Galileo

1. Make sure you are using the latest [windows image](https://connect.microsoft.com/windowsembeddedIoT/Downloads){:target="_blank"}.
1. Make a directory in the root of your image named `node`:
    * Using File Explorer on your PC, open `\\mygalileo\c$` then right click and create a new folder called `node`
1. Download the 32-bit Windows Binary (.exe) of node from [nodejs.org v0.10.9](http://nodejs.org/dist/v0.10.9/){:target="_blank"} and place it inside the new `node` directory.
1. Download the latest zipped version of npm from [nodejs.org](http://nodejs.org/dist/npm/){:target="_blank"} and extract the contents into the new `node` directory.
1. Build User32.dll using the [Forwarders project](https://github.com/ms-iot/forwarders){:target="_blank"}.
1. Copy User32.dll from the Forwarders project release directory into the `node` directory.
1. Using Telnet, add this `node` folder to your Galileo image's path and restart using the following commands:

~~~
mkdir %systemroot%\system32\config\systemprofile\AppData\Roaming\npm
setx path "%path%;c:\node" /M
shutdown /r /t 0
~~~

* Create a main.js with contents from the code section below.
    * Using File Explorer on your PC, open `\\mygalileo\c$` then right click and create a new text file called `main.js`
    * You can open this file directly from a text editor by navigating to `\\mygalileo\c$\main.js` in a File Explorer.
* Install the ms-iot-wiring package into the location of main.js using npm:

~~~
npm install ms-iot-wiring
~~~

* Using a telnet connection to your galileo, change directories to the location of `main.js`.
* Run the command: <kbd>node main.js</kbd>

##Code
The code below shows usage of the APIs available through the ms-iot-wiring extension.

{% highlight Javascript %}

// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.
// Licensed under the MIT License.
// See License.txt in the project root for license information.

var galileo = require("ms-iot-wiring"); // adds the ms-iot-wiring module

var led = 13;

// setup
galileo.pinMode(led, galileo.OUTPUT); // sets pin 13 to output

// loop
while (1)
{
   // Global Variables
   console.log('----- Global Variables -----');
   console.log("LOW: %d", galileo.LOW);
   console.log("HIGH: %d", galileo.HIGH);

   console.log("INPUT: %d", galileo.INPUT);
   console.log("OUTPUT: %d", galileo.OUTPUT);
   console.log("INPUT_PULLUP: %d", galileo.INPUT_PULLUP);

   console.log("CHANGE: %d", galileo.CHANGE);
   console.log("FALLING: %d", galileo.FALLING);
   console.log("RISING: %d", galileo.RISING);

   console.log("LSBFIRST: %d", galileo.LSBFIRST);
   console.log("MSBFIRST: %d", galileo.MSBFIRST);

   // console.log("WLED: %d", galileo.WLED);
   // console.log("LED_BUILTIN: %d", galileo.LED_BUILTIN);

   console.log("PI: %d", galileo.PI);
   console.log("HALF_PI: %d", galileo.HALF_PI);
   console.log("TWO_PI: %d", galileo.TWO_PI);

   // Digital Tests
   console.log('\n----- Digital Tests -----');
   console.log('Digital Write');
   galileo.digitalWrite(13, 0);
   console.log("LED OFF");
   console.log('Delay 1 seconds');
   galileo.delay(1000);
   galileo.digitalWrite(13, 1);
   console.log("LED ON");
   console.log('DelayMicroseconds for 1 second');
   galileo.delayMicroseconds(1000000);

   console.log('Digital Read');
   galileo.digitalRead(2);

   console.log('Millis: %d', galileo.millis());
   console.log('Micros: %d', galileo.micros());

   // shift in: datapin, clockpin, bitorder
   console.log('ShiftIn');
   galileo.shiftIn(1, 2, galileo.LSBFIRST);
   console.log('ShiftOut');
   galileo.shiftOut(1, 2, galileo.LSBFIRST, 10);

   // Analog Tests
   console.log('\n----- Analog Tests -----');
   console.log('AnalogWriteResolution');
   galileo.analogWriteResolution(12);
   console.log('AnalogReadResolution');
   galileo.analogReadResolution(12);
   console.log('AnalogWrite');
   galileo.analogWrite(3, 4095);

   // SPI Tests
   console.log('\n----- SPI Tests -----');
   var spi = galileo.Spi();
   console.log('Checking whether SPI is defined: ' + spi);
   console.log('Calling Spi Begin');
   spi.begin();
   console.log('Calling Spi SetDataMode');
   spi.setDataMode(galileo.SPI_MODE1);
   console.log('Calling Spi SetClockDivider');
   spi.setClockDivider(galileo.SPI_CLOCK_DIV64);
   console.log('Calling Spi SetBitOrder');
   spi.setBitOrder(galileo.LSBFIRST);
   console.log('Calling Spi Transfer');
   spi.transfer(10);
   console.log('Calling Spi End');
   spi.end();

   // Wire/I2C Tests
   console.log('\n----- Wire/I2C Tests -----');
   var wire = galileo.Wire();
   console.log('Wire Begin');
   wire.begin();

   console.log('\nWire BeginTransmission');
   wire.beginTransmission(0x25); // transmit to device, device address is specified in datasheet

   console.log('Wire Write: 1 integer argument');
   console.log('Wrote: ' + wire.write(10) + ' bytes');
   console.log('Wire EndTransmission');
   console.log('Status of transmission: ' + wire.endTransmission());

   console.log('\nwire write: 1 string argument');
   console.log('wrote: ' + wire.write("hello") + ' bytes');
   console.log('wire endtransmission with true stop');
   console.log('status of transmission: ' + wire.endTransmission(true));

   console.log('Wire Write: 2 arguments');
   var array = [0x01, 0x02, 0x03, 0x04];
   console.log('wrote ' + wire.write(array, 4) + ' bytes');
   console.log('wire endtransmission with false stop');
   console.log('status of transmission: ' + wire.endTransmission(false));

   console.log('Return values:');
   console.log('0:success');
   console.log('1:data too long to fit in transmit buffer');
   console.log('2:received NACK on transmit of address');
   console.log('3:received NACK on transmit of data');
   console.log('4:other error\n');

   console.log('Wire RequestFrom with 2 paramaters: address and quantity');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1));
   console.log('Wire RequestFrom with 3 paramaters: address, quantity, and true stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, true)); // stop is a boolean. true will send a stop message where false will restart the connection keeping it active
   console.log('wire requestfrom with 3 paramaters: address, quantity, and false stop');
   console.log('bytes ready: ' + wire.requestFrom(0x25, 1, false));

   console.log('Wire Available');
   console.log('Available bytes: ' + wire.available());
   console.log('Wire Read');
   console.log('Read: ' + wire.read());
   console.log('Wire OnReceive');
   wire.onReceive();
   console.log('\nWire OnRequest');
   wire.onRequest();

   console.log('\n----- End of Loop -----\n\n');
   galileo.delay(5000);
}

{% endhighlight %}


---
[&laquo; Return to Samples](SampleApps.htm){: .btn .btn-default}
