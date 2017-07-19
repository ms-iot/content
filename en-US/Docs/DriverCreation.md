---
layout: docs
title: Driver Creation
description: Create a Universal Driver for your Windows 10 IoT Core device
permalink: /en-US/Docs/DriverCreation.htm
lang: en-US
---

# Driver Creation

This document will walk you through the creation of Universal Drivers for your IoT Core device.

Universal Drivers enable you to create a single driver package that runs across several device types running UWP-based editions of Windows 10, including IoT Core.

This driver package contains a Universal INF file and several binaries. The requirements for each are as follows:
- Universal INF files can only use [the subset of INF syntax supported on UWP-based editions of Windows](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/using-a-universal-inf-file#which-inf-sections-are-invalid-in-a-universal-inf-file). While writing your INF file, use the [InfVerif tool](https://docs.microsoft.com/en-us/windows-hardware/drivers/devtest/infverif) to verify that the file adheres to that syntax.

- binaries can only use device driver interfaces supported on UWP-based editions of Windows 10 (marked as Universal on the documentation reference pages): [KMDF](https://docs.microsoft.com/en-us/windows-hardware/drivers/wdf/index), [UMDF 2](https://docs.microsoft.com/en-us/windows-hardware/drivers/wdf/getting-started-with-umdf-version-2), or the Windows Driver Model (WDM). They can also only call APIs included in the OneCore Subset. Use the [ApiValidator tool](https://docs.microsoft.com/en-us/windows-hardware/drivers/develop/validating-universal-drivers) to verify that the APIs your binaries call are valid.

To learn how to **create a driver package in Visual Studio**, please visit [Creating a Driver Package](https://docs.microsoft.com/en-us/windows-hardware/drivers/develop/creating-a-driver-package)

If you would like **a sample to help you create a Universal Driver on IoT Core**, please visit our [Universal Driver sample](https://developer.microsoft.com/en-us/windows/iot/samples/driverlab)

## Additional Universal Driver Resources

1. For additional details on **design principles** and **best practices** when developing a Universal Driver package, please visit [Getting Started with Universal Drivers](https://docs.microsoft.com/en-us/windows-hardware/drivers/develop/getting-started-with-universal-drivers)

2. For help **debugging your Universal Driver**, please visit [Debugging a Universal Windows driver](https://docs.microsoft.com/en-us/windows-hardware/drivers/develop/debugging-a-universal-driver)




