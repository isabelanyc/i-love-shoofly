# I Love Shoofly

A public field guide to shoofly pie bakeries, markets, and roadside stands.

The site is published as a GitHub Project Site at:

https://isabelanyc.github.io/i-love-shoofly/

## Updating the map

All map locations live in [`spots.csv`](spots.csv). Add, remove, or edit one row per location while keeping the header row unchanged:

- `name`: location name
- `town`: town and state shown on the site
- `address`: street address
- `lat` and `lon`: map coordinates
- `url`: the location's Google Maps link

Commit the CSV change to the default branch and GitHub Pages will publish the updated map automatically.

## About this edition

This repository contains a static GitHub Pages edition of I Love Shoofly. The interactive map uses Leaflet and OpenStreetMap, and the contact form is handled privately through Formspree.
