---
layout: default
title: Arduino IDE extension for Remote Wiring
permalink: /en-US/IotCoreAppDeployment_ArduinoIde.htm
lang: en-US
---
# Creating Remote Wiring apps using Arduino IDE

The Arduino IDE is a tremendously popular tool for creating and uploading the Arduino runtime.  The same INO files and Arduino IDE can be leveraged to create Remote Wiring apps for Windows 10 IoT Core!  

* Visual Studio's tools must be installed.  You can install Visual Studio from [here](https://go.microsoft.com/fwlink/?LinkId=691978&clcid=0x409).  NOTE: be sure to include the C++ tools, they are not included by default.

To enable Windows 10 IoT Core app deployment in the Arduino IDE, follow these steps:

1. Download the Arduino IDE (1.6.8 is the only version currently supported) [here](https://www.arduino.cc/en/Main/Software).

2. Open Arduino IDE

3. Select **File > Preferences**

4. Add the following URL to **Additional Boards Manager URLs**: https://github.com/ms-iot/iot-utilities/raw/master/IotCoreAppDeployment/ArduinoIde/package_iotcore_ide-1.6.6_index.json 

5. Select OK

6. Select **Tools > Board > Board Manager**

7. Select **Windows 10 IoT Core** and click the Install button

You are now ready to upload a Remote Wiring app to your Windows 10 IoT Core device as easily as uploading to an Arduino.  Simply:

1. Update the INO file as desired.

2. Select **Tools > Board > Windows 10 IoT Core**

3. Specify the processor type by selecting `x86` or `arm` from **Tools > Processor**

4. Select **Tools > Programmer > Windows 10**

5. Select **Sketch > Upload** to deploy your app.  You will be prompted to enter your device's IP address or name during the deployment.



