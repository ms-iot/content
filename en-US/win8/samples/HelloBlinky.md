---
layout: default
title: Hello Blinky
permalink: /en-US/win8/samples/HelloBlinky.htm
lang: en-US
---

{% include steps.html device="Galileo" %}

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>Support for Windows on Intel Galileo Gen 1 and Gen 2 will end on November 30, 2015</u></h4>
	<p><h5>As we continue to focus on providing a great experience for Makers with Windows 10 IoT Core, we've made the difficult decision to discontinue Windows support on the Galileo platform. We've seen some fantastic innovation with the platform, but unfortunately, it does not meet the minimum hardware requirements for Windows 10 IoT Core. Please click <a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">here</a> to learn more.</h5></p>
</div>

#Hello Blinky
Learn to Create or Update, Deploy and Debug a Windows Developer Program for IoT project.

##Create a new Project
Open Visual Studio. Select File -> New Project and Select Templates -> Visual C++ -> Windows for IoT -> Galileo Wiring app
![AppCreate]({{site.baseurl}}/Resources/images/Nuget_AppCreate.png)

##Code
{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
  return RunArduinoSketch();
}

int led = 13;  // This is the pin the LED is attached to.

void setup()
{
  pinMode(led, OUTPUT); // Configure the pin for OUTPUT so you can turn on the LED.
}

// the loop routine runs over and over again forever:
void loop()
{
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  Log(L"LED OFF\n");
  delay(1000);               // wait for a second
  digitalWrite(led, HIGH);    // turn the LED on by making the voltage HIGH
  Log(L"LED ON\n");
  delay(1000);               // wait for a second
}
{% endhighlight %}

This code is included in the default template, and is included here for reference.

##Wire your Galileo with an LED
LEDs are diodes which will emit light when powered. They are polarized - meaning they work only when plugged in correctly.
![LED Wiring]({{site.baseurl}}/Resources/images/HelloBlinky.png)

##Build and deploy
Press F5 to build and deploy your project.

You may be prompted for credentials. Enter:

~~~
  Username: mygalileo\Administrator
  Password: admin
~~~

![]({{site.baseurl}}/Resources/images/VSDeployCred.png)

## Failed to deploy?
Under certain network conditions, deploy by name might fail. In this case, it would be best to deploy by IP.

Copy the IP address from Galileo Watcher, by right clicking on the Galileo instance and select Copy IP Address:

![Copy IP Address]({{site.baseurl}}/Resources/images/Deploy_CopyIP.png)

Open the project properties by right clicking on the project in Solution Explorer.

Paste the copied IP address into the 'Remote Server Name' field on the debugging tab in Visual Studio:

![Paste IP Address]({{site.baseurl}}/Resources/images/Deploy_PasteIP.png)

##Result
You should see the light blinking. If it isn't blinking, try reversing the LED leads.

##Convert to Lightning
If you have a project which was created before December 1st, 2014, you will need to convert it to Lightning.

1. From within your existing solution, right click on the project and select ```Manage Nuget Packages```
1. Select ```Installed Packages``` in the left column

   ![Installed]({{site.baseurl}}/Resources/images/HelloBlinky_UninstallGalileoSDK.PNG)

1. Select ```Uninstall``` to remove ```Galileo C++ SDK```
1. Expand ```Online``` then select ```Nuget.org```
1. In the ```Search``` box in the upper right hand corner of the dialog, search for ```Microsoft IoT C++```
1. Select ```Install```

   ![Installed]({{site.baseurl}}/Resources/images/HelloBlinky_InstallNative.PNG)

1. Rebuild your project

## Update your project
The Microsoft IoT team and the community are adding features and fixing bugs in the SDK. In order to take advantage of these changes, you'll need to manually update your project.

1. From within your existing solution, right click on the project and select ```Manage Nuget Packages```
1. Select ```Updates``` from the left column

   ![Updates]({{site.baseurl}}/Resources/images/NugetUpdates.png)

1. If you'd like to use a prerelease version, select ```Include Prereleases``` from the dropdown

   ![Prerelease]({{site.baseurl}}/Resources/images/Prerelease.png)

1. Click the ```Update``` button to update your project.
