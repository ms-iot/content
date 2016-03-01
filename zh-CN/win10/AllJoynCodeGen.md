---
layout: default
title: AllJoynCodeGen
permalink: /zh-cn/win10/AllJoynCodeGen.htm
lang: zh-cn
---

##AllJoyn CodeGen 工具

我们创建了代码生成工具 AllJoynCodeGen，该工具可使用派生自某种规范或某台设备的一个或多个 AllJoyn 接口的 XML 描述生成完整的 Windows 运行时组件。

由此工具生成的 Windows 运行时组件通过使用通用 Windows SDK 中提供的 API，可在任何受支持的语言（JS、C\#、C++/CX 等）中使用。这表示相同的组件可在具有 AllJoyn OneCore 程序包（路由器服务和 C API dll）的任何平台上使用。 然后，开发人员可使用该组件创建该接口的制造者和/或使用者。

**注意** 有关 AllJoyn C API 的更多详细信息，请在 [AllSeen Alliance](http://go.microsoft.com/fwlink/?LinkId=524584) 处下载 AllJoyn 核心 SDK 和相关文档。

###AllJoynCodeGen 是如何工作的？

基本流程如下所示：

1. 以 AllJoyn XML 编写（当前为 DBus 内省格式）、描述服务的 XML 文件会被送入代码生成器工具中。
2. AllJoynCodeGen 工具将生成结果为 Windows 运行时组件的代码。此生成的代码依赖于 Windows 10 SDK 中的 **MSAJAPI.lib** 和 [Windows.Devices.AllJoyn](https://msdn.microsoft.com/zh-cn/library/windows/apps/xaml/windows.devices.alljoyn.aspx)。
3. 开发人员可生成使用此组件的应用程序。
4. 运行时，开发人员的应用程序将加载该工具生成的 Windows 运行时组件（例如：foo.dll）以及内置 DLL **MSAJAPI.dll** 和 **Windows.Devices.AllJoyn.dll**。

以下工作流图表说明了这一过程：

![AllJoyn CodeGen 图]({{site.baseurl}}/Resources/images/AllJoyn/alljoyncodegen.png)

###从命令行运行

AllJoynCodeGen 工具当前作为随 Windows 10 SDK 提供的命令行工具的形式存在。若要运行该工具，请使用以下字符串传递有效的 XML 文件：

	AllJoynCodeGen –i Foo.xml –o c:\users\developer1\documents\Foo\

###查看输出

生成的类封装核心 C API 公开的功能。因为生成的代码是一个抽象概念，所以这不是 1 对 1 映射。下表显示了每个生成的代码类封装的核心 C++ API。以下占位符用于该表中生成的名称：

* `<Foo>` 是 XML 文件中定义的接口名称
* `<Signal>` 是信号的名称，取自 XML 文件
* `<Method>` 是方法的名称，取自 XML 文件
* `<Property>` 是属性的名称，取自 XML 文件


| Windows 运行时类 | | 描述 | 核心 C++ API |
| ------------------------ | --- | --------- | ---------- |
| `<Foo>`观察程序 | | 搜索宣传目标服务的制造者 | *BusListener* 类；*BusAttachment* 类 |
| `<Foo>`JoinSessionResult | | 报告加入会话是成功还是失败，并且在成功加入后，公开该会话的 `<Foo>Consumer` 实例。 | *JoinSessionAsyncCB* 类；*QStatus* |
| `<Foo>`制造者 | | 宣传服务并公开 AllJoyn 事件的处理程序。 | *BusObject* 类；*BusAttachment* 类；*InterfaceDescription* 类；*SessionPortListener* 类；*Message* 类 |
| `<Foo>`信号 | | 公开用于发送和接收信号的方法和处理程序。制造者和使用者两者均可使用。 | *BusObject* 类；*InterfaceDescription* 类；*Message* 类 |
| `<Foo>`使用者 | | 与发现的服务进行交互。 | *ProxyBusObject* 类；*InterfaceDescription* 类；*SessionListener* 类；*Message* 类 |
| `<Foo>``<Method>`CalledEventArgs | | 传递给 `EventAdapters.<Foo>ServiceEventAdapter` 中方法的参数。 | *Message* 类 |
| `<Foo>``<Method>`结果 | | I<Foo>Service 中的方法实现用它来报告调用是成功还是失败，以及报告任何返回值。 | *Message* 类；*QStatus* |
| `<Foo>``<Signal>`ReceivedEventArgs | | 传递给 <Foo>Signal 中信号的参数。 | *Message* 类 |


###生成指南

####创建组件

生成的代码需要包含在与 XML 共享相同接口名称的组件中。例如，如果将某个 toaster 的 XML 定义为 com.microsoft.sample.toaster，我们将创建运行时组件 com.microsoft.sample。

或者，可以随意命名组件（例如，fooCodeGenComponent），但必须手动将“项目”属性下的根命名空间更新为与接口名称相同的名称。（请注意：可在 pch.h 文件中找到根命名空间，该文件由 AllJoynCodeGen 工具生成）。
