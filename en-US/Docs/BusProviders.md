---
layout: docs
title: Bus Providers
description: Bus Providers Enable Support for Off-SOC from Inbox APIs
keyword: busses, gpio, pwm, i2c, spi, adc
permalink: /en-US/Docs/BusProviders.htm
lang: en-US
---

# Bus Providers

Starting with Windows 10, Windows has had in-box UWP APIs that provide direct access to Gpio, Spi, or I2c busses located on-soc. This gives very easy access to this hardware from a high level API. However, there are many times when a device maker wants to use an off-soc controller to access a bux. It can be as simple as a cheap chip that adds 16 GPIO pins, or as rich as a full MCU (like an Arduino) that not only adds Gpio, SPI, and I2C pins, but also supports PWM and ADC. With the "Bus Provider" model, we give developers the ability to access these off-soc busses using the in-box APIs, using a user-mode provider that bridges the gap. 

Someone building a provider implements a set of interfaces into a UWP class library and then any developer who wants to talk to that hardware simply includes the component and tells the in-box APIs about it. If you look at the sample code from the [Remote Arduino provider](https://github.com/ms-iot/BusProviders/tree/develop/Arduino) you can see how easy it is to configure the provider and, once set as the default provider for that app, the rest of the code in the client app is identical to the code required to access an on-soc bus.  

{% highlight C# %}

ArduinoProviders.ArduinoProvider.Configuration = 
    new ArduinoProviders.ArduinoConnectionConfiguration("VID_2341", "PID_0043", 57600);
Windows.Devices.LowLevelDevicesController.DefaultProvider =  new ArduinoProviders.ArduinoProvider();

gpioController = await GpioController.GetDefaultAsync();
i2cController = await I2cController.GetDefaultAsync();
adcController = await AdcController.GetDefaultAsync();
pwmController = await PwmController.GetDefaultAsync();

GpioPin pin = gpioController.OpenPin(LED_PIN, GpioSharingMode.Exclusive);

{% endhighlight %}

# Available Providers

We currently have a number of providers available on the [Bus Providers](https://github.com/ms-iot/BusProviders) github repo. In addition to the code for the provider, each provider has a sample VS solution that demonstrates how a client would use that provider. 

* ADC
** Ads1x15
** Mcp3008
** Remote Arduino
* PWM
** PCA9685
** Simulated with Gpio
** Remote Arduino
* Gpio, SPI, I2c
** Remote Arduino

In addition to the providers that give you access to real hardware, we have built a [Simulated Provider](https://github.com/ms-iot/BusProviders/tree/develop/SimulatedProvider) that will act as if it was an inifitely capable provider and is designed to let you write and debug your applications without having to first deploy them to a working device. For a richer experience, you can customize it to simlulate your actual hardware. For example: updating the I2c provider to return back the result "75" when you send it the command for a temperature reading on a device with the designated slave address. 
