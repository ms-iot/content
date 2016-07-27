---
layout: docs
title: Setup DefaultApp
description: Learn how to setup defaultapp in Windows IoT Core
keyword: package, driver install
permalink: /en-US/Docs/SetupDefaultApp.htm
lang: en-US
---

# Setup DefaultApp
DefaultApp can be configured in various ways, listed below 

## Runtime options
---
During development phases / experimental phases, you can change the default app by following means.

### Using Windows Device Portal


### Using the shell

`iotstartup headed <appid>`



## Build time options
---

### Using install script

`set launchapp=1` in the AppxConfig.cmd will make the installed appx as a defaultapp


### Using provisioning package

