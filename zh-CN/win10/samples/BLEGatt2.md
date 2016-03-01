---
layout: default
title: BLE GATT 示例 - 代码
permalink: /zh-cn/win10/samples/BLEGatt2.htm
lang: zh-cn
---

## 使用和分解代码
让我们先看一下示例，然后再浏览重要的代码位！ 请记住，所需的所有代码都在[此处](https://github.com/ms-iot/samples/archive/develop.zip){:target="_blank"}（即 [`BluetoothGATT/CS`](https://github.com/ms-iot/samples/tree/develop/BluetoothGATT/CS){:target="_blank"} 文件夹中）。

这是一个有外设示例。若要更好地了解什么是有外设模式以及如何将你的设备配置为有外设，请按照[此处]({{site.baseurl}}/{{page.lang}}/win10/HeadlessMode.htm)的说明操作。

### 在 Visual Studio 中加载项目
在[此处](https://github.com/ms-iot/samples/archive/develop.zip){:target="_blank"}下载代码。在磁盘上创建 [`BluetoothGATT/CS`](https://github.com/ms-iot/samples/tree/develop/BluetoothGATT/CS){:target="_blank"} 文件夹的副本，然后从 Visual Studio 中打开项目。

确保将“远程调试”设置设为指向你的设备。如需指导，请返回基本“Hello World”[示例]({{site.baseurl}}/{{page.lang}}/win10/samples/HelloWorld.htm)。

### 部署和运行应用
首先，我们需要选择用于进行生成的正确体系结构。如果你要针对 Minnowboard Max 进行生成，请选择体系结构下拉列表中的 `x86`。如果你要针对 Raspberry Pi 2 进行生成，请选择 `ARM`。

接下来，右键单击“解决方案资源管理器”中的“BluetoothGATT”项目，然后选择“设置为启动项目”。现在，你应该可以在 Visual Studio 中按 F5： BluetoothGATT 应用将部署并启动，随后你应该能在设备输出上看到此应用：

![BluetoothGatt 应用]({{site.baseurl}}/Resources/images/BLEGatt/app.png)

单击顶部的“开始”按钮以连接到 SensorTag，并显示传感器数据。此时，可能会出现一个弹出窗口，提示用户是否允许访问 SensorTag 服务，单击“是”以继续操作。几秒钟后，你应该能看到更新后的数据，如下所示：

![BluetoothGatt 应用运行]({{site.baseurl}}/Resources/images/BLEGatt/appRunning.png)

### 我们来看看代码

#### 获得正确的引用
`MainPage.xaml.cs` 顶部的这些其他引用，对于执行示例工作十分重要。

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

此外，你必须在应用清单 \(`Package.appxmanifest`\) 的声明中提供有关设备功能的信息。这使应用可以与设备相关联。在[此处](https://msdn.microsoft.com/zh-cn/library/windows/apps/xaml/dn263090.aspx){:target="_blank"}了解有关蓝牙设备功能的详细信息。

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

#### 检索 GATT 服务
SensorTag 上有 7 项我们感兴趣的 GATT 服务，对于其中每项服务，我们将需要创建 `GattDeviceService` 对象才能与之交互。其代码位于 `init()` 函数中，该函数是按下“开始”按钮后调用的第一个函数。

对于每项 GATT 服务，该示例：

1. 检索带有所需服务 GUID 的 `DeviceInformation` 对象列表。
2. 使用所需 `DeviceInformation` 对象的 ID 字段检索 `GattDeviceService` 对象列表。

请注意，在代码中使用 `async` 和 `await`，以便操作系统在等待函数完成相关操作时仍具有响应性。在[此处](http://blogs.msdn.com/b/pfxteam/archive/2012/04/12/10293335.aspx){:target="_blank"}了解有关这些功能的详细信息。

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

#### 使用 GATT 特征
一旦我们有了 `GattDeviceService` 对象，我们便可以获取 `GattCharacteristic` 对象，它允许我们与 GATT 特征交互。本示例使用这些对象，以通过 SensorTag GATT 特征写入、读取和设置通知。可在 `enableSensor(int sensor)` 函数中找到用于执行此操作的代码。

对于每项 GATT 服务，该示例：

1. 检索带有所需特征数据 GUID 的 `GattCharacteristic` 对象列表。

2. 检查 GATT 特征属性，在本例中将检查是否可以启用通知。

3. 将通知处理程序添加到 GATT 特征。

4. 设置通知启用标志。

5. 检索带有所需特征配置 GUID 的 `GattCharacteristic` 对象列表。

6. 检查 GATT 特征属性，在本例中将检查是否可进行写入操作。

7. 向 GATT 特征更写入一个值，以打开传感器。

请注意，气压计、加速计和陀螺仪还要求执行额外的硬件配置步骤。

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

#### GATT 通知处理程序
若要正确设置 GATT 通知，则示例中需提供一个通知处理程序。在该示例中，我们有 7 种不同的此类处理程序，而每种处理程序均需通过同等高级别的过程：

1. 从 GATT 特征读取数据。

2. 解释该数据并做出相应处理。

3. 使用新数据更新 UI，这要求我们调用 UI 线程。

请注意，该数据并没有指定的类型，你需要从其他位置获取该信息。对于 SensorTag，我们能够通过[用户指南](http://processors.wiki.ti.com/index.php/SensorTag_User_Guide){:target="_blank"}了解数据。

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

### 就这么简单！
你所需了解的有关如何与 BLE GATT 设备交互的全部信息均在本指南中。有关如何使用蓝牙 API 的更多示例，请参阅[支持蓝牙设备 \(XAML\)](https://msdn.microsoft.com/zh-cn/library/windows/apps/xaml/dn264587.aspx){:target="_blank"}。

#### 以前的页面
[示例概述]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt.htm) - 了解 BLE、GATT 和 TI CC2541 SensorTag。

[将 BLE 设备和 GATT 属性表转储工具配对]({{site.baseurl}}/{{page.lang}}/win10/samples/BLEGatt1.htm) - 了解如何将 SensorTag 与 Windows IoT 核心版设备配对，以及如何在 Windows 中检索 GATT 属性表。