import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchFromApi } from './fetchFromApi';
import drawCardInterface from './photoInterface.js';

const input = document.querySelector('.input');
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more-btn');

let totalPages = 0;
let currentPage = 1;
let loading = false;
let userQuery = '';
let lightbox = null;

searchForm.addEventListener('submit', onSubmit);

clearGallery();
hideLoadMoreBtn();

async function onSubmit(event) {
  event.preventDefault();
  userQuery = input.value.trim();
  currentPage = 1;

  if (!userQuery) {
    Notify.warning('Enter a valid query into a search field');
    return;
  }

  try {
    const loadingData = await fetchFromApi(userQuery, currentPage);
    searchForm.reset();
    if (!loadingData.total) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${loadingData.totalHits} images.`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreImg() {
  loading = true;
  currentPage += 1;
  if (currentPage === totalPages) {
    Notify.info('Sorry. there is all photos about your query');
    hideLoadMoreBtn();
    return;
  }

  try {
    const loadingData = await fetchFromApi(userQuery, currentPage);
    gallery.insertAdjacentHTML(
      'beforeend',
      drawCardInterface(loadingData.hits)
    );
    showLoadMoreBtn();
  } catch (error) {
    console.log(error);
    loading = false;
  }
}

// async function onSubmit(event) {
//   event.preventDefault();
//   userQuery = input.value.trim();
//   currentPage = 1;
//   clearGallery();

//   if (!userQuery) {
//     Notify.warning('Enter a valid query into a search field');
//     return;
//   }

//   try {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     const loadingData = await fetchFromApi(currentPage, userQuery);
//     searchForm.reset();

//     if (loadingData.hits.length === 0) {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       hideLoadMoreBtn();
//     } else {
//       Notify.success(`Hooray! We found ${loadingData.totalHits} images.`);
//     }

//     gallery.innerHTML = drawCardInterface(loadingData.hits);
//     lightbox = new SimpleLightbox('.gallery a');
//   } catch (error) {
//     console.log(error.message);
//     Notify.failure('There is error');
//   }
// }

function hideLoadMoreBtn() {
  loadMore.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMore.style.display = 'block';
}

function clearGallery() {
  gallery.innerHTML = '';
}
