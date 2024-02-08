// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

document.addEventListener('DOMContentLoaded', function () {
  const searchBox = document.getElementById('search-box');

  searchBox.addEventListener('input', function () {
    const searchText = searchBox.value.toLowerCase();
    const allTextElements = document.querySelectorAll('.searchable-text');

    allTextElements.forEach(function (element) {
      const textContent = element.textContent.toLowerCase();
      element.style.display = textContent.includes(searchText) ? 'block' : 'none';
    });
  });
});




// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const lf = document.querySelector('#login-form');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }

    if (!lf.contains(e.target) && !loginForm.contains(e.target)) {
    loginForm.classList.remove('active');
  }

});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});


// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// scroll indicator
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('nav');
  const scrollIndicator = document.getElementById('scrollIndicator');

  function updateScrollIndicator() {
   const scrollPosition = window.scrollY;
   const headerHeight = header.offsetHeight;
   const contentHeight = document.body.clientHeight - window.innerHeight;
   const scrollPercentage = (scrollPosition / contentHeight) * 100;
   const indicatorWidth = (scrollPercentage * headerHeight) / 100;

    scrollIndicator.style.width = `${indicatorWidth}rem`;
  }

  window.addEventListener('scroll', updateScrollIndicator);
  window.addEventListener('resize', updateScrollIndicator);

  updateScrollIndicator();
});

// hero slider
const initHeroSlider = () => {
  const heroSlider = new Swiper('.home-slider', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  });
};

// favorite menu slider
const initFavoriteMenuSlider = () => {
  const imageList = document.querySelector('.slider-wrapper .image-list');
  const slideButtons = document.querySelectorAll('.slider-wrapper .fa-solid');
  const sliderScrollbar = document.querySelector('.fav-menu-card .slider-scrollbar');
  const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  scrollbarThumb.addEventListener('mousedown', handleMouseDown);

  slideButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.id === 'prev-slide' ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  const handleSlideButtons = () => {
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'flex';
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'flex';
  };

  const updateScrollThumbPosition = () => {
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener('scroll', () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener('resize', initFavoriteMenuSlider);
window.addEventListener('load', () => {
  // Assuming initHeroSlider is defined elsewhere
  initHeroSlider();
  initFavoriteMenuSlider();
});
