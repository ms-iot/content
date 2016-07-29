---
layout: docs
title: Bluetooth support
description: Information about Bluetooth support on Windows 10 IoT Core
keyword: bluetooth, bt, windows iot, device, wireless
permalink: /en-US/Docs/Bluetooth.htm
lang: en-US
---

# Bluetooth Support
Windows 10 IoT Core supports Bluetooth 4.0. A list of supported Bluetooth dongles can be found in the [Hardware Compatibility List]({{site.baseurl}}/{{page.lang}}/Docs/SupportedInterfaces.htm#Bluetooth-Dongles).

## Supported Bluetooth Profiles
IoT Core supports the following Bluetooth profiles:

1.  Human Interface Device Profile [HID](https://www.microsoftstore.com/store/msusa/en_US/pdp/Microsoft-Universal-Foldable-Keyboard/productID.315201200)

2.  Radio Frequency Communication [RFCOMM](https://github.com/ms-iot/remote-wiring)

3.  Generic Attribute Profile [GATT]({{site.baseurl}}/{{page.lang}}/Samples/BLEGatt.htm)

## Connecting Bluetooth devices using the device portal
When using one of the [Windows 10 IoT Core Release Image](https://developer.microsoft.com/en-us/windows/iot/downloads){:target="_blank"} Bluetooth devices can be paired with the Windows IoT Core device using the device portal. When navigating to the Bluetooth tab the device will look for Bluetooth devices and will also be discoverable to other Bluetooth devices. The picture below shows an incoming pairing request. 

![Bluetooth Incoming Pairing]({{site.baseurl}}/Resources/images/Bluetooth/Portal_BT_2.png)

After the device is successfully paired it will be listed under the paired device section 

![Bluetooth Incoming Pairing]({{site.baseurl}}/Resources/images/Bluetooth/Portal_BT_3.png)
