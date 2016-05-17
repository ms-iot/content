# Creating a topic

When creating a new topic, or updating an exisitng one, there are a handful of things to keep in mind.

Going forward, we're doing everything we can to stick to .md files.  We know that there are times when we can't rely on the limited formatting of .md, but for those times we'll use a liquid template instead of converting it all to html.  For information on those templates, see below.

There is a sample topic you can use as a starting point - just copy and paste it into your blank document and update it to your liking.  [That template can be found here]({{site.baseurl}}/Resources/contribute/Templates/standard-topic.md)

Here are a few things we need to adhere to - PRs will be denied until they are fixed.

### Single H1

For SEO, we need a single H1 (#) per topic.  This should match or at least be very close to the page title - do everything you can to have those match!

### Fill out frontmatter

At the top of each file, you'll see a section starting and ending with "---" where metadata for that topic lives.  Fill this section with information pertaining to the topic you're working on.  What those fields should be can be found in the sample template provided [here]({{site.baseurl}}/Resources/contribute/templates/standard-topic.md).

### Images, and where to put them

Images should all live under `root/Resources/images/<informative name>/<your filename>`.  You can name your image whatever makes sense to you, but for the informative file name, please use or create a folder that makes sense for the use of your image.  For example, there is a "Noobs" folder for all the images used in the Noobs topics - it spans multiple articles but has a consolidated use.  If there isn't a folder that fits what your images are for, please create a new folder for your images.

Do note, images should not be placed in `Resources/images/` without that parent folder.  Images currently there will be moved shortly.

### Descriptive file names

When creating a new file, be as descriptive as possible without making your titles too long.  Keep using the upper camel case (e.g. BackgroundColor).

### Folder architecture and where to put your files

You'll notice our repo structure has changed - we now have a parent folder matching each high level page (Docs, Downloads etc.)  Put your file under the folder that matches the name of the high level page it will be linked from.  For example, if I'm adding information on AllJoyn, it will live under the "Docs" folder.

### Liquid templates and common files

Our build system supports liquid templates (those sections with the % signs in them).  This allows us to include commonly used snippets or insert a bit of html without needing to write it in manually.  The plus side is it allows us to use common things (think nice looking grid layouts or tables) or include a common sample in several different docs without copy/pasting.

These templates need to live within the _includes folder in the root, and are referenced by `{% include redirect-dc.html %}` which will insert whatever that file is at this point in your article.  You can add arguments or content to the include call. TODO: add examples.
