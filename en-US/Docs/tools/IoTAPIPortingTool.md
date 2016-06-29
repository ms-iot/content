---
layout: default
title: Windows 10 IoT Core API Porting Tool
permalink: /en-US/Docs/tools/IoTAPIPortingTool.htm
lang: en-US
---

# Windows 10 IoT Core API Porting Tool

IoT Core only supports a subset of the Win32 and .Net API surface area available on various prior versions of Windows. This tool will scan your binaries and give you a report of the APIs these binaries use that aren't avialable, and give suggestions for possible replacements. This will both help with estimating the cost of a port to IoT Core as well as help you along the way.


## Usage

The Windows 10 IoT Core API Porting Tool can be found in the [ms-iot/iot-utilities](https://github.com/ms-iot/iot-utilities) github repository.  Download the repository [zip](https://github.com/ms-iot/iot-utilities/archive/master.zip) the repository zip and copy the IoTAPIPortingTool folder to your local machine.  Open **IoTAPIPortingTool.sln** in Visual Studio 2015 and build the project.  This will generate `IotAPIPortingTool.exe`.

You can use the tool by running `IoTAPIPortingTool.exe <path> [-os]`.

*  `<path>` should provide the path to the directory of where your exe and/or dll files are located.

*  `-os` should be specified if you are not planning to use UWP.  By default, the tool validates your binaries against the Windows UWP platform.

        NOTE: IoTAPIPortingTool.exe must be run from a Visual Studio Developer Command Prompt.

## Output

The tool will generate a comma separated values (csv) file named `IoTAPIPortingTool.csv` (or, `IoTAPIPortingToolOS.csv` if -os is specified) and a summary will be on the command line. Open the `.csv` file in Excel to analyze the complete output.
