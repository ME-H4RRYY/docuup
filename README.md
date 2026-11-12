# DocuUP

A browser-based document utility website built with React, TypeScript, and Vite. Image and PDF processing happens locally in your browser; files are not uploaded to DocuUP.

## Requirements

- Node.js 20.19+ or 22.12+ recommended
- Modern browsers: current Chrome, Edge, Firefox, and Safari on desktop or mobile. The production bundle targets ES2020; image format encoders vary by browser.
- npm 10+

## Install and run

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Build and checks

```bash
npm run lint
npm run build
npm test
```

## Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a project from the repository.
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy. The static site needs no server-side environment variables.
5. The current canonical and sitemap domain is `https://formfit-2fr.pages.dev/`. Update it if you attach a custom domain in Cloudflare Pages.

No GA4 measurement ID or Search Console verification token is included. Configure those only with real values. Do not send document contents or filenames to analytics.

## Available routes

Homepage `/`, directory `/tools`, category directories `/image-tools`, `/pdf-tools`, `/document-tools`, and the individual tool URLs listed in `src/lib/tools.ts`. About, contact, privacy, and terms pages are included.

## Implemented operations

- Image compression/export to JPEG, PNG, or WebP, with output size shown.
- Image resize with width/height controls and aspect lock.
- Image format conversions; JPEG output fills transparency with white.
- PDF merge, page extraction/splitting by selected page numbers or ranges, whole-document rotation, and PDF rewrite with object streams.
- Image requirement checks for MIME type, file size, and min/max dimensions.
- Photo/signature resizing use the shared image resizer.
- Create a handwritten signature image and download it as transparent PNG. This is a visual image only, not a cryptographic PDF signature.

## Known limitations

- Image cropper uses a crop rectangle defined in source pixel coordinates; it does not provide drag handles over the preview.
- Target output-size adjustment uses a bounded quality search for JPEG and WebP; some targets cannot be reached. Image format support depends on browser Canvas encoders.
- PDF rewriting cannot guarantee meaningful compression and may increase size. Encrypted or malformed PDFs may fail. Large PDFs can use substantial memory.
- PDF page preview and per-page rotation selection are not included. Rotation applies to all pages; page extraction supports ranges and individual pages.
- “Contact” is informational because no contact address was supplied.
- SEO canonical and sitemap URLs currently use the Cloudflare Pages domain and should be updated if you attach a custom domain.
- Automated tests cover validator rules and generated PDF merge, extraction, rotation, and rewrite files. Image processing currently lacks automated canvas integration tests and the site has no Playwright end-to-end suite.
- PDF.js page rendering/thumbnail inspection is not included in this release.

## Privacy

Processing uses browser APIs and in-memory file data. The app does not define an upload endpoint, account system, or analytics ID. Hosting providers can still receive ordinary connection logs. Closing the page releases its in-memory state.
