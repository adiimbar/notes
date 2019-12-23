let notesArray = [];
let index = 0;

//checking if there is an array of notes in localstorage
//updating variable if there is and creating an empty one if not
//and showing notes from local storage
(function () {
    if (localStorage.notesArrayString) {
    notesArray = getNotesArrayFromLocalStorage();
    }
    else {
        localStorage.notesArrayString = [];
    }
    displayAllNotes();
}) ();

function addNoteOnClick() {

    let userInputObject = getUserInput();

    clearRedBoxes(userInputObject);

    let isValid = validation(userInputObject);
    
    if (!isValid) {
        return;
    } 

    //add user input to note list
    addToNotesArray(userInputObject);

    //update to storage
    saveNoteToStorage(notesArray);

    //clearBoxesInput(userInputObject);

    displayAllNotes();
}

function displayAllNotes() {
    let container = document.getElementById("notesContainer");
    container.innerHTML = "";
    for (let i = 0; i < notesArray.length; i++) {
        addNoteTodisplay(notesArray[i]);
    }
}

function addNoteTodisplay(note) {
    let container = document.createElement("div");
    let noteContent = document.createElement("div");
    let noteDate = document.createElement("div");
    let noteTime = document.createElement("div");
    let xIcon = document.createElement("img");

    noteContent.innerHTML = "<br>Task: " + note.noteContent;
    noteDate.innerHTML = "Due date: " + note.noteDate;
    noteTime.innerHTML = "Due time: " + note.noteTime;
    container.id = note.id;
    xIcon.id = note.id;

    noteContent.className = "noteContent";
    noteDate.className = "noteDate";
    noteTime.className = "noteTime";
    xIcon.className = "deleteIcon";

    container.appendChild(noteContent);
    container.appendChild(noteDate);
    container.appendChild(noteTime);
    container.appendChild(xIcon);
    notesContainer.appendChild(container); 

    xIcon.onclick = deleteNote;
}


function getUserInput() {
    let note = {
        id: index,
        noteContent: document.getElementById("noteContent").value,
        noteDate: document.getElementById("noteDate").value,
        noteTime: document.getElementById("noteTime").value,
        noteContentStyle: document.getElementById("noteContent").style,
        noteDateStyle: document.getElementById("noteDate").style,
        noteTimeStyle: document.getElementById("noteTime").style
    }
    index = index + 1;
    return note;
}

function addToNotesArray(userInputObject) {
    notesArray.push(userInputObject);
}

function getNotesArrayFromLocalStorage() {
    return JSON.parse(localStorage.notesArrayString);
    //return localStorage.getItem("notesArrayString");
}

function saveNoteToStorage(notesArray) {
    let notesArrayString = JSON.stringify(notesArray);
    localStorage.setItem("notesArrayString", notesArrayString);
}

function deleteNote() {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id == this.id) {
            notesArray.splice(i, 1);
        }
    }
    displayAllNotes();
}

//clearing red boxes
function clearRedBoxes(boxToClear){
    boxToClear.noteContentStyle.backgroundColor = "";
    boxToClear.noteDateStyle.backgroundColor = "";
    boxToClear.noteTimeStyle.backgroundColor = "";
//    document.getElementById("squareSpace").innerHTML = "";
}

//clearing input from boxes
function clearBoxesInput(inputReference) {
    inputReference.noteContent.value = "";
}

function validation(userInput) {
    if (userInput.noteContent == "") {
        errorMassege("Please write a task", userInput.noteContentStyle);
        return false;
    }

    if (userInput.noteDate == "") {
        errorMassege("Please set a date", userInput.noteDateStyle);
        return false;
    }

    if (userInput.noteTime == "") {
        errorMassege("Please set task due time", userInput.noteTimeStyle);
        return false;
    }

    return true;
}

function errorMassege(textMassege, boxToMark) {
    alert(textMassege);
    boxToMark.backgroundColor = "red";
}
