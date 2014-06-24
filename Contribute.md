---
layout: code
title: Contribute
permalink: /Contribute.htm
---

# Contribute
Thank you for your interest in contributing to Windows Developer Program for IoT for Intel Galileo.
## Checkout the repository
If you want to contribute to the development kit, read on!
The first time you'd like to commit a change to a repository, perform the following:

We're actively accepting work for the following areas:

* Getting Started Guide https://github.com/ms-iot/content.git
* Galileo SDK https://github.com/ms-iot/galileo-sdk.git
* Tutorials
* Adding or removing pointers to Projects
* Adding or removing pointers to Library Ports
* Adding or removing pointers to Arduino Shield Ports


1. Familiarize yourself with git by reading through the [GitHub documentation](https://help.github.com/ "GitHub help")
1. Familiarize yourself with the GitHub app for Windows via the [GitHub app documentation](https://help.github.com/categories/58/articles)
1. Create a GitHub account by starting at [GitHub home](https://github.com/)
1. Now that you have an account, you need to install the [GitHub app](https://windows.github.com/) on your computer.
1. Goto [GitHub home](https://github.com/) and navigate to the repository you'd like to contribute to, click *Fork*  
  ![Fork](images/GitHubFork.png)

1. On the right hand side of the repository, you'll see 'Clone in Desktop'  
  ![Clone](images/GitHubClone.png)   

___

##Making changes
If you are editing a fork of ms-iot/content, please submit pull request off of gh_pages.

1. Make your edits, build and test. Use the repository's readme for specific editing requirements, build instructions, and testing method.
1. Add your edits via the GitHub app  
  ![Commit](images/GitHubCommit.png) 

1. Push your changes to your fork  
  ![Sync](images/GitHubSync.png) 

###Submitting a Pull Request
1. Goto [GitHub](GitHub.com) and navigate to your fork
1. Click the *Pull Request* at the top of the page  
  ![Pull](images/GitHubPullRequest.png)
1. Click the Update Commit Range
1. Give your pull request a title and describe the change to be made, including the task or issue number.
1. Submit your pull request

___

#Iterating on the Documentation
Fork the ms-iot/content as described above in the contribute section.. Ensure you are working in the gh_pages branch.

### Set up Jekyll on Windows
1. Install [Ruby](http://rubyinstaller.org/downloads/) and add it to your system path environment variable
1.   Install [Ruby DevKit](http://rubyinstaller.org/downloads/), extract into a permanent folder, and add it to your system path environment variable
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


___

#Iterating on the Galileo SDK
Fork  ms-iot/galileo-sdk as described above in the contribute section.

##Configure Visual Studio
You’ll want to redirect visual studio’s *user templates* to the repository you are working in.
*Tools -> Options*

![Template Config](images/Nuget_TemplateConfig.png)

Under *Projects and Solutions*, select *General*

###For Visual Studio Pro and Ultimate

*Tools -> Library Package Manager -> Package Manager Settings*

![Package Config](images/Nuget_PackageSourceConfig_VSU2013.png)

###For Visual Studio Express
*Tools -> Nuget Package Manager -> Package Manager Settings*

![Package Config](images/Nuget_PackageSourceConfig_VSE2013.png)

##Build the Nuget package
Please download the Nuget command line utility [nuget.exe](http://nuget.org/nuget.exe) into the Galileo-SDK root folder.

{% highlight PowerShell %}
build-nupkg.cmd
{% endhighlight %}

##Building the Project
You can now goto *File -> New Project* then Select *Templates -> Visual C++ -> Galileo -> Galileo Wiring app*:

![App Create](images/Nuget_AppCreate.png)

###Build the app
You can now build the application. Please refer to the [Hello Blinky Sample](HelloBlinky.htm) for details on how to build and deploy an application.

###Iterate in the Nuget
Now you need to make changes to the Nuget, you’ll need to uninstall it first. Right click on the Project in the solution and select *Manage Nuget Packages*.

Now Uninstall the Galileo SDK by clicking the uninstall button:

![Nuget Install](images/Nuget_Install.png)

Then select *Online* and *Local Source*

![Nuget Reinstall](images/Nuget_ReInstall.png)

###Install it!
Your updates will be there.


### Notes!
* While you can change your local headers, they will get nuked when reinstalling the nuget package.
* Don’t check in your packages...
* Don’t check in Binaries
* You do not need to bump the version when you commit – we’ll bump at release. This requires a change to EVERY project. Nuget doesn’t have wildcards as far as I can tell.

___

#Best Practices

##Do not check directly into develop or master!
Please create feature branches for any changes. This allows us to code review before pulling into develop.

##Do not check in binaries
Git is not a good binary store. Once a binary is added to the repository, it will be there forever unless extraordinary actions are taken.
Please do not add binaries to Git including:
* The output from a build (debug/release)
* SDF file (code database)
* Nuget package directories

Acceptable binaries:
* PNG, JPG, or other image formats


