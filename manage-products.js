function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function getCurrentId() {
    const currentId = JSON.parse(localStorage.getItem('currentId'));
    return currentId !== null ? currentId : 10000; 
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

function formatCurrency(number) {
    return Number(number).toLocaleString('vi-VN');
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

const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// Hiển thị sản phẩm trong bảng
function renderProducts(page = 1) {
    currentPage = page;
    const products = getProducts();
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = page * ITEMS_PER_PAGE;
    const pageProducts = products.slice(start, end);
    const tableBody = document.querySelector("#product-table tbody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ
    // products.forEach((product) => {

    pageProducts.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.productID}</td>
            <td><img src="${product.image || './src/img/default.jpg'}" alt="Image" style="width: 50px; height: 50px;"></td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.author}</td>
            <td>${formatCurrency(product.newPrice)} đ</td>
            <td>
                <button class="delete-btn" onclick="deleteProduct(${product.productID})">Xóa</button>
                <button class="edit-btn" onclick="editProduct(${product.productID})">Sửa</button>
            </td>
        `;
        tableBody.appendChild(row);
        row.setAttribute('data-id',product.productID);

      
    });
    renderPagination(products.length);
}

function renderPagination(totalItems) {
    const pageContainer = document.getElementById("pageadmin");
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    pageContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => renderProducts(i);
        if (i === currentPage) {
            pageButton.style.fontWeight = "bold";
        }
        pageContainer.appendChild(pageButton);
    }
}
function deleteProduct(id) {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không?");
    
    if (confirmDelete) {
        const products = getProducts();

        // Tìm và xóa sản phẩm dựa trên ID
        const updatedProducts = products.filter(product => product.productID !== id);
        saveProducts(updatedProducts);

        // Cập nhật giao diện
        renderProducts();

        alert("Sản phẩm đã được xóa thành công!");
    } 
}


// Sửa sản phẩm (Chưa hoàn thiện, thêm sau)
function editProduct(id) {
    const products = getProducts();
    const productToEdit = products.find(product => product.productID === id);
    document.getElementById("pageadmin").style.display='none';
    if (!productToEdit) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    // Ẩn phần quản lý sản phẩm và tìm kiếm
    document.querySelector('.product-manage').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';

    // Hiển thị form chỉnh sửa
    const editFormContainer = document.getElementById("edit-form-container");
    editFormContainer.style.display = 'block';
    
    editFormContainer.innerHTML = `
        <div class="form-container">
            <h3>Chỉnh sửa sản phẩm</h3>
            <form id="edit-form">
                <label for="product-name">Tên sản phẩm:</label>
                <input type="text" id="product-name" name="product-name" value="${productToEdit.productName}">

                <label for="old-price">Giá cũ:</label>
                <input type="number" id="old-price" name="old-price" value="${productToEdit.oldPrice}">

                <label for="new-price">Giá mới:</label>
                <input type="number" id="new-price" name="new-price" value="${productToEdit.newPrice}">

                <label for="category">Thể Loại:</label>
                <select id="category" name="category">
                    <option value="" disabled ${!productToEdit.category ? 'selected' : ''}>Chọn Thể Loại</option>
                    <option value="Tiểu thuyết" ${productToEdit.category === 'Tiểu thuyết' ? 'selected' : ''}>Tiểu thuyết</option>
                    <option value="Truyện ngắn" ${productToEdit.category === 'Truyện ngắn' ? 'selected' : ''}>Truyện ngắn</option>
                    <option value="Ngôn tình" ${productToEdit.category === 'Ngôn tình' ? 'selected' : ''}>Ngôn tình</option>
                    <option value="Bài học kinh doanh" ${productToEdit.category === 'Bài học kinh doanh' ? 'selected' : ''}>Bài học kinh doanh</option>
                    <option value="Quản trị - Lãnh đạo" ${productToEdit.category === 'Quản trị - Lãnh đạo' ? 'selected' : ''}>Quản trị - Lãnh đạo</option>
                    <option value="Marketing" ${productToEdit.category === 'Marketing' ? 'selected' : ''}>Marketing</option>
                    <option value="Phân tích kinh tế" ${productToEdit.category === 'Phân tích kinh tế' ? 'selected' : ''}>Phân tích kinh tế</option>
                    <option value="Sách giáo khoa" ${productToEdit.category === 'Sách giáo khoa' ? 'selected' : ''}>Sách giáo khoa</option>
                    <option value="Sách luyện thi THPTQG" ${productToEdit.category === 'Sách luyện thi THPTQG' ? 'selected' : ''}>Sách luyện thi THPTQG</option>
                    <option value="Sách mẫu giáo" ${productToEdit.category === 'Sách mẫu giáo' ? 'selected' : ''}>Sách mẫu giáo</option>
                    <option value="Kỹ năng sống" ${productToEdit.category === 'Kỹ năng sống' ? 'selected' : ''}>Kỹ năng sống</option>
                    <option value="Rèn luyện nhân cách" ${productToEdit.category === 'Rèn luyện nhân cách' ? 'selected' : ''}>Rèn luyện nhân cách</option>
                    <option value="Tâm lý" ${productToEdit.category === 'Tâm lý' ? 'selected' : ''}>Tâm lý</option>
                    <option value="Sách cho tuổi mới lớn" ${productToEdit.category === 'Sách cho tuổi mới lớn' ? 'selected' : ''}>Sách cho tuổi mới lớn</option>
                    <option value="Manga (Nhật Bản)" ${productToEdit.category === 'Manga (Nhật Bản)' ? 'selected' : ''}>Manga (Nhật Bản)</option>
                    <option value="Manhwa (Hàn Quốc)" ${productToEdit.category === 'Manhwa (Hàn Quốc)' ? 'selected' : ''}>Manhwa (Hàn Quốc)</option>
                    <option value="Manhua (Trung Quốc)" ${productToEdit.category === 'Manhua (Trung Quốc)' ? 'selected' : ''}>Manhua (Trung Quốc)</option>
                    <option value="Comic (Phương Tây)" ${productToEdit.category === 'Comic (Phương Tây)' ? 'selected' : ''}>Comic (Phương Tây)</option>
                    <option value="Truyện tranh thiếu nhi" ${productToEdit.category === 'Truyện tranh thiếu nhi' ? 'selected' : ''}>Truyện tranh thiếu nhi</option>
                </select>

                <label for="supplier">Nhà cung cấp:</label>
                <input type="text" id="supplier" name="supplier" value="${productToEdit.supplier}">

                <label for="publisher">Nhà xuất bản:</label>
                <input type="text" id="publisher" name="publisher" value="${productToEdit.publisher}">

                <label for="author">Tác giả:</label>
                <input type="text" id="author" name="author" value="${productToEdit.author}">

                <label for="form">Hình thức:</label>
                <input type="text" id="form" name="form" value="${productToEdit.form}">

                <label for="description">Mô tả sản phẩm:</label>
                <textarea id="description" name="description" oninput="adjustHeight(this)">${productToEdit.description}</textarea>
                
                <label for="product-image">Thay đổi hình ảnh:</label>
                <input type="file" id="product-image" name="product-image" accept="image/*" onchange="previewImage(event)">
                <img id="image-preview" src="${productToEdit.image}" style="display: block; max-width: 200px; margin: 10px 0;">

                <div class="btn-edit-form">
                    <button type="button" onclick="goBack()">Quay lại</button>
                    <button type="button" onclick="saveEditedProduct(${productToEdit.productID})">Lưu thay đổi</button>
                </div>
            </form>
        </div>
    `;

    
    document.getElementById('category-container').appendChild(genreSelect);

    genreSelect.value = productToEdit.category;
}

function saveEditedProduct(productID) {
    const products = getProducts();
    const productIndex = products.findIndex(product => product.productID === productID);

    if (productIndex === -1) {
        alert("Không tìm thấy sản phẩm để sửa!");
        return;
    }

    const imageInput = document.getElementById('product-image');
    const image = imageInput.files[0];

    const updateProduct = () => {
        products[productIndex] = {
            productID: productID,
            productName: document.getElementById('product-name').value,
            oldPrice: document.getElementById('old-price').value,
            newPrice: document.getElementById('new-price').value,
            category: document.getElementById('category').value,
            supplier: document.getElementById('supplier').value,
            publisher: document.getElementById('publisher').value,
            author: document.getElementById('author').value,
            form: document.getElementById('form').value,
            description: document.getElementById('description').value,
            image: image ? currentImage : products[productIndex].image
        };

        saveProducts(products);
        renderProducts();
        goBack();
        alert("Đã cập nhật sản phẩm thành công!");
    };

    let currentImage = products[productIndex].image;

    if (image) {
        convertToBase64(image, function(base64Image) {
            currentImage = base64Image;
            updateProduct();
        });
    } else {
        updateProduct();
    }
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

// Begin search danh sách sản phẩm tại admin.html
function searchProduct() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const name = document.getElementById("searchproductname").value.toLowerCase().trim();
    const category = document.getElementById("searchproductcategory").value.toLowerCase().trim();
    
    let filteredProducts = products;
  
    // Lọc theo tên sản phẩm nếu có nhập tên
    if (name) {
      filteredProducts = filteredProducts.filter(product =>
        product.productName.toLowerCase().includes(name)
      );
    }
  
    // Lọc theo thể loại nếu có chọn thể loại
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category
      );
    }
  
    // Hiển thị kết quả
    renderSearchResults(filteredProducts);
  }
  
  // Hiển thị kết quả tìm kiếm trong bảng
  function renderSearchResults(filteredProducts) {
    const tableBody = document.querySelector("#product-table tbody");
    tableBody.innerHTML = ""; // Xóa nội dung cũ
    
    if (filteredProducts.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>Không tìm thấy sản phẩm nào!</td></tr>";
      return;
    }
  
    filteredProducts.forEach(product => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.productID}</td>
        <td><img src="${product.image || "./src/img/default.jpg"}" alt="Image" style="width: 50px; height: 50px;"></td>
        <td>${product.productName}</td>
        <td>${product.category}</td>
        <td>${product.author}</td>
        <td>${formatCurrency(product.newPrice)} đ</td>
        <td>
          <button class="delete-btn" onclick="deleteProduct(${product.productID})">Xóa</button>
          <button class="edit-btn" onclick="editProduct(${product.productID})">Sửa</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } // End search

//Start thống kê
function showThongKe() {
    
    const thongKeSection = document.getElementById('thongke');
    const productManageSection = document.querySelector('.product-manage');
    const searchContainer = document.querySelector('.search-container');
    document.getElementById("pageadmin").style.display='none';

    thongKeSection.style.display = 'block';
    productManageSection.style.display = 'none';
    searchContainer.style.display = 'none';
}
//End thống kê

// Khi trang tải, đảm bảo currentId được khởi tạo và hiển thị danh sách sản phẩm
document.addEventListener("DOMContentLoaded", () => {
    normalizeProductData();
    initializeCurrentId();
    renderProducts();
});

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
// Đăng nhập cho admin
// Kiểm tra URL và hiển thị form đăng nhập nếu cần


