function initializeProductStatistics() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let productStats = JSON.parse(localStorage.getItem('productStats')) || [];

    // Nếu chưa có thống kê, khởi tạo với các sản phẩm và số liệu ban đầu
    if (productStats.length === 0) {
        productStats = products.map(product => ({
            productID: product.productID,
            productName: product.productName,
            quantitySold: 0,
            totalRevenue: 0
        }));

        localStorage.setItem('productStats', JSON.stringify(productStats));
    }

    renderProductStatistics();
}
function renderProductStatistics() {
    const productStats = JSON.parse(localStorage.getItem('productStats')) || [];
    const tableBody = document.querySelector("#bang-thongke tbody");
    
    if (tableBody) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ

        productStats.forEach((stat, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.productID}</td>
                <td>${stat.productName}</td>
                <td>${stat.quantitySold}</td>
                <td>${formatCurrency(stat.totalRevenue)} đ</td>
                <td>
                    <button onclick="viewProductDetail(${stat.productID})">Chi tiết</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Sắp xếp và hiển thị top 5 sản phẩm bán chạy
        renderTopSellingProducts(productStats);
        
        // Sắp xếp và hiển thị top 5 sản phẩm bán ế
        renderBottomSellingProducts(productStats);
    }
}

function renderTopSellingProducts(productStats) {
    const topSellingTable = document.querySelector("#sanpham-banchay tbody");
    if (topSellingTable) {
        topSellingTable.innerHTML = '';
        const sortedProducts = [...productStats].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5);
        
        sortedProducts.forEach((stat, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.productID}</td>
                <td>${stat.productName}</td>
                <td>${stat.quantitySold}</td>
                <td>${formatCurrency(stat.totalRevenue)} đ</td>
            `;
            topSellingTable.appendChild(row);
        });
    }
}

function renderBottomSellingProducts(productStats) {
    const bottomSellingTable = document.querySelector("#sanpham-bane tbody");
    if (bottomSellingTable) {
        bottomSellingTable.innerHTML = '';
        const sortedProducts = [...productStats].sort((a, b) => a.quantitySold - b.quantitySold).slice(0, 5);
        
        sortedProducts.forEach((stat, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.productID}</td>
                <td>${stat.productName}</td>
                <td>${stat.quantitySold}</td>
                <td>${formatCurrency(stat.totalRevenue)} đ</td>
            `;
            bottomSellingTable.appendChild(row);
        });
    }
}

function viewProductDetail(productID) {
    // Hàm để xem chi tiết sản phẩm thống kê
    const productStats = JSON.parse(localStorage.getItem('productStats')) || [];
    const productStat = productStats.find(stat => stat.productID === productID);
    
    if (productStat) {
        alert(`Chi tiết sản phẩm:\nID: ${productStat.productID}\nTên: ${productStat.productName}\nSố lượng bán: ${productStat.quantitySold}\nTổng doanh thu: ${formatCurrency(productStat.totalRevenue)} đ`);
    }
}

function updateProductStatistics(product) {
    let productStats = JSON.parse(localStorage.getItem('productStats')) || [];
    
    // Kiểm tra xem sản phẩm đã tồn tại trong thống kê chưa
    const existingProductIndex = productStats.findIndex(stat => stat.productID === product.productID);
    
    if (existingProductIndex === -1) {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào thống kê
        productStats.push({
            productID: product.productID,
            productName: product.productName,
            quantitySold: 0,
            totalRevenue: 0
        });
    }
    
    // Lưu lại danh sách thống kê sản phẩm
    localStorage.setItem('productStats', JSON.stringify(productStats));
    
    // Render lại bảng thống kê
    renderProductStatistics();
}

// Gọi hàm này khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    
    initializeProductStatistics();

    var Parameter = {
        url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
        method: "GET", 
        responseType: "application/json", 
    };

    axios(Parameter)
        .then(function (response) {
            const data = response.data;
            console.log("Dữ liệu tỉnh thành:", data);
            calculateCustomerStatistics(data);
        })
        .catch(function (error) {
            console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error);
        });


    function calculateCustomerStatistics(data) {
        // Retrieve bill information from localStorage
        const billArray = JSON.parse(localStorage.getItem('bill')) || [];
    
        // Object to store customer spending information
        const customerSpending = {};
    
        // Iterate through all bills
        billArray.forEach(order => {
            // Create a unique key based on name and full address
            const province = data.find(p => p.Id === order.city)?.Name || 'Không xác định';
            const district = data.find(p => p.Id === order.city)?.Districts.find(d => d.Id === order.district)?.Name || 'Không xác định';
            const ward = data.find(p => p.Id === order.city)?.Districts.find(d => d.Id === order.district)?.Wards.find(w => w.Id === order.ward)?.Name || 'Không xác định';
            const customerKey = `${order.name}_${province}_${district}_${ward}_${order.address}`;
    
            // If customer doesn't exist in our tracking, create a new entry
            if (!customerSpending[customerKey]) {
                customerSpending[customerKey] = {
                    name: order.name,
                    address: `${province}, ${district}, ${ward}, ${order.address}`,
                    totalSpent: 0
                };
            }
    
            // Add the total price of this order to the customer's total spending
            customerSpending[customerKey].totalSpent += order.totalprice;
        });
    
        // Convert to array and sort by total spending in descending order
        const sortedCustomers = Object.values(customerSpending)
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5); // Get top 5 customers
    
        // Get the table body
        const tableBody = document.querySelector('#khachhang-chitieu tbody');
    
        // Clear existing rows
        tableBody.innerHTML = '';
    
        // Populate the table with top spending customers
        sortedCustomers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${formatCurrency(customer.totalSpent)} đ</td>
                <td>
                    <button onclick="viewCustomerDetails('${customer.name}', '${customer.address}')">Chi tiết</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to view detailed customer information (optional)
    window.viewCustomerDetails = function(name, address) {
        const billArray = JSON.parse(localStorage.getItem('bill')) || [];
        
        // Filter bills for this specific customer
        const customerBills = billArray.filter(order => 
            order.name === name && 
            `${order.city}, ${order.district}, ${order.ward}, ${order.address}` === address
        );

        // Create a modal or alert with customer details
        let detailsHtml = `<h3>Chi tiết khách hàng</h3>
            <p>Tên: ${name}</p>
            <p>Địa chỉ: ${address}</p>
            <h4>Các đơn hàng:</h4>
            <ul>`;
        
        customerBills.forEach(bill => {
            detailsHtml += `<li>
                Mã đơn: ${bill.id}, 
                Ngày: ${bill.date}, 
                Tổng tiền: ${bill.totalprice} Đ, 
                Trạng thái: ${bill.status}
            </li>`;
        });

        detailsHtml += `</ul>`;

        // You might want to replace this with a more sophisticated modal display
        alert(detailsHtml);
    }

    // Call the function to calculate and display customer statistics
    calculateCustomerStatistics();
});