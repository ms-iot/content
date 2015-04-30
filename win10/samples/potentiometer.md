---
layout: default
title: Potentiometer Sample
permalink: /win10/samples/potentiometer.htm
---

<div class="container" markdown="1">

## Potentiometer Sensor Sample
This sample uses two functionalities, SPI and GPIO.
A potentiometer sensor is connected to a ADC, then ADC is connected to Raspberry Pi 2 through SPI pins. Raspberry Pi 2 reads the sensor analog input data and output it to the screen.
We also have a LED which indicates the output status. This sample only has C# version.

## Parts needed
- [1 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832)
- [1 330 &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)
- [1 MCP3002 10-bit ADC](http://www.digikey.com/product-detail/en/MCP3002-I%2FP/MCP3002-I%2FP-ND/319412) or [1 MCP3208 12-bit ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go)
- [1 10k &#x2126; Trimmer Potentiometer](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540)
- Raspberry Pi 2 board
- 1 breadboard and a couple of wires
- HDMI Monitor

## Parts Review

* MCP3002 or MCP3208

Below are the pinouts of the MCP3002 and MCP3208 analog-to-digital converters (ADC) used in this sample.

![Electrical Components]({{site.baseurl}}/images/Potentiometer/MCP3002.PNG)
![Electrical Components]({{site.baseurl}}/images/Potentiometer/MCP3208.PNG)

* Raspberry Pi 2

  <img src="{{site.baseurl}}/images/PinMappings/RP2_Pinout.png" height="400">

## Parts Connection

1. Connect the potentiometer to the MCP3002; Wiper Pin (the middle pin on the 10k trimpot) should be connected to `CH0` on MCP3002

Detailed connection:

![Overall Schematics]({{site.baseurl}}/images/Potentiometer/OverallCon-3002.PNG);

With each model of Raspberry Pi 2, the pin layout might be a little different. But the pin connection with MCP3002 should be as below:

- MCP3002: VDD/VREF - 5V on Raspberry Pi 2
- MCP3002: CLK - "SPI0 SCLK" on Raspberry Pi 2
- MCP3002: Dout - "SPI0 MISO" on Raspberry Pi 2
- MCP3002: Din - "SPI0 MOSI" on Raspberry Pi 2
- MCP3002: CS/SHDN - "SPI0 CS0" on Raspberry Pi 2
- MCP3002: DGND - GND on Raspberry Pi 2
- MCP3002: CH0- Potentiometer Output Pin

2. **Alternative: If you are using MCP3208** Connect the potentiometer to MCP3208; Wiper Pin (the middle pin on the 10k trimpot) should be connected to `CH0` on MCP3208

Detailed connection:

![Overall Schematics]({{site.baseurl}}/images/Potentiometer/OverallCon-3208.PNG)

With each model of Raspberry Pi 2, the pin layout might be a little different.
But the pin connection with MCP3208 should be as below:

- MCP3208: VDD - 5V on Raspberry Pi 2
- MCP3208: VREF - 5V on Raspberry Pi 2
- MCP3208: CLK - "SPI0 SCLK" on Raspberry Pi 2
- MCP3208: Dout - "SPI0 MISO" on Raspberry Pi 2
- MCP3208: Din - "SPI0 MOSI" on Raspberry Pi 2
- MCP3208: CS/SHDN - "SPI0 CS0" on Raspberry Pi 2
- MCP3208: DGND - GND on Raspberry Pi 2

## Look at the code

You can find this sample [here](https://github.com/ms-iot/samples/tree/develop/PotentiometerSensor).

Let's look through the code. We use a timer, and each time the 'Tick' event is called, we
read the sensor output value through MCP3002 ADC, and if the value is high than a threshold
number we set in the code, it will light up LED.

* Timer Code
Setup timer in C#:
{% highlight C# %}
public MainPage()
{
	// ...

	this.timer = new DispatcherTimer();
	this.timer.Interval = TimeSpan.FromMilliseconds(500);
	this.timer.Tick += Timer_Tick;
	this.timer.Start();

	// ...
}
private void Timer_Tick(object sender, object e)
{
	DisplayTextBoxContents();
	LightLED();
}
{% endhighlight %}

* Initialize GPIO and SPI pin

{% highlight C# %}
private async void InitSPI()
{
    try
    {
        var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE);
        settings.ClockFrequency = 500000;// 10000000;
        settings.Mode = SpiMode.Mode0; //Mode3;

        string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);
        var deviceInfo = await DeviceInformation.FindAllAsync(spiAqs);
        SpiDisplay = await SpiDevice.FromIdAsync(deviceInfo[0].Id, settings);
    }

    /* If initialization fails, display the exception and stop running */
    catch (Exception ex)
    {
        throw new Exception("SPI Initialization Failed", ex);
    }
}
private void InitGpio()
{
    var gpio = GpioController.GetDefault();

    // Show an error if there is no GPIO controller
    if (gpio == null)
    {
        pin = null;
        GpioStatus.Text = "There is no GPIO controller on this device.";
        return;
    }

    pin = gpio.OpenPin(LED_PIN);

    // Show an error if the pin wasn't initialized properly
    if (pin == null)
    {
        GpioStatus.Text = "There were problems initializing the GPIO pin.";
        return;
    }
    pin.SetDriveMode(GpioPinDriveMode.Output);
    pin.Write(GpioPinValue.High);
    pin.Write(GpioPinValue.Low);
    pin.Write(GpioPinValue.High);
    GpioStatus.Text = "GPIO pin initialized correctly.";
}
{% endhighlight %}

* read the sensor data through SPI communication and light Up LED

{% highlight C# %}
private int LEDStatus = 0;
private const int LED_PIN = 6;
private GpioPin pin;

/*Raspberry Pi 2  Parameters*/
private const string SPI_CONTROLLER_NAME = "SPI0";  /* For Raspberry Pi 2, use SPI0                             */
private const Int32 SPI_CHIP_SELECT_LINE = 0;       /* Line 0 maps to physical pin number 24 on the RPi2        */

/*Channel configuration for MCP3208, Uncomment this if you are using MCP3208*/

// byte[] readBuffer = new byte[3]; /*this is defined to hold the output data*/
// byte[] writeBuffer = new byte[3] { 0x06, 0x00, 0x00 };//00000110 0 0; /* It is SPI port serial input pin, and is used to load channel configuration data into the device*/

/*Channel configuration for MCP3002, Uncomment this if you are using MCP3002*/
byte[] readBuffer = new byte[3]; /*this is defined to hold the output data*/
byte[] writeBuffer = new byte[3] { 0x68, 0x00, 0x00 };//00001101 00; /* It is SPI port serial input pin, and is used to load channel configuration data into the device*/


private SpiDevice SpiDisplay;

// create a timer
private DispatcherTimer timer;
int res;

public void DisplayTextBoxContents()
{
    SpiDisplay.TransferFullDuplex(writeBuffer, readBuffer);
    res = convertToInt(readBuffer);
    textPlaceHolder.Text = res.ToString();

}
private void LightLED()
{
    /*Uncomment this if you are using MCP3208*/
	// if (res > (4096/2))
    // {
    //     pin.Write(GpioPinValue.Low);
    // }else
    // {
    //     pin.Write(GpioPinValue.High);
    // }

	/*Uncomment this if you are using MCP3002*/
    if (res > 1024/2)
    {
        pin.Write(GpioPinValue.Low);
    }else
    {
        pin.Write(GpioPinValue.High);
    }
}
{% endhighlight %}

* Convert sensor bit data to a number

{% highlight C# %}
/* This is the conversion for MCP3208 which is a 12 bits output; Uncomment this if you are using MCP3208 */
// public int convertToInt(byte[] data)
// {
//    int result = data[1] & 0x0F;
//    result <<= 8;
//    result += data[2];
//    return result;
// }
/* */

/* This is the conversion for MCP3002 which is a 10 bits output; Uncomment this if you are using MCP3002 */
public int convertToInt(byte[] data)
{
    int result = data[0] & 0x03;
    result <<= 8;
    result += data[1];
    return result;
}
{% endhighlight %}

## Deploy the sample
Choose `Debug` and `ARM` configuration, choose `Remote Machine`, right click the project, under Property, click Debug tag,
Put the Raspberry Pi 2 IP in the Remote machine field, and unclick `Use authentication`

Press `F5`

Turn the potentiometer button around, you will see the number changes on the screen.
And also, when the number is larger than 2^10/2, the LED will be ON. Otherwise, It gets turned off.

<img src="{{site.baseurl}}/images/Potentiometer/Deploy.PNG" height="400">


</div>
