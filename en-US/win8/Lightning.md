---
layout: default
title: Intel Galileo Gen 1 and Gen2 Lightning Support
permalink: /en-US/win8/Lightning.htm
lang: en-US
---

# New Lightning Functionality
In addition to fundamental Windows support for the Intel Galileo Gen 1 and Gen 2, we are pleased to announce performance improvements for I/O on both platforms.
These performance improvements, called **Lightning**, represent a re-architecture of the user mode/kernel driver model for pin hardware I/O in Windows via the Windows Developer Program for IoT.
As a programmer you access the pins exactly the same. The response time is improved for you.

All analog and digital pins are faster than without **Lightning**.

#Setup Instructions
Please follow the instructions for [Setting up your PC](SetupPC.htm){:target="_blank"} as the Visual Studio extension has been updated to support Lightning on Gen1 and Gen2.

# This Release
* Contains a single WIM for Intel Galileo Gen1 and Gen2.
* Enables targeting Intel Galileo Gen1 and Gen2 platforms agnostically when Visual Studio creates a new project.
* Supports Digital I/O (GPIO, I2C, SPI, UART) for Intel Galileo Gen1 and Gen2.
* Supports Analog I/O (PWM, ADC) for Intel Galileo Gen1 and Gen2.
* Supports **Lightning** for Intel Galileo Gen1 and Gen2.
