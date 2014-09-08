---
layout: code
title: FAQ
permalink: /WelcomeAndFAQ.htm
---

### *Dear Community,*


We're surrounded by all kinds of smart devices.  Cars and parking meters and microwaves and watches.  But for years, it's been difficult to get started making your own devices.  On your desk, in your home, in your garage.

In the last few years, we've seen an explosion in accessible, DIY hardware and software.  A lot of this has come about because of the great work done by the Arduino folks.  Their approach makes it easy and cost effective for anyone to get started.  With pluggable hardware modules, code that is easy to write and understand, and a community focused on sharing, it’s easy to play and learn.  And in no time, you’ve created your own cool device.

We love the idea of making hardware and software more accessible to everyone.  The other thing that's important to us is that these devices don't live in isolation, but as part of a connected cloud of devices and services.

So when we looked at the device maker space, we wondered how we could start to participate and contribute.  We’ve got a bunch of ideas, but this program offers the first place where we think we can make a difference.  We think there’s a set of makers who want web connectivity and processing power alongside straightforward hardware building.

As a first step, we’ve crafted a device development experience where you run a small version of Windows directly on your device.  This means you can write apps using Arduino Wiring APIs right alongside regular Windows code.  This runs on a device (in this case, an Intel Galileo) that has Arduino-compatible pinouts right alongside a gutsy little CPU.

So, if you're a hardware developer who dabbles in software, you can bring your Arduino sketches and shields directly into your project, while leveraging Windows code for cloud connectivity and other computing-intensive tasks.

And if you're already a software dev, you can write a regular Windows application that also has easy, direct access to hardware through the Arduino Wiring API set, extending your solution into the physical world.

Of course, this first program is just the beginning.  After all, we’re a devices *and* services company.  

We’re glad you’re onboard for the ride,  and *we can’t wait to see what you’ll make.*


### The Microsoft IoT Team
  
  
  

---------------------------------------------------------------

## **Q&A**


**Q:** How does this relate to what I saw at Build/Solid?  
**A:** At Build 2014, both in the day 1 keynote and in the Internet of Things (IoT) session, we demonstrated a version of Windows running on the Intel Galileo board. We also opened up the sign-up page for the developer kit and developer preview program.
 
