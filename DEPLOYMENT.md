# Deploying Fashion Freude to Hostinger

The project is a monorepo deployed as **two Web Apps** plus one MySQL database:

| Piece | Folder | URL | Hostinger app type |
| --- | --- | --- | --- |
| Storefront (React) | `client/` | `https://fashionfreude.com` | React (static build) |
| API (Express) | `server/` | `https://api.fashionfreude.com` | Express (Node) |
| Database | — | — | MySQL (hPanel) |

Uploaded product images are served by the API at `https://api.fashionfreude.com/uploads/...`.

---

## 1. Create the database

1. hPanel → **Databases → MySQL Databases** → create a database and user.
   Hostinger prefixes names, e.g. `u123456_shopsphere` / `u123456_ffuser`. Note them down.
2. Open **phpMyAdmin** → select the database → **Import** → upload `shopsphere.sql`.

The tables are `Categories`, `Products`, `Orders`, `Users` (capitalised — Sequelize's naming).

---

## 2. Deploy the API (`api.fashionfreude.com`)

1. hPanel → create the subdomain **`api.fashionfreude.com`**.
2. **Websites → Web Apps → Create**, connect the GitHub repo, branch `main`.
3. Settings:
   - **Framework:** Express
   - **Node version:** `20.x` (most reliable for this project)
   - **Root / base directory:** `server`
   - **Install command:** `npm install`
   - **Start command:** `node server.js`
   - Attach it to the `api.fashionfreude.com` subdomain.

   > If the panel has no "root directory" option, use these from the repo root instead:
   > install `npm install --prefix server`, start `node server/server.js`.

4. **Environment variables** (set in the panel — `.env` files are gitignored and are *not* in the repo):

   | Variable | Value |
   | --- | --- |
   | `DB_HOST` | `localhost` |
   | `DB_NAME` | `u123456_shopsphere` |
   | `DB_USER` | `u123456_ffuser` |
   | `DB_PASSWORD` | your DB password |
   | `JWT_SECRET` | generate: `openssl rand -hex 48` |
   | `CORS_ORIGIN` | `https://fashionfreude.com,https://www.fashionfreude.com` |

   **Do not set `PORT`** — Hostinger injects it and `server.js` already reads `process.env.PORT`.
   **Leave `DB_SYNC_ALTER` unset.** Turning it on makes Sequelize re-add a duplicate unique index on every boot.

5. Deploy, then enable **SSL** for the subdomain.

Verify: `https://api.fashionfreude.com/api/products` should return JSON.

---

## 3. Deploy the storefront (`fashionfreude.com`)

1. **Websites → Web Apps → Create**, same GitHub repo, branch `main`.
2. Settings:
   - **Framework:** React
   - **Node version:** `20.x`
   - **Root / base directory:** `client`
   - **Install command:** `npm install`
   - **Build command:** `npm run build` (this also compiles Tailwind via the `prebuild` script)
   - **Output directory:** `build`

   > Without a root-directory option: install `npm install --prefix client`,
   > build `npm run build --prefix client`, output `client/build`.

3. No environment variables needed — `client/.env.production` (committed) already points the app at
   `https://api.fashionfreude.com`. If the API domain ever changes, edit that file and rebuild.
4. Attach the domain, enable **SSL**.

**SPA routing:** React Router needs every path to serve `index.html`. Hostinger's React preset
normally handles this; if refreshing `/product/some-slug` 404s, add a rewrite of all paths to
`/index.html` in the app's settings.

---

## 4. Sitemap & SEO

`client/public/sitemap.xml` is **generated automatically before every build** by
`client/scripts/generate-sitemap.js`, so it ships with the storefront and is served at
**https://fashionfreude.com/sitemap.xml** (the correct domain — not the API subdomain).

It contains:

| Section | Source |
| --- | --- |
| 7 static pages | hard-coded list (cart, checkout, login, register, admin are excluded) |
| 20 blog articles | filenames in `client/src/blogs/` — stays in sync automatically |
| categories | `GET /api/categories` |
| products | `GET /api/products` (uses each row's real `updatedAt` as `lastmod`) |

`client/public/robots.txt` already references the sitemap and disallows `/admin`.

**The API must be reachable during the storefront build** for products and categories to be
included. If it isn't, the build still succeeds — it just writes the static pages and blogs, and
the next rebuild picks the rest up. So deploy the API app first, then the storefront.

Regenerate manually with `npm run sitemap` (inside `client/`). The file is gitignored because it
is a build artifact.

After going live, submit `https://fashionfreude.com/sitemap.xml` in **Google Search Console**.

> The Express app also exposes a dynamic sitemap at `api.fashionfreude.com/sitemap.xml`. It is
> redundant now and can be ignored — the canonical one is on the storefront domain.

---

## 5. Updating after a push

`git push` to `main` → redeploy both apps (Hostinger can auto-deploy on push).
Only touched the frontend? Redeploying the storefront app alone is enough.

---

## Environment files

| File | Committed? | Used when |
| --- | --- | --- |
| `client/.env` | no | local dev (`npm start`) |
| `client/.env.production` | **yes** (public URLs only) | `npm run build` — API origin + sitemap `SITE_URL` |
| `server/.env` | no | local dev |
| `server/.env.production` | no — **secrets** | when `NODE_ENV=production` |
| `server/.env.production.example` | **yes** | template to copy |

**How the server picks a file:** `server.js` loads `.env.<NODE_ENV>` when that file exists,
otherwise `.env`. So with `NODE_ENV=production` it reads `.env.production`; locally it reads `.env`.

**Precedence:** real environment variables always win — dotenv never overwrites them. That means
values set in Hostinger's Web App panel override anything in a file, so on Hostinger you can set
them in the panel and skip `server/.env.production` entirely.

To use a file instead:
```bash
cp server/.env.production.example server/.env.production   # then fill in real values
```

**Client:** `client/.env.production` is the single source of truth for the API URL and the sitemap
origin — it is read both by the React build and by `scripts/generate-sitemap.js`. A shell variable
still overrides it, e.g. `REACT_APP_BASE_URL=http://localhost:5001 npm run build`.

---

## Troubleshooting

**API calls fail with a CORS error in the browser**
`CORS_ORIGIN` must list the exact storefront origins, comma-separated, with scheme and no
trailing slash — e.g. `https://fashionfreude.com,https://www.fashionfreude.com`.
The allowlist lives in `server/src/app.js`.

**Products load but images are broken**
Images come from the API at `/uploads/...`. Check `https://api.fashionfreude.com/uploads/<file>`
loads directly, and that the `server/uploads` folder deployed (it is tracked in git).

**Refreshing a deep link 404s** — SPA rewrite missing, see step 3.

**Login returns "secretOrPrivateKey must have a value"** — `JWT_SECRET` isn't set on the API app.

**Newly uploaded images disappear after a redeploy**
The 143 existing images ship in the repo, but images uploaded through the admin are written to
the app's disk, which is typically wiped on redeploy. Moving uploads to object storage (S3,
Cloudinary) is the long-term fix.

---

## Pre-deploy checklist

- [ ] `shopsphere.sql` imported
- [ ] API env vars set (`DB_*`, `JWT_SECRET`, `CORS_ORIGIN`); `PORT` **not** set
- [ ] SSL enabled on both the domain and the subdomain
- [ ] `public/index.html` loads the fonts the design uses (Cormorant Garamond + Jost) —
      otherwise the production build falls back to default fonts
