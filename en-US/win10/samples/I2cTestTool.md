---
layout: default
title: I2cTestTool
permalink: /en-US/win10/samples/I2cTestTool.htm
lang: en-US
---

## I2cTestTool Sample

{% include VerifiedVersion.md %}

[View the code on Github](https://github.com/ms-iot/samples/blob/develop/I2cTestTool/main.cpp)

I2cTestTool is a utility for interacting with I2C devices on the command
line. I2cTestTool is written in C++/CX and shows how to consume WinRT components
from command line applications. The resulting tool is a useful debugging aid.

### Usage

    I2cTestTool: Command line I2C testing utility
    Usage: I2cTestTool.exe [-list] SlaveAddress [FriendlyName]

      -list          List available I2C controllers and exit.
      SlaveAddress   The slave address of the device with which you
                     wish to communicate. This is a required parameter.
      FriendlyName   The friendly name of the I2C controller over
                     which you wish to communicate. This parameter is
                     optional and defaults to the first enumerated
                     I2C controller.

    Examples:
      List available I2C controllers and exit:
        I2cTestTool.exe -list

      Open connection on the first enumerated controller to slave address 0x57:
        I2cTestTool.exe 0x57

      Open connection on I2C1 to slave address 0x57:
        I2cTestTool.exe 0x57 I2C1
         
    Commands:
     > write { 00 11 22 .. FF }         Write bytes to the device
     > read N                           Read N bytes
     > writeread { 00 11 .. FF } N      Write bytes, restart, read N bytes
     > info                             Display device information
     > help                             Display this help message
     > quit                             Quit            
                      
Example session with an EEPROM attached:

      i2ctesttool.exe 0x57
        Type 'help' for a list of commands
      > info
             DeviceId: \\?\ACPI#MSFT8000#1#{a11ee3c6-8421-4202-a3e7-b91ff90188e4}\I2C5
        Slave address: 0x57
            Bus Speed: StandardMode (100Khz)
      > write {0 1 2 3 4 5 6 7 8}
      > writeread {4} 4
       5 6 7 8
      > write {0}
      > read 8
       1 2 3 4 5 6 7 8
      > q

### Building and running the sample

1. Clone the [samples](https://github.com/ms-iot/samples)
   repository to your local machine. 
1. Open `I2cTestTool\I2cTestTool.sln` in Visual Studio
1. Select the target architecture.
   - Select `ARM` for Raspberry Pi
   - Select `x86` for MinnowBoardMax
1. Go to `Build -> Build Solution`
1. Copy `I2cTestTool.exe` from the build output folder to your device.
1. SSH into your device and run `I2cTestTool.exe` (with required command
   line parameters, of course)

### Creating a blank C++/CX console application 

Let's walk through the process of creating a console application that
consumes WinRT components with C++/CX.

1. Go to `File -> New Project` and select the 
   `Visual C++ -> Windows -> Windows IoT Core -> Blank Windows IoT Core Console Application`
   template.
   
   ![Project Template]({{site.baseurl}}/Resources/images/I2cTestTool/NewBlankConsoleApp.png)
   
1. Delete pch.h, pch.cpp, and ConsoleApplication.cpp. Precompiled headers are
   generally a good idea, but we're not going to use them in this example
   for simplicity.
1. Add a new file named `main.cpp` with the following contents

   {% highlight C++ %}
   main.cpp:
   
   #include <stdio.h>
    
   using namespace Platform;
   using namespace Windows::Devices::I2c;
    
   int main (Array<String^>^ args)
   {
       String^ aqs = I2cDevice::GetDeviceSelector();
       wprintf(L"AQS is %s\n", aqs->Data());
       return 0;
   }
   {% endhighlight %}
    
1. Right click on your project in the solution explorer and go to `Properties`.
   In the Configurations dropdown, select `All Configurations` and in the Platform
   dropdown, select `All Platforms`.
1. Go to `C/C++ -> General` and set `Consume Windows Runtime Extensions` to `Yes`, and
   `Additional #using Directories` to `$(VCInstallDir)vcpackages;$(WindowsSdkDir)UnionMetadata;%(AdditionalUsingDirectories)`

   ![Consume Windows Runtime Extensions]({{site.baseurl}}/Resources/images/I2cTestTool/ConsumeWinRT.png)
    
1. Go to `C/C++ -> Code Generation` and set `Enable Minimal Rebuild` to `No`.

   ![Disable Minimal Rebuild]({{site.baseurl}}/Resources/images/I2cTestTool/EnableMinimalRebuild.png)

1. Go to `C/C++ -> Precompiled Headers` and set `Precompiled Header` to `Not Using Precompiled Headers`

   ![Precompiled Headers]({{site.baseurl}}/Resources/images/I2cTestTool/PrecompiledHeaders.png)

1. Click OK to exit the project properties dialog.
1. Build your solution (Ctrl + Shift + B).

This boilerplate code will run on both your Windows Desktop machine and your
Windows IoT Core device, although the full sample will run only on Windows IoT
Core since I2C is supported only on Windows IoT Core.

Congratulations, you have successfully created a command line program capable
of consuming WinRT components!

