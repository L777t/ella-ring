# Blocky Sections Diagnosis

## Conclusion

The local `sections/blocky-*.liquid` files do not show classic source-encoding corruption.
The stronger issue is that this repository only contains the Blocky section files, but is missing the Blocky snippets and assets those sections depend on.

This means the garbled text seen in Shopify is more likely caused by one of these:

- the remote Shopify theme has different Blocky support files than this local repo
- a Blocky app or theme app extension is injecting or synchronizing content remotely
- the local repo only copied the `sections` layer and did not include the full Blocky dependency set

## What Was Verified

- `sections` currently contains 30 `blocky-*.liquid` files.
- The Blocky section files are plain text and did not show typical mojibake markers such as replacement characters, Latin-1 style UTF-8 corruption, or UTF-16 file headers.
- The Git history shows Blocky content was added in a single commit:
  - `bb84a65 Add blocky sections`
- That commit added only files under `sections/` and did not add matching `snippets/` or `assets/` files.

## Missing Dependencies

The following Blocky snippets are referenced by the sections but do not exist in this repo:

- `snippets/blocky-titlel.liquid`
- `snippets/blocky-bodyl.liquid`
- `snippets/blocky-buttonl.liquid`
- `snippets/blocky-review-starsl.liquid`
- `snippets/blocky-icon-with-textl.liquid`
- `snippets/blocky-results.liquid`
- `snippets/blocky-product-icons-2.liquid`

The following Blocky assets are referenced by the sections but do not exist in this repo:

- `assets/blocky-image-video-slider.js`
- `assets/blocky-before-and-after-slider.js`
- `assets/blocky-accordion.js`
- `assets/blocky-video.js`
- `assets/blocky-slider-2.js`
- `assets/blocky-slider-1.js`
- `assets/blocky-product-showcase.js`

## Evidence

Examples of missing snippet references:

- [sections/blocky-faq.liquid](../sections/blocky-faq.liquid) renders `blocky-titlel`, `blocky-bodyl`, `blocky-buttonl`
- [sections/blocky-testimonials.liquid](../sections/blocky-testimonials.liquid) renders `blocky-titlel`, `blocky-bodyl`, `blocky-buttonl`, `blocky-review-starsl`
- [sections/blocky-result-with-media.liquid](../sections/blocky-result-with-media.liquid) renders `blocky-results`

Examples of missing asset references:

- [sections/blocky-faq.liquid](../sections/blocky-faq.liquid) loads `blocky-accordion.js`
- [sections/blocky-video-with-text.liquid](../sections/blocky-video-with-text.liquid) loads `blocky-video.js`
- [sections/blocky-product-showcase.liquid](../sections/blocky-product-showcase.liquid) loads `blocky-product-showcase.js`

App-related hints found in the source:

- many files include a `BlockyApps` copyright header
- several schema help texts point to `/admin/apps/blocky-apps/icons`

These strongly suggest the sections originated from a Blocky app workflow rather than a self-contained theme implementation.

## Recommended Next Checks

1. Compare the remote Shopify theme against this local repo and verify whether the missing `snippets/blocky-*` and `assets/blocky-*` files exist remotely.
2. Check whether a Blocky app or theme app extension is installed in Shopify and supplying the missing rendering logic.
3. In the Shopify theme editor, confirm whether the garbled text appears in:
   - section name
   - setting labels
   - default schema content
   - storefront-rendered content
4. If the remote theme has the missing files, sync them back into this repo before debugging encoding any further.
5. If the remote theme does not have them either, treat the issue as an incomplete Blocky installation rather than a text-encoding defect in `sections/`.
