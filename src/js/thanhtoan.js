
    const countrySelect = document.getElementById("country");
    const locationFields = document.getElementById("location-fields");
    const manualLocation = document.getElementById("manual-location");
    countrySelect.addEventListener("change", function() {
        const selectedCountry = countrySelect.value;
        if (selectedCountry === "vn") {
            locationFields.style.display = "block";
            manualLocation.style.display = "none";
            // Lấy dữ liệu tỉnh, quận, xã từ tệp JSON
            axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
                .then(function(response) {
                    const data = response.data;
                    const citySelect = document.getElementById("city");
                    const districtSelect = document.getElementById("district");
                    const wardSelect = document.getElementById("ward");
                    // Render các tỉnh thành
                    data.forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.Id;
                        option.textContent = city.Name;
                        citySelect.appendChild(option);
                    });
                                                // Khi chọn tỉnh thành
                                                citySelect.addEventListener("change", function() {
                            districtSelect.innerHTML = '<option value="">Chọn quận huyện</option>';
                            wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
                            if (this.value) {
                                const selectedCity = data.find(city => city.Id === this.value);
                                selectedCity.Districts.forEach(district => {
                                    const option = document.createElement('option');
                                    option.value = district.Id;
                                    option.textContent = district.Name;
                                    districtSelect.appendChild(option);
                                });
                            }
                        });
                        // Khi chọn quận huyện
                        districtSelect.addEventListener("change", function() {
                            wardSelect.innerHTML = '<option value="">Chọn phường xã</option>';
                            if (this.value) {
                                const selectedCity = data.find(city => city.Id === citySelect.value);
                                const selectedDistrict = selectedCity.Districts.find(district => district.Id === this.value);
                                selectedDistrict.Wards.forEach(ward => {
                                    const option = document.createElement('option');
                                    option.value = ward.Id;
                                    option.textContent = ward.Name;
                                    wardSelect.appendChild(option);
                                });
                            }
                        });
                    })
                    .catch(function(error) {
                        console.error("Lỗi khi tải dữ liệu địa lý:", error);
                    });
            } else {
                locationFields.style.display = "none";
                manualLocation.style.display = "block";
            }
        });


    function setDeliveryDate() {
        const deliveryDateElement = document.getElementById("delivery-date");
        const today = new Date();
        today.setDate(today.getDate() + 3); // Thêm 3 ngày
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const deliveryDateFormatted = dd + '/' + mm + '/' + yyyy; // Định dạng ngày (ngày/tháng/năm)
        deliveryDateElement.textContent = deliveryDateFormatted; // Hiển thị ngày giao hàng dự kiến
    }
    // Gọi hàm để thiết lập ngày giao hàng khi trang được tải
    setDeliveryDate();


    // Hàm để lấy tham số từ URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    // Lấy thông tin từ URL
    const productId = getQueryParam("productId");
    const quantity = getQueryParam("quantity");
    // Cập nhật thông tin sản phẩm (giả sử bạn có một danh sách sản phẩm mẫu để tham chiếu)
    const productDetails = {
        "3123410367": { name: "Tên sách A", price: 100000 },
        // Thêm các sản phẩm khác tại đây...
    };
    if (productId && productDetails[productId]) {
        const product = productDetails[productId];
        // Hiển thị thông tin sản phẩm
        document.querySelector(".item-name").textContent = `${product.name} (x${quantity})`; 
        document.querySelector(".item-price").textContent = `${product.price.toLocaleString()} VNĐ`;
        document.querySelector(".subtotal-price").textContent = `${(product.price * quantity).toLocaleString()} VNĐ`;
        document.querySelector(".total-price").textContent = `${(product.price * quantity + 20000).toLocaleString()} VNĐ`; // Thêm phí vận chuyển
    }


    document.querySelector('.btn-submit').addEventListener('click', function () {
        // Lấy thông tin từ các trường nhập liệu
        const id = Math.floor(Math.random() * 1000000); // ID đơn hàng (giả sử)
        const date = new Date().toLocaleDateString(); // Ngày đặt hàng
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;
        // Tạo một object để lưu thông tin đơn hàng
        const orderInfo = {
            id,
            date,
            name,
            email,
            phone,
            country,
            address,
            paymentMethod,
            items: [
                {
                    productName: document.querySelector('.item-name').textContent,
                    productPrice: document.querySelector('.item-price').textContent,
                }
            ],
            totalPrice: document.querySelector('.total-price').textContent,
            status: 'Chờ xử lý', // Mặc định là chờ xử lý
        };
        // Lưu vào localStorage
        localStorage.setItem('order', JSON.stringify(orderInfo));
        if(localStorage.getItem('order') == null){
            console.log('null');
        } else{
            console.log('not null');}
        // Thông báo hoặc chuyển hướng
        alert('Thông tin thanh toán đã được lưu!');
   });
    
    
    