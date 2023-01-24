"use strict";
let userInput = document.querySelector(".user-input input");
let addBtn = document.querySelector(".user-input .add-btn");
let content = '';
let myArr = JSON.parse(localStorage.getItem("todoData") || '[]');
let isEdit;
let idEdit;
let success = new Audio("audio/suc.mp3");
let remove = new Audio("audio/remove.wav");
function addNote() {
    if (userInput.value.trim() != '') {
        let inputValue = {
            title: userInput.value
        };
        if (isEdit) {
            myArr[idEdit] = inputValue;
            isEdit = false;
        }
        else {
            myArr.push(inputValue);
        }
        userInput.value = '';
        addBtn.innerHTML = "Add";
        showNote(myArr);
        success.load();
        success.play();
        localStorage.setItem("todoData", JSON.stringify(myArr));
    }
}
addBtn.addEventListener("click", () => {
    addNote();
});
function showNote(arr) {
    document.querySelectorAll(".user-details").forEach((ele) => ele.remove());
    arr.forEach((data, index) => {
        var _a;
        content = `
    
    <div class="user-details">
    <p>${data.title}</p>
    <i class="fa-solid fa-trash-can delete-btn"  onclick='deleteItem(${index})'></i>
    <i class="fa-solid fa-pen-to-square edit-btn" onclick='editItem( "${index}" , "${data.title}")'></i>
    </div>
    
    `;
        (_a = userInput.parentElement) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("afterend", content);
    });
}
showNote(myArr);
function deleteItem(index) {
    myArr.splice(index, 1);
    showNote(myArr);
    remove.load();
    remove.play();
    localStorage.setItem("todoData", JSON.stringify(myArr));
}
function editItem(indx, val) {
    isEdit = true;
    idEdit = indx;
    userInput.value = val;
    addBtn.innerHTML = "Update";
}
document.documentElement.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addNote();
    }
});
//# sourceMappingURL=main.js.map