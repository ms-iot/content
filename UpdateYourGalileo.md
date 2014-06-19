---
layout: default
title: Update your Galileo
permalink: /UpdateYourGalileo.htm
---

<div class="container">
  <h1>Did you buy an Intel Galileo?</h1>
  The Intel Galileo needs to be updated with the latest Firmware from Intel.
  <hr/>
  <h2> Prerequisites: </h2>
  <ul>
    <li>
      <a href="http://www.amazon.com/gp/product/B004IY4L86/ref=oh_details_o05_s00_i00">Intel Serial Cable</a>
    </li>
    <li>
      <a href="http://www.amazon.com/dp/B00425S1H8?psc=1">Serial to USB</a> (if your computer does not have an old-school serial port)
    </li>
    <li>
      <a href="http://ttssh2.sourceforge.jp/index.html.en">TeraTerm</a> Terminal Program for Windows
    </li>
    <li>
      Download the <a href="<placeholder>">Firmware Update Software Package</a> and unpack to an SD card formatted fat32.
    </li>
  </ul>
  <hr/>

  <h2>Flashing your Galileo's firmware</h2>
  <p>Flashing your galileo's firmware you to use a terminal program to connect to the Galileo at boot. There are timing sensitive commands, so it would be helpful to read through this guide and understand what is needed before you start.</p>
  <p>Flashing your Galileo requires you to flash it twice - once with a low level upgrade, the second with a secure boot upgrade. You will need to follow the enter the UEFI shell in both cases, so this has been called out as a common step.</p>
  <div class="panel panel-danger">
    <div class="panel-heading">IMPORTANT:</div>
    <div class="panel-body">Please wait until instructed to plug the power into the Galileo.</div>
  </div>
  <h3>Physically connecting your Galileo</h3>
  <ol>
    <li>Connect your Intel Galileo serial cable to the 2.5mm audio-like jack on the Galileo board.</li>
    <li>Connect the serial DB-9 to your PC's Serial port or to the Serial to USB device.</li>
    <li>On your PC, open up the device manager. Identify which COM port for the Galileo.</li>
    <li>Open TeraTerm.</li>
    <li>
      Configure TeraTerm by selecting Setup->Serial Port and configure like below - replacing the COM port with the one you identified above. <br/><img src="images\TeraTermSetup.png"/>
    </li>
  </ol>
  <a name="EnterUEFIShell">
    <h3 style="padding-top: 60px; margin-top: -60px;">Entering the UEFI shell</h3>
  </a>
  <ol>
    <li>
      Format an SD card as Fat32 and copy the contents of <a href="<placeholder>">Quark.FirmwareUpdate.zip</a> to the root of this card.
    </li>
    <li>Put this card into the SD slot on your Galileo</li>
    <li>
      Plug the power adapter into the Galileo
      <ul>
        <li>You should see the following out output in the terminal window you launched above. </li>
        <li>
          If you do not see any output, goto the <a href="TroubleShooting.htm">Troubleshooting Firmware Update</a> section. <br/><br/><img src="images\TermBootScreen1.png"/><br/><br/>
        </li>
      </ul>
    </li>
    <li>
      Ensure that the terminal program on your computer is selected and press the <kbd>F7</kbd> key when the GRUB menu is displayed.
    </li>
    <li>
      Press the <kbd>c</kbd> key when the GRUB menu is displayed.<br/><br/><img src="images\TermBootScreen2.png"/><br/><br/>
    </li>
    <li>
      Type <kbd>quit</kbd> at the prompt.<br/><br/><img src="images\TermBootScreen3.png"/><br/>
    </li>
    <li>
      In the screen titled "please select boot device", press <kbd>down arrow</kbd> 3 times and press <kbd>enter</kbd>.
      <ul>
        <li>Ignore the cursor position.</li>
        <li>
          You are selecting the <kbd>UEFI Internal Shell</kbd>, but the cursor doesn’t show this as highlighted.
        </li>
      </ul>
      <br/><br/><img src="images\TermBootScreen4.png"/><br/>
    </li>
    <li>Wait for it to time out.</li>
    <li>
      After the timeout is complete, you will be at the command prompt that we’ll use for the flashing process<br/><br/><img src="images\TermBootScreen5.png"/>
    </li>
  </ol>
  <h3>Flash the PDAT Capsule</h3>
  <ol>
    <li>
      <a href="#EnterUEFIShell">Enter the UEFI shell</a>
    </li>
    <li>
      Type the following at the Shell> prompt <kbd>fs0:</kbd>
    </li>
    <li>
      Type the following at the fs0: prompt <kbd>CapsuleApp.efi PDAT.cap</kbd>
      <ul>
        <li>This update will take several minutes</li>
        <li>The Galileo will reboot.</li>
      </ul>
      <br/><br/><img src="images\TermBootScreen6.png"/>
    </li>
  </ol>
  <h3>Flash the Quark Platform Capsule</h3>
  <ol>
    <li>
      <a href="#EnterUEFIShell">Enter the UEFI shell</a>
    </li>
    <li>
      Type the following at the Shell> prompt <kbd>fs0:</kbd>
    </li>
    <li>
      Type the following at the fs0: prompt <kbd>CapsuleApp.efi QuarkPlatformPkgReset.Cap.signed</kbd>
      <ul>
        <li>This update will take several minutes</li>
        <li>The Galileo will reboot.</li>
      </ul>
    </li>
  </ol>
  <hr/>

  <a class="btn btn-default" href="Index.htm" role="button">Return to homepage</a>
  <a class="btn btn-default" href="SetupPC.htm" role="button">Continue to Step 2 &raquo;</a>
