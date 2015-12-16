---
layout: default
title: AllJoyn Producers and Authoring AllJoyn Introspection XML
permalink: /en-US/win10/AllJoynProducer.htm
lang: en-US
---
<style>
tr:nth-child(even) {background: #f2f2f2;}
th {background: #f2f2f2;}
td:nth-child(1)
{
    width: 200px;
}
td:nth-child(2)
{
    width: 60px;
}
td:nth-child(3)
{
    width: 600px;
}
</style>

# AllJoyn Producers and Authoring AllJoyn Introspection XML

AllJoyn, created by the [AllSeen Alliance](https://allseenalliance.org/), provides a great framework for making connected devices and apps on a proximal network, and Windows provides the best experience for using AllJoyn with the [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) extension for Visual Studio.  While our tools excel at creating apps for producers and consumers, starting a new AllJoyn device from scratch can be quite confusing.

If you have an idea for the next great connected device or a new toy with which to tinker and explore, you may not be able to use one of the standard interfaces offered by the AllSeen Alliance.  If so, then you need to create a brand new AllJoyn producer.

A developer wanting to make a new AllJoyn producer needs to author their own Introspection XML, but creating Introspection XML requires subject matter expertise and has a significant learning curve for new developers.  This blogpost will lower the learning curve by breaking down the various components of Introspection XML, describing the purpose and restrictions of each component, and providing good examples in approachable terms.

## Existing documentation

A cursory examination of the following resources combined with this blogpost should accelerate developer understanding of Introspection XML:

1. [AllJoyn Events and Actions API Guide](https://allseenalliance.org/developers/develop/api-guide/events-and-actions) – AllJoyn implementation details and overview.
2. [AllJoyn Interface Review Board Design Guidelines](https://wiki.allseenalliance.org/irb/interface_design_guidelines_1.0) - stringent structuring and specification for AllJoyn Introspection XML.
3. [D-Bus Specification](http://dbus.freedesktop.org/doc/dbus-specification.html) – AllJoyn bases Introspection XML on this specification.

__The three types of Introspection XML__

As you peruse AllJoyn documentation, you will find three types of Introspection XML:

1. D-Bus Specification XML: low-overhead, interprocess communication with a type format for data representation.
2. AllJoyn Introspection XML: extends D-Bus Specification XML with XML tags for holding textual descriptions while also applying AllJoyn principles to the specification.
3. Extended AllJoyn Introspection XML: evolution of classic Introspection XML introducing named types for structures and dictionaries.

AllJoyn Studio currently supports D-Bus Specification XML and AllJoyn Introspection XML; this blog will dictate how to create and form AllJoyn Introspection XML.  The AllSeen Alliance's Interface Review Board (IRB) uses the new Extended AllJoyn Introspection as the format for formal submissions for standardization reviews but is working on a unified introspection XML format for the near future.

## Introspection High Level Overview

Every AllJoyn producer publicly advertises an Introspection XML that surfaces the producer's supported functionality – interfaces as described via signals, properties and methods.  Code Generation solutions, like the one in the AllJoyn Studio extension, rely on Introspection XML to create the necessary code to accelerate development.  Introspection XML describes the functionality of a producer in a non-ambiguous, human-readable way such that two different manufacturers can use the XML to implement a producer with the same functionality.  By the same token, developers with no previous knowledge of an AllJoyn producer should be able to develop against that producer based on its XML.

__AllJoyn Interfaces__

AllJoyn accomplishes this by breaking an Introspection XML into various "interfaces" that represent different logical groupings of behavior and capabilities.  AllJoyn interfaces are named using a reverse-DNS convention. For example, the interface "Foo" interface created by Contoso Ltd., which owns the contoso.com domain, would be written as:

	<interface name="com.contoso.Foo">

A producer may implement any number of interfaces, but must implement every component of an interface that they advertise.  In order to differentiate and extend behaviors, AllJoyn supports creating new interfaces with respect to an existing interface hierarchy; i.e. `com.contoso.Foo.Bar` defines new capabilities for things under the `Foo.Bar` category but doesn't have any explicit dependencies on the `com.contoso.Foo` interface. 

For an example, we have two interfaces: `com.contoso.Sensor` and `com.contoso.Sensor.Humidity` – "Humidity" logically falls under the "Sensor" category.  Someone developing a Humidity producer could choose to support just the `com.contoso.Sensor.Humdity` interface, but they could also choose to support the `com.contoso.Sensor` interface.  Regardless, if they advertise an interface, then producers must support all of its functions.

The `<description>` tag is used to describe interfaces, capabilities and arguments, and can be localized for various languages.  Liberal use of the `<description>` tag makes the XML more understandable and removes ambiguity.

Standard practice dictates the use of the `org.alljoyn.Bus.Secure` annotation on an interface to enable security and authentication.  For strong authentication, use a pre-shared key (PSK) or a certificate key exchange (ECDSA).  Otherwise, a "null" authentication becomes the default behavior.  **The actual authentication mechanism happens in implementation, not the declaration**. This annotation enables security but does not specify the type of security used or how it will be implemented.

___Example___

{% highlight XML %}
<node>
 
  <interface name="com.example.Door.PrivateDoor">
 
    <annotation name="org.allJoyn.Bus.Secure" value="true" />
 
    <description language="en">
 
      Private interface for a Door the consumer owns. 
 
    </description>
 
  </interface>
 
</node>
{% endhighlight %}

This example shows an interface exposed by a device: `com.example.Door.PrivateDoor`. In the scope of the interface, the only thing we're concerned about is whether communication should be secured when using that interface, not what type of mechanism is being used.

__Interface Capabilities__

Interfaces declare their capabilities with three interface members: methods, properties, or signals. Introspection XML also supports annotations that describe additional functionality or constraints.  These capabilities use UpperCamelCase notation while arguments use lowerCamelCase notation.

### Argument Types

Interface members send and receive arguments denoted by an ASCII type-code.  Depending on the type of interface member, arguments may have be sent to the producer from the consumer (direction="out") or from the consumer to the producer (direction="in").  The following table provides a brief overview of commonly used types:

*Conventional Name* | *Type-Code* | *Use*
----------------- |:---------:| ---
**BOOLEAN** | b | Represents TRUE (1) or FALSE (0). Used for simple binary information or states.
**BYTE** | y | Integer value from 0 to 255. Used when dealing with small positive numbers.
**UINT16** | q | Integer value from 0 to 2^16 - 1
**UINT32** | u | Integer value from 0 to 2^32 - 1
**UINT64** | t | Integer value from 0 to 2^64 - 1
**INT16** | n | Integer value from –(2^15) to 2^15 - 1
**INT32** | i | Integer value from –(2^31) to 2^31 - 1
**INT64** | x | Integer value from –(2^63) to 2^63 - 1
**DOUBLE** | d | Precision floating point numbers from –(2^127) to 2^127 - 1
**STRING** | s | UTF-8 string
 
For a more exhaustive overview of all the supported types, see [here](http://dbus.freedesktop.org/doc/dbus-specification.html#idp94392448).

As of this writing, use SI units where possible and clearly denote intended units. When possible, choose the type-code most restrictive to your scenario; e.g., if you are representing a person's age in years, then use BYTE, not UINT16 or INT16, since no one will be a negative age or more than 255 years old.  Always follow the latest [AllJoyn Interface Review Board (IRB)](https://wiki.allseenalliance.org/interfacereviewboard?s%5b%5d=interface&s%5b%5d=review&s%5b%5d=board) guidelines.

The following table summarizes common units:


*Quantity* || *Unit*
-------- || ----
**Absolute time (date & time)** || Seconds since UNIX Epoch (00:00:00 on January 1, 1970)
**Time of Day** || Seconds since midnight
**Time interval** || Seconds
**Bandwidth** || Bits per second
**Data size** || Bytes
 
### Methods

Consumers call methods to modify the state of a producer, and their names should start with a verb because they represent requests for the producer to perform an action.  Methods may have input and output arguments; in the case that no return message needs to be sent, apply the annotation "org.freedesktop.DBus.Method.NoReply".  However, AllJoyn methods normally return a SuccessResult or a FailureResult, giving consumers feedback about the method call.  The type of the arguments must comply with the [D-Bus Specification](http://dbus.freedesktop.org/doc/dbus-specification.html). 

___Example (excluding interface information for convenience)___

{% highlight XML %}
<node>
 
  <interface name="com.example.Door.PrivateDoor">
 
    <!-- Method showing arguments with only directions in -->
 
    <method name="SetPasscode">
 
      <description language="en">
 
        Allows owner of the door to change the code needed to unlock it.
 
      </description>
 
      <argument name="currentPasscode" type="u" direction="in">
 
        <description language="en">
 
          Current code (00000000 to 99999999) needed to unlock door
 
        </description>
 
      </argument>
 
      <argument name="newPasscode" type="u" direction="in">
 
        <description language="en">
 
          New code (00000000 to 99999999) needed to unlock door
 
        </description>
 
      </argument>
 
    </method>
 
  </interface>
 
  <interface name="com.example.Door.PublicDoor">
 
    <!-- Method showing both arguments in and out -->
 
    <method name="UnlockDoor">
 
      <description language="en">
 
        Allows guests with the code to unlock the door.
 
      </description>
 
      <argument name="passcode" type="u" direction="in">
 
        <description language="en">
 
          Current code (00000000 to 99999999) needed to unlock door
 
        </description>
 
      </argument>
 
      <argument name="welcomeMessage" type="s" direction="out">
 
        <description language="en">
 
          Message from the owner of the door.
 
        </description>
 
      </argument>
 
    </method>
 
  </interface>
 
</node>

{% endhighlight %}

*Note: In most cases, properties should be used instead of methods to access a producer's state (e.g., use a Color property instead of a GetColor method).*

### Properties

Properties mainly allow access to a producer's state.  While properties technically have access values of "read", "readwrite", or "write", state-modifying functionality generally belongs to methods – as such, developers should strive to keep properties as "read" and use "readwrite" only when the state represented by that property is independent of all other properties.  Properties should never be just "write" – modifying the state without observation is the role of methods.

Properties must be annotated to alert consumers when their values change (optionally, properties can inherit this annotation from its parent interface).  The annotation `org.freedesktop.DBus.Property.EmitsChangedSignal` can have four values:

- "true" – when the property changes, the producer will emit a signal denoting the changed property and the new value. Used in properties that are frequently used and require active oversight, such as a "LockState" for a door.
- "invalidates" – when the property changes, the producer will emit a signal denoting the changed property but not the new value. Used in properties that don't require heavy oversight (such as the "WashMode" of a clothes dryer) or represent a lot of data, such as a container.
- "false" – when the property changes, the producer emits no signal. Used in properties that update rapidly, such as a "TransitCounter" property on a subway turnstile tracking people boarding the subway. If unspecified, AllJoyn properties use this as default.
- "const" – the property will never change value and never emit a changed signal. This will be introduced in the AllJoyn 16.04 release; until then, use "true".

___Example___

Expanding upon the previous example, we have modified the XML to include properties (excluding the methods for brevity).

{% highlight XML %}
<node>
 
  <interface name="com.example.Door.PrivateDoor">
 
    <!—- Read property that sends a signal when the value changes -->
 
    <property name="IsLocked" type="b" access="read">
 
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="true"/>
 
      <description language="en">
 
        Owner of the door may freely lock and unlock the door.
 
      </description>
 
    </property>  
 
  </interface>
 
  <interface name="com.example.Door.PublicDoor">
 
    <!—- Read-only property that never sends a signal and never changes -->
 
    <property name="Owner" type="s" access="read">
 
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="true"/>
 
      <description language="en">
 
        Owner of the door is public knowledge.
 
      </description>
 
    </property>
 
  </interface>
 
</node>
{% endhighlight %}

### Signals

Use signals to inform consumers of an event that they could not determine by querying the producer.  A door opening would be conveyed through a producer's DoorOpen property with a "true" EmitsChangedProperty annotation.  Someone passing through the door, however, cannot be derived from any property changes, so this would make a good standalone signal.  We refer to these kinds of events as "stateless".  Since signals are unidirectional from producer to consumer, they can only contain "out" arguments.

___Examples___ 

(excluding methods and properties for convenience):

{% highlight XML %}
<node>
 
  <interface name="com.example.Door.PrivateDoor">
 
    <!—- Signals may contain arguments about non-state information -->
 
    <signal name="ThresholdCrossed" sessioncast="true">
 
      <description>
 
        Signal to notify owner whenever anyone passes through the door.
 
      </description>
 
      <argument name="crossedInward" type="b" direction="out">
 
        If true, someone entered; if false, someone left.
 
      </argument>
 
    </signal>
 
  </interface>
 
</node>

{% endhighlight %}

Since signals have such a narrow scope, typically few appear in a producer's XML.

### Containers

Do not combine multiple arguments into a complex collection like a serialized JSON string. The D-Bus specification makes affordances for containers of data – STRUCT, ARRAY, VARIANT, and DICT_ENTRY.  Use these to pass arguments that require more than basic types.

___VARIANT___

VARIANTs are denoted by the type "v" and can contain any [single complete type](http://dbus.freedesktop.org/doc/dbus-specification.html#term-single-complete-type). However, VARIANTs should be avoided whenever possible because they add ambiguity to XML definitions.

___STRUCT___

STRUCTs use "(" and ")" to denote the beginning and end of a data structure – a single complete type.  These data structures may be nested.

Examples:

A type of "(iii)" denotes a structure of three integers; "(i(ii))" denotes a STRUCT of an integer and a STRUCT of two integers, which is distinct from the type "((ii)i)".

___ARRAY___

ARRAYs use the type code "a" and must be followed by a single complete type.  ARRAYs do not have set lengths, so they are similar to a list data structure. ARRAYs represent a single complete type.

Examples:

A type of "ai" represents an ARRAY of integers, while "aai" represents an ARRAY of an ARRAY of integers.  An ARRAY may be used with STRUCTs as well: "a(ii)".

___DICT_ENTRY___

DICT_ENTRYs function similar to a STRUCT with greater restrictions: they use "{" and "}", may only occur as an array element type, and must have exactly two complete types inside the curly braces.  The first type represents a "Key" in a dictionary data structure, and the second represents the "Value" in the dictionary's Key-Value pair.  A Key should be unique in a dictionary.

Example:

A type of a{sy} denotes a dictionary of string KEYs and byte VALUEs.  Use <description> tags to describe valid keys and values. 

__Final Example and ajxmlcop__

The concept of containers improves the capabilities of the existing XML as well as providing an avenue for new useful interface members.

Once you have finished writing your XML, use the ajxmlcop.exe command line tool (available at the AllJoyn [git source](https://git.allseenalliance.org/cgit/core/alljoyn.git/) or [here](https://github.com/MS-brock/AllJoynToasterDemo)) to validate the XML.  Use ajxmlcop.exe with your XML file as the input argument (e.g., `C:\>ajxmlcop.exe doorExample.xml`) to receive error, warning, and informational messages.  This tool provides valuable feedback as to the structure and format of your XML and use of signals, properties, and methods.

{% highlight XML %}
<node>
  <interface name="com.example.Door.PrivateDoor">
    <annotation name="org.alljoyn.Bus.Secure" value="true" />
    <description language="en">
      Examples for an AllJoyn-enabled door.  Private interface that can only be used by the producer’s owner.
    </description>
    <method name="SetPasscode">
      <description language="en">
        Change the code needed to unlock the door.
      </description>
      <argument name="currentPasscode" type="u" direction="in">
        <description language="en">
          Current code needed to unlock door
        </description>
      </argument>
      <argument name="newPasscode" type="u" direction="in">
        <description language="en">
          New code needed to unlock door
        </description>
      </argument>
    </method>
    <method name="UpdateGuestRatings">
      <description language="en">
        Update the list of guests and their personality scores.
      </description>
      <annotation name="org.freedesktop.DBus.Method.NoReply" value="true" />
      <argument name="guestName" type="s">
        <description language="en">
          The name of the guest being entered.
        </description>
      </argument>
      <argument name="qualityScores" type="a{sy}">
        <description language="en">
          DICTIONARY[Key:(string)guestQuality, Value:(byte)score]
          KEYs: "Friendly", "Social", "Punctual" 
          VALUEs: [0-10]
          The qualities of the guest, scored appropriately. If the guestName matches an existing entry, this updates that entry.
        </description>
      </argument>
    </method>
    <method name="SetDoorSecurity">
      <description language="en">
        Close and lock the door or unlock the door.
      </description>
      <argument name="secured" type="b" direction="in">
        <description language="en">
          If TRUE, shut and lock the door.
          If FALSE, unlock the door.
        </description>
      </argument>
    </method>
    <property name="MessageBook" type="a(ss)" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="invalidates"/>
      <description language="en">
        (struct)[(string)guestName, (string)message]
        A list of names of people and the messages they have left.
      </description>
    </property>
    <property name="GuestRatings" type="a(sa{sy})" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="false"/>
      <description language="en">
        ARRAY[(string)guestName, DICTIONARY(Key:(string)guestQuality, Value:(byte)score)]
        KEYs: "Friendly", "Social", "Punctual"
        VALUEs: [0-10]
        A collection of the previous guests and their scored qualities.
      </description>
    </property>
    <property name="IsLocked" type="b" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="true"/>
      <description language="en">
        Owner of the door may freely lock and unlock the door.
      </description>
    </property>
    <property name="Version" type="q" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="false"/>
      <description language="en">
        Version of the implementation being used.
      </description>
    </property>
    <signal name="ThresholdCrossed" sessioncast="true">
      <description>
        Signal to notify owner whenever anyone passes through the door.
      </description>
      <argument name="crossedInwards" type="b" direction="out">
        If true, someone entered; if false, someone left.
      </argument>    
    </signal>
  </interface>
  <interface name="com.example.Door.PublicDoor">
    <annotation name="org.alljoyn.Bus.Secure" value="true" />
    <description language="en">
      Examples for an AllJoyn-enabled door. Public interface that can be used by any consumer.
    </description>
    <method name="UnlockDoor">
      <description language="en">
        Allows guests with the code to unlock the door.
      </description>
      <argument name="passcode" type="u" direction="in">
        <description language="en">
          Current code (00000000 to 99999999) needed to unlock door
        </description>
      </argument>
      <argument name="welcomeMessage" type="s" direction="out">
        <description language="en">
          Message from the owner of the door.
        </description>
      </argument>
    </method>
    <method name="LeaveMessage">
      <description language="en">
        Leave a message for the owner of the door.
      </description>
      <argument name="guestName" type="s" direction="in">
        <description language="en">
          Name of guest leaving a message
        </description>
      </argument>
      <argument name="message" type="s" direction="in">
        <description language="en">
          Message left for owner of the door
        </description>
      </argument>
    </method>
    <method name="AnnouncePresence">
      <description language="en">
        Send a message to the owner of the door.
      </description>
      <argument name="announcingGuest" type="s" direction="in">
        <description language="en">
          Name of the guest announcing their presence.
        </description>
      </argument>
      <argument name="forcefulnessOfAnnouncment" type="y" direction="in">
        <description language="en">
          Degree to which the guest attempts to make their presence known, on bounds [1:10], where 1 is softly and 10 is aggressively.
        </description>
      </argument>
    </method>
    <property name="Version" type="q" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="false"/>
      <description language="en">
        Version of the implementation being used.
      </description>
    </property>
    <property name="Owner" type="s" access="read">
      <annotation name="org.freedesktop.DBus.Property.EmitsChangedSignal" value="false"/>
      <description language="en">
        Owner of the door is public knowledge.
      </description>
    </property>
  </interface>
</node>
{% endhighlight %}

