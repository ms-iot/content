---
layout: default
title: ManagedDSBGpioTutorial
permalink: /zh-CN/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm
lang: zh-CN
---

## Alljoyn DSB Gpio C\# 示例

本教程将介绍如何使用 C\# 中的 AllJoyn 设备系统网桥将 GPIO 设备公开到 AllJoyn 总线。

### 先决条件

1. AllJoyn 资源管理器

* [AllJoyn 资源管理器](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoynExplorer_1.0.0.2.zip?raw=true){:target="_blank"} - 此 zip 包含 AllJoyn 资源管理器 AppX 捆绑包。
* [AllJoyn 资源管理器安装指南](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_Setup_Guide_v1.0.pdf?raw=true){:target="_blank"} - 有关安装和启动 AllJoyn 资源管理器的手册。
* [AllJoyn 资源管理器用户指南](https://github.com/ms-iot/samples/blob/develop/AllJoyn/AllJoynExplorer/AllJoyn_Explorer_User_Guide_v1.0.pdf?raw=true){:target="_blank"} - 此 pdf 包含有关如何使用 AllJoyn 资源管理器的文档

### 步骤 1： 硬件设置  
此示例使用 Raspberry Pi 2，其 GPIO PIN 之一已连接到照片电阻器，如下图所示。如果其他设备为 Sues，则必须更改代码中的 PIN 码以匹配 HW 设置。

![Rpi\_schematic]({{site.baseurl}}/Resources/images/AllJoyn/rpi_schematic.png)

### 步骤 2： 下载并安装 AllJoyn 设备系统网桥模板  

AllJoyn 设备系统网桥模板是 Visual Studio 扩展，可使开发人员创建 AllJoyn 设备系统网桥应用项目。

1. [在此处](https://visualstudiogallery.msdn.microsoft.com/aea0b437-ef07-42e3-bd88-8c7f906d5da8)从 Visual Studio Online 下载 Alljoyn DSB VSIX 模板。
2. 下载后，双击 DeviceSystemBridgeTemplate.vsix 文件安装扩展。 

### 步骤 3： 创建 AllJoyn 设备系统网桥应用项目 

在 Visual Studio 中，依次选择“文件”\>“新建”\>“项目”，可打开“新建项目”对话框。在打开的对话框中，按照如下提供的方式（在 Visual C\# 下）创建新的 AllJoyn 设备系统网桥应用项目：

![NewDSB\_project]({{site.baseurl}}/Resources/images/AllJoyn/new_csharp_proj.png)

将需要向 AdapterLib 项目添加引用，以使用 Windows IoT 扩展 SDK，它需要使用 Windows::Devices::Gpio API。请按照以下步骤向项目添加引用：

  1. 在 VS 解决方案资源管理器中，找到适配器 Lib 项目。扩展此项目
  2. 右键单击“引用”，然后选择“添加引用...”
  
  ![add\_reference1]({{site.baseurl}}/Resources/images/AllJoyn/csharp_add_reference1.png)
  
  3. 在“添加引用”窗口的左侧，选择 Windows 通用下的“扩展”。
  4. 在列表中找到最新版本的 Windows IoT 扩展 SDK，并选中其左侧的框以选择此 SDK。
  5. 单击“确定”。
  
  ![add\_reference2]({{site.baseurl}}/Resources/images/AllJoyn/csharp_add_reference2.png)

### 步骤 4： 将 GPIO PIN 公开到 AllJoyn 总线  

打开 AdapterLib 项目中的 Adapter.cs 文件。按如下方式修改 Adapter.cs：
   
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


为了将 GPIO 设备公开到 AllJoyn 总线，我们需要创建相应的网桥设备 \(IAdapterDevice\) 实例。在 AdapterLib 项目的 Adapter.cs 文件中，向 Adapter\(\) 构造函数添加以下三行内容：
    
    public Adapter()
    {
        -
        -
        -
        controller = GpioController.GetDefault();
        pin = controller.OpenPin(PIN_NUMBER);           // Open GPIO 5
        pin.SetDriveMode(GpioPinDriveMode.Input);       // Set the IO direction as input 
    } 
 
 
现在，按照如下提供的方式修改初始化函数：

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

接下来，按照如下方式修改 GetPropertyValue\(\) 函数：

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
    
这就是针对基本 GPIO PIN 设备所进行的所有操作。现在当运行此应用程序时，GPIO PIN 将在 AllJoyn 总线上可见。每当任何 AllJoyn 客户端应用程序轮询 PIN 的值时，我们的 AllJoyn 设备系统网桥应用程序就将从 Raspberry Pi 上的物理 GPIO PIN 中读取该值。

### 步骤 5： 运行 Alljoyn 资源管理器应用程序

当在相同的子网中使用 AllJoyn 设备系统网桥运行 AllJoyn 资源管理器应用程序时，应能看到已发现 GPIO 设备。

1. 启动 AlljoynExplorer
2. 在公开的设备和服务列表中找到“Custom Adapter”和“Custom\_GPIO\_Device”。 

 注意： 适配器名称可能不同于如下所示的名称。默认情况下，适配器名称是所创建的项目名称。例如，如果项目名称为 DsbAdapter，则适配器节点的名称将是“DsbAdapter”，而不是“Custom Adapter”。

从列表中选择“Custom\_GPIO\_Device”

![ajx\_dsb1]({{site.baseurl}}/Resources/images/AllJoyn/ajx_dsb1.png)

3. 选择“Custom\_GPIO\_Device”后，请选择 Pin0

![custom\_gpio\_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio1.png)

4. 选择“Pin0”后，观察为此 GPIO PIN 宣布的接口。单击任何接口可查看其属性。

![custom\_gpio\_ajx2]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio2.png)

5. 选择接口允许你查看其属性；应观察 PinValue 等于 1 的单个接口属性：

![custom\_gpio3\_ajx]({{site.baseurl}}/Resources/images/AllJoyn/custom_gpio3.png)

## 额外信用： 在 GPIO PIN 值更改时发出信号 
假设 AllJoyn 总线上的应用程序不希望轮询 GPIO PIN 的值，但仅在 GPIO PIN 值更改时收到通知。为此，我们需要在适配器中添加信号支持。以下内容包含使 GPIO 设备示例通知 AllJoyn 使用者应用程序所需的所有内容。

### 按如下方式修改 Adapter.cs： 

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


  
###关于信号

在 AllJoyn 设备系统网桥中，我们具有 3 种预定义信号：设备到达、设备删除和值更改信号。在新设备到达以加入 AllJoyn 网络时，将引发设备到达信号。若要定义信号，需创建 IAdapterSignal 的实例，其预定义常量信号名称为 Constants::DEVICE\_ARRIVAL\_SIGNAL，并创建作为信号参数的设备句柄 \(IAdapterDevice^\)。使用预定义参数名称 Constants::DEVICE\_ARRIVAL\_\_DEVICE\_HANDLE。此信号与适配器关联。

在设备退出网络时，将引发设备删除信号。若要定义该信号，需创建 IAdapterSignal 的实例，其预定义常量信号名称为 Constants::DEVICE\_REMOVAL\_SIGNAL，并创建作为信号参数的设备句柄 \(IAdapterDevice^\)。使用预定义参数名称 Constants::DEVICE\_REMOVAL\_\_DEVICE\_HANDLE。此信号与适配器关联。

在设备的属性特性值更改时，将引发值更改信号。若要定义该信号，需创建 IAdapterSignal 的实例，其预定义常量信号名称为 Constants::CHANGE\_OF\_VALUE\_SIGNAL，并创建作为信号参数之一的相关属性句柄 \(IAdapterProperty^\) 以及作为其他信号参数的相关属性特性句柄 \(IAdapterValue^\)。使用预定义参数名称 Constants::COV\_\_PROPERTY\_HANDLE 和 Constants::COV\_\_ATTRIBUTE\_HANDLE。此信号与相应的 AdapterDevice 关联。

除预定义信号外，也可定义具有自定义名称和参数的信号。每当引发这些信号时，它们就将发送到 AllJoyn 总线。
