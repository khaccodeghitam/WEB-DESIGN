document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateCustomerTable(users); // Gọi hàm để cập nhật bảng sau khi trang tải
});
