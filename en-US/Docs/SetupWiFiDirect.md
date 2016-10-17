---
layout: docs
title: Using WiFi Direct on your Windows 10 IoT Core device
description: Learn how to use Wifi Direct on your Windows 10 IoT Core device
keyword: wifi, wifi direct, windows iot, device, wireless
permalink: /en-US/Docs/SetupWiFiDirect.htm
lang: en-US
---

# Using WiFi Direct on your Windows 10 IoT Core device

WiFi Direct is supported on Windows 10 IoT Core devices through the use of a WiFi Direct enabled USB WiFi adapter. To make sure that WiFi Direct is enabled two things need to be true:
* the hardware of the USB WiFi adapter needs to support WiFi Direct,
* the corresponding driver of the USB WiFi adapter needs to support WiFi Direct. 

WiFi Direct provides a solution for WiFi device-to-device connectivity without the need for either a Wireless Access Point (wireless AP) to setup the connection. Take a look at the UWP APIs available in the [Windows.Devices.WiFiDirect namespace](https://msdn.microsoft.com/en-us/library/windows/apps/windows.devices.wifidirect.aspx){:target="_blank"} to see what you can do with WiFiDirect.

### <a name="WiFi_Devices"></a>Supported Adapters

A list of WiFi adapters that have been tested on Windows 10 IoT Core can be found on our [Supported Hardware]({{site.baseurl}}/{{page.lang}}/Docs/HardwareCompatList.htm#WiFi-Dongles){:target="_blank"} page. Look in the notes for "WiFiDirect supported" to discover the WiFiDirect enabled adapters.

### Basic sample for WiFi Direct

    Coming Soon
