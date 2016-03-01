---
layout: default
title: 项目设置
permalink: /zh-cn/win10/ArduinoWiringPortingGuide.htm
lang: zh-cn
---

# Arduino 接线移植指南

Arduino 接线草图和库可在 Visual Studio 内复制/粘贴到 Arduino 接线项目，并在 Raspberry Pi 2 或 Minnowboard Max 上运行。有时需要对这些文件进行轻微修改，以便使它们与 Windows 环境或你正在使用的板更兼容。本指南将介绍这些修改以及你可能会在部署 Arduino 接线项目时遇到的常见问题！

### 缺少某些内容？
需要有关[在 Visual Studio 中设置 Arduino 接线]({{site.baseurl}}/{{page.lang}}/win10/ArduinoWiringProjectGuide.htm)的详细信息？

## 索引

### 移植
- <a href="#port_pins">更新引脚</a>
- <a href="#port_serial">删除对“串行”的引用</a>
	
### 常见问题
- <a href="#prob_missingiot">在 Visual Studio 中找不到“Arduino 接线应用程序”Visual C++ 项目模板</a>
- 错误：<a href="#prob_hardwareserial">未解析的外部符号“类 HardwareSerial 串行”</a>
- 错误：<a href="#prob_identifier">在调用某个函数时“找不到标识符”</a>
- <a href="#prob_hanging">我的解决方案在初始化时无限期挂起</a>



## 移植

<a name="port_pins"></a>

### 更新引脚

不言而喻，许多草图和库（尤其是用于 Arduino 防护的草图和库）可能包含对 Arduino 设备的特定连接器引脚的引用。你将要自定义你的草图来针对你正在处理的设备和你正在使用的配置使用相应的连接器引脚。

Arduino 接线最终需要引用“引脚”的任何函数的物理连接器引脚编号。你可以直接使用这些编号，但我们还提供了一些对应于特定板上的连接器引脚的预定义引脚名称。

例如，Raspberry Pi 2 上的物理连接器引脚 29 也称为 `GPIO_5`。你可以通过使用以下任一命令在 Raspberry Pi 2 上将 GPIO 引脚 5 设置为 HIGH 状态：

{% highlight C++ %}

pinMode( 29, OUTPUT );
digitalWrite( 29, HIGH );

{% endhighlight %}

或

{% highlight C++ %}

pinMode( GPIO_5, OUTPUT );
digitalWrite( GPIO_5, HIGH );

{% endhighlight %}

预定义引脚名称可以在任何 Arduino 接线项目内的 `PinNumbers.h` 中找到，但由于物理连接器引脚因你进行生成所针对的硬件设置而异，因此我们还在此处包含了一张表，用于介绍每台设备可以使用哪些引脚名称。

#### Raspberry Pi 2

[引出线图]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)

{:.table.table-bordered}
| 引脚定义 | 相应的引脚编号 |
| -------------| ------------- |
| LED\_BUILTIN | *板载 LED* |
| GPIO\_\* _其中 \* 指的是 \[0, 27\]_ | *请参考引出线图* |
| GPIO\_GCLK | 7 |
| GPIO\_GEN\* _其中 \* 指的是 \[0, 5\]_ | *请参考引出线图* |
| I2C\_SCL1 | 5 |
| I2C\_SDA1 | 3 |
| SPI\_CS0 | 24 |
| SPI\_CS1 | 26 |
| SPI\_CLK | 23 |
| SPI\_MISO | 21 |
| SPI\_MOSI | 19 |
| RXD0 | 10 |
| TXD0 | 8 |

#### Minnowboard Max

[引出线图]({{site.baseurl}}/Resources/images/PinMappings/MBM_Pinout.png)

{:.table.table-bordered}
| 引脚定义 | 相应的引脚编号 |
| -------------| ------------- |
| GPIO\_\* _其中 \* 指的是 \[0, 9\]_ | *请参考引出线图* |
| I2C\_SCL | 13 |
| I2C\_SDA | 15 |
| SPI\_CS0 | 5 |
| SPI\_SCLK | 11 |
| SPI\_MISO |7 |
| SPI\_MOSI | 9 |
| UARAT1\_CTS | 10 |
| UARAT1\_RTS | 12 |
| UARAT1\_RX | 8 |
| UARAT1\_TX | 6 |
| UARAT2\_RX | 19 |
| UARAT2\_TX | 17 |

<a name="port_serial"></a>

### 删除对“串行”的引用

许多 Arduino 草图使用 `Serial` 将数据打印到串行控制台（如果打开）或写入串行线（USB 或 tx/rx）。我们已提供了一个“Log”函数，该函数会在 Visual Studio 中将 WCHAR\* 类型（ascii 字符串或宽字符字符串）打印到输出控制台。如果要复制为 Arduino 生成的草图，你将需要在该草图的 Windows IoT 版本中替换其中任何串行引用。

在下表中，将 Arduino API 串行引用替换为 Windows IoT 列中的语法。如果某个 API 应完全删除，你将在 Windows IoT 列中看到“删除”。

{:.table.table-bordered}
| Arduino API 语法 | Windows IoT 语法 |
| -------------| ------------- |
| Serial.begin\( int \) | *删除* |
| Serial.write\( char\* str \) | *删除* \*如下所示 \| \| Serial.print\( char\* str \) \| Log\( str \) \| \| Serial.print\( int num \) \| Log\( num.ToString\(\)-\>Begin\(\) \) \| \| Serial.print\( int num, format fmt \) \| Log\( num.ToString\(\)-\>Begin\(\) \) \|


