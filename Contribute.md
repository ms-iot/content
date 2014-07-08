---
layout: code
title: Contribute
permalink: /Contribute.htm
---

# Contribute
Thank you for your interest in contributing to Windows Developer Program for IoT for Intel Galileo.

We're actively accepting work for the following areas:

* <a href="https://github.com/ms-iot/content" target="_blank">Getting Started Guide</a>
* <a href="https://github.com/ms-iot/galileo-sdk" target="_blank">Galileo SDK</a>
* Tutorials
* Adding or removing pointers to Projects
* Adding or removing pointers to Library Ports
* Adding or removing pointers to Arduino Shield Ports

The first time you'd like to commit a change to a repository, perform the following:

## Fork the repository
1. Familiarize yourself with git by reading through the <a href="https://help.github.com/" title="GitHub help" target="_blank">GitHub documentation</a>
1. Familiarize yourself with the <a href="https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true">Git Cheatsheat!</a>
1. Create a GitHub account by starting at <a href="https://github.com/" target="_blank">GitHub Home</a>
1. Go to <a href="https://github.com/" target="_blank">GitHub Home</a> and navigate to the repository you'd like to contribute to, click *Fork*  
  ![Fork](images/GitHubFork.png)
1. On GitHub, Navigate to your account's fork of the repository
1. Clone the repository in one of two ways:
    * You can use command line <br/>
    <kbd>git clone git://github.com/LinkToRepo.git NameYourLocalFolder</kbd>
    * Or launch the GitHub app by clicking 'Clone in Desktop' on the right hand side of the repository  
    ![Clone](images/GitHubClone.png)   

___

##Steps for Using Git
If you are editing a fork of ms-iot/content, please submit pull request off of gh_pages.<br/>
If you are editing a fork of ms-iot/galileo-sdk, please submit pull request off of develop.

For clarification, what we mean when we say:<br/>
**local repository:** the cloned repository that you have one on your machine<br/>
**forked repository:** the fork you made from the main repository. This sits up on github's servers. (Also known as origin)<br/>
**main repository:** the original repository that you forked from. This is the common ms-iot repository hosted on github's servers. (Also known as upstream)<br/>

####Making changes
1. Make your edits, build, and test. Use the repository's readme for any specific editing requirements, build instructions, and testing methods.
1. Commit your changes to your local repository (NOTE: Do not push these changes to your forked repository)

####Submitting a Pull Request
1. Rebase your local repository on top of the main repository in order to sync the changes that have been made to the main repository since you forked.
    * This should now put your changes on top of the main repository's history
1. Push your changes to your forked repository.
1. Now submit your pull request from your forked repository using the GitHub website.

####Making changes to a Pull Request
1. Make your changes again, commit them, and push to your forked repository.
    * If changes were made to the main repository while you were making your changes, you will have to merge with main to fix this.
1. The pull request should automatically update unless it was closed.
    * If it was closed, you will have to re-open it or submit a new pull-request.

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
Please download the Nuget command line utility [nuget.exe](http://nuget.org/nuget.exe) into the Galileo-SDK source folder.

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

![Nuget Reinstall](images/Nuget_Reinstall.png)

###Install it!
Your updates will be there.


### Notes!
* While you can change your local headers, they will get nuked when reinstalling the nuget package.
* Don’t check in your packages...
* Don’t check in binaries

___

#Best Practices

##Do not check in binaries
Once a binary is added to the repository, it will be there forever.

Please do not add binaries to Git including:
* The output from a build (debug/release)
* SDF file (code database)
* Nuget package directories

Acceptable binaries:
* PNG, JPG, or other image formats


