<h3> Wiring your Raspberry Pi 2 </h3>

<ol class="setup-content-list">
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <li>Connect the shorter leg of the LED to GPIO 5 (pin 29 on the expansion header) on the RPi2.</li>
      <li>Connect the longer leg of the LED to the resistor.</li>
      <li>Connect the other end of the resistor to one of the 3.3V pins on the RPi2.</li>
      <li>Note that the polarity of the LED is important. (This configuration is commonly known as Active Low)</li>
    </div>
    <div class="col-md-6 col-sm-12">
      <p>Here is the pinout of the RPi2:</p>
      <img src="{{site.baseurl}}/images/PinMappings/RP2_Pinout.png" height="400">
    </div>
  </div>
</ol>
<div class="row">
  <div class="col-md-6 col-sm-12">
    <p>Here is an example of what your breadboard might look like with the circuit assembled:</p>
  </div>
  <div class="col-md-6 col-sm-12">
    <img src="{{site.baseurl}}/images/Blinky/breadboard_assembled_rpi2_kit.jpg" height="500">
    <sub>*Image made with <a href="http://fritzing.org/" target="_blank">Fritzing</a>*</sub>
  </div>
</div>


