---
layout: default
title: 初次使用 Visual Studio
permalink: /zh-cn/VisualStudio.htm
lang: zh-cn
---

#使用 \#pragmas
#pragmas 是帮助告诉编译器在编译程序时完成操作的方法。
你可以在[此处](http://www.programmershare.com/2784880/){:target="_blank"}了解有关 \#pragmas 的详细信息。

##在 Visual Studio 中使用 \#pragmas
在 Visual Studio 中，我们使用 [\#pragma once](http://en.wikipedia.org/wiki/Pragma_once){:target="_blank"}。此 \#pragma 的目的在于允许文件仅包含并编译一次。

尽管在 C、C++ 和 Wiring 中不标准，但经常可以看到人们使用此 \#pragma 而非标准的 \#ifndef/\#ifdef/\#endif 方法。如果 \#pragma 一旦遇到标准方法，使用 \#pragma 可让 Visual Studio 编译器有效地打开/读取/关闭文件。这可以提升程序/草图的编译时间。

#预编译的标头
虽然预编译的标头对 Wiring 和草图是新概念，但它经常用于 [C 和 C++ 开发](http://en.wikipedia.org/wiki/Precompiled_header){:target="_blank"}。它们使编译比使用 \#pragmas 更有效。

默认 Wiring 模板会在用于管理预编译标头的项目中创建一些文件（stdafx.h 和 stdafx.cpp）。你可以在[此处](http://msdn.microsoft.com/zh-cn/library/h552b3ca.aspx){:target="_blank"}查找关于这些文件的详细信息。请注意，预编译的标头在我们的默认项目中已禁用，从而确保源与 Arduino Wiring 兼容。
