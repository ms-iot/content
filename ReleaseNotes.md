---
layout: default
title: Release Notes
permalink: /ReleaseNotes.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Release Notes</h1>
    <p>Limitations of the hardware and software along with known bugs.</p>
  </div>
</div>
<div class="container">

  <h2> Software Limitations </h2>
  <p>
    <ol>
	  <li>
		The <code>word(h,l)</code> conversion function is unavailable due to type constructor conflicts. A helper function <code>makeWord(h,l)</code> has been supplied as a workaround.
	  </li>
      <li>
        <code>LED_BUILTIN</code> constant only works when calling directly into embprpusr.dll functionality.
      </li>
      <li>
        <code>millis()</code> rolls roughly every 50 days the application is running.
      </li>
      <li>
        <code>INPUT_PULLUP</code> is not implemented.
      </li>
      <li>
        <code>strncmp()</code> is not implemented.
      </li>
      <li>
        <code>int</code> represents different bit-lengths on different Arduino platforms. To guarantee a specific behavior with bitwise operations, you should cast the data to the explicit desired type using variable types from the inttypes.h header (i.e. <code>uint8_t</code>).
      </li>
      <li>
        <code>analogReference()</code> is not supported by the Galileo board.  Analog inputs are scaled on a range of 0-5 volts (resulting in analog readings of 0-4095) regardless of the setting of the IOREF jumper (5v or 3.3v). However, when the IOREF jumper is set to the 3.3v position, analog input signals are only safe from 0-3.3 volts.
      </li>
      <li>
        Unless the Galileo is rebooted, the GPIO pins start in the "last known" operational state when a sketch starts.
      </li>
    </ol>
  </p>
  <hr/>

  <h2> Hardware Limitations </h2>
  <p>
    <ol>
      <li>The fastest most GPIO pins can be changed is about once every 25 milliseconds. This is because of the speed of the Cypress I/O port expander used on the Galileo. Pins 2, 3 and 10 can be driven directly by the processor and can be changed roughly every 2 milliseconds.</li>
      <li>CPU architecture does not support the LOCK_ prefix on kernel instructions.</li>
      <li>No SSE registers, Windows functionality requiring this hardware cannot work.</li>
    </ol>
  </p>
  <hr/>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
