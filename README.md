# xeno51.github.io

Source of [Adriano Innocenzi](https://xeno51.github.io)'s personal website.

Built with [Hugo](https://gohugo.io/) 0.167.0 (extended), using the site's own
templates and plain CSS: no theme, no Node.js.

## Preview

```bash
hugo server
```

Then open http://localhost:1313.

## Layout

| Path | What it holds |
|---|---|
| `content/` | Page text in Markdown (the bio is `content/_index.md`) |
| `data/` | Structured facts: `profile.yaml`, `publications.yaml`, `cv.yaml` |
| `layouts/` | HTML templates |
| `assets/css/` | `base.css` (structure) and `styles/signal.css` (the look) |
| `assets/js/site.js` | Light/dark toggle, BibTeX copy, a style switcher (off) |
| `assets/images/` | Photos, resized by Hugo at build time |
