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

/*function addProductToUI(product) {
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
}*/
 

function goBack() {
    location.reload(); // Tải lại trang để quay về giao diện ban đầu
}
window.onload = function() {
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
            productPricePercent.innerHTML = `<div>-${(products[i].newPrice/products[i].oldPrice*100).toFixed(0)}%</div>`;
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
}
