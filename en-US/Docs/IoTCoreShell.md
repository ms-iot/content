---
layout: docs
title: IoT Core Shell
description: An overview of how to think about and use the IoT Core Shell
keyword: windows iot, shell, foreground, background, application
permalink: /en-US/Docs/IoTCoreShell.htm
lang: en-US
---

# IoT Core Shell Overview

This document covers the IoT Core Shell, foreground and background applications, and how to navigate between these applications on your device.

## IoT Shell, Foreground, and Background Apps

Your IoT Core device runs the IoT Shell. It has many responsibilities, but its primary job is to make sure registered startup apps are launched. It has two modes: Headed and Headless. 
In Headed mode, the IoT Shell will launch a single registered startup app that will show its UI in full screen (also known as a Headed app). Headed mode assumes you have a screen connected and shows UI. In Headless mode (explained in detail [here]({{site.baseurl}}/{{page.lang}}/Docs/HeadlessMode)), there is no UI; the IoT Shell launches background applications only.

Herein lie the main differences between foreground and background applications:

- **Foreground applications** have a UI. One of these is launched at startup when the device is in headed mode. All foreground apps are registered on the device and the user can switch between foreground apps during device operation.

- **Background applications** have no UI and thus save device resources by turning off the UI stack. Background applications often run continuously from startup and are often used to monitor the device.

## Switching between apps with a Home App

There are two approaches to create a home app for IoT Core which allows you to switch between different foreground applications. Each has an associated sample on GitHub.

The **IoT Home App** ([sample]({{site.baseurl}}/{{page.lang}}/Samples/iothomeapp)) shows you how to create a simple "Home" app that can navigate back and forth between your other apps and the "Home" app.

The **IoT Startup App** ([sample]({{site.baseurl}}/{{page.lang}}/Samples/iotstartapp)) represents a simple startup app that lists the installed apps on your device, then launches one using the PackageManager APIs.

Use either one of these apps as a starting point for your multi-app experience as you see fit.

## Switching between apps with HID Injection Keys

The below instructions show you how to turn on Hotkey support through entries to the registry. If you are building your own image and want to support hotkeys without needing to access the registry, you can include an optional feature package that handles these steps for you.

The feature package to look for is called: **Microsoft-OneCore-IoTUAP-Shell-HotKeys-Feature-Package.cab** and the feature is called **IOT_SHELL_HOTKEY_SUPPORT**

The rest of this document covers how to implement this feature manually.

### Return Home

The "GO HOME" key, which returns the default headed app to the foreground, is set to the release of the Windows Button on a keyboard. If you don't have a keyboard on your IoT Device and need to inject low-level keyboard events through [HID Injection]({{site.baseurl}}/{{page.lang}}/Samples/hidinjection), or if you just want to re-map the "GO HOME" functionality to a different key in your app, you can adjust the key value in the registry. For example, to enable pressing the ESCAPE key (0x1B) to "GO HOME", enter the following command in the registry:

``
“HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys” “HOME” QWORD    0x0000000 0000001B  
``

As a REG file, this looks as follows:

``
[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys]
"Home"=hex(b):1B,00,00,00,00,00,00,00
``

### Switch Between Apps

Alternatively, if you want to switch between your foreground apps, you can set up Alt-Tab (next app) and Shift-Alt-Tab (previous app) functionality in your image by entering the following command in the registry:

``
“HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys”
“PREV” QWORD 0x00010000 00010009 
“NEXT” QWORD 0x00020000 00050009 
``

As a REG file, this looks as follows:
``
[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IoTShellExtension\HotKeys]
"Prev"=hex(b):09,00,01,00,00,00,01,00
"Next"=hex(b):09,00,05,00,00,00,02,00
``

### Bit Translation

The above REG file entries decode left to right as follows:

- Bits 0-15: Virtual Key Code (i.e. 1B,00 for ESCAPE)
- Bits 16-19: Modifier Key. 0x0 = No Modifier, 0x1 = ALT, 0x2 = CTRL, and 0x4 = SHIFT. Combining keys adds the values together (i.e. ALT+SHIFT is 0x5)
- Bits 20-31: Reserved for future modifiers; must be 0
- Bits 32-47: Reserved for future encoding control flags.
    - Bit 32: 0 = OnRelease, 1 = OnPress
    - Bit 33: 0 = Remotable, 1 = Not Remotable
- Bits 48-63: Reserved for future encoding actions 
    - Bits 48-62: Action
        - 0 = Home
        - 1 = Previous View
        - 2 = Next View
    - Bit 63: 0 = All System Actions, 1 = Reserved for Custom User Actions

