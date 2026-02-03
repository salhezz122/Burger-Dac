let menu = JSON.parse(localStorage.getItem("menu")) || [
    {
        name: "Burger",
        price: 5,
        image: "images/burger.jpg"
    },
    {
        name: "Pizza",
        price: 7,
        image: "images/pizza.jpg"
    }
];

function saveMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
}

function displayMenu() {
    let menuDiv = document.getElementById("menu");
    if (!menuDiv) return;

    menuDiv.innerHTML = "";
    menu.forEach(item => {
        menuDiv.innerHTML += `
        <div class="card">
            <img src="${item.image}">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p class="price">$${item.price}</p>
            </div>
        </div>
        `;
    });
}

displayMenu();

/* Admin */
function login() {
    let pass = document.getElementById("adminPass").value;
    if (pass === "admin123") {
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Wrong password");
    }
}

function addItem() {
    let name = document.getElementById("itemName").value;
    let price = document.getElementById("itemPrice").value;
    let image = document.getElementById("itemImage").value;

    if (!name || !price || !image) {
        alert("Fill all fields");
        return;
    }

    menu.push({ name, price, image });
    saveMenu();
    showAdminMenu();
}

function deleteItem(index) {
    menu.splice(index, 1);
    saveMenu();
    showAdminMenu();
}

function showAdminMenu() {
    let list = document.getElementById("adminMenu");
    if (!list) return;

    list.innerHTML = "";
    menu.forEach((item, index) => {
        list.innerHTML += `
        <li>
            ${item.name} - $${item.price}
            <button onclick="deleteItem(${index})">Delete</button>
        </li>
        `;
    });
}

showAdminMenu();
