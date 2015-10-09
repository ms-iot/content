---
layout: default
title: Lightning Weather Station
permalink: /en-US/win10/LightningWeatherStation.htm
lang: en-US
---

{:.thin-header}
#Weather Station + Lightning

The new Windows.Devices namespace from the Universal Windows Platform (UWP) APIs in Windows 10, enable developers to leverage the power of Windows while interacting with the real world via sensors and actuators.

This project uses the I2C bus and general purpose input/output (GPIO) ports available on the Raspberry Pi 2, to create an internet connected weather station using the SparkFun weather shield.

The instructions provided will give a developer first-hand experience setting up the required hardware along with writing and debugging the newly available Windows 10, UWP Windows.Devices API's. This lab will also demonstrate how to aggregate your data in cloud using the Azure Event Hub, via the easy-to-use ConnectTheDots API.

{:.thin-header}
##Hardware

Pinout Diagram (Raspberry Pi 2 --> Sparkfun weather shield):

* GND-------(black)------GND
* 5V----------(red)---------VIN
* 3V3-------(brown)------5V (shield hack; not a typo)
* GPIO2-----(yellow)----SDA
* GPIO3----(orange)----SCL
* GPIO5-----(green)-----D8
* GPIO6-----(blue)-------D7