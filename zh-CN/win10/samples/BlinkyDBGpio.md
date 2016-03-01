<h3>适用于 DragonBoard 410c (DB)</h3>



<ol class="setup-content-list">
<p>执行以下步骤来创建电路： </p>
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <li>将 LED 的较短的脚连接到 DB 上的 GPIO 12（扩展头上的引脚 24）。</li>
      <li>
        <p>将 LED 的较长的脚连接到电阻器。</p>
        <p>注意：LED 的正负极非常重要（此配置通常称为低电平有效）。</p>
      </li>
      <li>将电阻的另一端连接到 1.8V（扩展头上的引脚 35）。</li>
    </div>
    <div class="col-md-6 col-sm-12">
      <p>作为参考，下图概述了低速扩展连接器的功能：</p>
      <img src="{{site.baseurl}}/Resources/images/PinMappings/DB_Pinout.png">
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-sm-12">

      <p>最后，示例代码的 MainPage.xaml.cs 文件的 LED_PIN 变量需要进行以下修改：</p>
      {% highlight C# %}
      private const int LED_PIN = 12;
      {% endhighlight %}
    </div>
    <div class="col-md-6 col-sm-12">
      <p>下面是组装了电路的试验板的可能外观的图示：</p>
      <img src="{{site.baseurl}}/Resources/images/Blinky/breadboard_assembled_db_kit.png">
      <sub>使用 <a href="http://fritzing.org/">Fritzing</a> 制作的图像</sub>
    </div>
  </div>
</ol>