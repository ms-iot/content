---
layout: default
title: Background Applications
permalink: /en-US/win10/BackgroundApplications.htm
lang: en-US
---

# Developing Background Applications

Background Applications are applications that have no direct UI. Once deployed and configured, these applications launch at machine startup and run continuously without any process lifetime management resource use limitations. If they crash or exit the system will automatically restart them.
These Background Applications have a very simple execution model. The templates create a class that implements the "IBackgroundTask" interface and generates the empty "Run" method. This "Run" method is the entry point to your application.

![IBackground Task]({{site.baseurl}}/Resources/images/BackgroundApplications/backgroundTaskScreenshot.png)

There is one critical point to note: by default, the application will shut down when the run method completes. This means that apps that follow the common IoT pattern of running a server waiting for input or on a timer will find the app exit prematurely. To prevent this from happening you must call the "GetDeferral" method to prevent the application from exiting. You can find more information on the deferral pattern [here](https://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.background.backgroundtaskdeferral.aspx).

## Where can Background Applications be installed from? 

You can download and install IoT templates to enable Background Applications from the Visual Studio Gallery [here](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec).  Alternatively, the templates can be found by searching for `Windows IoT Core Project Templates` in the [Visual Studio Gallery](https://visualstudiogallery.msdn.microsoft.com/) or directly from Visual Studio in the Extension and Updates dialog (Tools > Extensions and Updates > Online).

## What languages are available?

**Background Application (IoT)** templates can be found for:

* **C++** `File > New > Project > Installed > Visual C++ > Windows > Windows IoT Core`
* **C#** `File > New > Project > Installed > Visual C# > Windows > Windows IoT Core`
* **Visual Basic** `File > New > Project > Installed > Visual Basic > Windows > Windows IoT Core`
* **JavaScript** `File > New > Project > Installed > JavaScript > Windows > Windows IoT Core`

## How are Background Applications used? 

Creating a Background Application is very similar to creating a Background Task.  When the Background Application starts, the Run method is called:

{% highlight C++ %}
public void Run(IBackgroundTaskInstance taskInstance)
{
}
{% endhighlight %}

When the Run method ends, unless a deferral object is created, the Background Application ends.  The common practice, for asynchronous programming is to take a deferral like this:

{% highlight C++ %}
private BackgroundTaskDeferral deferral;
public void Run(IBackgroundTaskInstance taskInstance)
{
    deferral = taskInstance.GetDeferral();
    
    //
    // TODO: Insert code to start one or more asynchronous methods
    //
}
{% endhighlight %}

Once a deferral is taken, the Background Application will continue until the deferral object's Complete method is called.

{% highlight C++ %}

deferral.Complete();

{% endhighlight %}

Between the Background Application's start and eventual end, most Universal Windows Platform (UWP) APIs are be available for use (to be aware of the exceptions, please see our list of [Unavailable APIs]({{site.baseurl}}/{{page.lang}}/win10/UnavailableApis.htm)).

## How do Background Applications start?

This question can be broken into deployment and invocation.  

To deploy a Background Application, you can either:

* Use Visual Studio's F5 (which will build, deploy and invoke).  For more detail, see our [Hello World sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device) where we describe how to deploy and launch from Visual Studio.

    **NOTE:** this will not configure your Background Application to start when the device boots.

* Create an AppX in Visual Studio by selecting Project > Store > Create App Packages.  Once you have created an AppX, you can use [Windows Device Portal]({{site.baseurl}}/{{page.lang}}/win10/tools/DevicePortal.htm#apps) to deploy it to your Windows 10 IoT Core device.

To invoke a Background Application, you can either:

* As mentioned above, Visual Studio's F5 functionality will deploy and immediately start your Background Application.

    **NOTE:** this will not configure your Background Application to start when the device boots.

* For a Background Application that has been deployed to an IoT device, you can use the iotstartup.exe utility to configure your Background Application to start when the device boots.  To specify your Background Application as a Startup App, follow these instructions (**substitute your app's name** for `BackgroundApplication1` below):

    1. Start a PowerShell (PS) session with your Windows IoT Core device as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

    2. From the PS session, type:

            [192.168.0.243]: PS C:\> iotstartup list BackgroundApplication1

    3. You should see the full name of your Background Application, i.e. something like:

            Headed   : BackgroundApplication1-uwp_cqewk5knvpvee!App
            Headless : BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

    4. The utility is confirming that your Background Application is an 'headless' application, and is installed correctly.  You will likely see a Headed entry as well for your Background Applications, but this can be disregarded.

    5. Now, it's easy to set this app as a 'Startup App'. Just type the command:

            [192.168.0.243]: PS C:\> iotstartup add headless BackgroundApplication1

    6. The utility will confirm that your Background Application has been added to the list of headless 'Startup Apps':

            Added Headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpveeplication1

    7. Go ahead and restart your Windows IoT Core device. From the PS session, you can issue the shutdown command:

            [192.168.0.243]: PS C:\> shutdown /r /t 0

    8. Once the device has restarted, your Background Application will start automatically and Windows 10 IoT Core will make sure that it gets restarted anytime it stops.

    9. You can remove your Background Application from the list of headless Startup Apps by typing the command:

            [192.168.0.243]: PS C:\> iotstartup remove headless BackgroundApplication1

    10. The utility will confirm that your Background Application has been removed from the list of headless 'Startup Apps':

            Removed headless: BackgroundApplication1-uwp_1.0.0.0_x86__cqewk5knvpvee

