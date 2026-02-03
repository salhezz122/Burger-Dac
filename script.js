// ================= MENU DATA =================
let menu = JSON.parse(localStorage.getItem("menu")) || [
    { name: "Beef Burger", price: 6, image: "" },
    { name: "Chicken Burger", price: 5, image: "" },
    { name: "Pizza", price: 7, image: "" },
    { name: "Pasta", price: 8, image: "" },
    { name: "Grilled Chicken", price: 9, image: "" },
    { name: "Caesar Salad", price: 4, image: "" },
    { name: "French Fries", price: 3, image: "" },
    { name: "Steak", price: 12, image: "" },
    { name: "Soft Drink", price: 2, image: "" },
    { name: "Chocolate Cake", price: 4, image: "" }
];

localStorage.setItem("menu", JSON.stringify(menu));

// ================= DISPLAY MENU =================
function displayMenu() {
    let menuDiv = document.getElementById("menu");
    if (!menuDiv) return;

    menuDiv.innerHTML = "";
    menu.forEach(item => {
        menuDiv.innerHTML += `
        <div class="menu-box">
            <img src="${item.image || 'https://via.placeholder.com/300x200?text=Food'}">
            <div class="menu-content">
                <h3>${item.name}</h3>
                <div class="price">$${item.price}</div>
            </div>
        </div>`;
    });
}
displayMenu();

// ================= ADMIN LOGIN =================
function login() {
    let pass = document.getElementById("adminPass").value;

    if (pass === "admin123") {
        document.getElementById("adminPanel").style.display = "block";
    } else {
        alert("Wrong password");
    }
}

// ================= ADMIN ACTIONS =================
function addItem() {
    let name = document.getElementById("itemName").value;
    let price = document.getElementById("itemPrice").value;
    let imageInput = document.getElementById("itemImage");

    if (!name || !price || imageInput.files.length === 0) {
        alert("Fill all fields and choose an image");
        return;
    }

    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.onload = function () {
        menu.push({
            name: name,
            price: price,
            image: reader.result
        });

        localStorage.setItem("menu", JSON.stringify(menu));
        showAdminMenu();
        displayMenu();

        // تنظيف الحقول
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
        imageInput.value = "";
    };

    reader.readAsDataURL(file);
}

function deleteItem(index) {
    menu.splice(index, 1);
    localStorage.setItem("menu", JSON.stringify(menu));
    showAdminMenu();
    displayMenu();
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
