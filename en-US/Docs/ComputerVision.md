---
layout: docs
title: Computer Vision
description: Lern about the Computer Vision solutions IoT Core supports and how to implement them in your projects.
keyword: computer vision, opencv, cognitive services, windows hello, realsense, windows runtime, windows iot, uwp
permalink: /en-US/Docs/ComputerVision.htm
lang: en-US
---

# Computer Vision

Humans perceive our three-dimensional world with relative ease. Starting from an early age, our brains can gather valuable insights including feature identification, obstacle avoidance, coordination, depth perception, and many others from visual stimuli. Computer vision is an attempt to use processors and cameras to do the same thing. It has countless applications for today's devices. A drone can use it to rapidly detect and avoid obstacles during flight; a factory can use it to detect cosmetic defects in the smallest components on the assembly line; and a person can use it to detect his or her heart rate without use of a monitor or doctor's equipment. Our data-focused world has made computer vision an incredibly active research area. Companies are utilizing it in ways considered improbable even ten years ago. As computers, cameras, and data becomes more ingrained in our society, tools to leverage computer vision's most exciting capabilites should be made as easy to access and use as possible. Windows 10 IoT Core attempts to satisfy this need through compatability with two offerings: Microsoft Cognitive Services and OpenCV.

## Services
___

### Cognitive Services

#### Overview
Cognitive Services, originally a Microsoft Research project called Project Oxford, is a collection of APIs which perform high-level "cognitive tasks". These APIs pull insights from your data based on highly-trained machine learning models from years of exploration and development at Microsoft Research.

Cognitive Services is comprised of 5 categories: Vision, Speech, Languages, Knowledge, and Search.

