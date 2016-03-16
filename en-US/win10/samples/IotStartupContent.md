
### Set your app as the Startup App

1. You can set your app to be the 'Startup App' for your Windows IoT Core device, so that when the device reboot, it will start your app automatically. To do so, you'll need to run a command line utility called iotstartup on the Windows IoT Core device. We will do this using PowerShell.

1. Start a PowerShell (PS) session with your Windows IoT Core device as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

1. From the PS session, type (for simplicity, we will assume the app's name is HelloWorld, **please substitute your app's actual name**):

        [192.168.0.243]: PS C:\> iotstartup list HelloWorld

    and you should see the full name of the UWP application, i.e. something like:

        Headed   : HelloWorld_n2pe7ts0w7wey!App

    the utility is confirming that your app is an 'headed' application, and is installed correctly.

1. Now, it's easy to set this app as the 'Startup App'. Just type the command:

        [192.168.0.243]: PS C:\> iotstartup add headed HelloWorld

    The utility will confirm that the new Startup headed app is now your app:

        AppId changed to HelloWorld_n2pe7ts0w7wey!App

1. Go ahead and restart your Windows IoT Core device. From the PS session, you can issue the shutdown command:

        [192.168.0.243]: PS C:\> shutdown /r /t 0

1. Once the device has restarted, you'll see your app start automatically.

1. At this point, you can revert back to using the DefaultApp as your 'Startup App'. Just type the command:

        [192.168.0.243]: PS C:\> iotstartup add headed IoTCoreDefaultApp

    The utility will confirm that the new Startup headed app is now IoTCoreDefaultApp:

        AppId changed to IoTCoreDefaultApp_kwmcxzszfer2y!App
