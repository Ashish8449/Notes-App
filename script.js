let userData = [
  {
    UserName: "Ajay",
    Password: "aa",
    notes: [" djfkdjfdkfjdkfjdkf"],
  },
  {
    UserName: "ashish",
    Password: "1234",
    notes: [],
  },
  {
    UserName: "Sharma ji",
    Password: "143",
    notes: [],
  },
  {
    UserName: "as",
    Password: "aa",
    notes: [],
  },
];
console.log(userData);

/*=======================================================
                         Variabels: 
=======================================================*/
let index = localStorage.getItem("index");
const loginBtn = document.querySelector("#Login");
const submitBtn = document.querySelector("#SingUP");
const UserName = document.querySelector("#UserName");
const Password = document.querySelector("#Password");
const loginDiv = document.querySelector(".loginDiv");
const logOutBtn = document.querySelector(".LogOut");
const SingUPBtn = document.querySelector("#SingUP");
const fromLogin = document.querySelector(".fromLogin");
const formAddUser = document.querySelector(".formAddUser");
const NewUserName = document.querySelector("#NewUserName");
const NewPassword = document.querySelector("#NewPassword");
const AddNewUserbtn = document.querySelector("#AddNewUserbtn");
const LogOutBtn = document.querySelector(".LogOut ");
const notesContainer = document.querySelector(".notesContainer");
// console.log(logOutBtn);
const addBtn = document.querySelector(".AddNotes");
if (JSON.parse(localStorage.getItem("userData")))
  userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData);

/* ====================================================================

                 Data from local storage

====================================================================*/
function dataFromlocal(notesPrint = notes[0].notes) {
  if (notesPrint) {
    notesPrint.forEach((note) => {
      console.log(note);
      addNewNote(note);
    });
  }
}

// dataFromlocal(userData[0].notes);
/*=======================================================
                        Functions;
=======================================================*/

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = ` 
  <div class="tools">
    <button class="edit"><i class="fas fa-edit"> </i></button>
    <button class="delete"><i class="fas fa-trash-alt"> </i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}">
   
  </div>
  <textarea class="${!text ? "" : "hidden"}"" name="" id=""></textarea>
`;
  const main = note.querySelector(".main");
  const deleteBtn = note.querySelector(".delete");
  // const notesEle = note.querySelector(".notes");
  const editBtn = note.querySelector(".edit");
  const textArea = note.querySelector("textArea");
  main.innerHTML = text ? text : "";
  textArea.innerHTML = text ? text : "";

  /*=====================================================================
             add event listner
==========================================================================*/
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updatLs();
  });
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  textArea.addEventListener("input", (e) => {
    main.innerHTML = e.target.value;
    updatLs();
  });
  document.querySelector(".notesContainer").appendChild(note);
}
function addBtnFun() {
  console.log("click");
  addNewNote();
}

/*===============================================================
                          local storage
=================================================================*/

function updatIndexLs() {
  console.log("update local index");
  localStorage.setItem("index", index);
  console.log(localStorage.getItem("index"));
}
function updatLs() {
  const noteText = document.querySelectorAll("textarea");

  userData[index].notes = [];
  noteText.forEach((note) => {
    userData[index].notes.push(note.value);
  });

  localStorage.setItem("userData", JSON.stringify(userData));
  console.log(localStorage.getItem("userData"));
}
/*=======================================================
                    event listener:
=======================================================*/

addBtn.addEventListener("click", addBtnFun);
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let userName = UserName.value;
  let password = Password.value;
  console.log(userName);

  console.log(loginDiv);
  let tempIndex = 0;
  let check = 1;
  if (JSON.parse(localStorage.getItem("userData")))
    userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  userData.forEach((val) => {
    if (userName == val.UserName && password == val.Password) {
      index = tempIndex;
      updatIndexLs();
      loginDiv.style.display = "none";
      console.log("Match");
      document.querySelector("body").classList.add("bodybg");
      console.log(document.querySelector("body"));
      addBtn.classList.toggle("hidden");
      addBtn.style.width = "auto";
      dataFromlocal(val.notes);
      logOutBtn.classList.remove("hidden");
      check = 0;
    }
    tempIndex++;
  });
  if (check) alert("wrong user name & password ");
});
/*=============================================================
                        Add new user
=============================================================*/

SingUPBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fromLogin.classList.add("hidden");
  formAddUser.classList.remove("hidden");
});
AddNewUserbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let newUser = {};
  if (!(NewUserName.value && NewPassword)) {
    alert("Enter valid user name and password");
    return;
  }
  newUser.UserName = NewUserName.value;
  newUser.Password = NewPassword.value;
  newUser.notes = [];
  console.log(newUser);
  index = userData.length;
  userData.push(newUser);
  NewUserName.value = "";
  NewPassword.value = "";
  dataFromlocal(userData[index].notes);

  formAddUser.classList.add("hidden");
  fromLogin.classList.remove("hidden");
  updatLs();
});

/*=======================================================
             press log out btn
=======================================================*/
logOutBtn.addEventListener("click", (e) => {
  console.log("pressed log out btn");
  index = null;
  updatIndexLs();
  window.location.reload();
});
/*==============================================================
                      check log out or not
================================================================*/
if (index) {
  console.log(index);
  console.log(userData[index].notes);
  dataFromlocal(userData[index].notes);

  loginDiv.style.display = "none";

  document.querySelector("body").classList.add("bodybg");

  addBtn.classList.remove("hidden");
  addBtn.style.width = "auto";
  logOutBtn.classList.remove("hidden");
}
