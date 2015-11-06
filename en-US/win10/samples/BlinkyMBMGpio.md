
<h3>For MinnowBoard Max (MBM)</h3>

<ol class="setup-content-list">
  <div class="row">
    <div class="col-md-6 col-sm-12">
      <p> We will connect the one end of the LED to GPIO 5 (pin 18 on the JP1 expansion header) on the MBM, the other end to the resistor, and the resistor to the 3.3 volt power supply from the MBM.
          Note that the polarity of the LED is important. Make sure the shorter leg (-) is connected to GPIO 5 and the longer leg (+) to the resistor or it wont light up.</p>
    </div>
    <div class="col-md-6 col-sm-12">
      <p>And here is the JP1 connector on the MBM:</p>
      <img src="{{site.baseurl}}/images/PinMappings/MBM_Pinout.png" height="400">
    </div>
  </div>
</ol>
<div class="row">
  <div class="col-md-6 col-sm-12">
    <p>Here is an example of what your breadboard might look like with the circuit assembled:</p>
  </div>
  <div class="col-md-6 col-sm-12">
    <img src="{{site.baseurl}}/images/Blinky/breadboard_assembled.png" height="500">
    <sub>*Image made with <a href="http://fritzing.org/" target="_blank">Fritzing</a>*</sub>
  </div>
</div>
