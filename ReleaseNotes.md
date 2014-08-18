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

  <h2>Software Limitations</h2>
  <p>
    <ol>
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
      <li>
        <code>void serialEvent()</code> functionality is not implemented.
      </li>
    </ol>
  </p>
  <hr/>

  <h2>Hardware Limitations</h2>
  <p>
    <ol>
      <li>The fastest most GPIO pins can be changed is about once every 25 milliseconds. This is because of the speed of the Cypress I/O port expander used on the Galileo. Pins 2, 3 and 10 can be driven directly by the processor and can be changed roughly every 2 milliseconds.</li>
      <li>CPU architecture does not support the LOCK_ prefix on kernel instructions.</li>
      <li>No SSE registers, Windows functionality requiring this hardware cannot work.</li>
    </ol>
  </p>
  <hr/>

  <h2>Processes running on Galileo</h2>
  <p>
    <ul>
      <li>System Process</li>
      <li>
        System
        <ul>
          <li>smss.exe</li>
		</ul>
      </li>
      <li>csrss.exe</li>
      <li>
        wininit.exe
        <ul>
          <li>
            services.exe
            <ul>
              <li>C:\windows\system32\svchost.exe -k DcomLaunch</li>
              <li>C:\windows\system32\svchost.exe -k RPCSS</li>
              <li>C:\windows\system32\svchost.exe -k netsvcs</li>
              <li>C:\windows\System32\svchost.exe -k LocalServiceNetworkRestricted</li>
              <li>C:\windows\system32\svchost.exe -k LocalService</li>
              <li>C:\windows\system32\svchost.exe -k NetworkService</li>
              <li>
                C:\windows\system32\svchost.exe -k Bootshsvc
                <ul>
                  <li>httpsrv.exe</li>
                  <li>ftpd.exe</li>
                  <li>telnetd.exe</li>
                  <li>mwstartnet.exe</li>
                </ul>
              </li>
              <li>C:\windows\system32\svchost.exe -k CoreUI</li>
			</ul>
          </li>
          <li>lsass.exe</li>
		</ul>
      </li>
      <li>csrss.exe</li>
      <li>winlogon.exe</li>
      <li>C:\windows\system32\cmd.exe  /K C:\Windows\System32\Boot\synctime.cmd</li>
      <li>
        C:\Tools\RemoteDebugger\msvsmon.exe  /silent /nostatus /nosecuritywarn /nofirewallwarn /noclrwarn
        <ul>
          <li>C:\Tools\RemoteDebugger\msvsmon.exe /CHILDSERVER f8 "+:4018" {7CD1671D-D6E3-4455-8FE8-22C0AA188E15} 0x0 f4 ec e8 f0 /silent+ /servicemode-</li>
        </ul>
	  </li>
      <li>Galileo_eboot.exe</li>
      <li>cmd.exe</li>
    </ul>
  </p>
  <hr/>
  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
