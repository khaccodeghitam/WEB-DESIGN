// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Lấy ID hiện tại từ localStorage (hoặc khởi tạo nếu chưa có)
function getCurrentId() {
    const currentId = JSON.parse(localStorage.getItem('currentId'));
    return currentId !== null ? currentId : 10000; // Nếu chưa có, khởi tạo 10000
}

// Lưu ID hiện tại vào localStorage
function saveCurrentId(id) {
    localStorage.setItem('currentId', JSON.stringify(id));
}

// Khởi tạo currentId nếu chưa tồn tại (chạy khi trang load lần đầu)
function initializeCurrentId() {
    if (localStorage.getItem('currentId') === null) {
        saveCurrentId(10000); // Giá trị khởi tạo là 10000
    }
}

// Thêm sản phẩm mới
function addProduct(product) {
    const products = getProducts();
    const currentId = getCurrentId();

    // Tạo ID duy nhất cho sản phẩm mới
    product.productID = currentId + 1;

    // Lưu sản phẩm mới vào danh sách
    products.push(product);
    saveProducts(products);

    // Cập nhật giá trị currentId
    saveCurrentId(product.id);

    // Cập nhật giao diện hiển thị
    renderProducts();
}

// Hiển thị sản phẩm trong bảng
function renderProducts() {
    const products = getProducts();
    const tableBody = document.querySelector("#product-table tbody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ

    products.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.productID}</td>
            <td><img src="${product.image || './src/img/default.jpg'}" alt="Image" style="width: 50px; height: 50px;"></td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.author}</td>
            <td>${product.newPrice} VND</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${product.productID})">Xóa</button>
                <button class="edit-btn" onclick="editProduct(${product.productID})">Sửa</button>
            </td>
        `;
        tableBody.appendChild(row);
        row.setAttribute('data-id',product.productID);

      
    });
}

// Xóa sản phẩm
function deleteProduct(id) {
    const products = getProducts();

    // Tìm và xóa sản phẩm dựa trên ID
    const updatedProducts = products.filter(product => product.productID !== id);
    saveProducts(updatedProducts);

    // Cập nhật giao diện
    renderProducts();
}

// Sửa sản phẩm (Chưa hoàn thiện, thêm sau)
function editProduct(id) {
    alert(`Sửa sản phẩm có ID ${id} (chức năng đang phát triển!)`);
}

function normalizeProductData() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let currentId = JSON.parse(localStorage.getItem('currentId')) || 10000;

    // Duyệt qua danh sách sản phẩm và gán ID mới nếu thiếu
    products = products.map((product) => {
        if (!product.productID) {
            currentId++; // Tăng currentId
            product.productID = currentId; // Gán ID mới duy nhất
        }
        return product;
    });

    // Lưu lại dữ liệu sau khi chuẩn hóa
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('currentId', JSON.stringify(currentId)); // Cập nhật currentId lớn nhất
}

// Khi trang tải, đảm bảo currentId được khởi tạo và hiển thị danh sách sản phẩm
document.addEventListener("DOMContentLoaded", () => {
    normalizeProductData();
    initializeCurrentId();
    renderProducts();
});