This program is the fulfillment of our promise from Build 2014 to deliver developer kits, to many of the early adopters who signed up at [WindowsOnDevices.com](http://windowsondevices.com).  At the same time, we've updated that site with a proper dev center, including documentation and examples.  We've also announced the Github repo with an SDK allowing Wiring APIs to be used on . Collectively, this is the "Windows Developer Program for IoT".
 
**Q:** What is the official name of the program?  
**A:** the Windows Developer Program for IoT
 
**Q:** What is the official name of the Windows build for these devices?  
**A:**  For now, it’s just Windows.  It doesn’t have a specific fancy product name yet.
 
**Q:**  Microsoft is a “devices and services” company.  Where’s the services?  
**A:**  We’re serious about enabling you to make connected devices.  Microsoft has a bunch of great services that you can already integrate with your device (have you seen the Azure Data Marketplace)?.  We have samples showing how you can communicate remotely with your device using firmata and node.js (LINK).  And you can connect and mashup your device with the whole broader internet of services (if you’re looking for a list, [Programmable Web](http://www.programmableweb.com/apis/directory) is a good start).

All that said, we’re also hard at work on some new Microsoft services that we think will delight folks in the IoT space.  For a good primer, check out the work being done on our [Intelligent Systems Service (ISS)](http://www.microsoft.com/windowsembedded/en-us/intelligent-systems-service.aspx).


###Software Questions:

**Q:** What APIs are supported in this release?  
**A:** In this initial preview release, we're supporting the standard Arduino Wiring API set, and a subset of Win32.
 
**Q:**  What is Wiring?  
**A:**  Wiring is a set of APIs used for directly interacting with hardware ports.  It is implemented on a number of platforms, but it is most commonly known as the language used for developing Arduino projects and sketches.  For more information, go to [Wiring.org](http://wiring.org.co/reference/).

**Q:** What is the status of the Arduino/Wiring API implementation?  
**A:** Our goal is to make it possible to take Arduino sketches and run them unchanged (or with very minimal changes) on the Galileo. Through our open source approach to development, the community will be able to participate to contribute code to help fill gaps and add functionality.
 
**Q:** Will you support C#/WinRT/.NET/Node/JS… ?  
**A:** For this first preview release, we're focusing on C++ and Arduino compatibility. In future iterations, our intent is to support the Universal App model announced at Build.

**Q:** What UI stacks do you support?  
**A:** For this release, we’ve targeted Galileo, which is a headless device, without any built-in support for standard displays. For that reason, we do not include any UI stack in the device, beyond the command line interface (via Telnet). However, being a dev kit, you can do all kinds of  projects communicating which wire in small display devices such as, ePaper, liquid crystal, etc.

**Q:** What does the canonical Arduino "blink an LED" sketch look like when running Windows and the Windows Developer Program for IoT SDK?  
**A:** The only difference between the typical Arduino sketch and our code is the template-provided _tmain function that kicks everything off. Here's a simple example.
 
    int _tmain(int argc, _TCHAR* argv[])
    {
        return RunArduinoSketch();
    }
     
    int pin = 13;
     
    void setup()
    {
        pinMode(pin, OUTPUT);
    }
     
    void loop()
    {
        digitalWrite(pin, LOW);
        delay(1000);
        digitalWrite(pin, HIGH);
        delay(1000);
    }
 
Developers can add additional code to output debug messages to Visual Studio or the console should they desire. Please see the official samples for more examples.

 
###Questions about the Dev Kit Hardware
 
**Q:**  What is Galileo?  
**A:**  For this release, we’ve targeted the Intel Galileo hardware development board.  The Intel Galileo v1 is a hardware development board that contains a Quark CPU and a number of hardware device interfaces, including I2C, UART, SPI, GPIO, USB, and PCI-E.  The pin arrangement on the Galileo complies with the Arduino hardware spec, meaning the Galileo itself qualifies as an “Arduino board”.  This version of Galileo is “headless”, meaning it has no on-board video outputs.  For a more complete and technically thorough definition, please see Intel’s documentation:
https://communities.intel.com/community/makers/documentation/galileodocuments 


**Q:** What is Quark? Where can I learn more?  
**A:** The Intel Quark system on chip (SOC -- pronounced "Sock") is essentially a complete PC on a 5mm integrated circuit.  It is intended for small, low power installations.  It includes an instruction set which is similar to Pentium 586. Like the original Pentium, it is lacking vector instruction sets such as SSE and MMX. For a more complete and more technically thorough definition, please see Intel’s documentation:

[Quark Product Page](http://www.intel.com/content/www/us/en/processors/quark/intel-quark-technologies.html)  
[Intel ARK](http://ark.intel.com/products/79084/Intel-Quark-SoC-X1000-16K-Cache-400-MHz)
 
**Q:** How is this different from other Arduino hardware dev kits?  
**A:**  We’re targeting a set of scenarios for connected devices, where you have the accessibility of an Arduino solution alongside a CPU for doing local intelligence and communicating with Web Services. 

The board we’re using for this release, the Intel Galileo, is an Arduino-certified development kit.  Where it differs from most Arduino boards is that it is powered by a CPU/SOC, instead of a microcontroller.  The presence of a CPU enables a more PC-like kit, with a full OS, built-in Ethernet, USB, and PCI-E on board.  Many Arduino boards require shields and gateway devices to connect to the internet.  This Galileo board allows building small, low power devices that still have first-class, direct cloud connectivity, without needing any additional hardware.

 
**Q:** Is this a 5v or 3v3 standard board? This is often a blocker when it comes to shield compatibility.  
**A:** The Intel Galileo includes a jumper to enable using either 5v or 3v3 as the standard IO signal reference, giving you the best of both worlds.
 
**Q:** How is the Intel Galileo board powered?  
**A:** The Galileo uses a simple 5v barrel-style power adapter
 


###Dev kit / Preview Access
 
**Q:** Is the Windows Developer Program for IoT still open? Can I get in?  
**A:** We've been overwhelmed by the public response and we’ve already received more requests for kits than we have inventory for this first round.  You can still signup at [WindowsOnDevices.com](http://www.windowsondevices.com/signup.aspx) to join the program and continue to learn more about the program as it continues. 
 
**Q:** I didn't sign up for the Windows Developer Program for IoT. Can I get a board?  
**A:** Initially, we're focusing on ensuring a great experience for the earliest customers who registered for our program. We're going to continue to expand to best serve the community of interested developers in the future.
 
**Q:** Will everyone who signed up for the Windows Developer Program for IoT get a Galileo board?  
**A:** Response to the program was fantastic. The only downside is that we received more requests than we have hardware to distribute. Unfortunately, that means that not everyone who signed up will receive a development kit and Galileo board.
 
**Q:** I didn't sign up for the developer preview. Can I buy an Intel Galileo and install Windows?  
**A:** Yes you can! Please see [bought or updating your Intel Galileo](http://ms-iot.github.io/content/IBoughtAGalileo.htm)
 
**Q:** Where can I go to find out more information about IoT at Microsoft?  
**A:** There are several sites and resources which are of interest:

[WindowsOnDevices.com](http://www.WindowsOnDevices.com)  
[Build 2014 IoT session](http://channel9.msdn.com/Events/Build/2014/2-511)  
[Windows Embedded site](http://microsoft.com/windowsembedded)  
[IoT blog](http://blogs.msdn.com/b/windows-embedded/)


###Lifecycle and Other Products
 
**Q:** Does this mean NETMF and products like Netduino are dead?  
**A:** No.  This program is just one in a group of releases being coordinated by the IoT team, including our Intelligent Systems Service (ISS), Windows Embedded products and a recommitment to NETMF.

During Steve T's IoT session at Build 2014, we announced that we're increasing our commitment to our Apache-licensed open source NETMF offering including updating tooling, increasing performance, and adding new language features. No date has been yet released for those updates.
 
**Q:** Does this mean Windows Embedded Compact (Windows CE) is dead?  
**A:** Nope! Windows Embedded Compact remains an important part of our broad IoT offering. It remains Microsoft's only real-time operating system and is the operating system with the broadest set of ports including numerous levels of ARM and x86 architectures. At Build 2014, we announced updated tooling and increase WiFi stack performance for Windows Embedded Compact 2013. We're committed to continue serving our customers in this space.
 
**Q:** Can I put the Intel Galileo (with Windows) into a commercial product and sell it?  
**A:** This is a developer preview at this point. We do not recommend or support putting the bits into any product or using this version of Windows for commercial use at this time. Please refer to the specific language in the EULA for details.
 
**Q:** Is Microsoft committed to supporting Galileo?  
**A:**  We think Galileo is a great example of development hardware for connected devices.  This release does not represent any long-term commitment of Galileo or Quark support.

**Q:** What is the end-user cost for this version of Windows?  
**A:** There is no cost for this version of Windows.
 
**Q:** Where is the EULA for this version of Windows ?  
**A:** The EULA is located here: [http://www.windowsondevices.com/eula.aspx](http://www.windowsondevices.com/eula.aspx)
  
**Q:** What is the cost for tools?  
**A:** You can use the freely-available Visual Studio Express for Windows to develop software for your projects. The end result is that the developer cost, for operating system and tools, is $0.
 
###Product team questions
 
**Q:** What is the IoT team? What is its relationship to Windows Embedded?  
**A:** Microsoft has long been involved in the IoT space through products like Windows Embedded and the .NET Micro Framework (NETMF). In recognition of the uniqueness and importance of this space, the IoT team was formed as part of the reorganization which happened last year. The IoT team brings together the Windows Embedded team along with teams building services and SDKs to help tie everything together.
 
**Q:** What bits are open source?  
**A:** The SDKs (Arduino headers, Arduino implementation, and porting functions), documentation, sample projects, and shield/library ports for Windows on the Galileo are open source, hosted on [Github](https://github.com/ms-iot)

**Q:** Are you accepting/encouraging OSS contributions?  
**A:** Yes! Please see our [Github Contribute page](http://ms-iot.github.io/content/Contribute.htm) for more information.
 
**Q:** What about Raspberry Pi?  
**A:**  We admire the work done by the Raspberry Pi team and we think they have a great model for development hardware.


###My question isn't answered. Who should I talk to?

For community resources, visit [WindowsOnDevices.com#Community](http://windowsondevices.com#Community)

Twitter:

* [Pete Brown](https://twitter.com/Pete_Brown)
* [Dan Rosenstein](https://twitter.com/IoTDan)
* Our hashtag #winbuilders

