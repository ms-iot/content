---
layout: default
title: BLE GATT Sample - Pairing & Tools
permalink: /en-US/win10/samples/BLEGatt1.htm
lang: en-US
---

## Pairing a BLE Device and GATT Attribute Table Dump Tool

### Pairing the Sensortag
Before we start up the sample we need to first pair the SensorTag with the Windows IoT Core device. There are 2 ways to pair devices, either through [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm){:target="_blank"} or the command line tool: `C:\Windows\System32\IoTBluetoothPairing.exe`. Currently only the command line tool supports pairing with pin authentication, which is what the SensorTag requires. Make sure you have the USB Bluetooth dongle plugged into the Windows IoT Core device and also have the SensorTag ready to go.

#### Step 1
Connect to the Windows IoT Core device using SSH. Instructions on how to do that can be found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm){:target="_blank"}. 

#### Step 2
Run the command line tool by entering this `C:\Windows\System32\IoTBluetoothPairing.exe` into the SSH shell. You should see something like this:

![Pairing Tool 1]({{site.baseurl}}/Resources/images/BLEGatt/pairing1.png)

In order to navigate the tool and make selections please enter the letters or numbers in front of the desired command. For example to exit the tool from the main menu press `X` followed by the `Enter` key.

#### Step 3
Note that the tool is in BR mode as indicated at the top of the main menu, you need to be in LE mode to pair with a BLE device. To do that select the `C - Change Bluetooth mode to LE.` option. You should see something like this:

![Pairing Tool 2]({{site.baseurl}}/Resources/images/BLEGatt/pairing2.png)

#### Step 4
Now select the `P - Pair a device.` option to bring up the pairing interface. You should see something like this:

![Pairing Tool 3]({{site.baseurl}}/Resources/images/BLEGatt/pairing3.png)

#### Step 5
Start the pairing process by selecting the SensorTag from the list. If you do not see the SensorTag make sure it is in advertising mode, this is activated by pressing the side button and the LED will flash. Also remember to refresh the list after turning on the SensorTag!

If the pairing process is initiated successfully, enter `000000` as the pin. This is the default set for the SensorTag with firmware 1.4.1.

![Pairing Tool 4]({{site.baseurl}}/Resources/images/BLEGatt/pairing4.png)

You should see a pairing succeeded message if it worked. 

#### Step 6
To confirm that you have paired the SensorTag, from the main menu select the `L - Display paired/pairable device list.` If you see the SensorTag under the paired device list then you have successfully paired the SensorTag!

![Pairing Tool 5]({{site.baseurl}}/Resources/images/BLEGatt/pairing5.png)

### GATT Attribute Table Dump Tool
In order to communicate with a BLE device using GATT, you will need to know the UUIDs of the desired GATT services and characteristics. Luckily for us TI has provided us with a GATT attribute table for the SensorTag [here](http://processors.wiki.ti.com/images/a/a8/BLE_SensorTag_GATT_Server.pdf){:target="_blank"}. 

When a GATT attribute table is not provided for the device you are working with, you can use the Bluetooth GATT Database Viewer (BthGATTDump.exe) to generate a GATT attribute table as understood by Microsoft Windows. The tool is part of the Windows Driver Kit (WDK) which can be found [here](https://msdn.microsoft.com/en-us/library/windows/hardware/ff557573(v=vs.85).aspx){:target="_blank"}. Once installed the tool and a README.txt containing instructions are located here `C:\Program Files (x86)\Windows Kits\10\Tools\<ARCH>\Bluetooth\BthGATTDump\` where <ARCH> is the architecture of the system you installed the tool on.

Remember this is a command line tool and [here]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGattDump.htm){:target="_blank"} is an example GATT attribute table dump file of the SensorTag.

### What's Next?
[Using and Dissecting the Code]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt2.htm) --- Learn how to use the sample along with a walkthrough of the code.

#### Previous Page
[Sample Overview]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm) --- Learn about BLE, GATT, and the TI CC2541 SensorTag.
