---
layout: default
title: Board Comparison
permalink: /en-US/BoardComparison.htm
lang: en-US
---
<ol class="breadcrumb">
  <li>
    <a href="https://dev.windows.com/en-us/iot">IoT Home</a>
  </li>
  <li>
    <a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">Get Started</a>
  </li>
  <li class="active">Choose a Board</li>
</ol>
<h1 class="page-title"> Choose a Board </h1>
<h2 class="subtext"> Compare the features and functionality of various compatible Windows 10 IoT Core development boards. </h3>
<h3>Compatible Windows 10 IoT Core Platforms</h3>
<hr>
<p> Currently, Windows 10 IoT Core is supported on the Raspberry Pi 3, Raspberry Pi 2, MinnowBoard MAX and the Dragonboard 410c. Learn more about the capabilities of each board below, and check out the <a href="http://go.microsoft.com/fwlink/p/?linkID=532948"> supported hardware peripherals </a> for each board to decide what board is right for you.</p>
<table class="table table-striped maker-kit">
    <tr></tr>
    <tr>
	  <th style="width:20%"></th>
      <th style="width:20%">
	          <img src="{{site.baseurl}}/Resources/images/devices/RPi3_0.png">
        <h4>Raspberry Pi 3</h4>
        <p>The Raspberry Pi 3 is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses an optional standard keyboard and mouse.  The Raspberry Pi 3 runs Windows 10 IoT Core.</p>
	  </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/RPi2_0.png">
        <h4>Raspberry Pi 2</h4>
        <p>The Raspberry Pi 2 is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses an optional standard keyboard and mouse.  The Raspberry Pi 2 runs Windows 10 IoT Core.</p>
      </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/MBM_0.png">
        <h4>MinnowBoard MAX</h4>
        <p>MinnowBoard MAX is an open hardware embedded board with the Intel Atom E38XX series SOC at its core. MinnowBoard MAX supports Windows 10 IoT Core.</p>
      </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/DB410c.png">
        <h4>DragonBoard 410c</h4>
        <p>The DragonBoard™ 410c based on Linaro 96Boards™ specification features the Qualcomm® Snapdragon™ 410 processor, a Quad-core ARM® Cortex™ A53 at up to 1.2GHz clock speed per core, capable of 32-bit and 64-bit operation. WLAN, Bluetooth, and GPS, all packed into a board the size of a credit card.</p>
      </th>
    </tr>
    <tr>
      <td>SOC</td>
      <td>Broadcom BCM2837</td>
      <td>Broadcom BCM2836</td>
      <td>Intel Atom (x86)</td>
      <td>Qualcomm Snap Dragon 410</td>
    </tr>
    <tr>
      <td>CPU</td>
      <td>900MHz Quad-Core ARM Cortex A53</td>
	  <td>900MHz Quad-Core ARM Cortex A7</td>
      <td></td>
      <td>900MHz Quad-Core ARM Cortex A7</td>
    </tr>
    <tr>
      <td>Memory</td>
	  <td>1GB (shared with GPU)</td>
      <td>1GB (shared with GPU)</td>
      <td>
        1GB($99 MSRP)
        <br>
        2GB($139 MSRP)
      </td>
      <td>1GB</td>
    </tr>
    <tr>
      <td>GPU</td>
	  <td>Broadcom Video Core IV @ 250MHz</td>
      <td>Broadcom Video Core IV @ 250MHz</td>
      <td>Intel HD Graphics</td>
      <td>Qualcomm Adreno 306 @ 400MHz</td>
    </tr>
    <tr>
      <td>USB</td>
	  <td>4 Ports</td>
      <td>4 Ports</td>
      <td>2 Ports (1 USB 2, 1 USB 3)</td>
      <td>4 Ports</td>
    </tr>
    <tr>
      <td>Networking</td>
      <td>
        Features Onboard Wi-Fi 802.11 b/g/n and Onboard BlueTooth 4.1.
		<br>
		Windows 10 IoT Core supports Wi-Fi and BlueTooth dongles or 10/1000MBit/s Ethernet.
	  </td>
      <td>No onboard Wi-Fi or BlueTooth. Supports Wi-Fi and BlueTooth dongles or 10/1000MBit/s Ethernet.</td>
      <td>10/100/1000 Ethernet</td>
      <td>
        Onboard Wi-Fi 802.11 a/b/g/n
        <br>
        Onboard BlueTooth 4.1
      </td>
    </tr>
    <tr>
      <td>Video Output</td>
	  <td>HDMI, DSI</td>
      <td>HDMI, DSI</td>
      <td>Micro HDMI</td>
      <td>HDMI 1080p HD @ 30 fps</td>
    </tr>
    <tr>
      <td>Audio Output</td>
	  <td>Analog via 3.5 mm jack</td>
      <td>Analog via 3.5 mm jack</td>
      <td>
        Digital via HDMI
        <br>
        Analog via MinnowBoard MAX Lure (sold separately)
      </td>
      <td></td>
    </tr>
    <tr>
      <td>GPS</td>
	  <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>
        Peripherals
      </td>
      <td>
        <p>17 GPIO pins plus specific functions. HAT ID bus.</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">Set up your Raspberry Pi 3</a></p>
      </td>	  
      <td>
        <p>17 GPIO pins plus specific functions. HAT ID bus.</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">Set up your Raspberry Pi 2</a></p>
      </td>
      <td>
        <p>8 buffered GPIO pins</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/win10/MBM.htm">Set up your MinnowBoard MAX</a></p>
      </td>
      <td>
        <p>12 GPIO pins</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/win10/DB410c.htm">Set up your DragonBoard 410c</a></p>
      </td>
    </tr>
</table>
