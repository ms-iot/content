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

Please read on to learn how to submit PRs, where to fork from, and helpful references for contributing to Windows IoT content!

We're actively accepting work and bug fixes for 

* [Documentation Guide](https://github.com/ms-iot/content) - **develop** branch
* [Projects](https://microsoft.hackster.io/)
* [Samples](https://github.com/ms-iot/samples)

To get you started with Git and GitHub, check out the below references, then go ahead and dive in!
___

### References

1. [GitHub Documentation](https://help.github.com/)
2. [Git Cheatsheet!](https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true)
3. [Git Documentation](http://www.git-scm.com/book/en/)

___

## Using Git

The basic flow of contributing will look like this:

1. Fork ms-iot/content into your account (create an account if you don't have one!)
2. Make your updates in your fork, just how you like them
3. When you're ready, submit a Pull Request (PR).
4. We'll evaluate your PR, and merge it in!

Keep in mind, we're only accepting PRs on the **develop** branch, so please make your changes in that branch!

How to do each one, and things to be aware of, are explained below.

### Fork the repository

1. Create a GitHub account by starting at [GitHub Home](https://github.com/)
2. Go to [GitHub Home](https://github.com/) and navigate to the repository you'd like to contribute to, then click *Fork*  
  ![Fork]({{site.baseurl}}/Resources/images/GitHubFork.png)
3. On GitHub, Navigate to your account's fork of the repository
4. Clone the repository in one of three ways:
    1. You can use command line <br/>
    <kbd>git clone [link to .git] [NameYourLocalFolder]</kbd>
    2. Or launch the GitHub app by clicking 'Clone in Desktop' on the right hand side of the repository  
    ![Clone]({{site.baseurl}}/Resources/images/GitHubClone.png)
    3. Or clone it through the GitHub Desktop application  
5. Set up your upstream
    * <kbd>git remote add upstream [link to .git]</kbd>
    
For clarification, what we mean when we say:
**local repository:** the cloned repository that you have one on your machine
**forked repository:** the fork you made from the main repository. This sits up on github's servers. (Also known as *"origin"*)
**main repository:** the original repository that you forked from. This is the common ms-iot repository hosted on github's servers. (Also known as *"upstream"*)

### Making changes

1. Before starting, make sure to read [how to contribute](https://github.com/ms-iot/content/tree/develop/Resources/contribute/topic-guidance.md) for topic authoring guidance.
2. Make your edits, build, and test. Use the repository's readme for any specific editing requirements, build instructions, and testing methods.
    * <kbd>git add [file]</kbd>
3. Commit your changes to your local repository.
    * <kbd>git commit -m "[descriptive message]" </kbd>

### Submitting a Pull Request

When you're ready to submit a PR, make sure you're up to date with our main repository, then submit the PR through GitHub's website.  Steps for doing so are:

1. Fetch upstream
    * <kbd>git fetch upstream</kbd>
2. Merge upstream/develop (This should now put the main repository's history into your fork)
    * <kbd>git merge upstream/develop</kbd>
    * This may highlight conflicts that you will have to hand-merge
        * You can use your favorite merging tool or even notepad for this.
    * After hand-merging, you can continue the rebase
        * <kbd>git add [fileYouHandMerged]</kbd>
        * Check your repositories status with <kbd>git status</kbd>. You may need to continue the merge to finish.
4. Push your changes to your forked repository.
    * <kbd>git push origin develop</kbd>
5. Now submit your pull request from your forked repository using the GitHub website.

After you submit your first pull request, if you have not already signed a Contribution License Agreement, then our Contribution License Agreement service will request you to sign a Contribution License Agreement. We request you to complete this electronic request. Without completing this step, we unfortunately cannot accept a pull request. You only need to do this once.

### Making changes to a Pull Request

1. Make your new changes, fetch upstream, merge upstream, and push your changes.
    * If your pull request was never closed, you should not have to submit a new pull request. It should automatically update.
    
### Git Guidelines

When evaluating PRs, the following guidelines must be met:

1. Must be auto-mergable.
    * You should have done the work so that we can automatically merge your changes with the current state of the repository. Otherwise we will reject your pull-request and wait until you have fixed it.
    * If, after you make your changes and submit your PR, you find it cannot be automerged, simply update your fork with the latest from our repo and fix the conflicts - that should make it auto-mergable
2. Never have duplicate commits

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
