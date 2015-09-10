---
layout: default
title: Web-based Device Management
permalink: /en-US/win10/tools/Webb.htm
lang: en-US
---

<div class="container" markdown="1">

##Web-based device management
   Web-based device management provides basic configuration and device management capabilities, in addition to advanced diagnostic tools to help you troubleshoot and view the real time performance of your Windows IoT Device. 
   
   Once connected to your local network, every Windows 10 IoT Core device will allow you to access these tools.
![Webb Home]({{site.baseurl}}/images/webb/webb.png)

<hr>


##Set up
1. **Connect your board to the internet**

   To get Web-based device management up and running, you first need to connect your device to your network. To do so, connect an Ethernet cable from your board into to your local network.

2. **Find your devices IP address**
    * If your device is connected to a monitor, your IP address is listed on the front page. If you do not see an IP address, your board is not properly connected to your network. ![DefaultApp IP]({{site.baseurl}}/images/webb/defaultapp_ip.png)
	* If you have already [set up your PC]({{site.baseurl}}/{{page.lang}}/win10/SetupPC.htm), you should have **Windows IoT Core Watcher** installed on your PC. Launch Windows IoT Core Watcher and find your machine name. Listed next to the machine name is your board's IP address. If you cannot find your machine, either your PC or your board is not properly connected to your network.![IotWatcher IP]({{site.baseurl}}/images/IoTCoreWatcher.PNG)

3. **Connect to Web-based device management through your browser**
    * Enter the IP address into the address bar. Add :8080 onto the end.![Browser IP]({{site.baseurl}}/images/webb/browser_ip.png)
    * In the credentials dialog, use the default username and password: `Administrator`, `p@ssw0rd`
    * Web-based device management should launch and display the web management home screen!

 You can also launch the Web-based device management tool from the Windows IoT Core Watcher by right clicking on your device, and clicking Launch in browser

<hr>
	






##Features

This tool is still in beta. Some of the features are untested or still being worked on.

###**Top Toolbar**
    
The top toolbar allows you to shutdown, reboot and give feedback.![Webb toolbar]({{site.baseurl}}/images/webb/toolbar.png)

* Shutdown - Shuts down the device.
* Reboot - Reboots the device.
* Feedback - Opens up the Windows 10 Feedback tool where you can enter any valuable feedback.
* Help - Takes you to this documentation page.

   ```Note: For Rpi2 users, the Shutdown button is not working correctly, and reboots the device. A fix is coming soon```

###**Home**

This section is coming soon! Stay tuned

###**Apps**

Provides install/uninstall functionality for AppX packages and bundles on your device.

``` Note that Windows 10 IoT Core only allows you to have one app running in the foreground at a time.```

**Installing an app**

1.	Once you've created your first app, you can remotely install it onto your device. After building from Visual Studio, an output folder will be generated. <img class = "screen-snippet" src="{{site.baseurl}}/images/webb/installapp0.png">	
2.	In WebB, click browse and find your .appx.
3.	Click certificate browse, find the .cer file. 
4.	Add dependencies. If you have more than one, and you will have to add each one by one. 	
5.	Hit Install. 
6.	To install another app, hit the Reset button to clear the fields.


**Uninstalling an app**

1.	Ensure that your app is not running. 
2.	If it is, go to 'running apps' and close it. If you attempt to uninstall while the app is running, it will cause issues when trying to re-install the app. 
3.	Once you're ready, hit Uninstall.
    

**Deployment log**
    <img class="screen-snippet" src="{{site.baseurl}}/images/webb/deploymentlog.png">
    The deployment log is a progress checklist indicating how far you are with deploying an app.

###**Processes**
Much like the Task Manager on your PC, this section allows you to see which processes are currently running as well as the memory usage each are holding.  Clicking the X next to a process terminates it.

###**Performance**
Displays real-time diagnostics of CPU and I/O usage, and memory stats.<img src="{{site.baseurl}}/images/webb/iograph.png">

* CPU usage maps the central processing unit's usage.

<img src="{{site.baseurl}}/images/webb/cpugraph.png">

* I/O shows disk utilization (i.e reading and writing to the storage)

###**Debugging**
The debugging section is great for identifying problems within your application.

<img src="{{site.baseurl}}/images/webb/debug1.png">

* Any system crashes will automatically be logged and available to view through the web management tool.  You can then download the kernel dump and try to figure out what's going on.

<img src="{{site.baseurl}}/images/webb/debug2.png">

* This is similar to Live kernel dumps, but for the user mode processes. 
* Clicking the download button will cause a 'minidump', and the entire state of that process will be downloaded. This is great for debugging hanging processes.

<img src="{{site.baseurl}}/images/webb/debug3.png">

* When your IoT Core device crashes, your machine attempts to send a report up to the Windows error reporting service. When this happens, a log of the report is stored and becomes available for viewing.
* The error reports do not contain dump information and are more targeted towards apps and processes. 
* It also gives a nice history of everything that happened on your device. 

Type: State of the report upload to the windows error reporting service. 

###**ETW**
Event tracing for Windows.

More coming soon..

###**Perf Tracing**

This section allows you to do record a trace log for CPU, disk usage and memory. 

More details coming soon. 

###**Device Manager**

Enumerates all peripherals attached to your device.

###**Networking**

Once your board is connected to the internet, the IP configuration section will allow you to view advanced network diagnostic information, such as your IP address, and the description of the connection.

Wi-Fi adapters are not currently supported.  This will be coming soon.
<hr>


##Additional Information

###Changing the default port
1. Launch powershell and [connect to your device.]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)
2. Set the port:
    ```Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\WebB /v HttpPort /t REG_DWORD /d <your port number>```
3. If you want to set the https port
	```Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\WebB /v UseHttps /t REG_DWORD /d 1 /f```, ```Reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\IoT\WebB /v HttpsPort /t REG_DWORD /d <your port number> /f```
3. Restart the webb.exe process by restarting service (```net stop bwebmanage & net start bwebmanage```) it or rebooting the device.




</div>
