document.addEventListener('DOMContentLoaded', function() {
    const orderInfo = [
        { id: 1, customer: 'Nguyen Van A', date: '2023-10-01', total: 100000, status: 'chua_su_li', products: ['Book 1', 'Book 2'] },
        { id: 2, customer: 'Tran Thi B', date: '2023-10-02', total: 200000, status: 'chua_su_li', products: ['Book 3', 'Book 4'] },
        // Add more orders here
    ];

    const billTableBody = document.querySelector('#bill-table tbody');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');

    function renderOrders(orders) {
        billTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.customer}</td>
                <td>${order.total}</td>
                <td>${order.status}</td>
            `;
            row.addEventListener('click', () => showOrderDetails(order));
            billTableBody.appendChild(row);
        });
    }

    function showOrderDetails(order) {
        content.innerHTML = `
            <p>ID: ${order.id}</p>
            <p>Người đặt: ${order.customer}</p>
            <p>Ngày đặt: ${order.date}</p>
            <p>Tổng tiền: ${order.total}</p>
            <p>Sản phẩm: ${order.products.join(', ')}</p>
            <label for="order-status">Trạng thái:</label>
            <select id="order-status">
                <option value="chua_su_li" ${order.status === 'chua_su_li' ? 'selected' : ''}>Chưa xử lí</option>
                <option value="dang_giao" ${order.status === 'dang_giao' ? 'selected' : ''}>Đang giao</option>
                <option value="hoan_thanh" ${order.status === 'hoan_thanh' ? 'selected' : ''}>Hoàn thành</option>
            </select>
        `;
        overlay.style.display = 'block';

        document.getElementById('order-status').addEventListener('change', function() {
            order.status = this.value;
            renderOrders(orderInfo);
        });
    }

    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const billId = document.getElementById('billid').value;
        const date = document.getElementById('date').value;
        const status = document.getElementById('status').value;

        const filteredOrders = orderInfo.filter(order => {
            return (billId === '' || order.id == billId) &&
                   (date === '' || order.date === date) &&
                   (status === 'all' || order.status === status);
        });

        renderOrders(filteredOrders);
    });

    renderOrders(orderInfo);
});
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

// Function to show the overlay