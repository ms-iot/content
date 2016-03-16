---
layout: default
title: Alljoyn Device System Bridge - API Guide
permalink: /en-US/win10/AlljoynDsbApiGuide.htm
lang: en-US
---

## Mapping Bridge Interface Objects to Alljoyn

### I. IAdapter

From the bridge's perspective, an IAdapter represents the controller for a system of one or more devices that map to the AllJoyn bus.  IAdapter declares interfaces necessary to support device enumeration, general configuration and life-cycle management.  It also declares methods interacting with a device or device(s) properties, methods and signals. 

To expose your device(s) as an AllJoyn service, it is necessary to implement a concrete class that inherits from IAdapter.  How each interface is implemented depends on the nature of the device(s) that you are adapting to AllJoyn. 

Your adapter will appear on the AllJoyn bus as an AllJoyn service advertised with the following name: 

	{ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName} 

Each adapter exposes two com.microsoft.alljoynmanagement.config interfaces that support bridge and adapter configuration: 

 	/AdapterConfig 

	/BusConfig

The IAdapter interface declares certain properties that must be implemented.  The following table describes those properties and how they map to AllJoyn:

| IAdapter Property | Description | Bridge Mapping |
| :---------------- | :---------- | :------------- |
| AdapterName       | Model of this adapter.  Also the suffix used for this adapter's advertised name. (See ExposedAdapterPrefix.) | AllJoyn About Data Model Number |
| ExposedAdapterPrefix |Prefix used when creating the advertised name of this bridge on the AllJoyn bus.  The adapter will be exposed with the following name: {ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName}. | AllJoyn Bus Attachment's Advertised Name |
| ExposedApplciationGUID | A GUID, provided by your adapter, that uniquely identifies this adapter.  This GUID also applies to the about data for all devices managed by this adapter.|AllJoyn About Data Application ID for this adapter and all devices that are exposed by this adapter. |
| ExposedApplicationName | A friendly application name that is exposed by this adapter.  This name also applies to all devices managed by this adapter. | AllJoyn About Data Application Name for this adapter and all devices that are exposed by this adapter. |
| Vendor | Vendor name of this adapter | AllJoyn About Data Manufacturer |
| Version | Software version of this adapter | AllJoyn About Data SW Version |

#### IAdapter::Initialize

Initializes your adapter. This can be used anyway you need.  For example, a background thread could be launched to start device discovery.  Typically this is also used to create a Device Arrival and Device Removal Signals. 

#### IAdapter::Get/SetConfig

This pair of methods are used for accessing your adapter's configuration data.  Typically, these settings consist of communication settings that your adapter needs for device enumeration, but they are not limited to that purpose.  

The bridge exposes adapter configuration data to AllJoyn through the "com.microsoft.alljoynmanagement.config" interface.  From the bridge's perspective, adapter configuration data settings are completely arbitrary and are exchanged with the adapter as a simple byte array.  Internally to the adapter, you may store these settings as desired.   

#### IAdapter::EnumDevices

This method provides the bridge with information about devices available on your bus.  The list of devices returned to the bridge are added to the AllJoyn bus as individual AllJoyn Services. 

A list must be returned through this method, but if the enumeration hasn't completed an IAdapterIoRequest may also be returned here.  The bridge will wait on this until your adapter signals the IAdapterIoRequest to complete device enumeration.   
### II. IAdapterDevice

From the bridge's perspective a device represents a device that you, the adapter implementer, want exposed to the AllJoyn bus as an AllJoyn Service.  What properties, methods and signals the device exposes to the bus are up to you as the implementer, but typically this would be a direct mapping of properties, methods and signals that your device or devices inherently expose over their native communications network. 

Each IAdapterDevice is advertised to alljoyn with the following name: 

	{ExposedAdapterPrefix}.{AdapterName}.{Name} 

Each device exposes a single alljoyn interface for exposing all properties, method and signals encapsulated by the device.  The alljoyn interface name is: 

	{ExposedAdapterPrefix}.{AdapterName}.{Name}.MainInterface 

