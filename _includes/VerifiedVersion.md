{% capture langLower %}{{ page.lang | downcase }}{% endcapture %}
{% if langLower == 'en-us' %}
   {% include en-US/VerifiedVersion.md %}
{% endif %}
{% if langLower == 'zh-cn' %}
   {% include zh-CN/VerifiedVersion.md %}
{% endif %}