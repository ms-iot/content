---
layout: default
title: Using WiFi on your Windows 10 IoT Core device.
permalink: /en-US/win10/SetupWiFi.htm
lang: en-US
---

# Using WiFi on your Windows 10 IoT Core device

WiFi is supported on Windows 10 IoT Core devices through the use of a USB WiFi adapter. Using WiFi provides all the functionality of a wired connection,
including [SSH]({{site.baseurl}}/{{page.lang}}/win10/samples/SSH.htm), [Powershell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm), [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm), and application debugging and deployment.

	Note: Plugging in a wired Ethernet cable will override WiFi as the default network interface

### <a name="WiFi_Devices"></a>Supported Adapters
A list of WiFi adapters that have been tested on Windows 10 IoT Core can be found on our [Supported Hardware]({{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#WiFi-Dongles){:target="_blank"} page

### Configuring WiFi
To use WiFi, you'll need to provide Windows 10 IoT core with the WiFi network credentials. There are a few different options for doing so:

## Headed Options:

### Option 1: Startup Configuration
**Prerequisite:** The Windows 10 IoT core device needs a mouse, keyboard, display, and USB WiFi Adapter plugged in

The first time you boot Windows 10 IoT Core with a supported USB WiFi adapter, you will be presented with a configuration screen.
On the configuration screen, select the WiFi network you would like to connect to and supply the password. Click **connect** to initiate the connection.

![Startup WiFi Configuration Screen]({{site.baseurl}}/Resources/images/SetupWiFi/WiFiStartupConfig.png)

### Option 2: Default App Configuration
**Prerequisite:** The Windows 10 IoT core device needs a mouse, keyboard, display, and USB WiFi Adapter plugged in

An alternative way to configure WiFi is to use the default app. You can use this to configure or modify WiFi settings after the device has booted.

1. Click on the gear-shaped settings icon on the homepage
2. Select **Network & Wi-Fi** in the left pane
3. Click on the WiFi network you want to connect to. Supply the password if prompted, and click **Connect**

![Default App WiFi Configuration]({{site.baseurl}}/Resources/images/SetupWiFi/DefaultAppWiFiConfig.png)

## Headless Options:

### Option 1: Web-Based Configuration
**Prerequisite:** Your device will already need to be connected to your local network through Ethernet and should have a USB WiFi Adapter plugged in

If you have device a with no UI, display, or input devices, you can still configure it through the [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm).
In **Windows 10 IoT Core Dashboard**, *Click* on the **Open in Device Portal** icon for your device.

<!-- This content is replicated at en-US/win10/KitSetupRPI.md -->

1. Enter **Administrator** for the username, and supply your password (p@ssw0rd by default)
2. Click on **Networking** in the left-hand pane
3. Under **Available networks**, select network you would like to connect to and supply the connection credentials. Click **Connect** to initiate the connection

![Web Based WiFi Configuration]({{site.baseurl}}/Resources/images/SetupWiFi/WebBWiFiConfig.png)

<!-- End of Replicated Content -->


### Option 2: Connect using WiFi Profiles

**Prerequisite:** Your device will already need to be connected to your local network through Ethernet and should have a USB WiFi Adapter plugged in. You also need a Windows PC with WiFi capability.

Setting up WiFi using wireless profiles is supported in Windows 10 IoT Core. See [MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/aa369853) for details and examples.

1. Connect your Windows PC to the desired wireless network and create WiFi profile XML file with these commands:

    * `netsh wlan show profiles` -> find the name of the profile you just added

    * `netsh wlan export profile name=<your profilename>`. This will export the profile to an XML file

2. Open up a **File Explorer** window, and in the address bar type `\\<TARGET_DEVICE>\C$\` and then hit enter.  In this particular case, `<TARGET_DEVICE>` is either the name or the IP address of your Windows 10 IoT Core device:

    ![SMB with File Explorer]({{site.baseurl}}/Resources/images/DriverLab/smb1.png)

    If you are prompted for a user name and password, use the following credentials:

        User Name: <TARGET_DEVICE>\Administrator
        Password:  p@ssw0rd

    ![SMB with File Explorer]({{site.baseurl}}/Resources/images/DriverLab/cred1.png)

    NOTE: It is **highly recommended** that you update the default password for the Administrator account.  Please follow the instructions found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)

3. Copy the exported WiFi profile XML file from the Windows PC to your Windows 10 IoT Core device

4. Connect to your device using [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) and add the new WiFi profile to your device by executing the following commands

    * `netsh wlan add profile filename=<copied XML path>`

    * `netsh wlan show profiles`

5. Connect the Windows 10 IoT Core device to wireless network via netsh

    * `netsh wlan connect name=<profile name>`

6. Verify that your device is connected to the wireless network and can reach the internet

    * `netsh wlan show interfaces`

    * `ipconfig /all`

    * `ping /S <your WiFi adapter ip address> bing.com`


#### Connecting to WPA2-PSK Personal networks

If you need to connect to a WPA2-PSK Personal WiFi network, follow the instructions above first, but make the following changes to the XML file. The only difference is that when your Windows PC exports the XML it encrypts the password.

    NOTE: this will make your connection insecure

Profile XML exported from Windows PC:

    <sharedKey>
        <keyType>passPhrase</keyType>
        <protected>true</protected>
        <keyMaterial><Your Encrypted password></keyMaterial>
    </sharedKey>


Changes needed to work on Windows 10 IoT Core:

    <sharedKey>
        <keyType>passPhrase</keyType>
        <protected>false</protected>
        <keyMaterial><Your Unencrypted password></keyMaterial>
    </sharedKey>
