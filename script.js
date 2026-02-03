let menu = JSON.parse(localStorage.getItem("menu")) || [];

function saveMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
}

function displayMenu() {
    let menuDiv = document.getElementById("menu");
    if (!menuDiv) return;

    menuDiv.innerHTML = "";
    menu.forEach(item => {
        menuDiv.innerHTML += `
        <div class="menu-box">
            <img src="${item.image}">
            <div class="menu-content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
            </div>
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
    let imageInput = document.getElementById("itemImage");

    if (!name || !price || imageInput.files.length === 0) {
        alert("Fill all fields");
        return;
    }

    let reader = new FileReader();
    reader.onload = function () {
        menu.push({
            name: name,
            price: price,
            image: reader.result
        });
        saveMenu();
        displayMenu();
        showAdminMenu();
    };
    reader.readAsDataURL(imageInput.files[0]);
}

function deleteItem(index) {
    menu.splice(index, 1);
    saveMenu();
    displayMenu();
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
        </li>`;
    });
}

showAdminMenu();
