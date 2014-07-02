#Contribute
Please refer to our [contribution page](http://ms-iot.github.io/content/Contribute.htm) for general guidelines on how to contribute.

#Contributing to documentation
### Setting up Jekyll on Windows
1. Install [Ruby](http://rubyinstaller.org/downloads/) and add it to your system path environment variable
1. Download the [Ruby DevKit](http://rubyinstaller.org/downloads/), and follow the installation instructions (here)[https://github.com/oneclick/rubyinstaller/wiki/Development-Kit]
1. Install [Python 2.7.7](https://www.python.org/downloads/)
1. Using Command Prompt, Install jekyll 2.0.3 using ruby gems. (2.1.0 cannot be used at this time)
```gem install jekyll --version 2.0.3```
1. Using Command Prompt, uninstall pygments.rb - (it currently is incompatible with windows)
```gem uninstall pygments.rb```
1. Using Command Prompt, install pygments.rb version 0.5.0 using ruby gems
```gem install pygments.rb --version 0.5.0```

### Iterating on documentation
1. Using Command Prompt, from within the content folder start a local server:
```jekyll serve --watch```
1. If prompted by the firewall, allow Jekyll to serve content
1. Open your web browser and point it to the local server. localhost:4000 is the default
1. Now you have your own version of the documentation site!
1. You can make changes to the pages using your favorite text editor in [Jekyll's Kramdown flavored Markdown](http://jekyllrb.com/docs/home/) or HTML

