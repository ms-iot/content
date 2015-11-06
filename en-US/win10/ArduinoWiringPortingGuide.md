---
layout: default
title: Project Setup
permalink: /en-US/win10/ArduinoWiringPortingGuide.htm
lang: en-US
---

# Arduino Wiring Porting Guide

Arduino Wiring sketches and libraries can be copy/pasted into an Arduino Wiring project inside Visual Studio and ran on Raspberry Pi 2 or Minnowboard Max. Sometimes there are slight modifications that need to be made to these files in order to make them more compatable with the Windows environment, or the board you are working with. This guide will cover those modifications as well as common issues that you may run into when deploying Arduino Wiring projects!

### Missing Something?
Need more information on [Setting up Arduino Wiring in Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)?

## Index

### Porting
- <a href="#port_pins">Updating Pin Numbers</a>
- <a href="#port_serial">Remove References to "Serial"</a>
	
### Common Problems
- <a href="#prob_missingiot">Can't find "Arduino Wiring Application" Visual C++ project template in Visual Studio</a>
- ERROR: <a href="prob_hardwareserial">unresolved external symbol "class HardwareSerial Serial"</a>



## Porting

<a name="port_pins"></a>

### Updating Pin Numbers

It might go without saying, but many sketches and libraries (especially those for arduino shields) may contain references to specific pins for Arduino devices. You'll want to customize your sketches to use pin numbers that are appropriate for the device you are working on.

We've provided some values which correspond to pins on specific boards. You can always use the pin numbers directly, but you may also choose to use the pre-defined values.

For example, you may provide power to GPIO pin 5 on a Raspberry Pi 2 by using either of the following commands

{% highlight C++ %}

pinMode( 29, OUTPUT );
digitalWrite( 29, HIGH );

{% endhighlight %}

or

{% highlight C++ %}

pinMode( GPIO_5, OUTPUT );
digitalWrite( GPIO_5, HIGH );

{% endhighlight %}

The pre-defined pins can be found in `PinNumbers.h` inside any Arduino Wiring project, but since there will be different pins available depending on the hardware setup you are building for, we've also included a table here to describe which pin defines are available for each device.

#### Raspberry Pi 2

[Pinout Diagram]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

{:.table.table-bordered}
| Pin Define      | Corresponding Pin Number   |
| -------------| ------------- |
| LED_ONBOARD | *onboard LED* |
| GPIO_* _where * refers to [0, 27]_  | *refer to pinout diagram* |
| GPIO_GCLK | 7 |
| GPIO_GEN* _where * refers to [0, 5]_ | *refer to pinout diagram* |
| I2C_SCL1 | 5 |
| I2C_SDA1 | 3 |
| SPI_CS0 | 24 |
| SPI_CS1 | 26 |
| SPI_CLK | 23 |
| SPI_MISO | 21 |
| SPI_MOSI | 19 |
| RXD0 | 10 |
| TXD0 | 8 |

#### Minnowboard Max

[Pinout Diagram]({{site.baseurl}}/images/PinMappings/MBM_Pinout.png)

{:.table.table-bordered}
| Pin Define      | Corresponding Pin Number   |
| -------------| ------------- |
| LED_ONBOARD | *onboard LED* |
| GPIO_* _where * refers to [0, 9]_  | *refer to pinout diagram* |
| I2C_SCL | 13 |
| I2C_SDA | 15 |
| SPI_CS0 | 5 |
| SPI_SCLK | 11 |
| SPI_MISO |7 |
| SPI_MOSI | 9 |
| UARAT1_CTS | 10 |
| UARAT1_RTS | 12 |
| UARAT1_RX | 8 |
| UARAT1_TX | 6 |
| UARAT2_RX | 19 |
| UARAT2_TX | 17 |

<a name="port_serial"></a>

### Removing References to "Serial"

Many Arduino sketches use `Serial` to print data to the serial console (if opened) or to write to the serial lines (USB or tx/rx). We've provided a "Log" function which will print a WCHAR* type (ascii strings or wide character strings) to the output console in Visual Studio. If you are copying a sketch built for an Arduino, you'll need to replace any of these Serial references in the Windows IoT version of the sketch.

In the table below, replace the Arduino API Serial reference with the syntax in the Windows IoT column. If an API should be removed entirely, you'll see *remove* in the Windows IoT column.

{:.table.table-bordered}
| Arduino API syntax      | Windows IoT syntax   |
| -------------| ------------- |
| Serial.begin( int )  | *remove* |
| Serial.write( char* str )     | *remove* *see below     |
| Serial.print( char* str ) | Log( str )     |
| Serial.print( int num ) | Log( num.ToString()->Begin() )      |
| Serial.print( int num, format fmt ) | Log( num.ToString()->Begin() )      |


####Why remove Serial.write()?

Serial.write() is typically used to send raw data over the serial lines. Windows IoT Core does not currently have UART functionality (don't worry, it's coming soon!) so these types of calls should be avoided.



## Common Problems

<a name="prob_missingiot"></a>

### Can't find "Arduino Wiring Application" Visual C++ project template in Visual Studio

You must install the Visual Studio Extension for Windows IoT Project Templates before you can create Arduino Wiring projects in Visual Studio. Head over to [Windows IoT Core Project Templates extension page](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec) to download the extension from the Visual Studio Gallery!

<a name="prob_hardwareserial"></a>

### ERROR: 'unresolved external symbol "class HardwareSerial Serial"'

This issue occurs when there are `Serial` references are left in your Arduino Wiring sketches or libraries. You can use the "File" and "Line" fields on this error to locate the reference, and then use the <a href="#port_serial">Removing References to "Serial"</a> section of this page to resolve the issue.
