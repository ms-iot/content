---
layout: default
title: GpioTestTool
permalink: /zh-cn/win10/samples/GpioTestTool.htm
lang: zh-cn
---

## GpioTestTool 示例

{% include VerifiedVersion.md %}

[在 Github 上查看代码](https://github.com/ms-iot/samples/blob/develop/GpioTestTool/main.cpp)

GpioTestTool 是一个简单的实用工具，它允许你在命令行上写入和读取 GPIO 引脚。GpioTestTool 采用标准 C++ 进行编写，并在 [Windows 运行时库 \(WRL\)](https://msdn.microsoft.com/zh-cn/library/hh438466.aspx) 的帮助下使用 ABI 级的 Windows.Devices.Gpio WinRT API。这些技术可用于使用本机应用程序中的大多数 WinRT API。

### 用法

    gpiotesttool.exe PinNumber
    
      PinNumber     The pin number with which you wish to interact. This
                    parameter is required.

    Commands:
     > write 0|1                        Write pin low (0) or high (1)
     > toggle                           Toggle the pin from its current state
     > read                             Read pin
     > setdrivemode drive_mode          Set the pins's drive mode
         where drive_mode = input|output|
                            inputPullUp|inputPullDown|
                            outputOpenDrain|outputOpenDrainPullDown|
                            outputOpenSource|outputOpenSourcePullUp
     > info                             Dump information about the pin
     > help                             Display this help message
     > quit                             Quit

示例会话：

    gpiotesttool.exe 47
      Type 'help' for a list of commands
    > info
            Pin Number: 47
          Sharing Mode: Exclusive
      Debounce Timeout: 0
            Drive Mode: input
    > read
    High
    > setdrivemode output
    > write 0
    > write 1
    > t
    > t
    > q

### 生成和运行示例

1. 将[示例](https://github.com/ms-iot/samples)存储库克隆到本地计算机。 
1. 在 Visual Studio 中打开 `GpioTestTool\GpioTestTool.sln`。
1. 选择目标体系结构。
   - 为 Raspberry Pi 或 DragonBoard 410c 选择 `ARM`
   - 为 MinnowBoardMax 选择 `x86`
1. 转到 `Build -> Build Solution`
1. 将 GpioTestTool.exe 从生成输出文件夹复制到你的设备。
1. （当然，需使用相应的命令行参数）通过 SSH 复制到你的设备并运行 `GpioTestTool.exe`。

### 代码

函数 MakePin\(\) 将获取引脚编号并返回一个 IGpioPin 实例。它将处理创建 IGpioPin 实例所需的 WinRT 样板文字。

    ComPtr<IGpioPin> MakePin (int PinNumber)
    {
        ComPtr<IGpioPin> pin;

第一步是激活 IGpioControllerStatics 的实例，这是用于实现 GpioController 运行时类的静态函数的接口。可以使用名为 [GetActivationFactory\(\)](https://msdn.microsoft.com/zh-cn/library/br244854.aspx) 的 Windows 函数获取运行时类的静态函数：

         // get the activation factory
        ComPtr<IGpioControllerStatics> controllerStatics;
        HRESULT hr = GetActivationFactory(
            HStringReference(RuntimeClass_Windows_Devices_Gpio_GpioController).Get(),
            &controllerStatics);
        if (FAILED(hr)) {
            std::wostringstream msg;
            msg << L"Failed to get activation factory for GpioController. hr = 0x" <<
                std::hex << hr;
            throw wexception(msg.str());
        }
        
如果未在系统上注册类型 Windows.Devices.Gpio.GpioController，这将失败。

现在我们已有 GpioController 的静态方法的接口，可以调用 GetDefault\(\) 来获取系统上的默认 GpioController：

        ComPtr<IGpioController> controller;
        hr = controllerStatics->GetDefault(controller.GetAddressOf());
        if (FAILED(hr)) {
            throw wexception(L"Failed to get instance of default GPIO controller");
        }

我们始终检查 GetDefault\(\) 的返回值是否为 null，因为当前系统上可能没有 GPIO 控制器。

        if (!controller) {
            throw wexception(L"GPIO is not available on this system");
        }

现在我们已有 GpioController 实例，可以调用 OpenPin\(\) 来获取引脚实例：

        hr = controller->OpenPin(PinNumber, pin.GetAddressOf());
        if (FAILED(hr)) {
            std::wostringstream msg;
            msg << L"Failed to open pin. hr = 0x" << std::hex << hr;
            throw wexception(msg.str());
        }
    
        return pin;
    }
    
有了引脚实例后，即可读取和写入引脚：

    void Blink ()
    {
        HRESULT hr;
        
        auto pin = MakePin(47);
        
        // Latch a LOW value onto the pin
        hr = pin->Write(GpioPinValue_Low);
        if (FAILED(hr)) {
            throw wexception(L"Failed to write pin");
        }
        
        // set the pin as an output
        hr = pin->SetDriveMode(GpioPinDriveMode_Output);
        if (FAILED(hr)) {
            throw wexception(L"Failed to set drive mode");
        }
        
        // blink the pin
        for (unsigned int i = 0; i < 20; ++i) {
            hr = pin->Write((i & 1) ? GpioPinValue_High : GpioPinValue_Low);
            if (FAILED(hr)) {
                throw wexception("Failed to write pin");
            }
            Sleep(100);
        }
    }
    
就这么简单！ 直接从 C++ 使用 WinRT 或许也不错。
