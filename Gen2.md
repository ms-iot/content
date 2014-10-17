---
layout: code
title: Intel Galileo Gen 2 Alpha Support
permalink: /Gen2.htm
---

# Welcome!
The Microsoft IoT Team is pleased to make this **Alpha** release of Windows for the Intel Galileo Gen 2 available to the community!

This release contains the following:

1. An updated **Alpha** Windows Image ([WIM](http://go.microsoft.com/fwlink/?LinkID=513083&clcid=0x409){:target="_blank"}) that supports the Intel Galileo Gen 2
2. An updated **Alpha** Microsoft Installer ([MSI](http://go.microsoft.com/fwlink/?LinkID=513082&clcid=0x409){:target="_blank"}) that supports targeting the Intel Galileo Gen 2 and the Intel Galileo Gen 1 
3. An updated **Alpha** Open Source NuGet Package - installed as part of project creation through the MSI

The intent of this release is to announce and enable support for Gen 2, get the community experimenting and providing feedback about Gen 2 support.

# New Lightning Functionality
In addition to fundamental Windows support for the Intel Galileo Gen 2, we are pleased to announce performance improvements for I/O.
These performance improvements, called **Lightning**, represent a re-architecture of the user mode/kernel driver model for pin hardware I/O in Windows.
As a programmer you access the pins exactly the same. The response time is improved for you.

All digital pins are faster than on Gen 1, but **Lightning** improvements are best realized in the following order (most improved first, all on the same line are the same):

1. GPIO fabric pins - D0, D1, D2, D3, D10, D12
2. GPIO legacy pins - D4, D5, D6, D9, D11, D13
3. GPIO port expander pins - D7, D8

All analog pins have improved performance for ADC and PWM, as well.

#Setup Instructions
Just follow the instructions for [Setting up your PC](SetupPC.htm){:target="_blank"}

# Upcoming releases
This **Alpha** release:

* Contains a separate WIM for Gen2. We will be enabling 1 Windows image for both Galileo platforms in an upcoming release.
* Enables targeting Gen1 and Gen2 platforms separately when Visual Studio creates a new project. We will be enabling targeting of both Galileo Platforms with 1 project in an upcoming release.
* Supports Digital I/O (GPIO, I2C, SPI, UART). 
* Supports Analog I/O (PWM, ADC).
* Only support **Lighting** for Gen2. We are evaluating **Lightning** support for Gen1.

# Compatibility Notes
This **Alpha** release is intended to enable experimentation with the Intel Galileo Gen 2, and specifically the new **Lightning** I/O.

Microsoft is making no committment with this release of maintaining backward compatibility of existing Galileo Gen1 Sketches and programs. As we move Gen 2 support out of **Alpha** we will offer this support.

---
[&laquo; Return to Homepage](index.htm){: .btn .btn-default}