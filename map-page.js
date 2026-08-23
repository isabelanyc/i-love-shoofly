let spots = [];
let map;
let selected = 0;
const markers = [];

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

async function loadSpots() {
  const response = await fetch("/i-love-shoofly/spots.csv", {cache: "no-cache"});
  if (!response.ok) throw new Error("Could not load spots.csv");
  const [headers, ...rows] = parseCsv(await response.text());
  spots = rows
    .map(row => Object.fromEntries(headers.map((header, index) => [header.trim(), row[index]?.trim() || ""])))
    .filter(spot => spot.name && spot.lat && spot.lon)
    .map(spot => ({...spot, lat: Number(spot.lat), lon: Number(spot.lon)}));
}

function markerIcon(isSelected) {
  return L.divIcon({
    className: `pie-map-marker${isSelected ? " is-selected" : ""}`,
    html: '<span><i aria-hidden="true">🥧</i></span>',
    iconSize: [38, 46],
    iconAnchor: [19, 46]
  });
}

function initMap() {
  const mapShell = document.querySelector(".map-shell");
  const viewButtons = document.querySelectorAll("[data-map-view]");
  map = L.map("map", {zoomControl: true, scrollWheelZoom: true});
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    keepBuffer: 1,
    updateWhenIdle: true,
    updateWhenZooming: false
  }).addTo(map);

  const bounds = [];
  spots.forEach((spot, index) => {
    const marker = L.marker([spot.lat, spot.lon], {
      icon: markerIcon(index === selected),
      title: `${spot.name}, ${spot.town}`
    }).bindTooltip(`<strong>${spot.name}</strong><br>${spot.town}`, {
      direction: "top",
      offset: [0, -52]
    }).on("click", () => selectSpot(index)).addTo(map);
    markers.push(marker);
    bounds.push([spot.lat, spot.lon]);
  });

  map.fitBounds(bounds, {padding: [36, 36], maxZoom: 9});
  document.querySelector("#spot-list").innerHTML = spots.map((spot, index) => `
    <button type="button" data-index="${index}" class="${index === selected ? "active" : ""}">
      <span>${spot.name}</span><small>${spot.town}</small>
    </button>`).join("");

  document.querySelector("#spot-list").addEventListener("click", event => {
    const button = event.target.closest("button[data-index]");
    if (button) selectSpot(Number(button.dataset.index));
  });

  viewButtons.forEach(button => button.addEventListener("click", () => {
    const view = button.dataset.mapView;
    mapShell.dataset.mobileView = view;
    viewButtons.forEach(option => {
      const isActive = option === button;
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });
    if (view === "map") requestAnimationFrame(() => map.invalidateSize());
  }));

  updateSpot();
}

function selectSpot(index) {
  selected = index;
  markers.forEach((marker, markerIndex) => marker.setIcon(markerIcon(markerIndex === selected)));
  document.querySelectorAll("#spot-list button").forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === selected));
  updateSpot();
}

function updateSpot() {
  const spot = spots[selected];
  document.querySelector("#spot-card").innerHTML = `
    <div class="spot-icon" aria-hidden="true">🥧</div>
    <h3>${spot.name}</h3>
    <p class="spot-town">${spot.town}</p>
    <p class="spot-address">${spot.address}</p>
    <a class="button button-primary full" href="${spot.url}" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>`;
}

loadSpots().then(initMap).catch(error => {
  console.error(error);
  document.querySelector("#map").innerHTML = '<p style="padding: 24px;">The interactive map could not load. Browse the complete directory below.</p>';
});
