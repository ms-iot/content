---
layout: default
title: Device Options
description: Review and compare the numerous compatible Windows 10 IoT Core development boards
keyword: community, iot, boards, windows iot, comparison
permalink: /en-US/Explore/DeviceOptions.htm
lang: en-US
---
<style>
.sectionControls
{
	font-size:15px;
	float:right;
	position:relative;
	top:20px;
}
.sectionControls a
{
	padding-left: 10px;
}
.section {
	padding-left: 10px;
}
</style>

<ol class="breadcrumb">
  <li>
    <a href="https://developer.microsoft.com/en-us/windows/iot">IoT Home</a>
  </li>
  <li>
    <a href="{{site.baseurl}}/{{page.lang}}/GetStarted">Get Started</a>
  </li>
  <li class="active">Device Options</li>
</ol>

<h1 class="page-title">{{page.title}}</h1>

<h3>Windows 10 IoT Core Development Devices</h3>
<hr>
<p>Windows 10 IoT Core works with <a href="{{site.baseurl}}/{{page.lang}}/explore/SoC">several leading SoCs</a> that are utilized in hundreds of devices. Below you can find suggested devices to <a href="{{site.baseurl}}/{{page.lang}}/GetStarted">get started</a> quickly, additional devices that provide more silicon and form factor choices, as well as community devices that have been enabled independent of Microsoft involvement. </p>

<h2> <a onClick="toggleSection('SuggestedDevices');return false;">Suggested Devices </a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('SuggestedDevices');return false;">Show/Hide</a>
	</div>
</h2>
<div class="SuggestedDevices section" markdown="1">
{% include_relative SuggestedDevices.md %}
</div>
<hr>
<h2> <a onClick="toggleSection('AdditionalDevices');return false;">Additional Devices </a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('AdditionalDevices');return false;">Show/Hide</a>
	</div>
</h2>
<div class="AdditionalDevices section" markdown="1">
{% include_relative AdditionalDevices.md %}
</div>
<hr>
<h2> <a onClick="toggleSection('CommunityDevices');return false;">Community Devices </a>
	<div class="sectionControls">
		<a class="sectionToggle" onClick="toggleSection('CommunityDevices');return false;">Show/Hide</a>
	</div>
</h2>
<div class="CommunityDevices section" markdown="1">
{% include_relative CommunityDevices.md %}
</div>
<hr>

<script>
		function toggleSection(section) {
			$("."+section+".section").toggle('slow');
		}

		function contribute(section) {			
			var pagePath="{{site.repositoryurl}}{{page.path}}";
			var url = pagePath.replace("Explore", "Explore/" + section); 
		  	var win = window.open(url, '_blank');
  			win.focus();
		}

		window.onload = function() { 
			$(".javascriptWarn").hide();
			$(".searchTools").show();
      		if(window.location.hash) {
				$(location.hash).parent().show();
				window.scrollTo(0, $(location.hash).offset().top);
			  }
		}
</script>
