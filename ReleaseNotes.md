---
layout: default
title: Release Notes
permalink: /ReleaseNotes.htm
---

<div class="jumbotron">
  <div class="container">
    <h1>Release Notes</h1>
    <p>Limitations of the hardware and software along with known bugs.</p>
  </div>
</div>
<div class="container">

  <h2> Software Limitations </h2>
  <p>
    <ol>
	  <li>
	    <code>LED_ONBOARD</code> constant only works when calling directly into embprpusr.dll functionality.
	  </li>
      <li>
        <code>millis()</code> rolls roughly every 50 days the application is running.
      </li>
      <li>
        <code>strncmp()</code> is not implemented.
      </li>
    </ol>
  </p>
  <hr/>

  <h2> Hardware Limitations </h2>
  <p>
    <ol>
      <li>GPIO pins are very slow (caused by Cypress I/O port expander).</li>
      <li>CPU architecture does not support the LOCK_ prefix on kernel instructions.</li>
      <li>No SSE registers, Windows functionality requiring this hardware cannot work.</li>
    </ol>
  </p>
  <hr/>

  <a class="btn btn-default" href="index.htm" role="button">Return to homepage</a>
