---
layout: default
title: Setup your Raspberry Pi 2
permalink: /en-US/win10/KitSetupRPI.htm
step: win10/KitSetupRPI.htm
lang: en-US
deviceName: RPI2
kit: Adafruit Essential Maker Kit
---
<ol class="breadcrumb">
  <li><a href="{{site.baseurl}}/{{page.lang}}/AdafruitMakerKit.htm">Adafruit Essential Maker Kit</a></li>
  <li class="active">Setup your Raspberry Pi 2</li>
</ol>

<h1 class="maker-kit">Lesson 1: Get ready to make</h1>
{% include kit-steps.html device=page.deviceName %}

<h3 class="maker-kit">Learn how to set up the Raspberry Pi 2 and connect it to your computer.</h3>

## Install the Windows 10 IoT Core tools

1. [Download](http://go.microsoft.com/fwlink/?LinkId=616847) the ISO for the Raspberry Pi 2 from the Microsoft Download Center.

2. **Save the ISO** to a local folder

    <img class="image-border" src="{{site.baseurl}}/images/SetupRPI/Iso.PNG">

3. Double click on the ISO (IoT Core RPi.iso). It will automatically mount itself as a virtual drive so you can access the contents.

    <img class="image-border" src="{{site.baseurl}}/images/SetupRPI/MSI.PNG">

4. Install **Windows_10_IoT_Core_RPi2.msi**. When installation is complete, flash.ffu will be located at **C:\Program Files (x86)\Microsoft IoT\FFU\RaspberryPi2**

    <img class="image-border" src="{{site.baseurl}}/images/SetupRPI/rpiffu.PNG">

5. Eject the Virtual CD when done

##Put the Windows 10 IoT Core image on your SD card

1. **Insert a micro SD card** into your SD card reader.

2. **Use IoTCoreImageHelper.exe** to flash the SD card. Search for "WindowsIoT" from start menu and select the shortcut "WindowsIoTImageHelper"

    <img src="{{site.baseurl}}/images/ImagerHelperSearch.PNG">

3. The tool will enumerate devices as shown.
  Select the SD card you want to flash and then provide the location of the ffu and flash the image.

    <img src="{{site.baseurl}}/images/SetupRPI/ImageHelper.PNG">

4. Click on the **Safely Remove Hardware** icon in your task tray and select your USB SD card reader to safely remove it from the system.  Failing to do this can cause corruption of the image.

    **NOTE:** If you want to remove Windows 10 IoT Core from your SD card after you are done using it, see the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) section titled **How do I remove Windows 10 IoT Core from my SD card?**.

    **NOTE:** IoTCoreImageHelper.exe is the recommended tool to flash the SD card. However, instructions are available for using [DISM command line tool]({{site.baseurl}}/{{page.lang}}/win10/samples/DISM.htm) directly

##Hook up your board

1. **Insert the micro SD card** you prepared (the slot is on the opposite side of the board shown below).
2. **Insert the WiFi Dongle** included in your kit into the USB port on your RPI2.
3. **Connect the power supply** to the micro USB port on the board.

    <img class="device-images" src="{{site.baseurl}}/images/rpi2Headless.png">

##Boot Windows 10 IoT Core
1. Windows 10 IoT Core will boot automatically after connecting the power supply. Allow the Pi about five minutes for the first boot.
2. Follow the [PowerShell documentation here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) to use PowerShell to connect to your running device.  You can also follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm) to use SSH to connect to your device.
3. It is **highly recommended** that you update the default password for the Administrator account.
    To do this, issue the following commands in your PowerShell connection:

    Replace `[new password]` with a strong password:

        net user Administrator [new password]

    Once this is done, you'll need to re-establish the current session using enable-psSession with the new credentials.

##Configure your Raspberry Pi 2

####With your PowerShell session still established, you'll need to configure it to run in headless mode for use without a monitor.

<!-- This content is replicated at en-US/win10/HeadlessMode.md    -->

* To display the current state of your device, use the `setbootoption` utility like this:

        [192.168.0.243]: PS C:\> setbootoption.exe

* To modify the state of your device to enable headless mode, use the `setbootoption` utility with the `headless` arg:

        [192.168.0.243]: PS C:\> setbootoption.exe headless
        [192.168.0.243]: PS C:\> shutdown /r /t 0

####Finding your headless device

A Windows IoT Core device that is in headless mode can be discovered using the **WindowsIoTCoreWatcher** application that is installed with the Windows 10 IoT Core tools.
When run, the application automatically finds all Windows IoT Core devices on the local network and displays device information such as the name, MAC, IP address, and more.

![Windows IoT Core Watcher]({{site.baseurl}}/images/HeadlessMode/IoTCoreWatcher.png)

<!-- End of Replicated Content -->

####Finally, you'll need to configure your Raspberry Pi 2 for WiFi connection.

<!-- This content is replicated at en-US/win10/SetupWiFi.md  -->

1. Using a web browser, navigate to `http://[device_ip]:8080/`, where **[device_ip]** is the IP address of the Windows 10 IoT Core device (ex: **192.168.1.4**). Enter **Administrator** for the username, and supply your password
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->

{% include kit-nextsteps.html device=page.deviceName %}
