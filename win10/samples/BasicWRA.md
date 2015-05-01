---
layout: default
title: SetupPCWRA
permalink: /win10/samples/BasicWRA.htm
---

<div class="row">
  <h1>Get Started</h1>
  <div class="col-md-8">
    <p>Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.</p>
  </div>
  <div class="row">
    <ul class="nav nav-justified get-started-steps text-center">
        <li>
          <a href="{{site.baseurl}}/GetStarted.htm"><h3 class="inactive">1. Select Your Device</h3></a>
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/SetupWRA.htm"><h3 class="inactive">2. Set up your Device</h3></a>
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/SetupPCWRA.htm"><h3 class="inactive">3. Set up your PC</h3></a>
        </li>
        <li>
          <a href="{{site.baseurl}}/win10/samples/BasicWRA.htm"><h3 class="active">4. Develop</h3></a>
        </li>
    </ul>
  </div>
</div>

<div class="col-md-12" markdown="1">

#Basic Windows Remote Arduino

In this project, we will use Windows Remote Arduino to turn an LED on and off. It is a simple example, but will reveal the power that the library can give you to create many more advanced projects. Let's get started!

##Hardware

You can always use a USB connection to get started, but let's cover simple hook up of a Bluetooth device and an LED that we will turn on and off over Bluetooth using the Windows Remote Arduino library!

###Parts

- You will need the following parts:
	* An Arduino (Uno pictured here)
	* A Bluetooth device ([Sparkfun Mate Silver](https://www.sparkfun.com/products/12576) pictured here) **OR** a USB Cable
	* A breadboard
	* A 330Ω resistor
	* An LED
	* A few wires
	<br/>
	
	![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/parts.JPG)
	

###Set up

This section will cover how to hook up a Bluetooth device and an LED in order to use Windows Remote Arduino to toggle the LED. You can skip the Bluetooth connection steps if you prefer to use USB!

- Connect the power and ground rails on the breadboard to the 5V and GND pins, respectively, on the Arduino. Using color coded wires (red and black) will make it easy to keep track of the power connections.

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/step01.JPG)

- Plug your bluetooth device on the breadboard and connect the VCC and GND pins to the power and ground rails, respectively, on the breadboard.

 ![VCC and ground]({{site.baseurl}}/images/remote-wiring/samples/basic/step02.JPG)

- Connect the TX-0 pin on the bluetooth device to the RX pin on the Arduino. Similarly, connect the RX-1 pin on the bluetooth device to the TX pin on the Arduino.

 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03.JPG)

   * Notice the yellow wire in the image goes from the transmit pin of the bluetooth device to the receive pin of the Arduino and vice versa for the orange wire. This step is critical to establish serial communication between the bluetooth device and the Arduino, allowing the messages transmitted from one device to be received by the other.

 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_2.JPG)
 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_3.JPG)

   * Make sure that your code is already uploaded on the Arduino before making this connection. The Arduino Uno uses the same serial (TX and RX) pins for flashing the device, which prevents any code from being uploaded to it when another device is connected to these serial pins.

- Add an LED to the breadboard. Note that the longer (or bent) leg is the anode (positive) and the shorter leg is the cathode (negative).

 ![LED]({{site.baseurl}}/images/remote-wiring/samples/basic/step04.JPG)

- Connect the cathode of the LED to the ground rail of the breadboard using a 330Ω resistor. A 330Ω resistor is striped orange, orange, brown, gold as shown in the image.

 ![LED Ground]({{site.baseurl}}/images/remote-wiring/samples/basic/step05.JPG)

- Connect the anode of the LED to any digital I/O pin on the Arduino. We are using pin 5 in the example.

 ![LED Power]({{site.baseurl}}/images/remote-wiring/samples/basic/step06.JPG)

- You setup is now ready! It should look similar to the setup shown in the image below. Again, if you would prefer to use USB, you may not have the serial wire connections shown here.

 ![Finished]({{site.baseurl}}/images/remote-wiring/samples/basic/final.JPG)


##Code

Now that we're all set up, let's get into some code!

- Create your project

 I've set up a project called RemoteBlinky by following the steps in the setup guide. In the screenshot below, you will see the code-behind file MainPage.xaml.cs which simply creates a Bluetooth connection object and passes it to the RemoteDevice class in the constructor. You'll see that I've specified my device name in this example. You may also enumerate the available devices by invoking the static `.listAvailableDevicesAsync()` function on BluetoothSerial (and USBSerial) class before constructing your object.

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project00.png)

###Note for USB:
 `USBSerial` has many options available to specify your device. In the constructor, you can provide the VID and PID of your device, the VID only, or a `DeviceInformation` object (obtained from the above mentioned `listAvailableDevicesAsync` function). Similarly, `BluetoothSerial` allows you to provide a device id (as a string), device name (also a string), or the `DeviceInformation` object.
 
You can obtain the VID & PID combination of your USB device by following these steps:
<ul>
<li>Open Device Manager through the Control Panel or by pressing both <i>Windows + Pause</i> keys and choosing the <i>Device Manager</i> link on the left.</li>
<li>Expand the <i>Ports (COM & LPT)</i> menu</li>
<li>Right-click your Arduino Device and select Properties</li>
<li>On the <i>Details</i> tab, select <i>Hardware Ids</i> from the drop-down menu.</li>
<li>You may see multiple entries in the <i>Value</i> box, but any entries will have matching PID and VID.</li>
<li>The entries will have the format "USB\VID_****&PID_****" where **** are the numeric ID values.</li>
<li>You can put in *just* the numbers, or also include "VID_" to guarantee you will correctly identify the device. For example:<br/></li>
</ul>
`USBSerial usb = new USBSerial( "VID_2341", "PID_0043" );`<br/>
is guaranteed to work **only** for the following hardware device:
	
![USB Device]({{site.baseurl}}/images/remote-wiring/samples/basic/vidpid.png)

- Next, I'm going to add a callback function to the ConnectionEstablished event on the BluetoothSerial object. This function will automatically be called when the Bluetooth device is connected. You'll notice that I haven't implemented anything in that function at this time. Last, call `.begin()` on the connection object to tell it to connect.

###Note for USB:
The USBSerial class still has a ConnectionEstablished event that you can subscribe to. It will always be invoked at the proper time in both classes, so you are absolutely able to reuse your code in either scenario! The rest of the example will work exactly the same regardless of which connection type you are using!

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project01.png)

- Jump over to the MainPage.xaml file and create a couple buttons that will turn an LED on and off. You'll notice I've added button callbacks to the `Click` event & set the `IsEnabled` property to false, and you'll see why in the next step!

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project02.png)

- I've implemented three functions in this step. First, the `OnConnectionEstablished` function now enables the buttons on the UI thread! This guarantees that the buttons will be enabled only when the Bluetooth connection is ready, as it typically takes a few seconds for this to happen.

- I've also set up the `.digitalWrite()` calls in the button callbacks `OnButton_Click` and `OffButton_Click`

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project04.png)

- Build and deploy! Your buttons will be enabled when the connection is established, and you can freely toggle your LED on and off at will! Here is a screenshot of this basic example running on Windows Phone 10.

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/screenshot.png)


I really hope you enjoy replicating this project and using it as a baseline for an incredible new set of Maker projects!

 </div>
