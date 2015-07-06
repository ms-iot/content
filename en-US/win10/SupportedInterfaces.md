---
layout: default
title: Supported Peripheral Interfaces and Protocols
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---

##Supported Peripheral Interfaces and Protocols

Windows 10 IoT Core supports a variety of peripheral interfaces and protocols. Here is a list of what's been validated on the **Raspberry Pi 2** and **MinnowBoard Max**:

{:.table.table-bordered}
| Interface              | Raspberry Pi 2                             | MinnowBoard Max                            |
|------------------------|--------------------------------------------|--------------------------------------------|
| AllJoin                | Yes                                        | Yes                                        |
| Audio (analog)         | Yes (onboard)                              | No                                         |
| Audio (digital)        | No                                         | Yes (via HDMI)                             |
| Audio (USB)            | Yes (via USB adapter)                      | Yes (via USB adapter)                      |
| Bluetooth v4.0         | Yes (LE/GATT, RFCOMM, HID) via USB adapter | Yes (LE/GATT, RFCOMM, HID) via USB adapter |
| Ethernet               | Yes (10/100 Mbps)                          | Yes (10/100/1000 Mbps)                     |
| GPIO                   | 13x GPIOs                                  | 10x GPIOs                                  |
| HDMI                   | Yes                                        | Yes (micro HDMI)                           |
| I2C                    | Yes                                        | Yes                                        |
| Micro SD (SDIO)        | Yes                                        | Yes                                        |
| SPI                    | 2x SPI                                     | Yes                                        |
| UART (onboard)         | No                                         | 2x UART                                    |
| UART (USB)             | Yes (via USB adapter)                      | Yes (via USB adapter)                      |
| USB                    | 4x USB 2.0 (host)                          | 1x USB 2.0 (host), 1x USB 3.0 (host)       |
| WiFi                   | No                                         | Yes (via USB adapter)                      |
