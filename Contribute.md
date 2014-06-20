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
1. Create a GitHub account by starting at [GitHub home](https://github.com/)
1. Now that you have an account, you need to install Git on your computer. Please follow the instructions on [Setting up Git tutorial](https://help.github.com/articles/set-up-git)
1. Once you have Git installed, fork this repository. Goto the top of the page and click the *Fork* button. 
You now have a fork of the repository you are editing on GitHub which you can use to edit content.
1. Clone your repository to your machine. For this open GitBash or Windows command prompt and clone the repository:
  {% highlight bash %}
  git clone https://github.com/<your user name>/content.git
  {% endhighlight %}

  Now create a reference to the root repository by issuing the following:
  
  {% highlight bash %}
cd content
git remote add upstream https://github.com/ms-iot/content.git
git fetch upsteam
  {% endhighlight %}
___

##Making changes
We will be following the GitFlow branching methodology as described at [Altassian](https://www.atlassian.com/git/workflows#!workflow-gitflow). Do not check directly into master.

###Making a change
1. Open GitBash
1. Create a branch for your feature

   {% highlight bash %}
   git pull upstream master:<new branch name>`
   {% endhighlight %}
  
   For Example:

   {% highlight bash %}
   git pull upstream master:firmata_port
   {% endhighlight %}
    
1. Checkout your branch

   {% highlight bash %}
   git checkout <new branch name>
   {% endhighlight %}

1. Make your edits, build and test.
1. Add your edits and commit

   {% highlight bash %}
git add .
git commit -v -a -m "<Describe the changes made in this commit>"
   {% endhighlight %}

1. Push your changes to your fork
   {% highlight bash %}
git push origin <new branch name>
   {% endhighlight %}


###Submitting a Pull Request
1. Goto [GitHub](GitHub.com) and navigate to your fork
1. Click the *Pull Request* at the top of the page
1. Ensure that the Base Branch is `ms-iot/content@master` and the Head branch is `<your username>/content@<branch name>`
1. Click the Update Commit Range
1. Give your pull request a title and describe the change to be made, including the task or issue number.
1. Submit your pull request

___

#Iterating on the Galileo SDK
Fork the Galileo-SDK as described above.

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

!(images/Nuget_Install.png)

Then select *Online* and *Local Source*

!(images/Nuget_ReInstall.png)

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


