# Creating a topic

When creating a new topic, or updating an exisitng one, there are a handful of things to keep in mind.

### Creating a new topic:

When creating new content, please start with the following templates:

[Sample template]()

[Documentation template]()

Save your files in the following directories:

* Images: `content/Resources/images`
* Documentation: `content/en-US/Docs`
* Samples: `content/en-US/Samples`

Writing in markdown:

For manageability and consistent look and feel, we enforce that our docs and samples be written in markdown. Complex formatting can be done with Liquid templates - details on those below.
 
We will make exceptions to use html if needed.

Good examples:

For Docs, take a look at content/en-us/docs/Alljoyn.md 
For Samples, take a look at content/en-us/samples/helloworld.md


First off, keep these things in mind when authoring content:

* For samples, please be sure to use the template provided to get the standard sample formatting - found under Templates in this folder.  Also, please use [Markdown](https://daringfireball.net/projects/markdown/basics) to get nice layout when rendered as a webpage.
* For samples, please append ```{:target="_blank"}```, so the link opens in a new page

There is a sample topic you can use as a starting point - just copy and paste it into your blank document and update it to your liking.  [That template can be found here](Templates/standard-topic.md).



Here are a few things we need to adhere to - PRs will be denied until they are fixed.

#### Single H1

For SEO, we need a single H1 (#) per topic.  This should match or at least be very close to the page title - do everything you can to have those match!

#### Fill out metadata

At the top of each file, you'll see a section starting and ending with "---" where metadata for that topic lives.  Fill this section with information pertaining to the topic you're working on.  What those fields should be can be found in the sample template provided [here](Templates/standard-topic.md).

#### Images, and where to put them

Images should all live under `/Resources/images/<informative name>/<your filename>`.  You can name your image whatever makes sense to you, but for the informative file name, please use or create a folder that makes sense for the use of your image.  For example, there is a "Noobs" folder for all the images used in the Noobs topics - it spans multiple articles but has a consolidated use.  If there isn't a folder that fits what your images are for, please create a new folder for your images.

**Note**, images should not be placed in `Resources/images/` without that parent folder.  Images currently there will be moved shortly.

#### Descriptive file names

When creating a new file, be as descriptive as possible without making your titles too long.  Keep using the upper camel case (e.g. BackgroundColor).

#### Folder architecture and where to put your files

You'll notice our repo structure has changed - we now have a parent folder matching each high level page (Docs, Downloads etc.)  Put your file under the folder that matches the name of the high level page it will be linked from.  For example, if I'm adding information on AllJoyn, it will live under the "Docs" folder.

#### Liquid templates and common files

Our build system supports liquid templates (those sections with the % signs in them).  This allows us to include commonly used snippets or insert a bit of html without needing to write it in manually.  The plus side is it allows us to use common things (think nice looking grid layouts or tables) or include a common sample in several different docs without copy/pasting.

These templates need to live within the _includes folder in the root, and are referenced by `{% include redirect.html url="http://www.microsoft.com" %}` which will insert whatever that file is at this point in your article.  You can add arguments or content to the include call. 

Examples on usage of [liquid basics](https://help.shopify.com/themes/liquid/basics) and the [liquid cheatsheet](http://cheat.markdunkley.com/) are a few pages that I find useful to learn about Liquid.

### Things to keep in mind while writing

When most of us write, we don't think too much about what we're writing except for the content we're trying to get across.  However, there is much more that goes into a well written article than you'd think!  Below are some suggestions of things to consider when proofreading your article.

#### Voice, and how did you explain it?

Voice is, simply put, your writing style in terms of syntax, verbage, verbosity etc.  When we're writing for the users of Windows IoT, we need to make sure we are presenting a relatively unified voice.  Now this doesn't mean you have to say certain things, but it does mean we have to keep the following in mind:

1. **Write in a supportive and informative way.** Most of all, this means writing in a way that doesn't come off as condescending to your audience - after all, we're trying to teach them about Windows IoT, we don't want them to feel like we're belittling them!
2. **Elaborate on any non-obvious point**.  Picking up from the first point, make sure you explain anything that some of our audience might not understand.  It is much better to over explain something and let those who know it skim over it, than to leave others who are new to the technology in the dark. 
3. **Maintain a single tense.**  Usually we prefer present tense - this is rarely a concern in our docs.
4. **Keep a clear logical flow** through your article.  If you must reference something that you don't explain until later, mention so.  Lists are helpful to keep your article flow in line.
5. **Be as direct as possible**. Shorter, more direct sentences are the best.  Give all the information the user needs, but try not to cover more than is needed to achieve their task.  If needed, provide a link to a related topic and let the audience decide if they want to read about the other topic.

### Best Practices

#### Do not check in binaries
Once a binary is added to the repository, it will be there forever.

Please do not add binaries to Git including:
* The output from a build (debug/release)
* SDF file (code database)
* Nuget package directories

Acceptable binaries:
* PNG, JPG, or other image formats



1. [Get set up](Resources/contribute/get-setup.md)
2. [Making changes](Resources/contribute/making-changes.md) 
3. **[Authoring guidelines and best practices](Resources/contribute/authoring-guidelines.md)**

___

### References

1. [GitHub Documentation](https://help.github.com/)
2. [Git Cheatsheet!](https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true)
3. [Git Documentation](http://www.git-scm.com/book/en/)