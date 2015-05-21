---
layout: default
title: Windows 10 IoT Core API Porting Tool
permalink: /en-US/win10/tools/IoTAPIPortingTool.htm
lang: en-US
---

#Windows 10 IoT Core API Porting Tool

Are the APIs that your current Win32 application or library depend on available in Windows 10 IoT Core?  If not, are there equivalent APIs you can use?  This tool can answer these questions for you and assist you in migrating your current Win32 applications and libraries to Windows IoT Core.

##Usage

You can find `IoTAPIPortingTool.exe` under `C:\Program Files (x86)\Microsoft IoT`.  It is installed by running `WindowsDeveloperProgramforIoT.msi` (which can be found in the download location where you downloaded this documentation).

You can use the tool by running `C:\Program Files (x86)\Microsoft IoT\IoTAPIPortingTool.exe <path> [-os]`.

*  `<path>` should provide the path to the directory of where your exe and/or dll files are located.

*  `-os` should be specified if you are not planning to use UAP.  By default, the tool validates your binaries against the Windows UAP platform.

        NOTE: IoTAPIPortingTool.exe must be run from a Visual Studio Developer Command Prompt.

##Output

The tool will generate a comma separated values (csv) file named `IoTAPIPortingTool.csv` (or, `IoTAPIPortingToolOS.csv` if -os is specified) and a summary will be on the command line. Open the `.csv` file in Excel to analyze the complete output.
