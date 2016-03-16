---
layout: default
title: Release Notes
permalink: /en-US/win8/ReleaseNotes.htm
lang: en-US
---

#Release Notes

Limitations of the hardware and software along with known bugs.</p>

##Intel Galileo Gen2 Software Limitations

1. PWM is not implemented</li>
2. ADC is not implemented</li>

##Software Limitations

1. `LED_BUILTIN` constant only works when calling directly into embprpusr.dll functionality.
2. `millis()` rolls roughly every 50 days the application is running.
3. `INPUT_PULLUP` is not implemented.
4. `strncmp()` functionality is available with <code>#include &lt;string.h&gt;</code>
5. `int` represents different bit-lengths on different Arduino platforms. To guarantee a specific behavior with bitwise operations, you should cast the data to the explicit desired type using variable types from the inttypes.h header (i.e. `uint8_t`).
6. `analogReference()` is not supported by the Galileo board.  Analog inputs are scaled on a range of 0-5 volts (resulting in analog readings of 0-4095) regardless of the setting of the IOREF jumper (5v or 3.3v). However, when the IOREF jumper is set to the 3.3v position, analog input signals are only safe from 0-3.3 volts.
7. Unless the Galileo is rebooted, the GPIO pins start in the "last known" operational state when a sketch starts.
8. The Wire API does not include <code>onReceive()</code> or <code>onRequest()</code>, because the Galileo does not support I2C slave functionality.
9. There is no plan for a USB host library. While the Intel Galileo hardware does support this, the host USB stack is not planned for this version of Windows.
10. There is no plan to implement the Arduino USB Keyboard and Mouse standard libraries.
11. `SoftwareSerial` is currently not implemented.

___

##Hardware Limitations

1. Intel Galileo Gen1: The fastest most GPIO pins can be changed is about once every 25 milliseconds. This is because of the speed of the Cypress I/O port expander used on the Galileo. Pins 2, 3 and 10 can be driven directly by the processor and can be changed roughly every 2 milliseconds.
2. CPU architecture does not support the LOCK_ prefix on kernel instructions.
3. No SSE registers, Windows functionality requiring this hardware cannot work.

___

##Processes running on Galileo

* System Process
   * System
      * smss.exe

* csrss.exe
* wininit.exe
   * services.exe
      * C:\windows\system32\svchost.exe -k DcomLaunch
      * C:\windows\system32\svchost.exe -k RPCSS
      * C:\windows\system32\svchost.exe -k netsvcs
      * C:\windows\System32\svchost.exe -k LocalServiceNetworkRestricted</li>
      * C:\windows\system32\svchost.exe -k LocalService
      * C:\windows\system32\svchost.exe -k NetworkService
      * C:\windows\system32\svchost.exe -k Bootshsvc
         * httpsrv.exe
         * ftpd.exe
         * telnetd.exe
         * mwstartnet.exe

      * C:\windows\system32\svchost.exe -k CoreUI
   * lsass.exe
* csrss.exe
* winlogon.exe
* C:\windows\system32\cmd.exe  /K C:\Windows\System32\Boot\synctime.cmd
* C:\Tools\RemoteDebugger\msvsmon.exe  /silent /nostatus /nosecuritywarn /nofirewallwarn /noclrwarn
   * C:\Tools\RemoteDebugger\msvsmon.exe /CHILDSERVER f8 "+:4018" {7CD1671D-D6E3-4455-8FE8-22C0AA188E15} 0x0 f4 ec e8 f0 /silent+ /servicemode-
* Galileo_eboot.exe
* cmd.exe
