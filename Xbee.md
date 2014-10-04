---
layout: code
title: Communicating with an XBee device
permalink: /XBee.htm
---

# Communicating with an XBee device
Learn how to use HardwareSerial to communicate to an XBee device across the TX/RX pins.

# Info on using HardwareSerial

* HardwareSerial defines an object called Serial.
    * This reads and writes to COM1 on the Windows Image which is linked to the RX and TX pins on the Galileo board.<br/>
* Serial = COM1 = TX/RX pins

# Required Components
* [XBee ZB device](http://www.digi.com/products/wireless-wired-embedded-solutions/zigbee-rf-modules/zigbee-mesh-module/xbee-zb-module){:target="_blank"}
* Wires to connect RX, TX, 3.3v power and ground wires to the XBee.

This sample requires the XBee to run in API mode, by setting AP=2. If you are using Series 2 XBee, you'll need to install the API Firmware with [X-CTU](http://www.digi.com/support/productdetail?pid=3352&osvid=57&type=utilities){:target="_blank"} (Series 2 are manufactured with AT firmware), then set AP=2. This software will not work correctly with AP=1

# Create a new project

1. Create a new project from the template.
    * Right click on the Project in the Solution Explorer, then select <kbd>Properties</kbd>.
    * Under Configuration Properties -> C/C++ -> Preprocessor, add <kbd>SERIAL_EVENT;</kbd> to Preprocessor Definitions.
1. Connect the TX pin on the Galileo board to the RX pin (#3) on the XBee
1. Connect the RX pin on the Galileo board to the TX pin (#2) on the XBee
1. Connect the GND pin on the Galileo board to the GND pin (#10) on the XBee
1. Connect the 3.3v pin on the Galileo board to the 3.3v pin (#1) on the XBee

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

void writeXBeeApiMessage(uint8_t messageType, uint8_t frameId, uint8_t* message, USHORT count)
{
  int sentLen = Serial.write(0x7E); //Write header
  //Write message length
  USHORT len = count + 2;
  sentLen += Serial.write((uint8_t) (len & 0xFF));
  sentLen += Serial.write((uint8_t) (len >> 8));
  sentLen += Serial.write(messageType); //write message type
  byte checksum = 0xFF - messageType;
  sentLen += Serial.write(frameId); //write frame id
  checksum -= frameId;    
  for (int i = 0; i < count; i++) //write body
  {
    sentLen += Serial.write(message[i]);
    checksum -= message[i];
  }
  sentLen += Serial.write(checksum); //write checksum
  if (sentLen == count + 6)
    Log(L"Sent %d bytes\n", sentLen);
  else
    Log(L"Error writing bytes");
}

void setup()
{
  Serial.begin(CBR_9600, Serial.SERIAL_8N1);
  
  //Send the AT Request (0x08) for the device's ID (0x49, 0x44)
  uint8_t idRequest[8] = { 0x49, 0x44 };
  writeXBeeApiMessage(0x08, 0x01, idRequest, 2);
}

// This method will be called when data is available on the Serial port at the end of the loop
void serialEvent()
{
  int available = Serial.available(); 
  if (available) 
  { 
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
  Sleep(250);
}
{% endhighlight %}

---

[&laquo; Return to Samples](SampleApps.htm){:role="button"}{:class="btn btn-default"}

