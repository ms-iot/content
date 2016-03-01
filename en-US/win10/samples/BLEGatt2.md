---
layout: default
title: BLE GATT Sample - Code
permalink: /en-US/win10/samples/BLEGatt2.htm
lang: en-US
---

## Using and Dissecting the Code
Lets start up the sample and then go through the important code bits! Remember all the required code is [here](https://github.com/ms-iot/samples/archive/develop.zip){:target="_blank"}, in the [`BluetoothGATT/CS`](https://github.com/ms-iot/samples/tree/develop/BluetoothGATT/CS){:target="_blank"} folder.

This is a headed sample. To better understand what headed mode is and how to configure your device to be headed, follow the instructions [here]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm).

### Load the project in Visual Studio
Download the code [here](https://github.com/ms-iot/samples/archive/develop.zip){:target="_blank"}. Make a copy of the [`BluetoothGATT/CS`](https://github.com/ms-iot/samples/tree/develop/BluetoothGATT/CS){:target="_blank"} folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your device. Go back to the basic 'Hello World' [sample]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm) if you need guidance.

### Deploy and run the app
First we need to select the correct architecture to build for. If you're building for MinnowBoard Max, select `x86` in the architecture dropdown. If you're building for Raspberry Pi 2 or 3, select `ARM`.

Next, right-click on the **BluetoothGATT** project in **Solution Explorer** and select **"Set as StartUp Project"**.
Now you should be able to press F5 from Visual Studio: The BluetoothGATT app will deploy and start, and you should see this on the device output:

![BluetoothGatt App]({{site.baseurl}}/Resources/images/BLEGatt/app.png)

Click on the Start button at the top to connect to the SensorTag and display the sensor data. A popup may appear asking for permission to access the SensorTag service, click yes to continue. After a couple of seconds you should see the data being updated like this:

![BluetoothGatt App Running]({{site.baseurl}}/Resources/images/BLEGatt/appRunning.png)

### Let's look at the code

#### Having the Correct References
These extra references at the top of `MainPage.xaml.cs` that are important in making the sample work.

{% highlight C# %}
// Required APIs to use Bluetooth GATT
using Windows.Devices.Bluetooth;
using Windows.Devices.Bluetooth.GenericAttributeProfile;

// Required APIs to use built in GUIDs
using Windows.Devices.Enumeration;

// Required APIs for buffer manipulation & async operations
using Windows.Storage.Streams;
using System.Threading.Tasks;
{% endhighlight %}

Also you must provide information about your device's capabilities in the declarations in the App Manifest (`Package.appxmanifest`). This allows an app to be associated with your device. Learn more about Bluetooth device capabilities [here](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn263090.aspx){:target="_blank"}.

{% highlight XML %}
<Capabilities>
    <Capability Name="internetClient" />
    <DeviceCapability Name="bluetooth.genericAttributeProfile">
        <Device Id="any">
            <Function Type="name:genericAccess" />
        </Device>
    </DeviceCapability>
</Capabilities>
{% endhighlight %}

#### Retrieving a GATT Service
There are 7 GATT services on the SensorTag that we are interested in, and for each of those services we will need to create a `GattDeviceService` object in order to interact with them. The code for this is located in `init()` function, which is the first function that gets called after the start button gets pressed.

For each GATT service the sample:

1. Retrieves a list of `DeviceInformation` objects with the desired service GUID.
2. Retrieves a list of `GattDeviceService` objects using the id field of the desired `DeviceInformation` object.

Note the use of `async` and `await` in the code, this is so that the OS can still be responsive while waiting for the functions to finish. Learn more about these features [here](http://blogs.msdn.com/b/pfxteam/archive/2012/04/12/10293335.aspx){:target="_blank"}.

{% highlight C# %}
// Setup
private async Task<bool> init()
{
    // Retreive instances of the GATT services that we will use
    for (int i = 0; i < 7; i++)
    {
        // Setting Service GUIDs
        // Built in enumerations are found in the GattServiceUuids class like this: GattServiceUuids.GenericAccess
        Guid BLE_GUID;
        if (i < 6)
            BLE_GUID = new Guid("F000AA" + i + "0-0451-4000-B000-000000000000");
        else
            BLE_GUID = new Guid("0000FFE0-0000-1000-8000-00805F9B34FB");

        // Retrieving and saving GATT services
        var services = await DeviceInformation.FindAllAsync(GattDeviceService.GetDeviceSelectorFromUuid(BLE_GUID), null);
        if(services != null && services.Count > 0)
        {
            if (services[0].IsEnabled)
            {
                serviceList[i] = await GattDeviceService.FromIdAsync(services[0].Id);
            }
            else
            {
                UserOut.Text = "SensorTag is off!";
                return false;
            }
        }
        else
        {
            // SensorTag service somehow not discoverable
            switch (SensorList.SelectedIndex)
            {
                case (IR_SENSOR):
                    IRTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (ACCELEROMETER):
                    AccelTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (HUMIDITY):
                    HumidTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (MAGNETOMETER):
                    MagnoTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (BAROMETRIC_PRESSURE):
                    BaroTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (GYROSCOPE):
                    GyroTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                case (KEYS):
                    KeyTitle.Foreground = new SolidColorBrush(Colors.Red);
                    break;
                default:
                    break;
            }
        }
    }
    return true;
}
{% endhighlight %}

#### Working with a GATT Characteristic
Once we have a `GattDeviceService` object we can then obtain a `GattCharacteristic` object, which allows us to interact with GATT characteristics. The sample uses these objects to write, read, and set up notifications with the SensorTag GATT characteristics. The code that does this is located in the `enableSensor(int sensor)` function.

For each GATT Service, the sample:

1. Retrieves a list of `GattCharacteristic` objects with the desired Characteristic Data GUID.

2. Checks the GATT Characteristic properties, in this case we check whether we can enable notifications.

3. Adds a notification handler to the GATT characteristic.

4. Sets the notification enable flag.

5. Retrieves a list of `GattCharacteristic` objects with the desired Characteristic Configuration GUID.

6. Checks the GATT Characteristic properties, in this case we check whether we can write.

7. Writes a value to the GATT Characteristic to turn on the sensor.

Note the extra hardware configuration steps required for the Barometer, Accelerometer, and Gyroscope.

{% highlight C# %}
// Enable and subscribe to specified GATT characteristic
private async void enableSensor(int sensor)
{
    GattDeviceService gattService = serviceList[sensor];
    if (gattService != null)
    {
        // Turn on notifications
        IReadOnlyList<GattCharacteristic> characteristicList;
        if (sensor >= 0 && sensor <= 5)
            characteristicList = gattService.GetCharacteristics(new Guid("F000AA" + sensor + "1-0451-4000-B000-000000000000"));
        else
            characteristicList = gattService.GetCharacteristics(new Guid("0000FFE1-0000-1000-8000-00805F9B34FB"));

        if (characteristicList != null)
        {
            GattCharacteristic characteristic = characteristicList[0];
            if (characteristic.CharacteristicProperties.HasFlag(GattCharacteristicProperties.Notify))
            {
                switch (sensor)
                {
                    case (IR_SENSOR):
                        characteristic.ValueChanged += tempChanged;
                        IRTitle.Foreground = new SolidColorBrush(Colors.Green);
                        break;
                    case (ACCELEROMETER):
                        characteristic.ValueChanged += accelChanged;
                        AccelTitle.Foreground = new SolidColorBrush(Colors.Green);
                        setSensorPeriod(ACCELEROMETER, 250);
                        break;
                    case (HUMIDITY):
                        characteristic.ValueChanged += humidChanged;
                        HumidTitle.Foreground = new SolidColorBrush(Colors.Green);
                        break;
                    case (MAGNETOMETER):
                        characteristic.ValueChanged += magnoChanged;
                        MagnoTitle.Foreground = new SolidColorBrush(Colors.Green);
                        break;
                    case (BAROMETRIC_PRESSURE):
                        characteristic.ValueChanged += pressureChanged;
                        BaroTitle.Foreground = new SolidColorBrush(Colors.Green);
                        calibrateBarometer();
                        break;
                    case (GYROSCOPE):
                        characteristic.ValueChanged += gyroChanged;
                        GyroTitle.Foreground = new SolidColorBrush(Colors.Green);
                        break;
                    case (KEYS):
                        characteristic.ValueChanged += keyChanged;
                        KeyTitle.Foreground = new SolidColorBrush(Colors.Green);
                        break;
                    default:
                        break;
                }

                // Save a reference to each active characteristic, so that handlers do not get prematurely killed
                activeCharacteristics[sensor] = characteristic;

                // Set the notify enable flag
                await characteristic.WriteClientCharacteristicConfigurationDescriptorAsync(GattClientCharacteristicConfigurationDescriptorValue.Notify);
            }
        }

        // Turn on sensor
        if (sensor >= 0 && sensor <= 5)
        {
            characteristicList = gattService.GetCharacteristics(new Guid("F000AA" + sensor + "2-0451-4000-B000-000000000000"));
            if (characteristicList != null)
            {
                GattCharacteristic characteristic = characteristicList[0];
                if (characteristic.CharacteristicProperties.HasFlag(GattCharacteristicProperties.Write))
                {
                    var writer = new Windows.Storage.Streams.DataWriter();
                    // Special value for Gyroscope to enable all 3 axes
                    if (sensor == GYROSCOPE)
                        writer.WriteByte((Byte)0x07);
                    else
                        writer.WriteByte((Byte)0x01);

                    await characteristic.WriteValueAsync(writer.DetachBuffer());
                }
            }
        }
    }
}
{% endhighlight %}

#### GATT Notification Handlers
To set up GATT notifications properly the sample needs to provide a notification handler. In the sample we have 7 different of these handlers, and each handler goes through the same high-level process:

1. Reads the data from the GATT Characteristic.

2. Interprets and processes the data accordingly.

3. Updates the UI with the new data, which requires us to invoke the UI thread.

Note that the data does not have a specified type, you need to obtain that information elsewhere. For the SensorTag, we are able to understand the data from the [user guide](http://processors.wiki.ti.com/index.php/SensorTag_User_Guide){:target="_blank"}.

{% highlight C# %}
// Accelerometer change handler
// Algorithm taken from http://processors.wiki.ti.com/index.php/SensorTag_User_Guide#Accelerometer_2
async void accelChanged(GattCharacteristic sender, GattValueChangedEventArgs eventArgs)
{
    byte[] bArray = new byte[eventArgs.CharacteristicValue.Length];
    DataReader.FromBuffer(eventArgs.CharacteristicValue).ReadBytes(bArray);

    double x = (SByte)bArray[0] / 64.0;
    double y = (SByte)bArray[1] / 64.0;
    double z = (SByte)bArray[2] / 64.0 * -1;

    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
    {
        RecTranslateTransform.X = x * 90;
        RecTranslateTransform.Y = y * -90;

        AccelXOut.Text = "X: " + x.ToString();
        AccelYOut.Text = "Y: " + y.ToString();
        AccelZOut.Text = "Z: " + z.ToString();
    });
}
{% endhighlight %}

### That's it!
That is all you will need to know on how to interact with a BLE GATT device. See [Supporting Bluetooth Devices (XAML)](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/dn264587.aspx){:target="_blank"} for more examples on how to use the Bluetooth APIs. 

#### Previous Pages
[Sample Overview]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm) --- Learn about BLE, GATT, and the TI CC2541 SensorTag.

[Pairing a BLE Device and GATT Attribute Table Dump Tool]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt1.htm) --- Learn how to pair the SensorTag with a Windows IoT Core device, and how to retrieve a GATT Attribute Table in Windows.