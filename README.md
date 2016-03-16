#Contribute
Please refer to our [contribution page](http://ms-iot.github.io/content/Contribute.htm) for general guidelines on how to contribute.

#Contributing to documentation
### Setting up Jekyll on Windows
1. We use this easy to follow [Jekyll on Windows](http://jekyllrb.com/docs/windows/) guide. Use the pygments option when you go through the install.

### Iterating on documentation
1. Using Command Prompt, from within the content folder start a local server:
```jekyll serve --watch```
1. If prompted by the firewall, allow Jekyll to serve content
1. Open your web browser and point it to the local server. localhost:4000 is the default
1. Now you have your own version of the documentation site!
1. You can make changes to the pages using your favorite text editor.

### Documentation rules
* For samples, please use [Jekyll's Kramdown flavored Markdown](http://jekyllrb.com/docs/home/) to get nice formatting when rendered as a webpage.
* For README.md files, please use [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) to get nice formatting on the file browser.
* Please do not use HTML
* For samples, please append ```{:target="_blank"}```, so the link opens in a new page
