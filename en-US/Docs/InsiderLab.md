---
layout: docs
title: Insider Lab
description: IoT and AI Insider lab where you can leverage Microsft's support in bringing your product to market.
keyword: windows iot, insider lab
permalink: /en-US/Docs/InsiderLab.htm
lang: en-US
---

# Internet of Things Insider Lab 
If your organization is developing an IoT solution, you might be able to leverage [Microsoft's Insider Labs](https://www.microsoft.com/en-us/iotinsider) to help accelerate bringing your product to market. 

 <div class="container">
    <div class="row">
        <div class="image-container video-player embed-responsive-16by9 remove-top-margin remove-bottom-margin">
            <img class="video-img img-responsive jumbotron-image " alt="Two individuals discussing the IoT Insider Lab" src="{{site.baseurl}}/Resources/images/Videos/InsiderLab.png" data-cn="Information about the IoT and AI Insider Lab" data-fallback="Your browser does not support the video tag." data-video="https://iotlabportalcms.azureedge.net/112419_iot_lab_master_mixedaudio_-16lkfs_1280x720_5mbps.mp4?sfvrsn=2 ">
        </div>
    </div>
  </div>

## Apply to Microsoft IoT Insider Labs
___

* Develop your IoT project with help from Microsoft.
<br> <a  class="btn btn-primary spacer-32-top spacer-32-bottom"  href="https://www.microsoft.com/en-us/iotinsider/apply" onclick="ICX.pixelEvent('6317');">Apply now</a>


<!-- YouTube WEDCS Tagging -->
<script>
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";


    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            playerVars: {
                modestbranding: true,
                controls: false
            },
            height: '390',
            width: '640',
            videoId: 'NNLwphK5MN4',
            events: {
                'onReady': onReady
            }
        });
    }

    function onReady() {
        player.addEventListener('onStateChange', function (e) {
            if (e.data === 1) {
                MscomCustomEvent("ms.InteractionType", "100", "ms.video.completionrate", "0", "cn", "Windows IoT Core: Insider Lab");
            }
        });
    }
</script>
<!-- cmp tracking code-->
<script type="text/javascript">
    window.ICX = window.ICX || {};
    ICX.domain_id = "6745";
    (function () {
        var p, s, id;
        id = '2076';
        p = document.createElement('script');
        p.type = 'text/javascript';
        p.async = true;
        p.src = document.location.protocol + '//c' + id + '.ic-live.com/pixel-js/c' + id + '-pixel.js';
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(p, s);
    })();
</script>
<script type="text/javascript">
    var appInsights = window.appInsights || function (config) {
        function s(config) { t[config] = function () { var i = arguments; t.queue.push(function () { t[config].apply(t, i) }) } } var t = { config: config }, r = document, f = window, e = "script", o = r.createElement(e), i, u; for (o.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", r.getElementsByTagName(e)[0].parentNode.appendChild(o), t.cookie = r.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) s("track" + i.pop()); return config.disableExceptionTracking || (i = "onerror", s("_" + i), u = f[i], f[i] = function (config, r, f, e, o) { var s = u && u(config, r, f, e, o); return s !== !0 && t["_" + i](config, r, f, e, o), s }), t
    }({
        instrumentationKey: "e38fbe82-9f06-4e70-a70e-86e018b1cbdf"
    });

    window.appInsights = appInsights;
    appInsights.trackPageView(null, null, { urlReferrer: document.referrer });
</script>
<script src="https://previewassets.windowsphone.com/3d15c79c-07a0-4088-b5cf-13fa98fe97d5/common-min_InvariantCulture_Default.js"></script>
<noscript><img alt="" width="1" height="1" src="http://c.microsoft.com/trans_pixel.aspx" /></noscript>


