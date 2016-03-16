---
layout: default
title: AllJoyn.JS
permalink: /zh-cn/win10/samples/AllJoynJS.htm
lang: zh-cn
---

##AllJoyn.JS

{% include VerifiedVersion.md %}

Allseen 联盟的 AllJoyn.JS 提供了在 JavaScript 中开发 AllJoyn 应用程序的简单且灵活的方法。AllJoyn.JS 是 AllJoyn 精简核心库 \(ajtcl\) 和带有 Duktape 的基本服务之间的深度集成，Duktape 是专为占用较小的嵌入式微控制器设计的与 ECMAScript 5.0 兼容的编译器和运行时。

AllJoyn.JS 运行时环境包含 ScriptConsole 服务，该服务提供对安装新脚本和与正在运行的 JavaScript 应用程序交互的支持。ScriptConsole 服务是一项 AllJoyn 服务，和任何其他 AllJoyn 服务一样，可以从运行相应客户端应用程序的其他设备通过网络访问它。

此教程介绍如何获取作为 Windows 10 应用程序运行的 AllJoyn.JS。

##先决条件

1. 安装 [AllJoyn 的 IoT 资源管理器]({{site.baseurl}}/zh-cn/win10/AllJoyn.htm#AllJoynExplorer){:target="_blank"}应用。

##设置步骤

1. 在 Windows 10 桌面版上安装先决条件中列出的所需工具（请参阅其各自的文档以确定如何操作）。

2. 设置 Raspberry Pi2（如果你面向该设备）。请参阅此处的[说明]({{site.baseurl}}/zh-cn/win10/SetupRPI.htm){:target="_blank"}。

3. 部署 AllJoyn.JS

>请注意，在 Windows 10 中，当计算机具有__需要在相同计算机上进行交互__的__多个 AllJoyn 现代应用程序__时，用户必须为这些现代应用程序__添加环回免除__。因此，如果在相同计算机上同时运行 ZigBee 适配器和 AllJoyn 的 IoT 资源管理器，将需要为这 2 个应用程序添加环回免除。从 Visual Studio 2015 中运行的应用程序不需要它。请注意，当从 Visual Studio 2015 部署应用程序时，环回免除面向已安装应用程序的生命周期。这意味着之后你可以直接（而不是从 Visual Studio 2015）启动该应用，并且它将具有环回免除。

设置环回异常：

1. 查找你希望启用环回免除的现代应用程序的安装文件夹。它位于“C:\\Users\\**username**\\AppData\\Local\\Packages”![LoopBackException]({{site.baseurl}}/Resources/images/AllJoyn/AllJoynJS_LoopBackException.png) 上

2. 复制安装文件夹名称，该名称也是应用程序 ID。

3. 在提升的命令提示符处运行以下命令：`CheckNetIsolation LoopbackExempt -a -n=installation-folder-name`

4. 重新启动应用程序。

##将 AllJoyn.JS 部署到 Windows 10 设备

1. 在[此处](https://github.com/ms-iot/samples/archive/develop.zip)下载包含我们所有示例的 zip。此外，你可以直接从 Allseen 联盟下载，方法是克隆 AllJoyn [DSB 存储库](https://git.allseenalliance.org/cgit/dsb.git){:target="_blank"} `git clone https://git.allseenalliance.org/gerrit/dsb.git`


2. 在你放置示例的文件夹中，转到文件夹 `samples-develop\AllJoyn\Samples\AllJoyn.JS\External` 并运行 **clone.cmd**。这将从 Allseen 联盟的 git 存储库中克隆其他依赖库。

3. 在[此处](http://www.duktape.org/duktape-1.2.1.tar.xz){:target="_blank"}下载 Duktape 并将其解压缩到 `samples-develop\AllJoyn\Samples\AllJoyn.JS\External`。将解压缩的文件夹从 `duktape-1.2.1` 重命名为 `duktape`

4. 最终文件夹结构外观应如下所示：![FolderStructure]({{site.baseurl}}/Resources/images/AllJoyn/AllJoynJS_FolderStructure.png)

5. 在 Visual Studio 中打开 `samples-develop\AllJoyn\Samples\AllJoyn.JS\AllJoyn.JS.sln`。

6. 在 Visual Studio 中选择相关目标（x86、x64 或 ARM）并生成解决方案。

你现在已准备好启动它，因此如果所面向的 Windows 10 设备具有屏幕，请在桌面上启动或调试 HeadedAdapterApp 项目；如果没有，则启动或调试 HeadlessAdapterApp。如果需要，请参阅[此处]({{site.baseurl}}/zh-cn/win10/AppDeployment.htm){:target="_blank"}的说明以了解远程调试。

##部署脚本文件

ScripeConsole 服务可用于部署/安装新脚本。AllJoyn.JS 源树 \(dsb\\Samples\\AllJoyn.JS\\External\\allseen\\core\\alljoyn-js\\console\) 中包含一个命令行控制台客户端。可以在[此处](https://build.allseenalliance.org/ci/job/alljoyn_js-console-win/){:target="_blank"}找到预生成的控制台应用程序。

回显输入的示例脚本 **echo.js**：`function Echo(val)
 {
    print(val + " " + val);
 }`

运行控制台应用程序来部署 echo.js：

> C:\\bin\>ajs\_console.exe echo.js Found script console service: :GdpFgXrQ.86 Joined session: 1920857932 Installing script echo.js Installing script of length 52 Eval result=0: Script installed Echo\("Hello"\); Eval compile success PRINT: Hello Hello Eval result=0: undefined

##通用 I/O 引脚

AllJoyn.JS 为 GPIO 和其他 I/O 外设提供独立于硬件的抽象层

- 引脚标记为从 pin\[0\] 到 pin\[N\]
- 为设备上所有引脚枚举信息 `for (var i = 0; i < IO.pin.length; ++i) { print(IO.pin[i].info.description, “ “, IO.pin[i].functions)); };`

- I/O 模块当前具有以下用于配置引脚的函数：*digitalIn\(\)、digitalOut\(\)*

- 当引脚配置为数字输入引脚时，应用程序必须指定该引脚是 pullUp、pullDown 还是 openDrain。`var button = IO.digitalIn(IO.pin[2], IO.pullUp)`

- 可在数字输入引脚上设置触发器函数。触发器函数可配置为在引脚状态发生更改时进行调用。`button.setTrigger(IO.risingEdge, function(){print(“button up”)})`

- 数字输入和输出引脚具有可设置和读取的级别属性。可为数字输出引脚提供可选的初始值。`var led = IO.digitalOut(IO.pin[2], 1);
 led.level = 0;
 led.level = 1;`

- 对于所有 GPIO API，请参考 [AllJoyn.JS IO API（Allseen 联盟）](https://git.allseenalliance.org/cgit/core/alljoyn-js.git/plain/doc/html/IO.html){:target="_blank"}

> 即使 GPIO 层独立于硬件，引脚编号和分配也会因硬件设备而不同。当前引脚编号和分配基于 [Raspberry Pi 2]({{site.baseurl}}/Resources/images/PinMappings/RP2_Pinout.png)。

##示例脚本

文件夹 `samples-develop\AllJoyn\Samples\AllJoyn.JS\External\allseen\core\alljoyn-js\js` 下的 AllJoyn.JS 源中包含许多 JavaScript 示例。

##其他资源

- [AllJoyn.js 入门（Allseen 联盟）](https://allseenalliance.org/framework/documentation/develop/building/alljoyn-js){:target="_blank"}。
- [使用 AllJoyn.js 为 IoT 应用程序编程（Allseen 联盟）](https://wiki.allseenalliance.org/_media/training/programming_alljoyn.js.pdf){:target="_blank"}。
- [AllJoyn.JS API（Allseen 联盟）](https://git.allseenalliance.org/cgit/core/alljoyn-js.git/plain/doc/html/){:target="_blank"}。