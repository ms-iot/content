<p>
  The publicly available boards below are some of the same devices Microsoft uses as part of our operating system engineering efforts. We support an easy process for you to <a href="{{site.baseurl}}/{{page.lang}}/GetStarted">get started</a> with these devices right away. Learn more about the features of each device below, and check out the <a href="http://go.microsoft.com/fwlink/p/?linkID=532948">supported hardware peripherals</a> for each board to decide what device is right for you. If you don't see a device below that works to prototype or commercialize your idea, please check the Additional Devices or Community Devices.
{% include note.html text="Hardware features listed below may not be fully supported in all configurations." %}</p>
<table class="table table-striped maker-kit">
    <tr></tr>
    <tr>
      <th style="width:20%"></th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/RPi3_0.png">
      </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/RPi2_0.png">
      </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/MBM_0.png">
      </th>
      <th style="width:20%">
        <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/DB410c.png">
      </th>
    </tr>
    <tr></tr>
    <tr>
      <td></td>
      <td><h4>Raspberry Pi 3</h4></td>
      <td><h4>Raspberry Pi 2</h4></td>
      <td><h4>MinnowBoard MAX</h4></td>
      <td><h4>DragonBoard 410c</h4></td>
    </tr>
    <tr>
      <td>SoC</td>
      <td>Broadcom BCM2837</td>
      <td>Broadcom BCM2836</td>      <td><a href="http://ark.intel.com/products/78474/Intel-Atom-Processor-E3825-1M-Cache-1_33-GHz">Intel Atom Processor E3825</a></td>
      <td><a href="https://www.qualcomm.com/products/snapdragon/processors/410">Qualcomm Snapdragon 410</a></td>
    </tr>
    <tr>
      <td>CPU</td>
      <td>1.2GHz Quad-Core ARM Cortex A53</td>
      <td>900MHz Quad-Core ARM Cortex A7</td>
      <td>1.3GHz x86/x64</td>
      <td>1.2GHz Quad-Core ARM Cortex A53</td>
    </tr>
    <tr>
      <td>Memory</td>
      <td>1GB</td>
      <td>1GB</td>
      <td>
        2GB
      </td>
      <td>1GB</td>    </tr>
    <tr>
      <td>GPU</td>
      <td>Broadcom Video Core IV @ 400MHz (no DirectX or Hardware Acceleration support)</td>
      <td>Broadcom Video Core IV @ 250MHz (no DirectX or Hardware Acceleration support)</td>
      <td>Intel HD Graphics</td>
      <td>Qualcomm Adreno 306 @ 400MHz (only 720p / 1280 x 720 supported)</td>
    </tr>
    <tr>
      <td>USB</td>
      <td>4x USB 2.0</td>
      <td>4x USB 2.0</td>
      <td>1x USB 2.0, 1x USB 3.0</td>
      <td>2x USB 2.0</td>
    </tr>
    <tr>
      <td>Networking</td>
      <td>
        Wi-Fi 802.11 b/g/n
        <br>
        10/100/1000 MBit/s Ethernet
        <br>
        Bluetooth 4.1
      </td>
      <td>10/100/1000 MBit/s Ethernet</td>
      <td>10/100/1000 MBit/s Ethernet</td>
      <td>
        Wi-Fi 802.11 a/b/g/n
        <br>
        Bluetooth 4.1
      </td>
    </tr>
    <tr>
      <td>Video Output</td>
      <td>HDMI, DSI</td>
      <td>HDMI, DSI</td>
      <td>Micro HDMI</td>
      <td>HDMI, DSI</td>
    </tr>
    <tr>
      <td>Audio Output</td>
      <td>
        Digital via HDMI
        <br>
        Analog via 3.5 mm jack
      </td>
      <td>
        Digital via HDMI
        <br>
        Analog via 3.5 mm jack
      </td>
      <td>
        Digital via HDMI
      </td>
      <td>Digital via HDMI</td>
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
        <p>17x GPIO pins</p>
        <p>1x SPI bus</p>
        <p>1x I2C bus</p>
        <p>1x Serial UART</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/GetStarted">Set up your Raspberry Pi 3</a></p>
        <p><a href="https://www.element14.com/community/docs/DOC-76955/l/raspberry-pi-customization-service">Pi Customization Service</a></p>
      </td>
      <td>
        <p>17x GPIO pins</p>
        <p>1x SPI bus</p>
        <p>1x I2C bus</p>
        <p>1x Serial UART</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/GetStarted">Set up your Raspberry Pi 2</a></p>
        <p><a href="https://www.element14.com/community/docs/DOC-76955/l/raspberry-pi-customization-service">Pi Customization Service</a></p>
      </td>
      <td>
        <p>17x GPIO pins</p>
        <p>1x SPI bus</p>
        <p>1x I2C bus</p>
        <p>2x Serial UARTs</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/GetStarted">Set up your MinnowBoard MAX</a></p>
        <p><a href="http://iotsolutionsalliance.intel.com/solutions-directory/processors_list/782">Other device options</a></p>
      </td>
      <td>
        <p>11x GPIO pins</p>
        <p>1x SPI bus</p>
        <p>2x I2C buses</p>
        <p>2x Serial UARTs</p>
        <p><a href="{{site.baseurl}}/{{page.lang}}/Docs/GetStarted/dragonboard/GetStartedStep1.htm">Set up your DragonBoard 410c</a></p>
        <p><a href="https://developer.qualcomm.com/hardware/snapdragon-410">Other device options</a></p>
      </td>
    </tr>
</table>
