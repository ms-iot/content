---
layout: default
title: SetupPCWRA
permalink: /en-US/win10/SetupPCWRA.htm
lang: en-US
---

#Get Started

Learn how to get your PC ready for developing IoT applications using Windows Remote Arduino.

{% include steps.html device="WRA" %}

##Installation

There are three ways to add the Windows Remote Arduino library to your solution, in order from easiest to most difficult.

1. [Install the NuGet package](#option-1-install-the-nuget-package)
2. [Manually add the Windows Remote Arduino project files to your solution](#option-2-add-the-windows-remote-arduino-projects-to-your-solution)
3. [Manually compile the Windows Remote Arduino solution and reference the WinMD files in your solution.](#option-3-manually-compile-and-add-references-to-your-solution)

Of these options, installing the NuGet package is by far the easiest.

##Option 1: Install the NuGet package

NuGet is a quick and easy way to automatically install the packages and setup dependencies. Unfortunately, we do not yet have support for NuGet in Windows 10.

##Option 2: Add the Windows Remote Arduino projects to your solution

###Step 1: Create a new project

- *File -> New Project*

 ![New Project]({{site.baseurl}}/images/remote-wiring/create_00.png)

- Select your language of choice. Windows Remote Arduino is a WinRT component, meaning it is compatable with C++, C#, or JavaScript.

- You'll see I have chosen C# by expanding the "Visual C#" menu. Select the "Windows" option and choose "Blank App (Windows Universal)" or "Blank App (Windows 8.1 Universal)" if you are building for Windows 8.1.

 ![Windows Universal]({{site.baseurl}}/images/remote-wiring/create_01.png)


###Step 2: Add Windows Remote Arduino projects to your solution

- Clone the [Windows Remote Arduino GitHub repository](https://github.com/ms-iot/remote-wiring/){:target="_blank"}.

- Right-click on your solution in the Solution Explorer and select *Add -> Existing Project*

 ![Add existing project]({{site.baseurl}}/images/remote-wiring/project_00.png)

- Navigate to your local copy of the repository. You'll see here that I've cloned it to **C:\git\remote-wiring**, but you can choose a different directory. Then, open the appropriate solution folder for your build environment (either Windows 10 or Windows 8.1).

 ![Open the solution directory]({{site.baseurl}}/images/remote-wiring/compile_00.png)

- Let's start with the Serial project (Microsoft.Maker.Serial). Open this directory.

 ![Serial directory]({{site.baseurl}}/images/remote-wiring/project_01.png)

- Select the *.vcxproj* file. (If you are targeting Windows 8.1, you will first have to choose between Windows and Windows Phone platform directories. You do not have to do this for Windows 10, as it is Universal to all platforms.)

 ![Select vcxproj]({{site.baseurl}}/images/remote-wiring/project_02.png)

- Right-click on any project and select *Build Dependencies -> Project Dependencies*

 ![Project Dependencies]({{site.baseurl}}/images/remote-wiring/project_03.png)

- Project dependencies for Windows Remote Arduino should already be configured. However, it will not hurt to verify that the correct dependencies are selected for each project. Select each project in the drop down and verify it has the correct dependencies.

 * Serial has no dependencies.
 * Firmata depends on Serial.
 * RemoteWiring depends on Serial and Firmata.

 Last, select your project in the drop down, and select each of the Microsoft.Maker projects as dependencies to your project.

 ![Dependencies]({{site.baseurl}}/images/remote-wiring/project_04.png)

- Right-click on "References" in your project. Select *Add Reference*

 ![Add Reference]({{site.baseurl}}/images/remote-wiring/project_05.png)

- Under the "Windows Universal" tab, choose the "Extensions" sub-menu and select the *Microsoft Visual C++ AppLocal Runtime Package* version 14.0.

 ![AppLocal package]({{site.baseurl}}/images/remote-wiring/applocal.png)

- Under the "Projects" tab, select all three of the Microsoft.Maker projects

 ![Project References]({{site.baseurl}}/images/remote-wiring/project_06.png)

- Rebuild your solution by selecting *Build -> Rebuild All*

 ![Rebuild All]({{site.baseurl}}/images/remote-wiring/compile_03.png)

- Verify you have added the necessary [Device Capabilities](#device-capabilities) to your project manifest.

###Step 3: Have fun!

You can now use the three projects directly in your source code. You will notice I have constructed a BluetoothSerial object and attached it to my RemoteDevice object, so I have included the two appropriate namespaces at the top of my .cs file.

 ![Have Fun!]({{site.baseurl}}/images/remote-wiring/utilize_00.png)


##Option 3: Manually Compile and Add References to Your Solution

Manually compiling a WinRT component library produces .winmd and .dll files which you can reference in your project.

###Step 1: Compiling the Windows Remote Arduino solution

- Clone the [Windows Remote Arduino GitHub repository](https://github.com/ms-iot/remote-wiring/).
- Open your local copy of the repository. You'll see here that I've cloned it to **C:\git\remote-wiring**, but you can choose a different directory. Then, open the appropriate solution folder for your build environment (either Windows 10 or Windows 8.1).

 ![Open the solution directory]({{site.baseurl}}/images/remote-wiring/compile_00.png)

- Open the solution file (.sln). If you do not have "File name extensions" enabled on the "View" tab, you can look for the type "Microsoft Visual Studio Solution". (If you are targeting Windows 8.1, you will first have to choose between Windows and Windows Phone platform directories. You do not have to do this for Windows 10, as it is Universal to all platforms)

 ![Open the solution file]({{site.baseurl}}/images/remote-wiring/compile_01.png)

- Select the correct build target. If you are planning to deploy your application to Raspberry Pi2 or Windows Phone, you'll want to select ARM. Otherwise if you are targeting a PC platform select either x86 or x64. If you are targeting MinnowBoardMax, select x86.

 ![Select build target]({{site.baseurl}}/images/remote-wiring/compile_02.png)

- *Build -> Rebuild Solution*

 ![Rebuild solution]({{site.baseurl}}/images/remote-wiring/compile_03.png)

- The solution should build in about a minute.

 ![Successful build]({{site.baseurl}}/images/remote-wiring/compile_04.png)

###Step 2: Create a new project

- *File -> New Project*

 ![New Project]({{site.baseurl}}/images/remote-wiring/create_00.png)

- Select your language of choice. Windows Remote Arduino is a WinRT component, meaning it is compatable with C++, C#, or JavaScript.

- You'll see I have chosen C# by expanding the "Visual C#" menu. Select the "Windows" option and choose "Blank App (Windows Universal)" or "Blank App (Windows 8.1 Universal)" if you are building for Windows 8.1.

 ![Windows Universal]({{site.baseurl}}/images/remote-wiring/create_01.png)

###Step 3: Reference the WinMD files

- Locate the "References" item in the Solution Explorer in your new project. Right-click and select "Add Reference..."

 ![Add Reference]({{site.baseurl}}/images/remote-wiring/ref_00.png)

- Under the "Windows Universal" tab, choose the "Extensions" sub-menu and select the *Microsoft Visual C++ AppLocal Runtime Package* version 14.0.

 ![AppLocal package]({{site.baseurl}}/images/remote-wiring/applocal.png)

- Select the "Browse" tab on the left, and then click the "Browse..." button at the bottom.

 ![Browse]({{site.baseurl}}/images/remote-wiring/ref_01.png)

- Locate the directory where you have stored the Windows Remote Arduino repository and open the appropriate project folder.
  * If you compiled the library as "ARM" you will use the "ARM" folder as I have below, and then "Debug" inside "ARM".
  * Similarly, x64 can be found in the "x64\Debug" folder.
  * x86 will be in simply "Debug" as you can see in the screenshot below.

 ![Open debug folder]({{site.baseurl}}/images/remote-wiring/ref_02.png)

- Notice that I am inside the "ARM\Debug" directory, as I am compiling for ARM platforms like Windows Phone 10. We will start by opening the "Microsoft.Maker.Serial" folder.

 ![Open the Serial folder]({{site.baseurl}}/images/remote-wiring/ref_03.png)

- Select the WinMD file and press "Add".

 ![Add the WinMD]({{site.baseurl}}/images/remote-wiring/ref_04.png)

- Repeat steps 3 - 5 for all three WinMD files located in their respective folders. *You may find additional WinMD files in other project folders, as they reference other projects. Only reference the correct WinMD for each directory.*

 ![Repeat previous steps for all three references]({{site.baseurl}}/images/remote-wiring/ref_05.png)

- **The next few steps will be automated in the future, but are a necessary for the time being.**

 For now, we must manually 'connect' the WinMD file with it's respective .dll file. Right-click on the project file (not the solution) and select "Unload Project".

 ![Unload Project]({{site.baseurl}}/images/remote-wiring/ref_06.png)

- Select the edit .csproj option for your project name.

 ![Edit csproj]({{site.baseurl}}/images/remote-wiring/ref_07.png)

- Near the bottom of this XML file, locate the Reference section and specifically the three `<Reference>` tags for the items we just added in steps 3 - 6.

 ![Locate Reference tags]({{site.baseurl}}/images/remote-wiring/ref_08.png)

- You must add two tags to each of these `<Reference>` tags below the `<HintPath>` tag.<br/>
{% highlight XML %}
 `<IsWinMDFile>true</IsWinMDFile>
 `<Implementation>%PROJECT%.dll</Implementation>
{% endhighlight %}
 Where *%PROJECT%* is the name of the project appropriate for that `<Reference>` tag. I have added all three here (although only one is highlighted). So you can add the text to match exactly what I have in the screenshot below. It does not matter where you have installed your projects, the `<HintPath>` tag takes care of that for us.

 ![Additional Tags]({{site.baseurl}}/images/remote-wiring/ref_09.png)

- Right-click on the project again and select "Reload Project". If you are prompted to save, select yes.

 ![Reload Project]({{site.baseurl}}/images/remote-wiring/ref_10.png)

- Verify you have added the necessary [Device Capabilities](#device-capabilities) to your project manifest.


###Step 4: Have fun!

You can now use the three projects directly in your source code. You will notice I have constructed a BluetoothSerial object and attached it to my RemoteDevice object, so I have included the two appropriate namespaces at the top of my .cs file.

 ![Have Fun!]({{site.baseurl}}/images/remote-wiring/utilize_00.png)


#Device Capabilities

Each Windows project will contain a manifest file that must be configured to allow certain permissions, such as Bluetooth and USB connectivity. Fortunately, it is fairly easy to configure these.

You will need to open the package.appxmanifest file of your project by right-clicking and selecting the "View Code" option. Then find the <Capabilities> tag and paste one or both of the following tag blocks as a child node.

####Note:
For **Windows 8.1**, you will need to add the following namespace to the top of the XML file, inside the `<Package>` tag.

{% highlight XML %}
xmlns:m2="http://schemas.microsoft.com/appx/2013/manifest"
{% endhighlight %}

##Enabling Bluetooth Capabilities
You will need to add one of the following XML blocks to your manifest file, inside the <Capabilities> tag, in order to invoke the Bluetooth/USB capabilities of a WinRT application, depending on which OS version you are targeting.

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


##Enabling USB Capabilities
You will need to add one of the following XML blocks to your manifest file in order to invoke the USB capabilities of a WinRT application, depending on which OS version you are targetting.

###Windows 10

{% highlight XML %}
<DeviceCapability Name="serialcommunication">
  <Device Id="any">
    <Function Type="name:serialPort"/>
  </Device>
</DeviceCapability>
{% endhighlight %}

###Windows 8.1

{% highlight XML %}
<m2:DeviceCapability Name="serialcommunication">
  <m2:Device Id="any">
    <m2:Function Type="name:serialPort"/>
  </m2:Device>
</m2:DeviceCapability>
{% endhighlight %}
