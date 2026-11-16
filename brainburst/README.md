# BrainBurst website
A responsive, self-contained static marketing site with an interactive browser-only puzzle and a website privacy notice.

## Files
- index.html — site, styles, and game script
- privacy.html — website-specific privacy notice (review before production)
- favicon.svg — simple vector brand icon

## Staging URL
https://deepanchakkaravarthij.github.io/brainburst/

This staging site is published as a folder inside the existing user GitHub Pages repository. It does **not** change the Arrow Way home page or Search Console verification file.

## Recommended production deployment
1. Create a new **public** GitHub repository named brainburst-site.
2. Copy these website files to the repository root on its main branch.
3. GitHub repository > Settings > Pages > Deploy from a branch > main > / (root) > Save.
4. GitHub repository > Settings > Pages > Custom domain: brainburst.store > Save.
5. Namecheap > Domain List > brainburst.store > Manage > Advanced DNS: add four A records for @ targeting GitHub Pages IPs 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Add a CNAME for www to deepanchakkaravarthij.github.io.
6. Once DNS and certificate are ready, enable Enforce HTTPS on GitHub Pages.
7. Review homepage claims/game catalog, legal/privacy text and contact channel before promoting.

Do not set the current DEEPANCHAKKARAVARTHIJ.github.io repository custom domain to brainburst.store; that would change the existing Arrow Way Pages site. The new brand domain should use a separate repo.

Use relative asset URLs so the site works in both the staging folder and the production domain root. Static hosting is free on GitHub Pages for a public repository subject to GitHub limits. No backend database or login is included.