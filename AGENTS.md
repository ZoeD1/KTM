# AGENTS.md

## What this repo is
A plain static website (no framework, no build step, no package manager):
`index.html`, `products.html`, `about.html`, `contact.html`, plus `style.css`,
`site.js`, `contact-details.js` and the `assets/` image folder. There is no
backend, no database and no external credentials.

## Running it in the Base44 sandbox
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The `web` service is `nginx:alpine` serving the repository root directly from a
read-only bind mount, listening on host port 3000. Because the files are served
straight from the source tree, an edit to any HTML/CSS/JS file is visible on the
next page load — there is nothing to rebuild and no dev server to restart.

Non-obvious details:
- The sandbox checkout is mounted with mode `0700`, so the nginx config
  (`docker/nginx.base44.conf`) sets `user root;` for the worker processes.
  Without it nginx returns 403 when walking the served directory. This is a
  sandbox-only quirk; the site itself is unchanged.
- `docker/nginx.base44.conf` replaces the image's main config, listens on 3000
  and uses `server_name _;` so it accepts the preview proxy's `Host` header.
- The only external reference is Google Fonts (Vazirmatn), loaded at runtime with
  Tahoma as fallback, so the site renders fine offline.
- The inquiry form on the contact page only prepares text for copying; it does
  not send or store anything.

## Verifying it works
```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:3000/
```
All four pages, `style.css`, `site.js`, `contact-details.js` and the images in
`assets/` should return 200. The compose healthcheck probes `/` over HTTP.
