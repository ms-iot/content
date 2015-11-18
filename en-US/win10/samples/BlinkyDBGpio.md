<h3>For DragonBoard 410c (DB)</h3>



<ol class="setup-content-list">
<p>Perform the following steps to create the circuit: </p>
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <li>Connect the shorter leg of the LED to GPIO 12 (pin 24 on the expansion header) on the DB.</li>
      <li>
        <p>Connect the longer leg of the LED to the resistor.</p>
        <p>NOTE: the polarity of the LED is important (this configuration is commonly known as Active Low).</p>
      </li>
      <li>Connect the other end of the resistor to 1.8V (pin 35 on the expansion header).</li>
    </div>
    <div class="col-md-6 col-sm-12">
      <p>For reference, the functionality of the low-speed expansion connector is outlined in the following diagram:</p>
      <img src="{{site.baseurl}}/images/PinMappings/DB_Pinout.png">
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 col-sm-12">

      <p>Finally, the LED_PIN variable of _MainPage.xaml.cs_ file of the sample code will need the following modification:</p>
      {% highlight C# %}
      private const int LED_PIN = 12;
      {% endhighlight %}
    </div>
    <div class="col-md-6 col-sm-12">
      <p>Here is an illustration of what your breadboard might look like with the circuit assembled:</p>
      <img src="{{site.baseurl}}/images/Blinky/breadboard_assembled_db_kit.png">
      <sub>Image made with <a href="http://fritzing.org/">Fritzing</a></sub>
    </div>
  </div>
</ol>