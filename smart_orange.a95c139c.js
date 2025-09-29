document.addEventListener('DOMContentLoaded', ()=>{
    const API_URL = 'https://test.smarto.agency/smarto_complexes_list.json';
    const objectsContainer = document.getElementById('objects-container');
    const loadMoreButton = document.getElementById('load-more');
    const navContainer = document.getElementById('objects-nav');
    const ITEMS_PER_PAGE = 3;
    let currentPage = 0;
    let allObjects = [];
    let filteredObjects = [];
    const createCardHTML = (object)=>{
        const tagsHTML = object.tags.map((tag)=>`<span class="card__tag">${tag}</span>`).join('');
        return `
      <div class="card">
        <div class="card__pin"></div>
        <div class="card__header">
          <span class="card__year">${object.year} \u{440}.</span>
          <span class="card__type">${object.type}</span>
        </div>
        <div class="card__image"><img src="${object.img}" alt="${object.name}"></div>
        <div class="card__body">
          <h3 class="card__title">${object.name}</h3>
          <p class="card__address">${object.adress}</p>
        </div>
        <div class="card__footer">
          <p class="card__footer-title">\u{412}\u{418}\u{414}\u{418} \u{420}\u{41E}\u{411}\u{406}\u{422}:</p>
          <div class="card__tags-wrapper">${tagsHTML}</div>
        </div>
      </div>
    `;
    };
    const renderCards = ()=>{
        const renderedCount = objectsContainer.children.length;
        const objectsToRender = filteredObjects.slice(renderedCount, renderedCount + ITEMS_PER_PAGE);
        const pageHTML = objectsToRender.map(createCardHTML).join('');
        objectsContainer.innerHTML += pageHTML;
        if (objectsContainer.children.length >= filteredObjects.length) loadMoreButton.style.display = 'none';
        else loadMoreButton.style.display = 'block';
    };
    const filterObjects = (type)=>{
        objectsContainer.innerHTML = '';
        currentPage = 0;
        if (type === "\u0423\u0441\u0456") filteredObjects = [
            ...allObjects
        ];
        else filteredObjects = allObjects.filter((object)=>object.type === type);
        renderCards();
    };
    const createNavButtons = ()=>{
        const types = [
            "\u0423\u0441\u0456",
            ...new Set(allObjects.map((object)=>object.type))
        ];
        types.forEach((type)=>{
            const button = document.createElement('a');
            button.href = '#';
            button.textContent = type;
            button.classList.add('objects__nav-link');
            if (type === "\u0423\u0441\u0456") button.classList.add('objects__nav-link--active');
            navContainer.appendChild(button);
        });
        navContainer.addEventListener('click', (e)=>{
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('objects__nav-link')) {
                navContainer.querySelector('.objects__nav-link--active').classList.remove('objects__nav-link--active');
                target.classList.add('objects__nav-link--active');
                filterObjects(target.textContent);
            }
        });
    };
    const fetchData = async ()=>{
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0434\u0430\u043D\u0456");
            allObjects = await response.json();
            filteredObjects = [
                ...allObjects
            ];
            createNavButtons();
            renderCards();
        } catch (error) {
            console.error(error);
            objectsContainer.innerHTML = `<p>\u{41F}\u{43E}\u{43C}\u{438}\u{43B}\u{43A}\u{430}: ${error.message}</p>`;
        }
    };
    loadMoreButton.addEventListener('click', renderCards);
    fetchData();
});

//# sourceMappingURL=smart_orange.a95c139c.js.map
