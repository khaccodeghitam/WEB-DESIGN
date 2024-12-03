document.addEventListener('DOMContentLoaded', function() {
    var Parameter = {
        url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
        method: "GET", 
        responseType: "application/json", 
    };
    const orderInfo = JSON.parse(localStorage.getItem('bill')) || [];
    const billTableBody = document.querySelector('#bill-table tbody');
    const overlay = document.getElementById('overlay');
    const orderDetails = document.getElementById('order-details');
    var data = [];
    axios(Parameter)
        .then(function (response) {
            data = response.data;
            console.log("Dữ liệu tỉnh thành:", data);

            renderOrders(orderInfo);
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error);
        });
    function renderOrders(orders) {
        billTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.name}</td>
                <td>${order.totalprice}</td>
                <td>${order.status}</td>
            `;
            row.addEventListener('click', () => showOrderDetails(order));
            billTableBody.appendChild(row);
        });
    }
    function showOrderDetails(order) {
        
        // Tìm tên tỉnh
        const city = data.find(p => p.Id === order.city)?.Name || 'Không xác định';

        // Tìm huyện thuộc tỉnh
        const province = data.find(p => p.Id === order.city);
        const district = province?.Districts.find(d => d.Id === order.district)?.Name || 'Không xác định';

        // Tìm xã thuộc huyện
        const dist = province?.Districts.find(d => d.Id === order.district);
        const ward = dist?.Wards.find(w => w.Id === order.ward)?.Name || 'Không xác định';
        orderDetails.innerHTML = `
            <p>ID: ${order.id}</p>
            <p>Người đặt: ${order.name}</p>
            <p>Ngày đặt: ${order.date}</p>
            <p>Tổng tiền: ${order.totalprice}</p>
            <p>Sản phẩm: ${order.info}</p>
            <p>Số điện thoại: ${order.phone}</p>
            <p>Địa chỉ: ${city}, ${district}, ${ward}, ${order.address}</p>  
            <label for="order-status">Trạng thái:</label>
            <select id="order-status">
                <option value="Chưa xử lí" ${order.status === 'Chưa xử lí' ? 'selected' : ''}>Chưa xử lí</option>
                <option value="Đã xác nhận" ${order.status === 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                <option value="Đang giao" ${order.status === 'Đang giao' ? 'selected' : ''}>Đang giao</option>
                <option value="Hoàn thành" ${order.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                <option value="Hủy" ${order.status === 'Hủy' ? 'selected' : ''}>Hủy</option>
            </select>
        `;
        overlay.style.display = 'flex';

        document.getElementById('order-status').addEventListener('change', function() {
            order.status = this.value;

            const billArray = JSON.parse(localStorage.getItem('bill')) || [];
            const updatedBillArray = billArray.map(bill => {
                if (bill.id === order.id) {
                    return { ...bill, status: order.status };
                }
                return bill;
            });
            localStorage.setItem('bill', JSON.stringify(updatedBillArray));

            renderOrders(orderInfo);
            overlay.style.display = 'none';
        });
    }

    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const billId = document.getElementById('billid').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status-bill').value;
        const city = document.getElementById('city-select').value;

        const filteredOrders = orderInfo.filter(order => {
            return (billId === '' || order.id == billId) &&
                   (date === '' || order.date === date) &&
                   (status === 'all' || order.status === status) &&
                   (city === 'all' || order.city === city);
        });
        renderOrders(filteredOrders);
    });
    renderOrders(orderInfo);
});

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}