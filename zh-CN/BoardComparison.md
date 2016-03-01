---
layout: default
title: 开发板比较
permalink: /zh-cn/BoardComparison.htm
lang: zh-cn
---
<ol class="breadcrumb">
  <li>
    <a href="https://dev.windows.com/zh-cn/iot">IoT 主页</a>
  </li>
  <li>
    <a href="{{site.baseurl}}/{{page.lang}}/GetStarted.htm">入门</a>
  </li>
  <li class="active">选择一个开发板</li>
</ol>
<h1 class="page-title"> 选择一个开发板 </h1>
<h2 class="subtext"> 比较各种兼容 Windows 10 IoT 核心版开发板的特征和功能。</h3> <h3>兼容的 Windows 10 核心版平台</h3> <hr> <p> 当前，Windows 10 IoT 核心版在 Raspberry Pi 2、MinnowBoard MAX 和 Dragonboard 410c 上受支持。了解有关以下每个开发板的功能的详细信息，并查看每个开发板的<a href="http://go.microsoft.com/fwlink/p/?linkID=532948">受支持硬件外设</a>来确定哪个开发板适合你。</p> <table class="table table-striped maker-kit"> <tr></tr> <tr> <th style="width:25%"></th> <th style="width:25%"> <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/RPi2_0.png"> <h4>Raspberry Pi 2</h4> <p>Raspberry Pi 2 是一种低成本、信用卡大小的计算机，可插入计算机监视器或电视，并且使用标准键盘和鼠标。Raspberry Pi 2 运行 Windows 10 IoT 核心版。</p> </th> <th style="width:25%"> <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/MBM_0.png"> <h4>MinnowBoard MAX</h4> <p>MinnowBoard MAX 是一款采用 Intel Atom E38XX 系列 SOC 作为其核心的开放硬件嵌入式板。MinnowBoard MAX 支持 Windows 10 IoT 核心版。</p> </th> <th style="width:25%"> <img class="comparison-picture" src="{{site.baseurl}}/Resources/images/devices/DB410c.png"> <h4>DragonBoard 410c</h4> <p>基于 Linaro 96Boards™ 规范的 DragonBoard™ 410c 具有 Qualcomm® Snapdragon™ 410 处理器、每核最高 1.2GHz 时钟速度的四核 ARM® Cortex™ A53（支持 32 位和 64 位运行）。WLAN、蓝牙和 GPS，全部打包到一个信用卡大小的开发板中。</p> </th> </tr> <tr> <td>SOC</td> <td>Broadcom BCM2836</td> <td>Intel Atom \(x86\)</td> <td>Qualcomm Snap Dragon 410</td> </tr> <tr> <td>CPU</td> <td>900MHz 四核 ARM Cortex A7</td> <td></td> <td>900MHz 四核 ARM Cortex A7</td> </tr> <tr> <td>内存</td> <td>1GB（与 GPU 共享）</td> <td> 1GB\($99 MSRP\) <br> 2GB\($139 MSRP\) </td> <td>1GB</td> </tr> <tr> <td>GPU</td> <td>Broadcom Video Core IV @ 250MHz</td> <td>Intel HD Graphics</td> <td>Qualcomm ADreno 306 @ 400MHz</td> </tr> <tr> <td>USB</td> <td>4 个端口</td> <td>2 个端口</td> <td>4 个端口</td> </tr> <tr> <td>网络</td> <td>无板载 WLAN 或蓝牙。以 10/1000MBi 以太网支持 WLAN 和蓝牙硬件保护装置。</td> <td>10/100/1000 以太网</td> <td> 板载 WLAN 802.11 a/b/g/n <br> 板载蓝牙 4.1 </td> </tr> <tr> <td>视频输出</td> <td>HDMI，通过 3.5 mm 插座的复合音频。</td> <td>Micro HDMI</td> <td>HDMI 1080p HD @ 30 fps</td> </tr> <tr> <td>音频输出</td> <td>通过 3.5 mm 插座的模拟。<br> 通过 HDMI 的数字</td> <td> 通过 HDMI 的数字 <br> 通过 MinnowBoard MAX Lure 的模拟（单独出售）</td> <td></td> </tr> <tr> <td>GPS</td> <td>否</td> <td>否</td> <td>是</td> </tr> <tr> <td> 外设 </td> <td> <p>17 个 GPIO 引脚加上特定函数。HAT ID 总线。</p> <p><a href="{{site.baseurl}}/{{page.lang}}/win10/RPI.htm">设置你的 Raspberry Pi 2</a></p> <p><a href="http://ms-iot.github.io/content/zh-cn/GetStarted.htm">Windows 10 IoT 核心版仪表板入门</a></p> </td> <td> <p>8 个缓冲的 GPIO 引脚</p> <p><a href="{{site.baseurl}}/{{page.lang}}/win10/MBM.htm">设置你的 MinnowBoard MAX</a></p> <p><a href="http://ms-iot.github.io/content/zh-cn/GetStarted.htm">Windows 10 IoT 核心版仪表板入门</a></p> </td> <td> <p>12 个 GPIO 引脚</p> <p><a href="{{site.baseurl}}/{{page.lang}}/win10/DB410c.htm">设置你的 DragonBoard 410c</a></p> </td> </tr> </table>
