---
layout: default
title: AllJoyn DSB Sample
permalink: /en-US/win10/samples/AlljoynDSBSample.htm
lang: en-US
---

## Alljoyn DSB GPIO Tutorial

{% include VerifiedVersion.md %}

You can find the source code for AllJoyn samples by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn`. This tutorial shows how a GPIO Device can be exposed to the AllJoyn Bus using the AllJoyn Device System Bridge.

### Prerequisites

1. Install [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.

### Step 1: Hardware Setup
The sample uses a Raspberry Pi 2 that one of its GPIO pins is connected to a photo resistor as shown in the schematic below. If another device issues the pin number in the code has to be changed to match the HW setup.

![Rpi_schematic]({{site.baseurl}}/Resources/images/AllJoyn/rpi_schematic.png)

### Step 2: Download and Install the AllJoyn Device System Bridge Template

The AllJoyn Device System Bridge Template is a Visual Studio extension that enables developers to create an AllJoyn Device System Bridge App project.

1. Download the Alljoyn DSB VSIX template from Visual Studio Online [here](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8){:target="_blank"}.
2. After the download, double-click on the DeviceSystemBridgeTemplate.vsix file to install the extension. 

### Step 3: Create an AllJoyn Device System Bridge App Project

In the Visual Studio, choose File > New > Project which opens the New Project dialog box. In the opening dialog box, create a new AllJoyn Device System Bridge App project as given in the following:

![NewDSB_project]({{site.baseurl}}/Resources/images/AllJoyn/VS_newproj1.png)

![NewDSB_project2]({{site.baseurl}}/Resources/images/AllJoyn/VS_newproj2.png)

You will need to add a reference to the AdapterLib project to use the Windows IoT Extension SDK, which is required to use the Windows::Devices::Gpio API. Follow the below steps to add a reference to the project:

  1. In the VS Solution explorer, locate the Adapter Lib project. Expand this project
  2. Right click "References" and select "Add Reference..."

  ![add_reference1]({{site.baseurl}}/Resources/images/AllJoyn/add_reference1.png)

  3. On the left-hand side of the Add Reference window, select "Extensions" under Windows Universal.
  4. Locate the latest version of the Windows IoT Extension SDK in the list and check the box its left to select this SDK.
  5. Click "OK".

  ![add_reference2]({{site.baseurl}}/Resources/images/AllJoyn/add_reference2.png)

### Step 4: Expose a GPIO Pin to the AllJoyn Bus

Open the Adapter.cpp file in the AdapterLib project. Modify Adapter.cpp by inserting the following block of text after the last "using" statement and before "namespace AdapterLib
{"

    using namespace Windows::Devices::Gpio;

    // GPIO Device
    String^ deviceName = "Custom_GPIO_Device";
    String^ vendorName = "Custom_Vendor";
    String^ modelName = "Custom_Model";
    String^ version = "1.0.0.0";
    String^ serialNumber = "1111111111111";
    String^ description = "A Custom GPIO Device";
    
    // GPIO Device Pin-5 Property
    const int PIN_NUMBER = 5;
    String^ pinName = "Pin-5";
    
    // Pin-5 Property Attribute
    String^ pinValueName = "PinValue";
    int  pinValue = -1;
    
    GpioController^ controller;
    GpioPin^ pin;

In order to expose the GPIO Device to the AllJoyn Bus, we need to create a corresponding Bridge Device (IAdapterDevice) instance. Add the following three lines to the Adapter() constructor in the AdapterLib project's Adapter.cpp file:

    Adapter::Adapter()
    {
        .
        .
        .
        controller = GpioController::GetDefault();
        pin = controller->OpenPin(PIN_NUMBER);
        pin->SetDriveMode(GpioPinDriveMode::Input);
    }
    
Now, modify the Initialize function as given in the following:

    uint32
    Adapter::Initialize()
    {
        // GPIO Device Descriptor: Static data for our device
        DEVICE_DESCRIPTOR gpioDeviceDesc;
        gpioDeviceDesc.Name = deviceName;
        gpioDeviceDesc.VendorName = vendorName;
        gpioDeviceDesc.Model = modelName;
        gpioDeviceDesc.Version = version;
        gpioDeviceDesc.SerialNumer = serialNumber;
        gpioDeviceDesc.Description = description;
  
        // Define GPIO Pin-5 as device property.
        AdapterProperty^ gpioPin_Property = ref new AdapterProperty(pinName, "");

        // Define and set GPIO Pin-5 value attribute.
        pinValue = static_cast<int>(pin->Read());
        Platform::Object^ pinValueData = Windows::Foundation::PropertyValue::CreateInt32(pinValue);
          
        AdapterAttribute^ gpioPin_valueAttr = ref new AdapterAttribute(
            pinValueName, 
            BridgeRT::E_ACCESS_TYPE::ACCESS_READ, 
            pinValueData
            );
        gpioPin_valueAttr->COVBehavior = BridgeRT::SignalBehavior::Always;
        gpioPin_Property += gpioPin_valueAttr;

        // Finally, put it all into a new device
        AdapterDevice^ gpioDevice = ref new AdapterDevice(&gpioDeviceDesc);
        gpioDevice->AddProperty(gpioPin_Property);
        devices.push_back(std::move(gpioDevice));

        return ERROR_SUCCESS;
    }

Next, modify the GetPropertyValue() function as follows:

    _Use_decl_annotations_
    uint32
    Adapter::GetPropertyValue(
        IAdapterProperty^ Property,
        String^ AttributeName,
        IAdapterValue^* ValuePtr,
        IAdapterIoRequest^* RequestPtr
        )
    {
        if (RequestPtr != nullptr)
        {
            *RequestPtr = nullptr;
        }

        // sanity check
        AdapterProperty^ tempProperty = dynamic_cast<AdapterProperty^>(Property);
        if (ValuePtr == nullptr ||
            tempProperty == nullptr ||
            tempProperty->Attributes == nullptr)
        {
            return ERROR_INVALID_PARAMETER;
        }

        // find corresponding attribute
        *ValuePtr = nullptr;
        for (auto attribute : tempProperty->Attributes)
        {
            if (attribute->Value != nullptr &&
                attribute->Value->Name == AttributeName)
            {
                // Read Pin Value
                pinValue = static_cast<int>(pin->Read());
                attribute->Value->Data = Windows::Foundation::PropertyValue::CreateInt32(pinValue);
            
                *ValuePtr = attribute->Value;
                return ERROR_SUCCESS;
            }
        }

        return ERROR_INVALID_HANDLE;
    }

That is all for a basic GPIO pin device. At this point when this application runs, the GPIO pin will be seen on the AllJoyn bus. Whenever any AllJoyn Client Application polls the value of the pin, our AllJoyn Device System Bridge Application will read the value from the physical GPIO pin on the Raspberry Pi.

### Step 5: Run the IoT Explorer for AllJoyn Application

When you run the IoT Explorer for AllJoyn Application in the same subnet with the AllJoyn Device System Bridge, you should be able to see that the GPIO Device is discovered.

1. Launch IoT Explorer for AllJoyn app.
2. Locate two nodes in the list - the "Custom Adapter" and "Custom_GPIO_Device" in the list of exposed Devices and Services.
 
 NOTE: Your adapter name may be different than the one shown below. By default, the adapter name is the name of the project you've created. For example, if your project name is DsbAdapter, the name of the adapter node will be "DsbAdapter" instead of "Custom Adapter".

Select the "Custom_GPIO_Device" from the list.

![ajx_dsb1]({{site.baseurl}}/Resources/images/AllJoyn/ajx_dsb1.png)

3. Once you have selected "Custom_GPIO_Device", Select Pin0

![custom_gpio_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio1.png)

4. After selecting "Pin0", observe the interfaces announced for this GPIO pin. Click any interface to view its properties.

![custom_gpio_ajx2]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio2.png)

5. Selecting an interface allows you to view its properties; You should observe a single interface property, with PinValue equal to 1:

![custom_gpio3_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio3.png)

## EXTRA CREDIT: Signalling when the GPIO pin value changes
Suppose the applications on the AllJoyn bus do not want to poll the value of the GPIO pin but just to be notified when the GPIO pin value changes. For that, we need to add support for signals in our adapter. The contents below contain all the pieces needed to make the GPIO Device Sample notify the AllJoyn Consumer Applications.

### Additions to Adapter.h:

    private:
        // GPIO pin value change event handler
        void pinValueChangedEventHandler(
            _In_ Windows::Devices::Gpio::GpioPin^ gpioPin,
            _In_ Windows::Devices::Gpio::GpioPinValueChangedEventArgs^ eventArgs);

### Additions to Adapter.cpp:

    uint32
    Adapter::Initialize()
    {
        // GPIO Device Descriptor: Static data for our device
        DEVICE_DESCRIPTOR gpioDeviceDesc;
        gpioDeviceDesc.Name = deviceName;
        gpioDeviceDesc.VendorName = vendorName;
        gpioDeviceDesc.Model = modelName;
        gpioDeviceDesc.Version = version;
        gpioDeviceDesc.SerialNumer = serialNumber;
        gpioDeviceDesc.Description = description;

        // Define GPIO Pin-5 as device property. Device contains properties
        AdapterProperty^ gpioPin_Property = ref new AdapterProperty(pinName, "");

        // Define and set GPIO Pin-5 value attribute. Device contains properties that have one or more attributes.
        pinValue = static_cast<int>(pin->Read());
        Platform::Object^ pinValueData = Windows::Foundation::PropertyValue::CreateInt32(pinValue);
          
        AdapterAttribute^ gpioPin_valueAttr = ref new AdapterAttribute(
            pinValueName, 
            BridgeRT::E_ACCESS_TYPE::ACCESS_READ, 
            pinValueData
            );
        gpioPin_valueAttr->COVBehavior = BridgeRT::SignalBehavior::Always;
        gpioPin_Property += gpioPin_valueAttr;

        // Create Change_Of_Value signal for the Value Attribute
        AdapterSignal^ signal = ref new AdapterSignal(Constants::CHANGE_OF_VALUE_SIGNAL);
        signal += ref new AdapterValue(Constants::COV__PROPERTY_HANDLE, gpioPin_Property);
        signal += ref new AdapterValue(Constants::COV__ATTRIBUTE_HANDLE, gpioPin_valueAttr->Value);

        // Finally, put it all into a new device
        AdapterDevice^ gpioDevice = ref new AdapterDevice(&gpioDeviceDesc);
        gpioDevice->AddProperty(gpioPin_Property);
        gpioDevice->AddSignal(signal);
        devices.push_back(std::move(gpioDevice));

        // Pin Value Changed Event Handler
        pin->ValueChanged += ref new Windows::Foundation::TypedEventHandler<GpioPin ^, GpioPinValueChangedEventArgs ^>(this, &Adapter::pinValueChangedEventHandler);

        return ERROR_SUCCESS;
    }

    _Use_decl_annotations_
    void Adapter::pinValueChangedEventHandler(
        GpioPin^ gpioPin,
        GpioPinValueChangedEventArgs^ eventArgs
        )
    {
        AutoLock sync(&lock, true);
        IAdapterSignal^ covSignal = devices.at(0)->Signals->GetAt(0);

        for (auto param : covSignal->Params)
        {
            if (param->Name == Constants::COV__ATTRIBUTE_HANDLE)
            {
                pinValue = static_cast<int>(pin->Read());
                IAdapterValue^ valueAttr_Value = (AdapterValue^)param->Data;
                int previousPinValue = (int)valueAttr_Value->Data;

                // Notify registered listeners only when pin value actually changes.
                if (previousPinValue != pinValue)
                {
                    valueAttr_Value->Data = pinValue;
                    NotifySignalListener(covSignal);
                }
            }
        }
    }

### About Signals

In the AllJoyn Device System Bridge, we have 3 predefined signals DEVICE ARRIVAL, DEVICE REMOVAL and CHANGE OF VALUE signals.
DEVICE ARRIVAL signal will be fired when a new device arrives to join to the AllJoyn network. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::DEVICE_ARRIVAL_SIGNAL and a handle to the device (IAdapterDevice^) as signal parameter. Use predefined parameter name Constants::DEVICE_ARRIVAL__DEVICE_HANDLE. This signal is associated with the Adapter.

DEVICE REMOVAL signal will be fired when a device leaves the network. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::DEVICE_REMOVAL_SIGNAL and a handle to the device (IAdapterDevice^) as signal parameter. Use predefined parameter name Constants::DEVICE_REMOVAL__DEVICE_HANDLE. This signal is associated with the Adapter.

CHANGE OF VALUE signal will be fired when a property attribute value of a device changes. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::CHANGE_OF_VALUE_SIGNAL, a handle to the regarding property (IAdapterProperty^) as one of the signal parameters and a handle to the regarding property attribute (IAdapterValue^) as the other signal parameter. Use predefined parameter names Constants::COV__PROPERTY_HANDLE and Constants::COV__ATTRIBUTE_HANDLE. This signal is associated with the corresponding AdapterDevice.

Aside from the predefined ones, signals with custom name and parameters could be defined. Whenever these signals are fired, they will be sent to the AllJoyn Bus.
