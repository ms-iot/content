---
layout: default
title: Arduino 接线气象站
permalink: /zh-cn/win10/samples/arduino-wiring/WeatherStation.htm
lang: zh-cn
---

#气象站 + Lightning

{% include VerifiedVersion.md %}

了解如何在 Raspberry Pi 2 上创建 Arduino 接线草图，并使用 Lightning 的强大功能设置自己的气象站。只需将 [Sparkfun Weather Shield](https://www.sparkfun.com/products/12081) 连接到 Raspberry Pi 2 并部署 UWP 应用，即可收集你周围的天气数据。此 Shield 主要使用两个传感器（[HTU21D 湿度和温度传感器](https://www.sparkfun.com/products/12064)和 [MPL3115A2 高度/压力传感器](https://www.sparkfun.com/products/11084)），但也可扩展用于读取风级和雨量。可以复制附带 Shield 本身或个别传感器的整个项目。

继续阅读以便开始操作！

##硬件设置

<div class="row">
  <p>
    第一步是将 Raspberry Pi 2 连接到 Sparkfun Weather Shield。 将接线图和以下旋转中的照片用于参照。<i> 注意： 此功能需要使用 JavaScript。 如果你在旋转时遇到问题，请确保已在你的浏览器中启用了 JavaScript。</i> 还可以参考参照图下方的 fritzing 图。
  </p>
  <div class="col-md-6 col-sm-12">
    <div class="floatTop">
    引出线图 (Raspberry Pi 2 --> Sparkfun Weather Shield)：
      <ul>
        <li> GND-------(黑色)------GND </li>
        <li> 5V----------（红色）---------VIN </li>
        <li> 3V3-------（棕色）------5V（Shield 攻击；不是键入错误） </li>
        <li> GPIO2-----（黄色）----SDA </li>
        <li> GPIO3----（橙色）----SCL </li>
        <li> GPIO5-----（绿色）-----D8 </li>
        <li> GPIO6-----（蓝色）-------D7 </li>
      </ul>
    </div>
  </div>

  <div class="col-md-6 col-sm-12">
    <div id="carousel" data-interval="false" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carousel" data-slide-to="0" class="active"></li>
        <li data-target="#carousel" data-slide-to="1"></li>
        <li data-target="#carousel" data-slide-to="2"></li>
        <li data-target="#carousel" data-slide-to="3"></li>
        <li data-target="#carousel" data-slide-to="4"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
      <div class="item active">
          <img src="{{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png">
          <div class="carousel-caption">
            Rasberry Pi 2 GPIO 示意图
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_RasPi2_inside.jpeg">
          <div class="carousel-caption">
            Raspberry Pi 2 接线图（内部）
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_RasPi2_outside.jpeg">
          <div class="carousel-caption">
            Raspberry Pi 2 接线图（外部）
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_WeatherShield_LeftRail.jpeg" >
          <div class="carousel-caption">
            Weather Shield（光轨）
          </div>
        </div>
        <div class="item">
          <img src="{{site.baseurl}}/Resources/images/Lightning/Wiring_WeatherShield_RightRail.jpeg" >
          <div class="carousel-caption">
            Weather Shield（右侧围栏）
          </div>
        </div>
      </div>

      <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">上一个</span>
      </a>
      <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">下一个</span>
      </a>
    </div>
  </div>
</div>

###Fritzing 图

![RPI 引出线]({{site.baseurl}}/Resources/images/arduino_wiring/pi2_weathershield.png)

##软件设置

有两种方法可用来设置软件。

<strong>选项 1： 克隆整个解决方案</strong>

<p>正常设置气象站的最简单方法是将整个解决方案从<a href="https://github.com/turkycat/Weather_Shield">此 GitHub 存储库</a>的“Lightning”文件夹克隆到本地计算机。</p>

<strong>选项 2： 手动设置你的解决方案</strong>

<p>如果你希望手动设置解决方案，请按照下列步骤操作：</p>

<ol>
    <li>按照 <a href="{{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm" target="_blank">Arduino 接线项目设置指南</a>创建新项目。</li>
    <li>将以下库从 GitHub 克隆到 WeatherShield 文件夹（与 .vcxproj 文件处于同一个级别）： <a target="_blank" href="https://github.com/sparkfun/MPL3115A2_Breakout/">MPL3115A2 突围</a>和 <a target="_blank" href="https://github.com/sparkfun/HTU21D_Breakout">HTU21D 突围</a>。</li>
    <li>将主要 .ino 文件（{yourProject}.ino，其中 {yourProject} 是你在创建项目时指定的项目名）中的现有代码替换为以下代码:
      {% highlight C++ %}
        /*
        HTU21D 湿度传感器示例代码
        作者： Nathan Seidle
        SparkFun Electronics
        日期: 2013 年 9 月 15 日
        许可证 此代码公开可见，但如果你要使用此代码，并且有朝一日我们会相见，就请我喝啤酒吧（Beerware 许可证）。
        使用 HTU21D 库以显示当前湿度和温度
        以 9600 波特打开串行监视器来查看读数。错误 998（如果未检测到传感器）。错误 999（如果 CRC 损坏）。
        硬件连接（试验板连接到 Arduino）：
        -VCC = 3.3V
        -GND = GND
        -SDA = A4（如果开发板为 5V，则使用内联 10k 电阻器）
        -SCL = A5（如果开发板为 5V，则使用内联 10k 电阻器）
        */

        #include <Wire.h>
        #include"HTU21D\Libraries\Arduino\src\SparkFunHTU21D.h"
        #include “MPL3115A2\Libraries\Arduino\src\SparkFunMPL3115A2.h”

        //创建对象实例
        HTU21D myHumidity;
        MPL3115A2 myPressure;

        bool barometerMode = true;

        void setup()
        {
            Wire.begin();
            Log( "WeatherShield Example!" );

            myHumidity.begin();
            myPressure.begin();

            if( barometerMode )
            {
                myPressure.setModeBarometer(); // 测量 20 到 110 kPa 的压力（以帕斯卡为单位）
            }
            else
            {
                myPressure.setModeAltimeter(); // 测量海平面上的高度（以米为单位）
            }

            myPressure.setOversampleRate( 7 ); // 将 Oversample 设置为建议值 128
            myPressure.enableEventFlags(); // 将三个压力和温度事件标志全部启用
        }

        void loop()
        {
            /*
            * 来自 HTU21D 示例 - SparkFun_HTU21D_Demo.ino
            */
            float humd = myHumidity.readHumidity();
            float temp = myHumidity.readTemperature();

            Log( "Time:" );
            Log( millis().ToString()->Begin() );
            Log( " Temperature: " );
            Log( temp.ToString()->Begin() );
            Log( "C" );
            Log( " Humidity: " );
            Log( humd.ToString()->Begin() );

            if( barometerMode )
            {
                /*
                * 来自 PL3115A2 示例 - SparkFunPressure.ino
                * 模式必须采用气压计
                */

                float altitude = myPressure.readAltitude();
                Log( " Altitude(m): " );
                Log( altitude.ToString()->Begin() );

                altitude = myPressure.readAltitudeFt();
                Log( " Altitude(ft): " );
                Log( altitude.ToString()->Begin() );

                float pressure = myPressure.readPressure();
                Log( " Pressure(Pa): " );
                Log( pressure.ToString()->Begin() );

                float temperature = myPressure.readTemp();
                Log( " Temp(c): " );
                Log( temperature.ToString()->Begin() );

                temperature = myPressure.readTempF();
                Log( " Temp(f): " );
                Log( temp.ToString()->Begin() );


                /*
                * 来自 MPL3115A2 示例 - SparkFunBarometricHgInch.ino
                * 模式必须采用气压计
                */
                const int station_elevation_m = 1638; //在我家楼顶上的准确测量值
                                                      //1 pascal = 0.01 millibars
                pressure /= 100; //压力现在以毫巴为单位

                float part1 = pressure - 0.3; //公式的第 1 部分

                const float part2 = 8.42288 / 100000.0;
                float part3 = pow( ( pressure - 0.3 ), 0.190284 );
                float part4 = (float)station_elevation_m / part3;
                float part5 = ( 1.0 + ( part2 * part4 ) );
                float part6 = pow( part5, ( 1.0 / 0.190284 ) );
                float altimeter_setting_pressure_mb = part1 * part6; //输出现在以调整后的毫巴为单位
                float baroin = altimeter_setting_pressure_mb * 0.02953;

                Log( " Altimeter setting InHg: " );
                Log( baroin.ToString()->Begin() );
            }
            else    //高度计模式
            {
                /*
                * 来自 SparkFunAltimeter.ino
                * 模式必须采用高度计
                */
                float altitude = myPressure.readAltitude();
                Log( "Altitude(m): " );
                Log( altitude.ToString()->Begin() );

                altitude = myPressure.readAltitudeFt();
                Log( " Altitude(ft): " );
                Log( altitude.ToString()->Begin() );

                float pressure = myPressure.readPressure();
                Log( "Pressure(Pa): " );
                Log( pressure.ToString()->Begin() );

                float temperature = myPressure.readTemp();
                Log( " Temp(c): " );
                Log( temperature.ToString()->Begin() );

                temperature = myPressure.readTempF();
                Log( " Temp(f): " );
                Log( temperature.ToString()->Begin() );
            }

            Log( "\n" );

            delay( 1000 );
        }

      {% endhighlight %}
    </li>
</ol>

####注意：
特别注意草图文件顶部附近的以下行：`bool barometerMode = true;`。MPL3115A2 传感器有两种模式，并且可在每种模式下以不同方式运行。可以将此变量更改为 `false`，以禁用气压计模式，而改为启用高度计模式！ 在新的模式下，将自动更改草图结果！

##生成和部署应用

<p>按 F5 生成并部署项目。
有关如何部署应用的详细说明，请参阅 <a href="{{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm">Arduino 接线项目指南</a>！
</p>
<p>
项目部署完成后，运行该程序就会看到数据显示在输出控制台中。
</p>

##结果

观看 Visual Studio 中的输出窗口。草图将开始报告它从 Weather Shield 收集的数据！

##是否遇到难题?

有关在处理 Arduino 接线草图时会遇到的常见问题和关注内容，请参阅 [Arduino 接线移植指南]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringPortingGuide.htm)。

---

[&laquo; 返回到示例]({{site.baseurl}}/{{page.lang}}/win10/StartCoding.htm){:role="button"}{:class="btn btn-default"}
