---
layout: default
title: Python Blinky Server Sample
permalink: /en-US/win10/samples/PythonBlinkyServer.htm
lang: en-US
---

## Python Blinky Server Sample

{% include VerifiedVersion.md %}

We'll create a simple Python Blinky Web Server app and connect a LED to your Windows 10 IoT Core device (Raspberry Pi 2 or 3 or MinnowBoard Max).  Be aware that the GPIO APIs are
only available on Windows IoT Core, so this sample cannot run on your desktop.

### Set up your PC
* Follow the instructions [here]({{site.baseurl}}/{{page.lang}}/GetStarted.htm) to setup your device and PC.

* Install Python for Windows (3.*) from [http://www.python.org/downloads](http://www.python.org/downloads){:target="_blank"}

* Download and install PTVS (Python Tools for Visual Studio) **VS 2015** latest release from [here](https://github.com/microsoft/ptvs/releases){:target="_blank"}.

* Download and install the latest Python UWP SDK (pyuwpsdk.vsix) release from [here](https://github.com/ms-iot/python/releases){:target="_blank"}.

### Set up your hardware
The setup for this sample is the same as the C# 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm).

### Headless mode

This application is designed for a headless device.  To better understand what Headless mode is and how to configure your device to be headless, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

### Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\BlinkyServer\Python`.  Make a copy of the folder on your disk and open the project from Visual Studio.

If you're building for MinnowBoard Max, select `x86` in the architecture drop down.  If you're building for Raspberry Pi 2 or 3, select `ARM`.

Make sure you connect the LED to your board. Go back to the basic 'Blinky' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Blinky.htm) if you need guidance.

Note that the app will not run successfully if it cannot find any available GPIO ports.

### Let's look at the code
The code for this sample is pretty simple. We use _wingpio, http.server and socketserver modules.

*NOTE: _wingpio reference is already added to the project and is conditioned on the different configuration and platform combinations.*
*For new projects, download pywindevices.zip from [CPython UWP SDK](https://github.com/ms-iot/python/releases) releases and add the appropriate reference to your project.*

### Blinky code
Here is how you set up the blinking led in Python when the web server is hit:
{% highlight Python %}
import http.server
import socketserver
import _wingpio as gpio

led_pin = 5
led_status = gpio.HIGH

gpio.setup(led_pin, gpio.OUT, gpio.PUD_OFF, led_status)

class BlinkyRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
    def do_GET(self):
        global led_status
        if led_status == gpio.LOW:
            self.wfile.write(b"Setting pin to HIGH")
            print('Setting pin to HIGH')
            led_status = gpio.HIGH
        else:
            self.wfile.write(b"Setting pin to LOW")
            print('Setting pin to LOW')
            led_status = gpio.LOW
        gpio.output(led_pin, led_status)

httpd = http.server.HTTPServer(("", 8000), BlinkyRequestHandler)
print('Started web server on port %d' % httpd.server_address[1])
httpd.serve_forever()

{% endhighlight %}

Remember that we connected the other end of the LED to the 3.3 Volts power supply, so we need to drive the pin to low to have current flow into the LED.

### Deploy Python app to your Windows 10 IoT Core device

* Follow the instructions to [setup remote debugging and deploy the app]({{site.baseurl}}/{{page.lang}}/win10/AppDeployment.htm#python).

	**NOTE: For now, use device name in lieu of IP address.  If the device name is not unique, use `setcomputername` tool on the device to reset the device name and reboot.  Documentation for this can be found [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm)**

* The Python app will deploy and start on the device.

	**NOTE: Launching the debugger for Python can take a few minutes to connect and start debugging the remote Python.  If it takes more than a few minutes, there may be a problem with msvsmon on the remote device.  Please check the FAQ for any potential fixes/workarounds.**

* Once you see the message about the web server being started, you can hit the address in a browser to see the LED toggle (http://<yourdeviceip>:8000)

### Questions/Suggestions

Please refer to the [FAQ]({{site.baseurl}}/{{page.lang}}/Faqs.htm) for issues.
