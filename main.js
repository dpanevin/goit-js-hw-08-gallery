import gallery from "/gallery-items.js";

const galleryEL = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = document.querySelector('.js-lightbox__image');

galleryEL.innerHTML = gallery.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}).join('');

galleryEL.addEventListener('click', onImageClick);

function onImageClick(event) {
    const { target } = event;

    if (!target.classList.contains('gallery__image')) {
        return;
    }

    event.preventDefault()

    let originalImgRef = target.dataset.source;
    modalImgEl.src = originalImgRef;
    
    modalEl.classList.add('is-open');

    modalEl.addEventListener('click', onBtnClick);
    window.addEventListener('keydown', onKeyDown);
}

function onBtnClick(event) {
    if (event.target.classList.contains('lightbox__overlay') || event.target.classList.contains('lightbox__button-close')) {
        modalEl.classList.remove('is-open');

        modalImgEl.src = '';

        modalEl.removeEventListener('click', onBtnClick);
        window.removeEventListener('keydown', onKeyDown);
    } else if (event.target.classList.contains('lightbox__button-left')) { 
        onArrowLeftClick();
    } else if (event.target.classList.contains('lightbox__button-right')) {
        onArrowRightClick();
    }
}

function onKeyDown() {
    if (event.code === 'Escape') {
        onEscClick();
    
    } else if (event.code === 'ArrowRight') {
        onArrowRightClick();
    } else if (event.code === 'ArrowLeft') {
        onArrowLeftClick();
    }
}

function onEscClick() {
    modalEl.classList.remove('is-open');

    modalImgEl.src = '';

    modalEl.removeEventListener('click', onBtnClick);
    window.removeEventListener('keydown', onKeyDown); 
}

function onArrowRightClick() {
        const oldIndex = gallery.findIndex(img => modalImgEl.src === img.original)
        const currentIndex = oldIndex + 1;
        modalImgEl.src = gallery[currentIndex] ? gallery[currentIndex].original : gallery[0].original;
}

function onArrowLeftClick() {
    const oldIndex = gallery.findIndex(img => modalImgEl.src === img.original)
    const currentIndex = oldIndex - 1;
    modalImgEl.src = gallery[currentIndex] ? gallery[currentIndex].original : gallery[gallery.length - 1].original;
}