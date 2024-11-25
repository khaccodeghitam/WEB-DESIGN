
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
    // Ẩn phần quản lý sản phẩm và tìm kiếm
    document.querySelector('.product-manage').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';

    //form thêm sản phẩm
    const editFormContainer = document.getElementById("edit-form-container");
    editFormContainer.style.display = 'block';
    
    editFormContainer.innerHTML = `
        <div class="form-container">
            <h3>Thêm sản phẩm mới</h3>
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

                <label for="description">Mô tả sản phẩm:</label>
                <textarea id="description" name="description" oninput="adjustHeight(this)"></textarea>
                
                <label for="product-image">Thêm hình ảnh:</label>
                <input type="file" id="product-image" name="product-image" accept="image/*" onchange="previewImage(event)">

                <div class="btn-edit-form">
                    <button type="button" onclick="goBack()">Quay lại</button>
                    <button type="button" onclick="submitEditForm()">Thêm</button>
                </div>
            </form>
        </div>
    `;
    return false;
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

function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result); // Đây là chuỗi base64
    };
    reader.readAsDataURL(file);
}


function submitEditForm() {
    const productName = document.getElementById('product-name').value;
    const oldPrice = document.getElementById('old-price').value;
    const newPrice = document.getElementById('new-price').value;
    const bookType = document.getElementById('book-type').value;
    const category = document.getElementById('category').value;
    const supplier = document.getElementById('supplier').value;
    const publisher = document.getElementById('publisher').value;
    const author = document.getElementById('author').value;
    const form = document.getElementById('form').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('product-image').files[0];

    if (productName && oldPrice && newPrice && bookType && category && supplier && publisher && author && form && description) {
        if (image) {
            convertToBase64(image, function (base64Image) {
                saveProduct({
                    productName,
                    oldPrice,
                    newPrice,
                    bookType,
                    category,
                    supplier,
                    publisher,
                    author,
                    form,
                    description,
                    image: base64Image, // Lưu ảnh dưới dạng base64
                });
            });
        } else {
            saveProduct({
                productName,
                oldPrice,
                newPrice,
                bookType,
                category,
                supplier,
                publisher,
                author,
                form,
                description,
                image: './src/img/default.jpg',
            });
        }
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productID = 10000 + products.length; // Tự động tạo ID sản phẩm dựa trên số lượng hiện có
    product.productID = productID;
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert("Đã thêm sản phẩm!");
    addProductToUI(product);
    
}

function renderProductDetails(product, productID) {
    // Điền vào các trường thông tin
    document.querySelector('#mid .book-title').textContent = product.productName;
    document.querySelector('#mid #old-price').textContent = `${product.oldPrice} đ`;
    document.querySelector('#mid #product-price').textContent = `${product.newPrice} đ`;

    // Điền supplier và publisher
    const bookInfo1 = document.querySelector('#mid .book-info1');
    bookInfo1.querySelector('.book-supplier span:last-child').textContent = product.supplier;
    bookInfo1.querySelector('.book-author span:last-child').textContent = product.publisher;

    // Điền author và form
    const bookInfo2 = document.querySelector('#mid .book-info2');
    bookInfo2.querySelector('.book-supplier span:last-child').textContent = product.author;
    bookInfo2.querySelector('.book-author span:last-child').textContent = product.form;

    // Điền mã hàng và thông tin chi tiết
    document.querySelector('#mid .data_0 .data-container').textContent = productID;
    document.querySelector('#mid .data_1 .data-container').textContent = product.supplier;
    document.querySelector('#mid .data_2 .data-container').textContent = product.author;
    document.querySelector('#mid .data_3 .data-container').textContent = product.publisher;
    document.querySelector('#mid .data_5 .data-container').textContent = product.form;

    // Điền mô tả
    document.querySelector('#mid #description-content p').textContent = product.description;

    // Cập nhật hình ảnh
    const imgSlides = document.querySelector('#mid .img-slides');
    imgSlides.innerHTML = ""; // Xóa các ảnh cũ
    const slide = document.createElement('div');
    slide.classList.add('slide-product');
    slide.innerHTML = `<img src="${product.image}" alt="Ảnh sản phẩm" width="100%" onclick="openFullScreen(this)">`;
    imgSlides.appendChild(slide);

    // Hiển thị thẻ `mid`
    const productDetails = document.getElementById('product-details')
    const mid = document.getElementById('mid');
    mid.style.display = 'flex';
    productDetails.style.display='flex';
    // mid.style.zIndex = '1000';
    document.body.classList.add('modal-open');
}

function attachProductEventListeners(products) {
    const contentDiv = document.getElementById('content');
    const productItems = contentDiv.querySelectorAll('.item');

    productItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const product = products[index];
            renderProductDetails(product, product.productID);
        });
    });
}

function closeProductDetails() {
    const mid = document.getElementById('mid');
    const productDetails = document.getElementById("product-details")
    mid.style.display = 'none';
    productDetails.style.display='none';
    document.body.classList.remove('modal-open');
}

function addProductToUI(product) {
    const contentDiv = document.getElementById('content');
    const productItems = contentDiv.querySelectorAll('.item');

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



window.onload = function () {
   // Logic của bạn từ window.onload trong middle.js
   let products = JSON.parse(localStorage.getItem('products')) || [];
   const contentDiv = document.getElementById('content');
   //add sth

   //add sth
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
       productPricePercent.textContent = `-${Math.floor(100-(product.newPrice/product.oldPrice*100))}%`;
       productItem.appendChild(productPricePercent);

       contentDiv.appendChild(productItem);
   });
   attachProductEventListeners(products);
};