function showRegister(){
    document.getElementById("dangnhap").style.display = "none";
    document.getElementById("dangki").style.display = "block";
}
function showLogin(){
    document.getElementById("dangki").style.display = "none";
    document.getElementById("dangnhap").style.display = "block";
}
function showAddUserForm() {
    document.getElementById('addUserForm').style.display = 'block';
}

function hideAddUserForm() {
    document.getElementById('addUserForm').style.display = 'none';
}

function ktDangNhap(event) {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu theo cách thông thường
    const username = document.querySelector('#dangnhap input[name="username"]').value.trim();
    const password = document.querySelector('#dangnhap input[name="password"]').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (!user) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        return false;
    }

    if (user.isBlocked) {
        alert("Tài khoản của bạn đã bị khóa!");
        return false;
    }

    if (user.password !== password) {
        alert("Mật khẩu không đúng!");
        return false;
    }


    // Lưu thông tin đăng nhập
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert("Đăng nhập thành công!");

    // Cập nhật giao diện
    updateUI();

    // Đóng form đăng nhập
    closeForm();

    // Chuyển về trang chính
    window.location.href = "./index.html";
}


function ktDangKi() {
    const username = document.querySelector('#dangki input[name="username"]').value.trim();
    const password = document.querySelector('#dangki input[name="password"]').value;
    const repassword = document.querySelector('#dangki input[name="repassword"]').value;
    const email = document.querySelector('#dangki input[name="email"]').value.trim();
    const phone = document.querySelector('#dangki input[name="phone"]').value.trim();

    if (!username || !password || !repassword || !phone) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return false;
    }

    if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (phone && !phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ!");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Tên người dùng đã tồn tại!");
        return false;
    }

    const userId = generateUniqueId(users, deletedUsers);

    const currentDate = new Date();
    const registrationDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

    const user = {
        id: userId,
        username: username,
        password: password,
        email: email,
        phone: phone,
        info: {
            ho: "",
            ten: "",
            sdt: phone,
            email: email,
            gioiTinh: "",
            birthday: { ngay: "", thang: "", nam: "" },
        },
        registrationDate,
        userType: 'customer', // Mặc định là Khách hàng
        isBlocked: false
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");
    updateCustomerTable(users);
    showLogin();
}


// Khóa người dùng
function blockCustomer(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].isBlocked = !users[userIndex].isBlocked;
        localStorage.setItem('users', JSON.stringify(users));
        updateCustomerTable(users);
        
        if (users[userIndex].isBlocked) {
            alert("Người dùng đã bị khóa!");
        } else {
            alert("Người dùng đã được mở khóa!");
        }
    }
}


function handleLogin() {
    const username = document.querySelector('#login input[name="username"]').value.trim();
    const password = document.querySelector('#login input[name="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);

    if (!user) {
        alert("Tên đăng nhập không tồn tại!");
        return false;
    }

    if (user.isBlocked) {
        alert("Tài khoản của bạn đã bị khóa!");
        return false;
    }

    if (user.password !== password) {
        alert("Mật khẩu không đúng!");
        return false;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert("Đăng nhập thành công!");
    updateUI();
    return true;
}


function handleBuyNow() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        
        alert("Bạn cần đăng nhập để mua hàng!");    
        return;
    }
}

function handleCartNow() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");    
        return;
    }
}

function saveUserInfo() {
  
    // Lấy thông tin từ form
    const ho = document.getElementById("ho").value;
    const ten = document.getElementById("ten").value;
    const sdt = document.getElementById("sdt").value;
    const email = document.getElementById("email").value;
    const gioiTinh = document.querySelector('input[name="gioi_tinh"]:checked')?.value;
    const ngay = document.getElementById("ngay").value;
    const thang = document.getElementById("thang").value;
    const nam = document.getElementById("nam").value;

    // Kiểm tra xem có người dùng đăng nhập không
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Cập nhật thông tin người dùng
    loggedInUser.info = {
        ho: ho,
        ten: ten,
        sdt: sdt,
        email: email,
        gioiTinh: gioiTinh,
        birthday: { ngay, thang, nam },
    };

    // Lưu lại vào localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === loggedInUser.username);
    if (userIndex !== -1) {
        users[userIndex] = loggedInUser; // Cập nhật thông tin người dùng trong danh sách
    }
    localStorage.setItem('users', JSON.stringify(users)); 
    // Thông báo thành công
    alert("Thông tin tài khoản đã được lưu lại.");
}

