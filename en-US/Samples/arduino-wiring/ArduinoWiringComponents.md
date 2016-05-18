---
layout: default
title: LCD Text Display
permalink: /en-US/Samples/arduino-wiring/ArduinoWiringComponents.htm
lang: en-US
---

# Building Arduino Wiring Libraries in 4 Easy Steps

With Windows 10's support for using Arduino Wiring to build IoT apps, developers can easily take advantage of the Arduino Wiring libraries and the vast set of samples demonstrating how to use various hardware components from an Arduino Sketch. This can be helfpul to all IoT developers but, by itself, this does push people to the Arduino Wiring language and project system over other languages they may prefer.  However, because our Arduino Wiring project templates are actually variants of our C++ /CX projects, it is very easy to build a thin WinRT component that makes use of your Arduino Wiring code and exposes it to any UWP compatible languages (currently C++, C#, VB, Js, and Node.js). 

These two samples show how easy it is to build these components in your Arduino Wiring project and use them from a C# app. This document will walk you through the basics and you can find the complete samples here: 

[Blinky Arduino Library](https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryBlinky)
[LCD Display Arduino Library(https://github.com/ms-iot/samples/tree/develop/ArduinoLibraryLcdDisplay)

## Step 1: Create a new Arduino Wiring project and add the basic functionality

When you create your new Arduino Wiring projects, choose a project name that works for your scenario as this project name will be the namespace all of your WinRT components will reside in. From this blank project you simply add the "ledOn" and "ledOff" methods to your .ino file. 

![LedOnOffMethods]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffMethods.png) 

## Step 2: Creating the C++ Class for your WinRT components

Now that you've added the basic functionality you want to expose from your component, it's time to create the C++ class that will become that component

### Create the component
Right-click on your project and click "Add->Class". This will pop up the new class Wizzard. Click "Next" on the first page and then choose a class name and click "finish". 

![NewC++Class]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/NewC++Class.png) 

![C++ClassWizard]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/C++ClassWizzard.png) 

### Update the components header file
Then you need to open the new header file and make a few changes. 

* At the top of the header file, declare the methods in the ino file that you want to use in your component
* Make the new class a "public ref class" instead of a "ref class"
* Place your class in a namespace that matches the name of the project
* Add public methods that you want to be called by users of your component

![LedOnOffHeader]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffHeader.png) 

### Implement the components methods

Once you've updated your header file it is time to implement those methods. Open up the .cpp file, add implementations for the constructor and the new methods you added and simply call into the methods you implemented in your .ino file. Rembember that you moved your class into a namespace and so have to make sure your methods are defined in the same namespace. 

![LedOnOffClass]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffClass.png) 

## Step 3: Using the Class from C#
At this point your component is complete and it is time to use it from your C# application. Create a new C# project and then add a reference to the Arduino Wiring project you just completed. From there you can use that component like you would any other WinRT class. 

![LedOnOffCS]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffCS.png) 


You will need to make some small changes to the manifest for your C# project. Arduino Wiring projects rely on the Lightning Driver and so just as you would need to update your manifest to use that driver directly from your C# app, you'll need to update your C# project to use a library that relies on this driver. Right-click on the "Package.appxmanifest" in your C# project and click "View Code". From there you just need to add these two capabilities to your project: 

    <iot:Capability Name="lowLevelDevices" />
    <DeviceCapability Name="109b86ad-f53d-4b76-aa5f-821e2ddf2141"/>

![LedOnOffManifest]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffManifest.png) 

At this point your code is complete and ready to run. Right-click on your C# project and select "Set as StartUp Project", configure the project to run on your device as you normally would, and then hit F5. 

## Step 4: (Optional) Fit and Finish
The Arduino Wiring Project is designed to build a standalone application and so includes things not necessary when building a component to be used in another app. If you wish you can delete this. 

* Remove the "loop" method from your .ino file
* Expand "Package Dependencies" in your Arduino project, right click on "StarupTask.cpp", and click "Remove"

![LedOnOffCleanup]({{site.baseurl}}/Resources/images/arduino_wiring/ArduinoWiringComponent/LedOnOffCleanup.png) 