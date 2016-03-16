---
layout: default
title: GpioOneWire
permalink: /zh-cn/win10/samples/GpioOneWire.htm
lang: zh-cn
---

## GpioOneWire 示例 \(DHT11\)

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/GpioOneWire)

此示例显示了如何从通用 Windows 应用程序的 [DHT11](https://www.adafruit.com/product/386) 中进行读取。DHT11 是低成本的温度和湿度传感器，它使用单线将接口连接到主控制器。主机使用此电线从 DHT11 请求示例，并通过 DHT11 将数据传输回该主机。

针对 GPIO API 可以处理的内容，DHT11 刚好是最明智的选择。如果有后台活动（如网络、USB、文件系统或图形活动），它可以阻止该示例从 DHT11 成功采样。

有关 DHT11 使用的协议说明，请参阅[本文章](http://embedded-lab.com/blog/?p=4333)。[此处](http://akizukidenshi.com/download/ds/aosong/DHT11.pdf)是数据表。

![屏幕截图]({{site.baseurl}}/Resources/images/GpioOneWireScreen1.png)

### 要求

{:.table.table-bordered}
| 最低支持版本 | 10\.0.10556 |
|-------------------------|---------------------------------|
| 受支持的硬件 | Raspberry Pi 2<br />Dragonboard 410C |

### 硬件设置

你将需要以下硬件来运行此演示：

 * 一个 [DHT11](https://www.adafruit.com/product/386) 或 [DHT22](http://www.adafruit.com/products/385) 传感器
 * 几根双母头连接线

如下图所示连接组件：

![示意图]({{site.baseurl}}/Resources/images/GpioOneWireSchematic.png) ![接线图]({{site.baseurl}}/Resources/images/GpioOneWireFritz.png)

### 运行演示

 1. 克隆 [ms iot/示例 Git 存储库](https://github.com/ms-iot/samples/blob/develop/GpioOneWire)并在 Visual Studio 2015 中打开 GpioOneWire/GpioOneWire.vcxproj。
 1. 在解决方案资源管理器中右键单击项目，然后单击 `Properties`。
 1. 在项目属性对话框中，选择 `Debugging` 选项卡。
 1. 在 `Machine Name` 字段中输入设备的 IP 地址。
 1. 将 `Authentication Type` 设置为 `Universal (Unencrypted Protocol)`
 1. 点击 `F5` 来生成、部署并调试该项目。你每隔两秒都可以看到屏幕上更新的温度和湿度示例。

### 工作原理

与 DHT11 交互的逻辑包含在 Dht11::Sample\(\) 方法中。由于 DHT11 发送回来的 1s 和 0s 已经编码为脉冲宽度，因此我们需要一种方法来精确测量下降沿之间的时间差。为此，我们使用 \[QueryPerformanceCounter\(\)\]\(https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms644904(v=vs.85).aspx\)。QueryPerformanceCounter 的单位依赖于平台，因此我们必须调用 \[QueryPerformanceFrequency\(\)\]\(https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms644905(v=vs.85).aspx\) 来确定计数器的分辨率。

下降沿之间的 76 微秒差表示“0”，而下降沿之间的 120 微秒差表示“1”。我们选择 110 微秒作为合理阈值，将大于该阈值的位视为 1s，而将小于此阈值的脉冲视为 0s。我们将 110 微秒转换为 QueryPerformanceCounter \(QPC\) 单位供以后使用。

{% highlight C++ %}

HRESULT GpioOneWire::Dht11::Sample (GpioOneWire::Dht11Reading& Reading)
{
    Reading = Dht11Reading();

    LARGE_INTEGER qpf;
    QueryPerformanceFrequency(&qpf);

    // This is the threshold used to determine whether a bit is a '0' or a '1'.
    // A '0' has a pulse time of 76 microseconds, while a '1' has a
    // pulse time of 120 microseconds. 110 is chosen as a reasonable threshold.
    // We convert the value to QPF units for later use.
    const unsigned int oneThreshold = static_cast<unsigned int>(
        110LL * qpf.QuadPart / 1000000LL);

{% endhighlight %}

接下来，我们将发送激活传感器所需的序列。当设备处于空闲状态时，GPIO 信号通常会拉高，我们必须将其拉低 18 毫秒以请求示例。我们将较低的值闭锁到引脚，并将其设置为输出，从而使 GPIO 引脚降低。

{% highlight C++ %}

    // Latch low value onto pin
    this->pin->Write(GpioPinValue::Low);

    // Set pin as output
    this->pin->SetDriveMode(GpioPinDriveMode::Output);

    // Wait for at least 18 ms
    Sleep(SAMPLE_HOLD_LOW_MILLIS);

{% endhighlight %}

然后，我们将引脚还原为输入使其升高，并等待 DHT11 将该引脚拉低，然后再拉高。

{% highlight C++ %}

    // Set pin back to input
    this->pin->SetDriveMode(this->inputDriveMode);

    GpioPinValue previousValue = this->pin->Read();

    // catch the first rising edge
    const ULONG initialRisingEdgeTimeoutMillis = 1;
    ULONGLONG endTickCount = GetTickCount64() + initialRisingEdgeTimeoutMillis;
    for (;;) {
        if (GetTickCount64() > endTickCount) {
            return HRESULT_FROM_WIN32(ERROR_TIMEOUT);
        }

        GpioPinValue value = this->pin->Read();
        if (value != previousValue) {
            // rising edgue?
            if (value == GpioPinValue::High) {
                break;
            }
            previousValue = value;
        }
    }

{% endhighlight %}

在收到第一个上升沿后，我们将捕获所有下降沿并测量它们之间的时间差来确定该位是 0 还是 1。

{% highlight C++ %}

    LARGE_INTEGER prevTime = { 0 };

    const ULONG sampleTimeoutMillis = 10;
    endTickCount = GetTickCount64() + sampleTimeoutMillis;

    // capture every falling edge until all bits are received or
    // timeout occurs
    for (unsigned int i = 0; i < (Reading.bits.size() + 1);) {
        if (GetTickCount64() > endTickCount) {
            return HRESULT_FROM_WIN32(ERROR_TIMEOUT);
        }

        GpioPinValue value = this->pin->Read();
        if ((previousValue == GpioPinValue::High) && (value == GpioPinValue::Low)) {
            // A falling edge was detected
            LARGE_INTEGER now;
            QueryPerformanceCounter(&now);

            if (i != 0) {
                unsigned int difference = static_cast<unsigned int>(
                    now.QuadPart - prevTime.QuadPart);
                Reading.bits[Reading.bits.size() - i] =
                    difference > oneThreshold;
            }

            prevTime = now;
            ++i;
        }

        previousValue = value;
    }

{% endhighlight %}

在收到所有位之后，我们会验证校验和以确保收到的数据有效。数据会通过 `Reading` 引用参数返回。

{% highlight C++ %}

    if (!Reading.IsValid()) {
        // checksum mismatch
        return HRESULT_FROM_WIN32(ERROR_INVALID_DATA);
    }

    return S_OK;
}

{% endhighlight %}

