// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hiển thị sản phẩm trong bảng
function renderProducts() {
    const products = getProducts();
    const tableBody = document.querySelector("#product-table tbody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${10000 + index}</td>
            <td><img src="${product.image || './src/img/default.jpg'}" alt="Image" style="width: 50px; height: 50px;"></td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.author}</td>
            <td>${product.newPrice} VND</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${index})">Xóa</button>
                <button class="edit-btn" onclick="editProduct(${index})">Sửa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Xóa sản phẩm
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1); // Xóa sản phẩm tại vị trí index
    saveProducts(products); // Lưu lại
    renderProducts(); // Cập nhật bảng
}

// Sửa sản phẩm (Chưa hoàn thiện, thêm sau)
function editProduct(index) {
    alert(`Sửa sản phẩm ở vị trí ${index} (chức năng đang phát triển!)`);
}

// Hiển thị danh sách sản phẩm khi tải trang
document.addEventListener("DOMContentLoaded", renderProducts);


