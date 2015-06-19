---
layout: default
title: Driver Lab - Deploy the driver and confirm the installation
permalink: /en-US/win10/samples/DriverLab3.htm
lang: en-US
---

##Deploy the driver and confirm the installation

This exercise demonstrates how to manually copy and install the driver to a Windows IoT Core device. We will first use the **Server Message Block (SMB)** protocol via a **File Explorer** window to transfer files from the development machine to the target device (Windows IoT Core device). We will then use PowerShell to install the driver.

### Use the Server Message Block (SMB) protocol to transfer files from the development machine to the target device (Windows IoT Core device).

#### On the target device (this is your Raspberry Pi 2 or your Minnow Board Max)
* Boot up your Windows IoT Core device and make a note of its name or IP Address as displayed on its attached screen when the device first boots up.

#### On the development computer

* Open up a **File Explorer** window, and in the address bar type `\\<TARGET_DEVICE>\C$\` and then hit enter.  In this particular case, `<TARGET_DEVICE>` is either the name or the IP Address of your Windows IoT Core device:

    ![SMB with File Explorer]({{site.baseurl}}/images/DriverLab/smb1.png)

    If you are prompted for a user name and password, use the following credentials:

        User Name: <TARGET_DEVICE>\Administrator
        Password:  p@ssw0rd

    ![SMB with File Explorer]({{site.baseurl}}/images/DriverLab/cred1.png)
	
    NOTE: It is **highly recommended** that you update the default password for the Administrator account.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

* Navigate to the `\windows\system32\` folder in the SMB File Explorer window:

    ![SMB with File Explorer]({{site.baseurl}}/images/DriverLab/smb2.png)

* Drag and drop (copy) the following two files (created in the previous exercise while building the driver in Visual Studio) from the development machine to the `\windows\system32\` folder on your IoT Core device:

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys

* Drag and drop (copy) the `ACPITABL.dat` file (created in the previous exercise while building the ACPI table) to the `\windows\system32\` folder.

* Verify that the following files have been successfully transferred to the `\windows\system32\` folder in your IoT Core device using the **File Explorer** window and **SMB**:

        gpiokmdfdemo.inf
        gpiokmdfdemo.sys
        ACPITABL.dat

* The next steps involve connecting to the target device using PowerShell as explained [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

### Enable test-signing on the target device using BCDEDIT

We will use **bcdedit** to enable test-signing on the target, that is, the Windows IoT Core device.
Run the following command from the elevated PowerShell command window opened in the previous step:

    [192.168.0.243]: PS C:\> bcdedit /set testsigning on

### Reboot the target Windows IoT Core device

From the PowerShell window, type the following command:

    [192.168.0.243]: PS C:\> shutdown /r /t 0

The target device will reboot.  After the reboot, make sure PowerShell is still connected to it, otherwise, re-connect to the target device using the PowerShell `enter-pssession` command as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

### Install demo driver

Using the PowerShell window, navigate to the `C:\Windows\System32` directory on the target device:

    [192.168.0.243]: PS C:\> cd C:\Windows\System32

We will use the `devcon.exe` tool to install our demo driver.  Type the following command in the PowerShell window:

    [192.168.0.243]: PS C:\Windows\System32> devcon.exe install gpiokmdfdemo.inf ACPI\GPOT0001

### Reboot the target Windows IoT Core device

From the PowerShell window, type the following command:

    [192.168.0.243]: PS C:\> shutdown /r /t 0

The target device will reboot.  After the reboot, make sure PowerShell is still connected to it, otherwise, re-connect to the target device using the PowerShell `enter-pssession` command as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

### Remove synthetic node

We will use the `devcon.exe` tool to remove the synthetic node.  Type the following command in the PowerShell window:

    [192.168.0.243]: PS C:\> devcon.exe remove ACPI\GPOT0001

Note:  The sample driver will only run once the synthetic node is removed.

### Reboot the target device

From the PowerShell window, type the following command:

    [192.168.0.243]: PS C:\> shutdown /r /t 0

The target device will reboot.  After the reboot, make sure PowerShell is still connected to it, otherwise, re-connect to the target device using the PowerShell `enter-pssession` command as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

### Check the status of the driver

From the PowerShell window, type the following command:

    [192.168.0.243]: PS C:\> devcon status ACPI\GPOT0001

You should see the following output:

    ACPI\GPOT0001\1
        Name: GPIO KMDF Demo Device
        Driver is running.
    1 matching device(s) found.

### Connect the provided resistor and LED to the target device

Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) to connect the resistor and LED to your Windows IoT Core device.

### Use the application provided to communicate with the driver

We have provided a pre-built binary application called BlinkyApp.exe which communicates with the driver to turn on/off the LED.  The application can be found at `<Samples-Folder>\DriverSamples\BlinkyApp\BlinkyApp_<PLATFORM>.exe`.

For MinnowBoard Max, `<PLATFORM>` will be `x86`.
For Raspberry Pi 2, `<PLATFORM>` will be `ARM`.

You will need to copy this file to the target device (Windows IoT Core device) using SMB, or some other means.

In the PowerShell window, navigate to the folder you copied `BlinkyApp_<PLATFORM>.exe` to and type the following command:

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe help

You should see a help menu similar to this:

    BlinkyApp: Interactive GPIO app demo tool
    Commands:

      help              Prints this help message.
      (l)ow 2           Writes GPIO 5 LOW.
      (h)igh 2          Writes GPIO 5 HIGH.

    Example:

      BlinkyApp.exe low 2
      BlinkyApp.exe high 2

	 ------------------------------------------------------------
	 Pin mapping for RPi2 from rpi2.asl

		GPIO    #   | Parameter |  Example (GPIO low)   |  Example (GPIO high)
		GPIO [  0 ]    =  0        BlinkyApp.exe l  0   |  BlinkyApp.exe h  0
		GPIO [  1 ]    =  1        BlinkyApp.exe l  1   |  BlinkyApp.exe h  1
		GPIO [  5 ]    =  2        BlinkyApp.exe l  2   |  BlinkyApp.exe h  2
		GPIO [  6 ]    =  3        BlinkyApp.exe l  3   |  BlinkyApp.exe h  3
		GPIO [ 12 ]    =  4        BlinkyApp.exe l  4   |  BlinkyApp.exe h  4
		GPIO [ 13 ]    =  5        BlinkyApp.exe l  5   |  BlinkyApp.exe h  5
		GPIO [ 16 ]    =  6        BlinkyApp.exe l  6   |  BlinkyApp.exe h  6
		GPIO [ 18 ]    =  7        BlinkyApp.exe l  7   |  BlinkyApp.exe h  7
		GPIO [ 22 ]    =  8        BlinkyApp.exe l  8   |  BlinkyApp.exe h  8
		GPIO [ 23 ]    =  9        BlinkyApp.exe l  9   |  BlinkyApp.exe h  9
		GPIO [ 24 ]    = 10        BlinkyApp.exe l 10   |  BlinkyApp.exe h 10
		GPIO [ 25 ]    = 11        BlinkyApp.exe l 11   |  BlinkyApp.exe h 11
		GPIO [ 26 ]    = 12        BlinkyApp.exe l 12   |  BlinkyApp.exe h 12
		GPIO [ 27 ]    = 13        BlinkyApp.exe l 13   |  BlinkyApp.exe h 13
		GPIO [ 35 ]    = 14        BlinkyApp.exe l 14   |  BlinkyApp.exe h 14
		GPIO [ 47 ]    = 15        BlinkyApp.exe l 15   |  BlinkyApp.exe h 15

If you are using GPIO #5 on the Raspberry Pi 2, type the following command to turn the LED on:

    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe low 2

###Note:
Driving the GPIO low will make the LED light-up because of the way the LED is connected as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).

To turn the LED off, simply type:

<<<<<<< HEAD
    .\BlinkyApp_<PLATFORM>.exe high 2
=======
    [192.168.0.243]: PS C:\> .\BlinkyApp_<PLATFORM>.exe high 2

</div>
>>>>>>> 1f6f71aec48de89717d3334442f5dd6815c3658c
