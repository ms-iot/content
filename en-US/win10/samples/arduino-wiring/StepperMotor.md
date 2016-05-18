---
layout: default
title: Stepper Motor
permalink: /en-US/win10/samples/arduino-wiring/StepperMotor.htm
lang: en-US
---

# Stepper Motor

{% include VerifiedVersion.md %}

Learn how to create an Arduino Wiring sketch on Raspberry Pi 2 and 3 or Minnowboard Max that controls a stepper motor. The app runs the motor in default forward mode, default reverse mode and small-step forward mode in a loop.

## Setup

Follow the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) to create a new wiring project!

## Required Components
* [Sparkfun Stepper Motor - 68 oz.in](https://www.sparkfun.com/products/10846)
* [Sparkfun Big Easy Driver](https://www.sparkfun.com/products/12859)

## Hooking up Components

Connect the circuit based on the Fritzing diagram below.

![Stepper Fritzing]({{site.baseurl}}/Resources/images/arduino_wiring/StepperMotorFritz.PNG)

1. Start by hooking up the Raspberry Pi 2 or 3 to the Big Easy Driver.
   1. Connect the ENABLE pin on the driver to pin 12 (GPIO 18) on the Pi.
   2. Connect the MS1, MS2 and MS3 pins on the driver to pins 36, 38 and 40 respectively. (GPIO 16, GPIO 20 and GPIO 21)
   3. Connect the STEP pin on the driver to pin 10 (GPIO 15) on the Pi.
   4. Connect the DIR pin on the driver to pin 8 (GPIO 14) on the Pi.
   5. Finally, connect the GND pin on the driver to pin 39 on the Pi.
2. Next connect the motor to the driver. The Black and Green cables of the motor connect to the pins marked 'A' on the driver and the Red and Blue cables on the motor connect to the pins marked 'B' on the driver.
3. Hook up a 12V/2A power source to the driver by connecting the positive lead of the power source to the pin marked M+ on the driver and the negative lead to the pin marked GND.

## Code

Replace the existing code in your main .ino file with the following code:

{% highlight C++ %}

UCHAR stp = GPIO_15;
UCHAR dir = GPIO_14;
UCHAR MS1 = GPIO_16;
UCHAR MS2 = GPIO_20;
UCHAR MS3 = GPIO_21;
UCHAR EN = GPIO_18;

//Declare variables for functions
int x;

void setup() {
	pinMode(stp, OUTPUT);
	pinMode(dir, OUTPUT);
	pinMode(MS1, OUTPUT);
	pinMode(MS2, OUTPUT);
	pinMode(MS3, OUTPUT);
	pinMode(EN, OUTPUT);
	digitalWrite(EN, LOW); //Pull enable pin low to set FETs active and allow motor control
}

//Main loop
void loop() {
	//Step Forward Default
	digitalWrite(dir, LOW); //Pull direction pin low to move "forward"
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(MS3, LOW);
	for (x = 1; x<1000; x++)  //Loop the forward stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step forward
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);
	
	//Step Reverse Default
	digitalWrite(dir, HIGH); //Pull direction pin high to move in "reverse"
	digitalWrite(MS1, LOW);
	digitalWrite(MS2, LOW);
	digitalWrite(MS3, LOW);
	for (x = 1; x<1000; x++)  //Loop the stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);

	//Small Step Mode
	digitalWrite(dir, LOW); //Pull direction pin low to move "forward"
	digitalWrite(MS1, HIGH); //Pull MS1,MS2, and MS3 high to set logic to 1/16th microstep resolution
	digitalWrite(MS2, HIGH);
	digitalWrite(MS3, HIGH);
	for (x = 1; x<1000; x++)  //Loop the forward stepping enough times for motion to be visible
	{
		digitalWrite(stp, HIGH); //Trigger one step forward
		delay(1);
		digitalWrite(stp, LOW); //Pull step pin low so it can be triggered again
		delay(1);
	}
	delay(1000);
}
{% endhighlight %}


## Build and deploy
Press F5 to build and deploy your project.

Refer to the [Arduino Wiring Project Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm) for more instructions on how to deploy your app!

## Result
You should see the Stepper motor infinitely moving forward, then in reverse, and finally in small-step mode before starting all over!

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
