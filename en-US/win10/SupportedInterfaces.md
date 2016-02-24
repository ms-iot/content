---
layout: default
title: Hardware Compatibility List
permalink: /en-US/win10/SupportedInterfaces.htm
lang: en-US
---
<style>
.MsVerified 
{
	margin: 0 auto;
  display: block;
  width: 45px;
  height: 40px;
}
a {cursor:pointer}
h2 
{
	border-bottom: 1px solid #AAAAAA;
	padding-bottom: 10px;
}
.sectionControls
{
	font-size:15px;
	float:right;
	position:relative;
	top:20px;
}
.sectionControls a
{
	padding-left: 10px;
}
tr:nth-child(even) {background: #f2f2f2;}
th {background: #f2f2f2;}
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
td:nth-child(6)
{
    width: 100px;
}
.section {
	padding-left: 10px;
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
Windows 10 IoT Core supports a variety of peripheral interfaces and protocols, including support for common busses like I2C, UART, USB, and more. This page lists known supported peripherals and is current as of the latest RTM release. Specific entries may only work on Insider releases and will be noted as such. 

Browse, search, and filter, peripherals that are known to be supported on Windows 10 IoT Core devices. You can also contribute to this list on GitHub by clicking the "Contribute" links.  

This list is not exhaustive. There are many other peripherals not listed on this page that are compatible with Windows 10 IoT Core. We encourage you to contribute to this list to improve this resource!

Looking for information about supported hardware platforms? Click [here](https://msdn.microsoft.com/library/windows/hardware/dn914597(v=vs.85).aspx) to be taken to a list of development boards compatible with Windows.

<div class="searchbox">
	<div id='javascriptWarn' class='javascriptWarn'>
		Enable Javascript for this page to function properly.
	</div>
	<div class="searchTools" style="display:none">
		<div>
			<h3> Search and Filter </h3>
			Filter lists by board type:
			<select id="boardSelect" onchange="filterDeviceRows();">
			  <option value=".">All</option>
			  <option value="RPI2">RPi2/RPi3</option>
			  <option value="MBM">MBM</option>
			</select>
		</div>
		<div>
			Search <b> all </b> lists by Part Name/Model:
			<input id="filterInput" oninput="filterDeviceRows();"/>
			<button onClick="$('#filterInput')[0].value='';filterDeviceRows();">Clear</button>
		</div>
		<div>
			<a onClick="showHideAll(false); return false;"> Hide all Sections	</a>
			<a onClick="showHideAll(true); return false;"> Show all Sections </a>
		</div>
	</div>
</div>

<div class="SearchResultsSection" markdown="1" style="display:none">
## <a name="SearchResults" class="SearchResults" onClick="toggleSection('SearchResults');return false;">Search Results</a>
<div class="SearchResults" markdown="1">

{:.table.table-bordered .SearchResults}
Part Name / No. | Compatible Boards | Description | Notes  | Projects, Samples, Libraries |Microsoft Verified                  |
----------------|-------------------|-------------|--------|------------------------------|------------------------------------|
result          | result            | result      | result | result                       |result                              |

</div></div>


<h2> <a onClick="toggleSection('USBDevices');return false;">USB Devices </a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('USBDevices');return false;">Show/Hide</a>
		<a class="sectionContribute" onClick="contribute('USBDevices');return false;">Contribute</a>
	</div>
</h2>
<div class="USBDevices section" markdown="1">
{% include_relative SupportedInterfaces/USBDevices.md %}
</div>

<h2> <a onClick="toggleSection('ArduinoPeripherals');return false;"> Arduino Peripherals </a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('ArduinoPeripherals');return false;">Show/Hide</a>
		<a class="sectionContribute" onClick="contribute('ArduinoPeripherals');return false;">Contribute</a>
	</div>
</h2>
<div class="ArduinoPeripherals section" markdown="1">
{% include_relative SupportedInterfaces/ArduinoPeripherals.md %}
</div>

<h2> <a onClick="toggleSection('OtherDevices');return false;"> Other Hardware Peripherals (e.g., Sensors, ICs)</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('OtherDevices');return false;">Show/Hide</a>
		<a class="sectionContribute" onClick="contribute('OtherDevices');return false;">Contribute</a>
	</div>
</h2>
<div class="OtherDevices section" markdown="1">
{% include_relative SupportedInterfaces/OtherDevices.md %}
</div>

<h2> <a onClick="toggleSection('Libraries');return false;"> Third Party Software Libraries</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('Libraries');return false;">Show/Hide</a>
		<a class="sectionContribute" onClick="contribute('Libraries');return false;">Contribute</a>
	</div>
</h2>
<div class="Libraries section" markdown="1">
{% include_relative SupportedInterfaces/Libraries.md %}
</div>

<h2> <a onClick="toggleSection('SupportedBusses');return false;"> Supported Busses</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('SupportedBusses');return false;">Show/Hide</a>
		<a class="sectionContribute" onClick="contribute('SupportedBusses');return false;">Contribute</a>
	</div>
</h2>
<div class="SupportedBusses section" markdown="1">
{% include_relative SupportedInterfaces/SupportedBusses.md %}
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
			$("."+section+".section").toggle('slow');
		}

		function changeSectionState(section, shouldShow) {
			var sectionObj = $("."+section+".section").filter(":visible");
			if (shouldShow && sectionObj == null)
			{
				toggleSection(section);
			}
			if (!shouldShow && sectionObj != null)
			{
				toggleSection(section);
			}
		}

		function showHideAll(shouldShow) {			
			if (shouldShow)
			{
				$(".section").show('slow');
			} else {
				$(".section").hide('slow');
			}
		}
		
		function contribute(section) {			
			var pagePath="{{site.repositoryurl}}{{page.path}}";
			
			var url = pagePath.replace("SupportedInterfaces", "SupportedInterfaces/" + section); 
			
	  	var win = window.open(url, '_blank');
  		win.focus();
		}

		window.onload = function() {
      $(".section").hide();
      $(".javascriptWarn").hide();
      $(".searchTools").show();
      if(window.location.hash) {
			  $(location.hash).parent().show();
			  window.scrollTo(0, $(location.hash).offset().top);
			} 
    }
</script>

<!-- Reference Links -->
[MSVerified]: SupportedInterfaces/checkmark.svg "Microsoft Verified"
[Contribute to this list on GitHub.]: {{site.repositoryurl}}{{ page.path }}
[RPi2 or RPi3 Pin Mapping]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_I2C
[MBM Pin Mapping]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_I2C
[ZWave Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveTutorial.htm
[GpioOneWire Sample (DHT11)]: {{site.baseurl}}/{{page.lang}}/win10/samples/GpioOneWire.htm
[I2C Accelerometer Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/I2CAccelerometer.htm#I2C_Accelerometer
[I2C Port Explander Sample]: https://www.hackster.io/4803/i2c-port-expander-sample
[Adafruit Starter Pack]: {{site.baseurl}}/{{page.lang}}/AdafruitKitContents.htm
[//build 2014 - Piano]: https://www.hackster.io/windowsiot/build-2014-piano
[SPI Display Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/SPIDisplay.htm
[Shift Register Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/ShiftRegisterSample.htm
[Serial Port Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/SerialSample.htm
[Potentiometer Sensor Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/Potentiometer.htm
[ADC Bus Providers]: {{site.msiotorgurl}}/BusProviders/tree/develop/ADC
[PWM Bus Providers]: {{site.msiotorgurl}}/BusProviders/tree/develop/PWM
[Alljoyn DSB Gpio C# Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/AlljoynDSB_ManagedGpioTutorial.htm
[Wiring API]: {{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm
[Weather Station Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/arduino-wiring/WeatherStation.htm
[RGB Pixel Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/arduino-wiring/RGBPixel.htm
[Home Security Camera Project]: {{site.baseurl}}/{{page.lang}}/win10/samples/WebCamSample.htm

