<h3>Connect to your Arduino</h3>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>Now that everything is set up, open the Windows Remote Arduino Experience application on your chosen Windows 10 device. You should see the screen shown in the image on the right.</p>
        <p>Select the connection type that you chose while setting up your Arduino.  You'll need to choose a Baud rate as well - follow the guidelines on the FAQ page linked here to choose the correct settings.</p>
        <p>Once you've selected the correct settings, click "Connect" to connect remotely to your Arduino!</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/images/remote-wiring/samples/basic/ConnectionsFinal.JPG">
    </div>
</div>

<h3>Remotely control your Arduino</h3>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>If your connection is successful, you will be taken to the screen shown on the right.  If not, double check that you've set up everything correctly, and that you chose the proper connection settings on the app.</p>
        <p>From here, you can start controlling the pins on your Arduino.  Let's do a simple sample where we remotely control an LED attached to the Arduino.</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/images/remote-wiring/samples/basic/DigitalFinal.JPG">
    </div>
</div>
<div class="row">
    <div class="col-md-6 col-sm-12 col-no-padding">
        <p>Now all you have to do is connect an LED to your Arduino!  Set up your board as shown in the diagram on the right - you'll need 1 LED, 2 connecting wires (male-to-male), and a 330ohm resistor.</p>
        <p>If you've set everything up properly, you should be able to toggle the LED remotely. On the Digital page of the app, toggle the switch next to your chosen pin (in our setup we use digital pin 5) to Output, and then toggle the state switch to 5v.  Your LED should flash on and off as you control from your Windows 10 device!</p>
        <p>Try controlling all of the pins on your Arduino - you can control the Analog pins on the Analog page, and the PWM functionality of the digital pins on the PWM page.  Once you get an understanding of the technology, check out the tutorial on the Windows Remote Arduino library to start developing your own projects.</p>
    </div>
    <div class="col-md-6 col-sm-12 col-no-padding">
        <img src="{{site.baseurl}}/images/remote-wiring/samples/basic/LEDSetup.JPG">
    </div>
</div>
