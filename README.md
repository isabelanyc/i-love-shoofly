# I Love Shoofly

A public field guide to shoofly pie bakeries, markets, and roadside stands.

The site is published as a GitHub Project Site at:

https://iloveshoofly.com/

## Updating locations

`spots.csv` is the source of truth for the map, directory, and individual location pages. After editing it, regenerate the static location pages and sitemap:

```sh
node generate-place-pages.mjs
```

## About this edition

This repository contains a static GitHub Pages edition of I Love Shoofly. The interactive map uses Leaflet and OpenStreetMap, and the contact form is handled privately through Formspree.
