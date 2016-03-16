---
layout: default
title: AllJoyn Managed DSB Gpio Tutorial
permalink: /en-US/win10/samples/AlljoynDSBSample_Managed.htm
lang: en-US
---

## Alljoyn DSB GPIO C# Tutorial

{% include VerifiedVersion.md %}

You can find the source code for AllJoyn samples by downloading a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip) and navigating to the `samples-develop\AllJoyn`. This tutorial shows how a GPIO Device can be exposed to the AllJoyn Bus using the AllJoyn Device System Bridge in C#.

### Prerequisites

1. Install [IoT Explorer for AllJoyn]({{site.baseurl}}/en-US/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"} app.

### Step 1: Hardware Setup  
The sample uses a Raspberry Pi 2 that one of its GPIO pins is connected to a photo resistor as shown in the schematic below. If another device is sues the pin number in the code has to be changed to match the HW setup.

![Rpi_schematic]({{site.baseurl}}/Resources/images/AllJoyn/rpi_schematic.png)

### Step 2: Download and Install the AllJoyn Device System Bridge Template  

The AllJoyn Device System Bridge Template is a Visual Studio extension that enables developers to create an AllJoyn Device System Bridge App project.

1. Download the Alljoyn DSB VSIX template from Visual Studio Online [here](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8){:target="_blank"}.
2. After the download, double-click on the DeviceSystemBridgeTemplate.vsix file to install the extension. 

### Step 3: Create an AllJoyn Device System Bridge App Project 

In the Visual Studio, choose File > New > Project which opens the New Project dialog box. In the open dialog box, create a new AllJoyn Device System Bridge App project (under Visual C#) as given in the following: 

![NewDSB_project]({{site.baseurl}}/Resources/images/AllJoyn/new_csharp_proj.png)

You will need to add a reference to the AdapterLib project to use the Windows IoT Extension SDK, which is required to use the Windows::Devices::Gpio API. Follow the below steps to add a reference to the project:

  1. In the VS Solution explorer, locate the Adapter Lib project. Expand this project
  2. Right click "References" and select "Add Reference..."
  
  ![add_reference1]({{site.baseurl}}/Resources/images/AllJoyn/csharp_add_reference1.png)
  
  3. On the left-hand side of the Add Reference window, select "Extensions" under Windows Universal.
  4. Locate the latest version of the Windows IoT Extension SDK in the list and check the box its left to select this SDK.
  5. Click "OK".
  
  ![add_reference2]({{site.baseurl}}/Resources/images/AllJoyn/csharp_add_reference2.png)

### Step 4: Expose a GPIO Pin to the AllJoyn Bus  

Open the Adapter.cs file in the AdapterLib project. Modify Adapter.cs as follows:
   
    using Windows.Devices.Gpio;

    namespace AdapterLib
    {
        public sealed class Adapter : IAdapter
        {
            private const uint ERROR_SUCCESS = 0;
            private const uint ERROR_INVALID_HANDLE = 6;
    
            // Device Arrival and Device Removal Signal Indices
            private const int DEVICE_ARRIVAL_SIGNAL_INDEX = 0;
            private const int DEVICE_ARRIVAL_SIGNAL_PARAM_INDEX = 0;
            private const int DEVICE_REMOVAL_SIGNAL_INDEX = 1;
            private const int DEVICE_REMOVAL_SIGNAL_PARAM_INDEX = 0;
    
            // GPIO Device
            private const string DEVICE_NAME = "Custom_GPIO_Device";
            private const string VENDOR = "Custom_Vendor";
            private const string MODEL = "Custom_Model";
            private const string VERSION = "1.0.0.0";
            private const string SERIAL_NUMBER = "1111111111111";
            private const string DESCRIPTION = "A Custom GPIO Device";
    
            // GPIO Device Pin-5 Property
            private const int PIN_NUMBER = 5;
            private const string PIN_NAME = "Pin-5";
            private const string INTERFACE_HINT = "";
    
            // Pin-5 Property Attribute
            private const string PIN_VALUE_NAME = "PinValue";
            private int pinValue = -1;
    
            private GpioController controller;
            private GpioPin pin;
      
            public string Vendor { get; }

In order to expose the GPIO Device to the AllJoyn Bus, we need to create a corresponding Bridge Device (IAdapterDevice) instance. Add the following three lines to the Adapter() constructor in the AdapterLib project's Adapter.cs file:
    
    public Adapter()
    {
        .
        .
        .
        controller = GpioController.GetDefault();
        pin = controller.OpenPin(PIN_NUMBER);           // Open GPIO 5
        pin.SetDriveMode(GpioPinDriveMode.Input);       // Set the IO direction as input 
    } 
 
Now, modify the Initialize function as given in the following:

    public uint Initialize()
    {
        AdapterDevice gpioDevice = new AdapterDevice(
            DEVICE_NAME,
            VENDOR,
            MODEL,
            VERSION,
            SERIAL_NUMBER,
            DESCRIPTION
            );
    
        // Define GPIO Pin-5 as device property.
        AdapterProperty gpioPin_Property = new AdapterProperty(PIN_NAME, INTERFACE_HINT);
                
        // Define and set GPIO Pin-5 value.
        pinValue = (int) pin.Read();
        object pinValueData = Windows.Foundation.PropertyValue.CreateInt32(pinValue);
    
        AdapterAttribute gpioPin_valueAttr = new AdapterAttribute(
            PIN_VALUE_NAME,
            pinValueData,
            E_ACCESS_TYPE.ACCESS_READ
            );
        gpioPin_valueAttr.COVBehavior = SignalBehavior.Always;
        gpioPin_Property.Attributes.Add(gpioPin_valueAttr);
    
        // Finally, put it all into a new device
        gpioDevice.Properties.Add(gpioPin_Property);
        devices.Add(gpioDevice);
    
        return ERROR_SUCCESS;
    }

Next, modify the GetPropertyValue() function as follows:

    public uint GetPropertyValue(
        IAdapterProperty Property,
        string AttributeName,
        out IAdapterValue ValuePtr,
        out IAdapterIoRequest RequestPtr
        )
    {
        ValuePtr = null;
        RequestPtr = null;
    
        // find corresponding attribute
        foreach (var attribute in ((AdapterProperty)Property).Attributes)
        {
            if (attribute.Value.Name == AttributeName)
            {
                // Read Pin Value
                pinValue = (int)pin.Read();
                object pinValueData = Windows.Foundation.PropertyValue.CreateInt32(pinValue);
    
                attribute.Value.Data = pinValueData;
                ValuePtr = attribute.Value;
                return ERROR_SUCCESS;
            }
        }
    
        return ERROR_INVALID_HANDLE;
    }
    
That is all for a basic GPIO pin device. At this point when this application runs, the GPIO pin will be seen on the AllJoyn bus. Whenever any AllJoyn Client Application polls the value of the pin, our AllJoyn Device System Bridge Application will read the value from the physical GPIO pin on the Raspberry Pi. 

### Step 5: Run the IoT Explorer for AllJoyn Application

When you run the IoT Explorer for AllJoyn Application in the same subnet with the AllJoyn Device System Bridge, you should be able to see that the GPIO Device is discovered. 

1. Launch IoT Explorer for AllJoyn app.
2. Locate the "Custom Adapter" and "Custom_GPIO_Device" in the list of exposed Devices and Services. 

 NOTE: Your adapter name may be different than the one shown below. By default, the adapter name is the name of the project you've created. For example, if your project name is DsbAdapter, the name of the adapter node will be "DsbAdapter" instead of "Custom Adapter".

Select the "Custom_GPIO_Device" from the list

![ajx_dsb1]({{site.baseurl}}/Resources/images/AllJoyn/ajx_dsb1.png)

3. Once you have selected "Custom_GPIO_Device", Select Pin0

![custom_gpio_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio1.png)

4. After selecting "Pin0", observe the interfaces announced for this GPIO pin. Click any interface to view its properties.

![custom_gpio_ajx2]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio2.png)

5. Selecting an interface allows you to view its properties; You should observe a single interface property, with PinValue equal to 1:

![custom_gpio3_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio3.png)

## EXTRA CREDIT: Signalling when the GPIO pin value changes 
Suppose the applications on the AllJoyn bus do not want to poll the value of the GPIO pin but just to be notified when the GPIO pin value changes. For that, we need to add support for signals in our adapter. The contents below contain all the pieces needed to make the GPIO Device Sample notify the AllJoyn Consumer Applications. 

### Modify Adapter.cs as follows: 

    public uint Initialize()
    {
        AdapterDevice gpioDevice = new AdapterDevice(
            DEVICE_NAME,
            VENDOR,
            MODEL,
            VERSION,
            SERIAL_NUMBER,
            DESCRIPTION
            );
    
        // Define GPIO Pin-5 as device property.
        AdapterProperty gpioPin_Property = new AdapterProperty(PIN_NAME, INTERFACE_HINT);
                
        // Define and set GPIO Pin-5 value.
        pinValue = (int) pin.Read();
        object pinValueData = Windows.Foundation.PropertyValue.CreateInt32(pinValue);
    
        AdapterAttribute gpioPin_valueAttr = new AdapterAttribute(
            PIN_VALUE_NAME,
            pinValueData,
            E_ACCESS_TYPE.ACCESS_READ
            );
        gpioPin_valueAttr.COVBehavior = SignalBehavior.Always;
        gpioPin_Property.Attributes.Add(gpioPin_valueAttr);
    
        // Create Change of Value Signal for the Pin Value Attribute
        AdapterSignal covSignal = new AdapterSignal(Constants.CHANGE_OF_VALUE_SIGNAL);
        AdapterValue propertyHandle = new AdapterValue(Constants.COV__PROPERTY_HANDLE, gpioPin_Property);
        AdapterValue attrHandle = new AdapterValue(Constants.COV__ATTRIBUTE_HANDLE, gpioPin_valueAttr.Value);
        covSignal.Params.Add(propertyHandle);
        covSignal.Params.Add(attrHandle);
    
        // Finally, put it all into a new device
        gpioDevice.Properties.Add(gpioPin_Property);
        gpioDevice.Signals.Add(covSignal);
        devices.Add(gpioDevice);
    
        // Pin value change event handler
        pin.ValueChanged += pinValueChangedEventHandler;
    
        return ERROR_SUCCESS;
    }
    
    private void pinValueChangedEventHandler(
        GpioPin sender,
        GpioPinValueChangedEventArgs args
        )
    {
        IAdapterSignal covSignal = devices.ElementAt(0).Signals.ElementAt(0);
    
        foreach (IAdapterValue param in covSignal.Params)
        {
            if (param.Name == Constants.COV__ATTRIBUTE_HANDLE)
            {
                pinValue = (int) pin.Read();
                IAdapterValue valueAttr_Value = (IAdapterValue) param.Data;
                int previousPinValue = (int) valueAttr_Value.Data;
    
                // Notify registered listeners only when pin value actually changes
                if (previousPinValue != pinValue)
                {
                    valueAttr_Value.Data = pinValue;
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
