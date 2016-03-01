---
layout: default
title: Alljoyn 设备系统网桥 - API 指南
permalink: /zh-cn/win10/AlljoynDsbApiGuide.htm
lang: zh-cn
---

##将网桥接口对象映射到 Alljoyn

###I.IAdapter

从网桥的角度来看，IAdapter 表示一台或多台映射到 AllJoyn 总线的设备的系统控制器。IAdapter 可声明支持设备枚举、常规配置和生命周期管理所需的接口。它还可声明与一台或多台设备属性、方法和信号交互的方法。

若要将设备作为 AllJoyn 服务公开，请务必实现从 IAdapter 继承的具体类。每个接口的实现方式都取决于要调整到 AllJoyn 的设备的特性。

适配器将作为使用以下名称宣传的 AllJoyn 服务显示在 AllJoyn 总线上：

	{ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName} 

每个适配器可公开两个支持网桥和适配器配置的 com.microsoft.alljoynmanagement.config 接口：

 	/AdapterConfig 

	/BusConfig

IAdapter 接口可声明某些必须实现的属性。下表介绍了这些属性以及它们映射到 AllJoyn 的方式：

| IAdapter 属性 | 描述 | 网桥映射 |
| :---------------- | :---------- | :------------- |
| 适配器名称 | 此适配器的模型。此外还有用于该适配器的宣传名称的后缀。（请参阅 ExposedAdapterPrefix。） | AllJoyn About 数据模型数量 |
| ExposedAdapterPrefix |用于在 AllJoyn 总线上创建该网桥宣传名称时的前缀。该适配器会使用以下名称公开：{ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName}。 | AllJoyn 总线附件的宣传名称 |
| ExposedApplciationGUID | 适配器提供的唯一标识此适配器的 GUID。此 GUID 还适用于该适配器管理的所有设备的 About 数据。|此适配器的 AllJoyn About 数据应用程序 ID 和所有设备均由此适配器公开。 |
| ExposedApplicationName | 此适配器公开的友好的应用程序名称。此名称也适用于此适配器管理的所有设备。 | 此适配器的 AllJoyn About 数据应用程序名称和所有设备均由此适配器公开。 |
| 供应商 | 此适配器的供应商名称 | AllJoyn About 数据制造商 |
| 版本 | 此适配器的软件版本 | AllJoyn About 数据 SW 版本 |

####IAdapter::Initialize

初始化你的适配器。可根据所需的任何方式使用此适配器。例如，可启动后台线程以启动设备发现。通常。也可用于创建设备到达和设备删除信号。

####IAdapter::Get/SetConfig

这两种方法可用于访问适配器的配置数据。通常，这些设置包含适配器进行设备枚举所需的通信设置，但它们并不局限于该目的。

网桥可通过“com.microsoft.alljoynmanagement.config”接口向 AllJoyn 公开适配器配置数据。从网桥的角度来看，适配器配置数据设置完全随意，并可作为简单的字节数组与适配器进行交换。在适配器内部，可根据需要存储这些设置。

####IAdapter::EnumDevices

此方法可为网桥提供有关总线上可用设备的信息。返回到网桥的设备列表将作为单独的 AllJoyn 服务添加到 AllJoyn 总线。

列表必须通过此方法返回，但如果枚举未完成，IAdapterIoRequest 也将返回到此处。网桥将等待完成此操作，直到适配器发出 IAdapterIoRequest 完成设备枚举信号为止。
###II.IAdapterDevice

从网桥的角度来看，设备是指你（适配器实施者）希望作为 AllJoyn 服务公开到 AllJoyn 总线的设备。设备公开到总线的属性、方法和信号取决于你（实施者），但通常，这将是一台或多台设备本身通过其本机通信网络公开的属性、方法和信号的直接映射。

每个 IAdapterDevice 都将使用以下名称宣传到 alljoyn：

	{ExposedAdapterPrefix}.{AdapterName}.{Name} 

每台设备均可公开单个 AllJoyn 接口，用于公开设备封装的所有属性、方法和信号。Alljoyn 接口名称是：

	{ExposedAdapterPrefix}.{AdapterName}.{Name}.MainInterface 

