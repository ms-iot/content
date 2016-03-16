---
layout: default
title: New to Visual Studio
permalink: /en-US/win8/VisualStudio.htm
lang: en-US
---

#Using #pragmas
#pragmas are a way to help inform the compiler to complete actions while your program is being compiled.
You can find out more about #pragmas [here](http://www.programmershare.com/2784880/){:target="_blank"}.

##Using #pragmas in Visual Studio
In Visual Studio we use [#pragma once](http://en.wikipedia.org/wiki/Pragma_once){:target="_blank"}.
The intent of this #pragma is to allow for a file to only be included and compiled once.

While non standard in C, C++ and Wiring, it is quite common to use this #pragma over the standard #ifndef/#ifdef/#endif approach.
Using #pragma allows the Visual Studio compiler to efficiently open/read/close the file if #pragma once is encountered over the standard approach.
This allows compile time of your program/sketch to be improved.

#Precompiled Headers
While a new concept to Wiring and Sketches, precompiled headers are common in [C and C++ development](http://en.wikipedia.org/wiki/Precompiled_header){:target="_blank"}.
They make compilation even more efficient than using #pragmas.

The default Wiring template creates a few files (stdafx.h and stdafx.cpp) in your project that are used to manage precompiled headers.
You can find more info about these files [here](http://msdn.microsoft.com/en-us/library/h552b3ca.aspx){:target="_blank"}.
Please note that precompiled headers are disabled in our default projects to ensure source compatibility with Arduino Wiring.
