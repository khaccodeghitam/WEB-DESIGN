function showRegister(){
    document.getElementById("dangnhap").style.display = "none";
    document.getElementById("dangki").style.display = "block";
}
function showLogin(){
    document.getElementById("dangki").style.display = "none";
    document.getElementById("dangnhap").style.display = "block";
}
function ktDangNhap() {
    const username = document.querySelector('#dangnhap input[name="username"]').value;
    const password = document.querySelector('#dangnhap input[name="password"]').value;
    if(username =='admin'&& password=='admin'){
        window.location.href = "admin.html";
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if(username =='admin'&& password=='admin'){
        alert("Admin đăng nhập!");
    }
    if (!user) {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        return false;
    }

    // Lưu thông tin đăng nhập
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert("Đăng nhập thành công!");

    // Cập nhật giao diện
    updateUI();

    // Đóng form đăng nhập
    closeForm();

    // Chuyển về trang chính (nếu cần)
    // window.location.href = "./index.html";
}
function ktDangKi() {
    // Lấy giá trị từ các ô input
    const username = document.querySelector('#dangki input[name="username"]').value.trim();
    const password = document.querySelector('#dangki input[name="password"]').value;
    const repassword = document.querySelector('#dangki input[name="repassword"]').value;
    const email = document.querySelector('#dangki input[name="email"]').value.trim();
    const phone = document.querySelector('#dangki input[name="phone"]').value.trim();

    // Kiểm tra tính hợp lệ
    if (!username || !password || !repassword || !phone) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return false;
    }

    if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return false;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return false;
    }

    // Kiểm tra số điện thoại hợp lệ
    const phoneRegex = /^[0-9]{10,11}$/;
    if (phone && !phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ!");
        return false;
    }

    // Kiểm tra tên người dùng đã tồn tại chưa
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Tên người dùng đã tồn tại!");
        return false;
    }

    // Lấy ngày đăng ký
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');  
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  
    const year = currentDate.getFullYear();
    const registrationDate = `${day}-${month}-${year}`;  

    // Tạo đối tượng người dùng
    const userId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1001; // Tạo ID tự động
    const user = {
        id: userId,  // Gán id duy nhất cho người dùng
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
        ngaydangki: registrationDate, 
    };

    // Lưu thông tin người dùng vào localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");

    // Cập nhật bảng danh sách khách hàng sau khi đăng ký thành công
    updateCustomerTable(users);  // Gọi hàm này để cập nhật bảng

    showLogin();  // Giả sử hàm này sẽ chuyển đến trang đăng nhập sau khi đăng ký thành công
}


function handleBuyNow() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        
        alert("Bạn cần đăng nhập để mua hàng!");    
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
            document.querySelector('.account-menu p').textContent = loggedInUser.username;
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


//Lưu thông tin địa chỉ vào tài khoản
// document.getElementById("btnSave").addEventListener("click", function (e) {
//     e.preventDefault();

//     // Lấy các giá trị từ form
//     const txtHo = document.getElementById("txtHo").value.trim();
//     const txtTen = document.getElementById("txtTen").value.trim();
//     const txtSdt = document.getElementById("txtSdt").value.trim();
//     const txtDiachi = document.getElementById("txtDiachi").value.trim();

//     const citySelect = document.getElementById("city");
//     const city = citySelect.options[citySelect.selectedIndex].text;

//     const districtSelect = document.getElementById("district");
//     const district = districtSelect.options[districtSelect.selectedIndex].text;

//     const wardSelect = document.getElementById("ward");
//     const ward = wardSelect.options[wardSelect.selectedIndex].text;

//     // Kiểm tra thông tin đầu vào
//     if (txtHo === "" || txtTen === "" || txtSdt === "" || txtDiachi === "" || city === "" || district === "" || ward === "") {
//         alert("Vui lòng điền đầy đủ thông tin.");
//         return;
//     }

//     // Lấy thông tin người dùng đăng nhập
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

