---
layout: code
title: How to Contribute
permalink: /Contribute.htm
---

# How to Contribute
Thank you for your interest in contributing to the Windows Developer Program for IoT.

We're actively accepting work for the following areas:

* <a href="https://github.com/ms-iot/content" target="_blank">Getting Started Guide</a>
* <a href="https://github.com/ms-iot/galileo-sdk" target="_blank">Galileo SDK</a>
* Tutorials
* Adding or removing pointers to Projects
* Adding or removing pointers to Library Ports
* Adding or removing pointers to Arduino Shield Ports

___

## References
1. <a href="https://help.github.com/" title="GitHub documentation" target="_blank">GitHub Documentation</a>
1. <a href="https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true" title="Git Cheatsheet!" target="_blank">Git Cheatsheet!</a>
1. <a href="http://www.git-scm.com/book/en/" title="Git Documentation" target="_blank">Git Documentation</a>

___

## <a href="ContributionGuidelines.htm">Guidelines</a>
___

## Fork the repository
1. Create a GitHub account by starting at <a href="https://github.com/" target="_blank">GitHub Home</a>
1. Go to <a href="https://github.com/" target="_blank">GitHub Home</a> and navigate to the repository you'd like to contribute to, click *Fork*  
  ![Fork](images/GitHubFork.png)
1. On GitHub, Navigate to your account's fork of the repository
1. Clone the repository in one of two ways:
    1. You can use command line <br/>
    <kbd>git clone [link to .git] [NameYourLocalFolder]</kbd>
    1. Or launch the GitHub app by clicking 'Clone in Desktop' on the right hand side of the repository  
    ![Clone](images/GitHubClone.png)   

___

##Using Git
If you are editing a fork of ms-iot/content, please submit pull request off of develop.<br/>
If you are editing a fork of ms-iot/galileo-sdk, please submit pull request off of develop.

For clarification, what we mean when we say:<br/>
**local repository:** the cloned repository that you have one on your machine<br/>
**forked repository:** the fork you made from the main repository. This sits up on github's servers. (Also known as <b>"origin"</b>)<br/>
**main repository:** the original repository that you forked from. This is the common ms-iot repository hosted on github's servers. (Also known as <b>"upstream"</b>)<br/>

###Setting up
1. Set up your upstream 
    * <kbd>git remote add upstream [link to .git]</kbd>

###Making changes
1. Make your edits, build, and test. Use the repository's readme for any specific editing requirements, build instructions, and testing methods.
    * <kbd>git add [file]</kbd>
1. Commit your changes to your local repository.
    * <kbd>git commit -m "[descriptive message]" </kbd>
    
###Submitting a Pull Request
1. Before you submit your first pull request, we ask you to fill out a <a href="https://cla.msopentech.com" target="_blank">Microsoft Open Technologies Contribution License Agreement</a>. Without this on file, we unfortunately cannot accept a pull request. In the agreement, please include the GitHub user id you are submitting the pull request from. You only need to do this once.
1. Fetch upstream
    * <kbd>git fetch \-\-all</kbd>
1. Rebase upstream (This should now put your changes on top of the main repository's history.)
    * <kbd>git rebase -i upstream/develop</kbd>
    * This may highlight conflicts that you will have to hand-merge
        * You can use your favorite merging tool or even notepad for this.
    * After hand-merging, you can continue the rebase
        * <kbd>git add [fileYouHandMerged]</kbd>
        * <kbd>git rebase \-\-continue</kbd>
1. Force-push your changes to your forked repository.
    * <kbd>git push -f origin develop</kbd>
1. Now submit your pull request from your forked repository using the GitHub website.

###Making changes to a Pull Request
1. Make your new changes, fetch upstream, rebase upstream, and force-push your changes.
    * If your pull request was never closed, you should not have to submit a new pull request. It should automatically update.
    
___

#Iterating on the Galileo SDK
Fork  ms-iot/galileo-sdk as described above in the contribute section and follow the README instructions.

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