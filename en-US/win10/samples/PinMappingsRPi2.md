---
layout: default
title: RPi2 Pin Mappings
permalink: /en-US/win10/samples/PinMappingsRPi2.htm
lang: en-US
---

##Raspberry Pi 2 Pin Mappings

![RPi2 Pin Header]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

Hardware interfaces for the Raspberry Pi 2 are exposed through the 40-pin header **J8** on the board. Functionality includes:

* **13x** - GPIO pins
* **2x** - SPI buses
* **1x** - I2C bus
* **2x** - 5V power pins
* **2x** - 3.3V power pins
* **8x** - Ground pins

##<a name="RPi2_GPIO">GPIO Pins

The following GPIO pins are accessible through APIs:

{:.table.table-bordered}
| GPIO# | Power-on Pull | Header Pin         |
|-------|---------------|--------------------|
| 5     | PullUp        | 29                 |
| 6     | PullUp        | 31                 |
| 12    | PullDown      | 32                 |
| 13    | PullDown      | 33                 |
| 16    | PullDown      | 36                 |
| 18    | PullDown      | 12                 |
| 22    | PullDown      | 15                 |
| 23    | PullDown      | 16                 |
| 24    | PullDown      | 18                 |
| 25    | PullDown      | 22                 |
| 26    | PullDown      | 37                 |
| 27    | PullDown      | 13                 |
| 35    | PullUp        | Red Power LED      |
| 47    | PullUp        | Green Activity LED |

As an example, the following code opens **GPIO 5** as an output and writes a digital '**1**' out on the pin:

{% highlight C# %}
using Windows.Devices.Gpio;

public void GPIO()
{
    // Get the default GPIO controller on the system
    GpioController gpio = GpioController.GetDefault();
    if (gpio == null)
        return; // GPIO not available on this system

    // Open GPIO 5
    using (GpioPin pin = gpio.OpenPin(5))
    {
        // Latch HIGH value first. This ensures a default value when the pin is set as output
        pin.Write(GpioPinValue.High);
    
        // Set the IO direction as output
        pin.SetDriveMode(GpioPinDriveMode.Output);

    } // Close pin - will revert to its power-on state 
}
{% endhighlight %}

When you open a pin, it will be in its power-on state. To disconnect the pull resistors and get a high-impedance input, set the drive mode to GpioPinDriveMode.Input:

    pin.SetDriveMode(GpioDriveMode.Input);

When a pin is closed, it reverts to its power-on state.

##<a name="RPi2_I2C"></a>I2C Bus

There is one I2C controller **I2C1** exposed on the pin header with two lines **SDA** and **SCL**. 1.8K&#x2126; internal pull-up resistors are already installed on the board for this bus.

* Pin 3 - **I2C1 SDA**
* Pin 5 - **I2C1 SCL**

The example below initializes **I2C1** and writes data to an I2C device with address **0x40**:

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

public async void I2C()
{
    // Get a selector string for bus "I2C1"
    string aqs = I2cDevice.GetDeviceSelector("I2C1");
    
    // Find the I2C bus controller with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0)
        return; // bus not found
    
    // 0x40 is the I2C device address
    var settings = new I2cConnectionSettings(0x40);
    
    // Create an I2cDevice with our selected bus controller and I2C settings
    using (I2cDevice device = await I2cDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}
{% endhighlight %}


##<a name="RPi2_SPI"></a>SPI Bus

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
    // Get a selector string for bus "SPI0"
    string aqs = SpiDevice.GetDeviceSelector("SPI0");
    
    // Find the SPI bus controller device with our selector string
    var dis = await DeviceInformation.FindAllAsync(aqs);
    if (dis.Count == 0);
        return; // "SPI0" not found on this system
    
    // Use chip select line CS0
    var settings = new SpiConnectionSettings(0);
    
    // Create an SpiDevice with our bus controller and SPI settings
    using (SpiDevice device = await SpiDevice.FromIdAsync(dis[0].Id, settings))
    {
        byte[] writeBuf = { 0x01, 0x02, 0x03, 0x04 };
        device.Write(writeBuf);
    }
}
{% endhighlight %}
