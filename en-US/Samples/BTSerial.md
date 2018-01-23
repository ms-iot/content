---
layout: sample
title: Bluetooth RFCOMM Sample
permalink: /en-US/Samples/BTSerial.htm
lang: en-US
---
# Bluetooth RFCOMM Sample

## Sample Introduction:

An RPi2 or RPi3 sends a message to bluetooth device. After the bluetooth device receives the message, it sends the message
back to RPi2 or RPi3 which then displays it on the screen.

1. Parts required
	- Bluetooth BlueSMIRF
	- Arduino UNO
	- Bluetooth dongle
	
2.	Steps
	- Pair Bluetooth with RPi2 or RPi3
	- Plug the Bluetooth dongle into the RPi2 (RPi3 has Bluetooth built in)
	- Plug the BlueSMIRF into the Uno, which will be connected to any PC; 
	  Connection: Bluetooth TX->Arduino Uno RX, Bluetooth RX->Arduino Uno TX
    - Follow the instructions to pair the Bluetooth with RPi2 or RPi3
		Pin for Bluetooth pairing: 1234
 
3.	Upload the program to Arduino UNO

If you don't have the Arduino IDE, go [here](https://www.arduino.cc/) and click download. Download the IDE and install it.
Write the program serialReadWrite.ino as explained [here](https://github.com/ms-iot/samples/blob/develop/BTSerial/serialReadWrite.ino)
It basically reads from one serial port and forwards to another serial port for sending out.


Note: the transfer rate has to be 115200 bps for the Bluetooth to work. 9600 will not work.
 
4. Compile the program
   Upload the program. Note, when you upload the program, you need to unplug the Tx and RX port or you will get errors during upload. 
   Plug them back in after the upload is complete.
 
5.	Write the program in UWP and deploy it to the RPi2 or RPi3
	You can find complete sample code [here](https://github.com/ms-iot/samples/tree/develop/BTSerial).
 
Download the [code](https://github.com/ms-iot/samples/tree/develop/BTSerial) and deploy the app to your RPi2 or RPi3. Then you can see how the sample demonstrates echo behavior



