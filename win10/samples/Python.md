---
layout: default
title: Python for IoT Sample
permalink: /win10/samples/Python.htm
---

<div class="container" markdown="1">
##Python Apps

###Set up your PC

* Follow the instructions [here]({{site.baseurl}}/win10/SetupPC.htm) to install Visual Studio 2015 Preview.

* Install Python for Windows (3.*) from [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* Download and extract PTVS (Python Tools for Visual Studio) IoT Preview VS 2015 content from [here]({{site.downloadurl}}).

* Install Python Tools for Visual Studio 2015: PTVS IoT Preview VS 2015.msi

* Install Python UAP SDK: pyuapsdk.vsix

###Create new Python project

* Create new project based on `Template > Python > Windows IoT Core > Background Application (IoT)`

###Output Hello World!

Modify *StartupTask.py* like this

{% highlight Python %}
print("Hello, World from IoT!")
{% endhighlight %}

###Deploy Python app to your Windows IoT Core device

* Right-click the Project node and select Properties

* Make sure you set the 'Remote Machine' setting to point to your device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/win10/samples/HelloWorld.htm) if you need guidance.

* When everything is set up, you should be able to press F5 from Visual Studio: The Python app will deploy and start on the device.

* **`NOTE: Launching the debugger for Python can take a few minutes to connect and start debugging the remote Python.  If it takes more than a few minutes, there may be a problem with msvsmon on the remote device.  Please check the FAQ for any potential fixes/workarounds.`**

###Use Windows Devices from Python (e.g. GPIO, I2C, SPI)

* Right-click on the References node in the Python project

* Click Add Reference...

* Click on Browse tab

* Navigate to [here](https://github.com/ms-iot/samples/tree/master/PythonBlinky/windevices)

* Navigate to ARM for RPi2 or win32 for MBM

* Select the PYD file for the device type and configuration you want to use (e.g. _wingpio_d.pyd if a Debug configuration and _wingpio.pyd for a Release configuration)

* Add **import _wingpio as gpio** to your StartupTask.py

* Start using gpio functions (similar steps for I2C or SPI)

###Questions/Suggestions

Please refer to the [FAQ]({{site.baseurl}}/Faqs.htm) for issues.

</div>
