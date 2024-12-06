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

    paidPrice.innerHTML = `${formatCurrency(total)} đ`;
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
    const confirmPayment = confirm("Bạn có chắc chắn muốn thanh toán không?");
    if (!confirmPayment) {
        return; // Dừng lại nếu người dùng chọn "Không"
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
    const d = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
function renderConfirmation(){
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const product = document.getElementsByClassName('order-list-check')[0];
    product.innerHTML = '';
    const paidPrice = document.getElementsByClassName('total-check')[0];
    product.innerHTML = '';
    let info = '';
    let total = 0;
    const cartKey = `cart_${loggedInUser.username}`;
    const cartArray = JSON.parse(localStorage.getItem(cartKey)) || [];
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i]?.productName) {  
            info += `${cartArray[i].productName} x ${cartArray[i].quantity || 0}; `;
            total += Number(cartArray[i].newPrice || 0) * Number(cartArray[i].quantity || 0);
        }
    }
    const listProducts = document.createElement('div');
    listProducts.innerHTML = `${info}`;
    product.appendChild(listProducts);

    paidPrice.innerHTML = `<strong>Tổng cộng: </strong> ${formatCurrency(total)} đ`;

    var data = [];

    axios(Parameter)
        .then(function (response) {
            data = response.data;
            console.log("Dữ liệu tỉnh thành:", data);

            const city = document.getElementById("city").value;
            const district = document.getElementById("district").value;
            const ward = document.getElementById("ward").value;
            const address = document.getElementById("address").value;
            var cityName = '';
            var districtName = '';
            var wardName = '';
            // Tìm tên tỉnh
            cityName = data.find(p => p.Id === city)?.Name || 'Không xác định';

            // Tìm huyện thuộc tỉnh
            const province = data.find(p => p.Id === city);
            if (province) {
                districtName = province.Districts.find(d => d.Id === district)?.Name || 'Không xác định';

                // Tìm xã thuộc huyện
                const dist = province.Districts.find(d => d.Id === district);
                if (dist) {
                    wardName = dist.Wards.find(w => w.Id === ward)?.Name || 'Không xác định';
                } else {
                    wardName = 'Không xác định';
                }
            } else {
                districtName = 'Không xác định';
                wardName = 'Không xác định';
            }
            const confirmaddress = document.getElementById("confirm-address");
            confirmaddress.innerHTML = '';
            const createconfirmaddress = document.createElement('div');
            createconfirmaddress.innerHTML = `Địa chỉ: ${address}, ${wardName}, ${districtName}, ${cityName}`;
            confirmaddress.appendChild(createconfirmaddress);
            console.log(`City: ${cityName}, District: ${districtName}, Ward: ${wardName}`);
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error);
        });

    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const paymentMethod = document.getElementById("payment-method").value;
    
    const confirmname = document.getElementById("confirm-name");
    confirmname.innerHTML = '';
    const createconfirmname = document.createElement('div');
    createconfirmname.innerHTML = `Tên: ${name}`;
    confirmname.appendChild(createconfirmname);

    const confirmemail = document.getElementById("confirm-email");
    confirmemail.innerHTML = '';
    const createconfirmemail = document.createElement('div');
    createconfirmemail.innerHTML = `Email: ${email}`;
    confirmemail.appendChild(createconfirmemail);

    const confirmphone = document.getElementById("confirm-phone");
    confirmphone.innerHTML = '';
    const createconfirmphone = document.createElement('div');
    createconfirmphone.innerHTML = `SĐT: ${phone}`;
    confirmphone.appendChild(createconfirmphone);
    

    const confirmPayment = document.getElementById("confirm-payment");
    confirmPayment.innerHTML = '';
    const createconfirmPayment = document.createElement('div');
    createconfirmPayment.innerHTML = `${paymentMethod}`;
    confirmPayment.appendChild(createconfirmPayment);
    if(paymentMethod === "Tiền mặt khi nhận hàng"){
        document.getElementById("confirm-credit").style.display = "none";
        document.getElementById("confirm-bank").style.display = "none";
    }
    else if(paymentMethod === "Thẻ tín dụng"){
        document.getElementById("confirm-credit").style.display = "block";
        document.getElementById("confirm-bank").style.display = "none";
        const creditNumber = document.getElementById("stk").value;
        const creditName = document.getElementById("tenstk").value;
        const creditDate = document.getElementById("ngay").value;
        const creditCVV = document.getElementById("cvv").value;

        const confirmcreditNumber = document.getElementById("confirm-stk");
        confirmcreditNumber.innerHTML = '';
        const createconfirmcreditNumber = document.createElement('div');
        createconfirmcreditNumber.innerHTML = `Số thẻ: ${creditNumber}`;
        confirmcreditNumber.appendChild(createconfirmcreditNumber);

        const confirmcreditName = document.getElementById("confirm-tenstk");
        confirmcreditName.innerHTML = ''; 
        const createconfirmcreditName = document.createElement('div');
        createconfirmcreditName.innerHTML = `Chủ thẻ: ${creditName}`;
        confirmcreditName.appendChild(createconfirmcreditName);

        const confirmcreditDate = document.getElementById("confirm-ngay");
        confirmcreditDate.innerHTML = '';
        const createconfirmcreditDate = document.createElement('div');
        createconfirmcreditDate.innerHTML = `Ngày hết hạn: ${creditDate}`;
        confirmcreditDate.appendChild(createconfirmcreditDate);

        const confirmcreditCVV = document.getElementById("confirm-cvv");
        confirmcreditCVV.innerHTML = '';
        const createconfirmcreditCVV = document.createElement('div');
        createconfirmcreditCVV.innerHTML = `CVV: ${creditCVV}`;
        confirmcreditCVV.appendChild(createconfirmcreditCVV);
    } else {
        document.getElementById("confirm-credit").style.display = "none";
        document.getElementById("confirm-bank").style.display = "block";
    }
}

function showConfirmation() {
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
    if(document.getElementById("payment-method").value === "Thẻ tín dụng"){
        var creditNumber = document.getElementById("stk").value;
        const creditName = document.getElementById("tenstk").value;
        const creditDate = document.getElementById("ngay").value;
        const creditCVV = document.getElementById("cvv").value;

        creditNumber = creditNumber.replace(/[^0-9]/g, "");
        if (creditNumber.length < 16 || creditNumber.length > 19) {
            alert("Số thẻ không hợp lệ!");
            return;
        }
        if (creditName === "") {
            alert("Vui lòng nhập tên chủ thẻ!");
            return;
        }
        if (creditDate === "") {
            alert("Vui lòng nhập ngày hết hạn!");
            return;
        }
        if (creditCVV === "") {
            alert("Vui lòng nhập CVV!");
            return;
        }
        if (creditCVV.length !== 3) {
            alert("CVV không hợp lệ!");
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = new Date(creditDate);
        if (date < today) {
            alert("Thẻ đã hết hạn!");
            return;
        }

    }
    document.getElementById('confirmation').style.display = 'block';
    renderConfirmation();

}

function closeConfirmation() {
    document.getElementById('confirmation').style.display = 'none';

}

