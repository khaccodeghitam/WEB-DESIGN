function initializeProductStatistics() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let productStats = JSON.parse(localStorage.getItem('productStats')) || [];

    // Nếu chưa có thống kê, khởi tạo với các sản phẩm và số liệu ban đầu
    if (productStats.length === 0) {
        productStats = products.map(product => ({
            productID: product.productID,
            productName: product.productName,
            quantitySold: 0,
            totalRevenue: 0,
            //new
            date: new Date().toLocaleDateString('en-US')
            //
        }));

        localStorage.setItem('productStats', JSON.stringify(productStats));
    }
    const aggregatedStats = aggregateProductStats(productStats);

    // Lưu lại dữ liệu đã gộp vào localStorage (nếu cần)
    localStorage.setItem('aggregatedProductStats', JSON.stringify(aggregatedStats));

    // Hiển thị bảng thống kê sản phẩm
    renderProductStatistics(1, aggregatedStats);
}

function filterStatisticsByDate() {
    const startDate = document.getElementById('thongkedate1').value;
    const endDate = document.getElementById('thongkedate2').value;
    const productStats = JSON.parse(localStorage.getItem('productStats')) || [];

    // Kiểm tra tính hợp lệ của khoảng thời gian
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        alert("Khoảng thời gian không hợp lệ");
        return;
    }

    // Biến để lưu kết quả sau khi lọc
    let filteredStats = productStats;

    // Xử lý lọc theo từng trường hợp
    if (startDate) {
        filteredStats = filteredStats.filter(stat => new Date(stat.date) >= new Date(startDate));
    }

    if (endDate) {
        filteredStats = filteredStats.filter(stat => new Date(stat.date) <= new Date(endDate));
    }

    // Gộp các sản phẩm có cùng productID và productName
    const aggregatedStats = aggregateProductStats(filteredStats);

    // Hiển thị kết quả đã lọc
    renderProductStatistics(1, aggregatedStats);
}


// Hàm gộp các sản phẩm có cùng productID và productName
function aggregateProductStats(productStats) {
    const aggregated = {};

    productStats.forEach(stat => {
        const key = `${stat.productID}_${stat.productName}`;
        if (!aggregated[key]) {
            aggregated[key] = {
                productID: stat.productID,
                productName: stat.productName,
                quantitySold: 0,
                totalRevenue: 0
            };
        }
        aggregated[key].quantitySold += stat.quantitySold;
        aggregated[key].totalRevenue += stat.totalRevenue;
    });

    return Object.values(aggregated);
}

// Gắn sự kiện vào nút "Lọc"
document.querySelector('.date-range button').addEventListener('click', () => {
    filterStatisticsByDate();
});

