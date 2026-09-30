# Guru Interiors website

Static, single-page website built from the `GURU-Website-FinalVersion.ai` design (1920px artboard).

## Structure

```
index.html            page markup (all copy is live HTML text)
assets/css/styles.css layout & styles – desktop sizes are artboard px × --u, so it matches the design at 1920px and scales down proportionally; ≤900px switches to a mobile layout
assets/js/main.js     mobile menu + header shadow
assets/img/           artwork exported from the .ai file (logo is vector SVG; logos @2x)
assets/fonts/         Montserrat (OFL), used in place of Gotham
```

## Run locally

Open `index.html`, or serve the folder (needed for the self-hosted fonts):

```
python3 -m http.server 8000
```

Deploys as-is to any static host (GitHub Pages, Netlify, Vercel…).

## Notes

- The design uses Gotham (a commercial font). Montserrat is the free stand-in; if you hold a Gotham web licence, add its `@font-face` rules — the font stack already lists `"Gotham"` first.
- Social links point to `instagram.com/gurufitout` and `linkedin.com/company/guruinteriors`; adjust in `index.html` if the URLs differ.
