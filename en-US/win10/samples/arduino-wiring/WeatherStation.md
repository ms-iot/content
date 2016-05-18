---
layout: default
title: Arduino Wiring Weather Station
permalink: /en-US/win10/samples/arduino-wiring/WeatherStation.htm
lang: en-US
---

# Weather Station + Lightning

{% include VerifiedVersion.md %}

Learn how to create an Arduino Wiring sketch on Raspberry Pi 2 or 3 and set up your own Weather Station using the power of Lightning.  Gathering weather data from your surroundings is as easy as connecting a [Sparkfun Weather Shield](https://www.sparkfun.com/products/12081) to your Raspberry Pi 2 or 3 and deploying a UWP app. This shield mainly utilizes two sensors, the [HTU21D Humidity and Temperature Sensor](https://www.sparkfun.com/products/12064) and the [MPL3115A2 Altitude/Pressure Sensor](https://www.sparkfun.com/products/11084), but is also expandable to read wind and rain levels. You can replicate this entire project with the shield itself or with the individual sensors.

Read on to get started!

## Hardware Set Up

<div class="row">
  <p>
    The first step is to hook your Raspberry Pi 2 or 3 up to the Sparkfun Weather Shield.  Use the wiring diagram and photos in the carousel below for reference. <i> Note: This feature requires JavaScript.  If you are experiencing problems with the carousel, make sure that JavaScript is enabled on your browser. </i> You can also refer to the fritzing diagram below the reference images.
  </p>
  <div class="col-md-6 col-sm-12">
    <div class="floatTop">
    Pinout Diagram (Raspberry Pi 2 or 3 --> Sparkfun weather shield):
      <ul>
        <li> GND-------(black)------GND </li>
        <li> 5V----------(red)---------VIN </li>
        <li> 3V3-------(brown)------5V (shield hack; not a typo) </li>
        <li> GPIO2-----(yellow)----SDA </li>
        <li> GPIO3----(orange)----SCL </li>
        <li> GPIO5-----(green)-----D8 </li>
        <li> GPIO6-----(blue)-------D7 </li>
      </ul>
    </div>
  </div>

  <div class="col-md-6 col-sm-12">
    <div id="carousel" data-interval="false" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carousel" data-slide-to="0" class="active"></li>
        <li data-target="#carousel" data-slide-to="1"></li>
        <li data-target="#carousel" data-slide-to="2"></li>
        <li data-target="#carousel" data-slide-to="3"></li>
        <li data-target="#carousel" data-slide-to="4"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
      <div class="item active">
          <img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png">
          <div class="carousel-caption">
            Rasberry Pi 2 and 3 GPIO Schematic
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_RasPi2_inside.jpeg">
          <div class="carousel-caption">
            Raspberry Pi 2 or 3 Wiring Diagram (Inside)
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_RasPi2_outside.jpeg">
          <div class="carousel-caption">
            Raspberry Pi 2 or 3 Wiring Diagram (Outside)
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_WeatherShield_LeftRail.jpeg" >
          <div class="carousel-caption">
            Weather Shield (Light Rail)
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_WeatherShield_RightRail.jpeg" >
          <div class="carousel-caption">
            Weather Shield (Right Rail)
          </div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>

### Fritzing Diagram

![RPI Pinouts]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_weathershield.png)

## Software Set Up

There are two ways to go about seting up the software.

<strong>Option 1: Clone the Entire Solution</strong>

<p>The easiest way to get your Weather Station up and running is to clone the entire solution from the "Lightning" folder of <a href="https://github.com/turkycat/Weather_Shield"> this GitHub Repo </a> onto your local machine.</p>

<strong>Option 2: Set Up Your Solution Manually</strong>

<p>If you'd prefer to set up your solution manually, follow these steps:</p>

