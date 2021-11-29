/*=======================================================
                         Variabels: 
=======================================================*/

const addBtn = document.querySelector(".AddNotes");
console.log(addBtn);
const notes = JSON.parse(localStorage.getItem("notes"));

/* ====================================================================

                 Data from local storage

====================================================================*/
if (notes) {
  notes.forEach((note) => {
    console.log(note);
    addNewNote(note);
  });
}

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
  const notes = [];
  noteText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
/*=======================================================
                    event listener:
=======================================================*/

addBtn.addEventListener("click", addBtnFun);
