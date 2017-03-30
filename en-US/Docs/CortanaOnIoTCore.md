---
layout: docs
title: Cortana on IoT Core
description: How to use Cortana on IoT Core and how to build product with Cortana
keyword: windows iot, Cortana, KWS, MSA
permalink: /en-US/Docs/CortanaOnIoTCore.htm
lang: en-US
---

Cortana Overview
================

Cortana is a personal digital assistant working across all your devices to help you in your daily life. She learns about you; helps you get things done by completing tasks; interacts with you using natural language in a consistent, contextual way; and always looks out for you. Cortana has a consistent visual identity, personality, and voice.

IoT Core is an edition of Windows 10, and is optimized for small footprint and low cost IoT devices. Cortana is enabled on IoT Core in the Windows 10 Creators Update.

To use Cortana:

-   The device must have internet connection.

-   The user must have a Microsoft account (MSA) which is in the form of
    [alias@outlook.com, alias@hotmail.com](mailto:alias@outlook.com,%20alias@hotmail.com) or <alias@live.com>.

-   The user is required to sign in using their MSA on the device to utilize Cortana.

-   The device must have a display.

-   A microphone and speaker are required for speech interaction with Cortana.

-   An OEM must follow the guidance provided for the design and development of audio input devices outlined in the [Microsoft Speech Platform](https://msdn.microsoft.com/en-us/library/windows/hardware/dn915051(v=vs.85).aspx) Specification.

Use Cortana Function on IoT Core
================================
This document describes how to enable and utilize Cortana on IoT Core. Makers and OEMs can now leverage the capabilities of Cortana to build even smarter, connected IoT devices.

 Hardware List
--------------

Windows 10 IoT Core can be run on a [list of IoT devices]({{site.baseurl}}/{{page.lang}}/Explore/DeviceOptions).

Any microphone and speaker you select to use with the your IoT devices should work with Cortana. For better speech recognition
quality, here is a recommended list of hardware that has been tested.

Microphone

-   Blue Microphones Snowball iCE Condenser Microphone, Cardioid

-   Sound Tech CM-1000USB Table Top Conference Meeting Microphone with
    Omni-Directional Stereo

-   Microsoft LifeCam HD 3000

Speaker

-   Logitech S150 USB Speakers

USB Hub

-   Depending on your IoT device, you may need a USB hub to connect the
    peripherals (including a mouse and a keyboard)

Getting Started
---------------

To get started with Cortana on Windows 10 IoT Core, a few additional set up steps are necessary.

### Install [Windows 10 IoT Core Dashboard](https://developer.microsoft.com/en-us/windows/iot/Downloads).

###  Flash the IoT Device

[Flash your IoT Core device]({{site.baseurl}}/{{page.lang}}/GetStarted) with the correct image. If you have trouble finding the image for
your IoT device, please go to [Windows Insider Preview Downloads](https://www.microsoft.com/en-us/software-download/windowsiot) page.

### Install Update

Once the image boots up, please open Device Portal for your device and install updates. To do this, enter **http://*&lt;device
IP&gt;*:8080/\#Windows%20Update** in a browser and click on **Check for
Updates**. Apply any updates if they are available. The update process
will take approximately 30-40 minutes. Once the updates have been
downloaded and installed, click on **Restart Now**.

{% include imageborder.html alt="Install Update" link="/Resources/images/cortona/InstallUpdate1.png" %}

{% include imageborder.html alt="Install Update" link="/Resources/images/cortona/InstallUpdate2.png" %}

{% include imageborder.html alt="Install Update" link="/Resources/images/cortona/InstallUpdate3.png" %}

### Set Up the Peripherals

Connect the microphone and speakers into the USB port on your device. If
necessary, use a USB hub.

Once connected, adjust the microphone and speaker settings in Device
Portal. To do this, enter **http://*&lt;device
IP&gt;*:8080/\#Device%20Settings** in a browser. Under **Audio
Control**, check that the microphone and speakers displayed are the ones
that are physically connected. In the image below, the speakers show
**Speakers (2- USB AUDIO)** which is the **Logitech USB Speakers** and
the microphone shows **Desktop Microphone (Microsoft LifeCam HD-3000)**
which is the **Microsoft LifeCam HD 3000**.

Adjust the volume settings for both to be within the range of 40-70%
(Double-check that the Microphone setting is not 0.0)


{% include imageborder.html alt="Audio Setup" link="/Resources/images/cortona/AudioSetup.png" %}

####  Dragonboard Only : Disable Audio Driver

**NOTE:** This additional step is only for Dragonboard 410c.

To enable USB audio, you will need to disable the Qualcomm audio driver.
To do this, simply run this command in a PowerShell window under the IoT
Device administrator account:

devcon disable "AUDD\\QCOM2468"

### Launch Cortana

Now it’s time to launch Cortana!

During the first boot, right after Wi-Fi setting, Cortana consent will
pop up to ask for permission. **If you deny consent, Cortana will not
work.** To accept, click **Sure**, Cortana will be launched when you say
“Hey Cortana”.

![Consent]({{site.baseurl}}/Resources/images/cortona/Consent.png)

If you skip the acceptance, you need to go to Device Portal to enable
Cortana later.

MSA sign in will pop up after consent. If you'd like to sign in, follow
her instructions on the sign in page.

Cortana should work now if you accept the Consent.

If Cortana still doesn’t work, please do the following instructions to
turn on Cortana manually.

#### Start Cortana on Boot

Enter Device Portal again - to do this, enter **http://*&lt;device
IP&gt;*:8080/\#Device%20Settings** into a browser. Under Device
Settings, scroll to the bottom and check **"Start Cortana on Boot"** if
it is not checked. Restart the device (top right corner of the browser
has a Power button with Restart option)


{% include imageborder.html alt="Start Cortana" link="/Resources/images/cortona/StartCortana.png" %}

#### Grant Consent

Go to Apps Manager under Device Portal - to do this, enter
**http://*&lt;device IP&gt;*:8080/\#Apps%20manager** into a browser.
Under the list of App Names, you should see **Search** or **Cortana**.
If it's stopped, start the app (under the Actions drop down box, select
**Start**). Cortana will launch on your IoT Device

If it's your very first time launching Cortana, it will ask for consent.
**If you deny consent, Cortana will not work.** To accept, click
**Sure**:

![Consent]({{site.baseurl}}/Resources/images/cortona/Consent2.png)

If you deny consent at first and want to use Cortana later, you could go
to Device Settings under Device Portal to turn on Cortana.

![Enable KWS]({{site.baseurl}}/Resources/images/cortona/EnableKws.png)

#### Sign in with MSA

Signing in with your MSA will help Cortana provide more personalized
context in her responses to you. If you deny log in, Cortana will still
work but her responses will just be more generalized.

If you'd like to sign in, follow her instructions on the sign in page.

Sign in page will only be launched at the first time you ask Cortana to
do any personal information related action. If you click ‘Maybe later’,
it will be popped up next time when you ask personal information related
question.

![MSA Sign in]({{site.baseurl}}/Resources/images/cortona/MSASignin.png)

####  Sign out MSA

If you want to sign out your MSA, please go to Device Settings under
Device Portal, click ‘About Me’, then the account icon at the bottom to
sign out.

![MSA Sign out]({{site.baseurl}}/Resources/images/cortona/MSASignout.png)

Invoking and Stopping Cortana
-----------------------------

You can now try Cortana!

To start Cortana, say "Hey Cortana" to your microphone. Cortana on IoT
Core will now launch and you can start to talk to her. Here are some
sample queries:

Hey Cortana, What's the weather today?

Hey Cortana, what is the traffic in Seattle?

Hey Cortana, what is the stock price for Microsoft?

If you stop talking to Cortana, she will be dismissed. To start her up
again, say "Hey Cortana" followed by your query. To stop Cortana, say
"Hey Cortana, stop" to your microphone.

Make Cortana your Personal Assistant
------------------------------------

Cortana can be your personal assistant - to do so, you just need to
sign-in with your MSA. If you declined to sign in when first launching
Cortana, you can sign in at any time by asking Cortana a personal
question. She will ask you to sign-in with your MSA.

For example, "Hey Cortana, what is the traffic to my home?" Cortana will
bring up the Sign In page. Follow her instructions for sign in and you
will be all set up to go!

Integrate Cortana in your Products
==================================

As a OEM, if you want to build Cortana enabled products, please follow
the instructions below.

 Language Configuration
-----------------------

Use the IoTSettings tool to change region, user language or speech
language. This is a command line tool that can be invoked from an
application using the ProcessLauncher API. These commands must be run as default account, not administrator.

IoTSettings.exe \[Command\]

        -list uilanguage =&gt; list all UI languages

        -list speechlanguage =&gt; list all speech languages

        -get uilanguage =&gt; display current UI language

        -get speechlanguage =&gt; display current speech language

        -get region =&gt; display current region

        -set uilanguage language\_tag - (e.g.: fr-CA  =&gt; set default
UI language French Canadian)

        -set speechlanguage language\_tag - (e.g.: fr-CA =&gt; set
speech language French Canadian)

        -set region region\_code - (e.g.: CA =&gt; set default region to
Canada)

e.g.: “IoTSettings -list uiLanguage” will give back the list of
supported UI language (in the version of Windows IoT core image it has
been executed against)

Note that Cortana will only work when region, UI language and speech
language are coherent, e.g.: region = CA, UI language = en-CA and speech
language = en-CA.

Cortana Feature ID
------------------

There is one feature ID for Cortana,
&lt;Feature&gt;IOT\_CORTANA&lt;/Feature&gt;, OEM needs to add this
feature ID in their OEMInput XML. Please go to this site for more
information.

<https://msdn.microsoft.com/en-us/windows/hardware/commercialize/manufacture/iot/iot-core-feature-list>

Enable ‘Start Cortana on Boot’ in Image
---------------------------------------

The registry key name for ‘Start Cortana on Boot’ is
CortanaObscureLaunchEnabled.

reg add "HKLM\\SOFTWARE\\Microsoft\\Windows
NT\\CurrentVersion\\Winlogon\\IoTShellExtension" /t REG\_DWORD /v
CortanaObscureLaunchEnabled /d 1

Cortana Consent
---------------

OEM should add the following snippet into their own code to make sure
that consent will be launched before the user uses Cortana.

{% highlight CS %}
// Microsoft recommends replacing **QuerySourceSecondaryId=IoT** with
**QuerySourceSecondaryId=IoT\_MANUFACTURER\_DEVICE**.

// For example **QuerySourceSecondaryId=IoT\_YourCompanyName\_Toaster**

 var uri = new
 Uri(@"ms-cortana://CapabilitiesPrompt/?RequestedCapabilities=InputPersonalization,Microphone,Personalization&QuerySourceSecondaryId=IoT&QuerySource=Microphone&DismissAfterConsent=True");
 var success = await Windows.System.Launcher.LaunchUriAsync(uri);

{% endhighlight %}
Enable Voice Activation (Keyword Spotting)
------------------------------------------

Keyword spotting, it is software keyword spotter which detects when the
user says “Hey, Cortana” .

OEM has the flexibility to decide when to enable KWS. For example, OEM
wants to enable KWS only when proximity sensor detects someone is
nearby. *Here is the MSDN link (TBD)*

OEM will be able to set whether Cortana can be
activated by voice (listen to “Hey Cortana”). These API will only be
available in Embedded Mode to UWP applications.

Embedded mode is a restricted device mode that enables a device to gain
access to features and APIs that are otherwise restricted in UWP,
including: 

-   Background applications (aka CBT or headless apps)

-   Use of the lowLevelDevice capability APIs

-   Use of systemManagement capability APIs

The Windows.Services.Cortana.CortanaSettings will provide the following

-   An API to check if Cortana is available

-   An API to check if user has consent to voice activation for Cortana

-   an API to control Cortana voice activation (listening to “Hey
    Cortana”). 

IoT OEM has a UWP app that enables voice activation (Cortana can listen
to “Hey Cortana”) when user is close to a device. The sample below shows
how to do that.

{% highlight CS %}

private void OnUserProximitySensorApproach()

{ // leave if Cortana isn't available

  if (!Windows.Services.Cortana.CortanaSettings.IsCortanaAvailable)
 
  {
 
  return;
 
  }
 
  // enable voice activation if allowed and not already done
 
  if
  (!Windows.Services.Cortana.CortanaSettings.HasUserConsentToVoiceActivation)
 
  {
 
  // voice activation isn’t allowed by user
 
  //
 
  // Note that, user consent can be obtained by launching
 
  // ms-cortana://CapabilitiesPrompt/?RequestedCapabilities

  // =InputPersonalization,Microphone&QuerySource=

  // Microphone&QuerySourceSecondaryId=IoT
 
  return;

}

else if
(!Windows.Services.Cortana.CortanaSettings.IsVoiceActivationEnabled)

{

  Windows.Services.Cortana.CortanaSettings.IsVoiceActivationEnabled =
  true;

}

}

{% endhighlight %}

Cortana on Windows 10 IoT Core Capabilities
===========================================

Cortana on IoT Core offers reactive
experiences in the Windows 10 Creators Update. A reactive experience
occurs when the user initiates commands to cut through multiple steps to complete a task. Reactive information is provided in response to a
query.

Cortana is extensible. In addition to the native skills supported by the
Cortana application, developers can create their own skills to allow
Cortana to do more.

-   With the Windows 10 Creators Update, the following capabilities of
    Cortana will be enabled on IoT Core.

    -   Cortana skills sample list	   - Reminder, To-do list, Traffic/Restuarant, Chit Chat, Dictionary, Finance, Health,News, Reference, Show Times, Calculator, Weather, Entity look up, Events, Sports,Time zone, etc.


-   Catered to devices with small- or medium-sized screens (e.g.
    thermostat or refrigerator), provide a voice response with optimized
    visual content.

-   Leverages the audio pipeline provided in the Windows 10 operating
    system which supports linear microphone arrays. Audio input devices
    should conform to the guidance outlined in the [Microsoft Speech
    Platform](https://msdn.microsoft.com/en-us/library/windows/hardware/dn915051(v=vs.85).aspx).

-   To wake-up Cortana the user says “Hey, Cortana.” Keyword Spotting
    (KWS) runs locally to receive the voice input and complete the
    analysis. The audio is only sent to the cloud once the keyword is
    spotted. User consent is needed before enabling KWS. The KWS is
    optimized by the Windows Speech Platform and supports multiple
    languages and regions.

-   Will support the following [regions and
    languages](https://support.microsoft.com/en-us/instantanswers/557b5e0e-0eb0-44db-87d6-5e5db6f9c5b0/cortana-s-regions-and-languages)
    (14 total).

   
|Language/Locale||KWS |
|------|-----|----|
| EN-US ||Hey Cortana|
| EN-GB || Hey Cortana|
| EN-AU || Hey Cortana|  
| EN-CA || Hey Cortana|
| EN-IN || Hey Cortana|
| ZH-CN || 你好小娜 (ni hao xiao na)|  
| FR-FR || Hey Cortana|
| FR-CA || Hé Cortana|
| IT-IT || Ehi Cortana|  
| DE-DE || Hey Cortana|  
| ES-ES || Hola Cortana|
| ES-MX || Hola Cortana|
| PT-BR || Ei Cortana| 
| JA-JP || コルタナさん (Korutana-san)|


Cortana Extensibility
=====================

Cortana custom skill provides the extensible capability for Cortana. The
experts control the end-to-end experience, while Cortana brokers to
relevant applications, websites, services and bots. Custom skills are
created by developers, for example, OEM partners or ISVs.

Please visit
[https://developer.microsoft.com/en-us/cortana/dashboard\#/home](https://developer.microsoft.com/en-us/cortana/dashboard)
to understand and learn how to create your own skill.



