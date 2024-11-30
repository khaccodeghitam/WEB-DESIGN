        // Lấy danh sách sản phẩm từ localStorage
        function getProducts() {
            return JSON.parse(localStorage.getItem("products")) || [];
        }
  
        // Lưu danh sách sản phẩm vào localStorage
        function saveProducts(products) {
            localStorage.setItem("products", JSON.stringify(products));
        }
        
        
        



        //z-index
        function showAdvancedSearch() {
            const advancedSearch = document.getElementById("advancedSearch");
            const overlay = document.getElementById("advancedSearchOverlay");

            overlay.style.display = 'block';
            advancedSearch.style.display = 'block';

            advancedSearch.style.zIndex = '9999';
            overlay.style.zIndex = '9998';
        }

        //Đóng advancedsearch
        function closeAdvancedSearch() {
            const advancedSearch = document.getElementById("advancedSearch");
            const overlay = document.getElementById("advancedSearchOverlay");

            advancedSearch.style.display = 'none';
            overlay.style.display = 'none';
        }

        const advancedSearchBtn = document.getElementById("advancedSearchBtn");
        const advancedSearch = document.getElementById("advancedSearch");
        const priceRange = document.getElementById("priceRange");
        const minPrice = document.getElementById("minPrice");
        const maxPrice = document.getElementById("maxPrice");
        const bookType = document.getElementById("bookType");
        const genre = document.getElementById("genre");

        priceRange.addEventListener("change", () => {
        const selectedValue = priceRange.value;
        switch (selectedValue) {
            case "low":
            minPrice.value = "";
            maxPrice.value = 50000;
            break;
            case "50-150":
            minPrice.value = 50000;
            maxPrice.value = 150000;
            break;
            case "150-250":
            minPrice.value = 150000;
            maxPrice.value = 250000;
            break;
            case "high":
            minPrice.value = 250000;
            maxPrice.value = "";
            break;
            default:
            minPrice.value = "";
            maxPrice.value = "";
        }
        });

        // Toggle the advanced search form visibility
        advancedSearchBtn.addEventListener("click", () => {
        const isVisible = advancedSearch.style.display === "block";
        advancedSearch.style.display = isVisible ? "none" : "block";
        });

        