####为何删除 Serial.write\(\)？

Serial.write\(\) 通常用于通过串行线发送原始数据。Windows IoT 核心版当前没有 UART 功能，因此应避免这些类型的调用。



## 常见问题

<a name="prob_missingiot"></a>

### 在 Visual Studio 中找不到“Arduino 接线应用程序”Visual C++ 项目模板

**原因**： 未安装适用于 Visual Studio 的 Windows IoT 项目模板扩展。

**解决方案**： 你必须先安装适用于 Windows IoT 项目模板的 Visual Studio 扩展才能在 Visual Studio 中创建 Arduino 接线项目。转到 [Windows IoT 核心版项目模板扩展页面](https://visualstudiogallery.msdn.microsoft.com/55b357e1-a533-43ad-82a5-a88ac4b01dec)来从 Visual Studio 库下载该扩展！

<a name="prob_hardwareserial"></a>

### 错误：“未解析的外部符号‘类 HardwareSerial 串行’”

**原因**： 当你的 Arduino 接线草图或库中有 `Serial` 引用时，会发生此问题。

**解决方案**： 使用此错误上的“文件”和“行”字段来找到导致该问题的引用，然后使用此页面的<a href="#port_serial">删除对“串行”的引用</a>部分来解决此问题。

<a name="prob_identifier"></a>

### 错误：在调用某个函数时“找不到标识符”

**原因**： 当调用尚未在文档中声明的函数时，在链接器过程中会发生此错误。

**解决方案**： 在 C++ 中，所有函数都必须在调用前进行声明。如果你已在草图文件中定义了新函数，该函数的声明或完整实现必须在任何调用它的尝试上方（通常在文档顶部）。

**示例**：

以下代码块将引发错误“‘myFunction’：找不到标识符”

{% highlight C++ %}

void setup()
{

}

void loop()
{
    myFunction();
}

void myFunction()
{
    //do something
}

{% endhighlight %}

有两种解决方案。首先，你可以在任何调用上方声明该函数。通常，此声明在文件顶部完成。

{% highlight C++ %}

void myFunction();

void setup()
{

}

void loop()
{
    myFunction();
}

void myFunction()
{
    //do something
}

{% endhighlight %}

另一个选项是将函数的整个实现移到任何调用上方。这会导致同时声明和定义该函数。

{% highlight C++ %}

void setup()
{

}

void myFunction()
{
    //do something
}

void loop()
{
    myFunction();
}

{% endhighlight %}

<a name="prob_hanging"></a>

### 我的解决方案在初始化时无限期挂起

存在可能导致 C++ 解决方案在初始化时无限期挂起（死锁）的已知问题。如果你发现你的解决方案看起来永久挂起，并且你无法使用调试器“闯入”Arduino 接线应用程序的 setup\(\) 或 loop\(\) 部分中的任何声明，则可能遇到此类型的问题。

**原因**： 在解决方案完成初始化前创建了某个对象或调用了某个函数，从而导致异步操作。这可能由对象的构造函数调用 `pinMode` 等 API 函数所导致。

**解决方案**： 将任何对象构造函数和函数调用从代码的初始化部分中移开，并移到 `setup()` 块中。

**示例 1**：

在解决方案本身完成初始化前，此草图的执行会调用称为 `setPinModes()` 的函数。解决方案将显示为执行，但会无限期挂起。

{% highlight C++ %}

bool setPinModes();

int pin = GPIO_5;
bool initialized = setPinModes();

void setup()
{

}

void loop()
{
	if( initialized )
	{
		//do something
	}
}

bool setPinModes()
{
	if( pin < 0 ) return false;
	pinMode( pin, OUTPUT );
	return true;
}

{% endhighlight %}

解决方案如下，我们仅仅将 `setPinModes()` 的执行移到 `setup()` 函数：

{% highlight C++ %}

bool setPinModes();

int pin = GPIO_5;
bool initialized;

void setup()
{
	initialized = setPinModes();
}

void loop()
{
	if( initialized )
	{
		//do something
	}
}

bool setPinModes()
{
	if( pin < 0 ) return false;
	pinMode( pin, OUTPUT );
	return true;
}

{% endhighlight %}

**示例 2**：

在调用 `setup()` 前，此草图的执行会在堆栈上创建一个对象。由于对象在其构造函数中调用 `pinMode`，这还会导致死锁。这不是常见问题，但可能在来自某些库（如 Arduino `LiquidCrystal` 库）的对象上发生。

{% highlight C++ %}

class MyObject
{
public:
    MyObject()
    {
        pinMode( GPIO_5, OUTPUT );
    }

    void doSomething()
    {
        //... 
    }
};

MyObject myObject;

void setup()
{

}

void loop()
{
    myObject.doSomething();
}

{% endhighlight %}

解决方案如下。我们已将对象更改为对象指针，并将对象的初始化移动到 `setup()`。

{% highlight C++ %}

class MyObject
{
public:
    MyObject()
    {
        pinMode( GPIO_5, OUTPUT );
    }

    void doSomething()
    {
        //... 
    }
};

MyObject *myObject;

void setup()
{
    myObject = new MyObject();
}

void loop()
{
    myObject->doSomething();
}

{% endhighlight %}
