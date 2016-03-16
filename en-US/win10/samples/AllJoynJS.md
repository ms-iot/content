---
layout: default
title: AllJoyn.JS
permalink: /en-US/win10/samples/AllJoynJS.htm
lang: en-US
---

## AllJoyn.JS

{% include VerifiedVersion.md %}

AllJoyn.JS, by Allseen Alliance, provides an easy and flexible way to develop AllJoyn applications in JavaScript.  AllJoyn.JS is a deep integration between AllJoyn Thin Core Library (ajtcl) and base services with Duktape, an ECMAScript 5.0 compliant compiler and runtime designed for small-footprint embedded microcontrollers.

AllJoyn.JS runtime environment includes a ScriptConsole service that provides support for installing new scripts and interacting with a running JavaScript application.  The ScriptConsole service is an AllJoyn service, and like any other AllJoyn service it can be accessed over the network from another device running a corresponding client application.

This tutorial shows how to get AllJoyn.JS running as a Windows 10 application.

## Prerequisties

1. Install [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.

## Set up steps

1. Install the required tools listed in the prerequisites on your Windows 10 desktop
 (see their respective documentations to figure out how to proceed).

2. Set up your Raspberry Pi2 (if you target that device).
   See instruction [here]({{site.baseurl}}/en-US/win10/SetupRPI.htm){:target="_blank"}.

3. Deploy AllJoyn.JS

>Note that in Windows 10, when a machine has __multiple AllJoyn modern applications__ that __need to interact__ on the same machine, the user must __add a loopback exemption__ for these modern applications. Consequently, if you run both the ZigBee adapter and IoT Explorer for AllJoyn on the same machine you will need to add a loopback exemption for these 2 applications. This isn't needed for application you run from Visual Studio 2015. Note that when deploying an application from Visual Studio 2015, the loopback exemption is for the lifetime of the installed application. Meaning that you can launch the app directly (not from Visual Studio 2015) afterwards and it will have the loopback exemption.

Set up loopback exception:

1. Find the installation folder of the modern application for which you want to enable the loopback exemption. It is located at 'C:\Users\\**username**\AppData\Local\Packages'
 ![LoopBackException]({{site.baseurl}}/Resources/images/AllJoyn/AllJoynJS_LoopBackException.png)

2. Copy the installation folder name which is also the application ID.

3. Run the following command from an elevated command prompt:  
 `CheckNetIsolation LoopbackExempt -a -n=installation-folder-name`

4. Restart your applications.

## Deploy AllJoyn.JS to Windows 10 device

1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
Alternatively, you can download directly from Allseen Alliance by cloning AllJoyn [DSB repository](https://git.allseenalliance.org/cgit/dsb.git){:target="_blank"}
`git clone https://git.allseenalliance.org/gerrit/dsb.git`


2. In the folder where you have the samples, go to folder `samples-develop\AllJoyn\Samples\AllJoyn.JS\External` and run **clone.cmd**.  This will clone additional dependency libraries from Allseen Alliane's git repositories.

3. Download Duktape [here](http://www.duktape.org/duktape-1.2.1.tar.xz){:target="_blank"} and decompress it to `samples-develop\AllJoyn\Samples\AllJoyn.JS\External`.  Rename decompressed folder from `duktape-1.2.1` to `duktape`

4. The final folder structure should look like this:
 ![FolderStructure]({{site.baseurl}}/Resources/images/AllJoyn/AllJoynJS_FolderStructure.png)

5. Open `samples-develop\AllJoyn\Samples\AllJoyn.JS\AllJoyn.JS.sln` in Visual Studio.

6. Select the relevant target (x86, x64 or ARM) and build the solution in Visual Studio.

You are now ready to launch it, so launch or debug HeadedAdapterApp project on desktop or if the targeted Windows 10 device has a display or launch or debug HeadlessAdapterApp if it doesn't.
If needed, see instruction [here]({{site.baseurl}}/en-US/win10/AppDeployment.htm){:target="_blank"} for remote debugging.

## Deploy script file

ScripeConsole service can be used to deploy/install new scripts.  A command line console client is included in AllJoyn.JS source tree (dsb\Samples\AllJoyn.JS\External\allseen\core\alljoyn-js\console).  Pre-built console application can be found [here](https://build.allseenalliance.org/ci/job/alljoyn_js-console-win/){:target="_blank"}.

Sample script **echo.js** that echoes input:  
 `function Echo(val)
 {
    print(val + " " + val);
 }`

Run the console application to deploy echo.js:

> C:\bin>ajs_console.exe echo.js  
Found script console service: :GdpFgXrQ.86  
Joined session: 1920857932  
Installing script echo.js  
Installing script of length 52  
Eval result=0: Script installed  
Echo("Hello");  
Eval compile success  
PRINT: Hello Hello  
Eval result=0: undefined

## General purpose I/O pins

AllJoyn.JS provides a hardware-independent abstraction layer for GPIO and other I/O peripherals

- Pins are labeled pin[0] through pin[N]
- To enumerate information for all the pins on a device  
 `for (var i = 0; i < IO.pin.length; ++i) { print(IO.pin[i].info.description, " ", IO.pin[i].functions)); };`

- The I/O module currently has the following functions for configuring pins:  
   *digitalIn(), digitalOut()*

- When a pin is configured as a digital input pin. the application must specify if the pin is pullUp, pullDown, or openDrain.  
  `var button = IO.digitalIn(IO.pin[2], IO.pullUp)`

- A trigger function can be set on a digital input pin. The trigger function can be configured to be called when the pin state changes.  
  `button.setTrigger(IO.risingEdge, function(){print("button up")})`

- Digital input and output pins have a level property that can be set and read. An optional initial value can be provided for digital output pins.  
`var led = IO.digitalOut(IO.pin[2], 1);
 led.level = 0;
 led.level = 1;`

- For all GPIO APIs, please refer to [AllJoyn.JS IO APIs (Allseen Alliance)](https://git.allseenalliance.org/cgit/core/alljoyn-js.git/plain/doc/html/IO.html){:target="_blank"}

> Even though the GPIO layer is hardware-independent, pin numbers and assignments differ among hardware devices.  Current pin numbers and assignments are based on [Raspberry Pi 2 and 3]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png).

## Sample scripts

Many JavaScript samples are included in AllJoyn.JS source under folder `samples-develop\AllJoyn\Samples\AllJoyn.JS\External\allseen\core\alljoyn-js\js`.

## Additional Resources

- [Getting started with AllJoyn.js (Allseen Alliance)](https://allseenalliance.org/framework/documentation/develop/building/alljoyn-js){:target="_blank"}.
- [Programming IoT Applications Using AllJoyn.js (Allseen Alliance)](https://wiki.allseenalliance.org/_media/training/programming_alljoyn.js.pdf){:target="_blank"}.
- [AllJoyn.JS APIs (Allseen Alliance)](https://git.allseenalliance.org/cgit/core/alljoyn-js.git/plain/doc/html/){:target="_blank"}.