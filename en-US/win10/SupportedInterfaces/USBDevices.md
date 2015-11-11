- [WiFi Dongles](#WiFi-Dongles)
- [Bluetooth Dongles](#Bluetooth-Dongles)
- [Cameras](#Cameras)
- [Audio](#Audio)
- [Miscellaneous](#Miscellaneous)

### WiFi Dongles {#WiFi-Dongles}

{:.table.table-bordered .devices}
Part Name / No.                                 | Compatible Boards | Description                                                                                                    | Notes | Projects, Samples, Libraries |
------------------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------|-------|------------------------------|
Official Raspberry Pi WiFi dongle               | RPI2              | "Official Raspberry Pi WiFi dongle offering the best possible WiFi performance for its diminutive size."       |       |
Airlink Wireless N 150 Mini USB Adapter Adapter | MBM               | Airlink101 AWL5077 Golden 150Mbps Wireless Mini USB Adapter with WPA2, WPA, and WEP enhanced wireless security |       |
Panda PAU06                                     | MBM               | Panda 300Mbps Wireless N USB Adapter with High Gain Antenna                                                    |       |
TP-LINK TL_WN725N                               | RPI2, MBM         | TP-LINK TL-WN725N Wireless N Nano USB Adapter 150Mbps                                                          |       |
NET-DYN USB Wifi Adapter                        | MBM               | Wifi USB Adapter NET-DYN                                                                                       |       |
Realtek 8191 USB Wireless WIFI                  | MBM               | Realtek 8191 300Mbps 802.11n/g/b USB Wireless WIFI LAN Network Card Adapter                                    |       |
Realtek 8192 USB Wireless WIFI                  | MBM               | Realtek Single-Chip IEEE 802.11b/g/n 2T2R WLAN Controller with USB 2.0 Interface                               |       |

### Bluetooth Dongles {#Bluetooth-Dongles}

{:.table.table-bordered .devices}
Part Name / No.                             | Compatible Boards | Description                                                       | Notes | Projects, Samples, Libraries |
--------------------------------------------|-------------------|-------------------------------------------------------------------|-------|------------------------------|
CSR Mini USB Bluetooth V4.0 Adapter         | RPI2, MBM         | Class 2 Bluetooth 4.0 Smart Ready Adapter, low energy, dual power |       |
ORICO BTA-403 Mini Bluetooth 4.0 USB Dongle | RPI2, MBM         | Low Energy Bluetooth 4.0 Adapter USB Micro Adapter Dongle         |       |
CSR Mini USB Bluetooth V4.0 Adapter         | MBM               | Class 2 Bluetooth 4.0 Smart Ready Adapter, low energy, dual power |       |

### Cameras {#Cameras}

{:.table.table-bordered .devices}
Part Name / No.                   | Compatible Boards | Description                              | Notes                                                                      | Projects, Samples, Libraries  |
----------------------------------|-------------------|------------------------------------------|----------------------------------------------------------------------------|-------------------------------|
Microsoft Lifecam 3000 USB Camera | RPI2, MBM         | USB Webcam                               | Limited to less than 5 frames per second, no known performance workarounds | [Home Security Camera Project]|
Microsoft Lifecam HD-5000         | RPI2, MBM         | Microsoft LifeCam HD-5000 720p HD Webcam | USB 2.0                                                                    |
Logitech Webcam C210              | RPI2, MBM         | USB Webcam, 1.3mp photo                  |                                                                            |

### Audio {#Audio}

{:.table.table-bordered .devices}
Part Name / No.                                           | Compatible Boards | Description                                         | Notes                                                                                                                                                                                                                                                                                                                                  | Projects, Samples, Libraries |
----------------------------------------------------------|-------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
Sabrent USB External Stereo Sound Adapter, Model AU-EMAC1 | RPI2, MBM         | Converts USB to 3.5mm audio and microphone signals. | Attaching an external USB sound card to RPi2 will add an extra audio endpoint (playback device) to the already existing onboard PWM headphone jack. Since the default order of the audio devices cannot be guaranteed at reboot, it is recommended that applications enumerate the audio endpoints and ensure the correct one is used. |

### Miscellaneous {#Miscellaneous}

{:.table.table-bordered .devices}
Part Name / No.                                              | Compatible Boards | Description                                                                                                                                                                           | Notes                                                                                                                                                                                                                                                                                                                                                                    | Projects, Samples, Libraries                                                                                                                                                                                                    |
-------------------------------------------------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
Aeon Labs Z-Wave Z-Stick Series 2 USB Dongle DSA02203-ZWUS   | RPI2              | Series 2 Z-Wave USB Z-Stick Controller                                                                                                                                                | Easy network creation with push button pairing                                                                                                                                                                                                                                                                                                                           | [ZWave Sample]                                                                                                                                                                                                                  |
Chalkboard Electronics 7" LCD Capacitive Touchscreen Display | RPI2              | For product information see [the product website](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861) | To get this working with Windows 10 IoT Core, do the following: <br /> 1. Follow the [Firmware Update instructions]('http://www.chalk-elec.com/?p=1826') on chalk-elec.com <br /> 2. Flash firmware version 7-bf-mt-v2-2.hex onto the touchscreen <br /> 3. Hookup the HDMI and USB cables to the RPI2 <br /> 4. Power on the touchscreen first, then power on your RPI2 | [Product Webpage](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861) <br /> [Firmware Flashing Instructions](http://www.chalk-elec.com/?p=1826)|
