function addMultipleProductsFromFolder() {
    const productList = [
        {
            productName: "Sản phẩm 1",
            oldPrice: "200.000",
            newPrice: "150.000",
            bookType: "Sách giáo khoa",
            category: "Học thuật",
            supplier: "Nhà cung cấp A",
            publisher: "Nhà xuất bản A",
            author: "Tác giả A",
            form: "Bìa mềm",
            description: "Mô tả sản phẩm 1",
            image: "./src/img/camngot.jpg" // Đường dẫn ảnh từ thư mục
        },
        {
            productName: "Sản phẩm 2",
            oldPrice: "300.000",
            newPrice: "250.000",
            bookType: "Sách truyện",
            category: "Thiếu nhi",
            supplier: "Nhà cung cấp B",
            publisher: "Nhà xuất bản B",
            author: "Tác giả B",
            form: "Bìa cứng",
            description: "Mô tả sản phẩm 2",
            image: "./src/img/book1.jpg" // Đường dẫn ảnh từ thư mục
        },
        {
            productName: "Sản phẩm 3",
            oldPrice: "500.000",
            newPrice: "400.000",
            bookType: "Sách tham khảo",
            category: "Khoa học",
            supplier: "Nhà cung cấp C",
            publisher: "Nhà xuất bản C",
            author: "Tác giả C",
            form: "Bìa mềm",
            description: "Mô tả sản phẩm 3",
            image: ".src/img/book2.jpg" // Đường dẫn ảnh từ thư mục
        }
    ];

    // Lặp qua danh sách sản phẩm và thêm vào localStorage
    productList.forEach(product => addProduct(product));

    console.log("Đã thêm sản phẩm từ thư mục ảnh.");
    renderProducts(); // Hiển thị danh sách sản phẩm
}