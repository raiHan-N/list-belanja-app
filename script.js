let floating_btn = document.getElementById('floating_btn');
let modal = document.getElementById('modal');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let date_list = document.getElementById('date_list');
let root = document.getElementById('root');

let list_product = [];

let formatDate = new Date().toLocaleDateString('global', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

date_list.innerHTML = formatDate;

floating_btn.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    showModal();
    return;
  }

  hideModal();
});

modal_bg.addEventListener('click', () => {
  hideModal();
});

addlist_form.addEventListener('submit', (event) => {
  event.preventDefault();

  let nameProduct = event.target.product.value;
  let priceProduct = event.target.price.value;

  if (priceProduct === '' || nameProduct === '') {
    alert('Isi Dulu Boy...');
    hideModal();
    return;
  }

  list_product.push({
    name: nameProduct,
    price: priceProduct,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  event.target.product.value = '';
  event.target.price.value = '';

  renderToHtml();
  hideModal();
});

function showModal() {
  modal.style.display = 'flex';
  floating_btn.style.backgroundColor = '#C4D7E0';
  floating_btn.style.transform = 'rotate(-45deg)';
}

function hideModal() {
  modal.style.display = 'none';
  floating_btn.style.backgroundColor = '#56688f';
  floating_btn.style.transform = 'rotate(0deg)';
}

function renderToHtml() {
  root.innerHTML = '';

  list_product.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <p>${e.date} &nbsp;  ${e.time}</p>
      <div>${e.name} <span>Rp.${e.price}</span></div>
      <button onclick="handleDelete(${i})">Done</button>
    </div>`;
  });
}

function handleDelete(index) {
  let confDelete = confirm('Delete this product?');
  if (!confDelete) {
    return;
  }
  list_product.splice(index, 1);
  renderToHtml();
}