//     if (!loggedInUser) {
//         alert("Bạn cần đăng nhập để lưu địa chỉ!");
//         return;
//     }

//     // Tạo đối tượng địa chỉ
//     const newAddress = {
//         ho: txtHo,
//         ten: txtTen,
//         sdt: txtSdt,
//         diachi: txtDiachi,
//         city: city,
//         district: district,
//         ward: ward
//     };

//     // Lấy danh sách địa chỉ hiện tại của tài khoản đăng nhập
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userIndex = users.findIndex(u => u.username === loggedInUser.username);

//     if (userIndex === -1) {
//         alert("Tài khoản không tồn tại.");
//         return;
//     }

//     users[userIndex].addresses = users[userIndex].addresses || [];
//     users[userIndex].addresses.push(newAddress);

//     // Cập nhật lại danh sách người dùng trong localStorage
//     localStorage.setItem("users", JSON.stringify(users));

//     // Cập nhật danh sách địa chỉ hiển thị
//     const addressList = document.getElementById("addressList");

//     const addressItem = document.createElement("div");
//     addressItem.classList.add("address-item");
//     addressItem.innerHTML = `
//         <div style="display: flex; justify-content: space-between;">
//             <div>
//                 <strong>${txtHo} ${txtTen} | ${txtSdt}</strong> (Địa chỉ giao hàng)
//                 <button style="margin-left:83px;" class="edit-btn">Sửa</button>
//                 <button class="delete-btn">Xoá</button>
//             </div>
//         </div>
//         <p style="width:360px;">${txtDiachi}</p>
//         <p style="width:360px;">${ward}, ${district}, ${city}</p>
//     `;

//     addressList.appendChild(addressItem);

//     // Ẩn dòng chữ "Địa chỉ trống" nếu có
//     const emptyAddressText = document.getElementById("emptyAddressText");
//     if (emptyAddressText) {
//         emptyAddressText.style.display = "none";
//     }

//     // Xóa nội dung form sau khi lưu
//     document.getElementById("frmAddress").reset();

//     // Đóng form và hiển thị lại danh sách
//     const addressFormSection = document.getElementById("addressFormSection");
//     const addAddressSection = document.getElementById("addAddressSection");
//     addressFormSection.style.display = "none";
//     addAddressSection.style.display = "block";

//     // Xoá địa chỉ
//     addressItem.querySelector(".delete-btn").addEventListener("click", function () {
//         addressList.removeChild(addressItem);

//         // Xóa địa chỉ khỏi tài khoản
//         users[userIndex].addresses = users[userIndex].addresses.filter(
//             address => address !== newAddress
//         );
//         localStorage.setItem("users", JSON.stringify(users));

//         if (addressList.children.length === 0 && emptyAddressText) {
//             emptyAddressText.style.display = "block";
//         }
//     });

//     // Sửa địa chỉ (tạm thời chỉ hiển thị form, bạn có thể bổ sung chức năng này)
//     addressItem.querySelector(".edit-btn").addEventListener("click", function () {
//         alert("Chức năng sửa chưa được triển khai.");
//     });
// });


