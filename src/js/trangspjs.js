/*function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);

    // Giới hạn số lượng tối đa là 999
    if (currentValue < 999) {
        quantityInput.value = currentValue + 1;
    }
}*/
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.img-slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Calculate new index
    currentIndex += direction;

    // Loop to the start/end if out of bounds
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Move the slide
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Hàm mở ảnh toàn màn hình
function openFullScreen(img) {
    const fullScreenDiv = document.getElementById("fullScreenImage");
    const fullImage = document.getElementById("fullImage");

    // Gán src của ảnh được nhấn vào ảnh toàn màn hình
    fullImage.src = img.src;

    // Hiển thị ảnh toàn màn hình
    fullScreenDiv.style.display = "flex";
}

// Hàm đóng ảnh toàn màn hình
function closeFullScreen() {
    const fullScreenDiv = document.getElementById("fullScreenImage");

    // Ẩn ảnh toàn màn hình
    fullScreenDiv.style.display = "none";
}



