//Hàm kiểm duyệt form thông tin tài khoản
function validateForm() {
    let isValid = true;

    // Reset error messages
    document.getElementById("hoError").style.display = "none";
    document.getElementById("tenError").style.display = "none";
    document.getElementById("sdtError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("genderError").style.display = "none";
    document.getElementById("birthdateError").style.display = "none";

    const ho = document.getElementById("ho").value.trim();
    const ten = document.getElementById("ten").value.trim();
    const sdt = document.getElementById("sdt").value.trim();
    const email = document.getElementById("email").value.trim();
    const gioiTinh = document.querySelector('input[name="gioi_tinh"]:checked');
    const ngay = document.getElementById("ngay").value.trim();
    const thang = document.getElementById("thang").value.trim();
    const nam = document.getElementById("nam").value.trim();
    
   // Validate Họ
   if (!ho) {
    document.getElementById("hoError").style.display = "block";
    isValid = false;
}

// Validate Tên
if (!ten) {
    document.getElementById("tenError").style.display = "block";
    isValid = false;
}

// Validate Số điện thoại
const sdtPattern = /^[0-9]{10}$/;
if (sdt && !sdtPattern.test(sdt)) {
    document.getElementById("sdtError").style.display = "block";
    isValid = false;
}

// Validate Email
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (email && !emailPattern.test(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
}

// Validate Giới tính
if (!gioiTinh) {
    document.getElementById("genderError").style.display = "block";
    isValid = false;
}

// Validate Ngày sinh
if (!ngay || !thang || !nam || ngay < 1 || ngay > 31 || thang < 1 || thang > 12 || nam.length !== 4 || nam < 1900 || nam > 2023) {
    document.getElementById("birthdateError").style.display = "block";
    isValid = false;
}

return isValid;
}
const showAddressFormLink = document.getElementById('showAddressForm');
const formInfoSection = document.querySelector('.form-info');
const addressFormSection = document.getElementById('addressFormSection');
const changePasswordForm = document.getElementById('passwordForm');
const passwordSection = document.querySelector('.passwordSection')
// Thêm sự kiện click cho nút "Sổ địa chỉ"
showAddressFormLink.addEventListener('click', () => {
    // Ẩn phần "form-info"
    formInfoSection.style.display = 'none';
    changePasswordForm.style.display='none';
    // Hiện phần "add-address-form"
    addressFormSection.style.display = 'block';
    
});

const showUserInfoLink= document.getElementById('showUserInfo');
showUserInfoLink.addEventListener('click',() =>{
    addressFormSection.style.display = 'none';
    changePasswordForm.style.display='none';
    formInfoSection.style.display='block';
    
});

const showChangePasswordLink = document.getElementById('showChangePassword');
showChangePasswordLink.addEventListener('click',()=>{
    formInfoSection.style.display = 'none';
    addressFormSection.style.display='none';
    changePasswordForm.style.display='block';
});

document.addEventListener("DOMContentLoaded", function () {
    const addNewAddressBtn = document.getElementById("addNewAddressBtn");
    const addAddressSection = document.getElementById("addAddressSection");
    const addressFormSection = document.getElementById("addressFormSection");

    addNewAddressBtn.addEventListener("click", function () {
        addAddressSection.style.display = "none";
        addressFormSection.style.display = "block";
    });
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
            districts.length = 1;
            wards.length = 1;
            if (this.value !== "") {
                const result = data.filter(n => n.Id === this.value);

                for (const k of result[0].Districts) {
                    districts.options[districts.options.length] = new Option(k.Name, k.Id);
                }
            }
        };
        districts.onchange = function () {
            wards.length = 1;
            const dataCity = data.filter((n) => n.Id === citis.value);
            if (this.value !== "") {
                const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

                for (const w of dataWards) {
                    wards.options[wards.options.length] = new Option(w.Name, w.Id);
                }
            }
        };
    }
});
