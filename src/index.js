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
let lightbox;

searchForm.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', loadMoreImg);

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
    const dataLoading = await fetchFromApi(userQuery, currentPage);
    searchForm.reset();
    totalPages = Math.ceil(dataLoading.totalHits / 40);
    if (!dataLoading.total) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearGallery();
      hideLoadMoreBtn();
    } else {
      Notify.success(`Hooray! We found ${dataLoading.totalHits} images.`);
      loadMoreImg();
    }
  } catch (error) {
    console.log(error);
  }
  lightbox = new SimpleLightbox('.gallery a');
  clearGallery();
}

async function loadMoreImg() {
  loading = true;
  currentPage += 1;

  try {
    const loadingData = await fetchFromApi(userQuery, currentPage);
    gallery.insertAdjacentHTML(
      'beforeend',
      drawCardInterface(loadingData.hits)
    );

    lightbox.refresh();
    showLoadMoreBtn();
  } catch (error) {
    console.log(error);
    loading = false;
  } finally {
    loading = false;
  }

  if (currentPage === totalPages) {
    Notify.info('Sorry. there is all photos about your query');
    hideLoadMoreBtn();
    return;
  }
}

function hideLoadMoreBtn() {
  loadMore.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMore.style.display = 'block';
}

function clearGallery() {
  gallery.innerHTML = '';
}
