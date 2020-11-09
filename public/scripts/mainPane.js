let trackSelectedNotes = [];
let doneNotes = [];

function paneDivTemplate(isImage,isLink, imageURI, text, title, uuid, className) {
    let content = '';
    if (isImage) {
        content = `<div id='mainBlock' class='${className}' uuid='${uuid}'>`;
        content += className === '' ? `<input type='checkbox' style='float:right; width:25px; height:25px;' onchange=openOptions(this)>`:
        '<img src="./public/images/done.png" style="float:right; width:25px; height:25px;">';
        content += `<div class='upperSection'><img src='${imageURI}' class='setImageClass'></div>
            <div class='lowerSection' title='${title}'>${title}</div>
        </div>
    `;
    } else if (isLink) {
        content = `
        <div id='mainBlock' class='${className}' uuid='${uuid}'>`;
        content += className === '' ? `<input type='checkbox' style='float:right; width:25px; height:25px;' onchange=openOptions(this)>`:
        '<img src="./public/images/done.png" style="float:right; width:25px; height:25px;">';
        content += `<div class='upperSection'>
            <a href='${text.link}'>${text.name}</a></div>
            <div class='lowerSection'  title='${title}'>${title}</div>
        </div>`;
    }
    else {
        content = `
        <div id='mainBlock' class='${className}' uuid='${uuid}'>`;
        content += className === '' ? `<input type='checkbox' style='float:right; width:25px; height:25px;' onchange=openOptions(this)>`:
        '<img src="./public/images/done.png" style="float:right; width:25px; height:25px;">';
        content += `<div class='upperSection'>${text}</div>
            <div class='lowerSection'  title='${title}'>${title}</div>
        </div>`;
    }
    return content;
}


function addNoteToPanel(notesArray, className='') {
    let notesView = document.getElementsByClassName('notesView')[0];
    notesView.innerHTML = '';
    if (notesArray.length !== 0) {
        notesArray.forEach(ele => {
            if (ele.isImage) {
                notesView.innerHTML += paneDivTemplate(ele.isImage, undefined, ele.content || '', undefined, ele.title || '', ele.uuid, className);
            } else if (ele.isLink) {
                notesView.innerHTML += paneDivTemplate(undefined, ele.isLink,undefined, ele.content || '', ele.title || '', ele.uuid, className);
            }
            else {
                notesView.innerHTML += paneDivTemplate(ele.isImage,undefined, undefined, ele.content || '', ele.title || '', ele.uuid, className);
            }
        });
    }
}

function openOptions(event) {
    let uuid = event.parentElement.getAttribute('uuid');
    savedNotes.forEach(ele =>{
        if (ele.uuid === uuid && event.checked) {
            if (trackSelectedNotes.length !== 0) {
                let trackVar = true;
                trackSelectedNotes.forEach(elem => {
                    if (elem.uuid === uuid) {
                        trackVar = false;
                    }
                });
                if (trackVar) {
                    trackSelectedNotes.push(ele);
                }
            } else {
                trackSelectedNotes.push(ele);
            }
            document.getElementsByClassName('iconsClass')[0].style.display = 'block';
        }
    });

    if (event.checked === false && trackSelectedNotes.length > 1) {
        for (let i=0; i< trackSelectedNotes.length; i++) {
            if (uuid === trackSelectedNotes[i].uuid) {
                trackSelectedNotes.splice(i, 1);
            }
        }
    } else if (event.checked === false && trackSelectedNotes.length === 0) {
        document.getElementsByClassName('iconsClass')[0].style.display = 'none';
    } else if (event.checked === false && trackSelectedNotes.length === 1) {
        for (let i=0; i< trackSelectedNotes.length; i++) {
            if (uuid === trackSelectedNotes[i].uuid) {
                trackSelectedNotes.splice(i, 1);
            }
        }
        document.getElementsByClassName('iconsClass')[0].style.display = 'none';
    }
}

function operateNotes(event) {
    let targetClass = event.classList[1];
    if (targetClass === 'delete') {
        trackSelectedNotes.forEach(ele => {
            for(let i=0; i< savedNotes.length; i++){
                if (ele.uuid === savedNotes[i].uuid) {
                    savedNotes.splice(i, 1);
                    addNoteToPanel(savedNotes);
                }
            };
        });
        trackSelectedNotes = [];
    } else {
        trackSelectedNotes.forEach(ele => {
            for(let i=0; i< savedNotes.length; i++){
                if (ele.uuid === savedNotes[i].uuid) {
                    doneNotes.push(savedNotes[i]);
                    savedNotes.splice(i, 1);
                }
            };
        });
        alert('Moved to Done Tasks');
    }
}
