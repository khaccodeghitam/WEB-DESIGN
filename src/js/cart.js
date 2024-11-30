function addToCart(productIDadd) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    var product;
    for(var i=0; i<products.length;i++){
		if(products[i].productId==productIDadd){
			product = products[i];
		}
	}
    /*if(product===null){
        console.log("Sản phẩm không tồn tại!");
    } else {
        console.log(product.quantity);
    }
    if (product===null) {
        console.log("Sản phẩm không tồn tại!");
    } else {
        console.log(product.productID);
    }*/
	if(localStorage.getItem('cart')===null){
		var cartArray = [];
        if (!product.quantity) product.quantity = 1;
		cartArray.unshift(product);
		localStorage.setItem('cart',JSON.stringify(cartArray));
	}else{
		var cartArray = JSON.parse(localStorage.getItem('cart'));
        if (!product.quantity) product.quantity = 1;
		cartArray.unshift(product);
		localStorage.setItem('cart',JSON.stringify(cartArray));		
	}
    /*if (cartArray.length==0) {
        console.log("Giỏ hàng trống!");
    }
    else{
        console.log(cartArray[0].productName);
    }*/
}
function checkCart() {
    const cart= document.getElementsByClassName('cart-container')[0];
    const cartEmpty= document.getElementsByClassName('cart-empty')[0];
    const cartArray= JSON.parse(localStorage.getItem('cart'));
    if(cartArray[0]!==null){
        cart.style.display='block';
        cartEmpty.style.display='none';
    }

}
function cartList() {
    let cartArray = [];
    let cartData = localStorage.getItem('cart');
    cartArray = JSON.parse(cartData);
    const cartTable = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;
    cartTable.innerHTML = '';
    for (let i = 0; i < cartArray.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${cartArray[i].productName}</td>
        <td><img src="${cartArray[i].image || './src/img/default.jpg'}" alt="Image" style="width: 50px; height: 50px;"></td>
        <td><button class="btn--decrease qty" onclick="decreaseQuantity(${cartArray[i].productID})">-</button>
            <input type="number" id="quantity" readonly value="${cartArray[i].quantity}")>
            <button class="btn--increase qty" onclick="increaseQuantity(${cartArray[i].productID})">+</button>
        </td>
        <td>${Number(cartArray[i].newPrice)*Number(cartArray[i].quantity)} Đ</td>
        <td><button class="delete-btn" onclick="deleteCart(${i})">Xóa</button></td>
        `;
        cartTable.appendChild(row);
        total += Number(cartArray[i].newPrice)*Number(cartArray[i].quantity);
        totalPrice.innerHTML = `${total} Đ`;
    }
}
function decreaseQuantity(id) {
    let cartArray = []; // Initialize an empty array

    const cartData = localStorage.getItem('cart');
    cartArray = JSON.parse(cartData);
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID == id) {
            if(cartArray[i].quantity>1){
                cartArray[i].quantity--;
            }
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    cartList();
}

function increaseQuantity(id) {
    let cartArray = []; // Initialize an empty array

    const cartData = localStorage.getItem('cart');
    cartArray = JSON.parse(cartData);
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID == id) {
            if(cartArray[i].quantity<999){
                cartArray[i].quantity++;
            }
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    cartList();
}

/*function updateQuantity(quantity, id) {
    let cartArray = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].productID == id) {
            cartArray[i].quantity = quantity;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    cartList();
}*/
function deleteCart(index){
    const cartArray= JSON.parse(localStorage.getItem('cart')) || [];
    cartArray.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartArray));
    checkCart();
    cartList();
}
/*function buy(){
    const cartArray= JSON.parse(localStorage.getItem('cart'));
    var info = '';
    var total = 0;
    for (let i = 0; i < cartArray.length; i++) {
        info += `${cartArray[i].productName} x ${cartArray[i].quantity}: ${Number(cartArray[i].newPrice)*Number(cartArray[i].quantity)} Đ\n`;
        total += Number(cartArray[i].newPrice)*Number(cartArray[i].quantity);
    }
    var customer = JSON.parse(localStorage.getItem('loggedInUser'));
	var date = new Date();
	var d = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	if(localStorage.getItem('bill')===null){
		var billArray = [];
		var bill = {id: billArray.length +100, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Chưa xử lý'};
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}
	else{
		var billArray = JSON.parse(localStorage.getItem('bill'));
		var bill = {id: billArray.length +100, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Chưa xử lý'};
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}	

}*/
function showBill() {
    console.log("showBill function called"); // Debugging log

    const billArray = JSON.parse(localStorage.getItem('bill'));
    if (!billArray || billArray.length === 0) {
        console.log("Không có hóa đơn nào!");
        return;
    } else {
        console.log("Bill array:", billArray);
    }

    const billTable = document.getElementById('bill-items');
    if (!billTable) {
        console.error("Element with id 'bill-items' not found");
        return;
    }

    billTable.innerHTML = '';
    for (let i = 0; i < billArray.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${billArray[i].info}</td>
        <td>${billArray[i].totalprice} Đ</td>
        <td>${billArray[i].customer.username}</td>
        <td>${billArray[i].date}</td>
        <td>${billArray[i].status}</td>
        `;
        billTable.appendChild(row);
    }
}
