const spots = [
  ["Dutch Pantry Family Restaurant", "DuBois, PA", "2044 Rich Highway", 41.1192, -78.76, "https://www.google.com/maps/place/Dutch+Pantry+Family+Restaurant/data=!4m2!3m1!1s0x89ccf170c22ea8a5:0x35ebc520447a1c4"],
  ["Dutch Pantry Family Restaurant", "Clearfield, PA", "14680 Clearfield Shawville Highway", 41.0273, -78.4392, "https://www.google.com/maps/place/Dutch+Pantry+Family+Restaurant/data=!4m2!3m1!1s0x89cc423cee5ed1a5:0xfd2da0fe8b239e75"],
  ["Shady Acres Farm Market", "Elizabethtown, PA", "8514 Elizabethtown Road", 40.154, -76.687, "https://www.google.com/maps/place/Shady+Acres+Farm+Market/data=!4m2!3m1!1s0x89c8a1f8d9e9e2c5:0xda24490fb6746a27"],
  ["Amish Farmers Market", "Laurel, MD", "9701 Fort Meade Road", 39.098, -76.843, "https://www.google.com/maps/place/Amish+Farmers+Market/data=!4m2!3m1!1s0x89b62d2c81f020ad:0x30b9baeb4c713db"],
  ["Bird-in-Hand Bakery & Cafe", "Bird-in-Hand, PA", "2715 Old Philadelphia Pike", 40.0389, -76.177, "https://www.google.com/maps/place/Bird-in-Hand+Bakery+%26+Cafe/data=!4m2!3m1!1s0x89c63957d871cda7:0x90fdf80d51c7520c"],
  ["Amish Store 31", "Ronks, PA", "Stumptown Road", 40.026, -76.181, "https://www.google.com/maps/place/Amish+Store+31/data=!4m2!3m1!1s0x89c63e93398a3e0b:0x176d891ee1f30625"],
  ["The Markets at Shrewsbury", "Glen Rock, PA", "12025 Susquehanna Trail South", 39.806, -76.731, "https://www.google.com/maps/place/The+Markets+at+Shrewsbury/data=!4m2!3m1!1s0x89c8630c74de3dd3:0x39eeafb738c80196"],
  ["Weaver's Market & Bakery", "Port Trevorton, PA", "8160 South Susquehanna Trail", 40.6638, -76.9165, "https://www.google.com/maps/place/Weaver's+Market+%26+Bakery/data=!4m2!3m1!1s0x89cf372d6bdaf8ad:0x2b01b6882f32167e"],
  ["Beeman's Baked Goods", "Carlisle, PA", "51 South Orange Street", 40.199, -77.189, "https://www.google.com/maps/place/Beeman's+Baked+Goods/data=!4m2!3m1!1s0x89c91e323ab7aa6d:0x418e4c6980b19e16"],
  ["Countryside Roadstand", "Ronks, PA", "2966 Stumptown Road", 40.028, -76.176, "https://www.google.com/maps/place/Countryside+Roadstand/data=!4m2!3m1!1s0x89c63e9330f12dad:0x1f75b44b0e1e8baf"],
  ["Achenbach's Pastries, Inc", "Leola, PA", "375 East Main Street", 40.0931, -76.1467, "https://www.google.com/maps/place/Achenbach's+Pastries,+Inc/data=!4m2!3m1!1s0x89c63e5b2aa0984d:0x1428bf25c047bd21"],
  ["Stoltzfus Bakery", "Ardmore, PA", "120 Coulter Avenue", 40.008, -75.285, "https://www.google.com/maps/place/Stoltzfus+Bakery/data=!4m2!3m1!1s0x89c6c084391a799f:0x24af688810722b8d"],
  ["Lancaster Central Market", "Lancaster, PA", "23 North Market Street", 40.0398, -76.3067, "https://www.google.com/maps/place/Lancaster+Central+Market/data=!4m2!3m1!1s0x89c624f26dac0c0b:0x73d0a19351b249f"],
  ["Miller's Smorgasbord Restaurant", "Ronks, PA", "2811 Lincoln Highway East", 40.006, -76.164, "https://www.google.com/maps/place/Miller's+Smorgasbord+Restaurant/data=!4m2!3m1!1s0x89c6396e58b40e11:0x37eb25100de81e75"],
  ["Granny's Discount Groceries", "Lancaster, PA", "2293 New Danville Pike", 39.9608, -76.3222, "https://www.google.com/maps/place/Granny's+Discount+Groceries/data=!4m2!3m1!1s0x89c62f0b763ca76f:0x2721b0e15fcf6b81"],
  ["Dutch Haven Shoo-Fly Pie Bakery", "Ronks, PA", "2857A Lincoln Highway East", 40.005, -76.158, "https://www.google.com/maps/place/Dutch+Haven+Shoo-Fly+Pie+Bakery/data=!4m2!3m1!1s0x89c6396dabf9ff85:0x7680dacbc65bced1"],
  ["Bird in Hand Bakeshop", "Bird-in-Hand, PA", "542 Gibbons Road", 40.03, -76.185, "https://www.google.com/maps/place/Bird+in+Hand+Bakeshop/data=!4m2!3m1!1s0x89c63c047a6a8ab1:0xbfa150d212d3dc4e"],
  ["Sunnyside Pastries", "East Earl, PA", "421 Weaverland Valley Road", 40.169, -76.003, "https://www.google.com/maps/place/Sunnyside+Pastries/data=!4m2!3m1!1s0x89c66afb8b87c23f:0xd63fbb8cbc2795f7"],
  ["Village Farmer and Bakery", "Delaware Water Gap, PA", "13 Broad Street", 40.979, -75.142, "https://www.google.com/maps/place/Village+Farmer+and+Bakery/data=!4m2!3m1!1s0x89c487d1bdca2a3d:0xe97aad22f6a57150"]
].map(([name,town,address,lat,lon,url]) => ({name,town,address,lat,lon,url}));

