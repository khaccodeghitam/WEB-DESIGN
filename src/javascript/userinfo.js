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


    // Validate Ho
    const ho = document.getElementById("ho").value;
    if (ho.trim() === "") {
        document.getElementById("hoError").style.display = "block";
        isValid = false;
    }

    // Validate Ten
    const ten = document.getElementById("ten").value;
    if (ten.trim() === "") {
        document.getElementById("tenError").style.display = "block";
        isValid = false;
    }

    // Validate So dien thoai (optional but numeric only)
    const sdt = document.getElementById("sdt").value;
    const sdtPattern = /^[0-9]{10}$/;
    if (sdt && !sdtPattern.test(sdt)) {
        document.getElementById("sdtError").style.display = "block";
        isValid = false;
    }

    // Validate Email (optional but valid format)
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailPattern.test(email)) {
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Validate Gioi tinh
    const gioiTinhNam = document.getElementById("nam").checked;
    const gioiTinhNu = document.getElementById("nu").checked;
    if (!gioiTinhNam && !gioiTinhNu) {
        document.getElementById("genderError").style.display = "block";
        isValid = false;
    }
 
    // Validate Ngay sinh
    const ngay = document.getElementById("ngay").value;
    const thang = document.getElementById("thang").value;
    const nam = document.getElementById("Nam").value;

    // Thêm dòng console.log để kiểm tra giá trị ngay, thang, nam
    console.log(`Ngay: ${ngay}, Thang: ${thang}, Nam: ${nam}`);

    if (!ngay || !thang || !nam || ngay < 1 || ngay > 31 || thang < 1 || thang > 12 || nam.length !== 4 || nam < 1900 || nam > 2023) {
        document.getElementById("birthdateError").style.display = "block";
        isValid = false;
    }
    return isValid;
}
