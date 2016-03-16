---
layout: default
title: Phidgets 传感器
permalink: /zh-cn/win8/samples/PhidgetsSensors.htm
lang: zh-cn
---

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

# Phidgets 传感器
了解如何使用 Phidgets 库和使用 Phidgets 声压级传感器交谈。

# 所需组件
* 一个 Phidgets I/O 板。我们使用了 [8/8/8](http://www.phidgets.com/products.php?category=0&product_id=1018_2){:target="_blank"} 或 [2/2/2](http://www.phidgets.com/products.php?category=0&product_id=1011_0){:target="_blank"}
* [声音传感器](http://www.phidgets.com/products.php?category=6&product_id=1133_0){:target="_blank"}
* 带有 USB 插孔和微型 USB 插头的转换器

# 连接组件
1. 将转换器的 USB 插头一端连接到 Galileo 上的 USB 主机端口。
1. 将转换器的 USB 插孔一端连接到 Phidget I/O 板或从其伸出的 USB 电缆。
1. 将声音传感器连接到 Phidget I/O 板上的端口。

# 创建一个新项目

1. 从模板创建新项目。
1. 转到 [Phidgets 站点](http://www.phidgets.com/docs/OS_-_Windows#Quick_Downloads){:target="_blank"}上的“快速下载”部分。
1. 单击“Phidget21 库”链接以下载库、解压缩文件夹并在编译项目时使用 phidget21-windevel\\IA32 下的 dll 和 lib。
1. 将 phidget21.h 文件复制到项目中。
1. 将项目链接到 phidget21.lib。
1. 将 phidget21.dll 放置在你的 Galileo 的 Windows\\System32 文件夹上以便使用 Phidget 代码的任何将来的程序都可运行。
1. 使用以下代码替换 main.cpp 中的现有代码：

# 代码

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

[&laquo; 返回到示例](SampleApps.htm){:role="button"}{:class="btn btn-default"}
