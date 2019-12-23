let notesArray = [];
let index = 0;

//checking if there is an array of notes in localstorage
//updating variable if there is and creating an empty one if not
//and showing notes from local storage
(function () {
    if (!localStorage.notesArrayString) {
        localStorage.notesArrayString = [];

    }

    notesArray = getNotesArrayFromLocalStorage();
    index = notesArray.length;

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
    let notesContainer = document.getElementById('notesContainer');

    notesContainer.innerHTML = '';

    for (let i = 0; i < notesArray.length; i++) {
        addNoteToDisplay(notesContainer, notesArray[i]);
    }
}

function addNoteToDisplay(notesContainer, note) {
    let container = document.createElement('div');
    let xIcon = document.createElement('button');
    let noteContent = document.createElement('div');
    let noteDate = document.createElement('div');
    let noteTime = document.createElement('div');


    noteContent.innerHTML = '<br>Task: ' + note.noteContent;
    noteDate.innerHTML = 'Due date: ' + note.noteDate;
    noteTime.innerHTML = 'Due time: ' + note.noteTime;
    container.id = note.id;
    xIcon.id = note.id;

    noteContent.className = 'noteContent';
    noteDate.className = 'noteDate';
    noteTime.className = 'noteTime';
    xIcon.className = 'close close-btn';
    xIcon.type = 'button';

    xIcon.innerHTML = '<span aria-hidden="true">&times;</span>';

    container.appendChild(xIcon);
    container.appendChild(noteContent);
    container.appendChild(noteDate);
    container.appendChild(noteTime);

    notesContainer.appendChild(container);

    xIcon.onclick = deleteNote;
}

function getUserInput() {
    let note = {
        id: index,
        noteContent: document.getElementById('noteContent').value,
        noteDate: document.getElementById('noteDate').value,
        noteTime: document.getElementById('noteTime').value,
        noteContentStyle: document.getElementById('noteContent').style,
        noteDateStyle: document.getElementById('noteDate').style,
        noteTimeStyle: document.getElementById('noteTime').style
    };

    index = index + 1;
    return note;
}

function addToNotesArray(userInputObject) {
    notesArray.push(userInputObject);
}

function getNotesArrayFromLocalStorage() {
    return JSON.parse(localStorage.notesArrayString || '[]');
    //return localStorage.getItem(''notesArrayString'');
}

function saveNoteToStorage(notesArray) {
    let notesArrayString = JSON.stringify(notesArray);
    localStorage.setItem('notesArrayString', notesArrayString);
}

function deleteNote() {
    for (let i = 0; i < notesArray.length; i++) {
        if (String(notesArray[i].id) === this.id) {
            notesArray.splice(i, 1);
        }
    }

    saveNoteToStorage(notesArray);

    displayAllNotes();
}

//clearing red boxes
function clearRedBoxes(boxToClear){
    boxToClear.noteContentStyle.backgroundColor = '';
    boxToClear.noteDateStyle.backgroundColor = '';
    boxToClear.noteTimeStyle.backgroundColor = '';
//    document.getElementById(''squareSpace'').innerHTML = '''';
}

//clearing input from boxes
function clearBoxesInput(inputReference) {
    inputReference.noteContent.value = '';
}


// == or === ?
function validation(userInput) {
    let errorMessageText = '';

    if (userInput.noteContent === '') {
        addErrorBackground(userInput.noteContentStyle);

        let errorText = 'Please write a task.';

        if (!errorMessageText) {
            errorMessageText = errorText;
        } else {
            errorMessageText = errorMessageText + '\n' + errorText;
        }

    }

    if (userInput.noteDate === '') {
        addErrorBackground(userInput.noteDateStyle);

        let errorText = 'Please set a date.';

        if (!errorMessageText) {
         errorMessageText = errorText;
        } else {
            errorMessageText = errorMessageText + '\n' + errorText;
        }
    }

    if (userInput.noteTime === '') {
        addErrorBackground(userInput.noteTimeStyle);

        let errorText = 'Please set task due time.';

        if (!errorMessageText) {
         errorMessageText = errorText;
        } else {
            errorMessageText = errorMessageText + '\n' + errorText;
        }
    }

    if (!errorMessageText) return true;

    errorMessage(errorMessageText);

    return false;
}

function addErrorBackground(boxToMark) {
    boxToMark.backgroundColor = 'red';
}

function errorMessage(textMessage) {
    alert(textMessage);
}
