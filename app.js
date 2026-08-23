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
  about: () => `
    <section class="page about-page"><div class="about-grid">
      <div><h1 class="route-title">I love<br>shoofly.</h1></div>
      <div><p class="lead">This is an <a href="https://groups.etown.edu/amishstudies/frequently-asked-questions/" target="_blank" rel="noreferrer" title="Amish term for a non-Amish person">Englisher&rsquo;s</a> love letter to shoofly pie—a celebration of the molasses-rich treat and the Amish and Pennsylvania Dutch communities whose baking traditions made it a regional favorite.</p><p>I Love Shoofly is a public guide to the pie itself—what it is, where it comes from, and where to find a slice. Browse the map, compare wet- and dry-bottom styles, explore the history, or suggest a place that should be included.</p><div class="about-actions"><a class="button button-primary" href="#/map">Find a slice</a><a class="text-link" href="#/what">What is shoofly? ↗</a></div></div>
      <aside><span class="big-number">${spots.length}</span><span>shoofly spots found<br>and counting</span></aside>
    </div></section>`,
  what: () => `
    <section class="page what-page">
      <header class="what-intro"><p class="section-kicker">The molasses classic</p><h1 class="route-title">What is shoofly pie?</h1><p>Shoofly pie is a Pennsylvania Dutch molasses pie built in three parts: a flaky pastry crust, a dark syrupy filling, and a buttery brown-sugar crumb topping. The molasses gives it a deep caramel flavor while the crumbs bake into a soft, streusel-like top. Traditionally served with coffee, it sits deliciously between pie and crumb cake.</p></header>
      <div class="comparison-intro"><p class="section-kicker">Two classic styles</p><h2>Wet bottom vs. dry bottom.</h2><p>Both styles begin with pastry, molasses, and a brown-sugar crumb. The difference is what happens inside the slice: one stays sticky and layered; the other bakes into an even, cake-like crumb.</p></div>
      <div class="pie-comparison" aria-label="Wet-bottom and dry-bottom shoofly pie comparison">
        <article class="comparison-card"><div class="comparison-copy"><p class="comparison-number">01 · The gooey one</p><h2>Wet bottom</h2><p>A dark molasses layer settles along the crust while the crumb mixture bakes into a soft, cakey top. The result is distinctly layered, sticky, and almost custard-like at the base.</p><dl><div><dt>Texture</dt><dd>Gooey below, cakey above</dd></div><div><dt>Look for</dt><dd>A glossy bottom layer</dd></div></dl></div><figure><img src="assets/shoofly-wet-bottom.webp" alt="A slice of wet-bottom shoofly pie showing a glossy molasses layer beneath a crumb top" width="1200" height="900"><figcaption>Photo: <a href="https://www.thekitchn.com/kll-shoofly-pie-pi-day-recipe-23295288" target="_blank" rel="noreferrer">The Kitchn ↗</a></figcaption></figure></article>
        <article class="comparison-card"><div class="comparison-copy"><p class="comparison-number">02 · The cakey one</p><h2>Dry bottom</h2><p>The molasses and crumbs bake together more uniformly, leaving little or no syrupy layer at the base. It eats more like a tender molasses coffee cake tucked inside a pastry crust.</p><dl><div><dt>Texture</dt><dd>Evenly firm and cakey</dd></div><div><dt>Look for</dt><dd>One consistent crumb</dd></div></dl></div><figure><img src="assets/shoofly-dry-bottom.webp" alt="A slice of dry-bottom shoofly pie showing its more evenly baked interior" width="752" height="500"><figcaption>Photo: <a href="https://lancasteronline.com/features/food/pa-dutch-eats-shoofly-pie-is-lancaster-s-sweetest-gooiest-treat-video-recipe/article_1a273262-603a-11e8-b27b-d7b1589c2d3d.html" target="_blank" rel="noreferrer">LancasterOnline ↗</a></figcaption></figure></article>
      </div>
      <section class="preference-block"><div class="preference-copy"><p class="section-kicker">The people have spoken</p><h2>Wet wins the vote.<br>Both win at the table.</h2><div class="survey-stat"><strong>96%</strong><span>chose wet bottom</span></div><p class="preference-summary">In a LancasterOnline reader survey, the gooey molasses layer was the clear favorite—but dry bottom&rsquo;s tender, coffee-cake crumb is delicious in its own right.</p><p class="preference-source">Neither style is the “right” one—it comes down to family recipe and personal preference. Read more about the distinction at <a href="https://www.epicurious.com/recipes-menus/history-of-shoofly-pie" target="_blank" rel="noreferrer">Epicurious</a> and <a href="https://www.shady-maple.com/history-of-shoofly-pie/" target="_blank" rel="noreferrer">Shady Maple</a>.</p></div><figure><img src="assets/shoofly-preference-survey.webp" alt="LancasterOnline survey graphic showing 96 percent prefer wet-bottom shoofly pie and 4 percent prefer dry bottom" width="723" height="1200"><figcaption>Graphic: <a href="https://lancasteronline.com/features/food/pa-dutch-eats-shoofly-pie-is-lancaster-s-sweetest-gooiest-treat-video-recipe/article_1a273262-603a-11e8-b27b-d7b1589c2d3d.html" target="_blank" rel="noreferrer">LancasterOnline reader survey ↗</a></figcaption></figure></section>
    </section>`,
  map: () => `
    <section class="page map-page">
      <div class="map-shell"><div id="map" aria-label="Interactive map of shoofly pie locations"></div><aside class="spot-panel" aria-live="polite"><div class="spot-card" id="spot-card"></div><div class="spot-list" id="spot-list" aria-label="Shoofly pie locations"></div></aside></div>
      <p class="map-verification-note"><span aria-hidden="true">✓</span> Every spot on this map has been verified as having served shoofly pie at some point—either through an in-person visit or thorough online research—though current availability may vary.</p>
      <aside class="map-submit-cta"><div><strong>Don&rsquo;t see a shoofly spot?</strong><span>Know a bakery, market, or roadside stand we missed?</span></div><a class="button button-primary" href="#/contact">Let us know →</a></aside>
    </section>`,
  history: () => `
    <section class="page history-page">
      <div class="history-top"><div class="history-intro"><p class="section-kicker">A sticky history</p><h1 class="route-title">From pantry staple to Pennsylvania icon.</h1><p>The honest history of shoofly pie is part record and part food lore. What survives points to a practical, eggless molasses bake shaped by Pennsylvania Dutch kitchens in the late nineteenth century.</p></div>
      <ol class="timeline"><li><span>1870s</span><div><h3>The baking-powder revolution</h3><p>New chemical leaveners changed Pennsylvania Dutch baking after the Civil War, making quick molasses cakes possible.</p></div></li><li><span>1876</span><div><h3>A centennial cake</h3><p>A crustless molasses “centennial cake” is the pie&rsquo;s best-documented predecessor.</p></div></li><li><span>1880s</span><div><h3>The pie takes shape</h3><p>The molasses crumb cake moves into pastry; the “shoofly” name develops around the same period.</p></div></li><li><span>By 1920</span><div><h3>A recognized tradition</h3><p>Historical-marker research documents it as an established Pennsylvania Dutch food tradition.</p></div></li><li class="timeline-today"><span>Today</span><div><h3>A tradition still being baked</h3><p>Family recipes, farm markets, and bakeries keep both wet- and dry-bottom shoofly pie on the table—and invite new fans into the story.</p></div></li></ol></div>
      <div class="history-notes">
        <article><p class="history-label">The community</p><h2>A food born in Pennsylvania Dutch kitchens.</h2><p>Shoofly pie began in Pennsylvania Dutch kitchens, including those of Amish, Mennonite, Moravian, and other families. Their practical baking traditions turned pantry staples—molasses, flour, sugar, and leavening—into the pie that became a regional icon. The <a href="https://philadelphiaencyclopedia.org/essays/dutch-netherlands/" target="_blank" rel="noreferrer">Encyclopedia of Greater Philadelphia</a> offers more context on Pennsylvania Dutch history.</p></article>
        <article><p class="history-label">A practical breakfast</p><h2>Molasses made sense when fruit and eggs did not.</h2><p>Flour, brown sugar, baking soda, and shelf-stable molasses suited winter pantries. Early versions required no eggs and were traditionally served at breakfast with coffee—a history summarized by the <a href="https://www.wgpfoundation.org/historic-markers/shoofly-pie/" target="_blank" rel="noreferrer">Pomeroy Foundation</a> and explored by <a href="https://www.epicurious.com/recipes-menus/history-of-shoofly-pie" target="_blank" rel="noreferrer">Epicurious</a>.</p></article>
        <article><p class="history-label">The name</p><h2>A good story, not a settled answer.</h2><p>The familiar tale says bakers had to “shoo” flies from the sticky filling. Another theory points to a Shoofly-branded molasses. Food historian William Woys Weaver&rsquo;s research, cited by the <a href="https://www.wgpfoundation.org/historic-markers/shoofly-pie/" target="_blank" rel="noreferrer">Pomeroy historical marker</a>, concludes that the exact origin is undocumented—so the mystery remains part of the pie.</p></article>
        <article><p class="history-label">A living tradition</p><h2>From morning fuel to regional calling card.</h2><p>What began as a thrifty breakfast bake became a symbol of Lancaster County and Pennsylvania Dutch foodways. Bakers still debate wet versus dry bottom, while family recipes keep changing across generations. A Lancaster bakery&rsquo;s account at <a href="https://www.shady-maple.com/history-of-shoofly-pie/" target="_blank" rel="noreferrer">Shady Maple</a> shows how both styles remain part of the tradition today.</p></article>
      </div>
    </section>`,
  contact: () => `
    <section class="page contact-page">
      <div class="contact-copy"><p class="section-kicker">Get in touch</p><h1 class="route-title">Let&rsquo;s talk<br>shoofly.</h1><p>Know a spot that belongs on the map? Have a correction, a shoofly story, a question, or an idea for working together? Send a note—every kind of shoofly message is welcome.</p><div class="contact-pie" aria-hidden="true">🥧</div></div>
      <form id="suggest-form"><label>What&rsquo;s this about?<select name="reason" required><option value="" selected disabled>Choose a reason</option><option>Suggest a shoofly spot</option><option>Update or correct a listing</option><option>Share a shoofly story</option><option>Press or partnership</option><option>Something else</option></select></label><div class="field-row"><label>Your name<input name="sender_name" required maxlength="120" autocomplete="name" placeholder="Your name"></label><label>Your email <span>(optional, if you&rsquo;d like a reply)</span><input name="email" type="email" maxlength="200" autocomplete="email" placeholder="you@example.com"></label></div><div class="field-row"><label>Spot or organization <span>(if applicable)</span><input name="spot_name" maxlength="120" placeholder="Bakery, market, or group"></label><label>Town / state <span>(optional)</span><input name="town" maxlength="100" placeholder="Lancaster, PA"></label></div><label>Google Maps or website link <span>(optional)</span><input name="url" type="url" maxlength="500" placeholder="https://…"></label><label>Your message<textarea name="message" required maxlength="1500" rows="4" placeholder="Tell us what&rsquo;s on your mind…"></textarea></label><div class="form-footer"><button class="button button-primary" type="submit">Send message</button><p id="form-status" role="status" aria-live="polite">Your message is sent privately by email.</p></div></form>
    </section>`
};

function currentRoute() {
  const key = location.hash.replace(/^#\/?/, "").split("/")[0];
  return routes[key] ? key : "about";
}

function render() {
  const route = currentRoute();
  if (map) { map.remove(); map = null; markers = []; }
  app.innerHTML = routes[route]();
  document.querySelectorAll("nav a").forEach(link => link.toggleAttribute("aria-current", link.dataset.route === route));
  document.title = route === "about" ? "I Love Shoofly" : `${route === "what" ? "What Is Shoofly?" : route[0].toUpperCase() + route.slice(1)} · I Love Shoofly`;
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
    const marker = L.marker([spot.lat,spot.lon],{icon,title:`${spot.name}, ${spot.town}`}).bindTooltip(`<strong>${spot.name}</strong><br>${spot.town}`,{direction:"top",offset:[0,-52]}).on("click",()=>selectSpot(index)).addTo(map);
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
      status.textContent = "Thank you! Your message is on its way.";
      status.className = "is-success";
    } catch (error) {
      status.textContent = "That tip didn’t send. Please try again in a moment.";
      status.className = "is-error";
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  });
}

window.addEventListener("hashchange",render);
render();
