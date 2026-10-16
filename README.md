# yash tajne — portfolio (svelte + bun)

Static personal site for github pages. Svelte 5 + Vite, managed with bun.
No SSR, no backend — `bun run build` emits `dist/`, deployed via
`.github/workflows/deploy.yml`.

## Develop

```sh
bun install
bun run dev
```

## Build / preview

```sh
bun run build
bun run preview
```

## Deploy

Push to `main` — the workflow builds with bun and publishes `dist/` to Pages.
Works as a project page (`yashtajne.github.io/Portfolio/`, `base: './'`)
or copied into a `yashtajne.github.io` user repo.

## Notes

- Featured work (Pure / PureShell / VIRE) is hardcoded in `src/App.svelte`.
- The full repo list fetches live from `api.github.com/users/yashtajne/repos`
  with a committed fallback in `src/lib/repos.js`.
- Old plain-HTML version was replaced in the svelte rewrite (oct 2026).
