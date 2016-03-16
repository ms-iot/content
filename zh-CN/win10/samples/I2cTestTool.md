---
layout: default
title: I2cTestTool
permalink: /zh-cn/win10/samples/I2cTestTool.htm
lang: zh-cn
---

## I2cTestTool 示例

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/I2cTestTool/main.cpp)

I2cTestTool 是一种用于与命令行上的 I2C 设备交互的实用工具。I2cTestTool 采用 C++/CX 进行编写，演示了如何从命令行应用程序使用 WinRT 组件。生成的工具是非常有用的调试辅助工具。

### 用法

    I2cTestTool: Command line I2C testing utility
    Usage: I2cTestTool.exe [-list] SlaveAddress [FriendlyName]

      -list          List available I2C controllers and exit.
      SlaveAddress   The slave address of the device with which you
                     wish to communicate. This is a required parameter.
      FriendlyName   The friendly name of the I2C controller over
                     which you wish to communicate. This parameter is
                     optional and defaults to the first enumerated
                     I2C controller.

    Examples:
      List available I2C controllers and exit:
        I2cTestTool.exe -list

      Open connection on the first enumerated controller to slave address 0x57:
        I2cTestTool.exe 0x57

      Open connection on I2C1 to slave address 0x57:
        I2cTestTool.exe 0x57 I2C1
         
    Commands:
     > write { 00 11 22 .. FF }         Write bytes to the device
     > read N                           Read N bytes
     > writeread { 00 11 .. FF } N      Write bytes, restart, read N bytes
     > info                             Display device information
     > help                             Display this help message
     > quit                             Quit            
                      
已连接 EEPROM 的示例会话：

      i2ctesttool.exe 0x57
        Type 'help' for a list of commands
      > info
             DeviceId: \\?\ACPI#MSFT8000#1#{a11ee3c6-8421-4202-a3e7-b91ff90188e4}\I2C5
        Slave address: 0x57
            Bus Speed: StandardMode (100Khz)
      > write {0 1 2 3 4 5 6 7 8}
      > writeread {4} 4
       5 6 7 8
      > write {0}
      > read 8
       1 2 3 4 5 6 7 8
      > q

### 生成和运行示例

1. 将[示例](https://github.com/ms-iot/samples)存储库克隆到本地计算机。 
1. 在 Visual Studio 中打开 `I2cTestTool\I2cTestTool.sln`
1. 选择目标体系结构。
   - 为 Raspberry Pi 选择 `ARM`
   - 为 MinnowBoardMax 选择 `x86`
1. 转到 `Build -> Build Solution`
1. 将 `I2cTestTool.exe` 从生成输出文件夹复制到你的设备。
1. （当然，使用必需的命令行参数）通过 SSH 复制到你的设备并运行 `I2cTestTool.exe`

### 创建一个空白的 C++/CX 控制台应用程序 

我们将逐步介绍创建可使用 C++/CX 形式的 WinRT 组件的控制台应用程序的过程。

1. 转到 `File -> New Project`，然后选择 `Visual C++ -> Windows -> Windows IoT Core -> Blank Windows IoT Core Console Application` 模板。
   
   ![项目模板]({{site.baseurl}}/Resources/images/I2cTestTool/NewBlankConsoleApp.png)
   
1. 删除 pch.h、pch.cpp 和 ConsoleApplication.cpp。一般来说，预编译标头是个好主意，但为了简单起见，我们不打算在本示例中使用它们。
1. 添加具有以下内容的名为 `main.cpp` 的新文件

   {% highlight C++ %}
   main.cpp:
   
   #include <stdio.h>
    
   using namespace Platform;
   using namespace Windows::Devices::I2c;
    
   int main (Array<String^>^ args)
   {
       String^ aqs = I2cDevice::GetDeviceSelector();
       wprintf(L"AQS is %s\n", aqs->Data());
       return 0;
   }
   {% endhighlight %}
    
1. 在“解决方案资源管理器”中右键单击你的项目，然后转到 `Properties`。在“配置”下拉列表中选择 `All Configurations`，在“平台”下拉列表中选择 `All Platforms`。
1. 转到 `C/C++ -> General`，然后将 `Consume Windows Runtime Extensions` 设置为 `Yes`，将 `Additional #using Directories` 设置为 `$(VCInstallDir)vcpackages;$(WindowsSdkDir)UnionMetadata;%(AdditionalUsingDirectories)`

   ![使用 Windows 运行时扩展]({{site.baseurl}}/Resources/images/I2cTestTool/ConsumeWinRT.png)
    
1. 转到 `C/C++ -> Code Generation` 并将 `Enable Minimal Rebuild` 设置为 `No`。

   ![禁用最小重新生成]({{site.baseurl}}/Resources/images/I2cTestTool/EnableMinimalRebuild.png)

1. 转到 `C/C++ -> Precompiled Headers` 并将 `Precompiled Header` 设置为 `Not Using Precompiled Headers`

   ![预编译的标头]({{site.baseurl}}/Resources/images/I2cTestTool/PrecompiledHeaders.png)

1. 单击“确定”以退出“项目属性”对话框。
1. 生成你的解决方案 \(Ctrl + Shift + B\)。

此样板文字代码既能在 Windows 台式机上运行也能在 Windows IoT 核心版设备上运行，不过完整的示例只能在 Windows IoT 核心版上运行，因为 I2C 仅在 Windows IoT 核心版上受支持。

恭喜，你已成功创建了能够使用 WinRT 组件的命令行程序！

