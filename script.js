let menu = JSON.parse(localStorage.getItem("menu")) || [
    { name: "Burger", price: 5 },
    { name: "Pizza", price: 7 }
];

function saveMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
}

function displayMenu() {
    let menuDiv = document.getElementById("menu");
    if (!menuDiv) return;
    menuDiv.innerHTML = "";
    menu.forEach(item => {
        menuDiv.innerHTML += `<div>
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>`;
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
    menu.push({ name, price });
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
    list.innerHTML = "";
    menu.forEach((item, index) => {
        list.innerHTML += `
        <li>
            ${item.name} - $${item.price}
            <button onclick="deleteItem(${index})">X</button>
        </li>`;
    });
}

showAdminMenu();
