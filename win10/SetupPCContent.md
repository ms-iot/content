###Setting up Visual Studio 2015 Preview on your PC

We have created a versions file describing the supported versions of the required tools.  Use this as a blueprint for installing the required tools on your PC:

* **Install Windows 10** from [here](https://dev.windows.com/en-US/downloads/windows-10-developer-tools)

* **Install Visual Studio 2015 Preview** from [here](https://dev.windows.com/en-US/downloads/install-dev-tools-visual-studio-2015).  Choose the Custom option when you kick off the installer, and then select "Universal Windows App Development Tools".  On the next page confirm that "Tools and Windows SDK", and "Emulators for Windows Mobile" options are going to be installed.

* Make sure you've **enabled developer mode** by following [these instructions](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx).

	* Some customers report installation issues with the previous step. As a workaround, please go to the **Windows Developer Tools Preview page** [here](https://dev.windows.com/en-US/downloads/windows-10-developer-tools).<br/><br/>

	<img class="screen-snippet" src="{{site.baseurl}}/images/SetupPC/download.PNG">

	Scroll down to the bottom of the page to the "Other download options" section and install "Standalone Windows 10 SDK for Windows 10" and "Microsoft Windows 10 Emulator for Mobile".


* **Install WindowsDeveloperProgramForIoT.msi**.  It can be found **inside any** of the Windows 10 IoT Core Insider Preview **image files** (for example, `Windows 10 IoT Core Insider Preview image for Raspberry Pi 2.zip`) [here]({{site.downloadurl}}).  

	* If you have followed the steps for configuring your Raspberry Pi 2 or MinnowBoard Max, you can find WindowsDeveloperProgramForIoT.msi inside the zip file you have already downloaded.


* At this point, you are ready to develop apps.  Notice that the Windows IoT Core Watcher application automatically starts when you log on.  It can be used to find available Windows 10 IoT Core devices to deploy apps to.

    <img class="device-images" src="{{site.baseurl}}/images/IoTCoreWatcher.PNG">

### Connecting to your Windows 10 IoT Core device from your development PC:
There are two options for connecting to your Windows 10 IoT Core device from your development PC:

#### Option 1: Plug your device into your local network
The easiest way to connect to your device is to plug it into a local network that your development PC is already connected to. Plug the **Ethernet cable** from the device into a hub or switch on your **network**.
To keep things simple, it's best if you have a DHCP server (such as a router) present on your network so the device gets an IP address when it boots.

#### Option 2: Connecting your Windows 10 IoT Core device directly to your PC & setting up Internet Connection Sharing (ICS)
If you don't have a local network to plug your device into, you can **create a direct connection to your PC.**
In order to connect and share the internet connection in your PC with your IoT Core device, you must have the following:

* A spare Ethernet port on your development machine.  This can be either an extra PCI Ethernet card or a USB-to-Ethernet dongle.
* An Ethernet cable to link your development machine to your IoT Core device.

Follow the instructions below to enable Internet Connection Sharing (ICS) on your PC

1. Open up the control panel by right-clicking on the Windows button and selecting **Control Panel**, or by opening up a command prompt window and typing ***control.exe***
2. In the search box of the control panel, type ***adapter***
3. Under **Network and Sharing Center**, click **View network connections**
4. Right-click the connection that you want to share, and click **Properties**
5. Click the **Sharing** tab, and select the **Allow other network users to connect through this computer's Internet connection** box.

After you have enabled ICS on your PC, you can now connect your Windows 10 IoT Core device directly to your PC.  You can do it by plugging in one end of the spare Ethernet cable to the extra Ethernet port on your PC, and the other end of the cable to the Ethernet port on your IoT Core device.

Note:

* The **Sharing** tab won't be available if you have only one network connection.
