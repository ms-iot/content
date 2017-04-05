<ol class="setup-content-list">
  <li>Connect the shorter leg of the LED to GPIO 12 (pin 24 on the expansion header) on the DB.</li>
  <li>
    <p>Connect the longer leg of the LED to the resistor.</p>
    <p>NOTE: the polarity of the LED is important (this configuration is commonly known as Active Low).</p>
  </li>
  <li>Connect the other end of the resistor to 1.8V (pin 35 on the expansion header).</li>

  <p>Finally, the LED_PIN variable of MainPage.xaml.cs file of the sample code will need the following modification:</p>
  {% highlight C# %}
  private const int LED_PIN = 12;
  {% endhighlight %}
  <p>To open MainPage.xaml.cs, find the Solution Explorer on the right hand side of your Visual Studio window, click on the MainPage.xaml dropdown, and double-click on MainPage.xaml.cs</p>
</ol>