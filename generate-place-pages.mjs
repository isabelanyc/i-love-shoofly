import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = "https://iloveshoofly.com";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some(cell => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  if (value || row.length) {
    row.push(value);
    if (row.some(cell => cell.trim())) rows.push(row);
  }
  return rows;
}

function slugify(spot) {
  const base = `${spot.name}-${spot.town.split(",")[0]}`;
  return base.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const [headers, ...rows] = parseCsv(fs.readFileSync(path.join(root, "spots.csv"), "utf8"));
const spots = rows.map(row => Object.fromEntries(headers.map((header, index) => [header.trim(), row[index]?.trim() || ""])))
  .filter(spot => spot.name && spot.town && spot.address && spot.lat && spot.lon && spot.url)
  .map(spot => ({...spot, slug: slugify(spot)}));

const placesRoot = path.join(root, "places");
fs.mkdirSync(placesRoot, {recursive: true});

for (const spot of spots) {
  const name = escapeHtml(spot.name);
  const town = escapeHtml(spot.town);
  const address = escapeHtml(spot.address);
  const canonical = `${siteUrl}/places/${spot.slug}/`;
  const description = `Find shoofly pie at ${spot.name} in ${spot.town}. See the address, phone number, published hours, map, and availability note.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: spot.name,
    url: canonical,
    address: {
      "@type": "PostalAddress",
      streetAddress: spot.address,
      addressLocality: spot.town.split(",")[0],
      addressRegion: spot.town.split(",")[1]?.trim() || ""
    },
    geo: {"@type": "GeoCoordinates", latitude: Number(spot.lat), longitude: Number(spot.lon)},
    hasMap: spot.url,
    subjectOf: {"@type": "WebPage", "@id": canonical}
  };
  if (spot.phone) schema.telephone = spot.phone;
  if (spot.email) schema.email = spot.email;
  if (spot.website) schema.sameAs = [spot.website];

  const contactRows = [
    `<div><dt>Address</dt><dd><address>${address}<br>${town}</address></dd></div>`,
    spot.phone ? `<div><dt>Phone</dt><dd><a href="tel:${spot.phone.replace(/[^\d+]/g, "")}">${escapeHtml(spot.phone)}</a></dd></div>` : "",
    spot.email ? `<div><dt>Email</dt><dd><a href="mailto:${escapeHtml(spot.email)}">${escapeHtml(spot.email)}</a></dd></div>` : "",
    spot.hours ? `<div><dt>Published hours</dt><dd>${escapeHtml(spot.hours)}</dd></div>` : ""
  ].filter(Boolean).join("\n              ");

  const detailLinks = [
    spot.website ? `<a href="${escapeHtml(spot.website)}" target="_blank" rel="noreferrer">Official website ↗</a>` : "",
    `<a href="${escapeHtml(spot.url)}" target="_blank" rel="noreferrer">Google Maps ↗</a>`,
    spot.details_source && spot.details_source !== spot.website ? `<a href="${escapeHtml(spot.details_source)}" target="_blank" rel="noreferrer">Contact &amp; hours source ↗</a>` : ""
  ].filter(Boolean).join("\n                ");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="#f5edda">
    <meta property="og:title" content="${name}: Shoofly Pie in ${town} | I Love Shoofly">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${siteUrl}/assets/i-love-shoofly-share.png">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="${canonical}">
    <title>${name}: Shoofly Pie in ${town} | I Love Shoofly</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥧</text></svg>">
    <link rel="stylesheet" href="../../styles.css?v=20260824-place-pages">
    <link rel="stylesheet" href="../../place.css?v=20260824-place-pages">
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  </head>
  <body>
    <div class="site-frame">
      <header class="site-header">
        <a class="brand" href="../../" aria-label="I Love Shoofly home"><span class="brand-pie" aria-hidden="true">🥧</span><span>I Love Shoofly</span></a>
        <nav aria-label="Primary navigation">
          <a href="../../">About</a>
          <a href="../../what-is-shoofly-pie/">What is Shoofly Pie?</a>
          <a href="../../history/">History</a>
          <a href="../../where-to-find-shoofly-pie/" aria-current="page">Map</a>
          <a href="../../#/contact">Contact</a>
        </nav>
      </header>
      <main>
        <article class="page place-page">
          <p class="place-breadcrumb"><a href="../../where-to-find-shoofly-pie/">Shoofly pie directory</a><span aria-hidden="true">/</span>${town}</p>
          <div class="place-layout">
            <header class="place-intro">
              <p class="section-kicker">Verified shoofly pie stop</p>
              <h1 class="route-title">${name}</h1>
              <p class="place-town">${town}</p>
            </header>
            <aside class="place-details" aria-label="Location details">
              <div class="place-pie" aria-hidden="true">🥧</div>
              <dl class="place-contact">
                ${contactRows}
              </dl>
              <div class="place-detail-links">
                ${detailLinks}
              </div>
            </aside>
          </div>
          <section class="place-note">
            <div><p class="section-kicker">Before you go</p><h2>Looking for shoofly pie here?</h2></div>
            <p>${name} has been verified as having served shoofly pie at some point through an in-person visit or online research. Selection, seasonal schedules, and holiday hours can change, so call or check the linked source before making a special trip.</p>
          </section>
          <nav class="place-actions" aria-label="More shoofly pie resources">
            <a href="../../where-to-find-shoofly-pie/">← Browse all ${spots.length} shoofly pie stops</a>
            <a href="../../what-is-shoofly-pie/">Wet bottom or dry bottom? →</a>
          </nav>
        </article>
      </main>
      <footer class="compact-footer"><span>🥧 I Love Shoofly</span><span>Made to spread the love of shoofly pie.</span><span>Hosted with GitHub Pages.</span></footer>
    </div>
  </body>
</html>
`;
  const directory = path.join(placesRoot, spot.slug);
  fs.mkdirSync(directory, {recursive: true});
  fs.writeFileSync(path.join(directory, "index.html"), html);
}

const directoryPath = path.join(root, "where-to-find-shoofly-pie", "index.html");
let directoryHtml = fs.readFileSync(directoryPath, "utf8");
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Places to find shoofly pie",
  numberOfItems: spots.length,
  itemListElement: spots.map((spot, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${spot.name} — ${spot.town}`,
    url: `${siteUrl}/places/${spot.slug}/`
  }))
};
const directoryItems = spots.map(spot => `              <li><a href="../places/${spot.slug}/"><strong>${escapeHtml(spot.name)}</strong><span>${escapeHtml(spot.town)}</span><address>${escapeHtml(spot.address)}</address><small>View stop details →</small></a></li>`).join("\n");
directoryHtml = directoryHtml
  .replace(/directory of \d+ bakeries/, `directory of ${spots.length} bakeries`)
  .replace(/Where to Find Shoofly Pie: \d+ Stops/g, `Where to Find Shoofly Pie: ${spots.length} Stops`)
  .replace(/<h2 id="all-locations-title">\d+ places/, `<h2 id="all-locations-title">${spots.length} places`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n      ${JSON.stringify(itemListSchema).replace(/</g, "\\u003c")}\n    </script>`)
  .replace(/<ol class="location-grid">[\s\S]*?<\/ol>/, `<ol class="location-grid">\n${directoryItems}\n            </ol>`);
fs.writeFileSync(directoryPath, directoryHtml);

const sitemapEntries = ["/", "/what-is-shoofly-pie/", "/history/", "/where-to-find-shoofly-pie/", ...spots.map(spot => `/places/${spot.slug}/`)];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(url => `  <url>\n    <loc>${siteUrl}${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

console.log(`Generated ${spots.length} place pages and sitemap.xml.`);
