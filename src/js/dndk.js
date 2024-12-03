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

    loadUserAddress();

}
function ktDangKi() {
    // Lấy giá trị từ các ô input
    
    const username = document.querySelector('#dangki input[name="username"]').value;
    const password = document.querySelector('#dangki input[name="password"]').value;
    const repassword = document.querySelector('#dangki input[name="repassword"]').value;
    const email = document.querySelector('#dangki input[name="email"]').value;
    const phone = document.querySelector('#dangki input[name="phone"]').value;

    // Kiểm tra tính hợp lệ
    if ( !username || !password || !repassword || !phone) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return false;
    }
    if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return false;
    }

 // Kiểm tra số điện thoại hợp lệ
 const phonePattern = /^[0-9]{10}$/;
 if (!phonePattern.test(phone)) {
     alert("Vui lòng nhập số điện thoại hợp lệ (10 chữ số)!");
     return false;
 }

 // Kiểm tra email hợp lệ
 const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 if (email && !emailPattern.test(email)) {
     alert("Vui lòng nhập email hợp lệ!");
     return false;
 }

  // Lấy danh sách người dùng từ localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
 

  // Kiểm tra trùng tên đăng nhập
  const isUsernameTaken = users.some(user => user.username === username);
  if (isUsernameTaken) {
      alert("Tên đăng nhập đã có người sử dụng!");
      return false;
  }

    // Tạo đối tượng người dùng
    const user = {
        
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
    };

   
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");
    showLogin(); 
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

function updatePassword(event) {
    event.preventDefault();
    // Lấy thông tin tài khoản đang đăng nhập từ localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
   

    // Lấy giá trị từ các ô input
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra tính hợp lệ
    if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (oldPassword !== loggedInUser.password) {
        alert("Mật khẩu cũ không đúng!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và nhập lại mật khẩu không khớp!");
        return;
    }

    // Cập nhật mật khẩu trong danh sách người dùng
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === loggedInUser.username);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Cập nhật mật khẩu trong thông tin tài khoản đăng nhập
    loggedInUser.password = newPassword;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    alert("Đổi mật khẩu thành công!");
    // Reset form
    document.getElementById('old-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
}

function saveUserInfo() {
  
    if (!validateForm()) {
        alert("Vui lòng kiểm tra lại thông tin và sửa các lỗi trước khi lưu.");
        return; 
    }
   
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
    location.reload();
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

