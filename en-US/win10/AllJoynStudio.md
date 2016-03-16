---
layout: default
title: Using the AllJoyn Studio Extension
permalink: /en-US/win10/AllJoynStudio.htm
lang: en-US
---

# Using the AllJoyn Studio Extension

The [AllSeen Alliance](https://allseenalliance.org/) created AllJoyn to empower the Internet of Things. Windows 10 has AllJoyn built natively into its platform, allowing developers to easily take advantage of AllJoyn to "IoT-enable" your Windows 10 apps. This article will outline the steps required to build apps for Windows 10 using the Universal Windows Platform (UWP) AllJoyn APIs and the Visual Studio 2015 [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) Extension.

This article is a fulfillment of the promises made in the AllJoyn session presented at //build/ 2015:

[AllJoyn: Building Universal Windows Apps that Discover, Connect, and Interact with Other Devices and Cloud Services Using AllJoyn](https://channel9.msdn.com/Events/Build/2015/2-623)


## Understanding AllJoyn UWP App Development

Three major components form AllJoyn UWP apps:

1. App layout and design (XAML or HTML) and class components (C#, JavaScript, C++, or VB).
2. The AllJoyn core APIs: AllJoyn Standard Client API (C) and Windows.Devices.AllJoyn API (WinRT)  available in the Windows 10 SDK.
3. One or more UWP Windows Runtime Components (the  generates this code from AllJoyn interfaces).

The following diagram shows the architecture of a typical AllJoyn UWP project:

![AJ_UWP_Architecture]({{site.baseurl}}/Resources/images/AllJoyn/AJ_UWP_Architecture.jpg)

AllJoyn-enabled UWP apps can be either producers  (implement and expose interfaces, typically a device ), consumers (use interfaces, typically apps), or both. Consumers and producers share the same starting steps, only diverging in the implementation details.

## Creating an AllJoyn-enabled UWP app

Follow these steps to develop AllJoyn-enabled UWP apps for Windows 10: (explained in detail later in this document)

1. Prepare your build environment.
2. Determine which AllJoyn interfaces will be used, and obtain or create necessary Introspection XML.
3. Create an AllJoyn App project then select Introspection XML and desired Interfaces for code generation.
4. Implement producer or ponsumer code in your app using APIs exposed from the generated UWP Windows Runtime Components.
5. Build your UI.

## Preparing your Build Environment

The Windows 10 build and related tools include all of the resources that you'll need to write AllJoyn-enabled UWP apps.

Here's what you'll need to do before you get started writing code:

- Install [Windows 10](https://www.microsoft.com/windows/) on a PC
- Install [Visual Studio 2015](https://www.visualstudio.com/downloads/download-visual-studio-vs) (do NOT use an  Express edition)
- Download the [AllJoyn® Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) Extension from the Visual Studio Gallery. 


## Obtaining Introspection XML for AllJoyn Interfaces

There are three ways that you can obtain the AllJoyn interface  definitions that you will need to start your project:

1. Extract the Introspection XML from AllJoyn Producers present on your network at runtime.
2. Obtain the Introspection XML from documentation ; example: [Lighting Service Framework (LSF) documentation](https://wiki.allseenalliance.org/_media/compliance/alljoyn_lamp_service_14.06_interface_definition.pdf) from the AllSeen Alliance.
3. Create your own Introspection XML that is compliant with the AllJoyn/[D-Bus introspection](http://dbus.freedesktop.org/doc/dbus-specification.html) format.

This article covers the first two ways - AllJoyn® Studio natively supports querying the network for AllJoyn producers and extracting their XML as well as uploading Introspection XML files.  Learn how to create your own [here]({{site.baseurl}}/en-US/win10/AllJoynProducer.htm).

At //build/ 2015, an AllJoyn-enabled toaster device was shown which will serve as the example for this post. This toaster exposes controls for starting and stopping the toasting sequence, setting the "darkness", and notifications when the toast is burnt.

![AJ_toaster]({{site.baseurl}}/Resources/images/AllJoyn/AJ_toaster.jpg)

The toaster exposes the following XML:

{% highlight XML %}
<node name="/toaster">
  <interface name="org.alljoyn.example.Toaster">
    <annotation name="org.alljoyn.Bus.Secure" value="true"/>
    <description language="en">Example interface for controlling a toaster appliance</description>
    <description language="fr">Interface Exemple de commande d'un appareil de grille-pain</description>
    <property name="Version" type="q" access="read">
      <description>Interface version</description>
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="const"/>
    </property>
    <signal name="ToastBurnt" sessioncast="true">
      <description language="en">Toast is burnt</description>
      <description language="fr">Toast est brûlé</description>
    </signal>
    <method name="StartToasting">
      <description language="en">Start toasting</description>
      <description language="fr">Lancer grillage</description>
    </method>
    <method name="StopToasting">
      <description language="en">Stop toasting</description>
      <description language="fr">Arrêtez de grillage</description>
    </method>
    <property name="DarknessLevel" type="y" access="readwrite">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="true"/>
      <description language="en">Toasting darkness level</description>
      <description language="fr">Grillage niveau de l'obscurité</description>
    </property>
  </interface>
</node>
{% endhighlight %}

## Creating an AllJoyn Project

Create a Project the way you normally would: Click `File->New->New Project` to begin.

![AJ_Studio_NewProject]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_NewProject.png)

Instead of navigating to a Windows Universal Template, select the "AllJoyn App" Template for your target language which was installed with the Extension.  Name your project and choose a file location to begin developing.

![AJ_Studio_NameProj]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_NameProj.png)

Immediately after selecting an AllJoyn App Template, Visual Studio will ask you to select the AllJoyn Interfaces you would like to include in your Project. 

![AJ_Studio_Interfaces]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Interfaces.png)

__Extracting interfaces from a device on the network__

If you cannot find your AllJoyn device or interface on the network, follow [this guide]({{site.baseurl}}/en-US/win10/AllJoynTroubleshooting.htm) to troubleshoot. 

![AJ_Studio_FindDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_FindDevices.png)

To query your network for exposed interfaces, select the "Producers on the network" in the left-hand panel. This will find any AllJoyn producer on the network and list the interfaces they support.

![AJ_Studio_ListDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_ListDevices.png)

Select the interfaces you would like to inlude in your project.  In this case, we are only using the toaster interface, so we select just the "org.alljoyn.example.Toaster" interface.

![AJ_Studio_SelectDevices]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SelectDevices.png)

The "Actions" column describes the pending changes to the Project, displaying "Add" for newly-selected Interfaces. Here we have given the interface a friendly name of "ToasterLibrary", which triggers the "Rename" action to be applied.

![AJ_Studio_DeviceAction]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_DeviceAction.png)

__Loading an XML from a File__

Choose any number of Introspection XML files via the "Browse" button to see their contained Interface(s).

![AJ_Studio_BrowseXML]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML.png)

Navigate to and select the appropriate XML (here, we are using toaster.xml).

![AJ_Studio_BrowseXML_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_2.png)

Once AllJoyn® Studio loads the XML, it will parse the various Interfaces and the descriptions contained within, allowing you select which Interfaces you would like to support.

![AJ_Studio_BrowseXML_3]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_3.png)

