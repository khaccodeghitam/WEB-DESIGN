var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
  method: "GET", 
  responseType: "application/json", 
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
  setSelectedAddress(data);
}
function saveAddress() {
  // Lấy thông tin địa chỉ từ form
  // const city = document.getElementById("city").value;
  // const district = document.getElementById("district").value;
  // const ward = document.getElementById("ward").value;
  // const address = document.getElementById("txtDiachi").value;

  const city = citis.value;
  const district = districts.value; // Dùng biến toàn cục "districts"
  const ward = wards.value; // Dùng biến toàn cục "wards"
  const address = document.getElementById("txtDiachi").value;

  // Kiểm tra xem có người dùng đăng nhập hay không
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
 

 
  // loggedInUser.address = {
  //   city: citis.value,
  //   district: districts.value,
  //   ward: wards.value,
  //   address: document.getElementById("txtDiachi").value,
  // };

  loggedInUser.address = {
    city: city || "", // Gán giá trị hoặc chuỗi rỗng nếu không có
    district: district || "",
    ward: ward || "",
    address: address || "",
  };
  
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  

  // Đồng bộ dữ liệu vào danh sách tài khoản
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(user => user.username === loggedInUser.username);
  if (userIndex !== -1) {
      users[userIndex] = loggedInUser;
  }
  localStorage.setItem("users", JSON.stringify(users));

  // Thông báo thành công
  alert("Địa chỉ đã được lưu!");
}

function setSelectedAddress(data) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser || !loggedInUser.address) return;

  const { city, district, ward, address } = loggedInUser.address;

  if (city) {
    // Chọn thành phố
    citis.value = city;
    citis.dispatchEvent(new Event("change")); // Kích hoạt sự kiện để load quận/huyện

    setTimeout(() => {
      if (district) {
        // Chọn quận/huyện
        districts.value = district;
        districts.dispatchEvent(new Event("change")); // Kích hoạt sự kiện để load phường/xã

        setTimeout(() => {
          if (ward) {
            // Chọn phường/xã
            wards.value = ward;
          }
        }, 500); // Đợi dữ liệu phường/xã được load
      }
    }, 500); // Đợi dữ liệu quận/huyện được load
  }
  if (address) {
    document.getElementById("txtDiachi").value = address;
  }
}

document.getElementById("btnSave").addEventListener("click", function () {
  if (citis.value === "" || districts.value === "" || wards.value === "" || document.getElementById("txtDiachi").value === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  saveAddress();
});




// Gọi hàm này khi trang được tải




// Lưu thông tin vào sổ địa chỉ
const btnSave = document.getElementById("btnSave");
const addressList = document.getElementById("addressList");
const emptyAddressText = document.getElementById("emptyAddressText");

