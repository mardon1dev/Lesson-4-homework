const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const itemId = document.querySelector('#itemId');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (itemId.value) {
            item = JSON.parse(localStorage.getItem(itemId.value));
            item.name = nameInput.value;
            item.price = priceInput.value;
    }  
    else {
        item = {
            name: nameInput.value,
            price: priceInput.value
        }
        itemId.value = `${Date.now()}`;
        
    }

    localStorage.setItem(itemId.value, JSON.stringify(item));
    nameInput.value = "";
    priceInput.value = "";
    itemId.value = "";

    renderList();
});
const itemList = document.querySelector('.itemList');

function renderList() {
    itemList.innerHTML = '';

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const item = JSON.parse(localStorage.getItem(key));
            const list = document.createElement('li');
            list.innerHTML = `<p>Name: ${item.name} Price: ${item.price}</p>`;
            itemList.appendChild(list);
            const editButton = document.createElement('button');
            editButton.innerHTML = 'Edit';
            editButton.classList = "editButton";
            list.appendChild(editButton);
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.classList = "deleteButton";
            list.appendChild(deleteButton);
            deleteButton.addEventListener("click", ()=>{
                localStorage.removeItem(key);
                itemList.removeChild(list);
                renderList();
            })
            editButton.addEventListener('click', () => {
                nameInput.value = item.name;
                priceInput.value = item.price;
                itemId.value = key;
            })    
        }
    }
}
renderList();