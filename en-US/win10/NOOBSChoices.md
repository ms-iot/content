When using NOOBS, check the **Windows 10 IoT Core** choice in the list, and then click the install button in the toolbar as shown here:

![NOOBS on Pi2 IoT Core]({{site.baseurl}}/images/noobs/noobs-on-pi2-iot-core.jpg)

### OS Installation Warning

![NOOBS SD Warning]({{site.baseurl}}/images/noobs/noobs-sd-warning.jpg)

After making your operating system selection, NOOBS will confirm that you want to overwrite all of the data on the OS partition. **This operation cannot be undone**. 

### Insufficient space on SD card error

If the install button is disabled, then be sure to check the **Disk space** section of this dialog to see how much space is needed.

![NOOBS - 8GB]({{site.baseurl}}/images/noobs/noobs-8gb.jpg)

 If there is insufficient disk space to install it will appear in red similar to what you see in the image above. This is a common issue with 8GB SD cards as the space required by NOOBS disk partition leaves insufficient space on the OS partition to install Windows 10 IoT Core.

**SOLUTION:** Please use a larger capacity NOOBS micro SD card or [follow these instructions to **Download, flash and install Windows 10 IoT Core onto your micro SD using the IoT Core Dashboard**]({{site.baseurl}}/{{page.lang}}/win10/GetStarted/SetUpYourDevice.htm).
