---
layout: default
title: Performance Report
permalink: /en-US/win10/LightningPerformance.htm
lang: en-US
---

## Windows IoT Lightning Performance Testing

The GPIO performance was tested for Windows IoT Lightning functionality using a simple GPIO toggle app. 
The tests were performed by toggling GPIO 5 between 0 and 1 at the fastest possible speed. The toggle frequency for each case was measured using a Tektronix TDS 2012C Oscilloscope. The following results were obtained from the analysis:

{:.table.table-bordered}
| Platform Tested                         | Language                          | Frequency  | Tested on      | 
| -------------------------------------   | --------------------------------- | ---------- | -------------- |
| Arduino Uno                             | Arduino Sketch                    | 75.06 kHz  | 10/08/2015     |
| Windows 10 IoT Core TH1                 | C#                                | 41.15 kHz  | 10/29/2015     |
| Windows 10 IoT Core TH2 Native Stack    | C# with .NET Native tool chain    | ~40 kHz    | 10/29/2015     |
| Windows 10 IoT Core TH2 Native Stack    | C# without .NET Native tool chain | 95.5 kHz   | 10/29/2015     |
| Windows 10 IoT Core TH2 Native Stack    | C++/CX                            | 107.8 kHz  | 10/28/2015     |
| Windows 10 IoT Core TH2 Native Stack    | WinJS                             | 17.4 kHz   | 10/28/2015     |
| Windows 10 IoT Core TH2 Arduino Wiring  | Arduino Wiring                    | **6.05 MHz**   | 10/28/2015     |
| Windows 10 IoT Core TH2 DMAP Stack      | C# with .NET Native tool chain    | 135.1 kHz  | 11/13/2015     |
| Windows 10 IoT Core TH2 DMAP Stack      | C# without .NET Native tool chain | **1.45 MHz**   | 11/13/2015     |
| Windows 10 IoT Core TH2 DMAP Stack      | C++/CX                            | **4.71 MHz**   | 11/13/2015     |
| Windows 10 IoT Core TH2 DMAP Stack      | WinJS                             | 23.4 kHz   | 10/28/2015     |
| Remote Arduino - Bluetooth              | C#                                | 1.92 kHz   | 10/29/2015     |
| Remote Arduino - USB                    | C#                                | 1.97 kHz   | 10/29/2015     |
| Arduino Providers*                      | C#                                | 1.96 kHz   | 11/13/2015     |

\* The Arduino Provider tests were done using a Raspberry Pi 2 connected to an Arduino Uno via USB. A serial baud rate of 115200 was used.
