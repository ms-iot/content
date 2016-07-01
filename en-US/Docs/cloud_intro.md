---
layout: docs
title: Cloud Programming for IoT Core - an Introduction
description: Describes why connect to the cloud and the purpose of different applicable Azure services
keyword: Cloud, Azure
permalink: cloud-intro.md - /en-US/Docs/cloud-intro.htm
lang: en-US
---

# Cloud Programming for IoT Core - an Introduction

The Internet of Things is built on cloud computing. The ability to communicate
with the cloud and derive insight from the data is an essential part of any IoT
project.

## Messaging

Usually, IoT devices communicate with the cloud or each other by sending and
receiving messages. The payload of a message sent from the device to cloud can 
be as small as a value from a sensor and as big as a video file. A cloud to
device message is typically a command instructing the device to perform an action.


Message-passing communication patterns vary in complexity ranging from simple 
one-way messaging to more complex protocols such as request-response or 
transactional protocols such as the two-phase commit.

## Security

For each message, we must ensure that it comes from (or is received by) a
trusted device, and is not tampered with. Often, the data can contain
information that must be encrypted.

Security is an essential part of the IoT and must be designed into the system up
front.

## Azure IoT Hub

[Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/) is an
Azure cloud service that offers reliable and secure device-to-cloud
and cloud-to-device messaging that scales to millions of devices. It offers a
streamlined programming model that lets you get started with minimum effort and
scale up your solution as its needs grow.

## Universal Windows Platform

UWP (Universal Windows Platform) is an evolution of Windows application model
introduced in Windows 8. UWP provides a common app platform available on every
device that runs Windows 10, including the IoT Core.

Microsoft offers a set of libraries and tools that allow you to build your
connected UWP IoT applications that connect to Azure IoT Hub.

Continue to read about connecting your IoT Core device to Azure IoT Hub
[here](connect_device_to_cloud.htm) and [here](connect_app_to_cloud.htm).
