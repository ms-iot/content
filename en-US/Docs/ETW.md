---
layout: docs
title: Using Event Tracing for Windows
description: Using Event Tracing for Windows (ETW) on a Windows 10 IoT Core device
keyword: ETW, Windows 10 IoT Core, Event Tracing for Windows
permalink: /en-US/Docs/ETW.htm
lang: en-US
---

# Using Event Tracing for Windows (ETW) on a Windows 10 IoT Core device
Event Tracing for Windows (ETW) provides developers the ability to start and stop event tracing sessions, instrument an application to provide trace events, and consume trace events.
ETW on Windows IoT Core devices supports both manifest-based and classic events, and is no different than other Windows 10 devices. 

This section will provide useful links on the basics of writing and consuming events. Find more detailed information from the [Windows Event Tracing page](https://msdn.microsoft.com/en-us/library/windows/desktop/bb968803(v=vs.85).aspx){:target="_blank"}.

## **Writing Events**
Find a UWP sample that implements the different methods of writing events as part of the [Windows Universal Samples Github](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/Logging){:target="_blank"}.
This will run on Windows IoT Core devices and is also a great code reference.

Detailed guide on writing events and obtaining GUIDs can be found [here](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364161(v=vs.85).aspx){:target="_blank"}.

## **Consuming Events**
Events are either saved to an ETL file or captured in real-time.
Use [FTP]({{site.baseurl}}/{{page.lang}}/Docs/FTP.htm){:target="_blank"} or [Windows File Sharing]({{site.baseurl}}/{{page.lang}}/Docs/WindowsFileSharing.htm){:target="_blank"} to retrieve ETL files from Windows IoT Core devices.

## Use Tools in Windows Assessment and Deployment Kit
Windows Assessment and Deployment Kit includes 3 tools to help capture and analyze events. [Click here to download](http://go.microsoft.com/fwlink/p/?LinkId=526740){:target="_blank"}.


**1 Windows Performance Analyzer** visualizes ETL files on desktop, with a step by step guide [here](https://msdn.microsoft.com/en-us/library/windows/hardware/dn927319(v=vs.85).aspx){:target="_blank"}.

**2 Xperf command line tool** captures real-time events and writes them to an ETL file.
This tool is already installed on Windows IoT Core devices, just run the following commands on the devices:

```
// Start capturing events from specific GUID and save them to an ETL file
xperf -start <Session Name> -f <ETL File> -on <GUID>

// Stop capturing events with the specified session name
xperf -stop <Session Name>
```

**3 Tracerpt command line tool** converts ETL files into xml files.

```
// Generate dumpfile.xml from ETL file
tracerpt <ETL File>
```

## Use Device Portal
Device portal can capture events in real-time, with instructions [here](https://msdn.microsoft.com/en-us/windows/uwp/debug-test-perf/device-portal){:target="_blank"}.
Note this method does not produce an ETL file for further analysis, but requires minimal setup.

## Use Function Calls 
Enable an application to consume events from an ETL file or in real-time using function calls.
Learn how to use these functions [here](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363692(v=vs.85).aspx){:target="_blank"}.
