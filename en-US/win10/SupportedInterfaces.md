---
layout: default
title: Supported Peripheral Interfaces and Protocols
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---

##Supported Peripheral Interfaces and Protocols

Windows 10 IoT Core supports a variety of peripheral interfaces and protocols. Here is a list on the ones which have been validated on the **Raspberry Pi 2** and **MinnowBoard Max**:

{:.table.table-bordered}
| Interface              | Raspberry Pi 2                             | MinnowBoard Max                            |
|------------------------|--------------------------------------------|--------------------------------------------|
| AllJoin                | Yes                                        | Yes                                        |
| Audio (analog)         | Yes (onboard)                              | No                                         |
| Audio (digital)        | No (via HDMI)                              | Yes (via HDMI)                             |
| Audio (USB)            | Yes (via USB adapter)                      | Yes (via USB adapter)                      |
| Bluetooth v4.0         | Yes (LE/GATT, RFCOMM, HID) via USB adapter | Yes (LE/GATT, RFCOMM, HID) via USB adapter |
| Ethernet               | Yes (10/100 mbps)                          | Yes (10/100/1000 mbps)                     |
| GPIO                   | Yes (13 pins)                              | Yes (8 pins)                               |
| HDMI                   | Yes                                        | Yes (micro HDMI)                           |
| I2C                    | Yes                                        | Yes                                        |
| Micro SD (SDIO)        | Yes                                        | Yes                                        |
| SPI                    | Yes                                        | Yes                                        |
| UART (onboard)         | No (3.3V)                                  | 2x UARTs (TTL-level)                       |
| UART (USB)             | Yes (via USB adapter)                      | Yes (via USB adapter)                      |
| USB                    | 4xUSB 2.0 (host)                           | 1xUSB 2.0 (host), 1xUSB 3.0 (host)         |
| WiFi                   | No                                         | Yes (via USB adapter)                      |
