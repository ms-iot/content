---
layout: default
title: I2C Accelerometer Sample
permalink: /win10/samples/I2CAccelerometer.htm
---

<div class="container" markdown="1">
##I2C Accelerometer Sample

We'll connect an I2C accelerometer to your Raspberry Pi 2/MinnowBoard Max and create a simple app to read data from it. We'll walk you through step-by-step, so no background knowledge of I2C is needed.
However, if you're curious, Sparkfun provides a great [tutorial on I2C](https://learn.sparkfun.com/tutorials/i2c).

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/win10/HeadlessMode.htm).

###Load the project in Visual Studio

You can find this sample [here](https://github.com/ms-iot/samples/tree/develop/I2CAccelerometer).  Make a copy of the folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/Win10/Samples/HelloWorld.htm) if you need guidance.

If you're building for Minnowboard Max, select `x86` in the architecture dropdown.  If you're building for Raspberry Pi 2, select `ARM`.

Note that this app requires physical I2C ports and will not work if running in an emulated environment.

###Connect the I2C Accelerometer to your device

You'll need a few components:

* an [ADXL345 accelerometer board from Sparkfun](https://www.sparkfun.com/products/9836) with pin headers soldered on

* a breadboard and a couple of male-to-female connector wires

* If you are using a MinnowBoard Max, you'll need a 100 &#x2126; resistor (this is a workaround for a [known I2C hardware issue]({{site.baseurl}}/Win10/Samples/PinMappingsMBM.htm))

Visit the **Raspberry Pi 2/MinnowBoard Max** sections below depending on which device you have:

![Electrical Components]({{site.baseurl}}/images/I2CAccelerometer/components.png)

####Raspberry Pi 2
If you have a Raspberry Pi 2, we need to hook up power, ground, and the I2C lines to the accelerometer.
Those familiar with I2C know that normally pull-up resistors need to be installed. However, the Raspberry Pi 2 already has pull-up resistors on its I2C pins, so we don't need to add any additional external pull-ups here.
 See the [Raspberry Pi 2 pin mapping page]({{site.baseurl}}/Win10/Samples/PinMappingsRPi2.htm) for more details on the RPi2 IO pins.

**Note: Make sure to power off the RPi2 when connecting your circuit. This is good practice to reduce the chance of an accidental short circuit during construction.**

The ADXL345 breakout board has 8 IO pins, connect them as follows:

1. **GND:**  Connect to ground on the RPi2 (Pin 6)
2. **VCC:**	 Connect to 3.3V on the RPi2 (Pin 1)
3. **CS:**   Connect to 3.3V (The ADXL345 actually supports both SPI and I2C protocols. To select I2C, we keep this pin tied to 3.3V. The [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf) contains much more information about the pin functions)
4. **INT1:** Leave unconnected, we're not using this pin
5. **INT2:** Leave unconnected, we're not using this pin
6. **SDO:**  Connect to ground (In I2C mode, this pin is used to select the device address. You can attach two ADXL345 to the same I2C bus if you connect this pin to 3.3V on the second device. See the [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf) for more details)
7. **SDA:**  Connect to SDA on the RPi2 (Pin 3). This is the data line for the I2C bus.
8. **SCL:**  Connect to SCL on the RPi2 (Pin 5). This is the clock line for the I2C bus.

Here are the connections shown on a breadboard:

![Breadboard connections]({{site.baseurl}}/images/I2CAccelerometer/breadboard_assembled_rpi2.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

Here are the schematics:

![Accelerometer schematics]({{site.baseurl}}/images/I2CAccelerometer/schematics_rpi2.png)

####MinnowBoard Max
If you have a MinnowBoard Max, we need to hook up power, ground, and the I2C lines to the accelerometer. Those familiar with I2C know that normally pull-up resistors need to be installed. However, the MBM already has 10K pull-up resistors on its IO pins, so we don't need to add any additional external pull-ups here.
 See the [MBM pin mapping page]({{site.baseurl}}/Win10/Samples/PinMappingsMBM.htm) for more details on the MBM IO pins.

**Note: Make sure to power off the MBM when connecting your circuit. This is good practice to reduce the chance of an accidental short circuit during construction.**

The ADXL345 breakout board has 8 IO pins, connect them as follows:

1. **GND:**  Connect to ground on the MBM (Pin 2)
2. **VCC:**	 Connect to 3.3V on the MBM (Pin 4)
3. **CS:**   Connect to 3.3V (The ADXL345 actually supports both SPI and I2C protocols. To select I2C, we keep this pin tied to 3.3V. The [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf) contains much more information about the pin functions)
4. **INT1:** Leave unconnected, we're not using this pin
5. **INT2:** Leave unconnected, we're not using this pin
6. **SDO:**  Connect to ground (In I2C mode, this pin is used to select the device address. You can attach two ADXL345 to the same I2C bus if you connect this pin to 3.3V on the second device. See the [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf) for more details)
7. **SDA:**  Connect to SDA on the MBM (Pin 15). This is the data line for the I2C bus.
8. **SCL:**  Connect to SCL on the MBM (Pin 13) through the 100 &#x2126; resistor. This is the clock line for the I2C bus.

Here are the connections shown on a breadboard:

![Breadboard connections]({{site.baseurl}}/images/I2CAccelerometer/breadboard_assembled_mbm.png)

<sub>*Image made with [Fritzing](http://fritzing.org/)*</sub>

Here are the schematics:

![Accelerometer schematics]({{site.baseurl}}/images/I2CAccelerometer/schematics_mbm.png)

###Deploy and run the app

When everything is set up, power your device back on, and open up the sample app in Visual Studio. Configure the I2C_CONTROLLER_NAME string depending on which device you are using.

{% highlight C# %}
public sealed partial class MainPage : Page
{
	/* Important! Set the correct I2C controller name for your target device here */
	private const string I2C_CONTROLLER_NAME = "I2C5";        /* For Minnowboard Max, use I2C5 */
	//private const string I2C_CONTROLLER_NAME = "I2C1";        /* For Raspberry Pi 2, use I2C1 */
// ...
}
{% endhighlight %}

Now you should be able to press F5 from Visual Studio: The I2CAccelerometer app will deploy and start, and you should see accelerometer data show up on screen.
 If you have your accelerometer flat on a surface, the Z axis should read close to 1.000G, while X and Y are close to 0.000G. The values will fluctuate a little even if the device is standing still.
 This is normal and is due to minute vibrations and electrical noise. If you tilt or shake the sensor, you should see the values change in response. Note that this sample configures the device in 4G mode,
so you wont be able to see G readings higher than 4Gs.

![I2C Accelerometer running]({{site.baseurl}}/images/I2CAccelerometer/i2caccelerometer_screenshot.png)

Congratulations! You've connected an I2C accelerometer.

###Let's look at the code
The code in this sample performs two main tasks:

1. First the code initializes the I2C bus and the accelerometer

2. Secondly, we read from the accelerometer at defined intervals and update the display

Let's start by digging into the initializations.

###Initialize the I2C bus
To use the accelerometer, we need to initialize the I2C bus first. Here is the C# code.

{% highlight C# %}
using Windows.Devices.Enumeration;
using Windows.Devices.I2c;

private async void InitI2CAccel()
{
	/* Initialize the I2C bus */
	try {
		var settings = new I2cConnectionSettings(ACCEL_I2C_ADDR);
		settings.BusSpeed = I2cBusSpeed.FastMode;

		string aqs = I2cDevice.GetDeviceSelector(I2C_CONTROLLER_NAME);  /* Find the selector string for the I2C bus controller                   */
		var dis = await DeviceInformation.FindAllAsync(aqs);            /* Find the I2C bus controller device with our selector string           */
		I2CAccel = await I2cDevice.FromIdAsync(dis[0].Id, settings);    /* Create an I2cDevice with our selected bus controller and I2C settings */

	}
	/* If initialization fails, display the exception and stop running */
	catch (Exception e)
	{
		Text_Status.Text = "Exception: " + e.Message;
		return;
	}

	// ...
}
{% endhighlight %}

Here's an overview of what's happening:

* First, we create an I2CConnectionSettings object with the accelerometer address "ACCEL_I2C_ADDR" (0x53) and bus speed set to "FastMode" (400KHz)

* Next, we get the class selection string for our I2C controller. This controller controls the I2C lines on the exposed pin header.

* If the device does not have a controller, this function will throw an exception. This will happen if you run the app on a desktop machine for example.

* Finally, we create a new I2cDevice with the settings and bus controllers obtained previously.

###Initialize the accelerometer

Now that we have the I2cDevice accelerometer instance, we're done with the I2C bus initialization. We can now write data over I2C to start up the accelerometer. We do this with the Write() function.
For this particular accelerometer, there are two internal registers we need to configure before we can start using the device: The data format register, and the power control register.

1. We first write a 0x01 to the data format register. This configures the device range into +-4G mode. If you consult the [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf), you'll see that the device can be configured in a variety of measurement modes ranging from 2G to 16G.
Higher G settings provide you with greater range at the expense of reduced resolution. We choose 4G as a reasonable trade off between the two.

2. We write a 0x08 to the power control register, which wakes the device from standby and starts measuring acceleration. Again, the [datasheet](https://www.sparkfun.com/datasheets/Sensors/Accelerometer/ADXL345.pdf) contains additional information about the device settings and capabilities.

{% highlight C# %}
private async void InitI2CAccel()
{
	// ...

	/*
	 * Initialize the accelerometer:
	 *
	 * For this device, we create 2-byte write buffers:
	 * The first byte is the register address we want to write to.
	 * The second byte is the contents that we want to write to the register.
	 */
	byte[] WriteBuf_DataFormat = new byte[] { ACCEL_REG_DATA_FORMAT, 0x01 };        /* 0x01 sets range to +- 4Gs                         */
	byte[] WriteBuf_PowerControl = new byte[] { ACCEL_REG_POWER_CONTROL, 0x08 };    /* 0x08 puts the accelerometer into measurement mode */

	/* Write the register settings */
	try
	{
		I2CAccel.Write(WriteBuf_DataFormat);
		I2CAccel.Write(WriteBuf_PowerControl);
	}
	/* If the write fails display the error and stop running */
	catch (Exception)
	{
		Text_Status.Text = "Status: Accelerometer initialization failed";
		return;
	}

	// ...
}
{% endhighlight %}

###Timer code
After all the initializations are complete, we start a timer to read from the accelerometer periodically. Here is how you set up the timer to trigger every 100mS.
{% highlight C# %}
private async void InitI2CAccel()
{
    // ...

	/* Now that everything is initialized, create a timer so we read data every 100mS */
	periodicTimer = new DispatcherTimer();
	periodicTimer.Interval = TimeSpan.FromMilliseconds(100);
	periodicTimer.Tick += Timer_Tick;
	periodicTimer.Start();

    // ...
}

private void Timer_Tick(object sender, object e)
{
	ReadI2CAccel(); /* Read data from the I2C accelerometer and display it */
}
{% endhighlight %}


###Read data from the accelerometer
With the I2C bus and accelerometer initialized, we can start reading data from the accelerometer. Our ReadI2CAccel() function gets called every 100mS by the timer:

{% highlight C# %}
private void ReadI2CAccel()
{
	const string FLOAT_FORMAT = "F3";   /* Specify that we want 3 decimal points for floating point numbers                */
	const int ACCEL_RES = 1024;         /* The ADXL345 has 10 bit resolution giving 1024 unique values                     */
	const int ACCEL_DYN_RANGE_G = 8;    /* The ADXL345 had a total dynamic range of 8G, since we're configuring it to +-4G */
	const int UNITS_PER_G = ACCEL_RES / ACCEL_DYN_RANGE_G;  /* Ratio of raw int values to G units                          */

	Int16 AccelerationRawX, AccelerationRawY, AccelerationRawZ; /* Raw readings from the accelerometer */
	double AccelerationX, AccelerationY, AccelerationZ;         /* Readings converted to G units       */

	byte[] RegAddrBuf = new byte[] { ACCEL_REG_X }; /* Register address we want to read from                                         */
	byte[] ReadBuf = new byte[6];                   /* We read 6 bytes sequentially to get all 3 two-byte axes registers in one read */

	try
	{
		/*
		 * Read from the accelerometer
		 * We call WriteRead() so we first write the address of the X-Axis I2C register, then read all 3 axes
		 */
		I2CAccel.WriteRead(RegAddrBuf, ReadBuf);
	}
	catch (Exception e)
	{
		/* If WriteRead() fails, display error messages */
		Text_X_Axis.Text = "X Axis: Error";
		Text_Y_Axis.Text = "Y Axis: Error";
		Text_Z_Axis.Text = "Z Axis: Error";
		Text_Status.Text = "Exception: " + e.Message;
		return;
	}

	/*
	 * In order to get the raw 16-bit data values, we need to concatenate two 8-bit bytes from the I2C read for each axis.
	 * We accomplish this by using bit shift and logical OR operations
	 */
	AccelerationRawX = (Int16)(ReadBuf[0] | ReadBuf[1] << 8);
	AccelerationRawY = (Int16)(ReadBuf[2] | ReadBuf[3] << 8);
	AccelerationRawZ = (Int16)(ReadBuf[4] | ReadBuf[5] << 8);

	/* Convert raw values to G's */
	AccelerationX = (double)AccelerationRawX / UNITS_PER_G;
	AccelerationY = (double)AccelerationRawY / UNITS_PER_G;
	AccelerationZ = (double)AccelerationRawZ / UNITS_PER_G;

	/* Display the values */
	Text_X_Axis.Text = "X Axis: " + AccelerationX.ToString(FLOAT_FORMAT) + "G";
	Text_Y_Axis.Text = "Y Axis: " + AccelerationY.ToString(FLOAT_FORMAT) + "G";
	Text_Z_Axis.Text = "Z Axis: " + AccelerationZ.ToString(FLOAT_FORMAT) + "G";
	Text_Status.Text = "Status: Running";
}
{% endhighlight %}
Here's how this works:

* We begin by reading data from the accelerometer with the WriteRead() function. As the name suggests, this function first performs a write, followed by a read.

* The initial write specifies the register address we want to read from (which in this case is the X-Axis data register). This write ensures that a subsequent read will start from this register address.
We provide the function with a one-byte byte array representing the register address we want to write

* Next we provide the function with a read buffer of size 6 so we read 6 bytes over I2C. Since this device supports sequential reads,
**and** the X, Y, and Z data registers are next to each other, reading 6 bytes give us all of our data in one go. This ensures acceleration values don't change between reads as well.

* We get back 6 bytes of data from our read. These represent the data in the X, Y, and Z data registers respectively.
We separate out the data into their respective axes and concatenate the bytes using bit shift and logical ORs to form 16-bit values. This gives us the raw data from the accelerometer registers.

* The raw data is formatted as a 16-bit integer, which contains 10-bit data from the accelerometer. It can take on values ranging from -512 to 511. A reading of -512 corresponds to -4G while 511 is +4G.
 To convert this to G units, we divide by the ratio of full-scale range (8G) to the resolution (1024)

* Now that we have the G unit values, we can display the data on screen. This process is repeated every 100mS so the information is constantly updated.

</div>
