
let slider = document.querySelector('.slideshow .slide-container');
let items = document.querySelectorAll('.slideshow .slide-container .slide');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slideshow .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slideshow .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


function showEditForm() {
    // Ẩn phần quản lý sản phẩm và tìm kiếm
    document.querySelector('.product-manage').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.getElementById("pageadmin").style.display='none';
    document.getElementById('thongke').style.display='none';
    document.getElementById('bill-admin-management').style.display='none';
    document.querySelector('.dashboard').style.display='none';
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

            <label for="category">Thể Loại:</label>
            <select id="category" name="category">
            <option value="" disabled selected>Chọn Thể Loại</option>

                    <option value="Tiểu thuyết">Tiểu thuyết</option>
                    <option value="Truyện ngắn">Truyện ngắn</option>
                    <option value="Ngôn tình">Ngôn tình</option>
               
               
                    <option value="Bài học kinh doanh">Bài học kinh doanh</option>
                    <option value="Quản trị - Lãnh đạo">Quản trị - Lãnh đạo</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Phân tích kinh tế">Phân tích kinh tế</option>
                
                
                    <option value="Sách giáo khoa">Sách giáo khoa</option>
                    <option value="Sách luyện thi THPTQG">Sách luyện thi THPTQG</option>
                    <option value="Sách mẫu giáo">Sách mẫu giáo</option>
                
                
                    <option value="Kỹ năng sống">Kỹ năng sống</option>
                    <option value="Rèn luyện nhân cách">Rèn luyện nhân cách</option>
                    <option value="Tâm lý">Tâm lý</option>
                    <option value="Sách cho tuổi mới lớn">Sách cho tuổi mới lớn</option>
                
                
                    <option value="Manga (Nhật Bản)">Manga (Nhật Bản)</option>
                    <option value="Manhwa (Hàn Quốc)">Manhwa (Hàn Quốc)</option>
                    <option value="Manhua (Trung Quốc)">Manhua (Trung Quốc)</option>
                    <option value="Comic (Phương Tây)">Comic (Phương Tây)</option>
                    <option value="Truyện tranh thiếu nhi">Truyện tranh thiếu nhi</option>
                
            </select>


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
                <img id="image-preview" style="display: none; max-width: 200px; margin-top: 10px;">
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
    
    const category = document.getElementById('category').value;
    const supplier = document.getElementById('supplier').value;
    const publisher = document.getElementById('publisher').value;
    const author = document.getElementById('author').value;
    const form = document.getElementById('form').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('product-image').files[0];

    if (productName && oldPrice && newPrice && category && supplier && publisher && author && form && description) {
        if (image) {
            convertToBase64(image, function (base64Image) {
                saveProduct({
                    productName,
                    oldPrice,
                    newPrice,
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

function resetEditForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('old-price').value = '';
    document.getElementById('new-price').value = '';
    document.getElementById('category').selectedIndex = 0;
    document.getElementById('supplier').value = '';
    document.getElementById('publisher').value = '';
    document.getElementById('author').value = '';
    document.getElementById('form').value = '';
    // document.getElementById('description').value = '';

    const descriptionTextarea = document.getElementById('description');
    descriptionTextarea.value = '';
    descriptionTextarea.style.height = 'auto';
    
    // Reset image preview
    const imageInput = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    imageInput.value = ''; // Clear file input
    imagePreview.src = '';
    imagePreview.style.display = 'none';
}

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
  /* */  const currentId = JSON.parse(localStorage.getItem('currentId')) || 10000; // Lấy currentId từ localStorage
    // const productID = 10000 + products.length;
    // product.productID = productID;
   /* */ product.productID = currentId + 1;

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('currentId', JSON.stringify(product.productID));


    updateProductStatistics(product);
    alert("Đã thêm sản phẩm!");
    resetEditForm();
    addProductToUI(product);
    
}

function renderProductDetails(product,productID) {
    document.querySelector('#mid .but button.btn--addcart').setAttribute('onClick', 'addToCart('+productID+')');

    // Điền vào các trường thông tin
    document.querySelector('#mid .book-title').textContent = product.productName;
    document.querySelector('#mid #old-price').textContent = `${formatCurrency(product.oldPrice)} đ`;
    document.querySelector('#mid #product-price').textContent = `${formatCurrency(product.newPrice)} đ`;

    // Điền supplier và publisher
    const bookInfo1 = document.querySelector('#mid .book-info1');
    bookInfo1.querySelector('.book-supplier span:last-child').textContent = product.supplier;
    bookInfo1.querySelector('.book-author span:last-child').textContent = product.publisher;
    
    // Điền author và form
    const bookInfo2 = document.querySelector('#mid .book-info2');
    bookInfo2.querySelector('.book-supplier span:last-child').textContent = product.author;
    bookInfo2.querySelector('.book-author span:last-child').textContent = product.form;

    const bookCategory = document.querySelector('#mid .book-category span:last-child');
    if (bookCategory) {
        bookCategory.textContent = product.category;
    }

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

    const url = window.location.href;
    const temp = url.split("?");
    const startIndex = temp[1] && temp[1].includes('&') ? parseInt(temp[1].split('&')[1]) : 0;

    productItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // const product = products[index];
            // renderProductDetails(product, product.productID);

            const actualProductIndex = startIndex + index;
            const product = products[actualProductIndex];
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
    productNewPrice.innerHTML = `<span>${formatCurrency(product.newPrice)}</span>`;
    productItem.appendChild(productNewPrice);

    // Giá cũ
    const productOldPrice = document.createElement('p');
    productOldPrice.classList.add('old-price');
    productOldPrice.innerHTML = `<span>${formatCurrency(product.oldPrice)}</span>`;
    productItem.appendChild(productOldPrice);

    // Thêm sản phẩm mới vào danh sách
    contentDiv.appendChild(productItem);
}

//begin search
const searchInput = document.getElementById('search-input');
const searchInput2 = document.getElementById('search-input2'); 
const priceRangeSelect = document.getElementById('priceRange');
const categorySelect = document.getElementById('category-select');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const contentDiv = document.getElementById('content');


function displayProducts(products, currentPage = 1, itemsPerPage = 15) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    contentDiv.innerHTML = ""; // Xóa sản phẩm hiện tại
    paginatedProducts.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("item");

        // Ảnh sản phẩm
        const productImage = document.createElement("img");
        productImage.src = product.image || './src/img/default.jpg'; // Nếu không có ảnh thì dùng ảnh mặc định
        productItem.appendChild(productImage);

        // Tên sản phẩm
        const productName = document.createElement("h2");
        productName.classList.add("product-name");
        productName.innerHTML = `<div>${product.productName}</div>`;
        productItem.appendChild(productName);

        // Phần giá
        const priceLabel = document.createElement("div");
        priceLabel.classList.add("price-label");

        const priceRow = document.createElement("div");
        priceRow.classList.add("price-row");

        // Giá mới
        const productNewPrice = document.createElement("div");
        productNewPrice.classList.add("new-price");
        productNewPrice.innerHTML = `<div>${formatCurrency(product.newPrice)} đ</div>`;
        priceRow.appendChild(productNewPrice);

        // Tính phần trăm giảm giá
        const productPricePercent = document.createElement("div");
        productPricePercent.classList.add("price-percent");
        const discountPercent = Math.floor(100 - (product.newPrice / product.oldPrice) * 100); // Tính phần trăm giảm giá
        productPricePercent.innerHTML = `<div>-${discountPercent}%</div>`;
        priceRow.appendChild(productPricePercent);

        priceLabel.appendChild(priceRow);

        // Giá cũ
        const productOldPrice = document.createElement("div");
        productOldPrice.classList.add("old-price");
        productOldPrice.innerHTML = `<div>${formatCurrency(product.oldPrice)} đ</div>`;
        priceLabel.appendChild(productOldPrice);

        productItem.appendChild(priceLabel);

        // Thêm phần tử sản phẩm vào div chứa nội dung
        contentDiv.appendChild(productItem);
    });

    attachProductEventListeners(products); // Gắn lại sự kiện click

    // Hiển thị các nút phân trang
    const totalPages = Math.ceil(products.length / itemsPerPage);
    displayPagination(totalPages, currentPage, products);
}

function displayPagination(totalPages, currentPage, products) {
    const pageDiv = document.getElementById("page");
    pageDiv.innerHTML = ""; // Xóa nút phân trang cũ

    // Ẩn nút phân trang nếu chỉ có 1 trang
    if (totalPages <= 1) {
        pageDiv.style.display = "none";
        return;
    }
    pageDiv.style.display = "flex"; // Hiển thị nếu có nhiều hơn 1 trang

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-button");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => displayProducts(products, i));
        pageDiv.appendChild(pageButton);
    }
}


// Lắng nghe sự kiện
searchInput.addEventListener("input", () => filterAndPaginate());
searchInput2.addEventListener("input", () => filterAndPaginate());
categorySelect.addEventListener("change", () => filterAndPaginate());
priceRangeSelect.addEventListener("change", () => filterAndPaginate());
minPriceInput.addEventListener("input", () => filterAndPaginate());
maxPriceInput.addEventListener("input", () => filterAndPaginate());

function filterAndPaginate() {
    const searchValue = searchInput.value.toLowerCase();
    const searchValue2 = searchInput2.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const selectedPriceRange = priceRangeSelect.value;

    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Number.MAX_VALUE;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const filteredProducts = products.filter(product => {
        const matchesName = product.productName.toLowerCase().includes(searchValue);
        const matchesName2 = product.productName.toLowerCase().includes(searchValue2);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        const productPrice = product.newPrice;
        let matchesPrice = true;

        if (selectedPriceRange !== 'all') {
            switch (selectedPriceRange) {
                case 'low':
                    matchesPrice = productPrice < 50000;
                    break;
                case '50-150':
                    matchesPrice = productPrice >= 50000 && productPrice <= 150000;
                    break;
                case '150-250':
                    matchesPrice = productPrice >= 150000 && productPrice <= 250000;
                    break;
                case 'high':
                    matchesPrice = productPrice > 250000;
                    break;
                default:
                    matchesPrice = true;
            }
        }

        const matchesCustomPriceRange = productPrice >= minPrice && productPrice <= maxPrice;

        return matchesName & matchesName2 && matchesCategory && matchesPrice && matchesCustomPriceRange;
    });

    // Hiển thị sản phẩm với phân trang
    displayProducts(filteredProducts, 1);
}

//end search

function goBack() {
    location.reload(); // Tải lại trang để quay về giao diện ban đầu
}



// window.onload = function () {
    function showProducts() {
let products = JSON.parse(localStorage.getItem('products')) || [];
    const contentDiv = document.getElementById('content');
    var count=0,sotrang=1;
    var i=0;
    var sotrang=0;
    var maxitem=15;
    var url=window.location.href;
    var temp=url.split("?");
    if(temp[1]=='' || temp[1]==undefined || temp[1].search('all')==0){
		if(temp[1]=='' || temp[1]==undefined){
			temp = 'all&0';
		}
		else{
			temp = temp[1];
		}
        var temp2 = temp.split("&");
		var vitri = temp2[1];   
        for(i=vitri; i<products.length; i++){
            // Tạo một thẻ item mới
            const productItem = document.createElement('div');
            productItem.classList.add('item');

            // Hình ảnh sản phẩm
            const productImage = document.createElement('img');
            productImage.src = products[i].image;
            productItem.appendChild(productImage);

            // Tên sản phẩm
            const productName = document.createElement('h2');
            productName.classList.add('product-name');
            productName.innerHTML = `<div>${products[i].productName}</div>`;
            productItem.appendChild(productName);

            const priceLabel = document.createElement('div');
            priceLabel.classList.add('price-label');

            const priceRow = document.createElement('div');
            priceRow.classList.add('price-row');
            // Giá mới
            const productNewPrice = document.createElement('div');
            productNewPrice.classList.add('new-price');
            productNewPrice.innerHTML = `<div>${formatCurrency(products[i].newPrice)}đ</div>`;
            priceRow.appendChild(productNewPrice);

            const productPricePercent = document.createElement('div');
            productPricePercent.classList.add('price-percent');
            productPricePercent.innerHTML = `<div>-${Math.floor(100-(products[i].newPrice/products[i].oldPrice*100))}%</div>`;
            priceRow.appendChild(productPricePercent);
            priceLabel.appendChild(priceRow);
            // Giá cũ
            const productOldPrice = document.createElement('div');
            productOldPrice.classList.add('old-price');
            productOldPrice.innerHTML = `<div>${formatCurrency(products[i].oldPrice)}đ</div>`;
            priceLabel.appendChild(productOldPrice);
            productItem.appendChild(priceLabel);
            // Thêm sản phẩm mới vào danh sách
            contentDiv.appendChild(productItem);
            count++;
            if(count==maxitem)
                break;
        }
        sotrang = Math.ceil(products.length/maxitem);
        const page=document.getElementById('page');
        if(sotrang==1){
            page.style.display='none';
        }
        var lienket = '';
        if (!page) {
            console.error('Element with ID "page" not found');
        } else {
            for (let i = 0; i < sotrang; i++) {
                const vitri = i * maxitem;
                lienket = document.createElement('button');
                lienket.textContent = i + 1;
                lienket.addEventListener('click', function() {
                    window.location.href = `index.html?all&${vitri}`;
                });
                page.appendChild(lienket);
                console.log(`Button ${i + 1} added`); // Debugging log
            }
        }
};
   attachProductEventListeners(products);
};
function handleCartNow() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");    
        return;
    }
}
function checkLoggedUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.length === 0) {
        alert("Bạn cần đăng nhập để vào giỏ hàng!");
        return;
    }
    else{
        window.location.href = './giohang.html';
    }
}
