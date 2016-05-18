---
layout: default
title: Bluetooth RFCOMM Sample
permalink: /en-US/win10/samples/BTSerial.htm
lang: en-US
---
# Bluetooth RFCOMM Sample

## Sample Introduction:

RPi2 or RPi3 sends a message to bluetooth device, after the bluetooth device receives the message, it sends the message
back to RPi2 or RPi3 and then display it on the screen

1. Parts needed
	- Bluetooth BlueSMIRF
	- Arduino UNO
	- Bluetooth dongle
	
2.	Steps
	- Pair bluetooth with RPi2 or RPi3
	- Plug the bluetooth dongle to RPi2 (RPi3 has bluetooth built in)
	- Plug the BlueSMIRF to Uno, which will be connected to any PC; 
	  Connection: Bluetooth TX->PC RX, bluetooth RX->PC TX
    - Follow the instruction to pair the bluetooth with RPi2 or RPi3
		Pin for bluetooth pairing: 1234
 
3.	Upload the program to Arduino UNO

If you don't have Arduino IDE, go to [here](https://www.arduino.cc/) and click download, download IDE and install it.
Write the program serialReadWrite.ino as what in [here](https://github.com/ms-iot/samples/blob/develop/BTSerial/serialReadWrite.ino)
It basically read from one serial port, then send what it gets to another serial port for sending out.


Note: the bps has to be 115200 in order for the bluetooth to work. 9600 doesn't work.
 
4. Compile the program
   Upload the program. Note, when you upload the program, you need to unplug the Tx and RX port, 
   after uploading done, plug them back. Ohterwise, you will see some error popping up for uploading
 
5.	Write the program in UWP and deploy it to RPi2 or RPi3
	You can find the complete sample code [here](https://github.com/ms-iot/samples/tree/develop/BTSerial).
 
Download the [code](https://github.com/ms-iot/samples/tree/develop/BTSerial) and deploy the App to your RPi2 or RPi3. Then you can how the sample work as an echo behavior