const app = document.querySelector("#app");
let map;
let selected = 5;
let markers = [];

const routes = {
  home: () => `
    <section class="page hero">
      <div class="hero-copy">
        <p class="eyebrow">A public field guide to molasses magic</p>
        <h1>Find a slice.<br><em>Share the love.</em></h1>
        <p class="hero-deck">Shoofly pie deserves a road trip of its own. This growing map collects the bakeries, markets, and counters keeping Pennsylvania Dutch pie tradition warm.</p>
        <div class="hero-actions"><a class="button button-primary" href="#/map">Explore ${spots.length} pie spots</a><a class="text-link" href="#/about">Meet the mission ↗</a></div>
        <div class="hero-note">✦ Curated by one very devoted pie fan.</div>
      </div>
      <figure class="hero-photo"><img src="assets/shoofly-pie.jpg" alt="A homemade wet-bottom shoofly pie in a glass pie plate"><figcaption><span>Wet bottom</span><span>Molasses-forward</span><span>Best with coffee</span></figcaption></figure>
    </section>`,
  about: () => `
    <section class="page about-page"><div class="about-grid">
      <div><p class="section-kicker">About the trail</p><h1 class="route-title">A love letter you can<br>navigate.</h1></div>
      <div><p class="lead">This site started as a personal Google Maps list and a simple mission: make it easier for more people to meet shoofly pie.</p><p>Every spot began with a real tip or visit. Use the map to plan a detour, open the original listing for directions, and send in the places still missing.</p><a class="button button-primary" href="#/map">Open the map</a></div>
      <aside><span class="big-number">${spots.length}</span><span>places on the trail<br>and counting</span></aside>
    </div></section>`,
  map: () => `
    <section class="page map-page">
      <div class="map-heading"><p class="section-kicker">The shoofly map · ${spots.length} places</p><h1 class="map-title">Your next slice is on here.</h1></div>
      <div class="map-shell"><div id="map" aria-label="Interactive map of shoofly pie locations"></div><aside class="spot-panel" aria-live="polite"><div class="spot-card" id="spot-card"></div><div class="spot-list" id="spot-list" aria-label="Shoofly pie locations"></div></aside></div>
      <aside class="map-submit-cta"><div><strong>Don&rsquo;t see a shoofly spot?</strong><span>Know a bakery, market, or roadside stand we missed?</span></div><a class="button button-primary" href="#/contact">Let us know →</a></aside>
    </section>`,
  history: () => `
    <section class="page history-page">
      <div class="history-intro"><p class="section-kicker">A sticky history</p><h1 class="route-title">From pantry staple to Pennsylvania icon.</h1><p>Shoofly pie sits between crumb cake and pie: molasses-rich filling under brown-sugar crumbs, held together by pastry and generations of practice.</p><div class="history-sources"><span>Read further</span><a href="https://www.wgpfoundation.org/historic-markers/shoofly-pie/" target="_blank" rel="noreferrer">Pomeroy Foundation ↗</a><a href="https://www.discoverlancaster.com/blog/shoo-fly-pie-lancaster-county/" target="_blank" rel="noreferrer">Discover Lancaster ↗</a></div></div>
      <ol class="timeline"><li><span>1870s</span><div><h3>The baking-powder revolution</h3><p>New leavening methods enter Pennsylvania Dutch kitchens after the Civil War.</p></div></li><li><span>1876</span><div><h3>A centennial cake</h3><p>A crustless molasses cake becomes the pie&rsquo;s closest-known ancestor.</p></div></li><li><span>1880s</span><div><h3>The crust arrives</h3><p>The cake moves into pastry—tidier beside morning coffee. The “shoofly” name follows.</p></div></li><li><span>Today</span><div><h3>Wet or dry?</h3><p>Gooey molasses bottom or evenly cakey crumb: the trail welcomes both.</p></div></li></ol>
    </section>`,
  contact: () => `
    <section class="page contact-page">
      <div class="contact-copy"><p class="section-kicker">Help the trail grow</p><h1 class="route-title">Don&rsquo;t see a<br>shoofly spot?</h1><p>Send the name and town. Add a map or website link if one exists. Every tip gets reviewed before it earns a pie pin.</p><div class="contact-pie" aria-hidden="true">🥧</div></div>
      <form id="suggest-form"><div class="field-row"><label>Spot name<input name="name" required maxlength="120" placeholder="Bakery or market"></label><label>Town / state<input name="town" required maxlength="100" placeholder="Lancaster, PA"></label></div><label>Google Maps or website link <span>(optional)</span><input name="url" type="url" maxlength="500" placeholder="https://…"></label><label>What should we know?<textarea name="note" maxlength="1000" rows="3" placeholder="Wet or dry bottom? Seasonal? Which counter sells it?"></textarea></label><div class="form-footer"><button class="button button-primary" type="submit">Suggest this spot</button><p id="form-status" role="status" aria-live="polite">Your tip is sent privately by email.</p></div></form>
    </section>`
};

