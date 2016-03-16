---
layout: default
title: 你好，Blinky
permalink: /zh-cn/win8/samples/HelloBlinky.htm
lang: zh-cn
---

{% include steps.html device="Galileo" %}

<div style="background-color:Silver; color:black; padding:20px;">
	<h4><u>对 Intel Galileo 第 1 代和第 2 代的 Windows 的支持将于 2015 年 11 月 30 日结束</u></h4>
	<p><h5>由于我们将继续侧重于为制造商提供 Windows 10 IoT 核心版的出色体验，因此我们做出了一项艰难的决定，即停止对 Galileo 平台提供 Windows 支持。我们看到了平台上一些很出色的创新，但遗憾的是，它并不能满足 Windows 10 IoT 核心版的最低硬件要求。请单击<a href="http://go.microsoft.com/fwlink/?LinkId=690091" target="_blank">此处</a>了解详细信息。</h5></p>
</div>

#你好，Blinky
了解如何为 IoT 项目创建或更新、部署和调试 Windows 开发人员计划。

##创建一个新项目
打开 Visual Studio。选择“文件”-\>“新建项目并选择模板”-\>“Visual C++”-\>“Windows for IoT”-\>“Galileo 连接应用”![AppCreate]({{site.baseurl}}/Resources/images/Nuget_AppCreate.png)

##代码

{% highlight C++ %}
#include "stdafx.h"
#include "arduino.h"

int _tmain(int argc, _TCHAR* argv[])
{
  return RunArduinoSketch();
}

int led = 13;  // This is the pin the LED is attached to.

void setup()
{
  pinMode(led, OUTPUT); // Configure the pin for OUTPUT so you can turn on the LED.
}

// the loop routine runs over and over again forever:
void loop()
{
  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
  Log(L"LED OFF\n");
  delay(1000);               // wait for a second
  digitalWrite(led, HIGH);    // turn the LED on by making the voltage HIGH
  Log(L"LED ON\n");
  delay(1000);               // wait for a second
}
{% endhighlight %}

此代码包含在默认模板中，并且包含在此处以供参考。

##将 Galileo 与 LED 连结
LED 是会在供电时发光的二极管。它们是两极化的，这意味着它们只在正确插入时工作。![LED 连接]({{site.baseurl}}/Resources/images/HelloBlinky.png)

##构建和部署
按 F5 来构建并部署项目。

可能会提示你输入凭据。输入：

~~~
  Username: mygalileo\Administrator
  Password: admin
~~~

![]({{site.baseurl}}/Resources/images/VSDeployCred.png)

## 部署失败？
在某些网络条件下，按名称部署可能失败。在此情况下，最好按 IP 部署。

从 Galileo 观察程序复制 IP 地址，方法是右键单击 Galileo 实例并选择“复制 IP 地址”：

![复制 IP 地址]({{site.baseurl}}/Resources/images/Deploy_CopyIP.png)

通过在解决方案资源管理器中右键单击项目来打开项目属性。

将已复制的 IP 地址粘贴到 Visual Studio 中的调试选项卡上的“远程服务器名称”字段：

![粘贴 IP 地址]({{site.baseurl}}/Resources/images/Deploy_PasteIP.png)

##结果
你应该看到灯光闪烁。如果它未闪烁，请尝试倒转 LED 引线。

##转换为 Lightning
如果你有一个在 2014 年 12 月 1 日之前创建的项目，你将需要将其转换为 Lightning。

1. 从你的现有解决方案内，右键单击该项目并选择 ```Manage Nuget Packages```
1. 在左侧的列中选择 ```Installed Packages```

   ![已安装]({{site.baseurl}}/Resources/images/HelloBlinky_UninstallGalileoSDK.PNG)

1. 选择 ```Uninstall``` 以删除 ```Galileo C++ SDK```
1. 展开 ```Online```，然后选择 ```Nuget.org```
1. 在对话框右上角的 ```Search``` 框中，搜索 ```Microsoft IoT C++```。
1. 选择 ```Install```

   ![已安装]({{site.baseurl}}/Resources/images/HelloBlinky_InstallNative.PNG)

1. 重新生成你的项目

## 更新你的项目
Microsoft IoT 团队和社区正在添加功能并修复 SDK 中的 Bug。为了充分利用这些更改，你将需要手动更新你的项目。

1. 从你的现有解决方案内，右键单击该项目并选择 ```Manage Nuget Packages```
1. 从左侧的列中选择 ```Updates```。

   ![更新]({{site.baseurl}}/Resources/images/NugetUpdates.png)

1. 如果你希望使用预发行版本，请从下拉列表中选择 ```Include Prereleases```

   ![预发行]({{site.baseurl}}/Resources/images/Prerelease.png)

1. 单击 ```Update``` 按钮以更新你的项目。
