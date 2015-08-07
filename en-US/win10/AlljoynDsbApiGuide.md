---
layout: default
title: Alljoyn Device System Bridge - API Guide
permalink: /en-US/win10/BridgeToAlljoynMapping.htm
lang: en-US
---

<html>

<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta name=Generator content="Microsoft Word 15 (filtered)">

<style id="dynCom" type="text/css"><!-- --></style>
<script language="JavaScript"><!--
function msoCommentShow(anchor_id, com_id)
{
	if(msoBrowserCheck()) 
		{
		c = document.all(com_id);
		a = document.all(anchor_id);
		if (null != c && null == c.length && null != a && null == a.length)
			{
			var cw = c.offsetWidth;
			var ch = c.offsetHeight;
			var aw = a.offsetWidth;
			var ah = a.offsetHeight;
			var x  = a.offsetLeft;
			var y  = a.offsetTop;
			var el = a;
			while (el.tagName != "BODY") 
				{
				el = el.offsetParent;
				x = x + el.offsetLeft;
				y = y + el.offsetTop;
				}
			var bw = document.body.clientWidth;
			var bh = document.body.clientHeight;
			var bsl = document.body.scrollLeft;
			var bst = document.body.scrollTop;
			if (x + cw + ah / 2 > bw + bsl && x + aw - ah / 2 - cw >= bsl ) 
				{ c.style.left = x + aw - ah / 2 - cw; }
			else 
				{ c.style.left = x + ah / 2; }
			if (y + ch + ah / 2 > bh + bst && y + ah / 2 - ch >= bst ) 
				{ c.style.top = y + ah / 2 - ch; }
			else 
				{ c.style.top = y + ah / 2; }
			c.style.visibility = "visible";
}	}	}
function msoCommentHide(com_id) 
{
	if(msoBrowserCheck())
		{
		c = document.all(com_id);
		if (null != c && null == c.length)
		{
		c.style.visibility = "hidden";
		c.style.left = -1000;
		c.style.top = -1000;
		} } 
}
function msoBrowserCheck()
{
	ms = navigator.appVersion.indexOf("MSIE");
	vers = navigator.appVersion.substring(ms + 5, ms + 6);
	ie4 = (ms > 0) && (parseInt(vers) >= 4);
	return ie4;
}
if (msoBrowserCheck())
{
	document.styleSheets.dynCom.addRule(".msocomanchor","background: infobackground");
	document.styleSheets.dynCom.addRule(".msocomoff","display: none");
	document.styleSheets.dynCom.addRule(".msocomtxt","visibility: hidden");
	document.styleSheets.dynCom.addRule(".msocomtxt","position: absolute");
	document.styleSheets.dynCom.addRule(".msocomtxt","top: -1000");
	document.styleSheets.dynCom.addRule(".msocomtxt","left: -1000");
	document.styleSheets.dynCom.addRule(".msocomtxt","width: 33%");
	document.styleSheets.dynCom.addRule(".msocomtxt","background: infobackground");
	document.styleSheets.dynCom.addRule(".msocomtxt","color: infotext");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-top: 1pt solid threedlightshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-right: 2pt solid threedshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-bottom: 2pt solid threedshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","border-left: 1pt solid threedlightshadow");
	document.styleSheets.dynCom.addRule(".msocomtxt","padding: 3pt 3pt 3pt 3pt");
	document.styleSheets.dynCom.addRule(".msocomtxt","z-index: 100");
}
// --></script>
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
	{font-family:"Calibri Light";
	panose-1:2 15 3 2 2 2 4 3 2 4;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
	{font-family:"Segoe UI";
	panose-1:2 11 5 2 4 2 4 2 2 3;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
h1
	{mso-style-link:"Heading 1 Char";
	margin-top:12.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	page-break-after:avoid;
	font-size:16.0pt;
	font-family:"Calibri Light",sans-serif;
	color:#2E74B5;
	font-weight:normal;}
h2
	{mso-style-link:"Heading 2 Char";
	margin-top:2.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	page-break-after:avoid;
	font-size:13.0pt;
	font-family:"Calibri Light",sans-serif;
	color:#2E74B5;
	font-weight:normal;}
h3
	{mso-style-link:"Heading 3 Char";
	margin-top:2.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	page-break-after:avoid;
	font-size:12.0pt;
	font-family:"Calibri Light",sans-serif;
	color:#1F4D78;
	font-weight:normal;}
p.MsoCommentText, li.MsoCommentText, div.MsoCommentText
	{mso-style-link:"Comment Text Char";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoCommentSubject, li.MsoCommentSubject, div.MsoCommentSubject
	{mso-style-link:"Comment Subject Char";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;
	font-weight:bold;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-link:"Balloon Text Char";
	margin:0in;
	margin-bottom:.0001pt;
	font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;}
span.Heading1Char
	{mso-style-name:"Heading 1 Char";
	mso-style-link:"Heading 1";
	font-family:"Calibri Light",sans-serif;
	color:#2E74B5;}
span.Heading2Char
	{mso-style-name:"Heading 2 Char";
	mso-style-link:"Heading 2";
	font-family:"Calibri Light",sans-serif;
	color:#2E74B5;}
span.Heading3Char
	{mso-style-name:"Heading 3 Char";
	mso-style-link:"Heading 3";
	font-family:"Calibri Light",sans-serif;
	color:#1F4D78;}
span.CommentTextChar
	{mso-style-name:"Comment Text Char";
	mso-style-link:"Comment Text";}
span.CommentSubjectChar
	{mso-style-name:"Comment Subject Char";
	mso-style-link:"Comment Subject";
	font-weight:bold;}
span.BalloonTextChar
	{mso-style-name:"Balloon Text Char";
	mso-style-link:"Balloon Text";
	font-family:"Segoe UI",sans-serif;}
.MsoChpDefault
	{font-family:"Calibri",sans-serif;}
.MsoPapDefault
	{margin-bottom:8.0pt;
	line-height:107%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->
</style>

</head>

<body lang=EN-US>

<div class=WordSection1>

<h1>Mapping Bridge Interface Objects to Alljoyn:<br>
IAdapter</h1>

<p class=MsoNormal>From the bridge’s perspective, an IAdapter represents the controller
for a system of one or more devices that map to the AllJoyn bus.  IAdapter declares
interfaces necessary to support device enumeration, general configuration and
life-cycle management.  It also declares methods interacting with a device or
device(s) properties, methods and signals.</p>

<p class=MsoNormal>To expose your device(s) as an AllJoyn service, it is
necessary to implement a concrete class that inherits from IAdapter.  How each
interface is implemented depends on the nature of the device(s) that you are
adapting to AllJoyn.</p>

<p class=MsoNormal>Your adapter will appear on the AllJoyn bus as an AllJoyn service
advertised with the following name:</p>

<p class=MsoNormal style='text-indent:.5in'>{ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName}</p>

<p class=MsoNormal>Each adapter exposes two
com.microsoft.alljoynmanagement.config interfaces that support bridge and
adapter configuration:</p>

<p class=MsoNormal>                /AdapterConfig</p>

<p class=MsoNormal>                /BusConfig.</p>

<p class=MsoNormal>The IAdapter interface declares certain properties that must
be implemented.  The following table describes those properties and how they
map to AllJoyn</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b><span style='font-size:9.0pt'>IAdapter Property</span></b></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b><span style='font-size:9.0pt'>Bridge Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AdapterName</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Model of this adapter.  Also the suffix
  used for this adapter’s advertised name. (See ExposedAdapterPrefix.)</span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Model Number</span></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>ExposedAdapterPrefix</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Prefix used when creating the advertised
  name of this bridge on the AllJoyn bus.  The adapter will be exposed with the
  following name: {ExposedAdapterPrefix}.DeviceSystemBridge.{AdapterName}.  </span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn Bus Attachment’s Advertised Name</span></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>ExposedApplciationGUID</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>A GUID, provided by your adapter, that
  uniquely identifies this adapter.  This GUID also applies to the about data
  for all devices managed by this adapter.</span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Application ID for
  this adapter and all devices that are exposed by this adapter.</span></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>ExposedApplicationName</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>A friendly application name that is
  exposed by this adapter.  This name also applies to all devices managed by
  this adapter.</span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Application Name for
  this adapter and all devices that are exposed by this adapter.</span></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Vendor</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Vendor name of this adapter</span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Manufacturer</span></p>
  </td>
 </tr>
 <tr>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Version</span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Software version of this adapter</span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data SW Version</span></p>
  </td>
 </tr>
</table>

<h3>&nbsp;</h3>

<h3>IAdapter::Initialize</h3>

<p class=MsoNormal>Initializes your adapter. This can be used anyway you need. 
For example, a background thread could be launched to start device discovery. 
Typically this is also used to create a Device Arrival and Device Removal
Signals.</p>

<h3>IAdapter::GetConfig / IAdapter::SetConfig</h3>

<p class=MsoNormal>This pair of methods are used for accessing your adapter’s
configuration data.  Typically, these settings consist of communication
settings that your adapter needs for device enumeration, but they are not
limited to that purpose. </p>

<p class=MsoNormal>The bridge exposes adapter configuration data to AllJoyn
through the “com.microsoft.alljoynmanagement.config” interface.  From the bridge’s
perspective, adapter configuration data settings are completely arbitrary and
are exchanged with the adapter as a simple byte array.  Internally to the
adapter, you may store these settings as desired.  </p>

<h3>IAdapter::EnumDevices</h3>

<p class=MsoNormal>This method provides the bridge with information about
devices available on your bus.  The list of devices returned to the bridge are
added to the AllJoyn bus as individual AllJoyn Services.</p>

<p class=MsoNormal>A list must be returned through this method, but if the
enumeration hasn’t completed an IAdapterIoRequest may also be returned here. 
The bridge will wait on this until your adapter signals the IAdapterIoRequest
to complete device enumeration.  </p>

<h1>IAdapterDevice</h1>

<p class=MsoNormal>From the bridge’s perspective a device represents a device
that you, the adapter implementer, want exposed to the AllJoyn bus as an
AllJoyn Service.  What properties, methods and signals the device exposes to
the bus are up to you as the implementer, but typically this would be a direct
mapping of properties, methods and signals that your device or devices inherently
expose over their native communications network.</p>

<p class=MsoNormal>Each IAdapterDevice is advertised to alljoyn with the
following name:</p>

<p class=MsoNormal style='margin-left:.5in'><i>{ExposedAdapterPrefix}.{AdapterName}.{Name}</i></p>

<p class=MsoNormal>Each device exposes a single alljoyn interface for exposing
all properties, method and signals encapsulated by the device.  The alljoyn
interface name is:</p>

<p class=MsoNormal style='text-indent:.5in'><i>{ExposedAdapterPrefix}.{AdapterName}.{Name}.MainInterface</i></p>

<p class=MsoNormal>Similar to an IAdapter, each IAdapterDevice is required to
implement properties that the bridge uses to expose your device to AllJoyn. 
The following table describes each property and how the bridge maps it to
allJoyn.</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>IAdapterDevice
  Property</span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Bridge
  Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>ControlPanelHandler</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>A control panel
  that can operate this device.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Exposed as a an org.alljoyn.ControlPanel.ControlPanel
  under a /ControlPanel bus object</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Description</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>A description of
  this device.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data Description</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>FirmwareVersion</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Software version
  of this device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data Firmware Version</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Icon</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>A graphical icon
  that this device exposes to alljoyn.   This can be null if there is no icon. 
  </span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Exposed as a
  standard AllJoyn About Icon</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Methods</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>This is the set
  all Methods that your device exposes to AllJoyn.  This can be empty if there
  are no methods.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Exposed as
  methods under the MainInterface with each method’s name.  Non-unique names
  are appended with a unique ID.</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Model</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Model of this
  device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn Bus Data
  Model Number</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name of this
  device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data Device Name.  This is also used for the suffic for this device’s
  advertised name: {ExposedAdapterPrefix}.{AdapterName}.{Name}</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Properties</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>This is the set
  of all properties that your device exposes to AllJoyn.    This can be empty
  if there are no properties, but if this is not empty, then at least one
  signal, the Change of Value signal must also be supported.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>See IProperty</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>SerialNumber</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Serial Number of
  this device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data Serial Number</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Signals</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>This is the set
  of all signals that this device exposes to AllJoyn. </span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Exposed as
  AllJoyn Signals</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Vendor</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Vendor name of
  this device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data Manufacturer</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Version</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Software version
  of this device</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn About
  Data SW Version</span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal>&nbsp;</p>

<h1>IAdapterProperty</h1>

<p class=MsoNormal>From the bridge’s perspective an IAdapterProperty represents
a collection of related data values that you, the adapter implementer, want to expose
to the AllJoyn bus for a specific device.  Each property contains a set of one
or more IAdapterValues.  Each IAdapterValue represents an individual unit of
data that can be accessed by an AllJoyn client.    </p>

<p class=MsoNormal>Each IAdapterProperty is announced to Alljoyn as a bus
object with an interface name as follows:</p>

<p class=MsoNormal>                <i>/{PropertyName}</i></p>

<p class=MsoNormal style='margin-left:.5in'><i>{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}</i></p>

<p class=MsoNormal>Alternatively, the interface name can be overridden by the
property to map to a specific interface type.  In that case, the IAdapterProperty
name is announced as a bus object with an interface name as follows:</p>

<p class=MsoNormal>                <i>/{PropertyName}</i></p>

<p class=MsoNormal style='margin-left:.5in'><i>{InterfaceHint}</i></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>IAdapterProperty
  Properties</span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Bridge
  Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Attributes</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Collection of IAdapterAttributes
  </span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn </span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>InterfaceHint</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>An override for
  this property that can be used to map this property to some other well known
  interface type.  Return null to use the default behavior</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn
  Interface name for this Property (if specified)</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name of Property</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn Property</span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in'>&nbsp;</p>

<h1>IAdapterAttribute</h1>

<p class=MsoNormal>An IAdapterAttribute is a key-value pair of data.  This is the
child of an Alljoyn property.  Each IAdapterAttribute is exposed as the child of
an AllJoyn property with the following bus object and interface name:  </p>

<p class=MsoNormal>/{PropertyName}/{ValueName}</p>

<p class=MsoNormal style='margin-left:.5in'>{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}.{AttributeName}</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>IAdapterValue
  Properties</span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Bridge
  Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AccessType</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Indicates how
  this attribute can be accessed on the device: Read Only/</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>An AllJoyn
  annotation’s access type</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Data</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>The actual
  variant data item.  This value is the physical value of a property on the
  device.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>An AllJoyn
  annotation’s data value</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>The name of a
  data item</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>An AllJoyn
  annotation’s name</span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal>&nbsp;</p>

<h1>IAdapterSignal</h1>

<p class=MsoNormal>From the bridge’s perspective an ISignal represents an event
that your device can raise when something changes.  All devices typically have
a Change of Value signal.  This signal alerts AllJoyn clients that one or more
properties have changed on a device.  Additional signals may also be supported.</p>

<p class=MsoNormal>Each ISignal is announced to AllJoyn as a <i>Hosted Session</i>
signal for a device with the signals Name.  </p>

<p class=MsoNormal>The following properties must be implemented for an ISignal</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>ISignal Property</span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Bridge
  Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name of Signal</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>AllJoyn Signal</span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Params</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>A set of objects
  that changed and their new values, or null if this is a pure signal.</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Maps to an array
  of alljoyn signal arguments passed to the signal.</span></p>
  </td>
 </tr>
</table>

<h1>IAdapterValue</h1>

<p class=MsoNormal>Each IAdapterValue is exposed as a child of an AllJoyn
property with the following bus object and interface name:</p>

<p class=MsoNormal>                /{PropertyName}/{ValueName}</p>

<p class=MsoNormal style='margin-left:.5in'>{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}.{ValueName}</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>IAdapterValue
  Properties</span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Description</span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;background:#D0CECE;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><b><span style='font-size:9.0pt'>Bridge
  Mapping</span></b></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Data</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>The data
  associated with this value </span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><a><s><span style='font-size:9.0pt'>AllJoyn
  Annotation’s Value</span></s></a><span class=MsoCommentReference><s><span
  style='font-size:8.0pt'><a class=msocomanchor id="_anchor_1"
  onmouseover="msoCommentShow('_anchor_1','_com_1')"
  onmouseout="msoCommentHide('_com_1')" href="#_msocom_1" language=JavaScript
  name="_msoanchor_1">[NG1]</a>&nbsp;</span></s></span></p>
  </td>
 </tr>
 <tr>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name</span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><span style='font-size:9.0pt'>Name of Value</span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;page-break-after:avoid'><a><s><span style='font-size:9.0pt'>AllJoyn Annotation’s
  Name</span></s></a><span class=MsoCommentReference><s><span style='font-size:
  8.0pt'><a class=msocomanchor id="_anchor_2"
  onmouseover="msoCommentShow('_anchor_2','_com_2')"
  onmouseout="msoCommentHide('_com_2')" href="#_msocom_2" language=JavaScript
  name="_msoanchor_2">[NG2]</a>&nbsp;</span></s></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in'>&nbsp;</p>

<p class=MsoNormal>&nbsp;</p>

</div>

<div>

<hr class=msocomoff align=left size=1 width="33%">

<div>

<div id="_com_1" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_1','_com_1')"
onmouseout="msoCommentHide('_com_1')"><a name="_msocom_1"></a>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'>&nbsp;<a href="#_msoanchor_1" class=msocomoff>[NG1]</a></span></span>AllJoyn
property (and not annotation)</p>

</div>

</div>

<div>

<div id="_com_2" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_2','_com_2')"
onmouseout="msoCommentHide('_com_2')"><a name="_msocom_2"></a>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'>&nbsp;<a href="#_msoanchor_2" class=msocomoff>[NG2]</a></span></span>Name
of the AllJoyn property</p>

</div>

</div>

</div>

</body>

</html>
