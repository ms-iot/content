---
layout: default
title: What's New for Windows 10 IoT Core
description: New features in Fall Creators Update
keyword: windows iot, iot core, fall creators update, new
permalink: /en-US/Docs/WhatsNew.htm
lang: en-US
---
# What's New for Windows 10 IoT Core 

## Fall Creators Update
___

With each iteration, Windows 10 IoT Core continues to enhance the tools needed to help device creators and OEMs scale from single function devices on premises to geo-distributed deployments connected to the cloud. And one of the most challenging aspects of any IoT project is bringing together all the pieces and technologies needed to make a complete solution.

With the Fall Creators Update, we've simplified this process by integrating support for several new features directly into Windows 10 IoT Core. Head over to [Windows Dev Center](https://developer.microsoft.com/windows/iot/getstarted) to select your device and download Windows 10 IoT Fall Creators Update.

## New Major Features
___ 
* **.NET for UWP apps**, the set of managed types that can be used to [build Universal Windows Platform (UWP) apps](https://msdn.microsoft.com/library/windows/apps/xaml/mt185501.aspx) using C# or Visual Basic, has been augmented with [thousands of new APIs](https://blogs.msdn.microsoft.com/dotnet/2017/08/25/uwp-net-standard-2-0-preview/) to make it compliant with .NET Standard 2.0. The additional APIs and tooling improvements make it easier to port existing .NET code and libraries to UWP apps on Windows 10 IoT Core.
* We've streamlined localization of interfaces and UI resources by **expanding our language support**, including English (en-US and en-GB), French (fr-FR and fr-CA), Spanish (es-ES and es-MX), and Simplified Chinese (zh-CHS). You can create FFUs supporting multiple languages - see [MultiLangSample](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Source-arm/Products/MultiLangSample) and [SingleLangSample](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Source-arm/Products/SingleLangSample) for more information.
* UWP is ideally suited for building apps with natural user interfaces and we've improved **ink support** on Windows 10 IoT Core with [pen interactions and Windows Ink](https://docs.microsoft.com/windows/uwp/input-and-devices/pen-and-stylus-interactions). With a compatible pen digitizer, you can now utilize DirectInk APIs for highlighter, pencil, and vector-based ink. We've also added XAML ink controls for UWP, including InkCanvas and InkToolbar, which enable stencils like rulers and protractors, and multi-modal interactions such as simultaneous pen and touch on compatible hardware.
* On certain types of IoT devices such as Point of Sale solutions, low-power line displays are important for communicating essential information to customers. We've **extended support for controlling customer facing 2x20 line displays** by enabling customization of the cursor style, brightness, blink rate, and character sets. We've also added support for custom glyphs, transaction descriptors, and marquee mode for scrolling text.

## Preview Features for Dev and Test Scenarios
___ 
* **Component Update Service [Preview]** allows OEMs to globally manage their apps and push updates for the operating system, apps, settings, and files from the cloud to devices to keep them up to date and secure.
* **Container Hosting** at the edge for [Nano Server Containers](https://docs.microsoft.com/virtualization/windowscontainers/about/index) on 64-bit editions of Windows 10 IoT Core enables applications and their data can be isolated from each other and quickly moved from development to production or cloud to the edge.
* **Windows Device Health Attestation [Preview]** uses hardware features and cloud services to provide tamper proofing and remote attestation of device health based on hardware-level metrics and attested data.
* **Azure IoT Edge on Windows 10 IoT Core [Preview]** allows IoT solutions to [orchestrate intelligence between the cloud and edge devices](https://azure.microsoft.com/campaigns/iot-edge/) to ensure applications and services can act on IoT data wherever it makes the most sense.
* **Azure IoT Hub Device Provisioning Service [Preview]** enables Windows 10 IoT devices to be created with a common image during manufacturing and configured to [connect automatically at first boot to Azure IoT Hub](https://blogs.windows.com/buildingapps/2017/10/05/windows-10-iot-enables-complete-iot-lifecycle/) to retrieve device-specific provisioning information.
* **Azure IoT Device Management [Preview]** enables IoT operators to [manage device configuration](https://docs.microsoft.com/windows/iot-core/manage-your-device/AzureIoTDM) such as installed applications, Windows updates, certificates, and network settings remotely from the cloud.

## Additional Resources
___ 

[Release Notes](https://docs.microsoft.com/en-us/windows/iot-core/release-notes/commercial/)

[Downloads]({{site.baseurl}}/{{page.lang}}/Downloads)

[Privacy Statement](https://go.microsoft.com/fwlink/?LinkId=521839)
