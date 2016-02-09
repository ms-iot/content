---
layout: default
title: Windows 10 IoT Core API Porting Tool
permalink: /en-US/win10/tools/IoTAPIPortingTool.htm
lang: en-US
---

# Windows 10 IoT Core API Porting Tool

Are the APIs that your current Win32 application or library depend on available in Windows 10 IoT Core?  If not, are there equivalent APIs you can use?  This tool can answer these questions for you and assist you in migrating your current Win32 applications and libraries to Windows IoT Core.

## Usage

The Windows 10 IoT Core API Porting Tool can be found in the [ms-iot/iot-utilities](https://github.com/ms-iot/iot-utilities) github repository.  Download the repository [zip](https://github.com/ms-iot/iot-utilities/archive/master.zip) the repository zip and copy the IoTAPIPortingTool folder to your local machine.  Open **IoTAPIPortingTool.sln** in Visual Studio 2015 and build the project.  This will generate `IotAPIPortingTool.exe`.

You can use the tool by running `IoTAPIPortingTool.exe <path> [-os]`.

*  `<path>` should provide the path to the directory of where your exe and/or dll files are located.

*  `-os` should be specified if you are not planning to use UWP.  By default, the tool validates your binaries against the Windows UWP platform.

        NOTE: IoTAPIPortingTool.exe must be run from a Visual Studio Developer Command Prompt.

## Output

The tool will generate a comma separated values (csv) file named `IoTAPIPortingTool.csv` (or, `IoTAPIPortingToolOS.csv` if -os is specified) and a summary will be on the command line. Open the `.csv` file in Excel to analyze the complete output.
