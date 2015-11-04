---
layout: default
title: ManagedDSBGpioTutorial
permalink: /en-US/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm
lang: en-US
---

## Alljoyn DSB Gpio C# Sample

This tutorial shows how a GPIO Device can be exposed to the AllJoyn Bus using the AllJoyn Device System Bridge in C#.  

### Prerequisites

1. Alljoyn Explorer

* [AllJoyn Explorer](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.1.5.zip?raw=true){:target="_blank"} - This zip contains the AllJoyn Explorer AppX bundle.
* [AllJoyn Explorer Setup Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - Manual for installing and launching the AllJoyn Explorer.
* [AllJoyn Explorer User Guide](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - this pdf contains the documentation for how to use the AllJoyn Explorer

### Step 1: Hardware Setup  
The sample uses a Raspberry Pi 2 that one of its GPIO pins is connected to a photo resistor as shown in the schematic below. If another device is sues the pin number in the code has to be changed to match the HW setup.

![Rpi_schematic]({{site.baseurl}}/images/AllJoyn/rpi_schematic.png)

### Step 2: Download and Install the AllJoyn Device System Bridge Template  

The AllJoyn Device System Bridge Template is a Visual Studio extension that enables developers to create an AllJoyn Device System Bridge App project.

1. Dowload the Alljoyn DSB VSIX template from Visual Studio Online [here](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8).
2. After the download, double-click on the DeviceSystemBridgeTemplate.vsix file to install the extension. 

### Step 3: Create an AllJoyn Device System Bridge App Project 

In the Visual Studio, choose File > New > Project which opens the New Project dialog box. In the open dialog box, create a new AllJoyn Device System Bridge App project (under Visual C#) as given in the following: 

![NewDSB_project]({{site.baseurl}}/images/AllJoyn/new_csharp_proj.png)

You will need to add a reference to the AdapterLib project to use the Windows IoT Extension SDK, which is required to use the Windows::Devices::Gpio API. Follow the below steps to add a refernece to the project:

  1. In the VS Solution explorer, locate the Adapter Lib project. Expand this project
  2. Right click "References" and select "Add Reference..."
  
  ![add_reference1]({{site.baseurl}}/images/AllJoyn/csharp_add_reference1.png)
  
  3. On the left-hand side of the Add Reference window, select "Extensions" under Windows Universal.
  4. Locate the latest version of the Windows IoT Extension SDK in the list and check the box its left to select this SDK.
  5. Click "OK".
  
  ![add_reference2]({{site.baseurl}}/images/AllJoyn/csharp_add_reference2.png)

### Step 4: Expose a GPIO Pin to the AllJoyn Bus  

Open the Adapter.cs file in the AdapterLib project. Modify Adapter.cs as follows:
   
    using Windows.Devices.Gpio;
   
    namespace AdapterLib
    {
      public sealed class Adapter : IAdapter
      {
          private const uint ERROR_SUCCESS = 0;
  
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
          private int pinValueData = -1;
  
          private GpioController controller;
          private GpioPin pin;
  
          public string Vendor { get; }


In order to expose the GPIO Device to the AllJoyn Bus, we need to create a corresponding Bridge Device (IAdapterDevice) instance. Add the following three lines to the Adapter() constructor in the AdapterLib project's Adapter.cs file:
    
    public Adapter()
    {
        -
        -
        -
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

        // Define GPIO Pin-5 as device property. Device contains properties
        AdapterProperty gpioPin_Property = new AdapterProperty(PIN_NAME, INTERFACE_HINT);
        // Define and set GPIO Pin-5 value. Device contains properties that have one or more attributes.
        pinValueData = (int)pin.Read();
        AdapterValue pinValueAttr = new AdapterValue(PIN_VALUE_NAME, pinValueData);
        gpioPin_Property.Attributes.Add(pinValueAttr);
    
        // Finally, put it all into a new device
        gpioDevice.Properties.Add(gpioPin_Property);
        devices.Add(gpioDevice);
    
        return ERROR_SUCCESS;
    }

Next, modify the GetPropertyValue() function as follows:

    public uint GetPropertyValue
    (
      IAdapterProperty Property,
      string AttributeName,
      out IAdapterValue ValuePtr,
      out IAdapterIoRequest RequestPtr
    )
    {
        RequestPtr = null;
        pinValueData = (int)pin.Read();
  
        IAdapterValue attribute = Property.Attributes.ElementAt<IAdapterValue>(0);
        attribute.Data = pinValueData;
        ValuePtr = attribute;
      
        return ERROR_SUCCESS;
    }
    
That is all for a basic GPIO pin device. At this point when this application runs, the GPIO pin will be seen on the AllJoyn bus. Whenever any AllJoyn Client Application polls the value of the pin, our AllJoyn Device System Bridge Application will read the value from the physical GPIO pin on the Raspberry Pi. 

### Step 5: Run the Alljoyn Explorer Application

When you run the AllJoyn Explorer Application in the same subnet with the AllJoyn Device System Bridge, you should be able to see that the GPIO Device is discovered. 

1. Launch AlljoynExplorer
2. Locate the "Custom Adapter" and "Custom_GPIO_Device" in the list of exposed Devices and Services. 

 NOTE: Your adapter name may be different than the one shown below. By default, the adapter name is the name of the project you've created. For example, if your project name is DsbAdapter, the name of the adapter node will be "DsbAdapter" instead of "Custom Adapter".

Select the "Custom_GPIO_Device" from the list

![ajx_dsb1]({{site.baseurl}}/images/AllJoyn/ajx_dsb1.png)

3. Once you have selected "Custom_GPIO_Device", Select Pin0

![custom_gpio_ajx]({{site.baseurl}}/images/AllJoyn/custom_gpio1.png)

4. After selecting "Pin0", observe the interfaces announced for this GPIO pin. Click any interface to view its properties.

![custom_gpio_ajx2]({{site.baseurl}}/images/AllJoyn/custom_gpio2.png)

5. Selecting an interface allows you to view its properties; You should observe a single interface property, with PinValue equal to 1:

![custom_gpio3_ajx]({{site.baseurl}}/images/AllJoyn/custom_gpio3.png)

## EXTRA CREDIT: Signaling when the GPIO pin value changes 
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
          
      // Define GPIO Pin-5 as device property. Device contains properties
      AdapterProperty gpioPin_Property = new AdapterProperty(PIN_NAME, INTERFACE_HINT);
      
      // Define and set GPIO Pin-5 value. Device contains properties that has one or more attributes.
      pinValueData = (int)pin.Read();
      AdapterValue pinValueAttr = new AdapterValue(PIN_VALUE_NAME, pinValueData);
      gpioPin_Property.Attributes.Add(pinValueAttr);
      
      // Create Change of Value Signal for the Pin Value Attribute
      AdapterSignal covSignal = new AdapterSignal(Constants.CHANGE_OF_VALUE_SIGNAL);
      AdapterValue propertyHandle = new AdapterValue(Constants.COV__PROPERTY_HANDLE, gpioPin_Property);
      AdapterValue attrHandle = new AdapterValue(Constants.COV__ATTRIBUTE_HANDLE, pinValueAttr);
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
    
    public uint RegisterSignalListener
    (
        IAdapterSignal Signal,
        IAdapterSignalListener Listener,
        object ListenerContext
    )
    {
      int signalHashCode = Signal.GetHashCode();
      
      SIGNAL_LISTENER_ENTRY newEntry;
      newEntry.Signal = Signal;
      newEntry.Listener = Listener;
      newEntry.Context = ListenerContext;
      
      lock (signalListeners)
      {
          if (signalListeners.ContainsKey(signalHashCode))
          {
              signalListeners[signalHashCode].Add(newEntry);
          }
          else
          {
              IList<SIGNAL_LISTENER_ENTRY> newEntryList;
              
              try
              {
                  newEntryList = new List<SIGNAL_LISTENER_ENTRY>();
              }
              catch (OutOfMemoryException ex)
              {
                  throw new OutOfMemoryException(ex.Message);
              }
              
              newEntryList.Add(newEntry);
              signalListeners.Add(signalHashCode, newEntryList);
          }
      }
      
      return ERROR_SUCCESS;
    }
    
    private void notifySignalListener(IAdapterSignal signal)
    {
      int signalHashCode = signal.GetHashCode();
      
      lock (signalListeners)
      {
          IList<SIGNAL_LISTENER_ENTRY> listenerList = signalListeners[signalHashCode];
          foreach (SIGNAL_LISTENER_ENTRY entry in listenerList)
          {
              IAdapterSignalListener listener = entry.Listener;
              object listenerContext = entry.Context;
              listener.AdapterSignalHandler(signal, listenerContext);
          }
      }
    }
    private void pinValueChangedEventHandler(
        GpioPin sender,
        GpioPinValueChangedEventArgs args
        )
    {
      // Notify registered listeners only when pin value actually changes
      IAdapterSignal covSignal = devices.ElementAt(0).Signals.ElementAt(0);
      foreach (IAdapterValue param in covSignal.Params)
      {
          if (param.Name == Constants.COV__ATTRIBUTE_HANDLE)
          {
              pinValueData = (int)pin.Read();
              IAdapterValue valueAttr = (IAdapterValue)param.Data;
              int previousPinValue = (int)valueAttr.Data;
              
              if (previousPinValue != pinValueData)
              {
                  valueAttr.Data = pinValueData;
                  notifySignalListener(covSignal);
              }
          }
      }
    }


  
###About Signals

In the AllJoyn Device System Bridge, we have 3 predefined signals DEVICE ARRIVAL, DEVICE REMOVAL and CHANGE OF VALUE signals. 
DEVICE ARRIVAL signal will be fired when a new device arrives to join to the AllJoyn network. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::DEVICE_ARRIVAL_SIGNAL and a handle to the device (IAdapterDevice^) as signal parameter. Use predefined parameter name Constants::DEVICE_ARRIVAL__DEVICE_HANDLE. This signal is associated with the Adapter.

DEVICE REMOVAL signal will be fired when a device leaves the network. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::DEVICE_REMOVAL_SIGNAL and a handle to the device (IAdapterDevice^) as signal parameter. Use predefined parameter name Constants::DEVICE_REMOVAL__DEVICE_HANDLE. This signal is associated with the Adapter.

CHANGE OF VALUE signal will be fired when a property attribute value of a device changes. To define the signal, you need to create an instance of IAdapterSignal with predefined constant signal name Constants::CHANGE_OF_VALUE_SIGNAL, a handle to the regarding property (IAdapterProperty^) as one of the signal parameters and a handle to the regarding property attribute (IAdapterValue^) as the other signal parameter. Use predefined parameter names Constants::COV__PROPERTY_HANDLE and Constants::COV__ATTRIBUTE_HANDLE. This signal is associated with the corresponding AdapterDevice.

Aside from the predefined ones, signals with custom name and parameters could be defined. Whenever these signals are fired, they will be sent to the AllJoyn Bus.