You can find more information about Cognitive Services on the Cognitive Services [website](https://www.microsoft.com/cognitive-services).

The Vision category, the most valuable category for computer vision applications, contains four APIs: Computer Vision, Emotion, Face, and Video. These APIs provide the following functionality:
- Facial recognition
- Motion detection
- Emotion recognition
- Video stabilization
- Image content analysis

Cognitive Services is great for working with large amount of data, accessing Microsoft Azure, and greatly reducing you application's time-to-market, as the Vision APIs often prove to be time-consuming to develop independently. The model used for these APIs is well-trained and extensive thanks to the efforts of Microsoft Research. On the other hand, its cloud connectivity requirement reduces system performance and creates the requirement for an internet connection.

#### Pricing
Each API subscription comes with a set of free transactions every month (300 to 30,00, depending on the API). After exceeding this initial amount, the services come with a reasonable price. For example, the Emotion API provides the first 30,000 transactions for free and requires $0.10 or $0.25 every 1000 transaction after that depending on the subscription type.

More details about Cognitive Services pricing is found on their [website](https://www.microsoft.com/cognitive-services/en-us/pricing).

#### Get Started
To employ Cognitive Services, users must sign up at the Congitive Services website to receive API keys. After providing an API key to Cognitive Services, users can call the APIs within the limitations mentioned in the "Pricing" section.

Documentation for each API can be found on the Cognitive Services [website](https://www.microsoft.com/cognitive-services/en-us/documentation).

All Cognitive Services APIs can be implemented on any hardware platform using C# or Python.

Want to run Cognitive Services on your IoT Device? Visit our [tutorial]({{site.baseurl}}/{{page.lang}}/Samples/CognitiveServices) to get started.

### OpenCV

OpenCV is an open source computer vision and machine learning software library designed for computational efficiency and real-time applications. It is widely popular among developers and in industry due to its unprecedented efficiency, versatile tools, support for a wide range of platforms, and vibrant online community of developers. It is by far the most popular open source computer vision tool. OpenCV libraries are available for C/C++ Python, Java, and C#.

The OpenCV [website](http://opencv.org/) provides additional details.

OpenCV features:
- Local image and video processing and analysis
- Real time object identification, matching, and tracking
- Real time facial recognition
- Distance determination from image and real-time
- 3D mapping/modeling/reconstruction
- Image editing (such as composition and color change)

OpenCV provides a number of advantages. It is very efficient for local data processing because of the optimized C/C++ internals and its access to the GPU using OpenCL (if enabled). It contains most, if not all, computer vision functionality currently available. Its longevity and utility has formed an extensive and experienced online community which can help new users with application or library issues. On the other hand, there is a steep learning curve due to the complex code and library setup as well as inconsistencies in tutorials and sample code.

Currently, OpenCV with IoT Core only works if users build the library from source, which can be time-consuming. Because of this, we are actively working to make OpenCV easier to set up on IoT Core by creating a collection of NuGet packages for it. A NuGet package, which Cognitive Services uses, allows developers to import a prebuilt library into their application, providing full functionality with a few clicks. The application using the NuGet package will continue to receive library updates from a dedicated server; the user does not need to rebuild new source code when there are public changes to the open source software. The package also relieves storage space on devices only using parts of the library.

This is currently a work in progress, so keep checking WindowsOnDevices.com for updates!

In the meantime, to build the library from source for ARM, visit the [GitHub repository](https://github.com/Microsoft/opencv/tree/vs2015-samples-ARM).

Want to run OpenCV on your IoT Core device? Visit our [tutorial]({{site.baseurl}}/{{page.lang}}/Samples/OpenCV) to get started.

## Comparing OpenCV and Cognitive Services

<table class="table table-striped maker-kit">
    <tr></tr>
    <tr>
      <th style="width:33%"></th>
      <th style="width:33%">
        <h2>Microsoft Cognitive Services</h2>
      </th>
      <th style="width:33%">
        <h2>OpenCV</h2>
      </th>
    </tr>
    <tr>
      <td>Easy to use on Windows</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Architecture Support</td>
      <td colspan="2">ARM, x86, x64</td>
    </tr>
    <tr>
      <td>Facial Recognition and Tracking</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr>
      <td>Emotion Recognition</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr>
      <td>3D Reconstruction and Mapping</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Content Detection</td>
      <td>Detects general features rather than specific objects</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Video Stabilization</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr>
      <td>Motion Detection</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr>
      <td>Community</td>
      <td>Cognitive Services has many users but is still relatively new</td>
      <td>OpenCV is a very popular Open Source project; thousands of people have contributed to it and maintain it</td>
    </tr>
    <tr>
      <td>Documentation</td>
      <td>Cognitive Services has overall clear and extensive documentation written by one group</td>
      <td>There are many samples available online, but each sample is written by a different person and as a result can be inconsistent at times</td>
    </tr>
    <tr>
      <td>Free</td>
      <td>Yes, to a point (more details <a href="https://www.microsoft.com/cognitive-services/en-us/pricing">here</a>)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Performance</td>
      <td>All operations and API calls require accessing data in the cloud, which slows down calculations</td>
      <td>All algorithms are optimized and local, and using C++ rather than Python increases speeds even further</td>
    </tr>
    <tr>
      <td>Supported Cameras / Hardware</td>
      <td colspan="2">Any USB or embedded camera</td>
    </tr>
    <tr>
      <td>Supported Languages / Frameworks</td>
      <td>C#, Python, UWP</td>
      <td>C/C++, Python, Java, C#, UWP</td>
    </tr>
    <tr>
      <td>Startup Time</td>
      <td>Users can use code samples along with intuitive APIs directly from the documentation</td>
      <td>OpenCV's power and flexibility means it also requires plenty of configuration and code to perform complex operations</td>
    </tr>
    <tr>
      <td>
        Links
      </td>
      <td>
        <p><a href="{{site.baseurl}}/{{page.lang}}/Samples/CognitiveServices">Sample Program</a></p>
        <p><a href="https://www.microsoft.com/cognitive-services">Cognitive Services Website</a></p>
      </td>
      <td>
        <p><a href="{{site.baseurl}}/{{page.lang}}/Samples/OpenCV">Sample Program</a></p>
        <p><a href="http://opencv.org/">OpenCV Website</a></p>
      </td>
    </tr>
</table>
