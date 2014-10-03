---
layout: code
title: Communicating with an XBee device
permalink: /XBee.htm
---

# Communicating with an XBee device
Learn how to use HardwareSerial to communicate with an XBee device by reading and writing to the UART port.

# Info on using UART and HardwareSerial

* HardwareSerial defines an object called Serial.
    * This reads and writes to COM1 on the Windows Image which is linked to the RX and TX pinson the Galileo board.<br/>

# Required Components
* [XBeeZB device](http://www.digi.com/products/wireless-wired-embedded-solutions/zigbee-rf-modules/zigbee-mesh-module/xbee-zb-module){:target="_blank"}
* Wires to connect RX, TX, 3.3v power and Ground wires to the XBee.

The XBeeZB device should be loaded with the API Firmware using XCTU.

# Create a new project

1. Create a new project from the template.
    * Right click on the Project in the Solution Explorer, then select <kbd>Properties</kbd>.
    * Under Configuration Properties -> C/C++ -> Preprocessor, add <kbd>SERIAL_EVENT;</kbd> to Preprocessor Definitions.
1. Connect the TX pin on the Galileo board to the RX pin (#3) on the XBee
1. Connect the RX pin on the Galileo board to the TX pin (#2) on the XBee
1. Connect the 3.3v pin on the Galileo board to the 3.3v pin (#1) on the XBee
1. Connect the GND pin on the Galileo board to the GND pin (#10) on the XBee

<img src="images/XbeeGalileoWiring.png">

If you have an XBee Adapter, connect the wires to the equivalent pin-outs on the adapter.

# Code

### Main.cpp
{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
    return RunArduinoSketch();
}

void setup()
{
    Serial.begin(CBR_9600, Serial.SERIAL_8N1);
    //Write the ID Request command
    uint8_t idRequest[5] = { 0x03, 0x03, 0x00, 0x03, 0x03 };
    writeMessage(idRequest);
}

void writeMessage(uint8_t[] data)
{
   for (int i = 0; i < data.length; i++)
   {
   
      if (Serial.write(dataArray[i]) != 1) 
      { 
          Log("Error writing Serial1! %d\n", count); 
      } 
      else
      {
          Log(L"%X sent\n", dataArray[i]);
      }
   }
}

// This method will be called when data is available on the Serial port at the end of the loop
void serialEvent()
{
   //This is called when we get a message
   int available = Serial.available(); 
   if (available) 
 { 
      Log("Received %d bytes: ", available); 
      for (int i = 0; i < available; i++) 
      { 
          auto byte = (uint8_t) Serial.read(); 
          Log("%X,", byte); 
      } 
      Log("\n"); 
   }
}

void loop()
{
    Sleep(1000);
}
{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}

