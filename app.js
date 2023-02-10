const harcamaInput = document.getElementById('harcama');
const fiyatInput = document.getElementById('fiyat');
const durumInput = document.getElementById('durum');
const listeContainer = document.getElementById('liste');
const toplamKutu = document.querySelector('.toplam');
const filter = document.querySelector('select');

listeContainer.addEventListener('click', handleClick);
filter.addEventListener('change', handleFilter);

const expenses = [];

function updateToplam() {
  var toplam = expenses.reduce((toplam, fiyat) => toplam + fiyat, 0);
  toplamKutu.innerText = `Toplam Harcama: ${toplam}`;
}

function addExpense(event) {
  event.preventDefault();

  //?Boş inputu ele alma
  if (!fiyatInput.value || !harcamaInput.value) {
    return;
  }

  //! toplam fiyat
  expenses.push(Number(fiyatInput?.value));
  updateToplam();

  //Kutucuk oluşturup classını verme
  const harcamaDiv = document.createElement('div');
  harcamaDiv.classList.add('harcama');
  if (durumInput.checked) {
    harcamaDiv.classList.add('odendi');
  }

  //içindeki içeriği belirleme
  harcamaDiv.innerHTML = `
  <h1>${harcamaInput.value}</h1>
  <h2 id="cost">${fiyatInput.value} </h2>
  <div class="buttons">
      <img id="paymentBtn" src="images/odeme.png" />
      <img id="deleteBtn" src="images/sil.png" />
  </div>
  `;

  //Oluşturulan divi listeye ekleme
  listeContainer.appendChild(harcamaDiv);

  //? inputları sıfırlama
  harcamaInput.value = 'a';
  fiyatInput.value = '0';
  durumInput.checked = false;
}

//!Silme Ve Ödendi işlemi
function handleDelete(e) {
  const item = e.target;
  if (e.target.id === 'deleteBtn') {
    item.parentElement.parentElement.remove();
  }
}

function handleClick(e) {
  const item = e.target;

  if (e.target.id === 'deleteBtn') {
    const harcama = item.parentElement.parentElement;
    const harcamaFiyat = harcama.querySelector('h2').innerText;
    expenses.push(-Number(harcamaFiyat));
    updateToplam();

    harcama.classList.add('fall');
    harcama.addEventListener('transitionend', () => {
      harcama.remove();
    });
  } else if (e.target.id === 'paymentBtn') {
    const harcama = item.parentElement.parentElement;
    harcama.classList.toggle('odendi');
  } else {
    return;
  }
}

//!! Filtreleme işlemi
function handleFilter(e) {
  const items = listeContainer.childNodes;
  console.log(items);
  items.forEach((item) => {
    switch (e.target.value) {
      case 'hepsi':
        item.style.display = 'flex';
        break;

      case 'odendi':
        if (item.classList.contains('odendi')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;

      case 'odenmedi':
        if (!item.classList.contains('odendi')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
    }
  });
}
