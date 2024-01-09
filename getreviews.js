let products;

function renderPage() {
  const reviewsList = document.getElementById('reviewsList')
  console.log(typeof reviewsList);
  reviewsList.innerHTML = '';
  products = JSON.parse(localStorage.getItem('products')) || {};

  for (let productName in products) {
    const productDiv = document.createElement('div');
    productDiv.innerHTML =
      `<h3>${productName}</h3>
       <button id="btn${productName}" onclick="toggleReviews('${productName}')">Показать отзывы</button>
       <div id="${productName}" style="display: none;"></div>
      `;
    reviewsList.appendChild(productDiv);
  }
}

function toggleReviews(productName) {
  const reviewsDiv = document.getElementById(productName);
  const toggleButton = document.getElementById(`btn${productName}`)
  if (reviewsDiv.style.display === 'none') {
    reviewsDiv.style.display = 'block';
    reviewsDiv.innerHTML = products[productName].map(review =>
      `<p>${review.text}</p>
       <button onclick="deleteReview('${productName}', '${review.id}')">Удалить</button>
      `
    ).join('');
    toggleButton.innerText = 'Скрыть отзывы'
  } else {
    reviewsDiv.style.display = 'none';
    reviewsDiv.innerHTML = '';
    toggleButton.innerText = 'Показать отзывы';
  }
}

function deleteReview(productName, reviewId) {
  products[productName] = products[productName].filter(review => review.id !== Number(reviewId));
  if (products[productName].length === 0) {
    delete products[productName];
  }
  localStorage.setItem('products', JSON.stringify(products));
  renderPage();
}

renderPage();
