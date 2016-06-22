# Get Setup 

In order to contribute, you must first install Git on your machine:

#### Installing Git 

The easiest way to get all the Git tools is to download [GitHub Desktop](https://desktop.github.com/).  This will install Git, Git shell, GitHub Desktop, and keep you up to date.

#### Setting up Jekyll on Windows
1. We use this easy to follow [Jekyll on Windows](http://jekyllrb.com/docs/windows/) guide. Rouge is the option for highlighting that seems to work best for most users.

### Fork the repository

1. Create a GitHub account 
2. From GitHub Home, navigate to the repository you'd like to contribute to (e.g. ms-iot/content)
3. Click *Fork* ![Fork](../images/GitHubFork.png) 
4. Clone the repository in one of several ways: 
  1. Command line 
  
    `git clone [link to .git] [NameYourLocalFolder] `
  2. Launch the GitHub app 
  
     Click 'Clone in Desktop'
     
     ![Clone](../images/GitHubClone.png)
  3. Clone using the GitHub Desktop application. 
  4. Using your own git flow (e.g. sourcetree) 
5. Set up your upstream 

  `git remote add upstream [link to .git] ` 

For clarification, what we mean when we say:

**local repository:**: the cloned repository that you have one on your machine 

**forked repository:**: the fork you made from the main repository. This sits up on GitHub's servers. (Also known as "*origin*") 

**main repository:** the original repository that you forked from. This is the common ms-iot repository hosted on GitHub's servers. (Also known as "*upstream*") 

## [Next Step - Making changes](making-changes.md)
