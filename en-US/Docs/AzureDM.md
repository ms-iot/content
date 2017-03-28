---
layout: docs
title: Azure IoT Device Management
description: Describes device management through Azure IoT Hub 
keyword: Azure, IoT, Device Management
permalink: /en-US/Docs/AzureDM.htm
lang: en-US
---

# Azure IoT Device Management

When it comes to connected devices, remote device management is one of the key features used by system operators. It enables operators to reconfigure and update software and parameters of the device remotely without the need to have local, physical access to the device. With Windows 10 IoT Core, OEMs can build devices that offer these capabilities out-of-the box. Windows 10 IoT Core, as well as other Windows 10 versions, already offers Mobile Device Management (MDM) based on [OMA DM](https://en.wikipedia.org/wiki/OMA_Device_Management). This is mainly utilized in enterprise solutions with management tools such as SCCM or Intune. While those solutions are well suited for devices placed in an enterprise setting, it has challenges in the more diverse settings that we see in IoT solutions. Those challenges are also seen in IoT devices requiring light weight device management. For those devices, Microsoft offers [device management through Azure IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-device-management-overview).

## Scalable device management with Windows IoT

With Windows IoT Core running in devices such as home appliances, HVAC systems and others, there is a need for a customizable, light weight device management solution. In the Windows Creator Edition, Microsoft enables [Azure IoT Hub device management](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-device-management-overview). OEMs can use the [Windows IoT Azure DM client library](https://aka.ms/iot-core-azure-dm-client) to add device management capabilities to their Azure IoT hub connected devices. This library will access the standard Windows device management components ([Configuration Service Providers](https://msdn.microsoft.com/en-us/windows/hardware/commercialize/customize/mdm/configuration-service-provider-reference), CSP).  OEMs can now build devices that support SCCM, Intune and Azure IoT Hub for device management and leave it up to their customers to select the type DM solution that fits them best. 

![Azure IoT Hub Device Management]({{site.baseurl}}/Resources/images/cloud/azureDM.PNG)

## How does it work?

The [Windows IoT Azure DM client library](https://aka.ms/iot-core-azure-dm-client) is linked in the host application. It shares the Azure IoT Hub connection with the host app. Thus making additional enrolment to enable device management unnecessary. The picture below shows the architecture for an Azure IoT Hub DM solution using the Windows IoT Azure DM client library. 

![Azure DM Flow Chart]({{site.baseurl}}/Resources/images/cloud/flowChartAzureDM.PNG)

Microsoft provides two system components, CommProxy.exe and SystemConfigurator.exe, which the OEM needs to include in the device image. These components give access to the CSPs. The IoTDMClientLib maps the CSP interface to functions that can be consumed by Azure IoT Hub device management. It also provides DM functions that don’t use a CSP, e.g. set time zone. The IoTDMClientLib is provided as an open source component. OEMs can extend it to add DM capabilities that are specific to their device such as configurations for sensors or actuators.   

## How to get started?

Windows IoT Azure DM client library is available on GitHub. Beside the IoTDMClientLib project it also includes samples to get started quickly. For more information see the links below.

### Project GitHub page

[Windows IoT Azure DM client library](https://aka.ms/iot-core-azure-dm-client) is available on GitHub.

### DM Dashboard

[DM Dashboard](https://aka.ms/iot-core-azure-dm-client-dashboard) is an application to test the DM function on a device. The app connects to the device via Azure IoT Hub. The app can be used to validate the DM capabilities of the device. It can be extended to test any third-party DM functions that were added to the IoTDMClientLib.

### DM background application

The [DM background application](https://aka.ms/iot-core-azure-dm-client-backgroundapp) shows how the IoTDMClientLib can be used in an application that connects to Azure IoT Hub and needs to run as background app on Windows IoT Core. 

### Toaster Application

The [Toaster application](https://aka.ms/iot-core-azure-dm-client-toasterapp) , as the DM background app above, will enable Azure DM capabilities for a device. This app will run in the foreground and allows access to DM parameters and functions via the devices UI.  