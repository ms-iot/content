---
layout: default
title: Phidgets Sensors
permalink: /en-US/win8/samples/PhidgetsSensors.htm
lang: en-US
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

# Phidgets Sensors
Learn how to use the Phidgets Library and talk with a Phidgets Sound Pressure Level Sensor.

# Required Components
* A Phidgets I/O board. We've used the [8/8/8](http://www.phidgets.com/products.php?category=0&product_id=1018_2){:target="_blank"}
or the [2/2/2](http://www.phidgets.com/products.php?category=0&product_id=1011_0){:target="_blank"}
* [Sound Sensor](http://www.phidgets.com/products.php?category=6&product_id=1133_0){:target="_blank"}
* A USB female to micro USB Male converter

# Hooking up Components
1. Hook up the micro USB male end of the converter to your USB Host port on the Galileo.
1. Hook up the USB female end of the converter to your Phidget I/O Board or the USB cable coming out of it.
1. Hook up the Sound Sensor to a port on the Phidget I/O Board.

# Create a new project

1. Create a new project from the template.
1. Go to the Quick Downloads section at the [Phidgets site](http://www.phidgets.com/docs/OS_-_Windows#Quick_Downloads){:target="_blank"}.
1. Click on the "Phidget21 Libraries" link to download the libaries, unzip the folder, and use the dll and lib under phidget21-windevel\IA32 when compiling your project.
1. Copy the phidget21.h file into your project.
1. Link your project to the phidget21.lib.
1. Place the phidget21.dll into your Galileo's Windows\System32 folder so that any future program using Phidget code can run.
1. Replace the existing code in main.cpp with the following code:

# Code

{% highlight C++ %}
// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "arduino.h"
#include <phidget21.h>

// A handler for when a device is attached that prints the device name and serial number
int CCONV AttachHandler(CPhidgetHandle IFK, void *userptr)
{
    int serialNo;
    const char *name;

    CPhidget_getDeviceName(IFK, &name);
    CPhidget_getSerialNumber(IFK, &serialNo);

    Log(L"%S %10d attached!\n", name, serialNo);

    return 0;
}

// A handler for when a device is detached that prints the device name and serial number
int CCONV DetachHandler(CPhidgetHandle IFK, void *userptr)
{
    int serialNo;
    const char *name;

    CPhidget_getDeviceName(IFK, &name);
    CPhidget_getSerialNumber(IFK, &serialNo);

    Log(L"%S %10d detached!\n", name, serialNo);

    return 0;
}

// A handler for errors
int CCONV ErrorHandler(CPhidgetHandle IFK, void *userptr, int ErrorCode, const char *unknown)
{
    Log(L"Error handled. %d - %S", ErrorCode, unknown);
    return 0;
}

//callback that will run if the sensor value changes by more than the OnSensorChange trigger.
//Index - Index of the sensor that generated the event, Value - the sensor read value
int CCONV SensorChangeHandler(CPhidgetInterfaceKitHandle IFK, void *usrptr, int Index, int Value)
{
    Log(L"Sensor: %d > Value: %d\n", Index, Value);
    return 0;
}

// Sets up the interfacing with Phidgets I/O board and sensors
int interfacekit_simple()
{
    int result;
    const char *err;

    //Declare an InterfaceKit handle
    CPhidgetInterfaceKitHandle ifKit = 0;

    //create the InterfaceKit object
    CPhidgetInterfaceKit_create(&ifKit);

    //Set the handlers to be run when the device is plugged in or opened from software, unplugged or closed from software, or generates an error.
    CPhidget_set_OnAttach_Handler((CPhidgetHandle)ifKit, AttachHandler, NULL);
    CPhidget_set_OnDetach_Handler((CPhidgetHandle)ifKit, DetachHandler, NULL);
    CPhidget_set_OnError_Handler((CPhidgetHandle)ifKit, ErrorHandler, NULL);

    //Registers a callback that will run if the sensor value changes by more than the OnSensorChange trig-ger.
    //Requires the handle for the IntefaceKit, the function that will be called, and an arbitrary pointer that will be supplied to the callback function (may be NULL).
    CPhidgetInterfaceKit_set_OnSensorChange_Handler(ifKit, SensorChangeHandler, NULL);

    //open the interfacekit for device connections
    CPhidget_open((CPhidgetHandle)ifKit, -1);

    //get the program to wait for an interface kit device to be attached
    Log(L"Waiting for interface kit to be attached....\n");
    if ((result = CPhidget_waitForAttachment((CPhidgetHandle)ifKit, 10000)))
    {
        CPhidget_getErrorDescription(result, &err);
        Log(L"Problem waiting for attachment: %S\n", err);
        return 0;
    }

    // Phidget 1133 (Audio Sensor is a non Ratiometric device) - set to non Ratiometric mode.
    CPhidgetInterfaceKit_setRatiometric(ifKit, 0);

    //read interface kit event data
    Log(L"Reading.....\n");

    //keep displaying interface kit data until user input is read
    Log(L"Press any key to exit\n");
    getchar();

    Log(L"Closing...\n");
    CPhidget_close((CPhidgetHandle)ifKit);
    CPhidget_delete((CPhidgetHandle)ifKit);

    //all done, exit
    return 0;
}

int _tmain(int argc, _TCHAR* argv[])
{
    interfacekit_simple();
}
{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}
