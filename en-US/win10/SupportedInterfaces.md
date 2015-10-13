---
layout: default
title: Ecosystem Compatibility List
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---
<style>
a {cursor:pointer}
td:nth-child(1)
{
    width: 200px;
}
td:nth-child(2)
{
    width: 40px;
}
td:nth-child(3)
{
    width: 300px;
}
td:nth-child(4)
{
    width: 200px;
}
td:nth-child(5)
{
    width: 200px;
}
.searchbox
{
	background-color: #f2f2f2;
	width: 600px;
	padding: 15px;
}

.searchbox a
{
	padding-left: 20px;
}

.searchbox a:hover
{
	text-decoration: underline;
}

.searchbox div
{
	margin: 10px;
}
</style>

# {{page.title}}
Windows 10 IoT Core supports a variety of peripheral interfaces and protocols, including support for common busses like I2C, UART, USB, and more. Use this page to browse devices that are known to be compatible with Windows 10 IoT Core. This list is **not** exhaustive. There are many other peripherals not listed on this page that are compatible with Windows 10 IoT Core. We encourage you to contribute to this list to improve this resource!

Browse, search, and filter, peripherals that are known to be supported on the **Raspberry Pi 2** and **MinnowBoard Max**. [Contribute to this list on GitHub.]({{site.repositoryurl}}{{ page.path }})

This page makes use of JavaScript. If you have JavaScript disabled, search tools will be disabled.

