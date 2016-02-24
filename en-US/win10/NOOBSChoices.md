When using NOOBS, check the **Windows 10 IoT Core** choice in the list, and then click the install button in the toolbar as shown here:

![NOOBS on Pi2 IoT Core]({{site.baseurl}}/images/NOOBS/NOOBS on Pi2 IoT Core.jpg)

##Insufficent space on SD card error

If the install button is disabled then be sure to check the Disk Space section of this dialog to see if you have the availalbe space needed.

![NOOBS - 8GB]({{site.baseurl}}/images/NOOBS/NOOBS - 8GB.jpg)

 If there is insufficent disk space to install it willl appear in red similar to what you see in the image above. This is a common issue with 8GB SD cards as the space required by NOOBS disk partition leaves insufficent space on the OS partition to install Windows 10 IoT Core.

**SOLUTION:** Please use a larger capacity micro SD card. 

##OS Installation Warning

![NOOBS SD Warning]({{site.baseurl}}/images/NOOBS/NOOBS SD Warning.jpg)

After making your operating system selection, NOOBS will confirm that you want to overwrite all of the data on the OS partition. This operation can not be undone. 

