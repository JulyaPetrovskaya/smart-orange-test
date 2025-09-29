document.addEventListener('DOMContentLoaded', () => {
  // --- Ініціалізація змінних ---
  const API_URL = 'https://test.smarto.agency/smarto_complexes_list.json';
  const objectsContainer = document.getElementById('objects-container');
  const loadMoreButton = document.getElementById('load-more');
  const navContainer = document.getElementById('objects-nav'); // Новий елемент
  
  const ITEMS_PER_PAGE = 3;
  let currentPage = 0;
  let allObjects = [];       // Масив для ВСІХ об'єктів з сервера
  let filteredObjects = [];  // Масив для відфільтрованих об'єктів

  // --- Функції для рендерингу ---
  const createCardHTML = (object) => {
    const tagsHTML = object.tags.map(tag => `<span class="card__tag">${tag}</span>`).join('');
    return `
      <div class="card">
        <div class="card__pin"></div>
        <div class="card__header">
          <span class="card__year">${object.year} р.</span>
          <span class="card__type">${object.type}</span>
        </div>
        <div class="card__image"><img src="${object.img}" alt="${object.name}"></div>
        <div class="card__body">
          <h3 class="card__title">${object.name}</h3>
          <p class="card__address">${object.adress}</p>
        </div>
        <div class="card__footer">
          <p class="card__footer-title">ВИДИ РОБІТ:</p>
          <div class="card__tags-wrapper">${tagsHTML}</div>
        </div>
      </div>
    `;
  };

  const renderCards = () => {
    // Визначаємо, скільки карток вже показано
    const renderedCount = objectsContainer.children.length;
    const objectsToRender = filteredObjects.slice(renderedCount, renderedCount + ITEMS_PER_PAGE);

    const pageHTML = objectsToRender.map(createCardHTML).join('');
    objectsContainer.innerHTML += pageHTML;

    // Показуємо або ховаємо кнопку "Завантажити ще"
    if (objectsContainer.children.length >= filteredObjects.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  };

  // --- Функції для фільтрації ---
  const filterObjects = (type) => {
    objectsContainer.innerHTML = '';
    currentPage = 0;

    if (type === 'Усі') {
      filteredObjects = [...allObjects];
    } else {
      filteredObjects = allObjects.filter(object => object.type === type);
    }
    renderCards();
  };

  const createNavButtons = () => {
    const types = ['Усі', ...new Set(allObjects.map(object => object.type))];
    
    types.forEach(type => {
      const button = document.createElement('a');
      button.href = '#';
      button.textContent = type;
      button.classList.add('objects__nav-link');
      if (type === 'Усі') {
        button.classList.add('objects__nav-link--active');
      }
      navContainer.appendChild(button);
    });

    navContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;

      if (target.classList.contains('objects__nav-link')) {
        navContainer.querySelector('.objects__nav-link--active').classList.remove('objects__nav-link--active');
        target.classList.add('objects__nav-link--active');
        
        filterObjects(target.textContent);
      }
    });
  };

  // --- Головна функція завантаження ---
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Не вдалося завантажити дані');
      allObjects = await response.json();
      filteredObjects = [...allObjects];
      
      createNavButtons();
      renderCards();

    } catch (error) {
      console.error(error);
      objectsContainer.innerHTML = `<p>Помилка: ${error.message}</p>`;
    }
  };

  // --- Обробник для кнопки "Завантажити ще" ---
  loadMoreButton.addEventListener('click', renderCards);

  fetchData();
});