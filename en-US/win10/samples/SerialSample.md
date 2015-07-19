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

1. GPIO using the On-board UART controller (MinnowBoard Max only)
2. USB using a USB-to-Serial serial adapter

####Using GPIO (MinnowBoard Max Only)

You will need:

* 1 X USB-to-TTL cable board cable (for this sample we used a [Silicon Labs CP2102 based USB-to-TTL cable](http://www.amazon.com/gp/product/B00LODGRV8?psc=1&redirect=true&ref_=oh_aui_search_detailpage){:target="_blank"})

The MinnowBoard Max has two on-board UARTs that can be configured to use GPIO pins. UART1 uses GPIO pins 6, 8, 10, and 12. UART2 uses GPIO pins 17 and 19. These GPIO pins are highlighted in green in the diagram below. In this sample we will use UART2.

<img src="{{site.baseurl}}/images/PinMappings/MBM_Pinout.png" height="400">

See the [MBM pin mapping page]({{site.baseurl}}/{{page.lang}}/win10/samples/PinMappingsMBM.htm) for more details on the MBM GPIO pins.

Make the following connections:

* Insert the USB end of the USB-to-TTL cable into a USB port on the PC

* Connect the GND pin of the USB-to-TTL cable to Pin 1 (GND) on the MBM board

* Connect the RX pin of the USB-to-TTL cable to Pin 17 (TX) on the MBM board

* Connect the TX pin of the USB-to-TTL cable to Pin 19  (RX) on the MBM board

Note: Leave the power pin of the USB-to-TTL cable unconnected. It is not needed.

<img src="{{site.baseurl}}/images/SerialSample/SiLabs-UART.png">

###Using USB-to-Serial Adapter

You will need:

* 2 X USB-to-TTL modules with cable (Silicon Labs CP2102 based only such as [this one](http://www.amazon.com/gp/product/B00LODGRV8?psc=1&redirect=true&ref_=oh_aui_search_detailpage){:target="_blank"})

Note: If you need Silicon Labs drivers for your PC you can find them [here](http://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx){:target="_blank"}

Note: Only USB-to-TTL cables with Silicon Labs chipsets are natively supported on MinnowBoard Max and Raspberry Pi2.

Make the following connections:

* Insert the USB end of the first USB-to-TTL module into a USB port on the PC

* Insert the USB end of the second USB-to-TTL module into a USB port on the RPI2 or MBM device

* Connect the GND pin of the first USB-to-TTL module to the GND pin of the second USB-to-TTL module 

* Connect the RX pin of the first USB-to-TTL module to the TX pin of the second USB-to-TTL module

* Connect the TX pin of the first USB-to-TTL module to the RX pin of the second USB-to-TTL module

Note: Leave the power pin of the USB-to-TTL cable unconnected. It is not needed.

In the picture below white wire (RX) from one USB-to-TTL goes to the TX pin of the other USB-to-TTL and similarly the green (TX)

<img src="{{site.baseurl}}/images/SerialSample/serial-connection.png">

###Deploy the app

Now that our PC and RPi2 or MBM are connected, let's setup the app.

* Download the Visual Studio 2015 SerialSample app from [here](https://github.com/ms-iot/samples/tree/develop/SerialSample/){:target="_blank"}
* Make two separate copies of the app. We'll refer to them as 'copy A' and 'copy B.'
* Open two instances of Visual Studio 2015 on your PC. We'll refer to these as 'instance A' and 'instance B.'
* Open copy A of the SerialSample app in VS instance B.
* Open copy B of the SerialSample app in VS instance B.
* In VS instance A, set the target architecture to 'x86' or 'x64'. This will be the instance of the sample we run on the PC.
* In VS instance B, set the target architecture to 'ARM' if you are using a RPi2. If you are using MBM, set the architecture to 'x86'.
* In VS instance A, select **Local Machine** and press F5 to deploy and run the app on your PC.
* In VS instance B, select **Remote Machine**
* If you're building for MinnowBoard Max or PC, select `x86` as the architecture.  If you're building for Raspberry Pi 2, select `ARM`.
* In the first Visual Studio instance select **Remote Machine** and hit F5 to deploy to your device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm){:target="_blank"}. if you need guidance.
* In the second Visual Studio instance select **Local Machine** and hit F5 to deploy to your local PC

###Run the app 

The following section describes the input selection you need to make if you wired your MinnowBoard Max on-board UART to your local PC. 

###On-board UART with MBM (UART2)

Once the app is deployed, you should see a `Select Device` ListBox with a selection of serial device IDs. 

On MinnowBoard Max instance of the app, select the device ID with UART2 in it and click on `Connect`. 

On the PC instance of the app, select the USB device ID corresponding to the connection and click on `Connect`.

Now you can type in text and click on `WRITE` to send data to the `Read Data:` textbox on the other end.

Congratulations! You just communicated over the serial interface.

**NOTE:** If you wired up USB-to-TTL, your device ID will start with the text `\\?\USB#`. Select this device ID and click on `Connect`. 

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