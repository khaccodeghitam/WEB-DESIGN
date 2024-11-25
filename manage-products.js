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



// Hiển thị bảng tìm kiếm sản phẩm
function showsearchproduct() {
    const searchProduct = document.getElementById('search-product'); // Lấy div tìm kiếm sản phẩm
    const productButton = document.querySelector('.product-manage .product'); // Lấy nút tìm kiếm sản phẩm

    // Hiển thị div tìm kiếm và ẩn nút tìm kiếm
    searchProduct.style.display = 'block';
    productButton.style.display = 'none';
}

// Hiển thị bảng tìm kiếm khách hàng
function showsearchcustomer() {
    const searchCustomer = document.getElementById('search-customer'); // Lấy div tìm kiếm khách hàng
    const customerButton = document.querySelector('.dashboard .product'); // Lấy nút tìm kiếm khách hàng

    // Hiển thị div tìm kiếm và ẩn nút tìm kiếm
    searchCustomer.style.display = 'block';
    customerButton.style.display = 'none';
}

// Đóng bảng tìm kiếm
function closesearch() {
    const searchProduct = document.getElementById('search-product');
    const productButton = document.querySelector('.product-manage .product');

    const searchCustomer = document.getElementById('search-customer');
    const customerButton = document.querySelector('.dashboard .product');

    // Ẩn cả hai div tìm kiếm và hiển thị lại nút tìm kiếm
    searchProduct.style.display = 'none';
    productButton.style.display = 'inline-block';

    searchCustomer.style.display = 'none';
    customerButton.style.display = 'inline-block';
}


// Hàm hiển thị danh sách sản phẩm
function showproductlist() {
    const productManage = document.querySelector('.product-manage');
    const dashboard = document.querySelector('.dashboard');
    const searchCustomer = document.getElementById('search-customer');
    

    // Hiển thị product-manage, ẩn dashboard
    productManage.style.display = 'block';
    dashboard.style.display = 'none';
    searchCustomer.style.display = 'none';
}

// Hàm hiển thị danh sách khách hàng
function showcustomerlist() {
    const productManage = document.querySelector('.product-manage');
    const dashboard = document.querySelector('.dashboard');
    const searchProduct = document.getElementById('search-product');


    // Hiển thị dashboard, ẩn product-manage
    dashboard.style.display = 'block';
    productManage.style.display = 'none';
    searchProduct.style.display = 'none';

}

// Ẩn cả hai div ban đầu để không hiển thị cùng lúc
window.onload = function() {
    const productManage = document.querySelector('.product-manage');
    const dashboard = document.querySelector('.dashboard');
    productManage.style.display = 'none';
    dashboard.style.display = 'none';
};