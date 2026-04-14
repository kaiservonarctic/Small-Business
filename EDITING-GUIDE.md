# How to Update This Website

This guide explains how to make two kinds of changes to the Federal Small Business Contracting Guide website:

1. **Content changes** — updating text, adding new topics, changing stats, fixing typos
2. **Visual changes** — adjusting colors, fonts, spacing, or layout

Each type of change uses a different tool, but both follow the same basic principle: you make a change, save it, and the website automatically rebuilds and publishes itself within about a minute.

---

## Part 1: Updating Content (Text, Data, Links)

**Tool:** Pages CMS (a web-based editor)

All of the website's text lives in JSON data files inside the `src/_data/` folder — one file per section (e.g., `home.json`, `programs.json`, `resources.json`). Pages CMS gives you a friendly form-based editor so you never have to open those files directly.

### Getting started

1. Go to **pagescms.org** and log in with your GitHub account.
2. Select the **Small-Business** repository.
3. You will see a sidebar on the left with tabs like "Site Settings," "Home Page," "Foundations," "SBA Programs," and so on. Each tab controls one section of the website.

### Making a content change

**Example: Updating the "Last Updated" date**

1. Click **Site Settings** in the sidebar.
2. Find the field labeled **Last Updated**.
3. Change the text from "April 2026" to whatever the current date is.
4. Click **Save** at the top of the page.
5. Pages CMS will save your change to the corresponding data file on GitHub (in this case, `src/_data/meta.json`). Netlify detects the change and rebuilds the site. Your update will be live within about a minute.

**Example: Editing a topic in the Foundations section**

1. Click **Foundations** in the sidebar.
2. Scroll down to the **Topics** list. You will see each topic as an expandable item.
3. Click on the topic you want to edit (for example, "The Rule of Two").
4. Edit the text in the **Paragraphs** fields. Each paragraph is a separate text box.
5. Click **Save**.

**Example: Adding a new SBA Program**

1. Click **SBA Programs** in the sidebar.
2. Scroll to the **Programs** list.
3. Click the button to add a new item (usually a "+" or "Add" button).
4. Fill in the fields: Program Name, Statute, Regulations, Status Label, Status Color (choose red, green, or yellow from the dropdown), Description, and Current Status.
5. Click **Save**.

**Example: Adding a new resource link**

1. Click **Resources** in the sidebar.
2. Find the category you want to add a link to (for example, "Registration & Certification").
3. Click into that category's **Links** list and add a new item.
4. Fill in the Link Name, Description, and URL.
5. Click **Save**.

### Tips for content editing

- **Bold text:** Wrap words in double asterisks. For example, typing `**important**` will display as **important** on the website.
- **Italic text:** Wrap words in single asterisks. For example, `*statutory*` will display as *statutory*.
- **Saving:** Every time you click Save, Pages CMS creates a new version in GitHub. If you ever make a mistake, the previous version is preserved and can be restored.
- **Multiple edits:** If you have several changes to make across different sections, you can make them one at a time. Each save triggers a fresh rebuild.
- **No coding required.** You are only editing text in form fields. The website handles all the formatting automatically.

---

## Part 2: Updating Visuals (Colors, Fonts, Spacing, Layout)

**Tool:** The CSS file (`css/style.css`) edited through GitHub

The website's appearance is controlled by a stylesheet — a file that tells the browser what colors, fonts, sizes, and spacing to use. This file is separate from the content, so visual changes never affect your text and vice versa.

### Where to make visual changes

The file you need to edit is: **css/style.css**

You can edit it in two ways:

**Option A: Edit directly on GitHub (easiest)**

1. Go to your repository on **github.com**.
2. Navigate to the **css** folder, then click on **style.css**.
3. Click the **pencil icon** (edit button) in the upper right of the file view.
4. Make your changes (see examples below).
5. Scroll down, type a short description of what you changed (for example, "Changed header color to navy blue"), and click **Commit changes**.
6. Netlify will rebuild the site automatically.

**Option B: Ask Claude to make the change**

If you are not comfortable editing CSS directly, you can describe what you want in plain English to Claude (in Claude Code or Claude Chat) and have it make the edit for you. For example: "Make the section headings dark red instead of blue" or "Increase the font size of the body text."

### Common visual changes and where to find them

All of the main colors, fonts, and sizes are defined at the top of `style.css` in a section that looks like this:

```
:root {
  --primary: #1a4480;
  --primary-dark: #162e51;
  --accent: #e5a000;
  --success: #00a91c;
  --warning: #e5a000;
  --error: #d54309;
  --bg: #f0f0f0;
  --white: #ffffff;
  --text: #1b1b1b;
  --text-light: #565c65;
  --font-sans: 'Source Sans 3', ...;
  --font-serif: 'Merriweather', ...;
}
```

Here is what each one controls:

| Variable | What it controls | Example change |
|---|---|---|
| `--primary` | Main blue color (nav links, headings, accents) | Change `#1a4480` to `#b50000` for red |
| `--primary-dark` | Dark blue (navbar background, section headings) | Change `#162e51` to `#1a1a2e` for darker navy |
| `--accent` | Gold/yellow accent (borders, highlights) | Change `#e5a000` to `#2e8b57` for green |
| `--bg` | Page background color | Change `#f0f0f0` to `#ffffff` for white |
| `--text` | Main body text color | Change `#1b1b1b` to `#333333` for softer black |
| `--font-sans` | Body text font | Replace `'Source Sans 3'` with another font name |
| `--font-serif` | Heading font | Replace `'Merriweather'` with another font name |

To change a color, simply replace the color code (the `#` followed by six characters) with a new one. You can find color codes using any online color picker — search "hex color picker" in your browser.

### Visual changes that require template edits

Some visual changes go beyond colors and spacing. For example:

- **Rearranging the order of sections** — edit `src/index.njk`
- **Changing what fields display on a program card** — edit `src/_includes/partials/programs.njk`
- **Adding a completely new section type** — requires a new template file in `src/_includes/partials/`

For these kinds of structural changes, it is best to describe what you want to Claude and let it make the edits. These files use a templating language called Nunjucks, which is not difficult but is not plain English either.

---

## Summary: Which tool for which task?

| I want to... | Use this | Where |
|---|---|---|
| Fix a typo | Pages CMS | pagescms.org |
| Update a statistic | Pages CMS | pagescms.org |
| Add a new topic or resource | Pages CMS | pagescms.org |
| Change a program's status color | Pages CMS | pagescms.org |
| Change the site's color scheme | GitHub (edit `css/style.css`) | github.com |
| Change font sizes or spacing | GitHub (edit `css/style.css`) | github.com |
| Rearrange sections or change page structure | Ask Claude | Claude Code or Claude Chat |
| Something you are not sure about | Ask Claude | Claude Code or Claude Chat |

---

## How the pieces fit together

```
You edit content          You edit visuals
in Pages CMS        or   in css/style.css on GitHub
       |                         |
       v                         v
  Pages CMS saves          You commit the
  to src/_data/*.json      change on GitHub
       |                         |
       +------------+------------+
                    |
                    v
          GitHub receives the change
                    |
                    v
          Netlify detects the new commit
                    |
                    v
          Eleventy builds fresh HTML pages
          from data files + templates + CSS
                    |
                    v
          Updated website is live
          (usually under 1 minute)
```

Every change you make — whether it is a text edit in Pages CMS or a color tweak in the CSS file — follows this same automatic pipeline. You never need to manually deploy or upload anything.
