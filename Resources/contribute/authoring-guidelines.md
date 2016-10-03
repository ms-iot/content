# Authoring guidelines and best practices

## Guidelines

When creating a new topic, or updating an exisitng one, there are a handful of things to keep in mind.

1. **Creating a new topic:**

  When creating new content, please start with the following templates (view in *Raw* mode):

  * [Sample template](template/sample-template.md)
  * [Documentation template](template/docs-template.md)
  
  **Be sure to add** your file to the correct index file:
  
  * Samples add to [_samples.json](/_data/_samples.json)
  * Docs add to [_docs-index.json](/_data/_docs-index.json)

2. **Save your files in the following directories**

  * Images: `content/Resources/images/<folder name>/<your filename>`
  * Documentation: `content/en-US/Docs`
  * Samples: `content/en-US/Samples`

**File naming rules**
  - Use upper camel case (e.g. BackgroundColor) when naming your files. Don't use hyphens or underscores in file names.
  - Use descriptive keywords that add context, relevance, and are human readable.
  - Do not use a trailing slash or special characters or spaces.
  - Do not use more than 80 characters - this is a publishing system limit.

**Changing file names, moving files, and redirects**
If you need to change a file name, be sure to:
- Change the .md file name and permalink. The filename and permalink should always match.
- Update the TOC.
- Update any links to the changed page. Be sure to search the entire repo for references to the old page location that need to be updated.
- When moving a file: Leave the existing file in it's old location, with the original permalink. Change the layout to "redirect" and delete all content under the metadata (section contained between ---) and place the following code in:
  `{% include redirect.html url="/windows/iot/<newURL>" %}`
