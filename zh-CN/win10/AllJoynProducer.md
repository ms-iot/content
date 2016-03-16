---
layout: default
title: AllJoyn 创建器和编写 AllJoyn 自检 XML
permalink: /zh-cn/win10/AllJoynProducer.htm
lang: zh-cn
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

# AllJoyn 创建器和编写 AllJoyn 自检 XML

[AllSeen 联盟](https://allseenalliance.org/)创建的 AllJoyn 为连接邻近网络上的设备和应用提供了出色的框架，同时 Windows 为 AllJoyn 与 Visual Studio 的 [AllJoyn Studio](https://visualstudiogallery.msdn.microsoft.com/064e58a7-fb56-464b-bed5-f85914c89286) 扩展的结合使用提供了最佳体验。尽管我们的工具擅长为创建器和使用器创建应用，但从头开始新的 AllJoyn 设备可能非常令人困惑。

如果你想要对下一个出色的连接设备或新玩具进行体验和探索，可能无法使用其中一个由 AllSeen 联盟提供的标准接口。如果是这样，需要创建全新的 AllJoyn 创建器。

想要制作新的 AllJoyn 创建器的开发人员需要自行编写自检 XML，但创建自检 XML 需要具备专业知识，对于开发新手而言学习时间较长。此博客文章通过分解自检 XML 的各个组件、描述每个组件的目的和限制以及以恰当的术语提供良好示例减少学习时间。

## 现有文档

结合此博客文章粗略查看以下资源应能加快开发人员对自检 XML 的了解：

1. [AllJoyn 事件和操作 API 指南](https://allseenalliance.org/developers/develop/api-guide/events-and-actions) – AllJoyn 实现详细信息和概述。
2. [AllJoyn 接口查看板设计指南](https://wiki.allseenalliance.org/irb/interface_design_guidelines_1.0) - AllJoyn 自检 XML 的严格构造和规范。
3. [D 总线规范](http://dbus.freedesktop.org/doc/dbus-specification.html) – AllJoyn 基于本自检 XML 规范。

__三种类型的自检 XML__

细读 AllJoyn 文档后，你就会找到三种类型的自检 XML：

1. D 总线规范 XML：低开销、进程间通信，具有数据表示形式的类型格式。
2. AllJoyn 自检 XML：使用 XML 标记扩展 D 总线规范 XML，以便保持文字描述，同时还将 AllJoyn 原则应用于该规范。
3. 扩展的 AllJoyn 自检 XML：演变引入结构和字典命名类型的经典自检 XML。

AllJoyn Studio 当前支持 D 总线规范 XML 和 AllJoyn 自检 XML；此博客会指示如何创建和构建 AllJoyn 自检 XML。AllSeen 联盟的接口查看板 \(IRB\) 将新的已扩展 AllJoyn 自检用作正式提交标准化评论的格式，但不久的将来会以统一的自检 XML 格式运行。

## 自检高级别概述

每个 AllJoyn 创建器会公开宣布展现创建器的支持功能的自检 XML – 通过信号、属性和方法来描述的接口。代码生成解决方案（如其中一个 AllJoyn Studio 扩展）依赖自检 XML 创建所需代码，以便加快开发速度。自检 XML 以明确、可读的方式描述创建器的功能，以便不同的两个制造商可以使用该 XML 实现具有同一功能的创建器。借助相同的标记，之前对 AllJoyn 创建器毫无了解的开发人员应能够针对基于其 XML 的创建器进行开发。

__AllJoyn 接口__

AllJoyn 通过将自检 XML 分解成表示行为和功能的不同逻辑组的各种“接口”来实现此目的。将使用反向 DNS 约定命名 AllJoyn 接口。例如，接口“Foo”（拥有 contoso.com 域的 Contoso Ltd. 创建的接口）将按如下方式进行编写：

	<interface name="com.contoso.Foo">

创建器可以实现任意数量的接口，但必须实现它们公开的接口的每个组件。为区分和扩展行为，AllJoyn 支持针对现有接口层次结构创建新的接口，即 `com.contoso.Foo.Bar` 为 `Foo.Bar` 类别下的内容定义新功能，但对 `com.contoso.Foo` 接口没有任何明确依赖关系。

例如，我们有两个接口：`com.contoso.Sensor` 和 `com.contoso.Sensor.Humidity` –“湿度”从逻辑上讲位于“传感器”类别下。开发“湿度”创建器的某人可能选择仅支持 `com.contoso.Sensor.Humdity` 接口，但他们还可能选择支持 `com.contoso.Sensor` 接口。只要他们公开了一个接口，创建器就必须支持其所有功能。

`<description>` 标记用于描述接口、功能和参数，并可本地化为各种语言。随意使用 `<description>` 标记使 XML 更易于理解，并消除歧义。

常规做法是在接口上使用 `org.alljoyn.Bus.Secure` 批注，以支持安全和身份验证。对于强身份验证，使用预共享密钥 \(PSK\) 或证书密钥交换 \(ECDSA\)。否则，“null”身份验证将成为默认行为。**实际身份验证机制发生在实现中，而不是声明中**。此批注会支持安全性，但不指定使用的安全类型或它的实现方法。

___示例___

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

此示例介绍由设备公开的某个接口：`com.example.Door.PrivateDoor`。在该接口的范围内，我们唯一关注的事情是使用该接口时能否确保通信安全，而不是所使用的机制类型。

__接口功能__

接口使用三个接口成员声明其功能：方法、属性或信号。自检 XML 还支持描述其他功能或约束的批注。这些功能使用 UpperCamelCase 表示法，而参数使用 lowerCamelCase 表示法。

### 参数类型

接口成员发送和接收由 ASCII 类型代码表示的参数。根据接口成员的类型，可以将参数从使用器发送到创建器（方向=“输出”）或从创建器发送到使用器（方向=“输入”）。下表提供了常用类型的简要概述：

*惯用名称* | *类型代码* | *适用对象*
----------------- |:---------:| ---
**布尔型** | b | 表示 True \(1\) 或 False \(0\)。用于简单二进制信息或状态。
**BYTE** | y | 0 到 255 的整数值。在处理较小的正数时使用。
**UINT16** | q | 0 到 2^16 - 1 的整数值
**UINT32** | u | 0 到 2^32 - 1 的整数值
**UINT64** | t | 0 到 2^64 - 1 的整数值
**INT16** | n | –\(2^15\) 到 2^15 - 1 的整数值
**INT32** | i | –\(2^31\) 到 2^31 - 1 的整数值
**INT64** | x | –\(2^63\) 到 2^63 - 1 的整数值
**DOUBLE** | d | –\(2^127\) 到 2^127 - 1 的精度浮点数
**STRING** | s | UTF-8 字符串
 
有关所有受支持类型的更多详尽概述，请参阅[此处](http://dbus.freedesktop.org/doc/dbus-specification.html#idp94392448)。

编写本文时，尽可能使用 SI 单位，并清晰指示要使用的单位。对方案尽可能仔细选择类型代码；例如，如果以年为单位表示某人年龄，请使用 BYTE（而不是 UINT16 或 INT16），因为没有人的年龄会是负数或大于 255 岁。始终遵循最新的 [AllJoyn 接口查看板 \(IRB\)](https://wiki.allseenalliance.org/interfacereviewboard?s%5b%5d=interface&s%5b%5d=review&s%5b%5d=board) 指南。

下表总结了常见单位：


|*数量* | *单位*|
|---------- | ------|
|**绝对时间（日期和时间）** | 自 UNIX 时期（1970 年 1 月 1 日 00:00:00）开始的秒数|
|**当日时间** | 自午夜开始的秒数|
|**时间间隔** | 秒|
|**带宽** | 位/秒|
|**数据大小** | 字节|
 
### 方法

使用器调用方法来修改创建器的状态，并且其名称应以动词开头，因为它们表示创建器执行操作的请求。方法可以具有输入和输出参数；如果不需要发送任何返回消息，请应用批注“org.freedesktop.DBus.Method.NoReply”。但是，AllJoyn 方法通常会返回 SuccessResult 或 FailureResult，从而向使用器提供有关方法调用的反馈。参数类型必须符合 [D 总线规范](http://dbus.freedesktop.org/doc/dbus-specification.html)。

___示例（为方便起见，未包括接口信息）___

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

*注意： 大多数情况下，访问创建器的状态应使用属性，而不是方法（例如，使用 Color 属性，而不是 GetColor 方法）。*

### 属性

属性主要支持访问创建器的状态。尽管属性在技术上具有“read”、“readwrite”或“write”访问值，但状态修改功能通常属于方法 – 在这种情况下，开发人员应力争将属性保留为“read”，仅当该属性表示的状态与其他所有属性无关时才使用“readwrite”。属性应该永远不只是“write”– 在不查看的情况下就修改状态等同于方法。

必须批注属性，才可以在其值发生更改时通知使用器（或者，属性可以从其父接口继承此批注）。批注 `org.freedesktop.DBus.Property.EmitsChangedSignal` 可以具有四个值：

- “true”- 当属性发生更改时，创建器会发出信号来表示已更改的属性和新值。用于常用属性，并需要积极监管，例如门的“LockState”。
- “invalidates”- 当属性发生更改时，创建器会发出信号来表示已更改的属性（但不表示新值）。用于不需要大量监管（如衣物烘干机的“WashMode”）或表示许多数据（如容器）的属性。
- “false”- 当属性发生更改时，创建器不会发出任何信号。用于快速更新的属性，如跟踪人们搭乘地铁的地铁验票闸门的“TransitCounter”属性。如果未指定，AllJoyn 属性默认使用此值。
- “const”– 将始终不会更改值，也始终不会发出已更改信号。将在 AllJoyn 16.04 版本中引入此值，但在这之前，请使用“true”。

___示例___

展开上述示例，我们修改的 XML 包含属性（为简便起见，不包含方法）。

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

### 信号

使用信号来向使用器通知它们通过查询创建器而无法确定的事件。将通过创建器的 DoorOpen 属性（EmitsChangedProperty 标注为“true”）传递正在开门。但是，通过门的某人无法派生自任何属性更改，因此这将生成良好独立信号。我们将这些类型的事件称为“无状态”。由于信号是从创建器单向发送到使用器，因此它们只能包含“out”参数。

___示例___

（为方便起见，不包含方法和属性）：

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

由于信号具有此类较窄范围，通常很少出现在创建器的 XML 中。

### 容器

不要将多个参数组合到复杂的集合（如序列化的 JSON 字符串）中。D 总线规范会为数据的容器（STRUCT、ARRAY、VARIANT 和 DICT\_ENTRY）提供支持。使用这些容器传递需要多个基本类型的参数。

___VARIANT___

VARIANT 由类型“v”表示，可以包含任何[一个完整类型](http://dbus.freedesktop.org/doc/dbus-specification.html#term-single-complete-type)。但是，应尽可能避免使用 VARIANT，因为它们会向 XML 定义添加歧义。

___STRUCT___

STRUCT 使用“\(”和“\)”表示数据结构的开头和结尾 – 一个完整类型。这些数据结构可以嵌套。

示例：

类型“\(iii\)”表示三个整数的结构；“\(i\(ii\)\)”表示一个整数的 STRUCT 以及两个整数的 STRUCT，这不同于类型“\(\(ii\)i\)”。

___ARRAY___

ARRAY 使用类型代码“a”且必须后跟一个完整类型。ARRAY 不具有固定长度，因此它们类似于列表数据结构。ARRAY 表示一个完整类型。

示例：

类型“ai”表示整数的 ARRAY，而“aai”表示整数的 ARRAY 的 ARRAY。ARRAY 可以与 STRUCT 一起使用：“a\(ii\)”。

___DICT\_ENTRY___

DICT\_ENTRY 函数类似于 STRUCT，具有更多限制：它们使用“{”和“}”、只可以以数组元素类型的形式出现，且在大括号内必须仅包含两个完整类型。第一个类型在字典数据结构中表示“键”，而第二个类型在字典的键-值对中表示“值”。键在字典中应唯一。

示例：

类型 a{sy} 表示字符串“键”和字节“值”的字典。使用 <description> 标记描述有效键和值。

__最终示例和 ajxmlcop__

容器概念改进了现有 XML 的功能并为新的有用接口成员提供了一个渠道。

完成编写 XML 后，请使用 ajxmlcop.exe 命令行工具（可以在 AllJoyn [git 源](https://git.allseenalliance.org/cgit/core/alljoyn.git/)或[此处](https://github.com/MS-brock/AllJoynToasterDemo)获得）验证 XML。将 ajxmlcop.exe 与你的 XML 文件一起使用作为输入参数（例如，`C:\>ajxmlcop.exe doorExample.xml`），以接收错误、警告和告知性消息。此工具就 XML 的结构和格式以及信号、属性和方法的使用提供有价值的反馈。

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

