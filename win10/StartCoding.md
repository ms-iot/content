---
layout: default
title: Start Coding
permalink: /win10/StartCoding.htm
---


<div class="row section-heading">
    <div class="col-md-6">
        <h1>Docs and Samples</h1>
        <p>Download code samples to get started with Windows on Devices. Also, read docs to help you use tools and resources to help you develop.</p>
		<br/>
		<h4>Did you set up your environment?</h4>
		<p>We assume you already <a href="{{site.baseurl}}/GetStarted.htm">set up your environment</a>, have a working Visual Studio and have a device running Windows IoT Core (MinnowBoard Max, Raspberry Pi 2, or VM).</p>
		<br/>
		<h4>Questions/Suggestions</h4>
		<p>Remember, you can always send <a href="{{site.baseurl}}/Comunity#contact.htm">contact us</a> for help and suggestions!</p>
    </div>
    <div class="col-md-6">
        <div class="downloads-image"></div>
    </div>
</div>
<div class="row section-heading">
    <div role="tabpanel">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#first" aria-controls="first" role="tab" data-toggle="tab"><h3>Docs and Tutorials</h3></a></li>
            <li role="presentation"><a href="#second" aria-controls="second" role="tab" data-toggle="tab"><h3>Samples</h3></a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="first">
               <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>On-Device Command-line Utilities</h4>
                        <p>A set of tools available on your device to help you configure a slew of options</p>
                        <a href="{{site.baseurl}}/win10/tools/CommandLineUtils.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Windows 10 IoT Core Insider Preview Porting Tool</h4>
                        <p>A tool for helping you port your existing Win32 and Windows CE applications to Windows 10 IoT Core</p>
                        <a href="{{site.baseurl}}/win10/tools/IoTAPIPortingTool.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Using powershell</h4>
                        <p>Allows Remote Administration and Configuration so that you can remotely configure and manage any Windows IoT Core device</p>
                        <a href="{{site.baseurl}}/win10/samples/PowerShell.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Headless UAP Apps</h4>
                        <p>Windows IoT Core can either be in headed or headless mode. The difference is the presence or absence of any form of UI</p>
                        <a href="{{site.baseurl}}/win10/HeadlessMode.htm">Learn More</a>
                    </div>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Use ICD to create an image</h4>
                        <p>Image creation, process and tools</p>
                        <a href="{{site.baseurl}}/win10/ImageCreation.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Unavailable Universal APIs</h4>
                        <p>Windows IoT Core is a work in progress.  Here are the UAP APIs that have not been implemented yet on our platform.</p>
                        <a href="{{site.baseurl}}/win10/UnavailableApis.htm">Learn More</a>
                    </div>
					<div class="col-md-3">
                        <h4>Compatible Peripheral USB Devices</h4>
                        <p>Find a list of USB devices compatible with Window 10 IoT Core devices</p>
                        <a href="{{site.baseurl}}/win10/Peripherals.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Using WINDBG</h4>
                        <p>Use WINDBG to debug</p>
                        <a href="{{site.baseurl}}/win10/Windbg.htm">Learn More</a>
                    </div>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="second">
                <div class="row section-heading">
                    <h2>Windows 10 IoT Core Insider Preview</h2>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Hello, World!</h4>
                        <p>Create your first UAP app that runs on devices like the Raspberry Pi 2 running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/HelloWorld.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Hello, Blinky</h4>
                        <p>Create an app that toggles an LED on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/Blinky.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Webserver</h4>
                        <p>Create a Webserver app that toggles an LED on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/BlinkyWebServer.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Headless</h4>
                        <p>Create an app with no UI that toggles an LED on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/BlinkyHeadless.htm">Learn More</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Console App</h4>
                        <p>Create a console application that monitors memory usage on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/ConsoleApp.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>I2C Accelerometer</h4>
                        <p>Create an app leveraging I2C on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/I2CAccelerometer.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>SPI Display</h4>
                        <p>Create an app using SPI on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/SPIDisplay.htm">Learn More</a>
                    </div>
				    <div class="col-md-3">
                        <h4>Driver Sample</h4>
                        <p>Create and interact with a universal driver on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/DriverLab.htm">Learn More</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>'Hello World' Node.js App (Windows Universal)</h4>
                        <p>Create a 'Hello World' Node.js app that runs on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/NodejsWU.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Node.js App (Windows Universal)</h4>
                        <p>Build a Node.js server that can control an LED connected to your device running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/NodejsWUBlinky.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>AllJoyn</h4>
                        <p>Explore the capabilities of the AllJoyn Device System Bridge, turn Z-Wave devices and even GPIO pins into AllJoyn devices with Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/AllJoynSamples.htm">Learn More</a>
                    </div>
				    <div class="col-md-3">
                        <h4>I2C Port Expander (RPi2 Basic Kit Lab)</h4>
                        <p>Raspberry Pi 2 Basic Kit Lab - Create an app that uses the Raspberry Pi 2 I2C bus to communicate with a port expander.</p>
                        <a href="{{site.baseurl}}/win10/samples/I2CPortExpander.htm">Learn More</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>'Hello World' Python App</h4>
                        <p>Create a python application on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/Python.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Python App</h4>
                        <p>Build a Python app with no UI that toggles an LED on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/PythonBlinky.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Blinky Python Server</h4>
                        <p>Build a Python web server with no UI that toggles an LED on devices running Windows 10 IoT Core Insider Preview</p>
                        <a href="{{site.baseurl}}/win10/samples/PythonBlinkyServer.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Serial-In, Parallel-Out Shift Register (RPi2 Basic Kit Lab)</h4>
                        <p>Raspberry Pi 2 Basic Kit Lab - Create an app that uses the Raspberry Pi 2 to control LEDs using a serial-in, parallel-out shift register.</p>
                        <a href="{{site.baseurl}}/win10/samples/ShiftRegisterSample.htm">Learn More</a>
                    </div>
                </div>

				<div class="row section-heading">
                   <div class="col-md-3">
                        <h4>RGB LED (RPi2 Basic Kit Lab)</h4>
                        <p>Raspberry Pi 2 Basic Kit Lab - Create an app that uses the Raspberry Pi 2 to toggle an RGB LED.</p>
                        <a href="{{site.baseurl}}/win10/samples/RGBLED.htm">Learn More</a>
                    </div>
					<div class="col-md-3">
                        <h4>Push Button(RPi2 Basic Kit Lab)</h4>
                        <p>Raspberry Pi 2 Basic Kit Lab - Create an app that uses the Raspberry Pi 2 to read the status of a Push Button and control an LED.</p>
                        <a href="{{site.baseurl}}/win10/samples/PushButton.htm">Learn More</a>
                    </div>
					<div class="col-md-3">
                        <h4>Potentiometer Sensor Sample (RPi2 Basic Kit Lab)</h4>
                        <p>Raspberry Pi 2 Basic Kit Lab - A analog sensor is connected to RaspBerry Pi through ADC converter and digital output data is displayed through Monitor and LED </p>
                        <a href="{{site.baseurl}}/win10/samples/potentiometer.htm">Learn More</a>
                    </div>
                </div>


                <div class="row section-heading">
                    <h2>Previous Version of Windows</h2>
                </div>
                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Hello Blinky for Galileo</h4>
                        <p>The Windows IoT Platform that runs on devices like Intel Galileo</p>
                        <a href="{{site.baseurl}}/win8/samples/HelloBlinky.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>TX/RX for Galileo</h4>
                        <p>State of the art IDE, tools and services that you can use to create great IoT apps</p>
                        <a href="{{site.baseurl}}/win8/samples/TXRX.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>UART for Galileo</h4>
                        <p>Provides an integrated developemnt environment for creating efficient high quality drivers for devices running Windows 8.1</p>
                        <a href="{{site.baseurl}}/win8/samples/UART.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>RGB Pixel for Galileo</h4>
                        <p>Provides an integrated developemnt environment for creating efficient high quality drivers for devices running Windows 8.1</p>
                        <a href="{{site.baseurl}}/win8/samples/RGBPixel.htm">Learn More</a>
                    </div>
                </div>

                <div class="row section-heading">
                    <div class="col-md-3">
                        <h4>Weather Shield Sensors for Galileo</h4>
                        <p>The Windows IoT Platform that runs on devices like Intel Galileo</p>
                        <a href="{{site.baseurl}}/win8/samples/WeatherShieldSensors.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>OneNote API using http for Galileo</h4>
                        <p>State of the art IDE, tools and services that you can use to create great IoT apps</p>
                        <a href="{{site.baseurl}}/win8/samples/TODO_Sample.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Servo for Galileo</h4>
                        <p>Provides an integrated developemnt environment for creating efficient high quality drivers for devices running Windows 8.1</p>
                        <a href="{{site.baseurl}}/win8/samples/Servo.htm">Learn More</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Phidget Sensors for Galileo</h4>
                        <p>Provides an integrated developemnt environment for creating efficient high quality drivers for devices running Windows 8.1</p>
                        <a href="{{site.baseurl}}/win8/samples/PhidgetsSensors.htm">Learn More</a>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