document.getElementById("updateButton").addEventListener("click", function() {
    saveUserInfo(); // Gọi hàm lưu thông tin
});

// document.addEventListener("DOMContentLoaded", function () {
//     const updateButton = document.getElementById("updateButton");

//     // Gắn sự kiện click vào nút
//     updateButton.addEventListener("click", function () {
//         saveUserInfo(); // Gọi hàm lưu thông tin
//     });
// });

function updateUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); 

    const accountMenu = document.querySelector('.account-menu'); 
    const notLoggedInMenu = document.querySelector('.account-dropdown');  
    const notiMenu = document.querySelector('.noti-menu');
    const notiDropdown = notiMenu.querySelector('.noti-dropdown');
    const welcomeMessage = document.getElementById('welcome-message');
    const usernameDisplay = document.getElementById('username-display');
    if (loggedInUser) {
        // Đã đăng nhập: ẩn bảng đăng nhập/đăng ký, hiển thị tên người dùng
        notLoggedInMenu.style.display = "none";
        notiDropdown.style.display="none";
        welcomeMessage.style.display = 'flex';
        usernameDisplay.textContent = loggedInUser.username;
    } else {
        // Chưa đăng nhập: hiển thị bảng đăng nhập/đăng ký khi hover
        welcomeMessage.style.display = 'none';
        accountMenu.addEventListener('mouseenter', () => {
            notLoggedInMenu.style.display = "block"; 
        });

        accountMenu.addEventListener('mouseleave', () => {
            // Ẩn bảng khi rời khỏi nút tài khoản sau 200ms (để xử lý vùng trống nhỏ)
            setTimeout(() => {
                if (!notLoggedInMenu.matches(':hover')) {
                    notLoggedInMenu.style.display = "none";
                }
            }, 200);
        });

        notLoggedInMenu.addEventListener('mouseleave', () => {
            // Ẩn bảng khi rời khỏi bảng
            notLoggedInMenu.style.display = "none";
        });
        notiMenu.addEventListener('mouseenter', () => {
            if (!loggedInUser) {
                notiDropdown.style.display = "block";
            }
        });

        notiMenu.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!notiDropdown.matches(':hover')) {
                    notiDropdown.style.display = "none";
                }
            }, 200);
        });

        notiDropdown.addEventListener('mouseleave', () => {
            notiDropdown.style.display = "none";
        });
    }

    if (loggedInUser && loggedInUser.info) {
        const { ho, ten, sdt, email, gioiTinh, birthday } = loggedInUser.info;

        // Gán các giá trị vào form
        document.getElementById("ho").value = ho || "";
        document.getElementById("ten").value = ten || "";
        document.getElementById("sdt").value = sdt || "";
        document.getElementById("email").value = email || "";
        if (gioiTinh) {
            document.querySelector(`input[name="gioi_tinh"][value="${gioiTinh}"]`).checked = true;
        }
        if (birthday) {
            document.getElementById("ngay").value = birthday.ngay || "";
            document.getElementById("thang").value = birthday.thang || "";
            document.getElementById("nam").value = birthday.nam || "";
        }
    } else {
        console.log("Không có người dùng nào đăng nhập hoặc thông tin bị thiếu.");
    }

}




// Hàm hiển thị bảng đăng nhập/đăng ký khi chưa đăng nhập
function showDropdownNotLoggedIn() {
    const notLoggedInMenu = document.getElementById("not-logged-in");
    notLoggedInMenu.style.display = "block";
}

// Hàm ẩn bảng khi chuột rời khỏi
function hideDropdown() {
    const notLoggedInMenu = document.getElementById("not-logged-in");
    notLoggedInMenu.style.display = "none";
}

// Gọi hàm cập nhật giao diện khi tải trang
document.addEventListener('DOMContentLoaded', updateUI);

