# extract-color

Drop, paste, or select an image to extract its dominant color palette — with HEX and RGB values you can copy on click.

Live at **[extract-color.freeappstore.online](https://extract-color.freeappstore.online)**

---

## Features

- **Three ways to load an image** — drag-and-drop, click to browse, or paste from clipboard (`⌘V` / `Ctrl+V`)
- **Adjustable palette size** — pick 3–10 colors with a single tap
- **Copy on click** — click any HEX or RGB value to copy it to the clipboard
- **Fully client-side** — no uploads, no server, no tracking
- **PWA** — installable, works offline after first load
- **Dark mode** — follows system preference

## Tech

- Vite + React 19 + TypeScript
- [colorthief](https://github.com/lokesh/color-thief) for median-cut palette extraction
- Tailwind CSS v4 (utility classes only, no config file)
- `@freeappstore/sdk` — Shell, BuildInfo
- 75 KB gzipped

## Dev

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build → web/dist/
```

## Compliance

```bash
npx @freeappstore/cli check          # static checks
npx @freeappstore/cli screencheck    # browser layout across 12 viewports
```

Both must pass before merging to `main`. Pushing to `main` auto-deploys to Cloudflare R2 via GitHub Actions.

## License

MIT — free to use, modify, and deploy.
