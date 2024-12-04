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
const passwordSection = document.querySelector('.passwordSection');
// const showBillSection = document.getElementById('billForm')

// Thêm sự kiện click cho nút "Sổ địa chỉ"
showAddressFormLink.addEventListener('click', () => {
    // Ẩn phần "form-info"
    formInfoSection.style.display = 'none';
    changePasswordForm.style.display='none';
    // Hiện phần "add-address-form"
    addressFormSection.style.display = 'block';
    document.getElementById('billForm').style.display = 'none';

    
});

const showUserInfoLink= document.getElementById('showUserInfo');
showUserInfoLink.addEventListener('click',() =>{
    addressFormSection.style.display = 'none';
    changePasswordForm.style.display='none';
    formInfoSection.style.display='block';
    document.getElementById('billForm').style.display = 'none';

    
});

const showChangePasswordLink = document.getElementById('showChangePassword');
showChangePasswordLink.addEventListener('click',()=>{

    changePasswordForm.style.display='block';
    formInfoSection.style.display = 'none';
    addressFormSection.style.display='none';
    passwordSection.style.display='flex';
    document.getElementById('billForm').style.display = 'none';
});


// const showBillFormLink = document.getElementById('showBillForm');
// showBillFormLink.addEventListener('click',()=>{
//     passwordSection.style.display='none';
//     formInfoSection.style.display='none';
//     addressFormSection.style.display='none';
//     changePasswordForm.style.display='none';
//     showBillSection.style.display = 'block';
//     showBill();
// });

document.getElementById('showBillForm').addEventListener('click', function () {
    hideAllSections(); // Ẩn tất cả các form khác
    document.getElementById('billForm').style.display = 'block'; // Hiển thị bill-container
    showBill();
});