function showDndk(formType) {
    const formContainer = document.getElementById("form-dndk");
    const loginForm = document.getElementById("dangnhap");
    const registerForm = document.getElementById("dangki");

    // Hiển thị khung chứa form
    formContainer.style.display = "flex";

    // Xác định form cần hiển thị
    if (formType === "login") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else if (formType === "register") {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}
function closeForm() {
    const formContainer = document.getElementById("form-dndk");
    formContainer.style.display = "none";
}

function logout() {
    // Xóa thông tin đăng nhập
    localStorage.removeItem('loggedInUser');
    alert("Bạn đã đăng xuất thành công!");

    // Cập nhật giao diện
    updateUI();
}

function showform() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        // Nếu đã đăng nhập, gọi hàm toggleUserInfo
        toggleUserInfo();
    } else {
        // Nếu chưa đăng nhập, hiển thị dropdown đăng nhập/đăng ký
        showDropdownNotLoggedIn();
    }
}


function toggleUserInfo() {
    const userInfo = document.getElementById('user-info');
    const middleContent = document.querySelector('.middle');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert("Vui lòng đăng nhập để xem thông tin tài khoản!");
        return;
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Đảm bảo CSS được load
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './src/css/userinfo.css';
        document.head.appendChild(link);
    });

    // Kiểm tra trạng thái hiển thị của user-info
    if (userInfo.style.display === 'none' || userInfo.style.display === '') {
        // Ẩn middle content
        middleContent.style.display = 'none';
        const existingLink = document.querySelector('link[href*="userinfo.css"]');
        if (existingLink) {
            existingLink.href = existingLink.href.split('?')[0] + '?v=' + new Date().getTime();
        }
        
        // Đợi một chút để CSS được load
        setTimeout(() => {
            userInfo.style.display = 'flex';
            userInfo.classList.add('user-info-active');
        }, 100);
    } else {
        middleContent.style.display = 'block';
        userInfo.style.display = 'none';
        userInfo.classList.remove('user-info-active');
    }
}

function backToMain() {
    const userInfo = document.getElementById('user-info');
    const middleContent = document.querySelector('.middle');
    
    userInfo.style.display = 'none';
    middleContent.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', updateUI);

document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateCustomerTable(users); // Gọi hàm để cập nhật bảng sau khi trang tải
});

//Sao chép người dùng bị xóa sang localStorage khác
function generateUniqueId(users, deletedUsers) {
    const allIds = users.map(u => u.id).concat(deletedUsers.map(u => u.id)).filter(id => id != null);;
    let newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1001;

    // Kiểm tra và thay đổi ID nếu trùng
    while (allIds.includes(newId)) {
        newId += 1;
    }
    return newId;
}


// Thêm người dùng mới
function addUserFromForm() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];

    const newId = generateUniqueId(users, deletedUsers);
    const userType = document.getElementById('userType').value;
    const ho = document.getElementById('newHo').value;
    const ten = document.getElementById('newTen').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const email = document.getElementById('newEmail').value;
    const phone = document.getElementById('newPhone').value;
    const gender = document.getElementById('newGender').value;
    const birthday = document.getElementById('newBirthday').value;

    if (!username || !password) {
        alert("Tên đăng nhập và mật khẩu là bắt buộc!");
        return;
    }

    const currentDate = new Date();
    const registrationDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

    const newUser = {
        id: newId,
        info: { ho, ten, email, phone, gioiTinh: gender, birthday: { ngay: birthday.split('-')[0], thang: birthday.split('-')[1], nam: birthday.split('-')[2] } },
        username,
        password,
        registrationDate,
        userType,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    updateCustomerTable(users);
    hideAddUserForm(); // Ẩn form sau khi thêm
}


// Cập nhật bảng danh sách người dùng
function updateCustomerTable(users) {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = '';

    if (users.length === 0) {
        customerList.innerHTML = '<tr><td colspan="6">Không tìm thấy người dùng nào</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        const userId = user.id;
        const fullName = `${user.info.ho || ""} ${user.info.ten || "(Chưa Cập Nhật)"}`.trim();
        const username = user.username || "(Chưa Cập Nhật)";
        const registrationDate = user.registrationDate || "(Không rõ)";
        const userType = user.userType || "Khách hàng"; // Mặc định là Khách hàng nếu không xác định
        const isBlocked = user.isBlocked ? " (Đã khóa)" : "";

        const blockIconSrc = user.isBlocked ? "src/icon/unlock.svg" : "src/icon/lock.svg";
        const editIconSrc = "src/icon/rewrite.svg";
        const deleteIconSrc = "src/icon/delete.svg";

        row.innerHTML = `
            <td>${userId}</td>
            <td>${fullName}</td>
            <td>${username}${isBlocked}</td>
            <td>${registrationDate}</td>
            <td>${userType}</td>
            <td>
                <button onclick="editCustomer(${userId})"><img src="${editIconSrc}" alt="Edit Icon" style="width: 20px; height: 20px;"></button>
                <button onclick="deleteCustomer(${userId})"><img src="${deleteIconSrc}" alt="Delete Icon" style="width: 20px; height: 20px;"></button>
                <button onclick="blockCustomer(${userId})"><img src="${blockIconSrc}" alt="Block Icon" style="width: 20px; height: 20px;"></button>
            </td>
        `;
        customerList.appendChild(row);
    });
}

