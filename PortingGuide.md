---
layout: default
title: Porting Guide
permalink: /PortingGuide.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Porting Guide</h1>
    <p>Migrate your existing code to Windows!</p>
  </div>
</div>
<div class="container">

<h2>Architectural differences between AVR and Quark</h3>
<hr/>
<h3>Real-time OS vs General OS</h3>
<p>The key difference between general-computing operating systems and real-time operating systems is the need for "deterministic" timing behavior in the real-time operating systems. - belhob.wordpress.com
  <ul>
    <li><a ref="http://en.wikipedia.org/wiki/Real-time_operating_system" target="_blank">Real-time OS</a> - The scheduling algorithms guarantee deterministic timing (i.e. AVR)</li>
    <li><a ref="http://en.wikipedia.org/wiki/Operating_system" target="_blank">General OS</a> - The scheduling algorithms make no guarantees about timing (i.e. Windows)</li>
  </ul>
</p>
<hr/>
<h3>Microcontroller verses Microprocessor (CPU)</h3>
<p>Microcontrollers are designed for embedded applications, in contrast to the microprocessors used in personal computers or other general purpose applications. - wikipedia.org
  <ul>
    <li><a ref="http://en.wikipedia.org/wiki/Microcontroller" target="_blank">Microcontroller</a> - A small computer on a single integrated circuit containing a processor core, memory, and programmable input/output peripherals (i.e. Atmel ATmega328).<br/></li>
    <li><a ref="http://en.wikipedia.org/wiki/Microprocessor" target="_blank">Microprocessor</a> - a multipurpose, programmable device that accepts digital data as input, processes it according to instructions stored in its memory, and provides results as output (i.e. Intel Quark).<br/></li>
  </ul>
</p>
<hr/>

<h2>Serial</h2>
<h3><a ref="http://en.wikipedia.org/wiki/Logic_level#Logic_voltage_levels" target="_blank">Logic Level Voltages</a></h3>
<p>The voltage levels used internally are called the "logic level", while the voltage levels used externally are called the "line level". In particular, when connecting a system that uses TTL levels internally to a RS-232 cable, the TTL levels are the "logic level". When connecting a system that uses 3.3 V CMOS levels internally to an IEEE 1284 bus, the TTL levels are the "line level".
  <ul>
    <li>
      CMOS
	  <ul>
	    <li>LOW - 0V to 1/3Vdd</li>
	    <li>HIGH - 2/3Vdd to Vdd</li>
	  </ul>
    </li>
    <li>
      TTL
	  <ul>
	    <li>LOW - 0V to 0.8V</li>
	    <li>HIGH - 2V to 5V</li>
	  </ul>
    </li>
  </ul>
</p>
<h3><a ref="http://en.wikipedia.org/wiki/RS-232" target="_blank">RS232</a></h3>
<p>
  The RS-232 standard is commonly used in computer serial ports. The standard defines the electrical characteristics and timing of signals, the meaning of signals, and the physical size and pinout of connectors. The current version of the standard is TIA-232-F Interface Between Data Terminal Equipment and Data Circuit-Terminating Equipment Employing Serial Binary Data Interchange, issued in 1997.
</p>
<hr/>

<h2>Porting Code</h2>
<h3>Arduino/AVR</h3>
<p>Direct Port Manipulation
  <ul>
    <li>
      <a ref="http://www.arduino.cc/en/Reference/PortManipulation" target="_blank">Port Registers</a> - The port registers allow you to set a block of Arduino pins with a single instruction, resulting in performance gains.<br/>
	  This can be ported by issuing the equivalent instruction for each pin represented in the bitmask.
	  <ul>
		<li>DDR[B|C|D] = pinMode();</li>
		<li>PORT[B|C|D] = digitalWrite();</li>
		<li>PIN[B|C|D] = digitalRead();</li>
	  </ul>
    </li>
    <li>
      <a ref="http://www.arduino.cc/en/Tutorial/SPIEEPROM" target="_blank">SPI Registers</a> (Introduction to the Serial Peripheral Interface)<br/>
	  This fine grain level of control is not offered by the Windows Developer Program for IoT and in most cases, simply using the SPI library can replace this functionality.
    </li>
  </ul>
</p>
<h3>GCC</h3>
<p>Non-portable GCC compiler commands/options
  <ul>
    <li>
      <b><code>__atrribute__(__packed__)</code></b><br/>
	  This can be replaced by pushing a pack attribute on the data alignment stack [i.e. <code>#pragma pack(push, 1)</code>], then popping it off once your structs have been defined [i.e. <code>#pragma pack(pop)</code>].<br/>
	  Check <a ref="http://msdn.microsoft.com/en-us/library/vstudio/2e70t5y1(v=vs.100).aspx" target="_blank">MSDN</a> for more details.
    </li>
    <li>
      <b><code>asm volatile("nop");</code></b><br/>
	  The same functionality exists on Windows, however the syntax is different <code>__asm nop</code>. The MSVC compiler does not optimize around assembly, so the <code>volatile</code> is not valid.<br/>
	  For a deeper discussion please check <a ref="http://stackoverflow.com/questions/25878898/is-asm-nop-the-windows-equivalent-of-asm-volatilenop-from-gcc-compile" target="_blank">StackOverflow</a>
    </li>
  </ul>
</p>
<hr/>
<a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
</div>
