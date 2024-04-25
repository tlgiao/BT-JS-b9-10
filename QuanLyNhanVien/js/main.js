const staffList = [];
const modalEl = document.getElementById("myModal");

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/;
const regexDate = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
const getJSONfromLocal = localStorage.getItem("STAFFLIST");

if (getJSONfromLocal !== null) {
  const dataStaffListRaw = JSON.parse(getJSONfromLocal);

  dataStaffListRaw.forEach((staff) => {
    const newStaff = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.datepicker,
      staff.salary,
      staff.position,
      staff.hoursWorking
    );
    staffList.push(newStaff);
  });
  renderNewStaffList(staffList);
}
const addBtnEl = document.getElementById("btnThemNV");
const updateBtnEl = document.getElementById("btnCapNhat");

addBtnEl.addEventListener("click", handleAddStudent);
if (document.getElementById("btnCapNhat").disabled === false) {
  document.getElementById("btnCapNhat").disabled = true;
}
function handleAddStudent() {
  const idEl = +document.getElementById("tknv").value;
  const nameEl = document.getElementById("name").value;
  const emailEl = document.getElementById("email").value;
  const passwordEl = document.getElementById("password").value;
  const datepickerEl = document.getElementById("datepicker").value;
  const salaryEl = +document.getElementById("luongCB").value;
  const positionEl = document.getElementById("chucvu").value;
  const hoursWorkingEl = +document.getElementById("gioLam").value;

  const newStaff = new Staff(
    idEl,
    nameEl,
    emailEl,
    passwordEl,
    datepickerEl,
    salaryEl,
    positionEl,
    hoursWorkingEl
  );
  let isValid = validate();
  if (isValid) {
    staffList.push(newStaff);
    renderNewStaffList(staffList);
    // modalEl.classList.remove("show");
    // modalEl.style.display = "none";
  } else return;
  const dataJSON = JSON.stringify(staffList);
  localStorage.setItem("STAFFLIST", dataJSON);
  renderNewStaffList(staffList);

  resetForm();
}

function validate() {
  let isValid = false;
  let isIdValid;
  let isNameValid;
  let isEmailValid;
  let isPasswordValid;
  let isDateValid;
  let isSalaryValid;
  let isPositionValid;
  let isHoursValid;
  const inputAllSelector = document.querySelectorAll(".form-group input");
  const positionSelector = document.getElementById("chucvu");
  for (let i = 0; i < inputAllSelector.length; i++) {
    let inputSelector = inputAllSelector[i];
    let name = inputSelector.getAttribute("name");
    let valueInput = inputSelector.value;
    let errorMessageSelector = inputSelector
      .closest(".form-group")
      .querySelector(".sp-thongbao");
    if (name === "tk") {
      isIdValid = validateId(inputSelector);
    } else if (name === "name") {
      isNameValid = validateName(inputSelector);
    } else if (name === "email") {
      isEmailValid = validateEmail(inputSelector);
    } else if (name === "password") {
      isPasswordValid = validatePassword(inputSelector);
    } else if (name === "ngaylam") {
      isDateValid = validateDate(inputSelector);
    } else if (name === "luongCB") {
      isSalaryValid = validateSalary(inputSelector);
    } else if (name === "gioLam") {
      isHoursValid = validateHours(inputSelector);
    }
    if (positionSelector) {
      isPositionValid = validatePosition(positionSelector);
    }
    if (
      isIdValid &&
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isDateValid &&
      isSalaryValid &&
      isHoursValid
    )
      isValid = true;
  }
  return isValid;
}
//vì sao hoán đổi positionSelector và name giolam thi ko chạy

//====================================================================

function required(inputSelector) {
  return inputSelector.value ? true : false;
}

function minLength(inputSelector, minLength, maxLength) {
  let inputValue = inputSelector.value;

  if (inputValue.length < minLength || inputValue.length > maxLength) {
    return false;
  }
  return true;
}

function checkNumberValue(inputSelector) {
  let inputValue = inputSelector.value;
  if (isNaN(inputValue)) return false;
  return true;
}

function checkStringValue(inputSelector) {
  let inputValue = inputSelector.value;
  if (!isNaN(inputValue)) return false;
  return true;
}

function checkRegexEmail(inputSelector) {
  let valueInput = inputSelector.value;
  if (!!!regexEmail.test(valueInput)) return false;
  return true;
}

function checkRegexPassword(inputSelector) {
  let valueInput = inputSelector.value;
  if (!!!regexPassword.test(valueInput)) return false;
  return true;
}

function checkRegexDate(inputSelector) {
  let valueInput = inputSelector.value;
  if (!!!regexDate.test(valueInput)) return false;
  return true;
}

function checkSalary(inputSelector, min, max) {
  let valueInput = Number(inputSelector.value);
  if (valueInput < min || valueInput > max) return false;
  return true;
}

function checkHours(inputSelector, min, max) {
  const valueInput = inputSelector.value;
  if (valueInput < min || valueInput > max) return false;
  return true;
}
//=========================================================
function validateId(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Tài khoản không được để trống");
  } else if (!checkNumberValue(inputSelector)) {
    showError(inputSelector, "Tài khoản phải có giá trị là số");
  } else if (!minLength(inputSelector, 4, 6)) {
    showError(inputSelector, "Độ dài dài khoản phải tối thiểu từ 4 - 6 ký tự");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}

