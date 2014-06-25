#Contribute
Please refer to our [contribution page](http://ms-iot.github.io/content/Contribute.htm) for general guidelines on how to contribute.

#Contributing to documentation
### Setting up Jekyll on Windows
1. Install [Ruby](http://rubyinstaller.org/downloads/) and add it to your system path environment variable
1. Install [Ruby DevKit](http://rubyinstaller.org/downloads/), extract into a permanent folder, and add it to your system path environment variable
1. Install [Python 2.7.7](https://www.python.org/downloads/) or above
1. Install jekyll using ruby gems
{% highlight PowerShell %}
gem install jekyll
{% endhighlight %}
1. Uninstall pygments.rb - (it currently is incompatible with windows)
{% highlight PowerShell %}
gem uninstall pygments.rb
{% endhighlight %}
1. Install pygments.rb version 0.5.0 using ruby gems
{% highlight PowerShell %}
gem install pygments.rb --version 0.5.0
{% endhighlight %}

### Iterating on documentation
1. Launch a GitShell from the GitHub app
1. Launch your [favorite text editor](http://www.sublimetext.com/).
1. from within the content folder
{% highlight PowerShell %}
jekyll serve --watch
{% endhighlight %}
1. If prompted by the firewall, allow Jekyll to serve content
1. Open your web browser and point it to the local server. [localhost:4000](localhost:4000) is the default
1. Make changes using [Jekyll's Kramdown flavored Markdown](http://jekyllrb.com/docs/home/)