This will create a client side redirect to the new page for any external links or bookmarks our users have. 
- Add a line of text that says something like, "This page has been redirected to Topic Name." Use whatever text you like as long as the viewer is sent to the updated content. Removing the content and adding this message informs anyone who sees the old page in the repo/database that it's a redirected topic. When you commit your changes, add "Redirected page" or something similar in the commit changes title so that it's obvious in the file list that this is a redirected page.
- Ideally, submit a single Pull Request (PR) that contains all of the above commit changes together. Once the PR is submitted, email the [IoT Docs Site Managers](mailto:IOT-WOD@microsoft.com) a mapping of the old urls to the new urls, so we can put a permanent server redirect in place to clean up search results. (For an example, see this [redirected Docs page](https://github.com/ms-iot/content/blob/develop/en-US/win10/Docs.md)).

3. **Writing in markdown**

  For manageability and consistent look and feel, we enforce that our docs and samples be written in [Markdown](https://daringfireball.net/projects/markdown/basics). Complex formatting can be done with Liquid templates - details on those below.
   
  We will make exceptions to use html if needed.
  
  Good examples:

  * Docs: `content/en-us/docs/PowerShell.md` 
  * Samples: `content/en-us/samples/helloworld.md`

4. **Misc guidelines**

  * Use only one H1 (#) per topic / file
    * Very important for SEO
  * H1 and title (in the metadata) should be the same
    * (e.g. title: AllJoyn and `#AllJoyn`)
  * Fill out metadata
    * At the top of each file, you'll see a section starting and ending with "---" where metadata for that topic lives.  Fill this section with information pertaining to the topic you're working on.

## Best Practices



### Do not check in binaries
Once a binary is added to the repository, it will be there forever.

Please do not add binaries to Git including:
* The output from a build (debug/release)
* SDF file (code database)
* Nuget package directories

Acceptable binaries:
* PNG, JPG, or other image formats

### Liquid templates and common files

Our build system supports liquid templates (those sections with the % signs in them).  This allows us to include commonly used snippets or insert a bit of html without needing to write it in manually.  The plus side is it allows us to use common things (think nice looking grid layouts or tables) or include a common sample in several different docs without copy/pasting.

These templates need to live within the _includes folder in the root, and are referenced by `{% include redirect.html url="http://www.microsoft.com" %}` which will insert whatever that file is at this point in your article.  You can add arguments or content to the include call. 

Examples on usage of [liquid basics](https://help.shopify.com/themes/liquid/basics) and the [liquid cheatsheet](http://cheat.markdunkley.com/) are a few pages that I find useful to learn about Liquid.

### Writing

There is much more that goes into a well written article than you'd think! Below are some suggestions of things to consider when proofreading your article.

**Voice**

Voice is, simply put, your writing style in terms of syntax, verbage, verbosity etc. When we're writing for the users of Windows IoT, we should align with the Windows Devices Group (WDG) [unified voice principles](https://worldready.cloudapp.net/StyleGuide/Read?id=2547). 

- **Warm and relaxed** We're natural. Less formal, more grounded in everyday conversations. Occasionally, we're fun (we know when to celebrate).
- **Crisp and clear** We're to the point. We write for scanning first, reading second. We make it simple above all.
- **Ready to lend a hand** We show customers we're on their side. We anticipate their real needs and offer great information at just the right time.
Also, please remember to **proof read.** Take a quick break from writing and review it with fresh eyes. You may find obvious mistakes that were not so obvious before.

**Title and headings** 

* Title and headings are **all sentence-case** (only first word and proper nouns capitalized).
* The **title should be an H1 (#)**. Only one H1 per topic.
* The **next level of headings should be H2 (##)**, and so forth. Don't skip heading levels.
* Avoid H4s, H5s, etc.

**Numbered lists and bulleted lists**

* **Use numbers to indicate steps** that go in a specific order (markdown = 1. Item, 2. Item).
* **Use bullets for lists** of unordered items (markdown = * item, or - item).
* **Use paragraphs** (no bullets or numbers) for text that’s not in a list.

**Terminology and abbreviations**
* **Use the same term throughout your doc**. Don't go back and forth between terms (such as “machine” and "computer" and "PC") when you are referring to the same thing. We have decided on the following terms: "Device" (referring to the Raspberry Pi board), "Peripheral" (for anything hooked up to the device/Raspberry Pi), and "PC" (referring to the computer). 
* **Do not abbreviate PowerShell** to PS unless it's part of a command. On first mention, use Windows PowerShell.
* **Do not abbreviate product names** unless there is a legally-approved acronym. *Official name of the Redstone 1 update to Windows 10: "Windows 10, version 1607". 
* **Spell out acronyms on first mention**, and include the acronym in parentheses. Thereafter, you can use the acronym by itself. 
**Example** – first mention: class identifier (CLSID); second mention: CLSID

**Formatting**
* **Use bold for UI entries**. (markdown = `**term**`)
Example: To start PowerShell as an administrator, right-click **Windows PowerShell**, and then select **Run as administrator**.
* **To emphasize a word, use italics**, not bold. (markdown = `*term*`)
* **For notes**, use the following liquid template: `{% include note.html text="This is a note" %}`
  * The same thing can be done with `tip.html`, and `warning.html`

**Links and cross-references**
* When you add a cross-reference, use this syntax: `For more information about *Foo*, see *Bar*.`
*Example:* "For a list of commands and utilities that you can use with PowerShell, see the [Command Line Utils]() page."
* **Format links** using the display name, not the URL, between the brackets: `[Display Name](URL)`.
* **Do not say, “Click here” or “Go here.”** Use the title of the page you’re pointing to.
* **Remove "en-us"** from TechNet and MSDN URLs (try them first). 
* **Remove ".htm"** from the any URL links. Do not use `https://developer.microsoft.com/en-us/windows/iot/docs/buildingappsforiotcore.htm`, instead use `https://developer.microsoft.com/en-us/windows/iot/docs/buildingappsforiotcore`. 
* **Add a "Related topics"** section (for topics in your repo) or "See also" or "Additional resources" section (for topics outside your repo) at the end of the page that at a minimum links back to your parent topic (to help users navigate).

**Images**
* **Resize your images** if they appear too big on stage or live.
* **Limit the number of your images** to only those you absolutely need to guide the user. Each image adds to page load time.

For more information, see the Windows Open Publishing Guide at http://aka.ms/windows-op-guide.



### References

1. [GitHub Documentation](https://help.github.com/)
2. [Git Cheatsheet!](https://github.com/github/training-materials/blob/master/downloads/github-git-cheat-sheet.pdf?raw=true)
3. [Git Documentation](http://www.git-scm.com/book/en/)

___

### How to contribute

1. [Get set up](get-setup.md)
2. [Making changes](making-changes.md) 
3. **[Authoring guidelines and best practices](authoring-guidelines.md)**

