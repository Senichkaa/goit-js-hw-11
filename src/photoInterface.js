const createCardInterface = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card">
  <a class="gallery-link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"  class="card-image"/>
  </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
};

const drawCardInterface = array => array.map(createCardInterface).join('');
export default drawCardInterface;
