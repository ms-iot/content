---
layout: default
title: 硬件兼容性列表
description: Windows 10 IoT 核心版支持各种外设接口和协议，包括对诸如 I2C、UART、USB 等常见总线的支持。
keyword: windows iot, hardware, compatibility, interfaces
permalink: /zh-cn/win10/SupportedInterfaces.htm
lang: zh-CN
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
Windows 10 IoT 核心版支持各种外设接口和协议，包括对诸如 I2C、UART、USB 等常见总线的支持。本页面列出已知受支持的外设，并且是目前最新的 RTM 版本。特定条目可能仅适用于预览版，并将这些条目作出说明。

对 Windows 10 IoT 核心版设备上受支持的已知外设进行浏览、搜索和筛选。还可以在 GitHub 上通过单击“参与”链接来参与对此列表的编写。

此列表并不详尽。此页面上并未列出许多与 Windows 10 IoT 核心版兼容的其他外设。我们鼓励你参与对此列表的编写，以改善此资源！

是否在查找有关受支持的硬件平台的信息？ 单击 \[此处\]\(https://msdn.microsoft.com/library/windows/hardware/dn914597(v=vs.85).aspx\) 以访问与 Windows 兼容的开发板列表。

<div class="searchbox">
	<div id='javascriptWarn' class='javascriptWarn'>
		只有启用 Javascript，此页面才可以正常工作。
	</div>
	<div class="searchTools" style="display:none">
		<div>
			<h3> 搜索和筛选 </h3>
			按开发板类型筛选列表：
			<select id="boardSelect" onchange="filterDeviceRows();">
			  <option value=".">全部</option>
			  <option value="RPI2">RPi2/RPi3</option>
			  <option value="MBM">MBM</option>
			</select>
		</div>
		<div>
			按“部件名称/型号”搜索“全部”<b></b>列表：
			<input id="filterInput" oninput="filterDeviceRows();"/>
			<button onClick="$('#filterInput')[0].value='';filterDeviceRows();">清除</button>
		</div>
		<div>
			<a onClick="showHideAll(false); return false;"> 隐藏所有部分	</a>
			<a onClick="showHideAll(true); return false;"> 显示所有部分</a>
		</div>
	</div>
</div>

<div class="SearchResultsSection" markdown="1" style="display:none">
## <a name="SearchResults" class="SearchResults" onClick="toggleSection('SearchResults');return false;">搜索结果</a>
<div class="SearchResults" markdown="1">

{:.table.table-bordered .SearchResults}
部件名称 / 编号 | 兼容的开发板 | 描述 | 注意事项  | 项目、示例、库 |Microsoft 验证                  |
----------------|-------------------|-------------|--------|------------------------------|------------------------------------|
结果          | 结果            | 结果      | 结果 | 结果                       | 结果                              |

</div></div>


<h2> <a onClick="toggleSection('USBDevices');return false;">USB 设备</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('USBDevices');return false;">显示/隐藏</a>
		<a class="sectionContribute" onClick="contribute('USBDevices');return false;">参与</a>
	</div>
</h2>
<div class="USBDevices section" markdown="1">
{% include_relative SupportedInterfaces/USBDevices.md %}
</div>

<h2> <a onClick="toggleSection('ArduinoPeripherals');return false;">Arduino 外设</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('ArduinoPeripherals');return false;">显示/隐藏</a>
		<a class="sectionContribute" onClick="contribute('ArduinoPeripherals');return false;">参与</a>
	</div>
</h2>
<div class="ArduinoPeripherals section" markdown="1">
{% include_relative SupportedInterfaces/ArduinoPeripherals.md %}
</div>

<h2> <a onClick="toggleSection('OtherDevices');return false;">其他硬件外设（例如，传感器、IC）</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('OtherDevices');return false;">显示/隐藏</a>
		<a class="sectionContribute" onClick="contribute('OtherDevices');return false;">参与</a>
	</div>
</h2>
<div class="OtherDevices section" markdown="1">
{% include_relative SupportedInterfaces/OtherDevices.md %}
</div>

<h2> <a onClick="toggleSection('Libraries');return false;">第三方软件库</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('Libraries');return false;">显示/隐藏</a>
		<a class="sectionContribute" onClick="contribute('Libraries');return false;">参与</a>
	</div>
</h2>
<div class="Libraries section" markdown="1">
{% include_relative SupportedInterfaces/Libraries.md %}
</div>

<h2> <a onClick="toggleSection('SupportedBusses');return false;">受支持的总线</a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('SupportedBusses');return false;">显示/隐藏</a>
		<a class="sectionContribute" onClick="contribute('SupportedBusses');return false;">参与</a>
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
[MSVerified]: {{site.baseurl}}/Resources/images/checkmark.svg "Microsoft 验证"
\[在 GitHub 上生成此列表\]：{{site.repositoryurl}}{{ page.path }}
[RPi2 or RPi3 Pin Mapping]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsRPi2.htm#RPi2_I2C
[MBM Pin Mapping]: {{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm#MBM_I2C
[ZWave Sample]: {{site.baseurl}}/{{page.lang}}/win10/samples/ZWaveAdapter.htm
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

