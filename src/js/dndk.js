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
    else if (!user) {
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
    const username = document.querySelector('#dangki input[name="username"]').value;
    const password = document.querySelector('#dangki input[name="password"]').value;
    const repassword = document.querySelector('#dangki input[name="repassword"]').value;
    const email = document.querySelector('#dangki input[name="email"]').value;
    const phone = document.querySelector('#dangki input[name="phone"]').value;

    // Kiểm tra tính hợp lệ
    if (!username || !password || !repassword || !phone) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return false;
    }
    if (password !== repassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return false;
    }

    // Tạo đối tượng người dùng
    const user = {
        username: username,
        password: password,
        email: email,
        phone: phone,
    };

    // Lưu thông tin người dùng vào localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");
    showLogin(); // Chuyển sang giao diện đăng nhập
}
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
document.addEventListener('DOMContentLoaded', updateUI);
