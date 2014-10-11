#Contribute
Please refer to our [contribution page](http://ms-iot.github.io/content/Contribute.htm) for general guidelines on how to contribute.

#Contributing to documentation
### Setting up Jekyll on Windows
1. Install [Ruby](http://rubyinstaller.org/downloads/) and add it to your system path environment variable
1. Download the [Ruby DevKit](http://rubyinstaller.org/downloads/), and follow the installation instructions [here](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
1. Install [Python 2.7.x](https://www.python.org/downloads/)
1. Using Command Prompt, Install jekyll 2.0.3 using ruby gems.
```gem install jekyll```

### Iterating on documentation
1. Using Command Prompt, from within the content folder start a local server:
```jekyll serve --watch```
1. If prompted by the firewall, allow Jekyll to serve content
1. Open your web browser and point it to the local server. localhost:4000 is the default
1. Now you have your own version of the documentation site!
1. You can make changes to the pages using your favorite text editor.

### Documentation rules
* For samples, please use [Jekyll's Kramdown flavored Markdown](http://jekyllrb.com/docs/home/) to get nice formatting when rendered as a webpage.
* For README.md files, please use [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) to get nice formatting on the file browser.
* Please do not use HTML
* For samples, please append ```{:target="_blank"}```, so the link opens in a new page