document.getElementById("btnSave").addEventListener("click", function (e) {
    e.preventDefault();

    // Lấy các giá trị từ form
    const txtHo = document.getElementById("txtHo");
    const txtTen = document.getElementById("txtTen");
    const txtSdt = document.getElementById("txtSdt");
    const txtDiachi = document.getElementById("txtDiachi");
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");

    // Biến kiểm tra xem có lỗi không
    let hasError = false;

    // Hàm hiển thị lỗi
    const showError = (input, message) => {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "12px";
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        hasError = true;
    };

    // Hàm xóa lỗi
    const clearError = (input) => {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.textContent = "";
        }
    };

    // Kiểm tra các trường
    if (txtHo.value.trim() === "") {
        showError(txtHo, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(txtHo);
    }

    if (txtTen.value.trim() === "") {
        showError(txtTen, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(txtTen);
    }

    if (txtSdt.value.trim() === "") {
        showError(txtSdt, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else if (!/^\d{10}$/.test(txtSdt.value.trim())) {
        showError(txtSdt, "Số điện thoại phải nhập là số và gồm 10 chữ số.");
    } else {
        clearError(txtSdt);
    }

    if (txtDiachi.value.trim() === "") {
        showError(txtDiachi, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(txtDiachi);
    }

    if (citySelect.value === "") {
        showError(citySelect, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(citySelect);
    }

    if (districtSelect.value === "") {
        showError(districtSelect, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(districtSelect);
    }

    if (wardSelect.value === "") {
        showError(wardSelect, "Thông tin này quan trọng. Vui lòng không để trống.");
    } else {
        clearError(wardSelect);
    }

    // Nếu có lỗi, dừng xử lý tiếp
    if (hasError) {
        return;
    }

    // Tiếp tục lưu địa chỉ nếu không có lỗi
    const newAddress = {
        ho: txtHo.value.trim(),
        ten: txtTen.value.trim(),
        sdt: txtSdt.value.trim(),
        diachi: txtDiachi.value.trim(),
        city: citySelect.options[citySelect.selectedIndex].text,
        district: districtSelect.options[districtSelect.selectedIndex].text,
        ward: wardSelect.options[wardSelect.selectedIndex].text,
    };

    // Gọi các bước tiếp theo như lưu vào localStorage, cập nhật danh sách, ...
    alert("Địa chỉ đã được lưu thành công!");
});


document.addEventListener('DOMContentLoaded', updateUI);

document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateCustomerTable(users); // Gọi hàm để cập nhật bảng sau khi trang tải
});


// Thêm người dùng mới
function addUser(ho, ten, username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1001;
    const newUser = {
        id: newId, // ID cố định
        info: { ho, ten },
        username,
        registrationDate: new Date().toISOString().split('T')[0], // Ngày đăng ký
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Lưu vào localStorage
    updateCustomerTable(users); // Cập nhật bảng sau khi thêm
}


// Cập nhật bảng danh sách người dùng
function updateCustomerTable(users) {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = ''; // Xóa dữ liệu cũ

    if (users.length === 0) {
        customerList.innerHTML = '<tr><td colspan="5">Không tìm thấy người dùng nào</td></tr>';
        return;
    }

    // Duyệt qua danh sách người dùng và hiển thị
    users.forEach(user => {
        const row = document.createElement('tr');
        const userId = user.id;
        const fullName = `${user.info.ho || ""} ${user.info.ten || "(Chưa Cập Nhật)"}`.trim();
        const username = user.username || "(Chưa Cập Nhật)";
        const registrationDate = user.ngaydangki || "(Không rõ)";

        row.innerHTML = `
            <td>${userId}</td>
            <td>${fullName}</td>
            <td>${username}</td>
            <td>${registrationDate}</td>
            <td>
                <button onclick="editCustomer(${userId})">Sửa</button>
                <button onclick="deleteCustomer(${userId})">Xóa</button>
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
    const newHo = prompt("Nhập họ mới:", user.info.ho || "");
    const newTen = prompt("Nhập tên mới:", user.info.ten || "");
    const newUsername = prompt("Nhập tên đăng nhập mới:", user.username || "");

    if (newHo && newTen && newUsername) {
        users[userIndex].info.ho = newHo;
        users[userIndex].info.ten = newTen;
        users[userIndex].username = newUsername;
        localStorage.setItem('users', JSON.stringify(users)); // Cập nhật lại localStorage
        updateCustomerTable(users); // Cập nhật bảng
    }
}

// Xóa người dùng
function deleteCustomer(userId) {
    // Xác nhận xem người dùng có muốn xóa không
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
        // Lấy danh sách người dùng từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Tìm và xóa người dùng có id khớp
        const updatedUsers = users.filter(user => user.id !== userId);

        // Lưu lại danh sách người dùng đã được cập nhật vào localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Cập nhật lại bảng danh sách người dùng
        updateCustomerTable(updatedUsers); // Cập nhật lại bảng hiển thị

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
