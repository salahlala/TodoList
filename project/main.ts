let userInput = document.querySelector(".user-input input") as HTMLInputElement
let addBtn = document.querySelector(".user-input .add-btn") as HTMLElement
let content : any = '';
let myArr : object[] = JSON.parse(localStorage.getItem("todoData")||'[]')
let isEdit : boolean ;
let idEdit : number ;
let success = new Audio("audio/suc.mp3");
let remove = new Audio("audio/remove.wav")


function addNote ():void {
  if (userInput.value.trim() != '') {
    let inputValue:{title : string} = {
      title : userInput.value
    }
    if (isEdit) {
      myArr[idEdit] = inputValue;
      isEdit = false;
    }else{
      myArr.push(inputValue);

    }
    userInput.value = ''
    addBtn.innerHTML = "Add"

    showNote(myArr)
    success.load()
    success.play()
    localStorage.setItem("todoData",JSON.stringify(myArr))
  }
}
addBtn.addEventListener("click",()=>{
  addNote()
})

function showNote (arr:Array<any>) :void {
  document.querySelectorAll(".user-details").forEach((ele)=>ele.remove())
  arr.forEach((data,index:number)=>{
    content = `
    
    <div class="user-details">
    <p>${data.title}</p>
    <i class="fa-solid fa-trash-can delete-btn"  onclick='deleteItem(${index})'></i>
    <i class="fa-solid fa-pen-to-square edit-btn" onclick='editItem( "${index}" , "${data.title}")'></i>
    </div>
    
    `

    userInput.parentElement?.insertAdjacentHTML("afterend",content)
  })
}

showNote(myArr)


function deleteItem (index:number) :void{
  myArr.splice(index,1)
showNote(myArr)
remove.load()
remove.play()
localStorage.setItem("todoData",JSON.stringify(myArr))

}



function editItem (indx:number,val:string): void {
  isEdit = true;
  idEdit = indx;
  userInput.value = val;
  addBtn.innerHTML = "Update"
}

document.documentElement.addEventListener("keydown",(e)=>{
  if (e.key == "Enter" ){
    addNote()
  }
})