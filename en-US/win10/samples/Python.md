---
layout: default
title: Python 'Hello, World' sample
permalink: /en-US/win10/samples/Python.htm
lang: en-US
---

## Python 'Hello, World' Sample

{% include VerifiedVersion.md %}

### Set up your PC

* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/GetStarted.htm) to setup your device and PC.

* Install Python for Windows (3.*) from [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* Download and install PTVS (Python Tools for Visual Studio) **VS 2015** latest release from [here](https://github.com/microsoft/ptvs/releases){:target="_blank"}.

* Download and install the latest Python UWP SDK (pyuwpsdk.vsix) release from [here](https://github.com/ms-iot/python/releases){:target="_blank"}.

### Create new Python project

* Create new project based on `Template > Python > Windows 10 IoT Core > Background Application (IoT)`

### Output Hello World!

Modify *StartupTask.py* like this

{% highlight Python %}
print("Hello, World from IoT!")
{% endhighlight %}

### Deploy Python app to your Windows 10 IoT Core device

* Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#python).

	**NOTE: For now, use device name in lieu of IP address.  If the device name is not unique, use `setcomputername` tool on the device to reset the device name and reboot.  Documentation for this can be found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)**

* The Python app will deploy and start on the device.

	**NOTE: Launching the debugger for Python can take a few minutes to connect and start debugging the remote Python.  If it takes more than a few minutes, there may be a problem with msvsmon on the remote device.  Please check the FAQ for any potential fixes/workarounds.**

* The '*Hello, World from IoT!*' message will be displayed in the output window of Visual Studio.  Open the output window by `Debug > Window > Output`.

### Use Windows Devices from Python (e.g. GPIO, I2C, SPI)

* Right-click on the References node in the Python project

* Click Add Reference...

* Click on Browse tab

* Download pywindevices content from [here](https://github.com/ms-iot/samples/tree/master/PyWinDevices){:target="_blank"}

* Navigate to ARM for RPi2 or RPi3 or win32 for MBM

* Select the PYD file for the device type and configuration you want to use (e.g. _wingpio_d.pyd if a Debug configuration and _wingpio.pyd for a Release configuration)

* Add **import _wingpio as gpio** to your StartupTask.py

* Start using gpio functions (similar steps for I2C or SPI)

* WinDevices documentation can be found [here](https://github.com/ms-iot/samples/tree/master/PyWinDevices/docs){:target="_blank"}

### Questions/Suggestions

Please refer to the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) for issues.
