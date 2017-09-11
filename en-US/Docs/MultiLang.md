---
layout: docs
title: Windows 10 IoT Core Multiple Language Support
description: We describe how to add multiple language support 
keyword: windows iot, image creation, language, windows iot
permalink: /en-US/Docs/MultiLang.htm
lang: en-US
---

# Supporting multiple languages

Language support can be enabled at two levels , Application level and OS level, depending on the language resources made available on the image.

## Languages in UWP Applications
UWP applications must provide the resources for the languages that are required to be supported. [Windows.Globalization.ApplicationLanguage](https://docs.microsoft.com/en-us/uwp/api/windows.globalization.applicationlanguages) APIs can be used to specify the language-related preferences.

See the below sample applications:

* [IoTDefaultApp sample](https://developer.microsoft.com/en-us/windows/iot/samples/iotdefaultapp)

* [ApplicationResources sample](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/ApplicationResources)


## Languages in OS

Windows 10 IoTCore kits now include the language resources for the following languages

* English : en-US, en-GB
* French  : fr-FR, fr-CA
* Spanish : es-ES, es-MX
* Chinese : zh-CN

These language resources contain UI strings, speech language and voices (speech synthesis). Windows IoT images can be built with one or more of these resources and they must be specified during the image time and cannot be modified later. Note that UI language related resources are independent than speech language and voice resources.

### Specifying UI and Speech resources 
In the OEM Input xml file, the required UI and speech languages are specified as shown below

{% highlight XML %}
  <SupportedLanguages>
    <UserInterface>
      <Language>en-US</Language>
      <Language>en-GB</Language> 
      <Language>fr-CA</Language> 
      <Language>es-MX</Language> 
      <Language>es-ES</Language> 
      <Language>fr-FR</Language>
    </UserInterface>
    <Keyboard>
      <Language>en-US</Language>
      <Language>en-GB</Language> 
      <Language>fr-CA</Language> 
      <Language>es-MX</Language> 
      <Language>es-ES</Language> 
      <Language>fr-FR</Language>
    </Keyboard>
    <Speech>
      <Language>en-US</Language>
      <Language>en-GB</Language> 
      <Language>fr-CA</Language> 
      <Language>es-MX</Language> 
      <Language>es-ES</Language> 
      <Language>fr-FR</Language>
    </Speech>
  </SupportedLanguages>
  <BootUILanguage>en-us</BootUILanguage>
  <BootLocale>en-us</BootLocale>
{% endhighlight %}


### Specifying Speech Data resources
In the OEM Input xml file, the required speech data resources are specified as shown below,

{% highlight XML %}
    <Microsoft>
       ...
      <Feature>IOT_SPEECHDATA_EN_CA</Feature>
      <Feature>IOT_SPEECHDATA_ES_MX</Feature> 
      <Feature>IOT_SPEECHDATA_FR_CA</Feature> 
      <Feature>IOT_SPEECHDATA_EN_GB</Feature>
      <Feature>IOT_SPEECHDATA_ES_ES</Feature>  
      <Feature>IOT_SPEECHDATA_FR_FR</Feature> 
    </Microsoft>
{% endhighlight %}

{% include note.html text="By default, en-US speech data is included in the image" %}

### Samples
* See [MultiLangSample](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Source-arm/Products/MultiLangSample) for multiple languages support
* See [SingleLangSample](https://github.com/ms-iot/iot-adk-addonkit/tree/develop/Source-arm/Products/SingleLangSample) for fr-FR language with en-US as fallback language.
	* Note that when the boot UI language is changed, the `administrator` account name is also translated in the boot UI language. So, in fr-FR it is `administrateur`. See [OEMCustomization.cmd](https://github.com/ms-iot/iot-adk-addonkit/blob/develop/Source-arm/Products/SingleLangSample/oemcustomization.cmd)

## Changing user preferences (language, region, speech and voice)

UWP application can use WinRT APIs to set the region, preferred UI language list, speech language and voice that should be by default used. 
Once preferred UI language list set, UWP application will try to load the corresponding resources (unless application programmatically prevents that).
 
If the application doesn’t have the corresponding resources, then fallback resources will be loaded. Similarly, if the OS resources for the preferred languages aren’t part of the Windows IoT image, Windows IoT will use its fallback ones likely English (en-US).

* Set region using `TrySetHomeGeographicRegion` in [Windows.System.UserProfile.GlobalizationPreferences](https://docs.microsoft.com/en-us/uwp/api/windows.system.userprofile.globalizationpreferences)
* Set UI language using `TrySetLanguages` in [Windows.System.UserProfile.GlobalizationPreferences](https://docs.microsoft.com/en-us/uwp/api/windows.system.userprofile.globalizationpreferences)
* Set speech language using `TrySetSystemSpeechLanguageAsync` in [Windows.Media.SpeechRecognition.SpeechRecognizer](https://docs.microsoft.com/en-us/uwp/api/windows.media.speechrecognition.speechrecognizer)
* Set voice using `TrySetDefaultVoiceAsync` in [Windows.Media.SpeechSynthesis.SpeechSynthesizer](https://docs.microsoft.com/en-us/uwp/api/windows.media.speechrecognition.speechrecognizer)

{% include note.html text="For proper functioning, Cortana requires the region, UI language and speech language to be consistent, e.g.: region FR, UI and speech languages fr-FR or region ES, UI and speech languages es-ES. Cortana uses its own voice, UWP application cannot change it." %}

## IoTSettings.exe

Use the IoTSettings tool to change region, user language or speech language. This is a command line tool that can be invoked from an application using the ProcessLauncher API. These commands must be run as default account, not administrator.

IoTSettings.exe \[Command\]

        -list uilanguage =&gt; list all UI languages

        -list speechlanguage =&gt; list all speech languages

        -get uilanguage =&gt; display current UI language

        -get speechlanguage =&gt; display current speech language

        -get region =&gt; display current region

        -set uilanguage language\_tag - (e.g.: fr-CA  =&gt; set default UI language French Canadian)

        -set speechlanguage language\_tag - (e.g.: fr-CA =&gt; set speech language French Canadian)

        -set region region\_code - (e.g.: CA =&gt; set default region to Canada)

e.g.: “IoTSettings -list uiLanguage” will give back the list of supported UI language (in the version of Windows IoT core image it has been executed against)
