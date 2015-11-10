---
layout: default
title: SetupPCWRA
permalink: /en-US/win10/samples/BasicWRA.htm
lang: en-US
---

#Get Started

Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.

{% include steps.html device="WRA" %}

#Basic Windows Remote Arduino

In this project, we will use Windows Remote Arduino to turn an LED on and off. It is a simple example, but will reveal the power that the library can give you to create many more advanced projects. Let's get started!

##Hardware

You can always use a USB connection to get started, but let's cover simple hook up of a Bluetooth device and an LED that we will turn on and off over Bluetooth using the Windows Remote Arduino library!

###Parts

- You will need the following parts:
	* An Arduino (Uno pictured here), as setup in the previous step
	* A Bluetooth device ([Sparkfun Mate Silver](https://www.sparkfun.com/products/12576){:target="_blank"} pictured here) **OR** a Standard A to Standard B USB Cable
	* A breadboard
	* A 330Ω resistor
	* An LED
	* A few male-to-male connector wires
	<br/>

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/parts.JPG)


###Set up

This section will cover how to hook up a Bluetooth device and an LED in order to use Windows Remote Arduino to toggle the LED. You can skip any steps regarding Bluetooth setup if you prefer to use a USB connection!

- Connect the power and ground rails on the breadboard to the 5V and GND pins, respectively, on the Arduino. Using color coded wires (red and black) will make it easy to keep track of the power connections.

 ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/step01.JPG)
 
- The next steps involve setting up the Bluetooth capabilities of the Arduino. Plug your Bluetooth device into the breadboard and connect the VCC and GND pins to the power and ground rails on the breadboard, respectively.

 ![VCC and ground]({{site.baseurl}}/images/remote-wiring/samples/basic/step02.JPG)

- Connect the TX-0 pin on the Bluetooth device to the RX pin on the Arduino. Similarly, connect the RX-1 pin on the Bluetooth device to the TX pin on the Arduino.  If your Arduino has multiple RX and TX pins, connect the TX-0 Bluetooth pin to the RX0 Arduino pin, and connect the RX-1 Bluetooth pin to the TX0 Arduino pin.

 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03.JPG)

* Notice the yellow wire in the image goes from the transmit pin of the Bluetooth device to the receive pin of the Arduino and vice versa for the orange wire. This step is critical to establish serial communication between the Bluetooth device and the Arduino, allowing the messages transmitted from one device to be received by the other.

 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_2.JPG)
 ![Send and Receive]({{site.baseurl}}/images/remote-wiring/samples/basic/step03_3.JPG)

* Make sure that your code is already uploaded on the Arduino before making this connection. The Arduino Uno uses the same serial (TX and RX) pins for flashing the device, which prevents any code from being uploaded to it when another device is connected to these serial pins.

- Add an LED to the breadboard. Note that the longer (or bent) leg is the anode (positive) and the shorter leg is the cathode (negative).

 ![LED]({{site.baseurl}}/images/remote-wiring/samples/basic/step04.JPG)

- Connect the cathode of the LED to the ground rail of the breadboard using a 330Ω resistor. A 330Ω resistor is striped orange, orange, brown, gold as shown in the image.

 ![LED Ground]({{site.baseurl}}/images/remote-wiring/samples/basic/step05.JPG)

- Connect the anode of the LED to any digital I/O pin on the Arduino - your choice will be reflected in the code. We are using pin 5 in the example.

 ![LED Power]({{site.baseurl}}/images/remote-wiring/samples/basic/step06.JPG)

- You setup is now ready! It should look similar to the setup shown in the image below. Again, if you would prefer to use USB, you may not have the serial wire connections shown here.

 ![Finished]({{site.baseurl}}/images/remote-wiring/samples/basic/final.JPG)

##Software
With your hardware assembled, it's time to remotely control your Arduino!  If you chose Option 1 on the "Set up your PC" section of this tutorial (meaning you downloaded our app from the Store), you can now open the app on your prepared Windows 10 device.  Follow the prompts on the Connections page to find your Arduino, and begin controlling your pins remotely!

If you chose Option 2 or Option 3 on the "Set up your PC" page, you need to make a few more alterations to the code solution you started building earlier.  Proceed to the next section to make the appropriate changes.

###Code

