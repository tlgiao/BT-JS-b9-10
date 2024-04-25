function renderNewStaffList(arrList) {
  if (!Array.isArray(arrList)) return;

  let html = "";
  arrList.forEach((staff) => {
    html += `
    <tr>
    <td>${staff.id}</td>
    <td>${staff.name}</td>
    <td>${staff.email}</td>
    <td>${staff.datepicker}</td>
    <td>${staff.position}</td>
    <td>${staff.calcTotalSalary()}</td>
    <td>${staff.calcRanking(staff.hoursWorking)}</td>
    <td>
    <button class="btn btn-success" onClick="handleDelete(${
      staff.id
    })">Delete</button>
    <button class="btn btn-primary" onClick="handleSelectedStaff(${
      staff.id
    })">Update</button>
    </td>
    </tr>
    
    `;
  });
  const footerEl = document.querySelector("#tableDanhSach");
  footerEl.innerHTML = html;
}

function getFormStaff() {
  const idEl = +document.getElementById("tknv").value;
  const nameEl = document.getElementById("name").value;
  const emailEl = document.getElementById("email").value;
  const passwordEl = document.getElementById("password").value;
  const datepickerEl = document.getElementById("datepicker").value;
  const salaryEl = +document.getElementById("luongCB").value;
  const positionEl = document.getElementById("chucvu").value;
  const hoursWorkingEl = document.getElementById("gioLam").value;

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
  return newStaff;
}