// Sửa thông tin người dùng
function editCustomer(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === id); // Tìm người dùng theo ID
    if (userIndex === -1) return alert("Không tìm thấy người dùng");

    const user = users[userIndex];
    let newUsername = prompt("Nhập tên đăng nhập mới:", user.username || "");
    const newPassword = prompt("Nhập mật khẩu mới:", ""); // Yêu cầu mật khẩu mới

    // Kiểm tra trùng tên đăng nhập
    if (newUsername && users.some(u => u.username === newUsername && u.id !== id)) {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
        return;
    }

    if (newUsername) {
        users[userIndex].username = newUsername;
    }

    if (newPassword) {
        users[userIndex].password = newPassword;
    }

    if (newUsername || newPassword) {
        localStorage.setItem('users', JSON.stringify(users)); // Cập nhật lại localStorage
        updateCustomerTable(users); // Cập nhật bảng
        alert("Thông tin người dùng đã được cập nhật!");
    }
}

function deleteCustomer(userId) {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const deletedUsers = JSON.parse(localStorage.getItem('deletedUsers')) || [];

        // Tìm người dùng bị xóa
        const userToDelete = users.find(user => user.id === userId);

        // Lưu thông tin người dùng bị xóa vào 'deletedUsers'
        if (userToDelete) {
            deletedUsers.push(userToDelete);
            localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
        }

        // Tạo danh sách người dùng mới không chứa người dùng bị xóa
        const updatedUsers = users.filter(user => user.id !== userId);

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        updateCustomerTable(updatedUsers);

        alert("Người dùng đã được xóa!");
    }
}
// Tìm kiếm người dùng

// Tìm kiếm người dùng
function searchCustomer() {
    // Lấy giá trị từ các ô input
    const idInput = document.querySelector('#search-customer input[placeholder="Nhập ID"]').value.trim();
    const nameInput = document.querySelector('#search-customer input[placeholder="Nhập họ tên"]').value.trim();
    const usernameInput = document.querySelector('#search-customer input[placeholder="Nhập tên đăng nhập"]').value.trim();

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Lọc danh sách người dùng dựa trên các trường nhập liệu
    const filteredUsers = users.filter(user => {
        const fullName = `${user.info.ho || ""} ${user.info.ten || ""}`.trim().toLowerCase();
        const idMatch = idInput ? user.id.toString().startsWith(idInput) : true; // Tìm theo ID bắt đầu bằng idInput
        const nameMatch = nameInput ? fullName.includes(nameInput.toLowerCase()) : true; // Tìm theo họ tên
        const usernameMatch = usernameInput ? user.username.toLowerCase().includes(usernameInput.toLowerCase()) : true; // Tìm theo username

        return idMatch && nameMatch && usernameMatch; // Chỉ giữ lại những người dùng khớp
    });

    // Cập nhật lại bảng với danh sách đã lọc
    updateCustomerTable(filteredUsers);
}

// Đóng phần tìm kiếm và hiển thị toàn bộ danh sách
function closeSearch() {
    const searchCustomer = document.getElementById('search-customer');
    const customerButton = document.querySelector('.dashboard .product');

    // Ẩn form tìm kiếm và hiện nút tìm kiếm
    if (searchCustomer) searchCustomer.style.display = 'none';
    if (customerButton) customerButton.style.display = 'inline-block';

    // Hiển thị toàn bộ danh sách khách hàng
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    updateCustomerTable(allUsers); // Hiển thị toàn bộ danh sách
}