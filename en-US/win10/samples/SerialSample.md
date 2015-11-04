---
layout: default
title: Serial Sample
permalink: /en-US/win10/samples/SerialSample.htm
lang: en-US
---

#Serial Port Sample

We'll create a simple app that allows communication between a desktop and an IoT device over a serial interface.

This is a headed sample.  To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm){:target="_blank"}.

###Load the project in Visual Studio

You can find the C# and C++ versions of this sample [here](https://github.com/ms-iot/samples/tree/develop/SerialSample/){:target="_blank"}.  Make a copy of the folder on your disk and open the project from Visual Studio.

This app is a Universal Windows app and will run on both the PC and your IoT device.

###Wiring the serial connection 

You have two options for wiring up your board:

1. GPIO - using the On-board UART controller (MinnowBoard Max only)
2. USB - using a USB-to-TTL adapter

####<a name="MBM_UART"></a>Using GPIO **(MinnowBoard Max Only)**

You will need:

* 1 X USB-to-TTL cable or module (for this sample we used a USB-to-TTL cable such as [this one](http://www.adafruit.com/products/954){:target="_blank"})

The MinnowBoard Max has two on-board UARTs that can be configured to use GPIO pins. 

* UART1 uses GPIO pins 6, 8, 10, and 12. 
* UART2 uses GPIO pins 17 and 19. 

These GPIO pins are highlighted in green in the diagram below. In this sample we will use UART2. See the [MBM pin mapping page]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm) for more details on the MBM GPIO pins.

<img src="{{site.baseurl}}/images/PinMappings/MBM_Pinout.png" height="400">

Make the following connections:

* Insert the USB end of the USB-to-TTL cable into a USB port on the PC

* Connect the GND wire of the USB-to-TTL cable to Pin 1 (GND) on the MBM board

* Connect the RX wire of the USB-to-TTL cable to Pin 17 (TX) on the MBM board

* Connect the TX wire of the USB-to-TTL cable to Pin 19 (RX) on the MBM board

*Note: Leave the power wire of the USB-to-TTL cable unconnected. It is not needed.*

<img src="{{site.baseurl}}/images/SerialSample/SiLabs-UART.png">

###<a name="USB_TTL_Adapter"></a>Using USB-to-TTL Adapter

**Note: Only USB-to-TTL cables and modules with Silicon Labs chipsets are natively supported on MinnowBoard Max and Raspberry Pi2.**

You will need:

* 1 X USB-to-TTL module (This is what we will connect to our RPI2 or MBM device. We used [this Silicon Labs CP2102 based USB-to-TTL module](http://www.amazon.com/gp/product/B00LODGRV8){:target="_blank"})

* 1 X USB-to-TTL cable (This will connect to our PC. We used [this one](http://www.adafruit.com/products/954){:target="_blank"})

Make the following connections:

* Insert the USB end of the USB-to-TTL **cable** into a USB port on the PC

* Insert the USB end of the USB-to-TTL **module** into a USB port on the RPI2 or MBM device 

* Connect the GND pin of the USB-to-TTL **module** to the GND wire of the USB-to-TTL cable 

* Connect the RX pin of the USB-to-TTL **module** to the TX wire of the USB-to-TTL cable

* Connect the TX pin of the USB-to-TTL **module** to the RX wire of the USB-to-TTL cable

Leave the power pin of the USB-to-TTL cable unconnected. It is not needed.

Below is an image of our USB-to-TTL module connected to a USB port in our RPi2. The GND, TX, and RX pins of the module are connected to the GND, RX, TX wires of the USB-to-TTL cable that is connected to our PC.

<img src="{{site.baseurl}}/images/SerialSample/CP2102_Connections_500.png">

###Deploy and Launch the SerialSample App

Now that our PC and RPi2 or MBM are connected, let's setup and deploy the app. If you are not familiar with how to set the target device and target architecture in Visual Studio see [this section]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device) for details.

1. Download the Visual Studio 2015 [SerialSample source project](https://github.com/ms-iot/samples/tree/develop/SerialSample/){:target="_blank"}. 

2. Make two separate copies of the app. We'll refer to them as the 'Device copy' and 'PC copy'.

3. Open two instances of Visual Studio 2015 on your PC. We'll refer to these as 'Instance A' and 'Instance B'.

4. Open the Device copy of the SerialSample app in VS Instance A.

5. Open the PC copy of the SerialSample app in VS Instance B.

6. In VS Instance A, [configure the app for deployment to your RPi2 or MBM device]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm#deploy-the-app-to-your-windows-iot-core-device))
	
	*For RPi2, set the target device to 'Remote Machine' and target architecture to 'ARM'
	
	*For MBM, set the target device to 'Remote Machine' and target architecture to 'x86'

7. In VS Instance B, set the target architecture to 'x86'. This will be the instance of the sample we run on the PC.

8. In VS Instance A, press F5 to deploy and launch the app on your RPi2 or MBM.

9. In VS Instance B, press F5 to deploy and launch the app on your PC.

###Using the SerialSample App 

When the SerialSample app is launched on the PC, a window will open with the user interface similar to the screenshot shown below. When launched on the RPi2 and MBM, the SerialSample will display the user interface shown below on the entire screen.

<img src="{{site.baseurl}}/images/SerialSample/SerialSampleRunningPC.PNG">

####Selecting a Serial Device

When the SerialSample app launches, it looks for all the serial devices that are connected to the device. The device ids of all the serial devices found connected to the device will be listed in the top ListBox of the SerialSample app window.

Select and connect to a serial device on the PC and RPi2 or MBM by doing the following:

1. Select the desired serial device by clicking on the device ID string in the top ListBox next to "Select Device:". 

	* On the PC, the device ID for the USB-to-TTL cable connected in this example begins with '\\?\USB#VID_067B'.
	
	* On the MBM, if using the GPIO for serial communication, select the device ID with **UART2** in it.
	
	* On the MBM and RPi2, if using the USB-to-TTL adapter module, select the device ID that begins with **\\?\USB#**. For the USB-to-TTL module used in this example, the device ID should begin with '\\?\USB#VID_10C4'.

2. Click 'Connect'.	

The app will attempt to connect and configure the selected serial device. When the app has successfully connected to the attached serial device it will display the configuration of the serial device. By default, the app configures the serial device for 9600 Baud, eight data bits, no parity bits, no handshaking and one stop bit.

<img src="{{site.baseurl}}/images/SerialSample/SerialSampleRunningPC_ConnectDevice.PNG">

####Sending and Receiving Data

After connecting the desired serial device in the SerialSample apps running on both the PC and the RPi2 or MBM we can begin sending and receiving data over the serial connection between the two devices.

To send data from one device to the other connected device do the following:

1. Choose a device to transmit from. On the transmit device, type the message to be sent in the "Write Data" text box. For our example, we typed "Hello Raspberry Pi2! From your friend, PC." in the "Write Data" text box of the SerialSample app running on our PC.

2. Click the 'WRITE' button.

The app on the transmitting device will display the sent message and "Bytes written successfully!" in the status text box in the bottom of the app display.

<img src="{{site.baseurl}}/images/SerialSample/SendMessageB.PNG">

The device that is receiving the message will automatically display the text in the 'Read Data:' window.

**KNOWN ISSUES:**

* When connecting to the USB-to-TTL device for the first time from the IoT Device, you may see the error "Object was not instantiated" when you click on `Connect`. If you see this, un-plug the device, plug it back in and refresh the connection or redeploy the app.
* If you have more than one Silicon Labs USB-to-TTL devices connected to your IoT device, only the device that was first connected will be recognized. In order to run this sample, connect only one device
* When connecting USB-to-TTL device to MinnowBoard Max, use a powered USB hub or the bottom USB port


###Let's look at the code

The code for this sample uses the [Windows.Devices.SerialCommunication](https://msdn.microsoft.com/en-us/library/windows.devices.serialcommunication.aspx){:target="_blank"} namespace. 

The SerialDevice class will be used to enumerate, connect, read, and write to the serial devices connected to the device. 

**NOTE:** The SerialDevice class can be used only for supported USB-to-TTL devices (on PC, Raspberry Pi 2, and MinnowBoard Max) and the on-board UART (on MinnowBoard Max).

For accessing the serial port, you must add the **DeviceCapability** to the **Package.appxmanifest** file in your project. 

You can add this by opening the **Package.appxmanifest** file in an XML editor (Right Click on the file -> Open with -> XML (Text) Editor) and adding the capabilities as shown below:

    Visual Studio 2015 has a known bug in the Manifest Designer (the visual editor for appxmanifest files) that affects the serialcommunication capability.  If 
    your appxmanifest adds the serialcommunication capability, modifying your appxmanifest with the designer will corrupt your appxmanifest (the Device xml child 
    will be lost).  You can workaround this problem by hand editting the appxmanifest by right-clicking your appxmanifest and selecting View Code from the 
    context menu.

{% highlight xml %}
  <Capabilities>
    <DeviceCapability Name="serialcommunication">
      <Device Id="any">
        <Function Type="name:serialPort" />
      </Device>
    </DeviceCapability>
  </Capabilities>
{% endhighlight %}

###Connect to selected serial device

This sample app enumerates all serial devices connected to the device and displays the list in the **ListBox** ConnectDevices. The following code connects and configure the selected device ID and creates a **SerialDevice** object. 

{% highlight C# %}
private async void comPortInput_Click(object sender, RoutedEventArgs e)
{
    var selection = ConnectDevices.SelectedItems; // Get selected items from ListBox

    // ...

    DeviceInformation entry = (DeviceInformation)selection[0];         

    try
    {                
        serialPort = await SerialDevice.FromIdAsync(entry.Id);

        // ...

        // Configure serial settings
        serialPort.WriteTimeout = TimeSpan.FromMilliseconds(1000);
        serialPort.ReadTimeout = TimeSpan.FromMilliseconds(1000);                
        serialPort.BaudRate = 9600;
        serialPort.Parity = SerialParity.None;
        serialPort.StopBits = SerialStopBitCount.One;
        serialPort.DataBits = 8;

        // ...
    }
    catch (Exception ex)
    {
        // ...
    }
}
{% endhighlight %}

###Perform a read on the serial port

In order to not miss data, we post a read when bytes are expected. We do this in the sample code by creating an async read task using the **DataReader** object that waits on the **InputStream** of the **SerialDevice** object. 

The async task is created in the **rcvdText_TextChanged** event handler. We start the async task the first time by triggering the **rcvdText_TextChanged** event in **comPortInput_Click**

{% highlight C# %}
private async void comPortInput_Click(object sender, RoutedEventArgs e)
{
    // ...

    rcvdText.Text = "Waiting for data...";
	
    // ...
}

private async void rcvdText_TextChanged(object sender, TextChangedEventArgs e)
{
    // ...

    DataReaderObject = new DataReader(serialPort.InputStream);
    await ReadAsync(ReadCancellationTokenSource.Token);

    // ...

    if (DataReaderObject != null)
    {
        DataReaderObject.DetachStream();
        DataReaderObject = null;
    }
}

private async Task ReadAsync(CancellationToken cancellationToken)
{
    // ...
    
    uint ReadBufferLength = 1024;

    // If task cancellation was requested, comply
    cancellationToken.ThrowIfCancellationRequested();

    // Set InputStreamOptions to complete the asynchronous read operation when one or more bytes is available
    dataReaderObject.InputStreamOptions = InputStreamOptions.Partial;

    // Create a task object to wait for data on the serialPort.InputStream
    loadAsyncTask = dataReaderObject.LoadAsync(ReadBufferLength).AsTask(cancellationToken);

    // Launch the task and wait
    UInt32 bytesRead = await loadAsyncTask;
	
    // ...
}
{% endhighlight %}

###Perform a write to the serial port

When the bytes are ready to be sent, we write asynchronously to the **OutputStream** of the **SerialDevice** object using the **DataWriter** object.

{% highlight C# %}
private async void sendTextButton_Click(object sender, RoutedEventArgs e)
{	
    // ...
	
    // Create the DataWriter object and attach to OutputStream   
    dataWriteObject = new DataWriter(serialPort.OutputStream);

    //Launch the WriteAsync task to perform the write
    await WriteAsync();   
	
    // ..

    dataWriteObject.DetachStream();
    dataWriteObject = null;	
}

private async Task WriteAsync()
{
    Task<UInt32> storeAsyncTask;

    // ...
	
    // Load the text from the sendText input text box to the dataWriter object
    dataWriteObject.WriteString(sendText.Text);                

    // Launch an async task to complete the write operation
    storeAsyncTask = dataWriteObject.StoreAsync().AsTask();

    // ...    
}
{% endhighlight %}

###Cancelling Read

You can cancel the read operation by using **CancellationToken** on the Task. Initialize the **CancellationToken** object and pass that as an argument to the read task.

{% highlight C# %}

private async void comPortInput_Click(object sender, RoutedEventArgs e)
{
    // ...

    // Create cancellation token object to close I/O operations when closing the device
    ReadCancellationTokenSource = new CancellationTokenSource();
	
    // ...	
}

private async void rcvdText_TextChanged(object sender, TextChangedEventArgs e)
{
    // ...

    await ReadAsync(ReadCancellationTokenSource.Token);

    // ...	
}

private async Task ReadAsync(CancellationToken cancellationToken)
{
    Task<UInt32> loadAsyncTask;

    uint ReadBufferLength = 1024;

    cancellationToken.ThrowIfCancellationRequested();
    
    // ...
	
}
 
private void CancelReadTask()
{         
    if (ReadCancellationTokenSource != null)
    {
        if (!ReadCancellationTokenSource.IsCancellationRequested)
        {
            ReadCancellationTokenSource.Cancel();
        }
    }         
}
{% endhighlight %}

###Closing the device

When closing the connection with the device, we cancel all pending I/O operations and safely dispose of all the objects. 

In this sample, we proceed to also refresh the list of devices connected.

{% highlight C# %}
private void closeDevice_Click(object sender, RoutedEventArgs e)
{
    try
    {
        CancelReadTask();
        CloseDevice();
        ListAvailablePorts(); //Refresh the list of available devices
    }
    catch (Exception ex)
    {
       // ...
    }          
}    

private void CloseDevice()
{            
    if (serialPort != null)
    {
        serialPort.Dispose();
    }    

    // ...
}    
{% endhighlight %}


To summarize:

* First, we enumerate all the serial devices connected and allow the user to connect to the desired one using device ID

* We create an asynchronous task for reading the **InputStream** of the **SerialDevice** object.

* When the user provides input, we write the bytes to the **OutputStream** of the **SerialDevice** object.

* We add the ability to cancel the read task using the **CancellationToken**.

* Finally, we close the device connection and clean up when done