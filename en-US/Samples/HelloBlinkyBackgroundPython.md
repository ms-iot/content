---
layout: sample
title: Hello, blinky! background service
description: A "Hello, world!" sample that lights up a small LED on your breadboard
keyword: Beginner, gpio, headless
permalink: /en-US/Samples/HelloBlinkyBackgroundPython.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/HelloBlinkyBackground
lang: en-US
---

# Hello, blinky! background service

We'll create a simple Python Blinky app and connect a LED to your Windows 10 IoT Core device (Raspberry Pi 2 or 3 or MinnowBoard Max).  Be aware that the GPIO APIs are only available on Windows IoT Core, so this sample cannot run on your desktop.


{% include note.html text="While deploying and running a Python UWP app is supported on Windows 10 IoT Core, debugging is currently a known issue for Windows 10 IoT Fall Creators Update (Build 16299) and Visual Studio 2017. We are looking into fixing this in a future release of Windows 10 IoT Core." %}

### Set up your PC
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/GetStarted) to setup your device and PC.

* Install Python for Windows (3.*) from [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* Download and install PTVS (Python Tools for Visual Studio) **VS 2017** latest release from [here](https://github.com/Microsoft/PTVS/releases/latest/){:target="_blank"}.

* Download and install the latest Python UWP SDK (pyuwpsdk.vsix) release from [here](https://github.com/ms-iot/python/releases){:target="_blank"}.

### Set up your hardware
The setup for this sample is the same as the C# 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/Samples/helloblinky).

### Headless mode

This application is designed for a headless device.  To better understand what Headless mode is and how to configure your device to be headless, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/Docs/HeadlessMode).

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\HelloBlinkyBackground\Python`.  Make a copy of the folder on your disk and open the project from Visual Studio.

If you're building for MinnowBoard Max, select `x86` in the architecture drop down.  If you're building for Raspberry Pi 2 or 3, select `ARM`.

Make sure you connect the LED to your board. Go back to the basic 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/Samples/helloblinky) if you need guidance.

Note that the app will not run successfully if it cannot find any available GPIO ports.

### Let's look at the code
The code for this sample is pretty simple. We use _wingpio and time modules.

*NOTE: _wingpio reference is already added to the project and is conditioned on the different configuration and platform combinations.*
*For new projects, download pywindevices.zip from [CPython UWP SDK](https://github.com/ms-iot/python/releases) releases and add the appropriate reference to your project.*

### Blinky code
Here is how you set up the blinking led in Python:
{% highlight Python %}
import _wingpio as gpio
import time

led_pin = 5
pinValue = gpio.HIGH

gpio.setup(led_pin, gpio.OUT, gpio.PUD_OFF, gpio.HIGH)

while True:
    if pinValue == gpio.HIGH:
        pinValue = gpio.LOW
        gpio.output(led_pin, pinValue)
    else:
        pinValue = gpio.HIGH
        gpio.output(led_pin, pinValue)

    time.sleep(0.5)

gpio.cleanup()
{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.

### Deploy Python app to your Windows 10 IoT Core device

Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/Docs/AppDeployment.htm#python).

{% include note.html text="For now, use device name in lieu of IP address. If the device name is not unique, use `setcomputername` tool on the device to reset the device name and reboot." %}

The Python app will deploy and start on the device.

{% include note.html text="Launching the debugger for Python can take a few minutes to connect and start debugging the remote Python. If it takes more than a few minutes, there may be a problem with msvsmon on the remote device. Please check the FAQ for any potential fixes/workarounds." %}

### Questions/Suggestions

Please refer to the [FAQ]({{site.baseurl}}/{{page.lang}}/Support/Faqs) for issues.
