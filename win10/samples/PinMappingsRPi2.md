---
layout: default
title: RPi2 Pin Mappings
permalink: /win10/samples/PinMappingsRPi2.htm
---

<div class="container" markdown="1">
##Raspberry Pi 2 Pin Mappings

![RPi2 Pin Header]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

Hardware interfaces for the Raspberry Pi 2 are exposed through the 40-pin header **J8** on the board. Functionality includes:

* **14x** - GPIO pins
* **2x** - SPI buses
* **1x** - I2C bus
* **2x** - 5V power pins
* **2x** - 3.3V power pins
* **8x** - Ground pins

##GPIO Pins

The following GPIO pins are accessible through APIs:

* **GPIO 0**
* **GPIO 1**
* **GPIO 5**
* **GPIO 6**
* **GPIO 12**
* **GPIO 13**
* **GPIO 16**
* **GPIO 18**
* **GPIO 22**
* **GPIO 23**
* **GPIO 24**
* **GPIO 25**
* **GPIO 26**
* **GPIO 27**

In addition, 2 GPIOs are mapped to indicator LEDs on the board:

* **GPIO 35** (red power LED)
* **GPIO 47** (green activity LED)

As an example, the following code opens **GPIO 5** as an output and writes a digital '**1**' out on the pin:

{% highlight C# %}
using Windows.Devices.Gpio;

public void GPIO()
{
	GpioController Controller = GpioController.GetDefault(); /* Get the default GPIO controller on the system */

	GpioPin Pin = Controller.OpenPin(5);        /* Open GPIO 5                      */
	Pin.SetDriveMode(GpioPinDriveMode.Output);  /* Set the IO direction as output   */
	Pin.Write(GpioPinValue.High);               /* Output a digital '1'             */
}
{% endhighlight %}

##I2C Bus

There is one I2C controller **I2C1** exposed on the pin header with two lines **SDA** and **SCL**. 1.8K&#x2126; internal pull-up resistors are already installed on the board for this bus.

* Pin 3 - **I2C1 SDA**
* Pin 5 - **I2C1 SCL**

The example below initializes **I2C1** and writes data to an I2C device with address **0x40**:

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
	var settings = new I2cConnectionSettings(0x40); /* 0x40 is the I2C device address   */
	settings.BusSpeed = I2cBusSpeed.FastMode;       /* FastMode = 400KHz                */

	string aqs = I2cDevice.GetDeviceSelector("I2C1");                       /* Find the selector string for the I2C bus controller                   */
	var dis = await DeviceInformation.FindAllAsync(aqs);                    /* Find the I2C bus controller device with our selector string           */
	I2cDevice Device = await I2cDevice.FromIdAsync(dis[0].Id, settings);    /* Create an I2cDevice with our selected bus controller and I2C settings */

	byte[] WriteBuf = new byte[] { 0x01, 0x02, 0x03, 0x04}; /* Some data to write to the device */

	Device.Write(WriteBuf);
}
{% endhighlight %}


##SPI Bus

There are 2 SPI bus controllers available on the RPi2: **SPI0** and **SPI1**.

**SPI0** has the standard **MOSI**, **MISO**, and **SCLK** lines, and can be configured to use one of two chip-select lines **SPI0 CS0** and **SPI0 CS1**.

* Pin 19 - **SPI0 MOSI**
* Pin 21 - **SPI0 MISO**
* Pin 23 - **SPI0 SCLK**
* Pin 24 - **SPI0 CS0**
* Pin 26 - **SPI0 CS1**

**SPI1** includes **MOSI**, **MISO**, and **SCLK** lines, and only one chip-select line **SPI1 CS0**.

* Pin 38 - **SPI1 MOSI**
* Pin 35 - **SPI1 MISO**
* Pin 40 - **SPI1 SCLK**
* Pin 11 - **SPI1 CS0**

An example on how to perform a SPI write on bus **SPI0** is shown below:
{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.Spi;

public async void SPI()
{
	var settings = new SpiConnectionSettings(0); /* Create SPI initialization settings using chip select line CS0 */
	settings.ClockFrequency = 10000000;          /* Set clock to 10MHz                                            */

	string spiAqs = SpiDevice.GetDeviceSelector("SPI0");                         /* Find the selector string for the SPI bus controller          */
	var devicesInfo = await DeviceInformation.FindAllAsync(spiAqs);              /* Find the SPI bus controller device with our selector string  */
	SpiDevice Device = await SpiDevice.FromIdAsync(devicesInfo[0].Id, settings); /* Create an SpiDevice with our bus controller and SPI settings */

	byte[] WriteBuf = new byte[] { 0x01, 0x02, 0x03, 0x04 }; /* Some data to write to the device */

	Device.Write(WriteBuf);
}
{% endhighlight %}

</div>
