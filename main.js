let body = document.querySelector('body');
let apiUrl = "https://jsonplaceholder.typicode.com/users";
let row = document.querySelector('#row');
let input = document.querySelector('#filterInput');
let btn = document.querySelector('#light');

let allData = [];

function getData() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(res => {
            allData = res;
            renderCards(res);
        })
        .catch(err => console.error("Не удалось загрузить данные:", err));
}

function renderCards(data) {
    row.innerHTML = "";
    data.forEach(element => {
        let card = document.createElement('div');
        card.innerHTML = `
      <div class="w-[300px] bg-gray-600 rounded-xl text-center flex flex-col gap-[20px] p-6">
          <p>${element.name}</p>
          <p>${element.email}</p>
          <p>${element.phone}</p>
          <p>${element.address.city}</p>
      </div>
    `;
        row.append(card);
    });

    if (data.length === 0) {
        row.innerHTML = `<p class="text-center">Результаты не найдены</p>`;
    }
}

function filterCards() {
    const query = input.value.toLowerCase();
    const filteredData = allData.filter(user =>
        user.name.toLowerCase().includes(query)
    );
    renderCards(filteredData);
}

function toggleTheme() {
    if (body.classList.contains('bg-gray-800')) {
        btn.innerHTML = "Dark";
        body.classList.remove('bg-gray-800', 'text-white');
        body.classList.add('bg-white', 'text-black');
    } else {
        btn.innerHTML = "Light";
        body.classList.remove('bg-white', 'text-black');
        body.classList.add('bg-gray-800', 'text-white');
    }
}

btn.addEventListener('click', toggleTheme);
input.addEventListener('input', filterCards);

getData();
