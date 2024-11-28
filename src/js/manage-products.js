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
            <td>${product.newPrice} VND</td>
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

               <label for="book-type">Loại sách:</label>
                <select id="book-type" name="book-type">
                    <option value="" disabled ${!productToEdit.bookType ? 'selected' : ''}>Chọn Loại Sách</option>
                    <option value="Văn Học" ${productToEdit.bookType === 'Văn Học' ? 'selected' : ''}>Văn Học</option>
                    <option value="Kinh Tế" ${productToEdit.bookType === 'Kinh Tế' ? 'selected' : ''}>Kinh Tế</option>
                    <option value="Sách giáo khoa" ${productToEdit.bookType === 'Sách giáo khoa' ? 'selected' : ''}>Sách giáo khoa</option>
                    <option value="Tâm Lý - Kỹ Năng Sống" ${productToEdit.bookType === 'Tâm Lý - Kỹ Năng Sống' ? 'selected' : ''}>Tâm Lý - Kỹ Năng Sống</option>
                    <option value="Truyện Tranh" ${productToEdit.bookType === 'Truyện Tranh' ? 'selected' : ''}>Truyện Tranh</option>
                </select>

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
    const { bookTypeSelect, genreSelect } = createBookTypeAndGenreSelects();
    
    document.getElementById('book-type-container').appendChild(bookTypeSelect);
    document.getElementById('category-container').appendChild(genreSelect);

    // Set the existing book type and category
    bookTypeSelect.value = productToEdit.bookType;
    updateGenreOptions(bookTypeSelect, genreSelect);
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
            bookType: document.getElementById('book-type').value,
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

// Khi trang tải, đảm bảo currentId được khởi tạo và hiển thị danh sách sản phẩm
document.addEventListener("DOMContentLoaded", () => {
    normalizeProductData();
    initializeCurrentId();
    renderProducts();
});

{/* <input type="text" id="book-type" name="book-type" value="${productToEdit.bookType}"></input> */}