The "Actions" column describes the pending changes to the Project, displaying "Add" for newly-selected Interfaces.

![AJ_Studio_BrowseXML_4]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_4.png)

Here we have chosen to include the "org.alljoyn.example.Toaster" Interface and have given it a friendly name of "ToasterLibrary", triggering the "Rename" action to be applied.

![AJ_Studio_BrowseXML_5]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_BrowseXML_5.png)

__Adding and Removing Interfaces__

After completing these steps, the generated files are automatically added to a C++ Windows Runtime Component with the friendly name from above and added as a Reference to the application Project.  However, the Root Namespace is still the same "org.alljoyn.example.Toaster" as defined by the interface.  Any classes that access these components need to have a "using" clause for the component's root namespace.

![AJ_Studio_SolutionExplorer]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SolutionExplorer.png)

_TIP: Build the generated components now in order to benefit from IntelliSense._

After you have created your AllJoyn App solution, you can always go back and modify the interfaces you are using. From the main menu bar, click "AllJoyn->Add/Remove Interfaces..." to launch the Interface manager.

![AJ_Studio_AddInterfaces]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_AddInterfaces.png)

From here, you may click "Browse..." to add more XML files, or de-select existing Interface(s). De-selecting an Interface updates its Action to "Remove", and clicking the Ok button removes the associated Windows Runtime Component from your solution.

