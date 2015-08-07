---
layout: default
title: Alljoyn Device System Bridge - API Guide
permalink: /en-US/win10/BridgeToAlljoynMapping.htm
lang: en-US
---


<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 15">
<meta name=Originator content="Microsoft Word 15">
<link rel=File-List
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/filelist.xml">
<!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Author>Jon Slobodzian</o:Author>
  <o:LastAuthor>Jon Slobodzian</o:LastAuthor>
  <o:Revision>2</o:Revision>
  <o:TotalTime>250</o:TotalTime>
  <o:Created>2015-08-07T21:04:00Z</o:Created>
  <o:LastSaved>2015-08-07T21:04:00Z</o:LastSaved>
  <o:Pages>5</o:Pages>
  <o:Words>1418</o:Words>
  <o:Characters>8085</o:Characters>
  <o:Company>Microsoft IT</o:Company>
  <o:Lines>67</o:Lines>
  <o:Paragraphs>18</o:Paragraphs>
  <o:CharactersWithSpaces>9485</o:CharactersWithSpaces>
  <o:Version>15.00</o:Version>
 </o:DocumentProperties>
 <o:CustomDocumentProperties>
  <o:ContentTypeId dt:dt="string">0x010100A945E701F9DBEE429A1721B3195BD03F</o:ContentTypeId>
 </o:CustomDocumentProperties>
 <o:OfficeDocumentSettings>
  <o:AllowPNG/>
 </o:OfficeDocumentSettings>
</xml><![endif]-->
<link rel=dataStoreItem
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/item0001.xml"
target="Mapping%20your%20Adapter%20to%20AllJoyn_files/props002.xml">
<link rel=dataStoreItem
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/item0003.xml"
target="Mapping%20your%20Adapter%20to%20AllJoyn_files/props004.xml">
<link rel=dataStoreItem
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/item0005.xml"
target="Mapping%20your%20Adapter%20to%20AllJoyn_files/props006.xml">
<link rel=dataStoreItem
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/item0007.xml"
target="Mapping%20your%20Adapter%20to%20AllJoyn_files/props008.xml">
<link rel=themeData
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/themedata.thmx">
<link rel=colorSchemeMapping
href="Mapping%20your%20Adapter%20to%20AllJoyn_files/colorschememapping.xml">
<![if !supportAnnotations]>
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
<![endif]>
<style>
<!--
 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;
	mso-font-charset:2;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:0 268435456 0 0 -2147483648 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:1;
	mso-generic-font-family:roman;
	mso-font-format:other;
	mso-font-pitch:variable;
	mso-font-signature:0 0 0 0 0 0;}
@font-face
	{font-family:"Calibri Light";
	panose-1:2 15 3 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-1610611985 1073750139 0 0 415 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073786111 1 0 415 0;}
@font-face
	{font-family:"Segoe UI";
	panose-1:2 11 5 2 4 2 4 2 2 3;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-469750017 -1073683329 9 0 511 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
h1
	{mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-link:"Heading 1 Char";
	mso-style-next:Normal;
	margin-top:12.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:1;
	font-size:16.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#2E74B5;
	mso-themecolor:accent1;
	mso-themeshade:191;
	mso-font-kerning:0pt;
	font-weight:normal;}
h2
	{mso-style-priority:9;
	mso-style-qformat:yes;
	mso-style-link:"Heading 2 Char";
	mso-style-next:Normal;
	margin-top:2.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:2;
	font-size:13.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#2E74B5;
	mso-themecolor:accent1;
	mso-themeshade:191;
	font-weight:normal;}
h3
	{mso-style-priority:9;
	mso-style-qformat:yes;
	mso-style-link:"Heading 3 Char";
	mso-style-next:Normal;
	margin-top:2.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	line-height:107%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:3;
	font-size:12.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#1F4D78;
	mso-themecolor:accent1;
	mso-themeshade:127;
	font-weight:normal;}
p.MsoCommentText, li.MsoCommentText, div.MsoCommentText
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-link:"Comment Text Char";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	mso-pagination:widow-orphan;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
span.MsoCommentReference
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-ansi-font-size:8.0pt;
	mso-bidi-font-size:8.0pt;}
p.MsoCommentSubject, li.MsoCommentSubject, div.MsoCommentSubject
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:"Comment Text";
	mso-style-link:"Comment Subject Char";
	mso-style-next:"Comment Text";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:8.0pt;
	margin-left:0in;
	mso-pagination:widow-orphan;
	font-size:10.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;
	font-weight:bold;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-link:"Balloon Text Char";
	margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;}
span.Heading1Char
	{mso-style-name:"Heading 1 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 1";
	mso-ansi-font-size:16.0pt;
	mso-bidi-font-size:16.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#2E74B5;
	mso-themecolor:accent1;
	mso-themeshade:191;}
span.Heading2Char
	{mso-style-name:"Heading 2 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 2";
	mso-ansi-font-size:13.0pt;
	mso-bidi-font-size:13.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#2E74B5;
	mso-themecolor:accent1;
	mso-themeshade:191;}
span.Heading3Char
	{mso-style-name:"Heading 3 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 3";
	mso-ansi-font-size:12.0pt;
	mso-bidi-font-size:12.0pt;
	font-family:"Calibri Light",sans-serif;
	mso-ascii-font-family:"Calibri Light";
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:"Calibri Light";
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#1F4D78;
	mso-themecolor:accent1;
	mso-themeshade:127;}
