---
layout: default
title: AllJoyn
permalink: /en-US/win10/AllJoyn.htm
lang: en-US
---

# AllJoyn

AllJoyn empowers the Internet of Things. AllJoyn defines a common protocol for devices and applications to discover and communicate with each other regardless of transport technology, platform or manufacturer.  AllJoyn is an open source standard driven by the [AllSeen Alliance](https://allseenalliance.org/){:target="_blank"}, a cross-industry consortium dedicated to enabling the interoperability of billions of devices, services and applications for the Internet of Things.

Microsoft joined the AllSeen Alliance in 2014 and added AllJoyn as a core component in Windows 10. With the built-in [AllJoyn APIs](https://msdn.microsoft.com/en-us/library/windows/apps/windows.devices.alljoyn.aspx){:target="_blank"}, developers are free to write AllJoyn capable applications that run on any of the Windows 10 devices including PCs, tablets, phones, Xbox as well as devices using Windows IoT Core. In addition to the platform support for AllJoyn, Microsoft released [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286){:target="_blank"}, a Visual Studio extension that accelerates AllJoyn development by combining code generation with ready-made application templates. AllJoyn Studio allows developers to benefit from the power of AllJoyn without the hassle of set-up and configuration.

Excited about AllJoyn? Have a look at [this]({{site.baseurl}}/en-US/win10/AllJoynStudio.htm){:target="_blank"} blog post on how to get started with AllJoyn on Windows.


## Developer Resources and Tools

__Device System Bridge__

AllJoyn [Device System Bridge]({{site.baseurl}}/en-US/win10/AllJoynDSB.htm){:target="_blank"} enables non-AllJoyn devices to interact with the AllJoyn ecosystem using AllJoyn as their common language.

Features:
- Creates virtual devices for each non-AllJoyn device exposed by Adapter
- Automated runtime interface generation from Adapter device
- Supports LSF, Control Panel base services, extensible to add more services
- Universal app templates (C#, C++), for Desktop UI applications and Windows IoT startup tasks
- Available as open source

More details can be found on the [Device System Bridge page]({{site.baseurl}}/en-US/win10/AllJoynDSB.htm){:target="_blank"}.


__AllJoyn Studio__

[AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286){:target="_blank"} is an extension to Visual Studio developed by Microsoft that accelerates AllJoyn® development by combining code generation and the WinRT API with automated project management and ready-made application templates. It allows developers to benefit from the power of AllJoyn without the hassle of set-up and configuration.

Features:
- Universal app templates (C#, JavaScript, C++, Visual Basic)
- Automated reference management and project configuration
- Adding/removing interfaces to/from a solution
- Easy access to project management via the AllJoyn® menu
- Loading interfaces from introspection XML file(s)
- Discovering interfaces from producer(s) on the network1

AllJoyn Studio can be installed through Visual Studio Tools -> Extensions and Updates … -> Online -> In the "Search" field type "AllJoyn"

More detail about how to use AllJoyn Studio are available [here]({{site.baseurl}}/en-US/win10/AllJoynStudio.htm){:target="_blank"}

<a name="AllJoynExplorer"></a>__IoT Explorer for AllJoyn (AllJoyn Explorer)__

The IoT Explorer for AllJoyn (previously known as AllJoyn Explorer) is a Windows Universal Application for interacting with AllJoyn devices on the local proximity network. Developers can list all available AllJoyn devices, inspect their interface and object structure, as well as receive signals, set and get properties, and call methods.

- [IoT Explorer for AllJoyn Store App](https://www.microsoft.com/store/apps/9nblggh6gpxl){:target="_blank"}: This is the official store app location.
- [AllJoyn Explorer 1.0.1.11 (previous release)](https://github.com/ms-iot/samples/releases/download/AllJoynExplorer_1.0.11/AllJoynExplorer_1.0.1.11.zip){:target="_blank"}: This zip contains the AllJoyn Explorer AppX bundle to be side-loaded on a developer machine. This is a previously released version of the IoT Explorer for AllJoyn application.
- [AllJoyn Explorer Setup Guide](https://github.com/ms-iot/samples/releases/download/AllJoynExplorer_1.0.11/AllJoyn_Explorer_Setup_Guide_v1.0.pdf){:target="_blank"}: This pdf contains the documentation for how to deploy the AllJoyn Explorer.
- [AllJoyn Explorer User Guide](https://github.com/ms-iot/samples/releases/download/AllJoynExplorer_1.0.11/AllJoyn_Explorer_User_Guide_v1.0.pdf){:target="_blank"}: This pdf contains the documentation for how to use the AllJoyn Explorer.


### Additional Resources

- [Using the AllJoyn Studio extension]({{site.baseurl}}/en-US/win10/AllJoynStudio.htm){:target="_blank"}
- [AllJoyn Producer and Authoring AllJoyn Introspection]({{site.baseurl}}/en-US/win10/AllJoynProducer.htm){:target="_blank"}
- [Troubleshooting AllJoyn with Windows 10]({{site.baseurl}}/en-US/win10/AllJoynTroubleshooting.htm){:target="_blank"}

__Videos__

- [//build 2015 AllJoyn Technical Session](https://channel9.msdn.com/Events/Build/2015/2-623){:target="_blank"}
- [WinHEC 2015 AllJoyn Technical Session](https://channel9.msdn.com/Events/WinHEC/2015/IOT200){:target="_blank"}

__Samples__

- [AllJoyn Producers](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ProducerExperiences){:target="_blank"}
- [AllJoyn Consumers](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ConsumerExperiences){:target="_blank"}
- [AllJoyn UWP Samples (MSDN)](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ConsumerExperiences){:target="_blank"}

__Reference__

- [AllJoyn APIs in Windows 10 (MSDN)](https://msdn.microsoft.com/en-us/library/windows/apps/xaml/windows.devices.alljoyn.aspx){:target="_blank"}
- [AllJoyn Architecture Details (Allseen Alliance)](https://allseenalliance.org/developers/learn/){:target="_blank"}
- [AllJoyn Developer Resources (Allseen Alliance)](https://allseenalliance.org/developers/develop/){:target="_blank"}
- [AllJoyn C API Reference Manual (Allseen Alliance)](https://allseenalliance.org/docs/api/c/index.html){:target="_blank"}

___Informational only___

- [Deprecated] [Channel 9: Building AllJoyn Apps on Windows 10 (MSDN)](https://channel9.msdn.com/Blogs/Internet-of-Things-Blog/Step-By-Step-Building-AllJoyn-Universal-Windows-Apps-for-Windows-10-Public-Preview){:target="_blank"}
- [Deprecated] [AllJoyn CodeGen Tool]({{site.baseurl}}/en-US/win10/AllJoynCodeGen.htm){:target="_blank"}