function renderProductStatistics(currentPage = 1, customStats = null) {
    // const productStats = JSON.parse(localStorage.getItem('productStats')) || [];
    const productStats = customStats || JSON.parse(localStorage.getItem('productStats')) || [];
    //new
    const billArray = JSON.parse(localStorage.getItem('bill')) || [];
    //new

    // Filter out products with zero sales
    const soldProducts = productStats.filter(stat => stat.quantitySold > 0);
    
    const tableBody = document.querySelector("#bang-thongke tbody");
    const pageStaticContainer = document.querySelector("#pageStatic");
    //new
    const detailProductTable = document.querySelector("#chitiet-sanpham tbody");
    //new
    const itemsPerPage = 10;
    const totalItems = soldProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Slice the product stats for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedStats = soldProducts.slice(startIndex, endIndex);
    
    if (tableBody) {
        tableBody.innerHTML = ''; // Xóa nội dung cũ
        const totalRevenue = soldProducts.reduce((sum, stat) => sum + stat.totalRevenue, 0);
        
        paginatedStats.forEach((stat, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stat.productID}</td>
                <td>${stat.productName}</td>
                <td>${stat.quantitySold}</td>
                <td>${formatCurrency(stat.totalRevenue)} đ</td>
                <td><button class="view-product-details" data-product-name="${stat.productName}">Xem chi tiết</button></td>
            `;

    //new
    const detailButton = row.querySelector('.view-product-details');
    detailButton.addEventListener('click', () => {
        // Lọc các hóa đơn chứa sản phẩm này
        const productDetailBills = billArray.filter(bill => 
            bill.info.includes(stat.productName)
        );

        // Hiển thị bảng chi tiết
        document.getElementById('chitiet-sanpham').style.display = 'table';
        detailProductTable.innerHTML = '';

        productDetailBills.forEach(bill => {
            // Tìm số lượng sản phẩm trong bill
            const productMatch = bill.info.split('; ').find(item => 
                item.includes(stat.productName)
            );
            const quantity = productMatch ? 
                parseInt(productMatch.split(' x ')[1]) : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.date}</td>
                <td>${bill.id}</td>
                <td>${bill.name}</td>
                <td>${bill.address}</td>
                <td>${quantity}</td>
            `;
            detailProductTable.appendChild(row);
        });
    });
        //new

            tableBody.appendChild(row);
        });
        const totalRow = document.createElement('tr');
        totalRow.classList.add('total-revenue-row');
        totalRow.innerHTML = `
            <td colspan="3" style="text-align: center; font-weight: bold;">Tổng doanh thu sản phẩm:</td>
            <td style="font-weight: bold;">${formatCurrency(totalRevenue)} đ</td>
            <td></td>
        `;
        tableBody.appendChild(totalRow);
       
        renderProductStatisticsPaginationControls(currentPage, totalPages, totalItems); 
        renderTopSellingProducts(productStats);
        renderBottomSellingProducts(productStats);
    }
}


function renderProductStatisticsPaginationControls(currentPage, totalPages, totalItems) {
    const pageStaticContainer = document.querySelector("#pageStatic");
    
    if (!pageStaticContainer) return;
    
    // Clear previous pagination controls
    pageStaticContainer.innerHTML = '';
    
    // Hide pagination if only one page
    if (totalPages <= 1) return;
    
    // Create pagination container
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'product-statistics-pagination';
    
    
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Trang trước';
        prevButton.onclick = () => renderProductStatistics(currentPage - 1);
        paginationDiv.appendChild(prevButton);
    }
    
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => renderProductStatistics(i);
        paginationDiv.appendChild(pageButton);
    }
    
    
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Trang tiếp';
        nextButton.onclick = () => renderProductStatistics(currentPage + 1);
        paginationDiv.appendChild(nextButton);
    }
    
    
    const paginationInfo = document.createElement('div');
    paginationInfo.textContent = `Trang ${currentPage}/${totalPages} - Tổng ${totalItems} sản phẩm`;
    
    pageStaticContainer.appendChild(paginationDiv);
    pageStaticContainer.appendChild(paginationInfo);
}

function updateProductStatisticsPagination(product) {
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
    
  
    localStorage.setItem('productStats', JSON.stringify(productStats));
    

    renderProductStatistics();
}
function renderTopSellingProducts(productStats) {
    const topSellingTable = document.querySelector("#sanpham-banchay tbody");
    if (topSellingTable) {
        topSellingTable.innerHTML = '';
        
        // Filter out products with zero sales before sorting
        const soldProducts = productStats.filter(stat => stat.quantitySold > 0);
        
        const sortedProducts = soldProducts
            .sort((a, b) => b.quantitySold - a.quantitySold)
            .slice(0, 5);
        
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
        
        // Filter out products with zero sales before sorting
        const soldProducts = productStats.filter(stat => stat.quantitySold > 0);
        
        const sortedProducts = soldProducts
            .sort((a, b) => a.quantitySold - b.quantitySold)
            .slice(0, 5);
        
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
    localStorage.setItem('productStats', JSON.stringify(productStats));
    renderProductStatistics();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeProductStatistics();
   
//new
const viewDetailsButtons = document.querySelectorAll('.view-product-details');
const productDetailsOverlay = document.createElement('div');
productDetailsOverlay.id = 'chitiet-sanpham-overlay';

const productDetailsContainer = document.createElement('div');
productDetailsContainer.id = 'chitiet-sanpham-container';

const closeButton = document.createElement('button');
closeButton.id = 'close-product-details';
closeButton.innerHTML = '&times;';

const originalDetailTable = document.getElementById('chitiet-sanpham');
productDetailsContainer.appendChild(originalDetailTable);
productDetailsContainer.appendChild(closeButton);
productDetailsOverlay.appendChild(productDetailsContainer);

document.body.appendChild(productDetailsOverlay);

// Hiển thị modal khi nhấn nút xem chi tiết
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        originalDetailTable.style.display = 'table';
        productDetailsOverlay.style.display = 'flex';
    });
});

