let savedNotes = [];
let imageDataURI = '';

(()=> {
    document.querySelectorAll('.leftIcons').forEach(element => {
       element.addEventListener('click',handleNotes); 
    });
})();

function bodyFading() {
    document.getElementById('backgroundBody').style['pointer-events'] = 'none';
    document.getElementById('backgroundBody').style.opacity = 0.1;
}

function nobodyFading() {
    document.getElementById('backgroundBody').style['pointer-events'] = '';
    document.getElementById('backgroundBody').style.opacity = 1;
}

function handleNotes(event) {
    let target = event.target;
    if (target.classList[0] === 'createNote') {
        createNotes();
        bodyFading();
    } else if (target.classList[0] === 'home') {
        if (savedNotes.length !== 0) {
            addNoteToPanel(savedNotes, '');
        }
    } else {
        if (doneNotes.length !== 0) {
            addNoteToPanel(doneNotes, 'doneClass');
        }
    }
}

/**
 * Create UUID is the standard function taken from GOOGLE only.
 */

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function newNoteDiv() {
    let newNoteDIV = document.getElementsByClassName('newNote')[0];
    newNoteDIV.innerHTML = '';
    newNoteDIV.innerHTML += `        <label class='labelNote'>Select Note Type: </label>
    <select class="selectClass" onchange="updateNote()">
        <option value='textOption'>Text</option>
        <option value='imageOption'>Image</option>
        <option value='linkOption'>Link</option>
    </select>

    <br>
    <label class='labelNote'>Title: </label>
    <input class='inputNoteClass' type='text' id='titleId'>

    <br><br>

    <input class='fileImage' type='file' onchange='readImageAsDataURI(this)'>

    <textarea class='taClass'></textarea>
    <div class='linkClass'>
        <br>
        <label class='labelNote'>Link Name : </label>
        <input class='inputNoteClass' type='text' id='linkname'>
        <br><br>
        <label class='labelNote'>Link : </label>
        <input class='inputNoteClass' type='text' id='linkValue'>
        <br><br>
    </div>
    <button class='noteButton saveButton' onclick='saveNote()'> Save </button>
    <button class='noteButton closeButton' onclick='closeNote()'> Cancel </button>
    <img class='imgClass'>`;
}


function createNotes() {
    newNoteDiv();
    trackSelectedNotes = [];
    let newNote = document.getElementsByClassName('newNote');
    newNote[0].style.display = 'block';
    newNote[0].style.left = newNote[0].parentElement.getBoundingClientRect().left +
     0.5 * (newNote[0].parentElement.getBoundingClientRect().width - 0.5 * newNote[0].getBoundingClientRect().width);
     document.getElementsByClassName('iconsClass')[0].style.display = 'none';
}

function updateNote() {
    let value = document.getElementsByClassName('selectClass')[0].value;
    document.getElementsByClassName('imgClass')[0].style.display = 'none';
    if (value === 'textOption') {
        document.getElementsByClassName('taClass')[0].style.display = '';
        document.getElementsByClassName('fileImage')[0].style.display = 'none';
        document.getElementsByClassName('linkClass')[0].style.display = 'none';
    } else if (value === 'imageOption') {
        document.getElementsByClassName('fileImage')[0].style.display = 'inline-block';
        document.getElementsByClassName('taClass')[0].style.display = 'none';
        document.getElementsByClassName('linkClass')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('fileImage')[0].style.display = 'none';
        document.getElementsByClassName('taClass')[0].style.display = 'none';
        document.getElementsByClassName('linkClass')[0].style.display = 'inline-block';
    }
}

function readImageAsDataURI(event) {
    let targetFile = event.files;
    let fr = new FileReader();
    fr.onload = function() {
        document.getElementsByClassName('imgClass')[0].style.display = 'block';
        document.getElementsByClassName('imgClass')[0].src = fr.result;
        imageDataURI = fr.result;
    };
    fr.readAsDataURL(targetFile[0]);
}


function saveNote() {
    let newNote = {};
    let noteType = document.getElementsByClassName('selectClass')[0].value;
    let noteTitle = document.getElementsByClassName('inputNoteClass')[0].value;
    newNote.title = noteTitle;
    newNote.uuid = create_UUID();
    if (noteType === 'textOption') {
        newNote.content = document.getElementsByClassName('taClass')[0].value;
    } else if (noteType === 'imageOption') {
        newNote.content = imageDataURI;
        newNote.isImage = true;
    } else {
        newNote.isLink = true;
        newNote.content = {
            'name': document.getElementById('linkname').value,
            'link': document.getElementById('linkValue').value
        };
    }
    if (newNote.content === '' || newNote.content === undefined) {
        alert('No note is saved');
    } else {
        savedNotes.push(newNote);
        addNoteToPanel(savedNotes);
    }
    document.getElementsByClassName('newNote')[0].style.display = 'none';
    nobodyFading();
}


function closeNote() {
    document.getElementsByClassName('newNote')[0].style.display = 'none';
    nobodyFading();
}
