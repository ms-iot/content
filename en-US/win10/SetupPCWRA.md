---
layout: default
title: SetupPCWRA
permalink: /en-US/win10/SetupPCWRA.htm
lang: en-US
deviceName: WRA
---

#Get Started

Learn how to get your Windows 10 device ready for developing IoT applications using Windows Remote Arduino Experience.

{% include steps.html device=page.deviceName %}

#Installation

This section of the tutorial explains how to setup your Windows 10 device - be it a PC, Surface, or Windows Phone - to remotely control an Arduino using the Windows Remote Arduino Experience app.  This application will allow you to operate all of the most basic abilities of your Arduino device without ever writing a single line of code! You can use digital read & write, analog read (ADC), and PWM by using the buttons provided on the user interface.  

Setup is as simple as installing the application on your chosen device.  There are three ways to get the Windows Remote Arduino Experience application running, in order from easiest to most difficult.

1. [Download the Windows Remote Arduino Experience app from the Microsoft Store](#option-1-download-the-windows-remote-arduino-experience-app-from-the-microsoft-store)
2. [Install the NuGet package](#option-2-install-the-nuget-package)
3. [Manually add the Windows Remote Arduino project files to a new Visual Studio solution](#option-3-add-the-windows-remote-arduino-projects-to-a-visual-studio-solution)

Of these options, downloading the application directly from the Microsoft Store is by far the easiest.

##Option 1: Download the Windows Remote Arduino Experience app from the Microsoft Store

Follow [this link](https://www.microsoft.com/store/apps/9nblggh2041m){:target="_blank"} to the Microsoft Store page for the app, download the file, and then install.  You can then open the application to ensure it runs properly.

You have now finished setting up your Windows device and can progress to the next section.

##Option 2: Install the NuGet package

NuGet is a quick and easy way to automatically install the packages and setup dependencies.

1. [Install Visual Studio](#step-1-install-visual-studio)
2. [Create a New Project](#step-2-create-a-new-project)
3. In Visual Studio, navigate to the following menu item: Tools > NuGet Package Manager > Package Manager Console
4. Enter the following command into the console window: `Install-Package Windows-Remote-Arduino`

As an alternative to step 4 above, you can also select **Manage NuGet packages for Solution** under the **NuGet Package Manager** context menu and manually search for and install **Windows Remote Arduino**.  Visit [https://www.nuget.org/packages/Windows-Remote-Arduino](https://www.nuget.org/packages/Windows-Remote-Arduino) for more information on this package.

Once you're done with this section, skip to the Device Capabilities section to finish setting up the application.

##Option 3: Add the Windows Remote Arduino projects to a Visual Studio solution

###Step 1: Install Visual Studio

- We recommend [Visual Studio Community Edition](http://go.microsoft.com/fwlink/?LinkID=534599){:target="_blank"}, but Visual Studio Professional 2015 and Visual Studio Enterprise 2015 will work as well (available [here](https://www.visualstudio.com/vs-2015-product-editions){:target="_blank"}). If you already have Visual Studio installed, you can proceed directly to the next step.

###Step 2: Create a new project

- Open Visual Studio.  Select *File -> New Project*.

 ![New Project]({{site.baseurl}}/images/remote-wiring/create_00.png)

- You can now select your language of choice. Windows Remote Arduino is a WinRT component, meaning it is compatible with C++, C#, or JavaScript - for this sample you'll want C#.

- You'll see I have chosen C# by expanding the "Visual C#" menu. Select the "Windows" option and choose "Blank App (Windows Universal)" or "Blank App (Windows 8.1 Universal)" if you are building for Windows 8.1.

 ![Windows Universal]({{site.baseurl}}/images/remote-wiring/create_01.png)


###Step 3: Add Windows Remote Arduino projects to your solution

- Clone the [Windows Remote Arduino GitHub repository](https://github.com/ms-iot/remote-wiring/){:target="_blank"}.  If you're not familiar with git and want to do a proper clone, follow the instructions [here](https://help.github.com/articles/cloning-a-repository/){:target="_blank"}.

- Right-click on your solution in the Solution Explorer and select *Add -> Existing Project*.

 ![Add existing project]({{site.baseurl}}/images/remote-wiring/project_00.png)

- Navigate to your local copy of the repository. You'll see here that I've cloned it to **C:\git\remote-wiring**, but you can choose a different directory. Then, open the appropriate solution folder for your build environment (either Windows 10 or Windows 8.1).

 ![Open the solution directory]({{site.baseurl}}/images/remote-wiring/compile_00.png)

- We need to add three projects - Microsoft.Maker.Firmata, Microsoft.Maker.RemoteWiring, and Microsoft.Maker.Serial - to the project solution.  Let's start with the Serial project (Microsoft.Maker.Serial). Open this directory.

 ![Serial directory]({{site.baseurl}}/images/remote-wiring/project_01.png)

- Select the *.vcxproj* file. (If you are targeting Windows 8.1, you will first have to choose between Windows and Windows Phone platform directories. You do not have to do this for Windows 10, as it is Universal to all platforms.)

 ![Select vcxproj]({{site.baseurl}}/images/remote-wiring/project_02.png)

- Repeat the previous steps for all three Microsoft.Maker projects.  Once they've all been added to your solution, right-click on "References" in the original project you made, not one of the newly added Microsoft.Maker projects. Select *Add Reference*.

 ![Add Reference]({{site.baseurl}}/images/remote-wiring/project_05.png)

- Under the "Projects" tab, select all three of the Microsoft.Maker projects.

 ![Project References]({{site.baseurl}}/images/remote-wiring/project_06.png)

- Rebuild your solution by selecting *Build -> Rebuild Solution*.

 ![Rebuild All]({{site.baseurl}}/images/remote-wiring/compile_03.png)

- Verify you have added the necessary [Device Capabilities](#device-capabilities) to your project manifest.  Once you've completed the section below, your device will be ready to go!

#Device Capabilities

Each Windows project will contain a manifest file that must be configured to allow certain permissions, such as Bluetooth and USB connectivity. Fortunately, it is fairly easy to configure these.

You will need to open the package.appxmanifest file of your project by right-clicking the file and selecting the "View Code" option. Then, find the <Capabilities> tag and insert the relevant code snippets from the "Enabling Bluetooth Capabilities", "Enabling Network Capabilities", and "Enabling USB Capabilities" subsections below.

####NOTE:
For **Windows 8.1**, you will need to add the following namespace to the top of the XML file, inside the `<Package>` tag.

{% highlight XML %}
xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
{% endhighlight %}

##Enabling Bluetooth Capabilities
In order to invoke the Bluetooth capabilities of a WinRT application, you must add the relevant DeviceCapability tags below *inside* the `<Capabilities>` tag of the `Package.appxmanifest` file.

###Windows 10

{% highlight XML %}
<DeviceCapability Name="bluetooth.rfcomm">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

{% highlight XML %}
<m2:DeviceCapability Name="bluetooth.rfcomm">
  <m2:Device Id="any">
    <m2:Function Type="name:serialPort"/>
  </m2:Device>
</m2:DeviceCapability>
{% endhighlight %}


##Enabling Network Capabilities
In order to invoke the network socket capabilities of a WinRT application, you will need to add the following code inside the `<Capabilities>` tag of the `Package.appxmanifest` file.

###Windows 10 and Windows 8.1

{% highlight XML %}
<Capability Name="privateNetworkClientServer"/>
<Capability Name="internetClientServer"/>
{% endhighlight %}


##Enabling USB Capabilities
In order to invoke the USB capabilities of a WinRT application, you must add the relevant DeviceCapability tags below *inside* the `<Capabilities>` tag of the `Package.appxmanifest` file.

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If 
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child 
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the 
    context menu.

###Windows 10

{% highlight XML %}
<DeviceCapability Name="serialcommunication">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

Unfortunately, this library does not support USB on Windows 8.1.

{% include nextsteps.html device=page.deviceName %}