Looking for information about supported hardware platforms? Click [here](https://msdn.microsoft.com/library/windows/hardware/dn914597(v=vs.85).aspx) to be taken to a list of development boards compatible with Windows.

<div class="searchbox">
<div>
<h3> Search Tools </h3>
Filter lists by board type:
	<select id="boardSelect" onchange="filterDeviceRows();">
	  <option value=".">All</option>
	  <option value="RPI2">RPI2</option>
	  <option value="MBM">MBM</option>
	</select>
</div>
<div>
	Search <b> all </b> lists by Part Name/Model:
	<input id="filterInput" oninput="filterDeviceRows();"/>
	<button onClick="$('#filterInput')[0].value='';filterDeviceRows();">Clear</button>
</div>
<div>
	<a onClick="collapseAll(); return false;"> - Collapse all Sections	</a>
	<a onClick="expandAll(); return false;"> + Expand all Sections </a>
</div>
</div>

<div class="SearchResultsSection" markdown="1" style="display:none">
## <a name="SearchResults" class="SearchResults" onClick="toggleSection('SearchResults');return false;">- Search Results</a>
<div class="SearchResults" markdown="1">

{:.table.table-bordered .SearchResults}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
result | result | result | result | result

</div></div>


## <a name="USBDevices" class="USBDevices" onClick="toggleSection('USBDevices');return false;">- USB Devices</a>
<div class="USBDevices" markdown="1">
- [WiFi Dongles](#WiFi-Dongles)
- [Bluetooth Dongles](#Bluetooth-Dongles)
- [Cameras](#Cameras)
- [Audio](#Audio)
- [Miscellaneous](#Miscellaneous)

### WiFi Dongles {#WiFi-Dongles}

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Official Raspberry Pi WiFi dongle | RPI2 | "Official Raspberry Pi WiFi dongle offering the best possible WiFi performance for its diminutive size." |  |
Airlink Wireless N 150 Mini USB Adapter Adapter | MBM | Airlink101 AWL5077 Golden 150Mbps Wireless Mini USB Adapter with WPA2, WPA, and WEP enhanced wireless security |  |
Panda PAU06 | MBM | Panda 300Mbps Wireless N USB Adapter with High Gain Antenna |  |
TP-LINK TL_WN725N | MBM | TP-LINK TL-WN725N Wireless N Nano USB Adapter 150Mbps |  |
NET-DYN USB Wifi Adapter | MBM | Wifi USB Adapter NET-DYN |  |
Realtek 8191 USB Wireless WIFI | MBM | Realtek 8191 300Mbps 802.11n/g/b USB Wireless WIFI LAN Network Card Adapter |  |
Realtek 8192 USB Wireless WIFI | MBM | Realtek Single-Chip IEEE 802.11b/g/n 2T2R WLAN Controller with USB 2.0 Interface |  |

### Bluetooth Dongles {#Bluetooth-Dongles}

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
CSR Mini USB Bluetooth V4.0 Adapter | RPI2, MBM | Class 2 Bluetooth 4.0 Smart Ready Adapter, low energy, dual power |  |
ORICO BTA-403 Mini Bluetooth 4.0 USB Dongle | RPI2, MBM | Low Energy Bluetooth 4.0 Adapter USB Micro Adapter Dongle |  |
CSR Mini USB Bluetooth V4.0 Adapter | MBM | Class 2 Bluetooth 4.0 Smart Ready Adapter, low energy, dual power |  |

### Cameras {#Cameras}

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Microsoft Lifecam 3000 USB Camera | RPI2, MBM | USB Webcam | Limited to less than 5 frames per second, no known performance workarounds | [Home Security Camera Project]({{site.baseurl}}/{{page.lang}}/win10/samples/WebCamSample.htm)
Microsoft Lifecam HD-5000 | RPI2, MBM | Microsoft LifeCam HD-5000 720p HD Webcam | USB 2.0 |
Logitech Webcam C210 | RPI2, MBM | USB Webcam, 1.3mp photo | |

### Audio {#Audio}

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Sabrent USB External Stereo Sound Adapter, Model AU-EMAC1 | RPI2, MBM | Converts USB to 3.5mm audio and microphone signals. | Attaching an external USB sound card to RPi2 will add an extra audio endpoint (playback device) to the already existing onboard PWM headphone jack. Since the default order of the audio devices cannot be guaranteed at reboot, it is recommended that applications enumerate the audio endpoints and ensure the correct one is used. |

### Miscellaneous {#Miscellaneous}

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Aeon Labs Z-Wave Z-Stick Series 2 USB Dongle DSA02203-ZWUS | RPI2 | Series 2 Z-Wave USB Z-Stick Controller | Easy network creation with push button pairing | [ZWave Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveTutorial.htm)
Chalkboard Electronics 7" LCD Capacitive Touchscreen Display | RPI2 | For product information see [the product website](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861) | To get this working with Windows 10 IoT Core, do the following: <br /> 1. Follow the [Firmware Update instructions]('http://www.chalk-elec.com/?p=1826') on chalk-elec.com <br /> 2. Flash firmware version 7-bf-mt-v2-2.hex onto the touchscreen <br /> 3. Hookup the HDMI and USB cables to the RPI2 <br /> 4. Power on the touchscreen first, then power on your RPI2 | [Product Webpage](http://www.chalk-elec.com/?page_id=1280#!/7-black-frame-universal-HDMI-LCD-with-capacitive-multi-touch/p/21750201/category=3094861) <br /> [Firmware Flashing Instructions](http://www.chalk-elec.com/?p=1826)

</div>

## <a name="OtherDevices" class="OtherDevices" onClick="toggleSection('OtherDevices');return false;">- Other Hardware Peripherals (e.g., Sensors, ICs)</a>
<div class="OtherDevices" markdown="1">

- [Storage](#Storage)
- [Pi Hats](#Pi-Hats)
- [Sensors](#Sensors)
- [Port Expanders](#Port-Expanders)
- [Miscellaneous](#OtherDevicesMisc)

### Storage Media <a name="Storage"></a>

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Samsung 32GB EVO Class 10 Micro SDHC | RPI2, MBM | An SD card that's known to support running Windows 10 IoT Core on both the Raspberry Pi 2 and MBM. |  | [Amazon.com Product Page](http://www.amazon.com/gp/product/B00IVPU786) 
SanDisk Ultra Micro SDHC 16GB | RPI2, MBM | An SD card that's known to support running Windows 10 IoT Core on both the Raspberry Pi 2 and MBM. |  | [Amazon.com Product Page](http://www.amazon.com/SanDisk-Ultra-Micro-SDHC-16GB/dp/9966573445) 

### Pi Hats <a name="Pi-Hats"></a>

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Adafruit 16-Channel PWM | RPI2 | Adds the capability to control up to 16 servos with no additional Raspberry Pi processing overhead. Capable of doing PWM up to 1.6KHz with 12 bit precision. | Fairly easy to use. It can also drive LEDs. | [Adafruit Product Page](http://www.adafruit.com/products/2327#description-anchor)<br/>[Adafruit Tutorial](https://learn.adafruit.com/adafruit-16-channel-pwm-servo-hat-for-raspberry-pi/overview)<br/>[C# IoT Sample](https://github.com/golaat/Adafruit.Pwm)
[Add a confirmed Pi Hat! Contibute to this list on GitHub.]({{site.repositoryurl}}{{ page.path }})||||

### Sensors <a name="Sensors"></a>

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
DHT11 basic temperature-humidity sensor | RPI2, MBM | A basic, ultra low-cost digital temperature and humidity sensor. It uses a capacities humidity sensor and a thermistor to measure the surrounding air, and spits out a digital signal on the data pin (no analog input pins needed). (Desc and Notes via Adafruit) | Its fairly simple to use, but requires careful timing to grab data. The only real downside of this sensor is you can only get new data from it once every 2 seconds, so when using our library, sensor readings can be up to 2 seconds old. | [GpioOneWire Sample (DHT11)]({{site.baseurl}}/{{page.lang}}/win10/samples/GpioOneWire.htm)
DHT22 temperature-humidity sensor | RPI2, MBM | A basic, ultra low-cost digital temperature and humidity sensor. It uses a capacities humidity sensor and a thermistor to measure the surrounding air, and spits out a digital signal on the data pin (no analog input pins needed). (Desc and Notes via Adafruit) | Its fairly simple to use, but requires careful timing to grab data. The only real downside of this sensor is you can only get new data from it once every 2 seconds, so when using our library, sensor readings can be up to 2 seconds old. | [GpioOneWire Sample (DHT11)]({{site.baseurl}}/{{page.lang}}/win10/samples/GpioOneWire.htm)
SparkFun Triple Axis Accelerometer Breakout - ADXL345 | RPI2, MBM | Small, thin, low power, 3-axis MEMS accelerometer with high resolution (13-bit) measurement at up to &plusmn;16 g. Digital output data is formatted as 16-bit twos complement and is accessible through either a SPI (3- or 4-wire) or I2C digital interface. |  | [I2C Accelerometer Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/I2CAccelerometer.htm#I2C_Accelerometer)
Adafruit BMP280 Temperature and Barometric Sensor | RPI2 | Bosch environmental sensor with temperature, barometric pressure | barometric pressure with &plusmn;1 hPa absolute accuraccy, and temperature with 1.0&deg;C accuracy. | [Adafruit Starter Pack]({{site.baseurl}}/{{page.lang}}/AdafruitKitContents.htm)
Adafruit TCS34725 Color Sensor | RPI2 | RGB Color Sensor with IR filter and White LED - TCS34725 | [Link to product on Adafruit](http://www.adafruit.com/products/1334) | [Adafruit Starter Pack]({{site.baseurl}}/{{page.lang}}/AdafruitKitContents.htm)

### Port Expanders <a name="Port-Expanders"></a>

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
MCP23008 8-bit I/O Port Expander | RPI2, MBM | I<sup>2</sup>C Interface Chip, GPIO Port Expander.  8 ports, 18-PDIP package | Used in multiple MS-IoT sample projects | [I2C Port Explander Sample](https://www.hackster.io/4803/i2c-port-expander-sample)
MCP23S17 16-bit I/O Port Expander | RPI2, MBM | I<sup>2</sup>C Interface Chip, GPIO Port Expander.  16 ports, 28-SPDIP package | Used in multiple MS-IoT sample projects | [//build 2014 - Piano](https://www.hackster.io/windowsiot/build-2014-piano)

### Miscellaneous <a name="OtherDevicesMisc"></a>

{:.table.table-bordered .devices}
Part Name / No. | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
Monochrome 1.3" 128x64 OLED graphic display | RPI2, MBM | 1.3" diagonal, high contrast B/W OLED display. 128x64 individual white OLED pixels, each one is turned on or off by the controller chip. |  | [SPI Display Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm)
SN74HC595N Shift Register IC | RPI2, MBM | IC 8-BIT SHIFT REGISTER 16-DIP |  | [Shift Register Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/ShiftRegisterSample.htm)
Microchip Technology ADC MCP3002-I/P | RPI2, MBM | MCP3002 10bit Analog to Digital converter |  | [Potentiometer Sensor Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm)
Microchip Technology ADC MCP3208-CI/P | RPI2, MBM | MCP3208 12bit Analog to Digital converter |  | [Potentiometer Sensor Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm)
ADS1115 | RPI2, MBM | Ultra-Small, Low-power, 16bit ADC | ADC bus provider library provided in library section | [ADC Bus Providers]({{site.msiotorgurl}}/BusProviders/tree/develop/ADC)
CP2102 USB 2.0 to TTL Module Serial Converter | RPI2, MBM | USB 2.0 to TTL UART 6PIN CP2102 Module Serial Converter |  | [Serial Port Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm)
PCA9685 | RPI2, MBM | 16-channel, 12-bit PWM Fm+ I2C-bus LED controller | PWM bus provider library provided in library section | [PWM Bus Providers]({{site.msiotorgurl}}/BusProviders/tree/develop/PWM)

</div>

## <a name="Libraries" class="Libraries" onClick="toggleSection('Libraries');return false;">- Third Party Software Libraries</a>
<div class="Libraries" markdown="1">

### Libraries <a name="Libraries"></a>

{:.table.table-bordered .devices}
Library Name | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
ZWaveAdapter    | RPI2, MBM | Zwave solution to enable developer to add a Zwave Adapter and connect it to the AllJoyn network | Demonstrates the function of Z-Wave device on Device System Bridge (DSB), Used as part of the ZWave demo in //Build/2015 | [ZWave Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveTutorial.htm)
AllJoyn Device System Bridge App Project | RPI2, MBM | Use to expose a GPIO Device to the AllJoyn Bus using the AllJoyn Device System Bridge | | [Alljoyn DSB Gpio C# Sample]({{site.baseurl}}/{{page.lang}}/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm)

### Bus Providers <a name="BusProviders"></a>

{:.table.table-bordered .devices}
Bus Provider | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
ADC | RPI2, MBM | provides support for ADC IC such as ADS1115 | bus provider library provided in MSIOT GitHub | [ADC Bus Providers]({{site.msiotorgurl}}/BusProviders/tree/develop/ADC)
PWM | RPI2, MBM | provides support for PWM capable devices such as PCA9685 (in Devices above) | PWM bus provider library provided in MSIOT GitHub | [PWM Bus Providers]({{site.msiotorgurl}}/BusProviders/tree/develop/PWM)

</div>

## <a name="SupportedBusses" class="SupportedBusses" onClick="toggleSection('SupportedBusses');return false;">- Supported Busses</a>
<div class="SupportedBusses" markdown="1">

### Supported Busses <a name="SupportedBusses"></a>

{:.table.table-bordered .devices}
Bus Type | Compatible Boards | Description | Notes | Projects, Samples, Libraries
----------------|-------------------|-------------|-------|------------------------------
GPIO    | RPI2, MBM | 13x GPIO on RPI2, 10x on MBM | General Purpose I/O |
I2C | RPI2, MBM | Generic I2C bus | | [RPI2 Pin Mapping]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_I2C) [MBM Pin Mapping]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_I2C)
UART | RPI2, MBM | Generic UART Bus | RPI2 Requires USB to UART converter, MBM has onboard UART |

</div>

<script>
	  function filterDeviceRows()
	  {
				var selectedBoard = $("#boardSelect option:selected")[0].value;
				var boardColumn = 1; // compatible boards
				var searchColumn = 0; // model
				var searchString = $("#filterInput")[0].value;
				if (searchString=='') {searchString = '.';}
				var regExBoard = new RegExp(selectedBoard,"i");
				var regEx = new RegExp(searchString,"i");

				var rows = $(".devices tr");
				var searchResults = [];
				for (var rowNbr = 0; rowNbr < rows.length; rowNbr++){
					if (rows[rowNbr].rowIndex > 0)
					{
						if ( rows[rowNbr].cells[boardColumn].innerHTML.match(regExBoard))
						{
							if ( rows[rowNbr].cells[searchColumn].innerHTML.match(regEx))
							{
								searchResults.push(rows[rowNbr]);
					    }
							rows[rowNbr].style.display = "";
				    }
				    else
				    {
							rows[rowNbr].style.display = "none";
						}

					}
				}

				//Update search results
				if (searchString > '.' )
				{
					var searchTable = $('table.SearchResults')[0];

					// remove existing rows
					$('table.SearchResults tr').has('td').remove();

					// Add all found rows
					for (var rowNbr = 0; rowNbr < searchResults.length; rowNbr++){
							var row = searchTable.insertRow(searchTable.rows.length);
							for (cellNbr = 0; cellNbr < searchTable.rows[0].cells.length; cellNbr++) {
	        			var cell = row.insertCell(cellNbr);
	        			cell.innerHTML = searchResults[rowNbr].cells[cellNbr].innerHTML;
	       			}
					}
					$("div.SearchResultsSection").show();
				}
				else
				{
					$("div.SearchResultsSection").hide();
				}
		}

		function toggleSection(section) {
			$("div[class="+section+"]").toggle('slow');
			var titleObj = $("a[class="+section+"]")[0];
			var title = titleObj.text;
			if (title.charAt(0) == '+')
			{
				titleObj.text = '-'+title.substr(1);
			}
			else
			{
				titleObj.text = '+'+title.substr(1);
			}
		}

		function changeSectionState(section, undesiredState) {
			var titleObj = $("a[class="+section+"]")[0];
			var title = titleObj.text;
			if (title.charAt(0) == undesiredState)
			{
				return true;
			}

			toggleSection(section);
		}

		function collapseAll() {
			changeSectionState('OtherDevices', '+');
			changeSectionState('USBDevices', '+');
			changeSectionState('Libraries', '+');
			changeSectionState('SupportedBusses', '+');
		}

		function expandAll() {
			changeSectionState('OtherDevices', '-');
			changeSectionState('USBDevices', '-');
			changeSectionState('Libraries', '-');
			changeSectionState('SupportedBusses', '-');
		}

		window.onload = function() {
      collapseAll();
    }
</script>
