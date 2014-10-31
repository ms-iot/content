---
layout: code
title: Intel Galileo Gen 1 and Gen2 Lighning Support
permalink: /Lightning.htm
---

# New Lightning Functionality
In addition to fundamental Windows support for the Intel Galileo Gen 1 and Gen 2, we are pleased to announce performance improvements for I/O on both platforms.
These performance improvements, called **Lightning**, represent a re-architecture of the user mode/kernel driver model for pin hardware I/O in Windows.
As a programmer you access the pins exactly the same. The response time is improved for you.

All digital pins are faster than without **Lightning**, but **Lightning** improvements are best realized in the following order (most improved first, all on the same line are the same):

1. GPIO fabric pins - D0, D1, D2, D3, D10, D12
2. GPIO legacy pins - D4, D5, D6, D9, D11, D13
3. GPIO port expander pins - D7, D8

All analog pins have improved performance for ADC and PWM, as well.

#Setup Instructions
Just follow the instructions for [Setting up your PC](SetupPC.htm){:target="_blank"}

# This Release
* Contains a single WIM for Intel Galileo Gen1 and Gen2. 
* Enables targeting Intel Galileo Gen1 and Gen2 platforms agnostically when Visual Studio creates a new project. 
* Supports Digital I/O (GPIO, I2C, SPI, UART) for Intel Galileo Gen1 and Gen2.
* Supports Analog I/O (PWM, ADC) for Intel Galileo Gen1 and Gen2.
* Supports **Lighting** for Intel Galileo Gen1 and Gen2. 

---
[&laquo; Return to Homepage](index.htm){: .btn .btn-default}