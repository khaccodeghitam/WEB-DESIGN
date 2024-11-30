function check() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("loggedInUser:", loggedInUser);
    if (!loggedInUser) {
        console.error("No logged in user found");
        return;
    }

    /*Lấy thông tin người dùng đưa vào trang thanh toán*/
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var city = document.getElementById("city");
    var district = document.getElementById("district");
    var ward = document.getElementById("ward");
    var address = document.getElementById("address");
    name.value = loggedInUser.fullname;
    email.value = loggedInUser.email;
    phone.value = loggedInUser.phone;
    city.value = loggedInUser.address.city;
    district.value = loggedInUser.address.district;
    ward.value = loggedInUser.address.ward;
    address.value = loggedInUser.address.address;

    /*Lấy thông tin từ giỏ hàng đưa vào trang thanh toán*/
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    const product = document.getElementsByClassName('order-summary')[0];
    const paidPrice = document.getElementsByClassName('paid-price')[0];
    var info = '';
    var total = 0;
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i] && cartArray[i].productName) {  
            info += cartArray[i].productName + ' x ' + (cartArray[i].quantity || 0) + '; ';
            total += Number(cartArray[i].newPrice || 0) * Number(cartArray[i].quantity || 0);
        }
    }
    console.log("info:", info);
    console.log("total:", total);
    
    const listProducts = document.createElement('div');
    listProducts.innerHTML = `${info}`;
    product.appendChild(listProducts);

    paidPrice.innerHTML = `${total} Đ`;
}
function paymentMethod(){
    const paymentMethod = document.getElementById("payment-method").value;
    if(paymentMethod === "cash"){
        document.getElementById("credit").style.display = "none";
        document.getElementById("bank").style.display = "none";
    }
    else if(paymentMethod === "credit-card"){
        document.getElementById("credit").style.display = "block";
        document.getElementById("bank").style.display = "none";
    } else {
        document.getElementById("credit").style.display = "none";
        document.getElementById("bank").style.display = "block";
    }
}
function buy(){
    const cartArray= JSON.parse(localStorage.getItem('cart'));
    var info = '';
    var total = 0;
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i] && cartArray[i].productName) {  
            info += cartArray[i].productName + ' x ' + (cartArray[i].quantity || 0) + '; ';
            total += Number(cartArray[i].newPrice || 0) * Number(cartArray[i].quantity || 0);
        }
    }
    var customer = JSON.parse(localStorage.getItem('loggedInUser'));
	var date = new Date();
	var d = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	if(localStorage.getItem('bill')===null){
		var billArray = [];
		var bill = {id: billArray.length +100, info: info, totalprice: total, customer: customer, date: d, status: 'Chưa xử lý'};
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}
	else{
		var billArray = JSON.parse(localStorage.getItem('bill'));
		var bill = {id: billArray.length +100, info: info, totalprice: total, customer: customer, date: d, status: 'Chưa xử lý'};
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}
    clearCart();	
    window.location.href = "giohang.html"
}
function clearCart() {
    localStorage.removeItem('cart');
    console.log("Cart data cleared");
}