// Đóng modal khi nhấn nút đóng
closeButton.addEventListener('click', () => {
    productDetailsOverlay.style.display = 'none';
});

// Đóng modal khi click bên ngoài
productDetailsOverlay.addEventListener('click', (event) => {
    if (event.target === productDetailsOverlay) {
        productDetailsOverlay.style.display = 'none';
    }
});

// Ngăn chặn sự kiện click lan sang từ container
productDetailsContainer.addEventListener('click', (event) => {
    event.stopPropagation();
});
//new

    //new
    // const closeDetailTablePro = document.createElement('button');
    // closeDetailTablePro.textContent = 'Đóng';
    // closeDetailTablePro.style.display = 'block';
    // closeDetailTablePro.style.margin = '10px auto';
    // closeDetailTablePro.addEventListener('click', () => {
    //     document.getElementById('chitiet-sanpham').style.display = 'none';
    // });
    // document.getElementById('chitiet-sanpham').parentElement.appendChild(closeDetailTablePro);
    //new

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
                    totalSpent: 0,
                    orders: []
                };
            }
    
            // Add the total price of this order to the customer's total spending
            customerSpending[customerKey].totalSpent += order.totalprice;
            customerSpending[customerKey].orders.push(order);
        });
    
        // Convert to array and sort by total spending in descending order
        const sortedCustomers = Object.values(customerSpending)
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5); // Get top 5 customers
    
        // Get the table body
        const tableBody = document.querySelector('#khachhang-chitieu tbody');
        const detailTable = document.querySelector('#chitiet-khachhang tbody');
        const detailTableContainer = document.querySelector('#chitiet-khachhang');
    
        // Clear existing rows
        tableBody.innerHTML = '';
    
        // Populate the table with top spending customers
        sortedCustomers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${formatCurrency(customer.totalSpent)} đ</td>
                <td><button class="view-details-btn">Xem chi tiết</button></td>
            `;
            
            // Add click event to view details button
            const viewDetailsBtn = row.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => {
                // Clear previous details
                detailTable.innerHTML = '';
                
                // Populate details for this customer
                customer.orders.forEach(order => {
                    const detailRow = document.createElement('tr');
                    detailRow.innerHTML = `
                        <td>${order.date}</td>
                        <td>${order.id}</td>
                        <td>${order.name}</td>
                        <td>${formatCurrency(order.totalprice)} đ</td>
                    `;
                    detailTable.appendChild(detailRow);
                });
                
                // Show the detail table
                detailTableContainer.style.display = 'table';
            });
            
            tableBody.appendChild(row);
        });

        // Add close button functionality for detail table
        const closeDetailTableBtn = document.createElement('button');
        closeDetailTableBtn.textContent = 'Đóng';
        closeDetailTableBtn.addEventListener('click', () => {
            detailTableContainer.style.display = 'none';
        });
        detailTableContainer.parentElement.insertBefore(closeDetailTableBtn, detailTableContainer);
    }

    // Close button for the detail table
    const closeDetailTableBtn = document.querySelector('#chitiet-khachhang + button');
    if (closeDetailTableBtn) {
        closeDetailTableBtn.addEventListener('click', () => {
            document.querySelector('#chitiet-khachhang').style.display = 'none';
        });
    }
});
