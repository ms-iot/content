<nav class="c-supplemental-nav">
    <nav>
        <a data-state="collapsed" aria-controls="example-nav-target-item-1">Item 1: Link title</a>
        <nav id="example-nav-target-item-1">
            <a href="#">Item 1 Nested Item 1: Link title</a>
            <a href="#">Item 1 Nested Item 2: Link title</a>
            <a href="#">Item 1 Nested Item 3: Link title</a>
            <a href="#">Item 1 Nested Item 4: Link title</a>
        </nav>
    </nav>
    <nav>
        <a data-state="collapsed" aria-controls="example-nav-target-item-2">Item 2: Link title</a>
        <nav id="example-nav-target-item-2">
            <a href="#">Item 2 Nested Item 1: Link title</a>
            <a href="#">Item 2 Nested Item 2: Link title</a>
        </nav>
    </nav>
    <nav>
        <a data-state="expanded" aria-controls="example-nav-target-item-3">Item 3: Link title</a>
        <nav id="example-nav-target-item-3">
            <a href="#">Item 3 Nested Item 1: Link title</a>
            <a href="#" class="f-active">Item 3 Nested Item 2: Link title</a>
        </nav>
    </nav>
</nav>

<!--{% assign sortedInfo = (site.data._docsandtutorials[page.lang] | sort: 'ranking') %}
{% for entry in sortedInfo %}
    {% assign link = entry.link-text | split: '>' %}
    <h5>{{link | first}}>{{entry.title}}</a></h5>
{% endfor %}-->
