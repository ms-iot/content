<ul>
{% assign parents = (site.data._docs-index[page.lang] | default: site.data._docs-index[en-US]) %}
{% for entry in parents %}
  <li><a class="current no-outline" href="#">{{entry.parent}}</a>
    <input id="item-checkbox-{{forloop.index}}" type="hidden" />
    <label for="item-checkbox-{{forloop.index}}" data-toggle="collapse" data-target="#item-ul-{{forloop.index}}"></label>
    <ul class="collapse in" id="item-ul-{{forloop.index}}">
    {% for child in entry.children %}
      <li><a href="{{child.link}}">{{child.title}}</a>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>
