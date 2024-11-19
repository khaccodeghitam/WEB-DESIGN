var index = 0;
showSlides();
function showSlides(){
    var i;
    var slides= document.getElementsByClassName("slide");
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    index++;
    if(index > slides.length){
        index = 1;
    }
    slides[index-1].style.display = "block";
    setTimeout(showSlides, 3000);
}

function showEditForm() {
    // window.location.href = './admin.html';
    document.body.innerHTML = `
        <div class="form-container">
            <h3>Quản lý sản phẩm</h3>
            <form id="edit-form">
                <label for="product-name">Tên sản phẩm:</label>
                <input type="text" id="product-name" name="product-name">

                <label for="old-price">Giá cũ:</label>
                <input type="number" id="old-price" name="old-price">

                <label for="new-price">Giá mới:</label>
                <input type="number" id="new-price" name="new-price">

                <label for="book-type">Loại sách:</label>
                <input type="text" id="book-type" name="book-type">

                <label for="category">Thể Loại:</label>
                <input type="text" id="category" name="category">

                <label for="supplier">Nhà cung cấp:</label>
                <input type="text" id="supplier" name="supplier">

                <label for="publisher">Nhà xuất bản:</label>
                <input type="text" id="publisher" name="publisher">

                <label for="author">Tác giả:</label>
                <input type="text" id="author" name="author">

                <label for="form">Hình thức:</label>
                <input type="text" id="form" name="form">

                <label for="product-code">Mã hàng:</label>
                <input type="text" id="product-code" name="product-code">

                <label for="description">Mô tả sản phẩm:</label>
                <textarea type="text" id="description" name="description" oninput="adjustHeight(this)"></textarea>
                
                <label for="product-image">Thêm hình ảnh:</label>
                <input type="file" id="product-image" name="product-image" accept="image/*" onchange="previewImage(event)">

                <div class="btn-edit-form">
                <button type="button" onclick="goBack()">Quay lại</button>
                <button type="button" onclick="submitEditForm()">Thêm</button>
                </div>
            </form>
        </div>
    `;
}

function previewImage(event) {
    const imagePreview = document.getElementById('image-preview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '';
        imagePreview.style.display = 'none';
    }
}
function adjustHeight(textarea) {
    // Tự động điều chỉnh chiều cao textarea
    textarea.style.height = 'auto'; // Đặt chiều cao lại trước để tính toán chính xác
    textarea.style.height = textarea.scrollHeight + 'px'; // Điều chỉnh chiều cao cho phù hợp với nội dung
}
function submitEditForm() {
    // Lấy giá trị từ các trường input
    const productName = document.getElementById('product-name').value;
    const oldPrice = document.getElementById('old-price').value;
    const newPrice = document.getElementById('new-price').value;
    const bookType = document.getElementById('book-type').value;
    const category = document.getElementById('category').value;
    const supplier = document.getElementById('supplier').value;
    const publisher = document.getElementById('publisher').value;
    const author = document.getElementById('author').value;
    const form = document.getElementById('form').value;
    const productCode = document.getElementById('product-code').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('product-image').files[0];

    // Kiểm tra xem tất cả các trường đều có giá trị hay chưa
    if (productName && oldPrice && newPrice && bookType && category && supplier && publisher && author && form && productCode && description) {
        // Tạo đối tượng sản phẩm mới
        const newProduct = {
            productName,
            oldPrice,
            newPrice,
            bookType,
            category,
            supplier,
            publisher,
            author,
            form,
            productCode,
            description,
            image: image ? URL.createObjectURL(image) : './src/img/default.jpg'  // Lưu URL hình ảnh tạm thời
        };

        // Lấy danh sách sản phẩm từ localStorage hoặc khởi tạo mảng trống nếu không có
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Thêm sản phẩm mới vào mảng
        products.push(newProduct);

        // Lưu lại danh sách sản phẩm vào localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Thêm sản phẩm mới vào giao diện
      

        alert("Đã thêm sản phẩm!");
        addProductToUI(newProduct);
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

function addProductToUI(product) {
    const contentDiv = document.getElementById('content');

    // Tạo một thẻ item mới
    const productItem = document.createElement('div');
    productItem.classList.add('item');

    // Hình ảnh sản phẩm
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productItem.appendChild(productImage);

    // Tên sản phẩm
    const productName = document.createElement('h2');
    productName.classList.add('product-name');
    productName.innerHTML = `<div>${product.productName}</div>`;
    productItem.appendChild(productName);

    // Giá mới
    const productNewPrice = document.createElement('p');
    productNewPrice.classList.add('special-price');
    productNewPrice.innerHTML = `<span>${product.newPrice}</span>`;
    productItem.appendChild(productNewPrice);

    // Giá cũ
    const productOldPrice = document.createElement('p');
    productOldPrice.classList.add('old-price');
    productOldPrice.innerHTML = `<span>${product.oldPrice}</span>`;
    productItem.appendChild(productOldPrice);

    // Thêm sản phẩm mới vào danh sách
    contentDiv.appendChild(productItem);
}
 

function goBack() {
    location.reload(); // Tải lại trang để quay về giao diện ban đầu
}
window.onload = function() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const contentDiv = document.getElementById('content');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('item');
        productItem.className = 'item';

        const productImage = document.createElement('img');
        productImage.src = product.image || './src/img/default.jpg';
        productItem.appendChild(productImage);

        const productName = document.createElement('h2');
        productName.textContent = product.productName;
        productItem.appendChild(productName);

        const productNewPrice = document.createElement('div');
        productNewPrice.className = 'new-price';
        productNewPrice.textContent = `${product.newPrice} đ`;
        productItem.appendChild(productNewPrice);

        const productOldPrice = document.createElement('div');
        productOldPrice.className = 'old-price';
        productOldPrice.textContent = `${product.oldPrice} đ`;
        productItem.appendChild(productOldPrice);

        const productPricePercent = document.createElement('div');
        productPricePercent.className = 'price-percent';
        productPricePercent.textContent = `-${(product.newPrice/product.oldPrice*100).toFixed(2)}%`;
        productItem.appendChild(productPricePercent);

        contentDiv.appendChild(productItem);
    });
};
