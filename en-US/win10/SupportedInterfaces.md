---
layout: default
title: Supported Peripheral Interfaces and Protocols
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---

##Supported Peripheral Interfaces and Protocols

Windows 10 IoT Core supports a variety of peripheral interfaces and protocols. Here is a list of what's been validated on the **Raspberry Pi 2** and **MinnowBoard Max**:

{:.table.table-bordered}
| Interface              | Raspberry Pi 2                                                     | MinnowBoard Max                                                    |
|------------------------|--------------------------------------------------------------------|--------------------------------------------------------------------|
| AllJoin                | <a href="{{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm">Yes</a> | <a href="{{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm">Yes</a> |
| Audio (analog)         | Yes (onboard)                              | No                                          |
| Audio (digital)        | No                                         | Yes (via HDMI)                              |
| Audio (USB)            | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>) | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>)  |
| Bluetooth v4.0         | Yes (LE/GATT, RFCOMM, HID) via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a> | Yes (LE/GATT, RFCOMM, HID) via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a> |
| Ethernet               | Yes (10/100 Mbps)                          | Yes (10/100/1000 Mbps)                      |
| GPIO                   | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm">13x GPIOs</a> | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm">10x GPIOs</a> |
| HDMI                   | Yes                                        | Yes (micro HDMI)                            |
| I2C                    | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm">Yes</a> | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm">Yes</a> |
| Micro SD (SDIO)        | <a href="{{site.baseurl}}/{{page.lang}}/win10/SetupRPI.htm#RPi2_SDcard">Yes</a> | <a href="{{site.baseurl}}/{{page.lang}}/win10/SetupMBM.htm#MBM_SDcard">Yes</a> |
| SPI                    | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm">2x SPI</a> | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm">Yes</a> |
| UART (onboard)         | No                                         | <a href="{{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm">2x UART</a> |
| UART (USB)             | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>) | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>) |
| USB                    | 4x USB 2.0 (host)                          | 1x USB 2.0 (host), 1x USB 3.0 (host)        |
| WiFi                   | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>) | Yes (via <a href="{{site.baseurl}}/{{page.lang}}/win10/SupportedInterfaces.htm#USB_Devices">USB adapter</a>) |

##<a name="USB_Devices"></a>Compatible USB Peripheral Devices

Windows 10 IoT Core is compatible with a variety of USB devices. Here are the devices which have been validated on both the **Raspberry Pi 2** and **MinnowBoard Max**:

{:.table.table-bordered}
| Device              | Notes   |
|----------------------------------|-----------------------------------------------------|
| Powered external USB hub         |     |
| USB keyboard (wired)             |     |
| USB mouse (wired & wireless)     |     |
| Wired Xbox 360 controller        |     |
| Wireless Xbox 360 controller     |     |
| Touchpad (wired & wireless)      |     |
| NumPad (wired)                   |     |
| USB Ethernet adapter             |     |
| External USB hard disk           |     |
| USB flash drive                  |     |
| USB card reader                  |     |
| USB sound card                   | Attaching an external USB sound card to RPi2 will add an extra audio endpoint (playback device) to the already existing onboard PWM headphone jack. Since the default order of the audio devices cannot be guaranteed at reboot, it is recommended that applications enumerate the audio endpoints and ensure the correct one is used. |

