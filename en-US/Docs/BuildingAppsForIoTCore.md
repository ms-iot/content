---
layout: docs
title: Writing apps
description: Lean about UWP, its support on IoT Core, and other types of apps supported on IoT Core
keyword: windows runtime, windows iot, uwp
permalink: /en-US/Docs/BuildingAppsForIoTCore.htm
lang: en-US
---

# Writing apps
Learn about the languages supported on Windows 10 IoT Core as well as the UWP and non-UWP app types supported on IoT Core.

## Application Types
___

### Universal Windows Platform (UWP) Apps
IoT Core is a UWP centric OS and UWP apps are its primary app type.

Universal Windows Platform (UWP) is a common app platform across all version of Windows 10, including Windows 10 IoT Core.  UWP is an evolution of Windows Runtime (WinRT). You can find more information and an overview to UWP on [MSDN](https://msdn.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide).

Visual Studio is the primary tool for writing UWP apps for IoT Core and in general. You can find a detailed listing of the compatibility requirements for Visual Studio on [MSDN](https://www.visualstudio.com/en-us/productinfo/visual-studio-15-compatibility-vs)


### Traditional UWP Apps
UWP apps just work on IoT Core, just as they do on other Windows 10 editions. A simple, blank Xaml app in Visual Studio will properly deploy to your IoT Core device just as it would on a phone or Windows 10 PC. All of the standard UWP languages and project templates are fully supported on IoT Core.

There are a few additions to the traditional UWP app-model to support IoT scenarios and any UWP app that takes advantage of them will need the corresponding information added to their manifest. In paticular the "iot" namespace needs to be added to the manifest of these standard UWP apps. 

Inside the <Package> attribute of the manifest, you need to define the iot xmlns and add it to the IgnorableNamespaces list. The final xml should look like this: 

{% highlight C# %}
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  xmlns:iot="http://schemas.microsoft.com/appx/manifest/iot/windows10"
  IgnorableNamespaces="uap mp iot">

{% endhighlight %}

### Background Apps
In addition to the traditional UI apps, IoT Core has added a new UWP app type called "Background Applications". These applications do not have a UI component, but instead have a class that implements the "IBackgroundTask" interface. They then register that class as a "StartupTask" to run at system boot. Since they are still UWP apps, they have access to the same set of APIs and are supported from the same language. The only difference is that there is no UI entry point.

Each type of IBackgroundTask gets its own resource policy. This is usually restrictive to improve battery life and machine resources on devices where these background apps are secondary components of foreground UI apps. On IoT devices, Background Apps are often the primary function of the device and so these StartupTasks get a resource policy that mirrors foreground UI apps on other devices.

The following sample shows the code necessary to build a C# Background App that blinks an LED:
{% highlight C# %}
namespace BlinkyHeadlessCS
{
    public sealed class StartupTask : IBackgroundTask
    {
        BackgroundTaskDeferral deferral;
        private GpioPinValue value = GpioPinValue.High;
        private const int LED_PIN = 5;
        private GpioPin pin;
        private ThreadPoolTimer timer;

        public void Run(IBackgroundTaskInstance taskInstance)
        {
            deferral = taskInstance.GetDeferral();
            InitGPIO();
            timer = ThreadPoolTimer.CreatePeriodicTimer(Timer_Tick, TimeSpan.FromMilliseconds(500));

        }
        private void InitGPIO()
        {
            pin = GpioController.GetDefault().OpenPin(LED_PIN);
            pin.Write(GpioPinValue.High);
            pin.SetDriveMode(GpioPinDriveMode.Output);
        }

        private void Timer_Tick(ThreadPoolTimer timer)
        {
            value = (value == GpioPinValue.High) ? GpioPinValue.Low : GpioPinValue.High;
            pin.Write(value);
        }
    }
}
{% endhighlight %}

You can find in-depth information on Backround apps on [MSDN](https://developer.microsoft.com/en-us/windows/iot/docs/backgroundapplications)

### Non-UWP Apps
We also fully support traditional Win32 app types like Console Apps and NT Services. These apps are buit and run the same way as on Windows 10 Desktop. There is also an IoT Core C++ Console project template to make it easy to build from VS.

There are two main limitations on these non-UWP applications:
1. *No Win32 UI Apps:* Since there is no Win32 UI stack on IoT Core, no Win32 app will be able to directly display UI.
2. *C++ Apps Only:* The only .Net Framework supported on IoT Core supports only UWP apps and so native Win32 apps are supported.

## Programming Languages
___

IoT Core supports a wide range of programming languages.

### In-Box languages
Traditional UWP languages ship with support in Visual Studio by default. All of the In-Box languages support both UI and Background Applications
 
 * Languages
 * C#
 * C++
 * Javascript
 * Visual Basic

### IoT Focused Languages
 The IoT targeted languages require the download of the "Windows IoT Core Project Templates" from the Visual Studio **Tools->Extensions and Updates** manager.  The IoT Focused languages support only Background Applications. You can also build *Windows Runtime Components* using C#, C++, or Visual Basic and then reference those libraries from any other language (except Python).
* Languages
 * Arduino Wiring
 * Node.js
 * Python

### C# and Visual Basic (VB)
C# and VB are both supported as UWP apps and have access to the portion of the .Net Framework available to UWP applications. They support UI apps built with Xaml as well as Background Apps. You can also build *Windows Runtime Components* that can be used from other supported languages.

Samples:


* [C# Blinky Headless with Full Documentation]({{site.baseurl}}/{{page.lang}}/Samples/HelloBlinkyBackground)
* [C# Blinky Headless Code Only](https://github.com/ms-iot/samples/tree/develop/HelloBlinkyBackground/CS)
* [VB Blinky Headless Code Only](https://github.com/ms-iot/samples/tree/develop/HelloBlinkyBackground/VB)
* [C# Blinky UI App]({{site.baseurl}}/{{page.lang}}/Samples/helloblinky)


### Javascript
You can use Javascript to build both UI and Background Apps. The UI apps work the same way they do on all UWP editions. The Background Apps are new for IoT Core but are very simple. The following sample code shows the output of a the *JS New Project Template*:

{% highlight JS %}
// The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409
(function () {
    "use strict";

    // TODO: Insert code here for the startup task

})();
{% endhighlight %}

### C++
With C++ you can build Xaml or DirectX UI apps, as well as UWP Background projects and *non-UI* Win32 apps.

Samples:

* [Blinky Headless](https://github.com/ms-iot/samples/tree/develop/HelloBlinkyBackground/CPP)
* [Blinky Headed](https://github.com/ms-iot/samples/tree/develop/HelloBlinky/Cpp)
* [Console App]({{site.baseurl}}/{{page.lang}}/Samples/MemoryStatus)


### Arduino Wiring
With Arduino Wiring support you can build apps in Arduino Wiring for many popular components and peripherals in the IoT ecosystem.

Our [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/Docs/ArduinoWiringProjectGuide) provides full instructions on how to get set up to build these apps. The samples copied and linked below will help you get started building your own.  You can even [build](https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryBlinky) WinRT components in Arduino that can then be used from other languages. This is especially helpful for peripherals that have rich Arduino libraries like [LCD character displays](https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryLcdDisplay).

*Blinky Sample Code*
The full [sample code and docs]({{site.baseurl}}/{{page.lang}}/Samples/HelloBlinkyBackgroundWiring) are available in our samples page and you can find the full code below.

{% highlight C++ %}
void setup()
{
    // put your setup code here, to run once:

    pinMode(GPIO5, OUTPUT);
}

void loop()
{
    // put your main code here, to run repeatedly:

    digitalWrite(GPIO5, LOW);
    delay(500);
    digitalWrite(GPIO5, HIGH);
    delay(500);
}

{% endhighlight %}

### Node.js
With IoT Core's Node.js supports you can build your Background Apps using this popular language and many of its popular libraries and frameworks. There are a variety of Node.js samples avialable on our github site, but the samples below will give you a great introduction.

The [headless blinky](https://github.com/ms-iot/samples/tree/develop/HelloBlinkyBackground/node.js) sample shows how easy it is to build your first IoT Core Node.js app.
{% highlight JS %}
var http = require('http');

var uwp = require("uwp");
uwp.projectNamespace("Windows");

var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
var pin = gpioController.openPin(5);
var currentValue = Windows.Devices.Gpio.GpioPinValue.high;
pin.write(currentValue);
pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);
setTimeout(flipLed, 500);


function flipLed(){
    if (currentValue == Windows.Devices.Gpio.GpioPinValue.high) {
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    } else {
        currentValue = Windows.Devices.Gpio.GpioPinValue.high;
    }
    pin.write(currentValue);
    setTimeout(flipLed, 500);
}
{% endhighlight %}


*Additional Helpful Samples*

 * [Weather Station Web Server](https://github.com/ms-iot/samples/tree/develop/WeatherStation/Node.js)
 * [Johnny-Five App]({{site.baseurl}}/{{page.lang}}/Samples/J5ServoController)
 * [Cylon App]({{site.baseurl}}/{{page.lang}}/Samples/CylonServoNode)
 * [Express App]({{site.baseurl}}/{{page.lang}}/Samples/ExpressNodejs)

### Python
IoT Core also supports building Background Apps with Python. Support for the python languages and libaries is fully there, but the python language itself does not support calling UWP APIs and so we provide python libraries to call into critical platform features like GPIO, I2C, PWM, ...

This [app]({{site.baseurl}}/{{page.lang}}/Samples/HelloBlinkyBackgroundPython) shows how to build a basic Python Background App that blinks an LED.


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

*Additional Interesting Samples*

 * [Weather Station](https://github.com/ms-iot/samples/tree/develop/WeatherStation/Python/PythonWeatherStation)
 * [GoPiGo using an Xbox Controller](https://github.com/ms-iot/samples/tree/develop/GoPiGoXbox)
