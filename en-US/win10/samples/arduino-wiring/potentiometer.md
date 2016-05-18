---
layout: default
title: Arduino Wiring Potentiometer Sample
permalink: /en-US/win10/samples/arduino-wiring/Potentiometer.htm
lang: en-US
---

# Arduino Wiring Potentiometer Sample
This sample shows how to connect a rotary potentiometer and LED to a Raspberry Pi 2 and 3 or a MinnowBoard Max using Arduino Wiring. We use a SPI-based ADC (Analog to Digital Converter) to read values from the potentiometer and control an LED based on the knob position.

This sample is similar to the [C# Potentiometer Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm), but uses Arduino Wiring instead of C#. The wiring and hardware configuration will be nearly identical. However, DragonBoard 410c does not currently support Arduino Wiring.

## Hardware
- Board - one of the following only
	- Raspberry Pi 2 or 3
	- MinnowBoard Max
- ADC - one of the following only
	- [1 MCP3002 10-bit ADC](http://www.microchip.com/wwwproducts/Devices.aspx?product=MCP3002){:target="_blank"} or
	- [1 MCP3008 10-bit ADC](http://www.microchip.com/wwwproducts/Devices.aspx?dDocName=en010530){:target="_blank"} or
	- [1 MCP3208 12-bit ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go){:target="_blank"}
- [1 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832){:target="_blank"}
- [1 330 &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636){:target="_blank"}
- [1 10k &#x2126; Trimmer Potentiometer](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540){:target="_blank"} or similar
- 1 breadboard and an assortment of wires

## Hardware Setup

In this sample, you have the option of using either the MCP3002, MCP3008, or MCP3208 ADC (Analog to Digital Converter). 
The differences between the chips are the number of input channels and resolution. 12-bit resolution is more accurate than the 10-bit options, and the number of channels determines how many different inputs you can read. Any of these options will work fine for this sample. 

Below are the pinouts of the MCP3002 and MCP3208 ADCs. 

| MCP3002                                                              | MCP3008 or MCP3208                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![MCP3002 Pinout]({{site.baseurl}}/Resources/images/Potentiometer/MCP3002.PNG) | ![MCP3208 Pinout]({{site.baseurl}}/Resources/images/Potentiometer/MCP3208.PNG) |

### Raspberry Pi

#### Raspbery Pi 2 and 3 Pinout

![Raspberry Pi 2 and 3 pinout]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

#### Wiring & Connections

##### MCP3002
If you chose to use the **MCP3002**, assemble the circuit as follows. Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3002. You can also refer to the [datasheet](http://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf){:target="_blank"} for more information.

Detailed connection:

![Overall Schematics]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3002.PNG)

The MCP3002 should be connected as follows:

- VDD/VREF - 3.3V on Raspberry Pi 2 or 3 (Pin 1)
- CLK - "SPI0 SCLK" on Raspberry Pi 2 or 3 (Pin 23)
- Dout - "SPI0 MISO" on Raspberry Pi 2 or 3 (Pin 21)
- Din - "SPI0 MOSI" on Raspberry Pi 2 or 3 (Pin 19)
- CS/SHDN - "SPI0 CS0" on Raspberry Pi 2 or 3 (Pin 24)
- Vss - GND on Raspberry Pi 2 or 3 (Pin 6 or any other GND pin)
- CH0 - Potentiometer wiper pin


##### MCP3208 or MCP3008
If you chose to use the **MCP3208** or **MCP3008**, assemble the circuit as follows (pinouts are identical on each chip). Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3208. You can also refer to the [MCP3208 datasheet](http://pdf.datasheetcatalog.com/datasheets2/43/435228_1.pdf){:target="_blank"} or the [MCP3008 datasheet](http://ww1.microchip.com/downloads/en/DeviceDoc/21295C.pdf){:target="_blank"} for more information.

Detailed connection:

![RPi2 Fritzing 3008]({{site.baseurl}}/Resources/images/Potentiometer/OverallCon-3208.PNG)

The MCP3208 should be connected as follows:

- VDD - 3.3V on Raspberry Pi 2 or 3 (Pin 1)
- VREF - 3.3V on Raspberry Pi 2 or 3 (Pin 1)
- AGND - GND on Raspberry Pi 2 or 3 (Pin 6 or any other GND pin)
- CLK - "SPI0 SCLK" on Raspberry Pi 2 or 3 (Pin 23)
- Dout - "SPI0 MISO" on Raspberry Pi 2 or 3 (Pin 21)
- Din - "SPI0 MOSI" on Raspberry Pi 2 or 3 (Pin 19)
- CS/SHDN - "SPI0 CS0" on Raspberry Pi 2 or 3 (Pin 24)
- DGND - GND on Raspberry Pi 2 or 3 (Pin 6 or any other GND pin)
- CH0 - Potentiometer wiper pin

### MinnowBoard Max

#### MinnowBoard Max Pinout

![MinnowBoard Max Pinout]({{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png)

#### Wiring & Connections

##### MCP3002
If you chose to use the **MCP3002**, assemble the circuit as follows. Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3002. You can also refer to the [datasheet](http://ww1.microchip.com/downloads/en/DeviceDoc/21294E.pdf){:target="_blank"} for more information.

Detailed connection:

![MBM Fritzing 3002]({{site.baseurl}}/Resources/images/arduino_wiring/MBM_pot3002.png)

The MCP3002 should be connected as follows:

- VDD/VREF - 3.3V on MBM (Pin 4)
- CLK - "SPI0 SCLK" on MBM (Pin 11)
- Dout - "SPI0 MISO" on MBM (Pin 7)
- Din - "SPI0 MOSI" on MBM (Pin 9)
- CS/SHDN - "SPI0 CS0" on MBM (Pin 5)
- Vss - GND on MBM (Pin 1 or 2)
- CH0 - Potentiometer wiper pin

##### MCP3208 or MCP3008
If you chose to use the **MCP3208** or **MCP3008**, assemble the circuit as follows (pinouts are identical on each chip). Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3208. You can also refer to the [MCP3208 datasheet](http://pdf.datasheetcatalog.com/datasheets2/43/435228_1.pdf){:target="_blank"} or the [MCP3008 datasheet](http://ww1.microchip.com/downloads/en/DeviceDoc/21295C.pdf){:target="_blank"} for more information.

Detailed connection:

![MBM Fritzing 3208]({{site.baseurl}}/Resources/images/arduino_wiring/MBM_pot3208.png)

- VDD - 3.3V on MBM (Pin 4)
- VREF - 3.3V on MBM (Pin 4)
- AGND - GND on MBM (Pin 1)
- CLK - "SPI0 SCLK" on MBM (Pin 11)
- Dout - "SPI0 MISO" on MBM (Pin 9)
- Din - "SPI0 MOSI" on MBM (Pin 7)
- CS/SHDN - "SPI0 CS0" MBM (Pin 5)
- DGND - GND on MBM (Pin 1)
- CH0 - Potentiometer wiper pin

## Code

Replace the existing code in your main .ino file with the following code:

{% highlight C++ %}

/*
 * we'll set this channel number to match the channel we've plugged our potentiometer's
 * wiper pin into. In this case, channel 0 (C0). If you use a different channel,
 * you'll need to update this number.
 */
int channel = 0;

void setup()
{
    /*
     * it is not necessary to set the channel to input, as the analogRead command must
     * assume the 'pin number' it is given refers to a channel on the ADC chip.
     */
}

void loop()
{
    //read the value from the ADC channel
    int value = analogRead( channel );

    //report the value to the output console
    Log( L"Analog value: " );
    Log( value.ToString()->Begin() );
    Log( "\n" );

    //delay for 500ms
    delay( 500 );
}

{% endhighlight %}


## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

## Result
You will see the LED lit to indicate that power is flowing, and the current value of the potentiometer's wiper pin will be read and displayed in the output console twice per second!

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
