---
layout: default
title: How to Contribute
description: Learn how you can use Git to contribute to the Windows 10 IoT Core developer content.
keyword: windows 10, iot, git, github
permalink: /en-US/Contribute.htm
lang: en-US
---

# How to Contribute
Thank you for your interest in contributing to the Windows Developer Program for IoT.

We're actively accepting work for the following areas:

* [Getting Started Guide](https://github.com/ms-iot/content)
* [Galileo SDK](https://github.com/ms-iot/galileo-sdk)
* Tutorials
* Adding or removing pointers to Projects
* Adding or removing pointers to Library Ports
* Adding or removing pointers to Arduino Shield Ports

___

## References
1. [GitHub Documentation](https://help.github.com/)
2. [Git Cheatsheet!](https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true)
3. [Git Documentation](http://www.git-scm.com/book/en/)

___

## Git Guidelines

1. Must be auto-mergable.
    * You should have done the work so that we can automatically merge your changes with the current state of the repository. Otherwise we will reject your pull-request and wait until you have fixed it.
2. Never have duplicate commits
___

## Fork the repository
1. Create a GitHub account by starting at [GitHub Home](https://github.com/)
2. Go to [GitHub Home](https://github.com/) and navigate to the repository you'd like to contribute to, then click *Fork*  
  ![Fork]({{site.baseurl}}/Resources/images/GitHubFork.png)
3. On GitHub, Navigate to your account's fork of the repository
4. Clone the repository in one of two ways:
    1. You can use command line <br/>
    <kbd>git clone [link to .git] [NameYourLocalFolder]</kbd>
    2. Or launch the GitHub app by clicking 'Clone in Desktop' on the right hand side of the repository  
    ![Clone]({{site.baseurl}}/Resources/images/GitHubClone.png)

___

## Using Git
If you are editing a fork of ms-iot/content, please submit pull request off of develop.<br/>

For clarification, what we mean when we say:<br/>
**local repository:** the cloned repository that you have one on your machine<br/>
**forked repository:** the fork you made from the main repository. This sits up on github's servers. (Also known as <b>"origin"</b>)<br/>
**main repository:** the original repository that you forked from. This is the common ms-iot repository hosted on github's servers. (Also known as <b>"upstream"</b>)<br/>

### Setting up
1. Set up your upstream
    * <kbd>git remote add upstream [link to .git]</kbd>

### Making changes
1. Before starting, make sure to read [GitHub Home](https://github.com/) for topic authoring guidance.
2. Make your edits, build, and test. Use the repository's readme for any specific editing requirements, build instructions, and testing methods.
    * <kbd>git add [file]</kbd>
3. Commit your changes to your local repository.
    * <kbd>git commit -m "[descriptive message]" </kbd>

### Submitting a Pull Request
1. After you submit your first pull request, if you have not already signed a Contribution License Agreement, then our Contribution License Agreement service will request you to sign a Contribution License Agreement. We request you to complete this electronic request. Without completing this step, we unfortunately cannot accept a pull request. You only need to do this once.
2. Fetch upstream
    * <kbd>git fetch --all</kbd>
3. Rebase upstream (This should now put your changes on top of the main repository's history.)
    * <kbd>git rebase -i upstream/develop</kbd>
    * This may highlight conflicts that you will have to hand-merge
        * You can use your favorite merging tool or even notepad for this.
    * After hand-merging, you can continue the rebase
        * <kbd>git add [fileYouHandMerged]</kbd>
        * <kbd>git rebase --continue</kbd>
4. Force-push your changes to your forked repository.
    * <kbd>git push -f origin develop</kbd>
5. Now submit your pull request from your forked repository using the GitHub website.

### Making changes to a Pull Request
1. Make your new changes, fetch upstream, rebase upstream, and force-push your changes.
    * If your pull request was never closed, you should not have to submit a new pull request. It should automatically update.

___

## Best Practices

### Do not check in binaries
Once a binary is added to the repository, it will be there forever.

Please do not add binaries to Git including:
* The output from a build (debug/release)
* SDF file (code database)
* Nuget package directories

Acceptable binaries:
* PNG, JPG, or other image formats
