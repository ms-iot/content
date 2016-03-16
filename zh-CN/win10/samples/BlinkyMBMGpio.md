
<h3>适用于 MinnowBoard Max (MBM)</h3>

<ol class="setup-content-list">
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <p> 我们要将 LED 的一端连接到 MBM 上的 GPIO 5（JP1 扩展头上的引脚 18），将另一端连接到电阻器，并将电阻器连接到 MBM 上的 3.3 伏电源。
          请注意 LED 的正负极非常重要。请确保将较短的腿 (-) 连接到 GPIO 5 并将较长的腿 (+) 连接到电阻器，否则它不会点亮。</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <p>以下是 MBM 上的 JP1 连接器：</p>
      <img src="{{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png" height="400">
    </div>
  </div>
</ol>
<div class="row">
  <div class="col-md-6 col-sm-12">
    <p>下面是组装了电路的试验板的可能外观的一个示例：</p>
  </div>
  <div class="col-md-6 col-sm-12">
    <img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled.png" height="500">
    <sub>*使用 <a href="http://fritzing.org/" target="_blank">Fritzing</a> 制作的图像*</sub>
  </div>
</div>
