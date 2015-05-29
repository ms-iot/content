---
layout: default
title: HelloWorld
permalink: /en-US/win10/samples/HelloWorld.htm
lang: en-US
---

##'Hello, World!' Sample

###Create a new C# project
You can find this sample [here](https://github.com/ms-iot/samples/tree/develop/HelloWorld), but as an excercise, this tutorial will take you through the complete steps to create this app from scratch.  

Start Visual Studio 2015 RC.

Create a new project (File \| New Project...).

In the `New Project` dialog, navigate to `Windows Universal` as shown below (in the left pane in the dialog: Templates \| Visual C# \| Windows \| Windows Universal).

Select the template `Blank App (Windows Universal)`

Remember to give a good name to your first app! In this example, we called the project 'HelloWorld'.

![App Template Location]({{site.baseurl}}/images/HelloWorld/new-cs-project-dialog.PNG)

###Developer Mode for Windows 10

If this is the first project you create, Visual Studio will likely prompt you to enable Developer Mode for Windows 10.  To do this, you'll need to follow the steps found [here](https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx)

###Add content to MainPage.xaml
* Let's add some content to the MainPage. From Solution Explorer, select the 'MainPage.xaml' file. We want to add a TextBox and a Button, to show some interaction. So we will edit the XAML file to add these elements. Locate the `<Grid>` tag in the XAML section of the designer, and add the following markup:

{% highlight XML %}
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center">
    <TextBox x:Name="HelloMessage" Text="Hello, World!" Margin="10" IsReadOnly="True"/>
    <Button x:Name="ClickMe" Content="Click Me!"  Margin="10" HorizontalAlignment="Center"/>
    </StackPanel>
</Grid>
{% endhighlight %}


* Now that we have a TextBox and a Button, let's add some code which will be executed when the Button is pressed. Double click on the Button in the design surface: Visual Studio will add a `Click` property to the Button XAML tag and generate the `ClickMe_Click` method in 'MainPage.xaml.cs'. Let's add a simple line of code in the method:

MainPage.xaml:
{% highlight XML %}
<Button x:Name="ClickMe" Content="Click Me!"  Margin="10" HorizontalAlignment="Center" Click="ClickMe_Click"/>
{% endhighlight %}

MainPage.xaml.cs:
{% highlight C++ %}
private void ClickMe_Click(object sender, RoutedEventArgs e)
{
    this.HelloMessage.Text = "Hello, Windows IoT Core!";
}
{% endhighlight %}



###Build and test the app locally
* Make sure the app builds correctly invoking the Build \| Build Solution menu command.

* Since this is a Windows Universal App, you can test this on your Visual Studio machine as well: Just press F5, and the app will run inside your machine. You should see something like this:

    ![HelloWorld Running]({{site.baseurl}}/images/HelloWorld/HelloWorldAppLocal.PNG)

    Close the app after you're done validating it.


###Deploy the app to your Windows IoT Core device
* Of course, we want to deploy our first app to our Windows IoT Core device. It's easy. In the [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) documentation, you can find instructions to chose a unique name for your Windows IoT Core device. In this sample, we'll use that name (though you can use your IP address as well) in the 'Remote Machine Debugging' settings in VS.

    If you're building for Minnowboard Max, select `x86` in the Visual Studio toolbar architecture dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

    Next, in the Visual Studio toolbar, click on the `Local Machine` dropdown and select `Remote Machine`<br/>

    ![RemoteMachine Target]({{site.baseurl}}/images/HelloWorld/cs-remote-machine-debugging.png)

* At this point, Visual Studio will present the 'Remote Connections' dialog. Put the IP address or name of your Windows IoT Core device (in this example, we're using 'my-device') and select `None` for Windows Authentication. Then click 'Select'.

    ![Remote Machine Debugging]({{site.baseurl}}/images/HelloWorld/cs-remote-connections.PNG)

    Couple of notes:

    1. You can use the IP address instead of the Windows IoT Core device name.

    2. You can verify and/or modify these values navigating to the project properties (select 'Properties' in the Solution Explorer) and choose the 'Debug' tab on the left:

    ![Project Properties Debug Tab]({{site.baseurl}}/images/HelloWorld/cs-debug-project-properties.PNG)

* Now we're ready to deploy to the remote Windows IoT Core device. Simply press F5 (or select Debug \| Start Debugging) to start debugging our app. You should see the app come up in Windows IoT Core device screen, and you should be able to click on the button.

* If you see an error message in Visual Studio when deploying that says "Unable to connect to the Microsoft Visual Studio Remote Debugger named 'XXXX'.  The Visual Studio 2015 Remote Debugger (MSVSMON.EXE) does not appear to be running on the remote computer.", the Remote Debugger may have timed out.  Connect to your device using [PowerShell]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm) and query the active processes by running `tlist`.  If at least one msvsmon.exe is not present in that list, you'll need to run this command to restart the Remote Debugger (or you can reboot your device): `schtasks /run /tn StartMsvsmon`.

* You can set breakpoints, see variable values, etc. To stop the app, press on the 'Stop Debugging' button (or select Debug \| Stop Debugging).

* Having successfully deployed and debugged your first UAP application, create a Release version by simply changing the Visual Studio toolbar configuration dropdown from `Debug` to `Release`.  You can now build and deploy your app to your device by selecting Build \| Rebuild Solution and Build \| Deploy Solution.

* Congratulations! You just deployed your first UAP application to a device running Windows IoT Core!


###Set HelloWorld as the Startup App

* You can also set this HelloWorld app to be the 'Startup App' for your Windows IoT Core device, so that when the device reboot, it will start HelloWorld automatically. To do so, you'll need to run a command line utility called iotstartup on the Windows IoT Core device. We will do this using PowerShell.

        NOTE: We are working on a bug that currently affects C#/VB Debug projects.  Please only use iotstartup to configure Release projects.

* Start a PowerShell (PS) session with your Windows IoT Core device as described [here]({{site.baseurl}}/{{page.lang}}/win10/samples/PowerShell.htm).

* From the PS session, type:

        [192.168.0.243]: PS C:\> iotstartup list HelloWorld

    and you should see the full name of our HelloWorld UAP application, i.e. something like:

        Headed   : HelloWorld_n2pe7ts0w7wey!App

    the utility is confirming that HelloWorld is an 'headed' application, and is installed correctly.

* Now, it's easy to set this app as the 'Startup App'. Just type the command:

        [192.168.0.243]: PS C:\> iotstartup add headed HelloWorld

    The utility will confirm that the new Startup headed app is now HelloWorld:

        AppId changed to HelloWorld_n2pe7ts0w7wey!App

* Go ahead and restart your Windows IoT Core device. From the PS session, you can issue the shutdown command:

        [192.168.0.243]: PS C:\> shutdown /r /t 0

* Once the device has restarted, you'll see HelloWorld start automatically.

* At this point, you can revert back to using the DefaultApp as your 'Startup App'. Just type the command:

        [192.168.0.243]: PS C:\> iotstartup add headed DefaultApp

    The utility will confirm that the new Startup headed app is now DefaultApp:

        AppId changed to DefaultApp_cw5n1h2txyewy!App