span.CommentTextChar
	{mso-style-name:"Comment Text Char";
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Comment Text";
	mso-ansi-font-size:10.0pt;
	mso-bidi-font-size:10.0pt;}
span.CommentSubjectChar
	{mso-style-name:"Comment Subject Char";
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-parent:"Comment Text Char";
	mso-style-link:"Comment Subject";
	mso-ansi-font-size:10.0pt;
	mso-bidi-font-size:10.0pt;
	font-weight:bold;}
span.BalloonTextChar
	{mso-style-name:"Balloon Text Char";
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Balloon Text";
	mso-ansi-font-size:9.0pt;
	mso-bidi-font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;
	mso-ascii-font-family:"Segoe UI";
	mso-hansi-font-family:"Segoe UI";
	mso-bidi-font-family:"Segoe UI";}
span.msoIns
	{mso-style-type:export-only;
	mso-style-name:"";
	text-decoration:underline;
	text-underline:single;
	color:teal;}
span.msoDel
	{mso-style-type:export-only;
	mso-style-name:"";
	text-decoration:line-through;
	color:red;}
span.msoChangeProp
	{mso-style-type:export-only;
	mso-style-name:"";}
span.SpellE
	{mso-style-name:"";
	mso-spl-e:yes;}
span.GramE
	{mso-style-name:"";
	mso-gram-e:yes;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
.MsoPapDefault
	{mso-style-type:export-only;
	margin-bottom:8.0pt;
	line-height:107%;}
@page WordSection1
	{size:8.5in 11.0in;
	margin:1.0in 1.0in 1.0in 1.0in;
	mso-header-margin:.5in;
	mso-footer-margin:.5in;
	mso-paper-source:0;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 @list l0
	{mso-list-id:1823110044;
	mso-list-type:hybrid;
	mso-list-template-ids:-326890800 1342280 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
@list l0:level1
	{mso-level-start-at:0;
	mso-level-number-format:bullet;
	mso-level-text:-;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Calibri",sans-serif;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:minor-bidi;}
@list l0:level2
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level3
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level4
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level5
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level6
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l0:level7
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l0:level8
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l0:level9
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->
</style>
<!--[if gte mso 10]>
<style>
 /* Style Definitions */
 table.MsoNormalTable
	{mso-style-name:"Table Normal";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-parent:"";
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-para-margin-top:0in;
	mso-para-margin-right:0in;
	mso-para-margin-bottom:8.0pt;
	mso-para-margin-left:0in;
	line-height:107%;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;}
table.MsoTableGrid
	{mso-style-name:"Table Grid";
	mso-tstyle-rowband-size:0;
	mso-tstyle-colband-size:0;
	mso-style-priority:39;
	mso-style-unhide:no;
	border:solid windowtext 1.0pt;
	mso-border-alt:solid windowtext .5pt;
	mso-padding-alt:0in 5.4pt 0in 5.4pt;
	mso-border-insideh:.5pt solid windowtext;
	mso-border-insidev:.5pt solid windowtext;
	mso-para-margin:0in;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;}
</style>
<![endif]--><!--[if gte mso 9]><xml>
 <o:shapedefaults v:ext="edit" spidmax="1026"/>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <o:shapelayout v:ext="edit">
  <o:idmap v:ext="edit" data="1"/>
 </o:shapelayout></xml><![endif]-->
</head>

<body lang=EN-US style='tab-interval:.5in'>

<div class=WordSection1>

<h1>Mapping Bridge Interface Objects to <span class=SpellE>Alljoyn</span>:</h1>

<h2><br>
<span class=SpellE>IAdapter</span></h2>

<p class=MsoNormal>From the bridge’s perspective, an <span class=SpellE>IAdapter</span>
represents the controller for a system of one or more devices that map to the
AllJoyn bus.<span style='mso-spacerun:yes'>  </span><span class=SpellE>IAdapter</span>
declares interfaces necessary to support device enumeration, general configuration
and life-cycle management.<span style='mso-spacerun:yes'>  </span>It also
declares methods interacting with a device or device(s) properties, methods and
signals.</p>

<p class=MsoNormal>To expose your device(s) as an AllJoyn service, it is
necessary to implement a concrete class that inherits from <span class=SpellE>IAdapter</span>.<span
style='mso-spacerun:yes'>  </span>How each interface is implemented depends on
the nature of the device(s) that you are adapting to AllJoyn.</p>

<p class=MsoNormal>Your adapter will appear on the AllJoyn bus as an AllJoyn service
advertised with the following name:</p>

<p class=MsoNormal style='text-indent:.5in'>{<span class=SpellE>ExposedAdapterPrefix</span>}.<span
class=SpellE>DeviceSystemBridge</span><span class=GramE>.{</span><span
class=SpellE>AdapterName</span>}</p>

<p class=MsoNormal>Each adapter exposes two
com.microsoft.alljoynmanagement.config interfaces that support bridge and
adapter configuration:</p>

<p class=MsoNormal><span style='mso-tab-count:1'>                </span>/<span
class=SpellE>AdapterConfig</span></p>

<p class=MsoNormal><span style='mso-tab-count:1'>                </span>/<span
class=SpellE>BusConfig</span>.</p>

<p class=MsoNormal>The <span class=SpellE>IAdapter</span> interface declares
certain properties that must be implemented.<span style='mso-spacerun:yes'> 
</span>The following table describes those properties and how they map to
AllJoyn</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span class=SpellE><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'>IAdapter</span></b></span><b style='mso-bidi-font-weight:
  normal'><span style='font-size:9.0pt'> Property<o:p></o:p></span></b></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Description<o:p></o:p></span></b></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><b style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Bridge
  Mapping<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span class=SpellE><span style='font-size:9.0pt'>AdapterName</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Model of this adapter.<span
  style='mso-spacerun:yes'>  </span>Also the suffix used for this adapter’s
  advertised name. (See <span class=SpellE>ExposedAdapterPrefix</span>.)<o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Model Number<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span class=SpellE><span style='font-size:9.0pt'>ExposedAdapterPrefix</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Prefix used when creating the advertised
  name of this bridge on the AllJoyn bus.<span style='mso-spacerun:yes'> 
  </span>The adapter will be exposed with the following name: {<span
  class=SpellE>ExposedAdapterPrefix</span>}.<span class=SpellE>DeviceSystemBridge</span><span
  class=GramE>.{</span><span class=SpellE>AdapterName</span>}.<span
  style='mso-spacerun:yes'>  </span><o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn Bus Attachment’s Advertised Name<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span class=SpellE><span style='font-size:9.0pt'>ExposedApplciationGUID</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>A GUID, provided by your adapter, that
  uniquely identifies this adapter.<span style='mso-spacerun:yes'>  </span>This
  GUID also applies to the about data for all devices managed by this adapter.<o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Application ID for
  this adapter and all devices that are exposed by this adapter.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span class=SpellE><span style='font-size:9.0pt'>ExposedApplicationName</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>A friendly application name that is
  exposed by this adapter.<span style='mso-spacerun:yes'>  </span>This name
  also applies to all devices managed by this adapter.<o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Application Name for
  this adapter and all devices that are exposed by this adapter.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Vendor<o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Vendor name of this adapter<o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data Manufacturer<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes'>
  <td width=155 valign=top style='width:116.1pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Version<o:p></o:p></span></p>
  </td>
  <td width=289 valign=top style='width:216.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>Software version of this adapter<o:p></o:p></span></p>
  </td>
  <td width=180 valign=top style='width:134.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:9.0pt'>AllJoyn About Data SW Version<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<h3><o:p>&nbsp;</o:p></h3>

<h3><span class=SpellE>IAdapter</span>::Initialize</h3>

<p class=MsoNormal>Initializes your adapter. This can be used anyway you need.<span
style='mso-spacerun:yes'>  </span>For example, a background thread could be
launched to start device discovery.<span style='mso-spacerun:yes'> 
</span>Typically this is also used to create a Device Arrival and Device
Removal Signals.</p>

<h3><span class=SpellE>IAdapter</span>::<span class=SpellE>GetConfig</span> / <span
class=SpellE>IAdapter</span>::<span class=SpellE>SetConfig</span></h3>

<p class=MsoNormal>This pair of methods are used for accessing your adapter’s
configuration data.<span style='mso-spacerun:yes'>  </span>Typically, these
settings consist of communication settings that your adapter needs for device
enumeration, but they are not limited to that purpose. </p>

<p class=MsoNormal>The bridge exposes adapter configuration data to AllJoyn
through the “com.microsoft.alljoynmanagement.config” interface.<span
style='mso-spacerun:yes'>  </span>From the bridge’s perspective, adapter
configuration data settings are completely arbitrary and are exchanged with the
adapter as a simple byte array.<span style='mso-spacerun:yes'> 
</span>Internally to the adapter, you may store these settings as desired.<span
style='mso-spacerun:yes'>  </span></p>

<h3><span class=SpellE>IAdapter</span>::<span class=SpellE>EnumDevices</span></h3>

<p class=MsoNormal>This method provides the bridge with information about
devices available on your bus.<span style='mso-spacerun:yes'>  </span>The list
of devices returned to the bridge are added to the AllJoyn bus as individual
AllJoyn Services.</p>

<p class=MsoNormal>A list must be returned through this method, but if the
enumeration hasn’t completed an <span class=SpellE>IAdapterIoRequest</span> may
also be returned here.<span style='mso-spacerun:yes'>  </span>The bridge will
wait on this until your adapter signals the <span class=SpellE>IAdapterIoRequest</span>
to complete device enumeration.<span style='mso-spacerun:yes'>  </span></p>

<h1><span class=SpellE>IAdapterDevice</span></h1>

<p class=MsoNormal>From the bridge’s perspective a device represents a device
that you, the adapter implementer, want exposed to the AllJoyn bus as an
AllJoyn Service.<span style='mso-spacerun:yes'>  </span>What properties,
methods and signals the device exposes to the bus are up to you as the
implementer, but typically this would be a direct mapping of properties,
methods and signals that your device or devices inherently expose over their
native communications network.</p>

<p class=MsoNormal>Each <span class=SpellE>IAdapterDevice</span> is advertised
to <span class=SpellE>alljoyn</span> with the following name:</p>

<p class=MsoNormal style='margin-left:.5in'><i style='mso-bidi-font-style:normal'>{<span
class=SpellE>ExposedAdapterPrefix</span>}<span class=GramE>.{</span><span
class=SpellE>AdapterName</span>}.{Name}<o:p></o:p></i></p>

<p class=MsoNormal>Each device exposes a single <span class=SpellE>alljoyn</span>
interface for exposing all properties, method and signals encapsulated by the
device.<span style='mso-spacerun:yes'>  </span>The <span class=SpellE>alljoyn</span>
interface name is:</p>

<p class=MsoNormal style='text-indent:.5in'><i style='mso-bidi-font-style:normal'>{<span
class=SpellE>ExposedAdapterPrefix</span>}<span class=GramE>.{</span><span
class=SpellE>AdapterName</span>}.{Name}.<span class=SpellE>MainInterface</span><o:p></o:p></i></p>

<p class=MsoNormal>Similar to an <span class=SpellE>IAdapter</span>, each <span
class=SpellE>IAdapterDevice</span> is required to implement properties that the
bridge uses to expose your device to AllJoyn.<span style='mso-spacerun:yes'> 
</span>The following table describes each property and how the bridge maps it
to <span class=SpellE>allJoyn</span>.</p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'>IAdapterDevice</span></b></span><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'> Property<o:p></o:p></span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Description<o:p></o:p></span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Bridge
  Mapping<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'>ControlPanelHandler</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>A control panel that can operate this device.<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Exposed as a an <span class=SpellE>org.alljoyn.ControlPanel.ControlPanel</span>
  under a /<span class=SpellE>ControlPanel</span> bus object<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Description<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>A description of this device.<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data Description<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'>FirmwareVersion</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Software version of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data Firmware Version<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Icon<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>A graphical icon that this device exposes to <span
  class=SpellE>alljoyn</span>.<span style='mso-spacerun:yes'>   </span>This can
  be null if there is no icon.<span style='mso-spacerun:yes'>  </span><o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Exposed as a standard AllJoyn About Icon<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Methods<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>This is the set all Methods that your device exposes
  to AllJoyn.<span style='mso-spacerun:yes'>  </span>This can be empty if there
  are no methods.<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Exposed as methods under the <span class=SpellE>MainInterface</span>
  with each method’s name.<span style='mso-spacerun:yes'>  </span>Non-unique
  names are appended with a unique ID.<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Model<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Model of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn Bus Data Model Number<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data Device Name.<span
  style='mso-spacerun:yes'>  </span>This is also used for the <span
  class=SpellE>suffic</span> for this device’s advertised name: {<span
  class=SpellE>ExposedAdapterPrefix</span>}.{<span class=SpellE>AdapterName</span>}.{Name}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Properties<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>This is the set of all properties that your device
  exposes to AllJoyn.<span style='mso-spacerun:yes'>  </span><span
  style='mso-spacerun:yes'>  </span>This can be empty if there are no
  properties, but if this is not empty, then at least one signal, the Change of
  Value signal must also be supported.<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>See <span class=SpellE>IProperty</span><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:9'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'>SerialNumber</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Serial Number of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data Serial Number<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:10'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Signals<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>This is the set of all signals that this device
  exposes to AllJoyn. <o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Exposed as AllJoyn Signals<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:11'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Vendor<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Vendor name of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data Manufacturer<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:12;mso-yfti-lastrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Version<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Software version of this device<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn About Data SW Version<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<h1><span class=SpellE>IAdapterProperty</span></h1>

<p class=MsoNormal>From the bridge’s perspective an <span class=SpellE>IAdapterProperty</span>
represents a collection of related data values that you, the adapter
implementer, want to expose to the AllJoyn bus for a specific device.<span
style='mso-spacerun:yes'>  </span>Each property contains a set of one or more <span
class=SpellE>IAdapterValues</span>.<span style='mso-spacerun:yes'>  </span>Each
<span class=SpellE>IAdapterValue</span> represents an individual unit of data
that can be accessed by an AllJoyn client.<span style='mso-spacerun:yes'>  
</span><span style='mso-spacerun:yes'> </span></p>

<p class=MsoNormal>Each <span class=SpellE>IAdapterProperty</span> is announced
to <span class=SpellE>Alljoyn</span> as a bus object with an interface name as
follows:</p>

<p class=MsoNormal><span style='mso-tab-count:1'>                </span><span
class=GramE><i style='mso-bidi-font-style:normal'>/{</i></span><span
class=SpellE><i style='mso-bidi-font-style:normal'>PropertyName</i></span><i
style='mso-bidi-font-style:normal'>}<o:p></o:p></i></p>

<p class=MsoNormal style='margin-left:.5in'><i style='mso-bidi-font-style:normal'>{<span
class=SpellE>ExposedAdapterPrefix</span>}<span class=GramE>.{</span><span
class=SpellE>AdapterName</span>}.{<span class=SpellE>PropertyName</span>}<o:p></o:p></i></p>

<p class=MsoNormal>Alternatively, the interface name can be overridden by the
property to map to a specific interface type.<span style='mso-spacerun:yes'> 
</span>In that case, the <span class=SpellE>IAdapterProperty</span> name is
announced as a bus object with an interface name as follows:</p>

<p class=MsoNormal><span style='mso-tab-count:1'>                </span><span
class=GramE><i style='mso-bidi-font-style:normal'>/{</i></span><span
class=SpellE><i style='mso-bidi-font-style:normal'>PropertyName</i></span><i
style='mso-bidi-font-style:normal'>}<o:p></o:p></i></p>

<p class=MsoNormal style='margin-left:.5in'><i style='mso-bidi-font-style:normal'>{<span
class=SpellE>InterfaceHint</span>}<o:p></o:p></i></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'>IAdapterProperty</span></b></span><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'> Properties<o:p></o:p></span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Description<o:p></o:p></span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Bridge
  Mapping<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Attributes<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Collection of <span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:14">values associated
  with this property</del></span><span class=SpellE><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:14">IAdapterAttributes</ins></span></span>
  <o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:14">AllJoyn </ins></span><a style='mso-comment-reference:
  JS_2;mso-comment-date:20150731T1221;mso-comment-parent:1'></a><a
  style='mso-comment-reference:NG_1;mso-comment-date:20150731T0904'><span
  style='mso-comment-continuation:2'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:11">AllJoyn<span
  style='text-decoration:none !msorm;text-line-through:none !msorm'><s><span
  class=msoChangeProp style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><span
  style='text-decoration:none !msorm;text-line-through:none !msorm'> Annotation
  s</span></span></s></span></del></span></span></a></span><span
  style='mso-comment-continuation:2'><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><span class=MsoCommentReference><s><span
  style='font-size:8.0pt'><span class=msoChangeProp style='mso-prop-change:
  "Nicolas Guibourge" 20150731T0910'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:11"><![if !supportAnnotations]><a
  class=msocomanchor id="_anchor_1"
  onmouseover="msoCommentShow('_anchor_1','_com_1')"
  onmouseout="msoCommentHide('_com_1')" href="#_msocom_1" language=JavaScript
  name="_msoanchor_1"><strike><font color=red>[NG1]</font></strike></a><![endif]><span
  style='mso-special-character:comment'>&nbsp;</span></del></span></span></span></s></span></span></span><span
  class=MsoCommentReference><span style='font-size:8.0pt'><![if !supportAnnotations]><a
  class=msocomanchor id="_anchor_2"
  onmouseover="msoCommentShow('_anchor_2','_com_2')"
  onmouseout="msoCommentHide('_com_2')" href="#_msocom_2" language=JavaScript
  name="_msoanchor_2">[JS2]</a><![endif]><span style='mso-special-character:
  comment'>&nbsp;</span></span></span><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><s><span style='font-size:9.0pt'><span
  class=msoChangeProp style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><o:p></o:p></span></span></s></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'>InterfaceHint</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>An override for this property that can be used to map
  this property to some other <span class=SpellE>well known</span> interface
  type.<span style='mso-spacerun:yes'>  </span>Return null to use the default
  behavior<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn Interface name for this Property (if
  specified)<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;mso-yfti-lastrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name of Property<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:13">AllJoyn Property</ins></span><a style='mso-comment-reference:
  NG_3;mso-comment-date:20150731T0908'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:12">AllJoyn </del></span><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:11">Signal</del></span></a></span><span
  class=MsoCommentReference><span style='font-size:8.0pt'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:11"><![if !supportAnnotations]><a
  class=msocomanchor id="_anchor_3"
  onmouseover="msoCommentShow('_anchor_3','_com_3')"
  onmouseout="msoCommentHide('_com_3')" href="#_msocom_3" language=JavaScript
  name="_msoanchor_3"><strike><font color=red>[NG3]</font></strike></a><![endif]><span
  style='mso-special-character:comment'>&nbsp;</span></del></span></span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in'><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:15"><o:p>&nbsp;</o:p></ins></span></p>

<h1><span class=SpellE><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
datetime="2015-07-31T12:15">IAdapter</ins></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:16">Attribute</ins></span></span><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:15"><o:p></o:p></ins></span></h1>

<p class=MsoNormal style='margin-left:.5in !msorm;mso-prop-change:"Jon Slobodzian" 20150731T1216'><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:16">An
<span class=SpellE>IAdapterAttribute</span> is a key-value pair of data.<span
style='mso-spacerun:yes'>  </span>This is </ins></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:17">the</ins></span><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:16">
child of an <span class=SpellE>Alljoyn</span> property</ins></span><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">.<span
style='mso-spacerun:yes'>  </span>Each <span class=SpellE>IAdapterAttribute</span>
is exposed as the child of an AllJoyn property with the following bus object
and interface name:</ins></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:16"><span
style='mso-spacerun:yes'>  </span></ins></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18"><o:p></o:p></ins></span></p>

<p class=MsoNormal><span class=GramE><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">/{</ins></span></span><span
class=SpellE><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
datetime="2015-07-31T12:18">PropertyName</ins></span></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">}/{<span
class=SpellE>ValueName</span>}<o:p></o:p></ins></span></p>

<p class=MsoNormal style='margin-left:.5in'><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">{ExposedAdapterPrefix}<span
class=GramE>.{</span>AdapterName}.{PropertyName}.{</ins></span><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:19">Attribute</ins></span><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">Name}<o:p></o:p></ins></span></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-table-inserted:"Jon Slobodzian" 20150731T1218'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:18">IAdapterValue</ins></span></span></b></span><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">
  Properties<o:p></o:p></ins></span></span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">Description<o:p></o:p></ins></span></span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18">Bridge
  Mapping<o:p></o:p></ins></span></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;mso-table-inserted:"Jon Slobodzian" 20150731T1221'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:21">AccessType</ins></span></span></span><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:21"><o:p></o:p></ins></span></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:21">Indicates how this attribute can be accessed on
  the device</ins></span><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:24">: Read Only/</ins></span><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:21"><o:p></o:p></ins></span></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:23">An AllJoyn annotation</ins></span><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:24">’s
  access type</ins></span><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:21"><o:p></o:p></ins></span></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;mso-table-inserted:"Jon Slobodzian" 20150731T1218'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:18">Data<o:p></o:p></ins></span></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:22">The actual variant data </ins></span><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:23">item.<span
  style='mso-spacerun:yes'>  </span>This value is the physical value of a
  property on the device.</ins></span><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18"><o:p></o:p></ins></span></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:20">An AllJoyn annotation’s data value</ins></span><span
  class=msoChangeProp style='mso-prop-change:"Jon Slobodzian" 20150731T1219'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18"><o:p></o:p></ins></span></span></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;mso-yfti-lastrow:yes;mso-table-inserted:"Jon Slobodzian" 20150731T1218'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:18">Name<o:p></o:p></ins></span></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:22">The name of a data item</ins></span><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18"><o:p></o:p></ins></span></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T12:20">An AllJoyn annotation’s name</ins></span><span
  class=msoChangeProp style='mso-prop-change:"Jon Slobodzian" 20150731T1220'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T12:18"><o:p></o:p></ins></span></span></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in !msorm;mso-prop-change:"Jon Slobodzian" 20150731T1216'><o:p>&nbsp;</o:p></p>

<h1><span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'><span class=msoDel><del
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
yes'>IAdapterValue<o:p></o:p></del></span></span></h1>

<p class=MsoNormal><span style='mso-move-from:move426114211;mso-move-author:
"Jon Slobodzian";mso-move-date:20150731T1354'><span class=msoDel><del
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
yes'>Each IAdapterValue is exposed as a child of an AllJoyn property with the
following bus object and interface name:<o:p></o:p></del></span></span></p>

<p class=MsoNormal><span style='mso-move-from:move426114211;mso-move-author:
"Jon Slobodzian";mso-move-date:20150731T1354'><span class=msoDel><del
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
yes'><span style='mso-tab-count:1'>                </span>/{PropertyName}/{ValueName}<o:p></o:p></del></span></span></p>

<p class=MsoNormal style='margin-left:.5in'><span style='mso-move-from:move426114211;
mso-move-author:"Jon Slobodzian";mso-move-date:20150731T1354'><span
class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
style='mso-move-from:yes'>{ExposedAdapterPrefix}.{AdapterName}.{PropertyName}.{ValueName}<o:p></o:p></del></span></span></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-from:yes'>IAdapterValue
  Properties<o:p></o:p></del></span></span></b></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-from:yes'>Description<o:p></o:p></del></span></span></b></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-from:yes'>Bridge Mapping<o:p></o:p></del></span></span></b></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='font-size:9.0pt'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'>Data<o:p></o:p></del></span></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='font-size:9.0pt'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'>The data associated with this value <o:p></o:p></del></span></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><a style='mso-comment-reference:NG_4;mso-comment-date:
  20150731T0903'><span style='text-decoration:none !msorm;text-line-through:
  none !msorm'><s><span style='font-size:9.0pt'><span class=msoChangeProp
  style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
  yes'><span style='text-decoration:none !msorm;text-line-through:none !msorm'>AllJoyn
  Annotation’s Value</span></del></span></span></span></s></span></a></span><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><span class=MsoCommentReference><s><span
  style='font-size:8.0pt'><span class=msoChangeProp style='mso-prop-change:
  "Nicolas Guibourge" 20150731T0910'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
  yes'><![if !supportAnnotations]><a class=msocomanchor id="_anchor_4"
  onmouseover="msoCommentShow('_anchor_4','_com_4')"
  onmouseout="msoCommentHide('_com_4')" href="#_msocom_4" language=JavaScript
  name="_msoanchor_4">[NG4]</a><![endif]><span style='mso-special-character:
  comment'>&nbsp;</span></del></span></span></span></s></span></span></span><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><s><span style='font-size:9.0pt'><span
  class=msoChangeProp style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'><o:p></o:p></del></span></span></span></s></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
 <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='font-size:9.0pt'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'>Name<o:p></o:p></del></span></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='font-size:9.0pt'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'>Name of Value<o:p></o:p></del></span></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><a style='mso-comment-reference:NG_5;mso-comment-date:
  20150731T0904'><span style='text-decoration:none !msorm;text-line-through:
  none !msorm'><s><span style='font-size:9.0pt'><span class=msoChangeProp
  style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
  yes'><span style='text-decoration:none !msorm;text-line-through:none !msorm'>AllJoyn
  Annotation’s Name</span></del></span></span></span></s></span></a></span><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><span class=MsoCommentReference><s><span
  style='font-size:8.0pt'><span class=msoChangeProp style='mso-prop-change:
  "Nicolas Guibourge" 20150731T0910'><span class=msoDel><del
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-from:
  yes'><![if !supportAnnotations]><a class=msocomanchor id="_anchor_5"
  onmouseover="msoCommentShow('_anchor_5','_com_5')"
  onmouseout="msoCommentHide('_com_5')" href="#_msocom_5" language=JavaScript
  name="_msoanchor_5">[NG5]</a><![endif]><span style='mso-special-character:
  comment'>&nbsp;</span></del></span></span></span></s></span></span></span><span
  style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'><span style='text-decoration:none !msorm;
  text-line-through:none !msorm'><s><span style='font-size:9.0pt'><span
  class=msoChangeProp style='mso-prop-change:"Nicolas Guibourge" 20150731T0910'><span
  class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-from:yes'><o:p></o:p></del></span></span></span></s></span></span></p>
  </td>
  <span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in'><span style='mso-move-from:move426114211;
mso-move-author:"Jon Slobodzian";mso-move-date:20150731T1354'><span
class=msoDel><del cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
style='mso-move-from:yes'><o:p>&nbsp;</o:p></del></span></span></p>

<span style='mso-move-from:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'></span>

<h1><span class=SpellE>IAdapterSignal</span></h1>

<p class=MsoNormal>From the bridge’s perspective an <span class=SpellE>ISignal</span>
represents an event that your device can raise when something changes.<span
style='mso-spacerun:yes'>  </span>All devices typically have a Change of Value
signal. <span style='mso-spacerun:yes'> </span>This signal alerts AllJoyn
clients that one or more properties have changed on a device.<span
style='mso-spacerun:yes'>  </span>Additional signals may also be supported.</p>

<p class=MsoNormal>Each <span class=SpellE>ISignal</span> is announced to
AllJoyn as a <i style='mso-bidi-font-style:normal'>Hosted Session</i> signal
for a device with the signals Name.<span style='mso-spacerun:yes'>  </span></p>

<p class=MsoNormal>The following properties must be implemented for an <span
class=SpellE>ISignal</span></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'>ISignal</span></b></span><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'> Property<o:p></o:p></span></b></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Description<o:p></o:p></span></b></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><b
  style='mso-bidi-font-weight:normal'><span style='font-size:9.0pt'>Bridge
  Mapping<o:p></o:p></span></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name<o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Name of Signal<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>AllJoyn Signal<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  class=SpellE><span style='font-size:9.0pt'>Params</span></span><span
  style='font-size:9.0pt'><o:p></o:p></span></p>
  </td>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>A set of objects that changed and their new values,
  or null if this is a pure signal.<o:p></o:p></span></p>
  </td>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='font-size:9.0pt'>Maps to an array of <span class=SpellE>alljoyn</span>
  signal arguments passed to the signal.<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<h1><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
datetime="2015-07-31T13:54"><o:p>&nbsp;</o:p></del></span></h1>

<h1><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
datetime="2015-07-31T13:54"><o:p>&nbsp;</o:p></del></span></h1>

<p class=MsoNormal><span class=msoDel><del cite="mailto:Jon%20Slobodzian"
datetime="2015-07-31T13:54"><o:p>&nbsp;</o:p></del></span></p>

<h1><span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'><span class=SpellE><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
yes'>IAdapterValue</ins></span></span><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
yes'><o:p></o:p></ins></span></span></h1>

<p class=MsoNormal><span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
yes'>Each <span class=SpellE>IAdapterValue</span> is exposed as a child of an
AllJoyn property with the following bus object and interface name:<o:p></o:p></ins></span></span></p>

<p class=MsoNormal><span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'><span class=msoIns><ins
cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
yes'><span style='mso-tab-count:1'>                </span><span class=GramE>/{</span><span
class=SpellE>PropertyName</span>}/{<span class=SpellE>ValueName</span>}<o:p></o:p></ins></span></span></p>

<p class=MsoNormal style='margin-left:.5in'><span style='mso-move-to:move426114211;
mso-move-author:"Jon Slobodzian";mso-move-date:20150731T1354'><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
style='mso-move-to:yes'>{<span class=SpellE>ExposedAdapterPrefix</span>}<span
class=GramE>.{</span><span class=SpellE>AdapterName</span>}.{<span
class=SpellE>PropertyName</span>}.{<span class=SpellE>ValueName</span>}<o:p></o:p></ins></span></span></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-table-layout-alt:fixed;border:none;
 mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  mso-border-alt:solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:
  background2;mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span class=SpellE><b style='mso-bidi-font-weight:normal'><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'>IAdapterValue</ins></span></span></b></span></span><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'> Properties<o:p></o:p></ins></span></span></b></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'>Description<o:p></o:p></ins></span></span></b></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;background:#D0CECE;mso-background-themecolor:background2;
  mso-background-themeshade:230;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><b style='mso-bidi-font-weight:normal'><span style='font-size:
  9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'>Bridge Mapping<o:p></o:p></ins></span></span></b></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'>Data<o:p></o:p></ins></span></span></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'>The data associated with this value <o:p></o:p></ins></span></span></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><a style='mso-comment-reference:NG_6;mso-comment-date:20150731T0903'><s><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'>AllJoyn Annotation’s
  Value</ins></span></span></s></a></span><span style='mso-move-to:move426114211;
  mso-move-author:"Jon Slobodzian";mso-move-date:20150731T1354'><span
  class=MsoCommentReference><s><span style='font-size:8.0pt'><span
  class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
  style='mso-move-to:yes'><![if !supportAnnotations]><a class=msocomanchor
  id="_anchor_6" onmouseover="msoCommentShow('_anchor_6','_com_6')"
  onmouseout="msoCommentHide('_com_6')" href="#_msocom_6" language=JavaScript
  name="_msoanchor_6"><u><font color=teal>[NG6]</font></u></a><![endif]><span
  style='mso-special-character:comment'>&nbsp;</span></ins></span></span></s></span></span><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><s><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'><o:p></o:p></ins></span></span></s></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
 <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:solid windowtext 1.0pt;
  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'>Name<o:p></o:p></ins></span></span></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=240 valign=top style='width:2.5in;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'>Name of Value<o:p></o:p></ins></span></span></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
  <td width=264 valign=top style='width:197.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:
  normal;mso-pagination:widow-orphan lines-together;page-break-after:avoid'><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><a style='mso-comment-reference:NG_7;mso-comment-date:20150731T0904'><s><span
  style='font-size:9.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'>AllJoyn Annotation’s Name</ins></span></span></s></a></span><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><span class=MsoCommentReference><s><span style='font-size:
  8.0pt'><span class=msoIns><ins cite="mailto:Jon%20Slobodzian"
  datetime="2015-07-31T13:54" style='mso-move-to:yes'><![if !supportAnnotations]><a
  class=msocomanchor id="_anchor_7"
  onmouseover="msoCommentShow('_anchor_7','_com_7')"
  onmouseout="msoCommentHide('_com_7')" href="#_msocom_7" language=JavaScript
  name="_msoanchor_7"><u><font color=teal>[NG7]</font></u></a><![endif]><span
  style='mso-special-character:comment'>&nbsp;</span></ins></span></span></s></span></span><span
  style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";mso-move-date:
  20150731T1354'><s><span style='font-size:9.0pt'><span class=msoIns><ins
  cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54" style='mso-move-to:
  yes'><o:p></o:p></ins></span></span></s></span></p>
  </td>
  <span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
  mso-move-date:20150731T1354'></span>
 </tr>
</table>

<p class=MsoNormal style='margin-left:.5in'><span style='mso-move-to:move426114211;
mso-move-author:"Jon Slobodzian";mso-move-date:20150731T1354'><span
class=msoIns><ins cite="mailto:Jon%20Slobodzian" datetime="2015-07-31T13:54"
style='mso-move-to:yes'><o:p>&nbsp;</o:p></ins></span></span></p>

<span style='mso-move-to:move426114211;mso-move-author:"Jon Slobodzian";
mso-move-date:20150731T1354'></span>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

</div>

<div style='mso-element:comment-list'><![if !supportAnnotations]>

<hr class=msocomoff align=left size=1 width="33%">

<![endif]>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_1" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_1','_com_1')"
onmouseout="msoCommentHide('_com_1')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_1"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_1" class=msocomoff>[NG1]</a><![endif]></span></span></span>Actually
collection of <span class=SpellE>IAdapterAttribute</span></p>

<p class=MsoCommentText><o:p>&nbsp;</o:p></p>

<p class=MsoCommentText><span class=SpellE>IAdapterAttribute</span>:</p>

<p class=MsoCommentText style='margin-left:.5in;text-indent:-.25in;mso-list:
l0 level1 lfo1'><![if !supportLists]><span style='mso-ascii-font-family:Calibri;
mso-fareast-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:
Calibri'><span style='mso-list:Ignore'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><![endif]><span style='mso-spacerun:yes'> </span><span
class=SpellE>IAdapterValue</span></p>

<p class=MsoCommentText style='margin-left:.5in;text-indent:-.25in;mso-list:
l0 level1 lfo1'><![if !supportLists]><span style='mso-ascii-font-family:Calibri;
mso-fareast-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:
Calibri'><span style='mso-list:Ignore'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><![endif]><span style='mso-spacerun:yes'> </span>Access
type (will be used to set the AllJoyn property R/W access)</p>

<p class=MsoCommentText style='margin-left:.5in;text-indent:-.25in;mso-list:
l0 level1 lfo1'><![if !supportLists]><span style='mso-ascii-font-family:Calibri;
mso-fareast-font-family:Calibri;mso-hansi-font-family:Calibri;mso-bidi-font-family:
Calibri'><span style='mso-list:Ignore'>-<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span></span><![endif]><span
style='mso-spacerun:yes'> </span>Collection of <span class=SpellE>IAnnotation</span>
(turn into AllJoyn annotation of AllJoyn Property (<span class=SpellE>IAdapterValue</span>
is the AllJoyn property)</p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_2" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_2','_com_2')"
onmouseout="msoCommentHide('_com_2')"><![endif]><span style='mso-comment-author:
"Jon Slobodzian";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-2127521184-1604012920-1887927527-11534576'><![if !supportAnnotations]><a
name="_msocom_2"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_2" class=msocomoff>[JS2]</a><![endif]></span></span></span></p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_3" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_3','_com_3')"
onmouseout="msoCommentHide('_com_3')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_3"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_3" class=msocomoff>[NG3]</a><![endif]></span></span></span>???
<span class=GramE>don’t</span> think it is turn into signal.</p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_4" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_4','_com_4')"
onmouseout="msoCommentHide('_com_4')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_4"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_4" class=msocomoff>[NG4]</a><![endif]></span></span></span>AllJoyn
property (and not annotation)</p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_5" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_5','_com_5')"
onmouseout="msoCommentHide('_com_5')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_5"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_5" class=msocomoff>[NG5]</a><![endif]></span></span></span>Name
of the AllJoyn property</p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_6" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_6','_com_6')"
onmouseout="msoCommentHide('_com_6')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_6"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_6" class=msocomoff>[NG6]</a><![endif]></span></span></span>AllJoyn
property (and not annotation)</p>

<![if !supportAnnotations]></div>

<![endif]></div>

<div style='mso-element:comment'><![if !supportAnnotations]>

<div id="_com_7" class=msocomtxt language=JavaScript
onmouseover="msoCommentShow('_anchor_7','_com_7')"
onmouseout="msoCommentHide('_com_7')"><![endif]><span style='mso-comment-author:
"Nicolas Guibourge";mso-comment-providerid:AD;mso-comment-userid:S-1-5-21-1721254763-462695806-1538882281-38460'><![if !supportAnnotations]><a
name="_msocom_7"></a><![endif]></span>

<p class=MsoCommentText><span class=MsoCommentReference><span style='font-size:
8.0pt'><span style='mso-special-character:comment'>&nbsp;<![if !supportAnnotations]><a
href="#_msoanchor_7" class=msocomoff>[NG7]</a><![endif]></span></span></span>Name
of the AllJoyn property</p>

<![if !supportAnnotations]></div>

<![endif]></div>

</div>

</body>

</html>


</html>

