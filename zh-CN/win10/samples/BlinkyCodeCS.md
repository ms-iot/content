<h3> 我们来看看代码 </h3>
<div class="row">
  <div class="col-xs-24">
    <p>此示例的代码相当简单。我们使用了一个计时器，每当调用“Tick”事件时，都会切换 LED 的状态。</p>
    <h3> 计时器代码 </h3>
  </div>
  <div class="col-md-12 col-xs-24 col-no-padding">
    <p>下面说明如何使用 C# 设置计时器：</p>
  </div>
  <div class="col-md-12 col-xs-24">
        {% highlight C# %}
            public MainPage()
            {
                // ...

                timer = new DispatcherTimer();
                timer.Interval = TimeSpan.FromMilliseconds(500);
                timer.Tick += Timer_Tick;
                InitGPIO();
                if (pin != null)
                {
                    timer.Start();
                }

                // ...
            }

            private void Timer_Tick(object sender, object e)
            {
                if (pinValue == GpioPinValue.High)
                {
                    pinValue = GpioPinValue.Low;
                    pin.Write(pinValue);
                    LED.Fill = redBrush;
                }
                else
                {
                    pinValue = GpioPinValue.High;
                    pin.Write(pinValue);
                    LED.Fill = grayBrush;
                }
            }
        {% endhighlight %}
    </div>
</div>
<h3> 初始化 GPIO 引脚 </h3>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>为了驱动 GPIO 引脚，首先我们需要对其进行初始化。以下是 C# 代码（请注意我们如何在 Windows.Devices.Gpio 命名空间中利用新 WinRT 类）：</p>
        <p> 让我们稍稍细分一下此过程</p>
            <ul class="inline-list">
                <li>首先，我们使用 <code>GpioController.GetDefault()</code> 来获取 GPIO 控制器。</li>
                <li>如果设备没有 GPIO 控制器，此函数将返回 <code>null</code>。</li>
                <li>然后，我们尝试通过使用 <code>LED_PIN</code> 值调用 <code>GpioController.OpenPin()</code> 来打开引脚。</li>
                <li>获取 <code>pin</code> 之后，我们使用 <code>GpioPin.Write()</code> 函数默认将其设置为关闭状态（高）。</li>
                <li>我们还使用 <code>GpioPin.SetDriveMode()</code> 函数将 <code>pin</code> 设置为在输出模式下运行。</li>
            </ul>
    </div>
    <div class="col-md-12 col-xs-24">
        {% highlight C# %}
            using Windows.Devices.Gpio;

            private void InitGPIO()
            {
                var gpio = GpioController.GetDefault();

                // Show an error if there is no GPIO controller
                if (gpio == null)
                {
                    pin = null;
                    GpioStatus.Text = "There is no GPIO controller on this device.";
                    return;
                }

                pin = gpio.OpenPin(LED_PIN);
                pinValue = GpioPinValue.High;
                pin.Write(pinValue);
                pin.SetDriveMode(GpioPinDriveMode.Output);

                GpioStatus.Text = "GPIO pin initialized correctly.";

            }
        {% endhighlight %}
    </div>
</div>
<h3> 修改 GPIO 引脚的状态 </h3>
<div class="row">
  <div class="col-xs-24">
    <p>在能够访问 <code>GpioOutputPin</code> 实例后，没有必要更改引脚状态来打开或关闭 LED。</p>
  </div>
  <div class="col-md-12 col-xs-24 col-no-padding">
      <p>若要打开 LED，只需将值 <code>GpioPinValue.Low</code> 写入引脚：</p>
  </div>
  <div class="col-md-12 col-xs-24">
      {% highlight C# %}
          pin.Write(GpioPinValue.Low);
      {% endhighlight %}
  </div>
</div>
<div class="row">
    <div class="col-md-12 col-xs-24 col-no-padding">
        <p>当然，写入 <code>GpioPinValue.High</code> 会关闭 LED：</p>
    </div>
    <div class="col-md-12 col-xs-24">
        {% highlight C# %}
            pin.Write(GpioPinValue.High);
        {% endhighlight %}
    </div>
</div>








记得我们已将 LED 的另一端连接到了 3.3 伏电源，因此，我们需要将引脚驱动到低位，使电流通过 LED。
