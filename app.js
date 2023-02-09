const harcamaInput = document.getElementById('harcama');
const fiyatInput = document.getElementById('fiyat');
const durumInput = document.getElementById('durum');
const listeContainer = document.getElementById('liste');

listeContainer.addEventListener('click', handleClick);

function addExpense(event) {
  event.preventDefault();

  //?Boş inputu ele alma
  if (!fiyatInput.value || !harcamaInput.value) {
    return;
  }

  //Kutucuk oluşturup classını verme
  const harcamaDiv = document.createElement('div');
  harcamaDiv.classList.add('harcama');

  //içindeki içeriği belirleme
  harcamaDiv.innerHTML = `
  <h1>${harcamaInput.value}</h1>
  <h2 id="cost" class="cost ${durumInput.checked ? 'odendi' : ''}" >${
    fiyatInput.value
  } &#8378</h2>
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

//!Silme Ve Onay işlemi
function handleDelete(e) {
  const item = e.target;
  if (e.target.id === 'deleteBtn') {
    item.parentElement.parentElement.remove();
  }
}
function handleClick(e) {
  const item = e.target;

  if (e.target.id === 'deleteBtn') {
    item.parentElement.parentElement.remove();
  } else if (e.target.id === 'paymentBtn') {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle('odendi');
  } else {
    return;
  }
}