function hideAllSections() {
    document.querySelectorAll('.right-content > div,#passwordForm').forEach(div => {
        div.style.display = 'none';
    });
}

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
function showTermsAndConditions1() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Ẩn tất cả nội dung bên trong middle
    middle.innerHTML = '';

    // Tạo bảng điều khoản sử dụng
    const table = document.createElement('div');
    table.style.width = '80%';
    table.style.margin = '20px auto';
    table.style.padding = '20px';
    table.style.border = '1px solid #ccc';
    table.style.borderRadius = '8px';
    table.style.backgroundColor = '#f9f9f9';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.overflowY = 'auto';
    table.style.maxHeight = '80vh';

    // Nội dung bảng
    table.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px;">Điều Khoản Sử Dụng</h1>
        <p style="margin-bottom: 10px;">
            Chào mừng quý khách đến mua sắm tại BOOKBAY. Sau khi truy cập vào website BOOKBAY để tham khảo hoặc mua sắm, quý khách đã đồng ý tuân thủ và ràng buộc với những quy định của BOOKBAY. Vui lòng xem kỹ các quy định và hợp tác với chúng tôi để xây dựng 1 website BOOKBAY ngày càng thân thiện và phục vụ tốt những yêu cầu của chính quý khách. Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa thuận dưới đây, vui lòng liên hệ với BOOKBAY theo số điện thoại hotline 1900636467 hoặc email cho chúng tôi qua địa chỉ cskh@BOOKBAY.com.vn
        </p>
        <h2 style="margin-bottom: 10px;">Tài khoản của khách hàng</h2>
        <p style="margin-bottom: 10px;">
            Một số dịch vụ, tính năng tại đây yêu cầu quý khách cần phải đăng ký Tài khoản BOOKBAY thì mới có thể sử dụng. Do đó, để tận hưởng đầy đủ các dịch vụ và tính năng này, quý khách vui lòng cho phép BOOKBAY tiến hành xử lý các dữ liệu cá nhân cơ bản sau:
        </p>
        <ul>
            <li style="margin-bottom: 10px;">Dữ liệu cá nhân cơ bản bắt buộc phải cung cấp, là các thông tin giúp xác định danh tính đối với từng tài khoản BOOKBAY, bao gồm họ tên, địa chỉ email, số điện thoại,... của quý khách.</li>
            <li style="margin-bottom: 10px;">Trường hợp quý khách đăng ký tài khoản BOOKBAY thông qua tài khoản Facebook hoặc Google, các dữ liệu cá nhân cơ bản của quý khách cung cấp cho các nền tảng này như họ tên, địa chỉ email, số điện thoại, ảnh đại diện,... sẽ được gửi đến BOOKBAY ngay khi quý khách cho phép BOOKBAY truy cập vào thông tin của quý khách trên các nền tảng này theo từng chính sách của nền tảng.</li>
            <li style="margin-bottom: 10px;">Dữ liệu cá nhân cơ bản được cung cấp để phục vụ giao dịch, là các thông tin cần thiết để thực hiện một giao dịch tại website BOOKBAY.com, bao gồm địa chỉ giao hàng, địa chỉ thanh toán, phương thức thanh toán,... của quý khách.</li>
            <li style="margin-bottom: 10px;">Dữ liệu cá nhân cơ bản tự nguyện cung cấp, là các thông tin mà quý khách có thể chia sẻ (hoặc không) để cá nhân hóa trải nghiệm sử dụng dịch vụ tại BOOKBAY, bao gồm ngày tháng năm sinh, giới tính, sở thích, nghề nghiệp,... của quý khách.</li>
        </ul>
        <p style="margin-bottom: 10px;">
            Việc sử dụng và bảo mật thông tin Tài khoản BOOKBAY là trách nhiệm và quyền lợi của quý khách khi sử dụng dịch vụ tại BOOKBAY. Quý khách phải giữ kín mật khẩu và tài khoản, hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra thông qua việc sử dụng mật khẩu hoặc tài khoản của mình. Quý khách nên đảm bảo thoát khỏi Tài khoản BOOKBAY sau mỗi lần sử dụng để bảo mật dữ liệu cá nhân của mình.
        </p>
        <p style="margin-bottom: 10px;">
            Trong trường hợp thông tin do quý khách cung cấp không đầy đủ hoặc có sai sót dẫn đến việc không thể giao hàng cho quý khách, chúng tôi có quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu bất cứ trách nhiệm nào đối với quý khách. Khi có những thay đổi thông tin của quý khách, vui lòng cập nhật lại thông tin trong Tài khoản BOOKBAY.
        </p>
        <h2 style="margin-bottom: 10px;">Quyền lợi bảo mật dữ liệu cá nhân của khách hàng</h2>
        <p style="margin-bottom: 10px;">
            Khi sử dụng dịch vụ tại website BOOKBAY, quý khách được đảm bảo rằng những thông tin cung cấp cho chúng tôi sẽ chỉ được dùng để nâng cao chất lượng dịch vụ dành cho khách hàng của BOOKBAY và sẽ không được chuyển giao cho một bên thứ ba nào khác vì mục đích thương mại. Trường hợp quý khách có yêu cầu: rút lại sự đồng ý, xóa, chỉnh sửa, phản đối, yêu cầu cung cấp, yêu cầu hạn chế xử lý đối với các dữ liệu cá nhân của mình, quý khách vui lòng thao tác trên hệ thống website hoặc liên hệ với BOOKBAY theo số điện thoại hotline 1900636467 hoặc email cho chúng tôi qua địa chỉ cskh@BOOKBAY.com.vn.
        </p>
        <p style="margin-bottom: 10px;">
            Dữ liệu cá nhân của quý khách tại BOOKBAY sẽ được chúng tôi bảo mật và chỉ trong trường hợp pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan có thẩm quyền.
        </p>
        <h2 style="margin-bottom: 10px;">Trách nhiệm của khách hàng khi sử dụng dịch vụ của BOOKBAY</h2>
        <p style="margin-bottom: 10px;">
            Quý khách tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại website BOOKBAY...
        </p>
        <!-- Tiếp tục thêm đầy đủ các đoạn còn lại theo đúng nội dung mà bạn đã cung cấp -->
    `;

    // Hiển thị bảng trong phần middle
    middle.appendChild(table);
}

function showTermsAndConditions3() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Ẩn tất cả nội dung bên trong middle
    middle.innerHTML = '';

    // Tạo bảng điều khoản sử dụng
    const table = document.createElement('div');
    table.style.width = '80%';
    table.style.margin = '20px auto';
    table.style.padding = '20px';
    table.style.border = '1px solid #ccc';
    table.style.borderRadius = '8px';
    table.style.backgroundColor = '#f9f9f9';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.overflowY = 'auto';
    table.style.maxHeight = '80vh';

    // Nội dung bảng
    table.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">CHÍNH SÁCH BẢO MẬT</h1>

        <h2 style="margin: 20px 0;">DỮ LIỆU CÁ NHÂN CỦA KHÁCH HÀNG</h2>
        <p style="margin-bottom: 10px;">
            BOOKBAY mong muốn đem lại một tiện ích mua hàng trực tuyến tin cậy, tiết kiệm và thấu hiểu người dùng. Chúng tôi nhận thấy khách hàng sử dụng website BOOKBAY.com để mua sắm nhưng không phải ai cũng mong muốn chia sẻ dữ liệu cá nhân của mình. Chúng tôi, Công ty BOOKBAY, tôn trọng quyền riêng tư của khách hàng và cam kết bảo mật dữ liệu cá nhân của khách hàng khi khách hàng tin vào chúng tôi và cung cấp dữ liệu cá nhân của mình cho chúng tôi để mua sắm tại website BOOKBAY.com. Đây là nguyên tắc khi tiếp cận quyền riêng tư đối với dữ liệu cá nhân của khách hàng tại website BOOKBAY.com.
        </p>

        <h3 style="margin: 20px 0;">Chính Sách Bảo Mật Dữ Liệu Cá Nhân này bao gồm các nội dung:</h3>
        <ul style="margin-bottom: 10px;">
            <li style="margin-bottom: 10px;">1. Sự Chấp Thuận</li>
            <li style="margin-bottom: 10px;">2. Phạm Vi Thu Thập</li>
            <li style="margin-bottom: 10px;">3. Mục Đích Xử Lý Dữ Liệu</li>
            <li style="margin-bottom: 10px;">4. Cách Thức Xử Lý Dữ Liệu</li>
            <li style="margin-bottom: 10px;"i>5. Thời Gian Lưu Trữ</li>
            <li style="margin-bottom: 10px;">6. Không Chia Sẻ Dữ Liệu Cá Nhân Khách Hàng</li>
            <li style="margin-bottom: 10px;">7. An Toàn Dữ Liệu</li>
            <li style="margin-bottom: 10px;">8. Hậu Quả, Thiệt Hại Không Mong Muốn Có Khả Năng Xảy Ra</li>
            <li style="margin-bottom: 10px;">9. Quyền, Nghĩa Vụ Của Khách Hàng Đối Với Dữ Liệu Cá Nhân</li>
            <li style="margin-bottom: 10px;">10. Thông Tin Liên Hệ</li>
            <li style="margin-bottom: 10px;">11. Các Tổ Chức, Cá Nhân Liên Quan Đến Việc Xử Lý Dữ Liệu</li>
            <li style="margin-bottom: 10px;">12. Hiệu Lực</li>
        </ul>

        <h3 style="margin: 20px 0;">1. Sự Chấp Thuận</h3>
        <p style="margin-bottom: 10px;">
            Một thông báo sẽ được gửi cho quý khách trước khi BOOKBAY tiến hành bất kỳ hoạt động xử lý dữ liệu cá nhân nào. Do đó, việc quý khách xác nhận đồng ý cho phép BOOKBAY xử lý dữ liệu cá nhân của mình đồng nghĩa với việc quý khách đã đọc, hiểu rõ và tự nguyện đồng ý đối với các nội dung được nêu ra trong Chính Sách Bảo Mật Dữ Liệu Cá Nhân này. BOOKBAY cam kết rằng việc xử lý dữ liệu là đúng với mục đích, phù hợp và giới hạn trong phạm vi của Chính Sách Bảo Mật Dữ Liệu Cá Nhân. Trường hợp quý khách không đồng ý với toàn bộ hoặc một phần của Chính Sách này, quý khách có thể sử dụng các quyền như được nêu tại Mục 7 dưới đây. Chúng tôi bảo lưu quyền sửa đổi, bổ sung nhằm hoàn thiện đối với Chính Sách này vào bất kỳ thời điểm nào. Chúng tôi khuyến khích quý khách thường xuyên xem lại Chính Sách này để biết các cập nhật.
        </p>

        <h3 style="margin: 20px 0;">2. Phạm Vi Thu Thập</h3>
        <p style="margin-bottom: 10px;">
            Dữ liệu cá nhân mà BOOKBAY thu thập được từ khách hàng bao gồm các thông tin cá nhân mà khách hàng cung cấp khi đăng ký tài khoản, mua hàng, thanh toán, sử dụng các dịch vụ hoặc tham gia các chương trình khuyến mãi.
        </p>

        <h3 style="margin: 20px 0; style="margin-bottom: 10px;"">3. Mục Đích Xử Lý Dữ Liệu</h3>
        <p style="margin-bottom: 10px;">
            BOOKBAY thu thập và sử dụng thông tin của khách hàng để cung cấp dịch vụ, hỗ trợ khách hàng, thông báo về sản phẩm và dịch vụ, cải tiến chất lượng dịch vụ, và gửi các chương trình khuyến mãi, quảng cáo phù hợp.
        </p>

        <h3 style="margin: 20px 0;">4. Cách Thức Xử Lý Dữ Liệu</h3>
        <p style="margin-bottom: 10px;">
            Dữ liệu cá nhân của khách hàng sẽ được lưu trữ và xử lý trong hệ thống của BOOKBAY, đảm bảo bảo mật và chỉ sử dụng cho các mục đích liên quan đến dịch vụ của BOOKBAY.
        </p>

        <h3 style="margin: 20px 0;">5. Thời Gian Lưu Trữ</h3>
        <p style="margin-bottom: 10px;">
            Dữ liệu cá nhân của khách hàng sẽ được lưu trữ trong thời gian cần thiết để thực hiện các mục đích đã thông báo hoặc theo yêu cầu của pháp luật.
        </p>

        <h3 style="margin: 20px 0;">6. Không Chia Sẻ Dữ Liệu Cá Nhân Khách Hàng</h3>
        <p style="margin-bottom: 10px;">
            BOOKBAY cam kết không chia sẻ dữ liệu cá nhân của khách hàng cho bất kỳ bên thứ ba nào, trừ khi có sự đồng ý của khách hàng hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền.
        </p>

        <h3 style="margin: 20px 0;">7. An Toàn Dữ Liệu</h3>
        <p style="margin-bottom: 10px;">
            BOOKBAY thực hiện các biện pháp bảo mật dữ liệu cao nhất để đảm bảo rằng thông tin cá nhân của khách hàng không bị rò rỉ, truy cập trái phép hoặc bị mất mát.
        </p>

        <h3 style="margin: 20px 0;">8. Hậu Quả, Thiệt Hại Không Mong Muốn Có Khả Năng Xảy Ra</h3>
        <p style="margin-bottom: 10px;">
            Nếu có sự cố xảy ra dẫn đến mất mát hoặc rò rỉ dữ liệu cá nhân của khách hàng, BOOKBAY sẽ thông báo ngay lập tức và khắc phục sự cố nhanh chóng để bảo vệ quyền lợi của khách hàng.
        </p>

        <h3 style="margin: 20px 0;">9. Quyền, Nghĩa Vụ Của Khách Hàng Đối Với Dữ Liệu Cá Nhân</h3>
        <p style="margin-bottom: 10px;">
            Khách hàng có quyền yêu cầu chỉnh sửa, cập nhật, hoặc yêu cầu xóa bỏ dữ liệu cá nhân của mình bất kỳ lúc nào thông qua tài khoản hoặc liên hệ với BOOKBAY.
        </p>

        <h3 style="margin: 20px 0;">10. Thông Tin Liên Hệ</h3>
        <p style="margin-bottom: 10px;">
            Nếu có bất kỳ câu hỏi nào liên quan đến Chính Sách Bảo Mật này, khách hàng có thể liên hệ với BOOKBAY qua email hoặc số điện thoại đã cung cấp trên website.
        </p>

        <h3 style="margin: 20px 0;">11. Các Tổ Chức, Cá Nhân Liên Quan Đến Việc Xử Lý Dữ Liệu</h3>
        <p style="margin-bottom: 10px;">
            Các tổ chức, cá nhân có liên quan đến việc xử lý dữ liệu cá nhân của khách hàng sẽ được BOOKBAY chọn lựa kỹ lưỡng và cam kết bảo mật theo các yêu cầu của Chính Sách Bảo Mật.
        </p>

        <h3 style="margin: 20px 0;">12. Hiệu Lực</h3>
        <p style="margin-bottom: 10px;">
            Chính Sách Bảo Mật này có hiệu lực kể từ ngày khách hàng đồng ý sử dụng dịch vụ của BOOKBAY. Mọi thay đổi sẽ được thông báo đến khách hàng.
        </p>
    `;

    // Hiển thị bảng trong phần middle
    middle.appendChild(table);
}

