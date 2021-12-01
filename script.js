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
    notes: [
      "Ajj aaye hai is jahan main mahobbat hi karle, kya pta pagli hum kal kisi or ke na ho jaye !",
      "Koshish Koi Aapse Na Ruthe,Zindagi Me Apno Ka Sath Na Chhute,Dosti Koi Bhi Ho  Use Aisa Nibhao, Ki Us Dosti Ki Dor Zindagi Bhar Na Toote.",
    ],
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
let index = 0;
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
  note.innerHTML = ` <div class="note">
  <div class="tools">
    <button class="edit"><i class="fas fa-edit"> </i></button>
    <button class="delete"><i class="fas fa-trash-alt"> </i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}">
   
  </div>
  <textarea class="${!text ? "" : "hidden"}"" name="" id=""></textarea>
</div>`;
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
  document.body.appendChild(note);
}
function addBtnFun() {
  console.log("click");
  addNewNote();
}

/*===============================================================
                          local storage
=================================================================*/

function updatLs() {
  const noteText = document.querySelectorAll("textarea");
  // const notes = [];

  userData[index].notes = [];
  noteText.forEach((note) => {
    userData[index].notes.push(note.value);
  });
  // console.log(userData[index]);
  // console.log(userData);
  // console.log(JSON.stringify(userData));
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
      loginDiv.style.display = "none";
      console.log("Match");
      addBtn.classList.toggle("hidden");
      dataFromlocal(val.notes);
      check = 0;
      // logOutBtn.classList.remove("hidden");
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
  newUser.notes = [
    "महफ़िल में रौनक छा गई आपके आने से. आँखों को बहुत सुकून आया, जो आप हमारे द्वार पधारें. आपके आने से मुक्कमल महफिल सजी.",
  ];
  console.log(newUser);
  index = userData.length;
  userData.push(newUser);
 
  dataFromlocal(userData[index].notes);

  formAddUser.classList.add("hidden");
  fromLogin.classList.remove("hidden");
  updatLs();
});
