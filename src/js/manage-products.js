
// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

const searchBox = document.querySelector(".search-box");
const productTableBody = document.querySelector("#product-table tbody");

// Hiển thị danh sách sản phẩm khi cập nhật tên
function renderProducts(filteredProducts = null) {
  const products = filteredProducts || getProducts();
  productTableBody.innerHTML = "";

  products.forEach((product, index) => {
    if (products.includes(product)) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${10000 + index}</td>
        <td><img src="${
          product.image || "./src/img/default.jpg"
        }" alt="Image" style="width: 50px; height: 50px;"></td>
        <td>${product.productName}</td>
        <td>${product.category}</td>
        <td>${product.author}</td>
        <td>${product.newPrice} VND</td>
        <td>
            <button class="delete-btn" onclick="deleteProduct(${index})">Xóa</button>
            <button class="edit-btn" onclick="editProduct(${index})">Sửa</button>
        </td>
      `;
      productTableBody.appendChild(row);
    }
  });
}

// Xóa sản phẩm
function deleteProduct(index) {
  const products = getProducts();
  products.splice(index, 1);
  saveProducts(products);
  renderProducts();
}

// Sửa sản phẩm (Chưa hoàn thiện, thêm sau)
function editProduct(index) {
  alert(`Sửa sản phẩm ở vị trí ${index} (chức năng đang phát triển!)`);
}

// Hiển thị danh sách sản phẩm khi tải trang
document.addEventListener("DOMContentLoaded", renderProducts);

// Hàm chuẩn hóa chuỗi: loại bỏ dấu tiếng Việt
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Hàm tìm kiếm sản phẩm gần giống
function searchProducts(query) {
  const products = getProducts();
  if (!query) return products;

  const normalizedQuery = removeAccents(query); // Chuẩn hóa từ khóa tìm kiếm

  // Nếu query là số, chỉ tìm kiếm theo ID
  if (!isNaN(query)) {
    return products.filter((_, index) => (10000 + index).toString() === query);
  }

  // Lọc sản phẩm theo ID, tên, hoặc tác giả
  return products.filter((product, index) => {
    const normalizedProductName = removeAccents(product.productName);
    const normalizedAuthor = removeAccents(product.author);

    return (
      normalizedProductName.includes(normalizedQuery) ||
      normalizedAuthor.includes(normalizedQuery)
    );
  });
}

// Xử lý sự kiện nhập liệu trong ô tìm kiếm
searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim();
  const filteredProducts = searchProducts(query);
  renderProducts(filteredProducts); // Hiển thị danh sách đã lọc
});

// Hiển thị toàn bộ sản phẩm khi tải trang
document.addEventListener("DOMContentLoaded", () => renderProducts());

