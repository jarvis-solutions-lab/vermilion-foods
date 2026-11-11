# Vermilion Foods — website

Static corporate website for **Vermilion Foods**, a trade name (DBA) of **VERMILION ALFA GROUP LLC**.
Plain HTML, one CSS file and one optional vanilla JS file. No build step, no frameworks, no third-party requests, no cookies, no forms.

## Structure

```
index.html            Home (English, default)
privacy.html          Privacy Policy
terms.html            Terms of Use
404.html              Self-contained bilingual error page (inline CSS)
es/index.html         Home (Spanish)
es/privacidad.html    Política de privacidad
es/terminos.html      Términos de uso
assets/css/styles.css Design tokens and all styles
assets/js/main.js     Progressive enhancement: mobile menu, reveal on scroll, footer year
assets/fonts/         Self-hosted WOFF2 (Cormorant Garamond 500/600, Inter 400/500) + OFL licenses
assets/img/           Logos (outlined SVG), favicon, apple-touch icon, Open Graph image
assets/img/photo-*    Three illustrative photographs as responsive derivatives (.webp srcset + one .jpg fallback each)
robots.txt            Allows all crawlers, points to sitemap.xml
sitemap.xml           Six pages with language alternates
.nojekyll             Disables Jekyll on GitHub Pages
```

All internal links are relative, so the site works in a GitHub Pages project subfolder
(`https://jarvis-solutions-lab.github.io/vermilion-foods/`) and at a domain root without changes.
Absolute URLs appear only in `canonical`, `hreflang`, Open Graph tags, JSON-LD, `sitemap.xml`,
`robots.txt` and the home links of `404.html`.

## Editing content

Each language is a separate file. Edit the English text in `index.html` and the Spanish text in `es/index.html`;
keep both in step. Sections in the home pages are marked by `id`: `about`, `products`, `customers`, `process`, `contact`.

The confirmed contact email is `sales@vermilionfoods.com`, included in both languages and legal pages.
Phone, address, business hours, LinkedIn and the state of formation have not been provided and remain omitted.
Each place where additional data can be added is marked by an HTML comment starting with
`<!-- data:` in the page source (search for `data:EMAIL`, `data:PHONE`, `data:STATE_OF_FORMATION`, `data:LINKEDIN_URL`, etc.).
When adding them:

- Email: `<a href="mailto:…">` in the Contact card, plus an "Email us / Escríbanos" `btn btn-primary` button under the contact paragraph, and in the privacy/terms contact sections.
- Phone: `<a href="tel:+…">` in the Contact card.
- Address: three lines inside an `<address>` element in the Contact card, under "VERMILION ALFA GROUP LLC / dba Vermilion Foods".
- State of formation: extend the legal note in About to the full sentence ("…a limited liability company registered in {state}, United States.").
- Also add `email`, `telephone` and `address` to the JSON-LD block in the `<head>` of both home pages.

The three photographs on the home pages (hero, About, How we work) are illustrative only: they do not show
the company's products, packaging, facilities, inventory, staff or customers, and each carries a visible caption saying so.
They are served as WebP at several widths with a JPEG fallback, without metadata; only the hero image loads eagerly.

Colours, fonts, spacing and components are defined at the top of `assets/css/styles.css` (`:root` tokens).

## Preview locally

```
cd path/to/this/folder
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The pages can also be opened directly from disk.

## Publishing (GitHub Pages)

### Phase 1 — github.io

1. Create the public repository `jarvis-solutions-lab/vermilion-foods` and push these files to `main`, at the repository root.
2. Settings → Pages → Deploy from a branch → `main` / root.
3. Check `https://jarvis-solutions-lab.github.io/vermilion-foods/` and `…/es/`: styles, fonts, logos, language switch and legal links.
4. Do **not** add a `CNAME` file in this phase.

### Phase 2 — vermilionfoods.com (owner confirmed)

1. The root `CNAME` file contains `vermilionfoods.com`.
2. Settings → Pages → Custom domain: `vermilionfoods.com`.
3. At the registrar, configure DNS. Confirm current values in the GitHub Pages documentation first; at the time of writing:
   - apex domain: four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
   - `www`: a `CNAME` record to `jarvis-solutions-lab.github.io`.
4. When the certificate is issued, enable *Enforce HTTPS*.
5. Canonical, hreflang, Open Graph, JSON-LD, 404, sitemap and robots use `https://vermilionfoods.com/`.
6. Verify `https://vermilionfoods.com/`, `https://www.vermilionfoods.com/` and `https://vermilionfoods.com/es/` load over HTTPS after DNS and certificate issuance.
7. Preserve all existing email DNS records (MX, SPF, DKIM, DMARC). Verify domain ownership in account Settings → Pages using the exact TXT challenge GitHub supplies; keep that TXT record afterwards.

## Licenses

Fonts are licensed under the SIL Open Font License 1.1 (see `assets/fonts/OFL-*.txt`). The logo wordmark was
converted to outlines from Cinzel (OFL) and Inter (OFL); no font is needed to display it.
