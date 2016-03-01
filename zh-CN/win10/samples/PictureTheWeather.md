---
layout: default
title: 描绘天气
permalink: /zh-cn/win10/samples/PictureTheWeather.htm
lang: zh-cn
---

##“描绘天气”示例，使用面向 Arduino 的 Windows Virtual Shield

在此示例中，我们会将 RGB LED 条连接到 Arduino，并控制它在图片后指示天气预报。

![RGB 带 1]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split1.JPG)

###组件

你将需要以下硬件：

* 一个 Arduino UNO 或兼容设备

* [数字 RGB LED 防风雨条 - LPD8806 32 LED - （1 米）](http://www.adafruit.com/products/306){:target="_blank"}）

* [SparkFun 蓝牙调制解调器 - BlueSMiRF 银色](https://www.sparkfun.com/products/12577){:target="_blank"}

* 焊接和烙铁

* 20 根红色/黑色/绿色/黄色电线，每个长度为 6 英寸（5 组 4 种颜色）。

* 相框

* 来自会艺术创作的家庭成员、朋友或你自己的 8 x 11 英寸纸张绘图

###连接到你的设备

* 按照此 [Arduino 存储库](https://github.com/ms-iot/virtual-shields-arduino){:target="_blank"}中的说明设置 Arduino。

* 按照此 [Arduino 存储库](https://github.com/ms-iot/virtual-shields-universal){:target="_blank"}中的说明设置 Windows Phone。

###修改 RGB 条

RGB LED 条在条中附带 48 个 LED。

* 在接缝处仔细拆开 RGB 条，这样你就拥有了含有 8 个灯的 6 个条。

* 将电源连接器（和其他原始电线）保留在 6 个条的右下角，

* ...在裂缝之间焊接电线，以便各端通过电线重新连接。

![RGB 带 2]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split2.JPG)

###RGB 条的放置

当原始电源连接器放置在右下角时，将含有 8 个 LED 的 6 个条放置在相框的背衬内，以便 8x11 英寸的白纸（带有插图）将 LED 与玻璃框架分隔开。

将背衬用胶带粘贴或连接到项目上。

![RGB 带 1]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbstrip_split1.JPG)

###将 RGB 条连接到 Arduino

从 RGB LED 条：

* 将地线连接到 Arduino 上的 GND。

* 将绿线连接到 Arduino 上的引脚 2。

* 将黄线连接到 Arduino 上的引脚 3。

* 将筒状电源连接器连接到 5 伏特电源（按照 Adafruit 的说明）。

![RGB 连接]({{site.baseurl}}/Resources/images/RGBSTRIP/rgbconnect.JPG)

###上载到你的设备

* 在 Arduino IDE（从“连接到你的设备： Arduino”中设置）中，选择菜单项“文件”-\>“示例”-\>“VirtualShield”-\>“PictureTheWeather”

* 上载到你的 Arduino。

###查看其运行

* 手机将显示“Web 天气指示器”、你的坐标和你的天气预报。

* 你可以说“明天”、“3 天内”、“5 天内”以查看你的方位的不同预报。

* （还有一个不太秘密的调试模式），尝试说“显示雷暴”。然后说“打击”。

###以下是会发生的情况...

使用适用于 Arduino 的 Windows Virtual Shield，Arduino 草稿是：\* 获取你的 GPS 坐标。

* 使用它获取国家天气服务预报和使用你的坐标的位置

* 在屏幕上向你呈现该信息，并且

* 在 RGB LED 上条设置动画。

![手机映像]({{site.baseurl}}/Resources/images/RGBSTRIP/Phone.JPG)