Similar to an IAdapter, each IAdapterDevice is required to implement properties that the bridge uses to expose your device to AllJoyn.  The following table describes each property and how the bridge maps it to AllJoyn. 

| IAdapterDevice Property | Description | Bridge Mapping |
| :---------------------- | :---------- | :------------- |
| ControlPanelHandler     | A control panel that can operate this device. | Exposed as an org.alljoyn.ControlPanel.ControlPanel under a /ControlPanel bus object |
| Description             | A description of this device. | AllJoyn About Data Description |
| FirmwareVersion         | Software version of this device | AllJoyn About Data Firmware Version |
| Icon                    | A graphical icon that this device exposes to alljoyn. This can be null if there is no icon. |  	Exposed as a standard AllJoyn About Icon |
| Methods                 | This is the set all Methods that your device exposes to AllJoyn. | This can be empty if there are no methods. Exposed as methods under the MainInterface with each method's name. Non-unique names are appended with a unique ID. |
| Model                   | Model of this device | AllJoyn Bus Data Model Number |
| Name	                  | Name of this device	AllJoyn About Data Device Name. | This is also used for the suffix for this device's advertised name: {ExposedAdapterPrefix}.{AdapterName}.{Name} |
| Properties              | This is the set of all properties that your device exposes to AllJoyn. This can be empty if there are no properties, but if this is not empty, then at least one signal, the Change of Value signal must also be supported. | See IProperty |
| SerialNumber            | Serial Number of this device | AllJoyn About Data Serial Number |
| Signals                 | This is the set of all signals that this device exposes to AllJoyn. | Exposed as AllJoyn Signals |
| Vendor                  | Vendor name of this device | AllJoyn About Data Manufacturer |
| Version                 | Software version of this device | AllJoyn About Data SW Version |


### III. IAdapterProperty

From the bridge's perspective an IAdapterProperty represents a collection of related data values that you, the adapter implementer, want to expose to the AllJoyn bus for a specific device.  Each property contains a set of one or more IAdapterValues.  Each IAdapterValue represents an individual unit of data that can be accessed by an AllJoyn client.     

Each IAdapterProperty is announced to Alljoyn as a bus object with an interface name as follows: 

	/{PropertyName} 

	{ExposedAdapterPrefix}.{AdapterName}.{PropertyName} 

Alternatively, the interface name can be overridden by the property to map to a specific interface type.  In that case, the IAdapterProperty name is announced as a bus object with an interface name as follows: 

	/{PropertyName} 

	{InterfaceHint} 

| IAdapterProperty Properties |	Description                        | Bridge Mapping |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| Attributes	              |Collection of IAdapterAttributes    | Set of AllJoyn Properties (See IAdapterValue) |
| InterfaceHint | An override for this property that can be used to map this property to some other well known interface type.  Return null to use the default behavior | AllJoyn Interface name for this Property (if specified) |
| Name | Name of Property | AllJoyn Property |

### V. IAdapterValue

Each IAdapterValue is exposed as a child of an AllJoyn property with the following bus object and interface name:

	/{PropertyName}/{ValueName}
	
	{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}.{ValueName}

| IAdapterValue Properties    | Description                        | Bridge Mapping                                |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| Data	                      | The actual data value of a property on a bridged device.| An AllJoyn Property|
| Name                        | Name of value                      | Name of an AllJoyn Property|

### IV. IAdapterSignal

From the bridge's perspective an ISignal represents an event that your device can raise when something changes.  All devices typically have a Change of Value signal.  This signal alerts AllJoyn clients that one or more properties have changed on a device. Additional signals may also be supported.

Each ISignal is announced to AllJoyn as a Hosted Session signal for a device with the signals Name.  
The following properties must be implemented for an ISignal

| ISignal Properties          | Description                        | Bridge Mapping                                |
| :-------------------------- | :--------------------------------- | :-------------------------------------------- |
| Name	                      |Name of Signal                      | AllJoyn Signal |
| Params | A set of objects that changed and their new values, or null if this is a pure signal. | Maps to an array of alljoyn signal arguments passed to the signal. |