-   Now that we're all set up, let's get into some code!  I've set up a project called RemoteBlinky by following the steps       in the "Set up your PC" section of this setup guide - you can start coding directly on top of the solution you set up        earlier. In the screenshot below, you will see the code-behind file MainPage.xaml.cs which simply creates a Bluetooth        connection object and passes it to the RemoteDevice class in the constructor. You'll see that I've specified my device       name in this example. You may also enumerate the available devices by invoking the static `.listAvailableDevicesAsync()`     function on BluetoothSerial (and USBSerial) class before constructing your object.  Take a look at the code below and        begin manually transferring the needed additions.

    ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project00.png)

    -   **Note for USB:**
        `USBSerial` has many options available to specify your device. In the constructor, you can provide the VID and PID of         your device, the VID only, or a `DeviceInformation` object (obtained from the above mentioned                                `listAvailableDevicesAsync` function). Similarly, `BluetoothSerial` allows you to provide a device id (as a string),         device name (also a string), or the `DeviceInformation` object.
  
        You can obtain the VID & PID combination of your USB device by following these steps:
        <ul>
        <li>Open Device Manager through the Control Panel or by pressing both <i>Windows + Pause</i> keys and choosing the           <i>Device Manager</i> link on the left.</li>
        <li>Expand the <i>Ports (COM & LPT)</i> menu.</li>
        <li>Right-click your Arduino Device and select Properties.</li>
        <li>On the <i>Details</i> tab, select <i>Hardware Ids</i> from the drop-down menu.</li>
        <li>You may see multiple entries in the <i>Value</i> box, but any entries will have matching PID and VID.</li>
        <li>The entries will have the format "USB\VID_****&PID_****" where **** are the numeric ID values.</li>
        <li>You can put in just the numbers, or also include "VID_" to guarantee you will correctly identify the device.             For example:<br/></li>
        </ul>
        `USBSerial usb = new USBSerial( "VID_2341", "PID_0043" );`<br/>
        is guaranteed to work **only** for the following hardware device:

    ![USB Device]({{site.baseurl}}/images/remote-wiring/samples/basic/vidpid.png)

-   Next, I'm going to add a callback function to the ConnectionEstablished event on the BluetoothSerial object. This            function will automatically be called when the Bluetooth device is connected. You'll notice that I haven't implemented       anything in that function at this time. Last, call `.begin()` on the connection object to tell it to connect.

    ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project01.png)
 
    -   **Notes on baud rate for USB/Bluetooth:** Some hardware setups may require additional considerations when it comes to         setting up your Bluetooth device over the serial pins 0 and 1.

        StandardFirmata uses the Serial lines to talk to a Bluetooth device or over USB. By default, it uses a baud rate of          57600 bps. Depending on the configuration of your Bluetooth device, you may need to modify that rate. It can be             found in the `setup` method and looks like this:

        `Firmata.begin(57600);`

        Simply change the `begin` parameter to match the configuration of your Bluetooth device. The most common                     configurations are 115200, 57600, and 9600. The recommended SparkFun Bluetooth Mate devices use 115200 by default. If         you are not sure of the default baud rate of your Bluetooth device, check the device documentation.

        Many Arduino devices, such as the Leonardo and the Yun, use `Serial1` (Rather than just `Serial`) for serial                 communications over pins 0 and 1. If you are using one of these devices, you will need to change the serial                  initialization procedure. You will want to remove the line `Firmata.begin(57600);` and replace it with the code              below:

            Serial1.begin( 57600 );	//or your baud rate here, it will be 115200 if using the Bluetooth Mate Silver or Gold
            while( !Serial1 );
            Firmata.begin( Serial1 );

 
    -   **Note for USB:** The USBSerial class still has a ConnectionEstablished event that you can subscribe to. It will             always be invoked at the proper time in both classes, so you are able to reuse your code in either scenario!
        However, be aware that the `.begin()` function must be called before any connection attempt will be made. The                parameters to the `.begin()` function *do not matter* for Bluetooth, but you must use `SerialConfig.SERIAL_8N1` as           the 2nd parameter if you are connecting to an Arduino device! The rest of the example will work exactly the same             regardless of which connection type you are using.

- Jump over to the MainPage.xaml file by right-clicking MainPage.xaml in your Solution Explorer and choosing "View Designer" - the XAML code will appear alongside the Designer view.  We're now going to create buttons that will turn an LED on and off. You'll notice I've added button callbacks to the `Click` event & set the `IsEnabled` property to false, and you'll see why in the next step!

    ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project02.png)

- I've implemented three functions in this step. First, the `OnConnectionEstablished` function now enables the buttons on the UI thread! This guarantees that the buttons will be enabled only when the Bluetooth connection is ready, as it typically takes a few seconds for this to happen.

- I've also set up the `.digitalWrite()` calls in the button callbacks `OnButton_Click` and `OffButton_Click`

    ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/project04.png)

- Build! Use the settings shown in the image below to run the app you've written on your Windows device.

    ![Regular Deploy]({{site.baseurl}}/images/remote-wiring/samples/basic/regulardeploy.PNG)
    
- Your buttons will be enabled when the connection is established, and you can freely toggle your LED on and off at will! The app will look like the following picture when running on a Windows 10 PC.

    ![Regular Start]({{site.baseurl}}/images/remote-wiring/samples/basic/regularstart.PNG)

###Deploying to a Windows Phone
- You can also deploy your code to another Windows 10 device and utilize the same functionality there.  In order to get the code running on a Windows Phone, plug your phone into your development PC (the PC on which you've been writing the code above) using a microUSB cord.  Set the deploy destination to "Device" and the architecture to "ARM" in Visual Studio.  The proper settings for this deploy can be seen in the image below.

    ![Device Deploy]({{site.baseurl}}/images/remote-wiring/samples/basic/devicedeploy.PNG) 

- When you build and deploy, you should see the app below running on your phone.

    ![Project Start]({{site.baseurl}}/images/remote-wiring/samples/basic/screenshot.png)


I really hope you enjoy replicating this project and using it as a baseline for an incredible new set of Maker projects!
