

function addToCart(productIDadd) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        return;
    }

    const cartKey = `cart_${loggedInUser.username}`; // Tạo key riêng cho từng tài khoản
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let product = null;

    // Tìm sản phẩm với vòng lặp
    for (let i = 0; i < products.length; i++) {
        if (products[i].productID === productIDadd) {
            product = products[i];
            break;
        }
    }

    if (!product) {
        alert("Sản phẩm không tồn tại!");
        return;
    }

    let cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];
    let productExists = false;

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID === productIDadd) {
            cartArray[i].quantity += 1;
            productExists = true;
            break;
        }
    }

    // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
    if (!productExists) {
        product.quantity = 1;
        cartArray.push(product);
    }

    localStorage.setItem(cartKey, JSON.stringify(cartArray));
    alert("Thêm vào giỏ hàng thành công!");

    cartList();
}

// function checkCart() {
//     const cart= document.getElementsByClassName('cart-container')[0];
//     const cartEmpty= document.getElementsByClassName('cart-empty')[0];
//     const cartArray= JSON.parse(localStorage.getItem('cart'));
//     if(!cartArray || cartArray.length === 0){
//         cart.style.display='none';
//         cartEmpty.style.display='block';
//     }
//     else{
//         console.log(cartArray[0]);
//         cart.style.display='block';
//         cartEmpty.style.display='none';
//     }
// }

function checkCart() {
    const cart = document.getElementsByClassName('cart-container')[0];
    const cartEmpty = document.getElementsByClassName('cart-empty')[0];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        cart.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (cartArray.length === 0) {
        cart.style.display = 'none';
        cartEmpty.style.display = 'block';
    } else {
        cart.style.display = 'block';
        cartEmpty.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    cartList();
});

function cartList() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // if (!loggedInUser) {
    //     alert("Bạn cần đăng nhập để xem giỏ hàng!");
    //     return;
    // }

    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartTable = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cartTable.innerHTML = '';

    // Duyệt từng sản phẩm trong giỏ hàng và thêm vào bảng
    for (let i = 0; i < cartArray.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cartArray[i].productName}</td>
            <td><img src="${cartArray[i].image || './src/img/default.jpg'}" alt="Image" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn--decrease qty" onclick="decreaseQuantity(${cartArray[i].productID})">-</button>
                <input type="number" id="quantity" readonly value="${cartArray[i].quantity}">
                <button class="btn--increase qty" onclick="increaseQuantity(${cartArray[i].productID})">+</button>
            </td>
            <td>${formatCurrency(Number(cartArray[i].newPrice) * Number(cartArray[i].quantity))} đ</td>
            <td><button class="delete-btn" onclick="deleteCart(${i})">Xóa</button></td>
        `;
        cartTable.appendChild(row);
        total += Number(cartArray[i].newPrice) * Number(cartArray[i].quantity);
    }

    totalPrice.innerHTML = `${formatCurrency(total)} đ`;
}

function decreaseQuantity(id) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID === id) {
            if (cartArray[i].quantity > 1) {
                cartArray[i].quantity -= 1;
            }
            break;
        }
    }

    localStorage.setItem(cartKey, JSON.stringify(cartArray));
    cartList();
}


function increaseQuantity(id) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID === id) {
            cartArray[i].quantity += 1;
            break;
        }
    }

    localStorage.setItem(cartKey, JSON.stringify(cartArray));
    cartList();
}

function deleteCart(index) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Xóa sản phẩm theo chỉ mục
    for (let i = 0; i < cartArray.length; i++) {
        if (i === index) {
            cartArray.splice(i, 1);
            break;
        }
    }

    localStorage.setItem(cartKey, JSON.stringify(cartArray));
    cartList();
}

function showBill() {
    console.log("showBill function called");

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    // if (!loggedInUser) {
    //     alert("Bạn cần đăng nhập để xem hóa đơn!");
    //     window.location.href = "index.html"; // Quay về trang chủ
    //     return;
    // }

    const billArray = JSON.parse(localStorage.getItem('bill')) || [];
    // if (billArray.length === 0) {
    //     alert("Không có hóa đơn nào!");
    //     return;
    // }

    // Lấy bảng hiển thị hóa đơn
    const billTable = document.getElementById('bill-items');
    if (!billTable) {
        console.error("Không tìm thấy bảng hiển thị hóa đơn");
        return;
    }

    // Xóa nội dung cũ của bảng
    billTable.innerHTML = '';

    let hasBills = false; // Biến kiểm tra tài khoản có hóa đơn hay không

    // Duyệt qua danh sách hóa đơn
    for (let i = 0; i < billArray.length; i++) {
        if (billArray[i].customer.username === loggedInUser.username) {
            hasBills = true; // Xác nhận có hóa đơn cho tài khoản hiện tại

            // Tạo hàng hóa đơn mới
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${billArray[i].info}</td>
                <td>${billArray[i].totalprice} đ</td>
                <td>${billArray[i].customer.username}</td>
                <td>${billArray[i].date}</td>
                <td class="status">${billArray[i].status}</td>
                <td><button class="btn--cancel" onclick="cancelOrder(${billArray[i].id})">Hủy đơn hàng</button></td>
                <td id="restore"><button class="btn--restore" onclick="restoreOrder(${billArray[i].id})">Khôi phục đơn hàng</button></td>
            `;
            billTable.appendChild(row);
        }
    }
}

function init() {
    cartList();
    checkCart();
    showBill();
}
function cancelOrder(id) {
    const billArray = JSON.parse(localStorage.getItem('bill')) || [];
    const currentStatus = billArray.find(bill => bill.id === id).status;
    if (currentStatus === 'Hủy') {
        alert("Đơn hàng đã bị hủy rồi!");
        return;
    }
    const confirmCancel = confirm("Bạn có chắc chắn muốn hủy đơn hàng không?");
    if (!confirmCancel) {
        return; // Dừng lại nếu người dùng chọn "Không"
    }
    for (let i = 0; i < billArray.length; i++) {
        if (billArray[i].id === id) {
            billArray[i].status = 'Hủy';
            break;
        }
    }
    localStorage.setItem('bill', JSON.stringify(billArray));
    showBill();
}
function restoreOrder(id) {
    const billArray = JSON.parse(localStorage.getItem('bill')) || [];
    const currentStatus = billArray.find(bill => bill.id === id).status;
    if (currentStatus !== 'Hủy') {
        alert("Đơn hàng chưa bị hủy, không thể khôi phục!");
        return;
    }
    const confirmRestore = confirm("Bạn có chắc chắn muốn khôi phục đơn hàng không?");
    if (!confirmRestore) {
        return; // Dừng lại nếu người dùng chọn "Không"
    }
    for (let i = 0; i < billArray.length; i++) {
        if (billArray[i].id === id) {
            billArray[i].status = 'Chưa xử lí';
            break;
        }
    }
    localStorage.setItem('bill', JSON.stringify(billArray));
    showBill();
}