<ol>
    <li>Create a new project by following the <a href="{{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm" target="_blank">Arduino Wiring Project Setup Guide</a>.</li>
    <li>Clone the following libraries from GitHub into the WeatherShield folder(at the same level as your .vcxproj file): <a target="_blank" href="https://github.com/sparkfun/MPL3115A2_Breakout/">MPL3115A2 Breakout</a> and <a target="_blank" href="https://github.com/sparkfun/HTU21D_Breakout">HTU21D Breakout</a>.</li>
    <li>Replace the existing code in your main .ino file ({yourProject}.ino, where {yourProject} is whatever you named the project when you created it) with the following code:
      {% highlight C++ %}
        /*
        HTU21D Humidity Sensor Example Code
        By: Nathan Seidle
        SparkFun Electronics
        Date: September 15th, 2013
        License: This code is public domain but you buy me a beer if you use this and we meet someday (Beerware license).
        Uses the HTU21D library to display the current humidity and temperature
        Open serial monitor at 9600 baud to see readings. Errors 998 if not sensor is detected. Error 999 if CRC is bad.
        Hardware Connections (Breakoutboard to Arduino):
        -VCC = 3.3V
        -GND = GND
        -SDA = A4 (use inline 10k resistor if your board is 5V)
        -SCL = A5 (use inline 10k resistor if your board is 5V)
        */

        #include <Wire.h>
        #include "HTU21D\Libraries\Arduino\src\SparkFunHTU21D.h"
        #include "MPL3115A2\Libraries\Arduino\src\SparkFunMPL3115A2.h"

        //Create an instance of the object
        HTU21D myHumidity;
        MPL3115A2 myPressure;

        bool barometerMode = true;

        void setup()
        {
            Wire.begin();
            Log( "WeatherShield Example!" );

            myHumidity.begin();
            myPressure.begin();

            if( barometerMode )
            {
                myPressure.setModeBarometer(); // Measure pressure in Pascals from 20 to 110 kPa
            }
            else
            {
                myPressure.setModeAltimeter(); // Measure altitude above sea level in meters
            }

            myPressure.setOversampleRate( 7 ); // Set Oversample to the recommended 128
            myPressure.enableEventFlags(); // Enable all three pressure and temp event flags
        }

        void loop()
        {
            /*
            * from HTU21D Sample - SparkFun_HTU21D_Demo.ino
            */
            float humd = myHumidity.readHumidity();
            float temp = myHumidity.readTemperature();

            Log( "Time:" );
            Log( millis().ToString()->Begin() );
            Log( " Temperature: " );
            Log( temp.ToString()->Begin() );
            Log( "C" );
            Log( " Humidity: " );
            Log( humd.ToString()->Begin() );

            if( barometerMode )
            {
                /*
                * From MPL3115A2 Sample - SparkFunPressure.ino
                * MODE MUST BE IN BAROMETER
                */

                float altitude = myPressure.readAltitude();
                Log( " Altitude(m): " );
                Log( altitude.ToString()->Begin() );

                altitude = myPressure.readAltitudeFt();
                Log( " Altitude(ft): " );
                Log( altitude.ToString()->Begin() );

                float pressure = myPressure.readPressure();
                Log( " Pressure(Pa): " );
                Log( pressure.ToString()->Begin() );

                float temperature = myPressure.readTemp();
                Log( " Temp(c): " );
                Log( temperature.ToString()->Begin() );

                temperature = myPressure.readTempF();
                Log( " Temp(f): " );
                Log( temp.ToString()->Begin() );


                /*
                * From MPL3115A2 Sample - SparkFunBarometricHgInch.ino
                * MODE MUST BE IN BAROMETER
                */
                const int station_elevation_m = 1638; //Accurate for the roof on my house
                                                      //1 pascal = 0.01 millibars
                pressure /= 100; //pressure is now in millibars

                float part1 = pressure - 0.3; //Part 1 of formula

                const float part2 = 8.42288 / 100000.0;
                float part3 = pow( ( pressure - 0.3 ), 0.190284 );
                float part4 = (float)station_elevation_m / part3;
                float part5 = ( 1.0 + ( part2 * part4 ) );
                float part6 = pow( part5, ( 1.0 / 0.190284 ) );
                float altimeter_setting_pressure_mb = part1 * part6; //Output is now in adjusted millibars
                float baroin = altimeter_setting_pressure_mb * 0.02953;

                Log( " Altimeter setting InHg: " );
                Log( baroin.ToString()->Begin() );
            }
            else    //altimeter mode
            {
                /*
                * From SparkFunAltimeter.ino
                * MODE MUST BE IN ALTIMETER
                */
                float altitude = myPressure.readAltitude();
                Log( "Altitude(m): " );
                Log( altitude.ToString()->Begin() );

                altitude = myPressure.readAltitudeFt();
                Log( " Altitude(ft): " );
                Log( altitude.ToString()->Begin() );

                float pressure = myPressure.readPressure();
                Log( "Pressure(Pa): " );
                Log( pressure.ToString()->Begin() );

                float temperature = myPressure.readTemp();
                Log( " Temp(c): " );
                Log( temperature.ToString()->Begin() );

                temperature = myPressure.readTempF();
                Log( " Temp(f): " );
                Log( temperature.ToString()->Begin() );
            }

            Log( "\n" );

            delay( 1000 );
        }

      {% endhighlight %}
    </li>
</ol>

#### Note:
Pay special attention to this line near the top of the sketch file: `bool barometerMode = true;`. The MPL3115A2 sensor has two modes, and can operate differently under each mode. You can change this variable to `false` to disable barometer mode and enable altimeter mode instead! The result of the sketch will automatically change under the new mode!

## Build and Deploy Your App

<p>Press F5 to build and deploy your project.
Refer to the <a href="{{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm">Arduino Wiring Project Guide</a> for more instructions on how to deploy your app!
</p>
<p>
Once your project is deployed, you will see data appear in the output console while the program is running.
</p>

## Result

Watch your Output window in Visual Studio. The sketch will start reporting the data it gathers from the Weather Shield!

## Having trouble?

Refer to the [Arduino Wiring Porting Guide]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm) for common issues and concerns when working with Arduino Wiring sketches.

---

[&laquo; Return to Samples]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