function showTermsAndConditions2() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Ẩn tất cả nội dung bên trong middle
    middle.innerHTML = '';

    // Tạo bảng điều khoản sử dụng
    const table = document.createElement('div');
    table.style.width = '80%';
    table.style.margin = '20px auto';
    table.style.padding = '20px';
    table.style.border = '1px solid #ccc';
    table.style.borderRadius = '8px';
    table.style.backgroundColor = '#f9f9f9';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.overflowY = 'auto';
    table.style.maxHeight = '80vh';

    // Nội dung bảng
    table.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">CHÍNH SÁCH BẢO MẬT THANH TOÁN</h1>

        <h2 style="margin: 20px 0;">1. Sự Chấp Thuận</h2>
        <p style="margin-bottom: 10px;">
            Hệ thống thanh toán thẻ được cung cấp bởi các đối tác thanh toán (“Đối tác cổng thanh toán”) đã được cấp phép hoạt động hợp pháp tại Việt Nam. Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ tại BOOKBAY đảm bảo tuân thủ theo các tiêu chuẩn bảo mật ngành.
        </p>

        <h2 style="margin: 20px 0;">2. Quy định bảo mật</h2>
        <p style="margin-bottom: 10px;">
            Chính sách giao dịch thanh toán bằng thẻ quốc tế và thẻ nội địa (internet banking) đảm bảo tuân thủ các tiêu chuẩn của các Đối tác cổng thanh toán gồm:
        </p>
        <ul style="margin-bottom: 10px;">
            <li style="margin-bottom: 10px;">Thông tin tài chính của khách hàng sẽ được bảo vệ trong suốt quá trình giao dịch bằng giao thức SSL (Secure Sockets Layer) bằng cách mã hóa tất cả các thông tin khách hàng nhập vào.</li>
            <li style="margin-bottom: 10px;">Chứng nhận tiêu chuẩn bảo mật dữ liệu thông tin thanh toán (PCI DSS) do Trustwave cung cấp.</li>
            <li style="margin-bottom: 10px;">Mật khẩu sử dụng một lần (OTP) được gửi qua SMS để đảm bảo việc truy cập tài khoản được xác thực.</li>
            <li style="margin-bottom: 10px;">Tiêu chuẩn mã hóa MD5 12 bit.</li>
            <li style="margin-bottom: 10px;">Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của Ngân hàng Nhà nước Việt Nam.</li>
        </ul>
        <p style="margin-bottom: 10px;">
            Chính sách bảo mật giao dịch trong thanh toán của BOOKBAY áp dụng với khách hàng:
        </p>
        <ul style="margin-bottom: 10px;">
            <li style="margin-bottom: 10px;">BOOKBAY cung cấp tiện ích lưu giữ Token – chỉ lưu giữ chuỗi đã được mã hóa bởi Đối Tác Cổng Thanh Toán cung cấp cho BOOKBAY. BOOKBAY không trực tiếp lưu giữ thông tin thẻ khách hàng. Việc bảo mật thông tin thẻ thanh toán khách hàng được thực hiện bởi Đối Tác Cổng Thanh Toán đã được cấp phép.</li>
            <li style="margin-bottom: 10px;">Đối với thẻ quốc tế, thông tin thẻ thanh toán của khách hàng mà có khả năng sử dụng để xác lập giao dịch không được lưu trên hệ thống của BOOKBAY. Đối Tác Cổng Thanh Toán sẽ lưu trữ và bảo mật.</li>
            <li style="margin-bottom: 10px;">Đối với thẻ nội địa (internet banking), BOOKBAY chỉ lưu trữ mã đơn hàng, mã giao dịch và tên Ngân hàng.</li>
            <li style="margin-bottom: 10px;">Trong trường hợp khách hàng có bất kỳ thông báo hoặc khiếu nại nào về tình trạng thông tin thanh toán của khách hàng khi mua hàng qua website/ ứng dụng của BOOKBAY bị thay đổi, xóa, hủy, sao chép, tiết lộ, di chuyển trái phép hoặc bị chiếm đoạt gây thiệt hại cho khách hàng thì BOOKBAY sẽ nỗ lực phối hợp với Đối Tác Cổng Thanh Toán để tìm hiểu vấn đề và hỗ trợ xử lý cho đến khi hoàn tất vấn đề khách hàng đang gặp phải.</li>
        </ul>
        <p style="margin-bottom: 10px;">
            BOOKBAY cam kết đảm bảo thực hiện nghiêm túc các biện pháp bảo mật cần thiết cho mọi hoạt động thanh toán thực hiện qua website/ ứng dụng của BOOKBAY.
        </p>
        <p style="margin-bottom: 10px;">
            Các quy định tại Chính Sách Bảo Mật Dữ Liệu Cá Nhân cũng sẽ được áp dụng đồng thời để đảm bảo an toàn các thông tin thanh toán của khách hàng (vui lòng xem chi tiết tại đây).
        </p>

        <h2 style="margin: 20px 0;">3. Hiệu Lực</h2>
        <p style="margin-bottom: 10px;">
            Chính Sách Bảo Mật Thanh Toán này được cập nhật và có hiệu lực từ ngày 01/06/2024.
        </p>
        <p style="margin-bottom: 10px;">
            BOOKBAY có thể điều chỉnh Chính Sách này vào bất kỳ thời điểm nào, và đăng tải công khai Chính Sách đã được điều chỉnh trên website BOOKBAY.com. Việc khách hàng tiếp tục sử dụng dịch vụ của BOOKBAY mà không có bất kỳ khiếu nại nào đối với Chính Sách được điều chỉnh sẽ được hiểu rằng khách hàng đã chấp thuận Chính Sách được điều chỉnh đó của BOOKBAY.
        </p>
    `;

    // Hiển thị bảng trong phần middle
    middle.appendChild(table);
}
function showTermsAndConditions4() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Ẩn tất cả nội dung bên trong middle
    middle.innerHTML = '';

    // Tạo bảng điều khoản sử dụng
    const table = document.createElement('div');
    table.style.width = '80%';
    table.style.margin = '20px auto';
    table.style.padding = '20px';
    table.style.border = '1px solid #ccc';
    table.style.borderRadius = '8px';
    table.style.backgroundColor = '#f9f9f9';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.overflowY = 'auto';
    table.style.maxHeight = '80vh';

    // Nội dung bảng
    table.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">Chính Sách Đơn Hàng Sỉ</h1>
        <p style="margin-bottom: 10px;">
            Hiện nay, do mức chiết khấu trên BOOKBAY.com rất cao, đặc biệt vào các thời điểm chạy chương trình. Do đó đối với mỗi chương trình số lượng sản phẩm giảm sốc có giới hạn nhất định, vì vậy để đảm bảo quyền lợi của từng khách hàng, chúng tôi xin thông báo chính sách “Đơn Hàng Sỉ” như sau:
        </p>
        <h2 style="margin-top: 20px;">Chính sách giá (% chiết khấu giảm giá)</h2>
        <p style="margin-bottom: 10px;">
            Đây là chính sách chung chỉ mang tính tương đối. Đối với khách hàng có nhu cầu đặt sỉ, xin Quý khách vui lòng liên lạc với BOOKBAY để có chính sách giá chính xác nhất:
        </p>
        <ul style="margin-bottom: 10px;">
            <li>Đối với Nhóm hàng sách Kinh tế, Văn học: áp dụng mức giảm giá trên web tối đa không vượt quá <b>30%</b>.</li>
            <li>Đối với Nhóm hàng sách Thiếu nhi, Tâm lý kỹ năng: áp dụng mức giảm giá trên web tối đa không vượt quá <b>20%</b>.</li>
            <li>Đối với Nhóm hàng Văn phòng phẩm, Đồ chơi, Dụng cụ học sinh: áp dụng mức giảm giá trên web tối đa không vượt quá <b>15%</b>.</li>
            <li>Đối với Nhóm hàng sách Từ điển, Ngoại văn: áp dụng mức giảm giá trên web tối đa không vượt quá <b>10%</b>.</li>
            <li>Đối với Nhóm hàng Giấy photo, Sản phẩm điện tử, Văn hóa phẩm: áp dụng mức giảm giá trên web tối đa không vượt quá <b>5%</b>.</li>
        </ul>
        <p style="margin-bottom: 10px;">
            Quý khách có nhu cầu mua sỉ, vui lòng liên hệ phòng kinh doanh BOOKBAY.com qua:
        </p>
        <ul style="margin-bottom: 10px;">
            <li>Hotline: <b>1900 63 64 67</b></li>
            <li>Email: <b>sales@BOOKBAY.com.vn</b></li>
        </ul>
    `;

    // Hiển thị bảng trong phần middle
    middle.appendChild(table);
}
function showShippingPolicy() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Xóa toàn bộ nội dung hiện tại
    middle.innerHTML = '';

    // Tạo bảng hiển thị chính sách
    const policyContainer = document.createElement('div');
    policyContainer.style.width = '80%';
    policyContainer.style.margin = '20px auto';
    policyContainer.style.padding = '20px';
    policyContainer.style.border = '1px solid #ccc';
    policyContainer.style.borderRadius = '8px';
    policyContainer.style.backgroundColor = '#f9f9f9';
    policyContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    policyContainer.style.overflowY = 'auto';
    policyContainer.style.maxHeight = '80vh';

    // Nội dung chính sách
    policyContainer.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">CHÍNH SÁCH VẬN CHUYỂN/ĐÓNG GÓI</h1>
        <p>Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Fahasa.com</p>
        <h2>1. Chính sách vận chuyển:</h2>
        <p>
            Fahasa.com cung cấp dịch vụ giao hàng toàn quốc, gửi hàng tận nơi đến địa chỉ cung cấp của Quý khách.
            Thời gian giao hàng dự kiến phụ thuộc vào kho có hàng và địa chỉ nhận hàng của Quý khách.
        </p>
        <p>
            Với đa phần đơn hàng, Fahasa.com cần vài giờ làm việc để kiểm tra thông tin và đóng gói hàng. Nếu các sản phẩm
            đều có sẵn hàng, Fahasa.com sẽ nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn hàng có sản phẩm sắp phát hành,
            Fahasa.com sẽ ưu tiên giao những sản phẩm có hàng trước cho Quý khách hàng.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ccc; padding: 8px;">Tuyến</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Khu vực</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Thời gian dự kiến</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">Hồ Chí Minh – Hồ Chí Minh</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Nội thành</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">1 – 2 ngày</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">Hồ Chí Minh – Miền Nam</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Trung tâm Tỉnh, Thành phố, Thị xã</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">2 ngày</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">Hồ Chí Minh – Miền Trung</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Huyện, xã</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">3 – 4 ngày</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">Hồ Chí Minh – Miền Bắc</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Trung tâm Tỉnh, Thành phố, Thị xã</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">4 ngày</td>
                </tr>
            </tbody>
        </table>
        <h2 style="margin-top: 20px;">2. Bảng giá dịch vụ vận chuyển hàng hóa:</h2>
        <p>Khu vực giao: <b>Nội thành Hồ Chí Minh, Hà Nội</b></p>
        <ul>
            <li>Phí vận chuyển: 20.000 VNĐ/2kg (+2.000 VNĐ mỗi 1kg tiếp theo).</li>
            <li>Quý khách kiểm tra phí vận chuyển tại bước “Thanh toán”.</li>
        </ul>
        <p>Khu vực giao: <b>Các khu vực còn lại</b></p>
        <ul>
            <li>Phí vận chuyển: 32.000 VNĐ/2kg (+3.000 VNĐ mỗi 1kg tiếp theo).</li>
            <li>Quý khách kiểm tra phí vận chuyển tại bước “Thanh toán”.</li>
        </ul>
        <p style="margin-top: 10px;">Chính sách có hiệu lực từ ngày 17/05/2024.</p>
        <h2 style="margin-top: 20px;">3. Một số lưu ý khi nhận hàng:</h2>
        <ul>
            <li>Bưu tá sẽ liên hệ qua điện thoại trước khi giao hàng.</li>
            <li>Nếu không liên lạc được sau 3 lần, đơn hàng sẽ bị hủy.</li>
            <li>Quý khách có quyền từ chối nhận hàng nếu sản phẩm không đúng như mô tả.</li>
        </ul>
    `;

    // Thêm nội dung vào phần tử middle
    middle.appendChild(policyContainer);
}
function showWarrantyPolicy() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Xóa toàn bộ nội dung hiện tại
    middle.innerHTML = '';

    // Tạo container hiển thị chính sách
    const policyContainer = document.createElement('div');
    policyContainer.style.width = '80%';
    policyContainer.style.margin = '20px auto';
    policyContainer.style.padding = '20px';
    policyContainer.style.border = '1px solid #ccc';
    policyContainer.style.borderRadius = '8px';
    policyContainer.style.backgroundColor = '#f9f9f9';
    policyContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    policyContainer.style.overflowY = 'auto';
    policyContainer.style.maxHeight = '80vh';

    // Nội dung chính sách
    policyContainer.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">CHÍNH SÁCH BẢO HÀNH – BỒI HOÀN</h1>
        <p>Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Fahasa.com</p>
        <h2 style="margin: 10px 0;">1. Tôi có thể bảo hành sản phẩm tại đâu?</h2>
        <ul>
            <li>
                <b>Bảo hành chính hãng:</b> Đối với các sản phẩm điện tử, đồ chơi điện tử,... có tem phiếu cam kết bảo hành từ Hãng,
                khách hàng có thể mang sản phẩm đến trực tiếp Hãng để bảo hành mà không cần thông qua Fahasa.com.
            </li>
            <li>
                <b>Bảo hành thông qua Fahasa.com:</b> Khách hàng liên hệ hotline <b>1900636467</b> hoặc truy cập 
                <a href="https://www.fahasa.com/chinh-sach-bao-hanh-san-pham" target="_blank">www.fahasa.com/chinh-sach-bao-hanh-san-pham</a>
                để được hỗ trợ tư vấn về thực hiện bảo hành.
            </li>
        </ul>
        <h2 style="margin: 10px 0;">2. Tôi có thể được bảo hành sản phẩm miễn phí không?</h2>
        <p>Sản phẩm của quý khách được bảo hành miễn phí chính hãng khi:</p>
        <ul>
            <li>Còn thời hạn bảo hành (dựa trên tem/phiếu bảo hành hoặc thời điểm kích hoạt bảo hành điện tử).</li>
            <li>Tem/phiếu bảo hành còn nguyên vẹn.</li>
            <li>Sản phẩm bị lỗi kỹ thuật.</li>
        </ul>
        <p>Các trường hợp có thể phát sinh phí bảo hành:</p>
        <ul>
            <li>Sản phẩm hết thời hạn bảo hành.</li>
            <li>Sản phẩm bị bể, biến dạng, cháy, nổ, ẩm thấp hoặc hư hỏng trong quá trình sử dụng.</li>
            <li>Sản phẩm bị hư hỏng do lỗi của người sử dụng, không xuất phát từ lỗi vốn có của hàng hóa.</li>
        </ul>
        <h2 style="margin: 10px 0;">3. Sau bao lâu tôi có thể nhận lại sản phẩm bảo hành?</h2>
        <p>
            Nếu sản phẩm của quý khách vẫn còn trong thời hạn bảo hành, Fahasa khuyến khích quý khách gửi trực tiếp đến trung tâm của Hãng
            để được hỗ trợ bảo hành nhanh nhất. Nếu gửi hàng về Fahasa.com, thời gian bảo hành dự kiến trong vòng <b>21 – 45 ngày</b>,
            tùy thuộc vào điều kiện linh kiện thay thế và lỗi sản phẩm (không tính thời gian vận chuyển).
        </p>
        <h2 style="margin: 10px 0;">4. Fahasa.com bảo hành bằng các hình thức nào?</h2>
        <ul>
            <li>
                <b>Hóa đơn:</b> Khách hàng mang theo hóa đơn trực tiếp hoặc hóa đơn giá trị gia tăng có thông tin sản phẩm để được bảo hành.
            </li>
            <li>
                <b>Phiếu bảo hành:</b> Đi kèm sản phẩm, có đầy đủ thông tin về nơi bảo hành và điều kiện bảo hành.
            </li>
            <li>
                <b>Tem bảo hành:</b> Tem đặc biệt chỉ sử dụng một lần, dán trực tiếp lên sản phẩm. Tem phải còn nguyên vẹn và trong thời hạn bảo hành.
            </li>
            <li>
                <b>Bảo hành điện tử:</b> Nhắn tin SMS kích hoạt, quét mã QR-Code, đăng ký trên website hoặc ứng dụng bảo hành.
            </li>
        </ul>
        <h2 style="margin: 10px 0;">5. Fahasa.com có bảo hành quà tặng kèm sản phẩm không?</h2>
        <p>Fahasa.com rất tiếc hiện chưa hỗ trợ bảo hành quà tặng đi kèm sản phẩm chính.</p>
        <p>
            <b>Lưu ý:</b> Quý khách cần cung cấp hình ảnh hoặc clip sản phẩm lỗi khi yêu cầu bảo hành. Fahasa.com sẽ từ chối xử lý khi không nhận đủ thông tin cần thiết.
        </p>
        <p style="margin-top: 20px;">Chính sách sẽ được áp dụng và có hiệu lực từ ngày <b>01/08/2022</b>.</p>
    `;

    // Thêm nội dung vào phần tử middle
    middle.appendChild(policyContainer);
}
function showWholesalePolicy() {
    // Chọn phần tử đầu tiên có class "middle"
    const middle = document.querySelector('.middle');

    // Xóa toàn bộ nội dung hiện tại
    middle.innerHTML = '';

    // Tạo container hiển thị chính sách
    const policyContainer = document.createElement('div');
    policyContainer.style.width = '80%';
    policyContainer.style.margin = '20px auto';
    policyContainer.style.padding = '20px';
    policyContainer.style.border = '1px solid #ccc';
    policyContainer.style.borderRadius = '8px';
    policyContainer.style.backgroundColor = '#f9f9f9';
    policyContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    policyContainer.style.overflowY = 'auto';
    policyContainer.style.maxHeight = '80vh';

    // Nội dung chính sách
    policyContainer.innerHTML = `
        <h1 style="text-align: center; color: #333; font-size: 2rem; margin: 10px 0;">CHÍNH SÁCH KHÁCH SỈ</h1>
        <p>
            Hiện nay, do mức chiết khấu trên Fahasa.com rất cao, đặc biệt vào các thời điểm chạy chương trình. 
            Do đó, đối với mỗi chương trình số lượng sản phẩm giảm sốc có giới hạn nhất định, để đảm bảo quyền lợi của từng khách hàng, 
            chúng tôi xin thông báo chính sách “Đơn Hàng Sỉ” như sau:
        </p>
        <h2>Chính sách giá (% chiết khấu giảm giá)</h2>
        <p>
            Đây là chính sách chung chỉ mang tính tương đối. Đối với khách hàng có nhu cầu đặt sỉ, xin Quý khách vui lòng liên lạc với Fahasa để được tư vấn chính sách giá chính xác nhất:
        </p>
        <ul>
            <li><b>1.</b> Đối với Nhóm hàng sách Kinh tế, Văn học: áp dụng mức giảm giá trên web tối đa không vượt quá <b>30%</b>.</li>
            <li><b>2.</b> Đối với Nhóm hàng sách Thiếu nhi, Tâm lý kỹ năng: áp dụng mức giảm giá trên web tối đa không vượt quá <b>20%</b>.</li>
            <li><b>3.</b> Đối với Nhóm hàng Văn phòng phẩm, Đồ chơi, Dụng cụ học sinh: áp dụng mức giảm giá trên web tối đa không vượt quá <b>15%</b>.</li>
            <li><b>4.</b> Đối với Nhóm hàng sách Từ điển, Ngoại văn: áp dụng mức giảm giá trên web tối đa không vượt quá <b>10%</b>.</li>
            <li><b>5.</b> Đối với Nhóm hàng Giấy photo, Sản phẩm điện tử, Văn hóa phẩm: áp dụng mức giảm giá trên web tối đa không vượt quá <b>5%</b>.</li>
        </ul>
        <p>
            Quý khách có nhu cầu mua sỉ, vui lòng liên hệ phòng kinh doanh Fahasa.com qua số hotline: <b>1900 63 64 67</b> 
            hoặc Email: <a href="mailto:sales@fahasa.com.vn">sales@fahasa.com.vn</a> để được tư vấn.
        </p>
    `;

    // Thêm nội dung vào phần tử middle
    middle.appendChild(policyContainer);
}
