---
layout: sample
title: IoT Home App
description: Shell Home App sample for the Oems
keyword: Intermediate, xaml, iot core, windows
permalink: /en-US/Samples/IoTHomeApp.htm
samplelink: https://github.com/ms-iot/samples/tree/develop/IoTHomeAppSample/IoTHomeApp
lang: en-US
---

# "IoT Home App sample"

We'll create a UWP app to demonstrate how OEMs can create a simple home app that can navigate back and forth between their other apps and the home app.

## Load the project in Visual Studio

You can find the source code for this sample by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\IoTHomeAppSample\IoTHomeApp`. The sample code is in C++. Make a copy of the folder on your disk and open the project from Visual Studio.

## IoT Home App contents

The IoT Home App contains three projects:

- OemApp1 - Sample app representing oem app 1
- OemApp2 - Sample app representing oem app 2
- ShellHomeApp - Sample IoT Core Home App

Right-click on **ShellHomeApp** project and select **'Set as StartUp Project'** from the pop up menu displayed.

{% include samples/AppDeploymentCPP.md %}

When everything is set up, you should be able to press F5 from Visual Studio.  The IoT Shell Home App will deploy and start on the Windows IoT device. You should see the following home page:

<img src="{{site.baseurl}}/Resources/images/IoTHomeApp/ShellHomeApp.png" width="600">

Click on 'Oem App 1' and you will see the OemApp1 is launched.

<img src="{{site.baseurl}}/Resources/images/IoTHomeApp/oem1.png" width="600">

Click on 'Home' button and you will be navigated back to the Shell Home App. Now click 'Oem App 2' and you will be navigated to 'OemApp2'.

<img src="{{site.baseurl}}/Resources/images/IoTHomeApp/oem2.png" width="600">

Again, you can return to the home app by clicking 'Home'. Thus, you can navigate back and forth between the Shell Home App and other apps.

## Let's look at the code

### Adding the Protocol URI Scheme

In order for the app to be launched or activated from another app, it has to declare a protocol uri scheme name in the Package.appxmanifest file under the Declarations tab as shown:

<img src="{{site.baseurl}}/Resources/images/IoTHomeApp/add_protocol.png">

In the sample, the OemApp1 has declared the protocol 'oemapp1', OemApp2 has declared the protocol 'oemapp2' and the Shell Home App has declared the protocol 'oemhomeapp'.

### Launching the App
The following code shows how to activate the app using the protocol uri scheme name defined earlier:
```c++
Launcher::LaunchUriAsync(ref new Uri("oemapp1:"));
```

If there are multiple applications supporting the same protocol, one can resolve the ambiguity by passing the package family name as shown below:

```c++
auto options = ref new LauncherOptions();
options->TargetApplicationPackageFamilyName = ref new String(L"OemApp1_1w720vyc4ccym");
Launcher::LaunchUriAsync(ref new Uri("oemapp1:"), options);
```

More information on activating an app using protocol uri scheme can be found [here](https://docs.microsoft.com/en-us/windows/uwp/launch-resume/launch-app-with-uri){:target="_blank"}.