function validateName(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Tên không được để trống");
  } else if (!checkStringValue(inputSelector)) {
    showError(inputSelector, "Tên bắt buộc phải là chữ");
  } else {
    isValid = true;
    showSuccess(inputSelector);
  }
  return isValid;
}

function validateEmail(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Email không được để trống");
  } else if (!checkRegexEmail(inputSelector)) {
    showError(inputSelector, "Email không đúng định dạng");
  } else {
    isValid = true;
    showSuccess(inputSelector);
  }
  return isValid;
}

function validatePassword(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Mật khẩu không được để trống");
  } else if (!minLength(inputSelector, 6, 10)) {
    showError(inputSelector, "Độ dài mật khẩu từ 6 - 10 ký tự");
  } else if (!checkRegexPassword(inputSelector)) {
    showError(
      inputSelector,
      "Mật khẩu cần chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  } else {
    isValid = true;
    showSuccess(inputSelector);
  }
  return isValid;
}

function validateDate(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Ngày làm không được để trống");
  } else if (!checkRegexDate(inputSelector)) {
    showError(inputSelector, "Ngày làm phải là dạng dd/mm/yyyy");
  } else {
    isValid = true;
    showSuccess(inputSelector);
  }
  return isValid;
}
function validateSalary(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Lương cơ bản không được để trống");
  } else if (!checkNumberValue(inputSelector)) {
    showError(inputSelector, "Lương phải là số");
  } else if (!checkSalary(inputSelector, 1000000, 20000000)) {
    showError(
      inputSelector,
      "Gía trị lương phải lớn hơn 1000000 và nhỏ hơn 20000000"
    );
  } else {
    isValid = true;
    showSuccess(inputSelector);
  }
  return isValid;
}

function validatePosition(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Chức vụ không được để trống");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}

function validateHours(inputSelector) {
  let isValid = false;
  if (!required(inputSelector)) {
    showError(inputSelector, "Thời gian không được để trống");
  } else if (!checkHours(inputSelector, 80, 200)) {
    showError(inputSelector, "Thời gian phải trong khoảng từ 80-200 giờ");
  } else {
    showSuccess(inputSelector);
    isValid = true;
  }
  return isValid;
}
//========================================
function showError(inputSelector, message) {
  let errorMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".sp-thongbao");
  errorMessageSelector.style.display = "block";
  if (message) {
    errorMessageSelector.textContent = message;
  }
}

function showSuccess(inputSelector) {
  let errorMessageSelector = inputSelector
    .closest(".form-group")
    .querySelector(".sp-thongbao");
  errorMessageSelector.style.display = "none";
}

//===============================================================
function handleDelete(idStaff) {
  const findIndexStaff = staffList.findIndex((staff) => {
    return Number(staff.id) === idStaff;
  });
  staffList.splice(findIndexStaff, 1);
  const dataJSON = JSON.stringify(staffList);
  localStorage.setItem("STAFFLIST", dataJSON);

  renderNewStaffList(staffList);
}

function handleSelectedStaff(idStaff) {
  modalEl.classList.add("show");
  modalEl.style.display = "block";

  document.getElementById("btnCapNhat").disabled = false;
  const findIndexStaff = staffList.findIndex((staff) => {
    return Number(staff.id) === idStaff;
  });
  const updateStaff = staffList[findIndexStaff];
  document.getElementById("tknv").value = updateStaff.id;
  document.getElementById("name").value = updateStaff.name;
  document.getElementById("email").value = updateStaff.email;
  document.getElementById("password").value = updateStaff.password;
  document.getElementById("datepicker").value = updateStaff.datepicker;
  document.getElementById("luongCB").value = updateStaff.salary;
  document.getElementById("chucvu").value = updateStaff.position;
  document.getElementById("gioLam").value = updateStaff.hoursWorking;
}

function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}

updateBtnEl.addEventListener("click", handleUpdateStaff);

const closeBtnEl = document.getElementById("btnDong");
closeBtnEl.addEventListener("click", closeModal);
function closeModal() {
  modalEl.classList.remove("show");
  modalEl.style.display = "none";
}
function handleUpdateStaff() {
  const staff = getFormStaff();
  const findIndexStaff = staffList.findIndex((staff) => {
    return Number(staff.id) === staff.id;
  });
  let isValid = validate();
  if (isValid) {
    staffList[findIndexStaff] = staff;
    // const dataJSON = JSON.stringify(staffList);
    // localStorage.setItem("STAFFLIST", dataJSON);
    renderNewStaffList(staffList);
    resetForm();
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
  }
}
const searchEl = document.getElementById("searchName");
const btnSearchEl = document.getElementById("btnTimNV");
btnSearchEl.addEventListener("click", handleSearchStaff);
function handleSearchStaff() {
  let valueSearch = searchEl.value;
  valueSearch = valueSearch.toLowerCase();
  const newFilterStaff = [];
  for (let i = 0; i < staffList.length; i++) {
    let staff = staffList[i];

    let rankedStaffList = staff.calcRanking(staff.hoursWorking).toLowerCase();
    if (rankedStaffList.indexOf(valueSearch) !== -1) {
      newFilterStaff.push(staff);
    }
  }
  renderNewStaffList(newFilterStaff);
}
