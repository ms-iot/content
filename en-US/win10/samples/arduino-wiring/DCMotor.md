---
layout: default
title: Arduino Wiring DC Motor Sample
permalink: /en-US/win10/samples/arduino-wiring/DCMotor.htm
lang: en-US
---

# Arduino Wiring DC Motor Sample

A DC motor is one of the basic elements of a maker's toolbox. Whether you're driving autonomous robots or spinning a cooling fan, a DC motor is a relatively simple way to accomplish your task! In this sample, we'll use pulse-width modulation (PWM) to vary the speed of a motor.

## Components

You will need:

* 1 Windows 10 IoT Core enabled device, such as Raspberry Pi 2, Raspberry Pi 3 or Minnowboard Max.
* 1 [PCA9685 16-channel 12-bit PWM controller from Adafruit](http://www.adafruit.com/product/815).
* 1 330 Ω resistor.
* 1 1N1407 diode.
* 1 P2N2 222A transistor (NPN)
* Assorted wires

## Hardware Set Up

Motors draw more current than the pins on the Raspberry Pi 2 or 3 can safely provide. Therefore, we'll use a transistor to connect the motor to an external power source. Transistors are like switches; when we give it a small amount of current, it can enable the flow of a much larger current. For our motor, we used a 5v DC adapter that supplies at least 1A of current. It is OK to use an adapter with more current capacity than your motor needs; as the adapter should only supply what is needed by the motor.

We are also using a diode to protect the PCA9685 board and the Raspberry Pi from backflow current that can damage the hardware. Diodes enable power flow in one direction only.

We highly recommend you use the PCA9685 PWM controller. You can use either the hat or the breakout board, but this board is directly supported by Microsoft and will offer the best experience.

Additionally, the controller should not have any I2C hardware address pins set. Below is an image of the I2C pins on the PCA9685 PWM controller, where none of the pins are set (and therefore hardware I2C address is the default 0x40).

![PCA9685 I2c]({{site.baseurl}}/Resources/images/arduino_wiring/pca9685_i2c.jpg)

Refer to the fritzing diagram below to hook up your motor and PWM controller.

### Fritzing Diagram

![RPI Pinouts]({{site.baseurl}}/Resources/images/arduino_wiring/dcmotor.png)

### Pinout Description

The PCA9685 PWM Controller should be connected as follows:

#### Raspberry Pi 2 and 3

- VCC - 5V on Raspberry Pi 2 or 3 (Pin 2 or 4)
- SDA - SDA1 pin on Raspberry Pi 2 or 3 (Pin 3)
- SCL - SCL1 pin on Raspberry Pi 2 or 3 (Pin 5)
- OE - *leave disconnected*
- GND - GND on Raspberry Pi 2 or 3 (Pin 14 as shown or any other GND pin)

#### External Power

- V+ - positive terminal of external power
- GND - negative (ground) terminal of external power

Refer to the fritzing diagram above for the remaining circuit connections.


## Code

Replace the existing code in your main .ino file with the following code:

{% highlight C++ %}


/*
 * The motor must be connected to one of the 3-pin connectors on the PWM hat (or similar device)
 * The function analogWrite( unsigned int pin, unsigned int speed ) will assume that the given pin
 *   number refers to the channel of the same number on the hat. Therefore, you should refer to the
 *   16 channels of a 16-channel PWM hat as [ 0 - 15 ]. In this case, we've set 0 as the MOTOR_PIN which
 *   means that channel 0 will be used on the hat. 
 */
const int MOTOR_PIN = 0;
const int MILLIS_PER_SECOND = 1000;
const int PWM_MAX_SPEED = 255;
const int PWM_MIN_SPEED = 0;

void setup()
{
    //analog write commands do not require pinModes to be set. They will be inferred by the function type
}


void motorOnThenOff()
{
    int number_of_seconds = 3;

    //turn the motor on for 1 second
    Log( "Setting speed to max\n" );
    analogWrite( MOTOR_PIN, PWM_MAX_SPEED );
    delay( MILLIS_PER_SECOND * number_of_seconds );

    //turn the motor off for one second
    Log( "Setting speed to min\n" );
    analogWrite( MOTOR_PIN, PWM_MIN_SPEED );
    delay( MILLIS_PER_SECOND * number_of_seconds );
}


void motorAccelerateAndDecelerate()
{
    int speed;

    //increase speed at a moderate pace
    for( speed = 0; speed <= PWM_MAX_SPEED; ++speed )
    {
        Log( "Setting speed to " );
        Log( speed.ToString()->Begin() );
        Log( "\n" );

        analogWrite( MOTOR_PIN, speed );
        delay( 25 );
    }


    //decrease speed at a moderate pace
    for( speed = 252; speed >= PWM_MIN_SPEED; --speed )
    {
        Log( "Setting speed to " );
        Log( speed.ToString()->Begin() );
        Log( "\n" );

        analogWrite( MOTOR_PIN, speed );
        delay( 25 );
    }
}


void loop()
{
    motorOnThenOff();
    motorAccelerateAndDecelerate();

    //delay for a moment before restarting
    analogWrite( MOTOR_PIN, PWM_MIN_SPEED );
    delay( MILLIS_PER_SECOND );
}


{% endhighlight %}


## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

## Result

The motor should run at max speed for 3 seconds, off for 3 seconds, and then perform an acceleration from a stopped state to maximum speed and back again. The motor will then stop for one second before starting all over again!

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
