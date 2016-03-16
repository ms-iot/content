---
layout: default
title: Project Setup
permalink: /en-US/win10/ArduinoWiringPortingGuide.htm
lang: en-US
---

# Arduino Wiring Porting Guide

Arduino Wiring sketches and libraries can be copy/pasted into an Arduino Wiring project inside Visual Studio and run on Raspberry Pi 2, Raspberry Pi 3 or Minnowboard Max. Sometimes there are slight modifications that need to be made to these files in order to make them more compatible with the Windows environment, or the board you are working with. This guide will cover those modifications as well as common issues that you may run into when deploying Arduino Wiring projects!

### Missing Something?
Need more information on [Setting up Arduino Wiring in Visual Studio]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)?

## Index

### Porting
- <a href="#port_pins">Updating Pins</a>
- <a href="#port_serial">Remove References to "Serial"</a>
	
### Common Problems
- <a href="#prob_missingiot">Can't find "Arduino Wiring Application" Visual C++ project template in Visual Studio</a>
- ERROR: <a href="#prob_hardwareserial">unresolved external symbol "class HardwareSerial Serial"</a>
- ERROR: <a href="#prob_identifier">"identifier not found" when calling a function</a>
- <a href="#prob_hanging">My solution hangs infinitely when being initialized</a>



## Porting

<a name="port_pins"></a>

### Updating Pins

It might go without saying, but many sketches and libraries (especially those for arduino shields) may contain references to specific connector pins for Arduino devices. You'll want to customize your sketches to use the appropriate connector pins for the device you are working on and the configuration you are using.

Arduino Wiring ultimately requires a physical connector pin number for any functions that refer to 'pins'. You can use these numbers directly, but we've also provided some pre-defined pin names which correspond to connector pins on specific boards.

For example, the physical connector pin 29 on a Raspberry Pi 2 and 3 is also known as `GPIO_5`. You may set GPIO pin 5 to a HIGH state on a Raspberry Pi 2 and 3 by using either of the following commands:

{% highlight C++ %}

pinMode( 29, OUTPUT );
digitalWrite( 29, HIGH );

{% endhighlight %}

or

{% highlight C++ %}

pinMode( GPIO_5, OUTPUT );
digitalWrite( GPIO_5, HIGH );

{% endhighlight %}

The pre-defined pin names can be found in `PinNumbers.h` inside any Arduino Wiring project, but since there will be different physical connector pins available depending on the hardware setup you are building for, we've also included a table here to describe which pin names are available for each device.

#### Raspberry Pi 2 and 3

[Pinout Diagram]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

{:.table.table-bordered}
| Pin Define      | Corresponding Pin Number   |
| -------------| ------------- |
| LED_BUILTIN | *onboard LED* |
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

[Pinout Diagram]({{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png)

{:.table.table-bordered}
| Pin Define      | Corresponding Pin Number   |
| -------------| ------------- |
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


#### Why remove Serial.write()?

Serial.write() is typically used to send raw data over the serial lines. Windows IoT Core does not currently have UART functionality so these types of calls should be avoided.



## Common Problems

<a name="prob_missingiot"></a>

### Can't find "Arduino Wiring Application" Visual C++ project template in Visual Studio

**Cause**: The Windows IoT Project Templates extension for Visual Studio is not installed.

**Solution**: You must install the Visual Studio Extension for Windows IoT Project Templates before you can create Arduino Wiring projects in Visual Studio. Head over to [Windows IoT Core Project Templates extension page](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec) to download the extension from the Visual Studio Gallery!

<a name="prob_hardwareserial"></a>

### ERROR: 'unresolved external symbol "class HardwareSerial Serial"'

**Cause**: This issue occurs when there are `Serial` references in your Arduino Wiring sketches or libraries.

**Solution**: Use the "File" and "Line" fields on this error to locate the reference(s) causing the issue, and then use the <a href="#port_serial">Removing References to "Serial"</a> section of this page to resolve the issue.

<a name="prob_identifier"></a>

### ERROR: "identifier not found" when calling a function

**Cause**: This error occurs during the linker process when a function is invoked that has not yet been declared in the document.

**Solution**: In C++, all functions must be declared before they are invoked. If you have defined a new function in your sketch file, either the declaration or the entire implementation of the function must be above any attempts to invoke it (typically at the top of the document).

**Example**:

The following block of code will raise the error "'myFunction': identifier not found"

{% highlight C++ %}

void setup()
{

}

void loop()
{
    myFunction();
}

void myFunction()
{
    //do something
}

{% endhighlight %}

There are two solutions. First, you may declare the function above any invocations. Typically, this declaration is done at the top of the file.

{% highlight C++ %}

void myFunction();

void setup()
{

}

void loop()
{
    myFunction();
}

void myFunction()
{
    //do something
}

{% endhighlight %}

The other option is to move the entire implementation of the function above any invocations. This has the effect of both declaring and defining the function at the same time.

{% highlight C++ %}

void setup()
{

}

void myFunction()
{
    //do something
}

void loop()
{
    myFunction();
}

{% endhighlight %}

<a name="prob_hanging"></a>

### My solution hangs infinitely when being initialized

There is a known issue which can cause a C++ solution to hang infinitely (deadlock) when being initialized. You may be experiencing this type of issue if you find that your solution appears to hang forever and you are unable to use the debugger to 'break in' to any statement in the setup() or loop() sections of your Arduino Wiring application.

**Cause**: An object is being created or a function is being called which leads to an asyncronous action before the solution has finished initializing. It is likely caused from an object's constructor calling an API function like `pinMode`.

**Solution**: Move any object constructors and function calls away from the initialization section of code and into the `setup()` block.

**Example 1**:

The execution of this sketch calls a function called `setPinModes()` before the solution itself has been initialized. The solution will appear to execute but will hang infinitely.

{% highlight C++ %}

bool setPinModes();

int pin = GPIO_5;
bool initialized = setPinModes();

void setup()
{

}

void loop()
{
	if( initialized )
	{
		//do something
	}
}

bool setPinModes()
{
	if( pin < 0 ) return false;
	pinMode( pin, OUTPUT );
	return true;
}

{% endhighlight %}

The solution is below, we've simply moved the execution of `setPinModes()` to the `setup()` function:

{% highlight C++ %}

bool setPinModes();

int pin = GPIO_5;
bool initialized;

void setup()
{
	initialized = setPinModes();
}

void loop()
{
	if( initialized )
	{
		//do something
	}
}

bool setPinModes()
{
	if( pin < 0 ) return false;
	pinMode( pin, OUTPUT );
	return true;
}

{% endhighlight %}

**Example 2**:

The execution of this sketch creates an object on the stack before `setup()` has been called. Since the object calls `pinMode` in its constructor, this will also cause a deadlock. This is an uncommon issue, but may occur with objects from certain libraries (like the Arduino `LiquidCrystal` library).

{% highlight C++ %}

class MyObject
{
public:
    MyObject()
    {
        pinMode( GPIO_5, OUTPUT );
    }

    void doSomething()
    {
        //... 
    }
};

MyObject myObject;

void setup()
{

}

void loop()
{
    myObject.doSomething();
}

{% endhighlight %}

The solution is below. We've changed the object to an object pointer and moved the initialization of the object to `setup()`.

{% highlight C++ %}

class MyObject
{
public:
    MyObject()
    {
        pinMode( GPIO_5, OUTPUT );
    }

    void doSomething()
    {
        //... 
    }
};

MyObject *myObject;

void setup()
{
    myObject = new MyObject();
}

void loop()
{
    myObject->doSomething();
}

{% endhighlight %}