function currentRoute() {
  const key = location.hash.replace(/^#\/?/, "").split("/")[0];
  return routes[key] ? key : "home";
}

function render() {
  const route = currentRoute();
  if (map) { map.remove(); map = null; markers = []; }
  app.innerHTML = routes[route]();
  document.querySelectorAll("nav a").forEach(link => link.toggleAttribute("aria-current", link.dataset.route === route));
  document.title = route === "home" ? "Shoofly Pie Trail" : `${route[0].toUpperCase() + route.slice(1)} · Shoofly Pie Trail`;
  if (route === "map") initMap();
  if (route === "contact") initContact();
  app.focus({preventScroll:true});
  window.scrollTo(0,0);
}

function initMap() {
  map = L.map("map", {zoomControl:true, scrollWheelZoom:true});
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom:19, keepBuffer:1, updateWhenIdle:true, updateWhenZooming:false}).addTo(map);
  const bounds = [];
  spots.forEach((spot,index) => {
    const icon = L.divIcon({className:`pie-map-marker${index === selected ? " is-selected" : ""}`,html:'<span><i aria-hidden="true">🥧</i></span>',iconSize:[38,46],iconAnchor:[19,46]});
    const marker = L.marker([spot.lat,spot.lon],{icon,title:`${spot.name}, ${spot.town}`}).bindTooltip(`<strong>${spot.name}</strong><br>${spot.town}`,{direction:"top",offset:[0,-18]}).on("click",()=>selectSpot(index)).addTo(map);
    markers.push(marker); bounds.push([spot.lat,spot.lon]);
  });
  map.fitBounds(bounds,{padding:[36,36],maxZoom:9});
  document.querySelector("#spot-list").innerHTML = spots.map((spot,index)=>`<button type="button" data-index="${index}" class="${index === selected ? "active" : ""}"><span>${spot.name}</span><small>${spot.town}</small></button>`).join("");
  document.querySelector("#spot-list").addEventListener("click",event=>{const button=event.target.closest("button[data-index]"); if(button) selectSpot(Number(button.dataset.index));});
  updateSpot();
}

function selectSpot(index) {
  selected = index;
  markers.forEach((marker,i)=>marker.getElement()?.classList.toggle("is-selected",i===selected));
  document.querySelectorAll("#spot-list button").forEach((button,i)=>button.classList.toggle("active",i===selected));
  updateSpot();
}

function updateSpot() {
  const spot = spots[selected];
  document.querySelector("#spot-card").innerHTML = `<p class="spot-count">Spot ${selected+1} of ${spots.length}</p><div class="spot-icon" aria-hidden="true">🥧</div><h3>${spot.name}</h3><p class="spot-town">${spot.town}</p><p class="spot-address">${spot.address}</p><a class="button button-primary full" href="${spot.url}" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>`;
}

function initContact() {
  const form = document.querySelector("#suggest-form");
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#form-status");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "Sending your tip privately…";
    status.className = "is-sending";

    try {
      const response = await fetch("https://formspree.io/f/mwpqwejb", {
        method: "POST",
        body: new FormData(form),
        headers: {Accept: "application/json"}
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      status.textContent = "Thank you! Your shoofly tip is on its way.";
      status.className = "is-success";
    } catch (error) {
      status.textContent = "That tip didn’t send. Please try again in a moment.";
      status.className = "is-error";
    } finally {
      button.disabled = false;
      button.textContent = "Suggest this spot";
    }
  });
}

window.addEventListener("hashchange",render);
render();
