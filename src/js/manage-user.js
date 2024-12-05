document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateCustomerTable(users); // Gọi hàm để cập nhật bảng sau khi trang tải
});
// Đănng nhập admin bằng URL, sau khi đăng xuất thì đăng nhập lại
document.addEventListener('DOMContentLoaded', function () {
    createDefaultAdmin();
    const url = window.location.pathname;
    const adminContent = document.querySelector('.wrapper'); // Phần nội dung gốc
    const loginForm = document.getElementById('admin-login-form');

    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (url.includes('/admin.html')) {
        if (isLoggedIn === 'true') {
            // Nếu đã đăng nhập, hiển thị nội dung admin
            adminContent.style.display = 'block';
            loginForm.style.display = 'none';
        } else {
            // Nếu chưa đăng nhập, hiển thị form đăng nhập
            adminContent.style.display = 'none';
            loginForm.style.display = 'block';

            // Xử lý đăng nhập
            document.getElementById('login-button').onclick = function () {
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();

                // Lấy danh sách người dùng từ localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Kiểm tra thông tin đăng nhập
                const user = users.find(u => u.username === username && u.password === password && u.userType === 'admin');

                if (user) {
                    // Thông báo đăng nhập thành công
                    alert('Đăng nhập thành công!');

                    // Lưu trạng thái đăng nhập
                    localStorage.setItem('isLoggedIn', 'true');

                    // Hiển thị lại nội dung admin
                    loginForm.style.display = 'none';
                    adminContent.style.display = 'block';
                } else {
                    // Thông báo lỗi
                    alert('Tên đăng nhập hoặc mật khẩu không đúng hoặc bạn không phải là admin!');
                }
            };
        }
    }

    // Xử lý khi nhấn nút "Home" để chuyển về trang index.html
    const homeButton = document.getElementById('btn-admin-logout'); // ID của nút Home
    if (homeButton) {
        homeButton.onclick = function () {
            localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
            window.location.href = '/index.html'; // Chuyển về trang chủ
        };
    }
});
