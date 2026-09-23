# Ashton Gilmore’s portfolio

A small Eleventy site. Projects are Markdown files, layouts are shared, and all
portfolio theme settings live in **`src/styles/theme.css`**. There is no database,
CMS subscription, or browser-side framework.

## Preview locally

Install Node.js 20 or newer (22 recommended), then run:

```sh
npm ci
npm start
```

Open the localhost address printed in the terminal. Saving a project or stylesheet
updates the preview. To create the production site:

```sh
npm run build
```

The output is `_site/`. Do not edit it: each build regenerates it.

## Add a project

1. Copy `templates/project.md` to `src/projects/descriptive-name.md`.
2. Create `assets/descriptive-name/` and put your photos/files in it.
3. Fill in the fields above the second `---`. Give the project a unique lowercase
   `slug`, using hyphens between words. Use `/assets/...` paths for local files.
4. Write the body below the second `---` in ordinary Markdown. Small projects
   can be a single paragraph. Delete any headings you don't need.
5. Change `draft: true` to `draft: false` and save.
6. Run `npm run build` to catch missing required fields or asset paths. Commit and
   push the changes to publish. The project listing, categories, and project page
   are generated automatically.

The resulting URL is `/projects/your-slug/`. Keep the slug stable when renaming a
project so existing links continue to work. A draft is excluded from listings and
has no published page. Photos in the public `assets/` folder are still public,
including photos intended for draft projects; never put private files there.

### Essential fields

| Field | Purpose |
| --- | --- |
| `slug` | Unique URL segment, e.g. `router-tool-holder` |
| `title` | Project name |
| `summary` | One or two concrete sentences, also used on the homepage |
| `category` | One category; a filter is created automatically |
| `contribution` | What you personally did |
| `cover` | Local image path beginning `/assets/` |
| `coverAlt` | A useful description of the photo |

Optional fields: `tools`, `collaborators`, `links`, `gallery`, `imageFit: contain`,
`order` (lower appears first), and `featured: true`. Featured projects appear in
Selected work and the full collection. Aim for three featured projects; the layout
supports other counts.

Quote values containing colons or other punctuation. The template includes working
examples for galleries and downloadable files. Use photos of your actual work.
For faster pages, resize new photos to roughly 1600–2000 pixels wide and export
as WebP or JPEG. Give each image a descriptive filename.

## Change colors, fonts, or spacing

Edit **`src/styles/theme.css`**. Its `:root` variables control:

- Background, surface, text, muted text, accent, border, and focus colors.
- Body, heading, and label font families; text sizes and line heights.
- Page width, gutters, spacing scale, image proportions, and corner radius.

Every portfolio page loads this file. `src/styles/site.css` contains shared layout
rules using those variables. Add custom `@font-face` definitions in `theme.css` and
put font files under `assets/fonts/` if you want something beyond system fonts.
Choose text and background colors with sufficient contrast.

The preserved privacy policy and old cover letter are legacy documents; they retain
their original formatting. `style.css` in the repository root belongs only to the
legacy cover letter, not the redesigned portfolio.

## Edit your name, intro, résumé, or contact details

Edit **`src/_data/site.json`**. The résumé path is shared by the header, introduction,
and footer. Replacing the PDF at that path updates every résumé link. The current
PDF is carried over from the original site; review it before using it in applications.

Layout files:

- `src/_includes/base.njk` — document head, navigation, footer.
- `src/_includes/project.njk` — all project pages.
- `src/index.njk` — homepage and automatic project lists.

## Publish on GitHub Pages

This repository includes `.github/workflows/pages.yml`. Builds on pull requests
validate the site without deploying it. Changes pushed to `main` build and deploy.

**One-time setup:** in the GitHub repository, open **Settings → Pages → Build and
deployment → Source**, and select **GitHub Actions**. Keep the existing custom
domain `ashtongilmore.com` and HTTPS settings. The existing `CNAME` is preserved.

After merging the redesign into `main`, watch the **Build and deploy portfolio**
workflow in the Actions tab. If you change the Pages source after the merge, run
that workflow manually with **Run workflow**. No domain/DNS migration is needed.
Do not publish the source folder directly: publish the generated `_site` output.

The old `/belltower.html`, `/cipher.html`, and `/3dp_curriculums.html` links redirect
to the new project pages. `/privacypolicy.html` remains available.

## Content review

The redesign reuses the original project's claims and photos, with shorter text
and explicit collaborator credit. Before publication, verify claims such as print
iterations and classroom testing. No new employers, qualifications, performance
figures, or software projects have been invented.
