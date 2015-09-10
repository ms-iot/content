---
layout: default
title: Supported Peripheral Interfaces and Devices
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---

##Supported Peripheral Interfaces and Devices

Windows 10 IoT Core supports a variety of peripheral interfaces and protocols. Here is a list of what's been validated on the **Raspberry Pi 2** and **MinnowBoard Max**:

{:.table.table-bordered}
|-----------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------------------|
| Interface       | Raspberry Pi 2                                         | MinnowBoard Max                                        | Reference Peripheral                                               |
|-----------------|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------------------|
| AllJoyn         | [Yes][1]                                               | [Yes][1]                                               | * [Aeon Labs DSA02203-ZWUS Z-Wave Z-Stick Series 2 USB Dongle][20] <br> * [Aeon Labs DSC24-ZWUS Smart Switch Z-Wave Appliance Module][20] |
| Audio (analog)  | Yes (onboard 3.5 mm stereo phone jack)                 | No                                                     | [Rpi2 3.5 mm TRRS Audio/Video Jack][34] |
| Audio (digital) | No                                                     | Yes (via HDMI)                                         |  |
| Audio (USB)     | Yes (via USB adapter)                                  | Yes (via USB adapter)                                  | [Sabrent USB External Stereo Sound Adapter, Model AU-EMAC][12][^1] |
| Bluetooth v4.0  | [Yes][31] ([LE/GATT][32], RFCOMM, HID) via USB adapter | [Yes][31] ([LE/GATT][32], RFCOMM, HID) via USB adapter | * [Mini USB Bluetooth CSR V4.0 Adapter][13] <br> * [ORICO BTA-403 Mini Bluetooth 4.0 USB Dongle][2] <br> * [Mini Bluetooth Keyboard with Built-in Touchpad, Model: IS11-BT05][14] |
| Ethernet        | Yes (10/100 Mbps)                                      | Yes (10/100/1000 Mbps)                                 |  |
| GPIO            | [13x GPIOs][3]                                         | [10x GPIOs][4]                                         |  |
| HDMI            | Yes                                                    | Yes (micro HDMI)                                       | [Chalkboard Electronics 7\" LCD multi-touch display][35][^3] |
| I<sup>2</sup>C  | [Yes][5]                                               | [Yes][6]                                               | * [Sparkfun ADXL345 accelerometer board][26] <br> * [MCP23008 8-bit I/O Port Expander][27] |
| Micro SD (SDIO) | [Yes][7]                                               | [Yes][8]                                               | [Universal Media Reader F4U003][23] |
| SPI             | [2x SPI][9]                                            | [Yes][10]                                              | * [Sparkfun ADXL345 accelerometer board][28] <br> * [Monochrome 1.3” 128x64 OLED graphic display][29] |
| UART (onboard)  | No                                                     | [2x UART][11]                                          | [USB-to-TTL Adapter][25] |
| UART (USB)      | Yes (via USB adapter)                                  | Yes (via USB adapter)                                  | * [USB-to-TTL Adapter][24] <br> * [Arduino Leonardo][33] |
| USB             | 4x USB 2.0 (host)                                      | 1x USB 2.0 (host), 1x USB 3.0 (host)                   | * [Sabrent USB 2.0 Floppy Disk Drive][19] <br> * [Perixx Peripad-201 Plus Slim USB Keyboard][21] <br> * [Perixx Peripad-501 Professional Touchpad][22] <br> * [Microsoft LifeCam HD-3000][30] |
| WiFi            | Yes (via USB adapter)                                  | Yes (via USB adapter)                                  | [External USB WiFi Adapters][18] |
| HID             |                                                        |                                                        | * [Rii Mini Wireless Keyboard, Model: RT-MWK01][15] <br> * [Xbox-360 controller (wired)][16][^2] <br> * [Xbox-360 controller (wireless)][17][^2] |

*[GPIO]: General-Purpose Input/Output
*[RFCOMM]: Radio Frequency Communication
*[HDMI]: High-Definition Multimedia Interface
*[I2C]: Inter-Integrated Circuit
*[SD]: Secure Digital
*[SPI]: Serial Peripheral Interface
*[UART]: Universal Asynchronous Receiver/Transmitter
*[USB]: Universal Serial Bus
*[HID]: Human Interface Device

[1]: {{site.baseurl}}/{{page.lang}}/win10/AllJoyn.htm "AllJoyn Connectivity"
[2]: http://amzn.com/B00ESBCT56 "ORICO BTA-403 Low Energy Bluetooth 4.0 Adapter"
[3]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_GPIO "Raspberry Pi 2 GPIOs"
[4]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_GPIO "MinnowBoard Max GPIOs"
[5]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_I2C "Raspberry Pi 2 I2C bus"
[6]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_I2C "MinnowBoard Max I2C bus"
[7]: {{site.baseurl}}/{{page.lang}}/win10/SetupRPI.htm#RPi2_SDcard "Raspberry Pi 2 microSD card"
[8]: {{site.baseurl}}/{{page.lang}}/win10/SetupMBM.htm#MBM_SDcard "MinnowBoard Max microSD card"
[9]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_SPI "Raspberry Pi 2 SPI bus"
[10]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_SPI "MinnowBoard Max SPI bus"
[11]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_UART "MinnowBoard Max UART"
[12]: http://www.sabrent.com/category/audio/AU-EMAC/ "Sabrent USB External Stereo Sound Adapter, Model AU-EMAC"
[13]: http://www.amazon.com/RuiLing-Bluetooth-Adapter-Dongle-Class/dp/B00WMET36O "Mini USB Bluetooth CSR V4.0 Adapter"
[14]: http://www.newegg.com/Product/Product.aspx?Item=9SIA1GK0TS7891 "Mini Bluetooth Keyboard with Built-in Touchpad, Model: IS11-BT05"
[15]: http://www.riitek.com/goods/detail/39.htm "Rii Mini Wireless Keyboard, Model: RT-MWK01"
[16]: http://www.xbox.com/en-US/xbox-360/accessories/controllers/wired-controller "Xbox-360 controller (wired)"
[17]: http://www.xbox.com/en-US/xbox-360/accessories/controllers/wireless-controller "Xbox-360 controller (wireless)"
[18]: {{site.baseurl}}/{{page.lang}}/win10/SetupWiFi.htm#WiFi_Devices "External USB WiFi Adapters"
[19]: http://www.sabrent.com/category/accesories/SBT-UFDB/ "Sabrent USB 2.0 Floppy Disk Drive"
[20]: {{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveTutorial.htm#AllJoyn_Z_Wave "Aeon Labs Z-Wave"
[21]: http://perixx.com/en/products/perixx-pro-16.html "Perixx Peripad-201 Plus Slim USB Keyboard"
[22]: http://www.perixx.com/en/products/perixx-pro-2.html "Perixx Peripad-501 Professional Touchpad"
[23]: http://cache-www.belkin.com/support/dl/man_f4u003_pm00758_mediareader.pdf "Universal Media Reader F4U003"
[24]: {{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm#USB_TTL_Adapter "USB-to-TTL Adapter"
[25]: {{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm#MBM_UART "USB-to-TTL Adapter"
[26]: {{site.baseurl}}/{{page.lang}}/win10/samples/I2CAccelerometer.htm#I2C_Accelerometer "Sparkfun ADXL345 accelerometer board"
[27]: {{site.baseurl}}/{{page.lang}}/win10/samples/I2CPortExpander.htm#I2C_PortExpander "MCP23008 8-bit I/O Port Expander"
[28]: {{site.baseurl}}/{{page.lang}}/win10/samples/SPIAccelerometer.htm#SPI_Accelerometer "Sparkfun ADXL345 accelerometer board"
[29]: {{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm#SPI_Display "Monochrome 1.3” 128x64 OLED graphic display"
[30]: {{site.baseurl}}/{{page.lang}}/win10/samples/WebCamSample.htm#USB_WebCam "Microsoft LifeCam HD-3000"
[31]: {{site.baseurl}}/{{page.lang}}/win10/Bluetooth.htm "Bluetooth Support"
[32]: {{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm "Generic Attribute Profile Sample "
[33]: {{site.baseurl}}/{{page.lang}}/win10/samples/NodejsCylon.htm "Arduino Leonardo"
[34]: http://www.raspberrypi-spy.co.uk/2014/07/raspberry-pi-model-b-3-5mm-audiovideo-jack/ "Rpi2 3.5 mm Audio/Video Jack"
[35]: http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861 "Chalkboard Electronics 7\" LCD multi-touch display"

[^1]: Attaching an external USB sound card to RPi2 will add an extra audio endpoint (playback device) to the already existing onboard PWM headphone jack. Since the default order of the audio devices cannot be guaranteed at reboot, it is recommended that applications enumerate the audio endpoints and ensure the correct one is used.
[^2]: Currently due to a bug in the OS the Xbox-360 controller does not work.
[^3]: Firmware update of the display might be required. Refer to maunfacturer's page for instructions.
