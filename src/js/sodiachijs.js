var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
  method: "GET", 
  // responseType: "application/json", 
  responseType: "json",
};
var promise = axios(Parameter);
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if(this.value != ""){
      const result = data.filter(n => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}
document.getElementById("btnSave").addEventListener("click", function (e) {
    e.preventDefault();

    // Lấy các input cần kiểm tra
    const txtHo = document.getElementById("txtHo");
    const txtTen = document.getElementById("txtTen");
    const txtSdt = document.getElementById("txtSdt");
    const city = document.getElementById("city");
    const district = document.getElementById("district");
    const ward = document.getElementById("ward");
    const txtDiachi = document.getElementById("txtDiachi");


    // Lấy các thẻ span hiển thị lỗi
    const errorHo = document.getElementById("errorHo");
    const errorTen = document.getElementById("errorTen");
    const errorSdt = document.getElementById("errorSdt");
    const errorCity = document.getElementById("errorCity");
    const errorWard = document.getElementById("errorWard");
    const errorDistrict = document.getElementById("errorDistrict");
    const errorDiachi = document.getElementById("errorDiachi");

    // Hàm kiểm tra input rỗng
    function validateInput(input, errorSpan, message) {
        if (input.value.trim() === "") {
            errorSpan.textContent = message;
            errorSpan.style.display = "block";
            return false;
        } else {
            errorSpan.style.display = "none";
            return true;
        }
    }

    function validatePhoneNumber(input, errorSpan) {
        const phoneNumberPattern = /^[0-9]{10}$/;
        if (!phoneNumberPattern.test(input.value)) {
            errorSpan.textContent = "Số điện thoại phải nhập là số và gồm 10 chữ số";
            errorSpan.style.display = "block";
            return false;
        } else {
            errorSpan.style.display = "none";
            return true;
        }
    }

    // Kiểm tra từng input
    const isHoValid = validateInput(txtHo, errorHo, "Thông tin này quan trọng. Vui lòng không để trống");
    const isTenValid = validateInput(txtTen, errorTen, "Thông tin này quan trọng. Vui lòng không để trống");
    const isSdtValid = validateInput(txtSdt, errorSdt, "Thông tin này quan trọng. Vui lòng không để trống");
    const isPhoneValid = validatePhoneNumber(txtSdt, errorSdt);
    const isCityValid = validateInput(city, errorCity, "Thông tin này quan trọng. Vui lòng không để trống");
    const isDistrictValid = validateInput(district, errorDistrict, "Thông tin này quan trọng. Vui lòng không để trống");
    const isWardValid = validateInput(ward, errorWard, "Thông tin này quan trọng. Vui lòng không để trống");
    const isDiachiValid = validateInput(txtDiachi, errorDiachi, "Thông tin này quan trọng. Vui lòng không để trống");

    // Nếu tất cả đều hợp lệ, thì cho phép lưu thông tin
    if (isHoValid && isTenValid && isSdtValid && isCityValid && isDiachiValid && isDistrictValid && isWardValid && isPhoneValid) {
        alert("Thông tin đã được lưu thành công!");
    }

    //được hợp nhất từ btnSave ở bên dưới
    const addressItem = document.createElement("div");
    addressItem.classList.add("address-item");
    addressItem.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
            <div>
                <strong>${txtHo} ${txtTen} | ${txtSdt}</strong> (Địa chỉ giao hàng)
                <button style="margin-left:83px;" class="edit-btn">Sửa</button>
                <button class="delete-btn">Xoá</button>
            </div>
        </div>
        <p style="width:360px;">${txtDiachi}</p>
        <p style="width:360px;">${ward}, ${district}, ${city}</p>
    `;

    // Thêm địa chỉ vào danh sách
    const addressList = document.getElementById("addressList");
    addressList.appendChild(addressItem);

    // Ẩn dòng chữ "Địa chỉ trống" nếu có
    const emptyAddressText = document.getElementById("emptyAddressText");
    if (emptyAddressText) {
        emptyAddressText.style.display = "none";
    }

    // Xóa nội dung form sau khi lưu
    document.getElementById("frmAddress").reset();

    // Đóng form và hiển thị lại danh sách
    const addressFormSection = document.getElementById("addressFormSection");
    const addAddressSection = document.getElementById("addAddressSection");
    addressFormSection.style.display = "none";
    addAddressSection.style.display = "block";

    // Xoá địa chỉ
    addressItem.querySelector(".delete-btn").addEventListener("click", function () {
        addressList.removeChild(addressItem);
        if (addressList.children.length === 0 && emptyAddressText) {
            emptyAddressText.style.display = "block";
        }
    });

    // Sửa địa chỉ (tạm thời chỉ hiển thị form, bạn có thể bổ sung chức năng này)
    addressItem.querySelector(".edit-btn").addEventListener("click", function () {
        alert("Chức năng sửa chưa được triển khai.");
    });
});
const addNewAddressBtn = document.getElementById("addNewAddressBtn");
const addAddressSection = document.getElementById("addAddressSection");
const addressFormSection = document.getElementById("addressFormSection");

addNewAddressBtn.addEventListener("click", function () {
    addAddressSection.style.display = "none";
    addressFormSection.style.display = "block";
});

// Lưu thông tin vào sổ địa chỉ
const btnSave = document.getElementById("btnSave");
const addressList = document.getElementById("addressList");
const emptyAddressText = document.getElementById("emptyAddressText");

// Mở form thêm địa chỉ
// addNewAddressBtn.addEventListener("click", function () {
//     addAddressSection.style.display = "none";
//     addressFormSection.style.display = "block";
// });

// Lưu thông tin địa chỉ
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

//     // Tạo phần tử hiển thị thông tin địa chỉ
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

//     // Thêm địa chỉ vào danh sách
//     const addressList = document.getElementById("addressList");
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
//         if (addressList.children.length === 0 && emptyAddressText) {
//             emptyAddressText.style.display = "block";
//         }
//     });

//     // Sửa địa chỉ (tạm thời chỉ hiển thị form, bạn có thể bổ sung chức năng này)
//     addressItem.querySelector(".edit-btn").addEventListener("click", function () {
//         alert("Chức năng sửa chưa được triển khai.");
//     });

    
// });