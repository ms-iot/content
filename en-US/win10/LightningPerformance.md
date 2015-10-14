---
layout: default
title: Performance Report
permalink: /en-US/win10/LightningPerformance.htm
lang: en-US
---

##Windows IoT Lightning Performance Testing

The GPIO performance was tested for Windows IoT Lightning functionality using a simple GPIO toggle app. 
The tests were performed by toggling GPIO 5 between 0 and 1 at the fastest possible speed. The toggle frequency for each case was measured using a Tektronix TDS 2012C Oscilloscope. The following results were obtained from the analysis:

| Platform Tested                         | Language          | Frequency  |
| -------------------------------------   | ----------------- | ---------- |
| Arduino Uno                             | Arduino Sketch    | 75.06 kHz  |
| Windows 10 IoT Core without Lightning   | C++               | 43.55 kHz  |
| Windows 10 IoT Core with Lightning      | Arduino Sketch    | **4.03 MHz**   |
| Windows 10 IoT Core with Lightning      | C++               | **2.87 MHz**   |
| Windows 10 IoT Core with Lightning      | C#                | 224.2 kHz  |