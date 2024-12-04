function check() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thanh toán!");
        window.location.href = "index.html"; // Quay về trang chủ
        return;
    }

    // Lấy key giỏ hàng của tài khoản hiện tại
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Kiểm tra nếu giỏ hàng trống
    if (cartArray.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán!");
        window.location.href = "index.html"; // Quay về trang chủ
        return;
    }

    // Điền thông tin người dùng vào trang thanh toán
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var city = document.getElementById("city");
    var district = document.getElementById("district");
    var ward = document.getElementById("ward");
    var address = document.getElementById("address");

    name.value = `${loggedInUser.info.ho} ${loggedInUser.info.ten}` || "";
    email.value = loggedInUser.email || "";
    phone.value = loggedInUser.phone || "";
    city.value = loggedInUser.address?.city || "";
    district.value = loggedInUser.address?.district || "";
    ward.value = loggedInUser.address?.ward || "";
    address.value = loggedInUser.address?.address || "";

    // Hiển thị thông tin sản phẩm trong giỏ hàng
    const product = document.getElementsByClassName('order-summary')[0];
    const paidPrice = document.getElementsByClassName('paid-price')[0];
    let info = '';
    let total = 0;

    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i]?.productName) {  
            info += `${cartArray[i].productName} x ${cartArray[i].quantity || 0}; `;
            total += Number(cartArray[i].newPrice || 0) * Number(cartArray[i].quantity || 0);
        }
    }

    const listProducts = document.createElement('div');
    listProducts.innerHTML = `${info}`;
    product.appendChild(listProducts);

    paidPrice.innerHTML = `${total} Đ`;
}

function paymentMethod(){
    const paymentMethod = document.getElementById("payment-method").value;
    if(paymentMethod === "Tiền mặt khi nhận hàng"){
        document.getElementById("credit").style.display = "none";
        document.getElementById("bank").style.display = "none";
    }
    else if(paymentMethod === "Thẻ tín dụng"){
        document.getElementById("credit").style.display = "block";
        document.getElementById("bank").style.display = "none";
    } else {
        document.getElementById("credit").style.display = "none";
        document.getElementById("bank").style.display = "block";
    }
}
function buy() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thanh toán!");
        window.location.href = "index.html"; // Quay về trang chủ
        return;
    }

    // Lấy key giỏ hàng
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Kiểm tra giỏ hàng
    if (cartArray.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán!");
        window.location.href = "index.html"; // Quay về trang chủ
        return;
    }

    // Xử lý thông tin hóa đơn
    const city = document.getElementById("city").value;
    const district = document.getElementById("district").value;
    const ward = document.getElementById("ward").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    if (!name || !email || !phone || !city || !district || !ward || !address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    let info = '';
    let total = 0;

    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i]?.productName) {  
            info += `${cartArray[i].productName} x ${cartArray[i].quantity || 0}; `;
            total += Number(cartArray[i].newPrice || 0) * Number(cartArray[i].quantity || 0);
        }
    }

    const customer = loggedInUser;
    const date = new Date();
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let billArray = JSON.parse(localStorage.getItem('bill')) || [];

    const bill = {
        id: billArray.length + 100,
        info,
        totalprice: total,
        customer,
        name,
        email,
        city,
        district,
        ward,
        address,
        phone,
        date: d,
        status: 'Chưa xử lí',
    };

    billArray.unshift(bill);
    localStorage.setItem('bill', JSON.stringify(billArray));

     // THÊM ĐOẠN MÃ CẬP NHẬT THỐNG KÊ SẢN PHẨM
     let productStats = JSON.parse(localStorage.getItem('productStats')) || [];

     for (let i = 0; i < cartArray.length; i++) {
         const product = cartArray[i];
         if (product?.productName) {
             const statIndex = productStats.findIndex(stat => stat.productID === product.productID);
             
             if (statIndex !== -1) {
                 productStats[statIndex].quantitySold += product.quantity;
                 productStats[statIndex].totalRevenue += Number(product.newPrice) * Number(product.quantity);
             }
         }
     }
 
     localStorage.setItem('productStats', JSON.stringify(productStats));
     //Kết thúc thống kê
    // Xóa giỏ hàng sau khi thanh toán
    localStorage.removeItem(cartKey);

    alert("Thanh toán thành công!");
    window.location.href = "giohang.html"; // Chuyển hướng sau thanh toán
}
