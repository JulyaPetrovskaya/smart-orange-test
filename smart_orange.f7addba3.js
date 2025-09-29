document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("objects-container"),t=document.getElementById("load-more"),a=document.getElementById("objects-nav"),s=[],n=[],c=e=>{let t=e.tags.map(e=>`<span class="card__tag">${e}</span>`).join("");return`
      <div class="card">
        <div class="card__pin"></div>
        <div class="card__header">
          <span class="card__year">${e.year} \u{440}.</span>
          <span class="card__type">${e.type}</span>
        </div>
        <div class="card__image"><img src="${e.img}" alt="${e.name}"></div>
        <div class="card__body">
          <h3 class="card__title">${e.name}</h3>
          <p class="card__address">${e.adress}</p>
        </div>
        <div class="card__footer">
          <p class="card__footer-title">\u{412}\u{418}\u{414}\u{418} \u{420}\u{41E}\u{411}\u{406}\u{422}:</p>
          <div class="card__tags-wrapper">${t}</div>
        </div>
      </div>
    `},d=()=>{let a=e.children.length,s=n.slice(a,a+3).map(c).join("");e.innerHTML+=s,e.children.length>=n.length?t.style.display="none":t.style.display="block"},i=async()=>{try{let t=await fetch("https://test.smarto.agency/smarto_complexes_list.json");if(!t.ok)throw Error("Не вдалося завантажити дані");n=[...s=await t.json()],["Усі",...new Set(s.map(e=>e.type))].forEach(e=>{let t=document.createElement("a");t.href="#",t.textContent=e,t.classList.add("objects__nav-link"),"Усі"===e&&t.classList.add("objects__nav-link--active"),a.appendChild(t)}),a.addEventListener("click",t=>{t.preventDefault();let c=t.target;c.classList.contains("objects__nav-link")&&(a.querySelector(".objects__nav-link--active").classList.remove("objects__nav-link--active"),c.classList.add("objects__nav-link--active"),(t=>{e.innerHTML="",n="Усі"===t?[...s]:s.filter(e=>e.type===t),d()})(c.textContent))}),d()}catch(t){console.error(t),e.innerHTML=`<p>\u{41F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430}: ${t.message}</p>`}};t.addEventListener("click",d),i()});
//# sourceMappingURL=smart_orange.f7addba3.js.map