![AJ_Studio_AddXML]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_AddXML.png)

Looking at the Solution Explorer, the Windows Runtime Component has been removed.

![AJ_Studio_SolutionExplorer_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_SolutionExplorer_2.png)

## Next Steps

When implementing AllJoyn functionality, always be sure to include the "Windows.Devices.AllJoyn" namespace as well as the namespace from the interface you want to use.

![AJ_Studio_namespace]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_namespace.png)

__Implementing an AllJoyn Consumer__

The code generated for the interfaces contains a watcher and consumer class used to find and then control a producer. Implement the watcher by creating a new AllJoynBusAttachment, initialize the watcher with that AllJoynBusAttachment, register for the watcher finding a producer (the "Added" event), then start the watcher.

![AJ_Studio_Code_1]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_1.png)

The ToasterWatcher_Added event triggers whenever the watcher finds a producer.  Use this event to register a consumer. Note that Visual Studio will generate the necessary shell method through the Quick Actions.

![AJ_Studio_Code_2]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_2.png)

Generating the method produces the following shell code:

![AJ_Studio_Code_3]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_3.png)

Filling in the shell code with the correct logic enables registering the consumer.

![AJ_Studio_Code_4]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_4.png)

Note that this event triggers every time the watcher discovers a producer.  If you expect to find multiple producers, keep a data structure of the consumer as there will be one consumer for each producer.

Register events for the various signals the producer will emit – property changed signals are direct members of the consumer class, but other signals are members of the Signals class (just as before, use the Quick Actions to generate the shell code for these events).


![AJ_Studio_Code_5]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_5.png)

Use the consumer object to read and write properties as well as call methods.

![AJ_Studio_Code_6]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_6.png)

### Implementing an AllJoyn Producer

__Implementing the Service__

Producers implement a service that expose their interfaces.  To implement a producer, first create a class for its service.

![AJ_Studio_Code_7]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_7.png)

Add the namespace for the interface to the "using" statements, then inherit the shell interface generated for the service and use the Quick Action to implement the class.

![AJ_Studio_Code_8]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_8.png)

From here, the Quick Action will fill in the necessary components.

![AJ_Studio_Code_9]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_9.png)

All the necessary parts of the code are ready to function, but you still need to implement the actual logic for each method and property call.

![AJ_Studio_Code_10]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_10.png)

Taking the SetDarknessLevelAsync as an example, we use a task to create a success result.  In case of failure, return ToasterSetDarknessLevelResult.CreateFailureResult().

![AJ_Studio_Code_11]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_11.png)

Implement the rest of the method and property calls to finish the service.

__Implementing the Producer__

Creating the producer is straightforward – create a new AllJoynBusAttachment, initialize a producer with that AllJoynBusAttachment, initialize the newly created service for the producer, then start the producer.

![AJ_Studio_Code_12]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_12.png)

Since the service contains the majority of the logic, the main functionality left to implement is to send the signals for property changes and discrete signals for non-state events.  Implement these as necessary through method calls.

![AJ_Studio_Code_13]({{site.baseurl}}/Resources/images/AllJoyn/AJ_Studio_Code_13.png)

__More Information__

If you've completed all of the instructions in this document correctly, you are ready to start writing AllJoyn code in your app.

For reference, please look to the AllJoyn Universal Windows Apps samples on the Microsoft Sample GitHub for [AllJoyn Producers](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ProducerExperiences) and [AllJoyn Consumers](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AllJoyn/ConsumerExperiences).

For a detailed walkthrough of how to create an AllJoyn app, please watch the AllJoyn session 623 from //build 2015:

["AllJoyn:  Building Windows apps that discover, connect and interact with other devices and cloud services using AllJoyn"](https://channel9.msdn.com/Events/Build/2015/2-623).

Note that AllJoyn communication between two UWP apps on the same machine is disabled by Windows policy unless they have enabled a loopback exception, such as when being directly deployed from Visual Studio.  For detailed instructions on enabling loopback exemption, see [here](https://msdn.microsoft.com/en-us/library/windows/apps/Hh780593.aspx).



