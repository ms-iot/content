---
layout: default
title: GpioTestTool
permalink: /en-US/win10/samples/GpioTestTool.htm
lang: en-US
---

## GpioTestTool Sample

{% include VerifiedVersion.md %}

[View the code on Github](https://github.com/ms-iot/samples/blob/develop/GpioTestTool/main.cpp)

GpioTestTool is a simple utility that allows you to write and 
read GPIO pins on the command line. GpioTestTool is written in standard
C++ and consumes the Windows.Devices.Gpio WinRT APIs at the ABI level 
with the help of the 
[Windows Runtime Library (WRL)](https://msdn.microsoft.com/en-us/library/hh438466.aspx).
These techniques can be used to consume most WinRT APIs from native
applications.

### Usage

    gpiotesttool.exe PinNumber
    
      PinNumber     The pin number with which you wish to interact. This
                    parameter is required.

    Commands:
     > write 0|1                        Write pin low (0) or high (1)
     > toggle                           Toggle the pin from its current state
     > read                             Read pin
     > setdrivemode drive_mode          Set the pins's drive mode
         where drive_mode = input|output|
                            inputPullUp|inputPullDown|
                            outputOpenDrain|outputOpenDrainPullDown|
                            outputOpenSource|outputOpenSourcePullUp
     > info                             Dump information about the pin
     > help                             Display this help message
     > quit                             Quit

Example Session:

    gpiotesttool.exe 47
      Type 'help' for a list of commands
    > info
            Pin Number: 47
          Sharing Mode: Exclusive
      Debounce Timeout: 0
            Drive Mode: input
    > read
    High
    > setdrivemode output
    > write 0
    > write 1
    > t
    > t
    > q

### Building and running the sample

1. Clone the [samples](https://github.com/ms-iot/samples)
   repository to your local machine. 
1. Open `GpioTestTool\GpioTestTool.sln` in Visual Studio.
1. Select the target architecture.
   - Select `ARM` for Raspberry Pi or DragonBoard 410c
   - Select `x86` for MinnowBoardMax
1. Go to `Build -> Build Solution`
1. Copy GpioTestTool.exe from the build output folder to your device.
1. SSH into your device and run `GpioTestTool.exe` (with the appropriate
   command line parameters, of course).

### The code

The function MakePin() takes a pin number and returns an IGpioPin instance.
It handles the WinRT boilerplate necessary to create an IGpioPin instance. 

    ComPtr<IGpioPin> MakePin (int PinNumber)
    {
        ComPtr<IGpioPin> pin;

The first step is to activate an instance of IGpioControllerStatics, which
is the interface that implements the static functions of the GpioController
runtime class. We can get the statics of a runtime class with a Windows function called 
[GetActivationFactory()](https://msdn.microsoft.com/en-us/library/br244854.aspx):

         // get the activation factory
        ComPtr<IGpioControllerStatics> controllerStatics;
        HRESULT hr = GetActivationFactory(
            HStringReference(RuntimeClass_Windows_Devices_Gpio_GpioController).Get(),
            &controllerStatics);
        if (FAILED(hr)) {
            std::wostringstream msg;
            msg << L"Failed to get activation factory for GpioController. hr = 0x" <<
                std::hex << hr;
            throw wexception(msg.str());
        }
        
This will fail if the type Windows.Devices.Gpio.GpioController is not
registered on the system.

Now that we have an interface to the static methods of GpioController, we
can call GetDefault() to get the default GpioController on the system:

        ComPtr<IGpioController> controller;
        hr = controllerStatics->GetDefault(controller.GetAddressOf());
        if (FAILED(hr)) {
            throw wexception(L"Failed to get instance of default GPIO controller");
        }

We always check the return value of GetDefault() for null because 
there may not be a GPIO controller on the current system.

        if (!controller) {
            throw wexception(L"GPIO is not available on this system");
        }

Now that we have a GpioController instance, we can call OpenPin() to 
get a pin instance:

        hr = controller->OpenPin(PinNumber, pin.GetAddressOf());
        if (FAILED(hr)) {
            std::wostringstream msg;
            msg << L"Failed to open pin. hr = 0x" << std::hex << hr;
            throw wexception(msg.str());
        }
    
        return pin;
    }
    
Once we have a pin instance, we can read and write the pin:

    void Blink ()
    {
        HRESULT hr;
        
        auto pin = MakePin(47);
        
        // Latch a LOW value onto the pin
        hr = pin->Write(GpioPinValue_Low);
        if (FAILED(hr)) {
            throw wexception(L"Failed to write pin");
        }
        
        // set the pin as an output
        hr = pin->SetDriveMode(GpioPinDriveMode_Output);
        if (FAILED(hr)) {
            throw wexception(L"Failed to set drive mode");
        }
        
        // blink the pin
        for (unsigned int i = 0; i < 20; ++i) {
            hr = pin->Write((i & 1) ? GpioPinValue_High : GpioPinValue_Low);
            if (FAILED(hr)) {
                throw wexception("Failed to write pin");
            }
            Sleep(100);
        }
    }
    
That's it! Using WinRT from straight C++ isn't so bad after all.
