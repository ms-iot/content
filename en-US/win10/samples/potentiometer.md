---
layout: default
title: Potentiometer Sample
permalink: /en-US/win10/samples/Potentiometer.htm
lang: en-US
---

## Potentiometer Sensor Sample
This sample shows how to connect a rotary potentiometer and LED to the Raspberry Pi 2. We use a SPI-based ADC (Analog to Digital Converter) to read values from the potentiometer 
and control an LED based on the knob position.

## Parts needed
- [1 LED](http://www.digikey.com/product-detail/en/C5SMF-RJS-CT0W0BB1/C5SMF-RJS-CT0W0BB1-ND/2341832)
- [1 330 &#x2126; resistor](http://www.digikey.com/product-detail/en/CFR-25JB-52-330R/330QBK-ND/1636)
- [1 MCP3002 10-bit ADC](http://www.digikey.com/product-detail/en/MCP3002-I%2FP/MCP3002-I%2FP-ND/319412) or [1 MCP3208 12-bit ADC](http://www.digikey.com/product-search/en?KeyWords=mcp3208%20ci%2Fp&WT.z_header=search_go)
- [1 10k &#x2126; Trimmer Potentiometer](http://www.digikey.com/product-detail/en/3362P-1-103TLF/3362P-103TLF-ND/1232540)
- Raspberry Pi 2 board
- 1 breadboard and a couple of wires
- HDMI Monitor and HDMI cable

## Parts Review

In this sample, you have the option of using either the MCP3002 or the MCP3208 ADC (Analog to Digital Converter). 
The main difference between these two is that the MCP3208 is a larger chip with more input channels and greater resolution. 
Both however will work fine for this sample. 

Below are the pinouts of the MCP3002 and MCP3208 ADCs. 

| MCP3002                                                              | MCP3208                                                              |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![MCP3002 Pinout]({{site.baseurl}}/images/Potentiometer/MCP3002.PNG) | ![MCP3208 Pinout]({{site.baseurl}}/images/Potentiometer/MCP3208.PNG) |

Raspberry Pi pinout

![Raspberry Pi 2 pinout]({{site.baseurl}}/images/PinMappings/RP2_Pinout.png)

## Wiring & Connections

### MCP3002
If you chose to use the **MCP3002**, assemble the circuit as follows. Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3002.

Detailed connection:

![Overall Schematics]({{site.baseurl}}/images/Potentiometer/OverallCon-3002.PNG)

The MCP3002 should be connected as follows:

- MCP3002: VDD/VREF - 3.3V on Raspberry Pi 2
- MCP3002: CLK - "SPI0 SCLK" on Raspberry Pi 2
- MCP3002: Dout - "SPI0 MISO" on Raspberry Pi 2
- MCP3002: Din - "SPI0 MOSI" on Raspberry Pi 2
- MCP3002: CS/SHDN - "SPI0 CS0" on Raspberry Pi 2
- MCP3002: Vss - GND on Raspberry Pi 2
- MCP3002: CH0 - Potentiometer wiper pin

### MCP3208
If you chose to use the **MCP3208**, assemble the circuit as follows. Note that the wiper pin (the middle pin on the 10k potentiometer) should be connected to `CH0` on MCP3208.

Detailed connection:

![Overall Schematics]({{site.baseurl}}/images/Potentiometer/OverallCon-3208.PNG)

The MCP3002 should be connected as follows:

- MCP3208: VDD - 3.3V on Raspberry Pi 2
- MCP3208: VREF - 3.3V on Raspberry Pi 2
- MCP3208: AGND - GND on Raspberry Pi 2
- MCP3208: CLK - "SPI0 SCLK" on Raspberry Pi 2
- MCP3208: Dout - "SPI0 MISO" on Raspberry Pi 2
- MCP3208: Din - "SPI0 MOSI" on Raspberry Pi 2
- MCP3208: CS/SHDN - "SPI0 CS0" on Raspberry Pi 2
- MCP3208: DGND - GND on Raspberry Pi 2
- MCP3002: CH0 - Potentiometer wiper pin

###Building and running the sample

1. Download a zip of all of our samples [here](https://github.com/ms-iot/samples/archive/develop.zip).
1. Open `samples-develop\PotentiometerSensor\CS\PotentiometerSensor.csproj` in Visual Studio.
1. Find the `ADC_DEVICE` variable in **MainPage.xaml.cs** and change it to either **AdcDevice.MCP3002** or **AdcDevice.MCP3208** depending on the ADC you wired up above
1. Select `ARM` for the target architecture
1. Go to `Build -> Build Solution`
1. Select `Remote Machine` from the debug target
1. Hit F5 to deploy and debug. Enter the IP address of your device
   and select `None` for the authentication type
 
When you turn the potentiometer knob, you will see the number change on the screen indicating the potentiometer knob position. 
When the number is larger than half the ADC resolution (For **MCP3002**, this number is **512**. For **MCP3208**, it's **2048**) the LED will turn ON. Otherwise, it turns OFF.

| ----------------------------------------------------------------------------------------- |-| ---------------------------------------------------------------------------------- |
| ![App Running LED Off]({{site.baseurl}}/images/Potentiometer/AppRunning-LEDOff.png)       | | ![App Running LED On]({{site.baseurl}}/images/Potentiometer/AppRunning-LEDOn.png)  |
| ![Breadboard LED Off]({{site.baseurl}}/images/Potentiometer/Breadboard-LEDOff.png)        | | ![Breadboard LED On]({{site.baseurl}}/images/Potentiometer/Breadboard-LEDOn.png)   |

##Let's look at the code

The code here performs two main tasks:

1. First the code initializes the SPI bus and LED GPIO pin.

2. Secondly, we read from the ADC at defined intervals and update the display accordingly.

Let's start by digging into the initializations. The first thing we initialize is the GPIO LED pin in **InitGPIO()**.

{% highlight C# %}
private void InitGpio()
{
	var gpio = GpioController.GetDefault();

	/* Show an error if there is no GPIO controller */
	if (gpio == null)
	{
		throw new Exception("There is no GPIO controller on this device");
	}

	ledPin = gpio.OpenPin(LED_PIN);

	/* GPIO state is initially undefined, so we assign a default value before enabling as output */
	ledPin.Write(GpioPinValue.High);        
	ledPin.SetDriveMode(GpioPinDriveMode.Output);
}
{% endhighlight %}

* We start by retrieving the default GPIO controller on the device with the **GpioController.GetDefault()** function.

* Since we connected the LED to GPIO 4, we open this pin on the GPIO controller.

* Finally we write a default value to the pin before setting it as output.

Next, we initialize the SPI bus. This allows the RPi2 to communicate with the ADC to read in potentiometer positions.

{% highlight C# %}
private async Task InitSPI()
{
	try
	{
		var settings = new SpiConnectionSettings(SPI_CHIP_SELECT_LINE);
		settings.ClockFrequency = 500000;   /* 0.5MHz clock rate                                        */
		settings.Mode = SpiMode.Mode0;      /* The ADC expects idle-low clock polarity so we use Mode0  */

		string spiAqs = SpiDevice.GetDeviceSelector(SPI_CONTROLLER_NAME);
		var deviceInfo = await DeviceInformation.FindAllAsync(spiAqs);
		SpiADC = await SpiDevice.FromIdAsync(deviceInfo[0].Id, settings);
	}

	/* If initialization fails, display the exception and stop running */
	catch (Exception ex)
	{
		throw new Exception("SPI Initialization Failed", ex);
	}
}
{% endhighlight %}

* We start by specifying some configuration settings for our SPI bus:
1. We specify which chip select line we want to use. We wired the ADC into chip select line 0, so that's what we use here.
2. The clock frequency is conservatively set to 0.5MHz, which is well within the ADC capabilities.
3. **settings.Mode** is set to **SpiMode.Mode0**. This configures clock polarity and phase for the bus.

* Next, we get the class selection string for our SPI controller. This controller controls the SPI lines on the exposed pin header. We then use the selection string to get the SPI bus controller matching our string name.

* Finally, we create a new **SpiDevice** with the settings and bus controller obtained previously.

After the initializations are complete, we create a periodic timer to read data every 100mS.

{% highlight C# %}
private async void InitAll()
{
	// ...

	/* Now that everything is initialized, create a timer so we read data every 500mS */
	periodicTimer = new Timer(this.Timer_Tick, null, 0, 100);

	StatusText.Text = "Status: Running";
}
{% endhighlight %}

This timer calls the **Timer_Tick()** function. Which starts by reading from the ADC:

{% highlight C# %}
public void ReadADC()
{
	byte[] readBuffer = new byte[3]; /* Buffer to hold read data*/
	byte[] writeBuffer = new byte[3] { 0x00, 0x00, 0x00 };

	/* Setup the appropriate ADC configuration byte */
	switch (ADC_DEVICE)
	{
		case AdcDevice.MCP3002:
			writeBuffer[0] = MCP3002_CONFIG;
			break;
		case AdcDevice.MCP3208:
			writeBuffer[0] = MCP3208_CONFIG;
			break;
	}

	SpiADC.TransferFullDuplex(writeBuffer, readBuffer); /* Read data from the ADC                           */
	adcValue = convertToInt(readBuffer);                /* Convert the returned bytes into an integer value */

	/* UI updates must be invoked on the UI thread */
	var task = this.Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
	{
		textPlaceHolder.Text = adcValue.ToString();         /* Display the value on screen                      */
	});
}
{% endhighlight %}

* We first setup the **writeBuffer** with some configuration data to send to the ADC

* Next we call **SpiADC.TransferFullDuplex()** to write the configuration data and read back the ADC results

* Inside the **convertToInt()** function, we convert the returned byte array into a integer

* Finally, we update the UI with the ADC result

Next, we control the LED based on the ADC result

{% highlight C# %}
/* Turn on/off the LED depending on the potentiometer position    */
private void LightLED()
{
	int adcResolution = 0;

	switch (ADC_DEVICE)
	{
		case AdcDevice.MCP3002:
			adcResolution = 1024;
			break;
		case AdcDevice.MCP3208:
			adcResolution = 4096;
			break;
	}

	/* Turn on LED if pot is rotated more halfway through its range */
	if (adcValue > adcResolution / 2)
	{
		ledPin.Write(GpioPinValue.Low);
	}
	/* Otherwise turn it off                                        */
	else
	{
		ledPin.Write(GpioPinValue.High);
	}
}
{% endhighlight %}

* If the potentiometer is rotated more than halfway through its range, we turn on the LED. Otherwise it's turned off.

That's it! Now that you've learned how to use an ADC, you can hook up a variety of analog sensors to your Raspberry Pi 2.



