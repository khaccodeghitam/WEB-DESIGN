function showNotificationPanel() {
    const notificationPanel = document.getElementById('notification-panel');
    const isDisplayed = notificationPanel.style.display === 'flex';
    notificationPanel.style.display = isDisplayed ? 'none' : 'flex';
}

// Ẩn bảng thông báo khi nhấn ra ngoài
document.addEventListener('click', function(event) {
    const notificationPanel = document.getElementById('notification-panel');
    const notiMenu = document.querySelector('.notification-menu');

    if (!notiMenu.contains(event.target)) {
        notificationPanel.style.display = 'none';
    }
});
