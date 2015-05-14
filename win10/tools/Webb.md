---
layout: default
title: Web-based Device Management
permalink: /win10/tools/Webb.htm
---

<div class="container" markdown="1">

##Web-based Device Management

![Webb Home]({{site.baseurl}}/images/Webb/webb.png)

###Learn how to get advanced diagnostics about your machine from the web

Web-based device management provides basic configuration and device management capabilities, in addition to advanced diagnostic tools to help you troubleshoot and view the real time performance of your IoT Device. Every Windows 10 IoT Core device, once connected to your local network, will allow you to do access these tools.


###Connect your board to the internet
 
To get Web-based device management up and running, you first need to connect your device to your network. To do so, connect an Ethernet cable from your board into to your local network.


### Find your devices IP address

You can find your IP address two ways:

1.	If your device is connected to a monitor, your IP address is listed on the front page. If you do not see an IP address, your board is not properly connected to your network.  

    ![DefaultApp IP]({{site.baseurl}}/images/Webb/defaultapp_ip.png)

2.	If you have already [set up your PC]({{site.baseurl}}/win10/SetupPC.htm), you should have **Windows IoT Core Watcher** installed on your PC. Launch Windows IoT Core Watcher and find your machine name. Listed next to the machine name is your boards IP address. If you cannot find your machine, either your PC or your board is not properly connected to your network. 

    ![IotWatcher IP]({{site.baseurl}}/images/IoTCoreWatcher.png)

###Connect to Web-based device management through your browser

1.	Using your favorite browser, enter the IP address into the address bar

	![Browser IP]({{site.baseurl}}/images/Webb/browser_ip.png)

2.	Web-based device management should launch and display the web management home screen:

	![Webb Home]({{site.baseurl}}/images/Webb/webb.png)

    You can also launch the Web-based Device Management tool from the Windows IoT Core Watcher by right clicking on your device, and clicking Launch in browser

###Top Toolbar
The top toolbar allows you to shutdown, reboot and give feedback. 

![Webb toolbar]({{site.baseurl}}/images/Webb/toolbar.png)

* Shutdown - Shuts down the device
* Reboot - Reboots the device
* Feedback - Opens up the Windows 10 Feedback tool where you can enter any valuable feedback 
* Help - The help button is currently in progress and will updated soon 

    Note: For Rpi2 users, the Shutdown button is not working correctly, and reboots the device. A fix will come soon

 
###Description of Web-based device management functionalities

    This tool is still in beta. Some of the features are untested or still being worked on. 

* ####**Home**

	This section is coming soon! Stay tuned

* ####**Apps**

	Provides install/uninstall functionality for AppX packages and bundles on your device. 

	    Windows 10 IoT Core only allows you to have one app running in the foreground at a time. 

* ####**Processes**

	Much like the Task Manager on your PC, the processes allows you to see which processes are currently running as well as the memory usage each are holding.  Clicking the X next to a process terminates it.

* ####**Performance**

	Displays real-time diagnostics of CPU and I/O usage, and memory stats.

* ####**Debugging, ETW Realtime, Perf Tracing**

	These sections are currently a work in progress. More details are coming soon 

* ####**Device Manager**

	Enumerates all peripherals attached to your device

* ####**Networking**

	Once your board is connected to the internet, the IP configuration section will allow you to view advanced network diagnostic information, such as your IP addres, and the description of the connection. 

	    Wi-Fi adapters are not currently supported.  This will be coming soon.

 

</div>
