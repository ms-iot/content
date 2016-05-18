<h3> 连接你的 Raspberry Pi 2 </h3>

<ol class="setup-content-list">
  <li>将 LED 的较短的脚连接到 RPi2 或 RPi3 上的 GPIO 5（扩展头上的引脚 29）。</li>
  <li>将 LED 的较长的脚连接到电阻器。</li>
  <li>将电阻器的另一端连接到 RPi2 或 RPi3 上的 3.3V 引脚之一。</li>
  <li>请注意 LED 的正负极非常重要。（此配置通常称为低电平有效）</li>
  <p>下面是 RPi2 和 RPi3 的引出线：</p>
  <p><img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png" height="400"/></p>
</ol>
<p>下面是组装了电路的试验板的可能外观的一个示例：</p>
<p>
  <img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="500"/>
  <sub>*使用 <a href="http://fritzing.org/" target="_blank">Fritzing</a> 制作的图像*</sub>
</p>

