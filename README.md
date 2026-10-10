# xeno51.github.io

Source of [Adriano Innocenzi](https://xeno51.github.io)'s personal website.

Built with [Hugo](https://gohugo.io/) 0.167.0 (extended), using the site's own
templates and plain CSS: no theme, no Node.js. GitHub Actions builds and
deploys it on every push to `main` (`.github/workflows/deploy.yml`).

## Preview

```bash
hugo server
```

Then open http://localhost:1313.

## Layout

| Path | What it holds |
|---|---|
| `hugo.toml` | Site title, description, menu, the style in use |
| `content/` | Page text in Markdown; the bio is `content/_index.md` |
| `data/` | The facts: `profile.yaml`, `publications.yaml`, `cv.yaml` |
| `assets/images/` | Photos, resized by Hugo at build time |
| `assets/css/` | `base.css` (layout, components) and `styles/signal.css` (the look) |
| `assets/js/site.js` | The light/dark button and the BibTeX copy buttons |
| `layouts/` | Page templates: `home.html`, `publications.html`, `cv.html`, `baseof.html` (the frame) |
| `layouts/_partials/page/` | Head, header and footer of every page |
| `layouts/_partials/home/` | The home page's sections, one file each |
| `layouts/_partials/components/` | Pieces used on several pages: a publication, a timeline, the profile buttons |
