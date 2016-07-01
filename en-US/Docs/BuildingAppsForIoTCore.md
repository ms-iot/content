---
layout: default
title: Building Applications for Windows 10 IoT Core
description: Lean about UWP, its support on IoT Core, and other types of apps supported on IoT Core
keyword: windows runtime, windows iot, uwp
permalink: /en-US/Docs/UwpAndIoTCore.htm
lang: en-US
---

# Building Applications for Windows 10 IoT Core

## Application Types
___

### Universal Windows Platform (UWP) Apps
IoT Core is a UWP centric OS and UWP apps are its primary app type. 

UWP, or the Universal Windows Platform, is an evolution of Windows Runtime (WinRT), which provides a common app platform available on every devices that runs Windows 10. You can find more information and an overview to UWP on [MSDN](https://msdn.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide). 

### Traditional UWP Apps
As is the promise with UWP, UWP apps just work on IoT Core, just as they do on other Windows 10 editions. If you simply create a blank Xaml app in Visual Studio, you will be able to deploy it to and IoT Core device just as you would for phones or any other Windows 10 device. All of the standard UWP languages and project templates are fully supported on IoT Core. 

### Background Apps
In addition to the traditional UI apps, IoT Core has added a new UWP app type called "Background Applications". These applications do not have a UI component, but instead have a class that implements the "IBackgroundTask" interface and register that class as a "StartupTask" to run at system boot. These are still UWP apps which have access to the same set of APIs as all UWP apps and are supported from the same language. The only difference is that there is no UI entry point. 

Each type of IBackgroundTask gets its own resource policy and this is usually restrictive to improve battery life and machine resources on devices where these background apps are secondary components of foreground UI apps. However, on IoT devices, Background Apps are often the primary function of the device and so these StartupTasks get a resource policy that mirrors foreground UI apps on other devices. 

The following sample shows you all of the code necessary to build a C# Background App that blinks an LED: 
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

### Non-UWP Apps
While IoT Core does focus on UWP apps, we fully support traditional Win32 app types like Console Apps and NT Services. These apps are buit and run the same way as they do on Windows 10 Desktop and we even have an IoT Core C++ Console project template that makes this very easy to build from VS. 


There are two main limitations on these non-UWP applications. 
1. *No Win32 UI Apps:* There is no Win32 UI stack on IoT Core and so no Win32 app will be able to directly display UI. 
2. *C++ Apps Only:* The only .Net Framework supported on IoT Core supports only UWP apps and so native Win32 apps are supported. 

## Programming Languages
___

IoT Core supports a wide range of programming languages designed to appeal traditional Windows developers and those who prefer more IoT focused languages. The traditional UWP languages ship with support in Visual Studio by default, while the IoT targeted languages require the download of the "Windows IoT Core Project Templates" from the Visual Studio **Tools->Extensions and Updates** manager. 

* In-Box Supported Languages
 * C#
 * C++
 * Javascript
 * Visual Basic
* IoT Focused Languages
 * Arduino Wiring
 * Node.js
 * Python

All of the In-Box languages support both UI and Background Applications, while the IoT Focused languages support only Background Applications. You can also build *Windows Runtime Components* using C#, C++, or Visual Basic and then reference those libraries from any other language (except Python). 

### C# and Visual Basic (VB)
C# and VB are both supported as UWP apps and thus have access to the portion of the .Net Framework available to UWP applications. They support UI apps built with Xaml as well as Background Apps. You can also build *Windows Runtime Components* that can be used from other supported languages. 

There are multiple samples built with these languages, but the samples below provide you with a great primer. 

* [C# Blinky Headless with Full Documentation](https://developer.microsoft.com/en-us/windows/iot/win10/samples/blinkyheadless)
* [C# Blinky Headless Code Only](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless/CS)
* [VB Blinky Headless Code Only](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless/VB)
* [C# Blinky UI App](https://developer.microsoft.com/en-us/windows/iot/win10/samples/blinky)

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
With C++ you can build Xaml or DirectX UI apps, as well as UWP Background projects and *non-UI* Win32 apps. You can find helpful samples below: 

* [Blinky Headless](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless/CPP)
* [Blinky Headed](https://github.com/ms-iot/samples/tree/develop/Blinky/Cpp)
* [Console App](https://developer.microsoft.com/en-us/windows/iot/win10/samples/consoleapp)

### Arduino Wiring
With Arduino Wiring support you can build apps using this popular language and make use of the sample code providing in Arduino Wiring for the breadth of components and peripherals popular in the IoT ecosystem. 

Our [Arduino Wiring Project Guide](https://developer.microsoft.com/en-us/windows/iot/win10/arduinowiringprojectguide) provides full instructions and will help you get set up to build these apps. The samples coppied and linked below will help you get started building your own.  You can even [build](https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryBlinky) WinRT components in Arduino that can then be used from other languages. This is especially helpful for peripherals that have rich Arduino libraries like [LCD character displays](https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryLcdDisplay).

*Blinky Sample Code*
The full [sample code and docs](https://developer.microsoft.com/en-us/windows/iot/win10/samples/arduino-wiring/helloblinky) are available in our samples page and you can find the full code below. 

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

The [headless blinky](https://github.com/ms-iot/samples/tree/develop/BlinkyHeadless/node.js) sample shows how easy it is to build your first IoT Core Node.js app. 
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
* [Johnny-Five App](https://developer.microsoft.com/en-us/windows/iot/win10/samples/nodejswuj5)
* [Cylon App](https://developer.microsoft.com/en-us/windows/iot/win10/samples/nodejswucylon)
* [Express App(https://developer.microsoft.com/en-us/windows/iot/win10/samples/nodejswuexpress)

### Python
IoT Core also supports building Background Apps with Python. Support for the python languages and libaries is fully there, but the python language itself does not support calling UWP APIs and so we provide python libraries to call into critical platform features like GPIO, I2C, PWM, ...

This [app](https://developer.microsoft.com/en-us/windows/iot/win10/samples/pythonblinky) shows how to build a basic Python Background App that blinks an LED. 


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

{% highlight %}

*Additional Interesting Samples*
*[Weather Station](https://github.com/ms-iot/samples/tree/develop/WeatherStation/Python/PythonWeatherStation)
*[GoPiGo using an Xbox Controller](https://github.com/ms-iot/samples/tree/develop/GoPiGoXbox)