与 IAdapter 类似，每个 IAdapterDevice 都要求实现网桥用于将设备公开到 AllJoyn 的属性。下表介绍了每个属性以及网桥将其映射到 AllJoyn 的方式。

| IAdapterDevice 属性 | 描述 | 网桥映射 |
| :---------------------- | :---------- | :------------- |
| ControlPanelHandler | 可运行此设备的控制面板。 | 作为 org.alljoyn.ControlPanel.ControlPanel 公开在 /ControlPanel 总线对象下。 |
| 描述 | 有关此设备的描述。 | AllJoyn About 数据描述 |
| FirmwareVersion | 此设备的软件版本 | AllJoyn About 数据固件版本 |
| 图标 | 此设备公开到 AllJoyn 的图形图标。如果没有图标，此值可为 null。 |  	作为标准 AllJoyn About 图标公开 |
| 方法 | 这是设备向 AllJoyn 公开的所有方法集。 | 如果没有方法，此值可为空。作为方法公开在 MainInterface 下，包含每个方法的名称。非唯一名称后面附有唯一 ID。 |
| 型号 | 此设备的型号 | AllJoyn 总线数据型号 |
| 名称 | 此设备 AllJoyn About 数据设备名称的名称。 | 此名称还可用于此设备的宣传名称的后缀：{ExposedAdapterPrefix}.{AdapterName}.{Name} |
| 属性 | 这是设备向 AllJoyn 公开的所有属性集。如果不存在任何属性，此值可为空；但如果此值不为空，则必须还至少支持一个信号（即“值更改”信号）。 | 请参阅 IProperty |
| SerialNumber | 此设备的序列号 | AllJoyn About 数据序列号 |
| 信号 | 这是此设备向 AllJoyn 公开的所有信号集。 | 作为 AllJoyn 信号公开 |
| 供应商 | 此设备的供应商名称 | AllJoyn About 数据制造商 |
| 版本 | 此设备的软件版本 | AllJoyn About 数据 SW 版本 |


###III.IAdapterProperty

从网桥的角度来看，IAdapterProperty 表示你（适配器实施者）希望公开到特定设备的 AllJoyn 总线的相关数据值集合。每个属性包含一个或多个 IAdapterValues 集。每个 IAdapterValue 均表示 AllJoyn 客户端可访问的单个数据单元。

每个 IAdapterProperty 均可作为总线对象宣布到 Alljoyn，接口名称如下：

	/{PropertyName} 

	{ExposedAdapterPrefix}.{AdapterName}.{PropertyName} 

或者，接口名称可由属性重写以映射到特定的接口类型。在这种情况下，IAdapterProperty 名称可作为总线对象宣布，接口名称如下：

	/{PropertyName} 

	{InterfaceHint} 

| IAdapterProperty 属性 |	描述 | 网桥映射 |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| 属性 |IAdapterAttributes 的集合 | AllJoyn 属性集（请参阅 IAdapterValue） |
| InterfaceHint | 可用于将此属性映射到某些其他已知接口类型的属性重写。返回 null 以使用默认行为 | 此属性的 AllJoyn 接口名称（如果已指定） |
| 名称 | 属性名称 | AllJoyn 属性 |

###V.IAdapterValue

每个 IAdapterValue 均作为 AllJoyn 属性的子元素公开，并包含以下总线对象和接口名称：

	/{PropertyName}/{ValueName}
	
	{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}.{ValueName}

| IAdapterValue 属性 | 描述 | 网桥映射 |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| 数据 | 网桥设备上属性的实际数据值。| AllJoyn 属性|
| 名称 | 值的名称 | AllJoyn 属性的名称|

###IV.IAdapterSignal

从网桥的角度来看，ISignal 表示在进行更改时设备可引发的事件。所有设备通常具有“值更改”信号。此信号可提醒 AllJoyn 客户端，设备上的一个或多个属性已发生更改。其他信号也可能受支持。

每个 ISignal 均作为设备的托管会话信号宣布到 AllJoyn，并包含信号名称。必须为 ISignal 实现以下属性

| ISignal 属性 | 描述 | 网桥映射 |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| 名称 |信号名称 | AllJoyn 信号 |
| 参数 | 已更改的对象集及其新值或 null（如果为纯信号）。 | 映射到传递给信号的一组 AllJoyn 信号参数。 |
