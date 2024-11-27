
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
  /* */  const currentId = JSON.parse(localStorage.getItem('currentId')) || 10000; // Lấy currentId từ localStorage
    // const productID = 10000 + products.length;
    // product.productID = productID;
   /* */ product.productID = currentId + 1;

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    /* */ localStorage.setItem('currentId', JSON.stringify(product.productID));

    alert("Đã thêm sản phẩm!");
    addProductToUI(product);
    
}

function renderProductDetails(product,productID) {
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

// function attachProductEventListeners(products) {
//     const contentDiv = document.getElementById('content');
//     const productItems = contentDiv.querySelectorAll('.item');

//     productItems.forEach((item) => {
//         // Lấy ID sản phẩm từ thuộc tính data-id gắn vào mỗi item
//         const productId = item.getAttribute('data-id');
//         item.addEventListener('click', () => {
//             const product = products.find(p => p.productID == productId); // Tìm sản phẩm theo productID
//             renderProductDetails(product);
//         });
//     });
// }

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
let products = JSON.parse(localStorage.getItem('products')) || [];
    const contentDiv = document.getElementById('content');
    var count=0,sotrang=1;
    var i=0;
    var sotrang=0;
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
            productNewPrice.innerHTML = `<div>${products[i].newPrice}đ</div>`;
            priceRow.appendChild(productNewPrice);

            const productPricePercent = document.createElement('div');
            productPricePercent.classList.add('price-percent');
            productPricePercent.innerHTML = `<div>-${Math.floor(100-(products[i].newPrice/products[i].oldPrice*100))}%</div>`;
            priceRow.appendChild(productPricePercent);
            priceLabel.appendChild(priceRow);
            // Giá cũ
            const productOldPrice = document.createElement('div');
            productOldPrice.classList.add('old-price');
            productOldPrice.innerHTML = `<div>${products[i].oldPrice}đ</div>`;
            priceLabel.appendChild(productOldPrice);
            productItem.appendChild(priceLabel);
            // Thêm sản phẩm mới vào danh sách
            contentDiv.appendChild(productItem);
            count++;
            if(count==15)
                break;
        }
        sotrang = Math.ceil(products.length/15);
        const page=document.getElementById('page');
        var lienket = '';
        if (!page) {
            console.error('Element with ID "page" not found');
        } else {
            for (let i = 0; i < sotrang; i++) {
                const vitri = i * 15;
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
