<ol class="setup-content-list">
  <p>NOTE: The <a href="http://www.intel.com/content/www/us/en/support/boards-and-kits/000022494.html" target="_blank">pin mappings for Joule</a> can be found on Intel's website.
  <li>Connect the shorter leg of the LED to GPIO 1 (pin 33 on breakout J12) on the Joule carrier board.</li>
  <li>
    <p>Connect the longer leg of the LED to the resistor.</p>
    <p>NOTE: the polarity of the LED is important (this configuration is commonly known as Active Low).</p>
  </li>
  <li>Connect the other end of the resistor to 3.3V (pin 6 on breakout header J13).</li>
  
  <p>Finally, the LED_PIN variable of _MainPage.xaml.cs_ file of the sample code will need the following modification:</p>
  {% highlight C# %}
  private const int LED_PIN = 1;
  {% endhighlight %}
</ol>