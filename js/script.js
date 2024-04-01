/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

 let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
 let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
 let modal = document.querySelector('#modal'); //Modal para edição das notas
 let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
 let notes = document.querySelector('#notes');//Lista divs com dados das notas
 let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
 let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

 /**
 * ===================== Eventos =================================
 */

 addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'block';
    console.log(notes);
    notes.style.display = 'none'
    addNote.style.display = 'none'
 });
    btnCloseNote.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.style.display = 'none';
        notes.style.display = 'flex'
        addNote.style.display = 'block'

 }
 );
btnSaveNote.addEventListener('click', (evt) => {
evt.preventDefault();
let objNote = {
    id: document.querySelector("#input-id").value.trim(),
    title : document.querySelector("#input-title").value.trim(),
    subtitle : document.querySelector("#input-subtitle").value.trim(),
    content: document.querySelector("#input-content").value.trim()};
  
  
    console.log(objNote);
    saveNote(objNote);
});


/**
 * ===================== Funções =================================
 */

const saveNote = (note) => {
    let listNotes = loadNotes();
if(note.id.length < 1) {
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
}else{
    console.log(note.id);
    listNotes.forEach((item, i) => {
        if (item.id == note.id ){
            listNotes[i] = note;
        }
    });

};

    console.log(listNotes);
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes', listNotes);
};

const loadNotes = () => {    
    let listNotes = localStorage.getItem('notes');
    console.log(listNotes);
    if(!listNotes){
        listNotes = []; 
    }else {
        listNotes = JSON.parse(listNotes);
    }
    return listNotes;
}

const listNotes = () => {
    let listNotes = loadNotes();
    listNotes.forEach((item) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = "18rem"
        notes.appendChild(divCard);

        let divcardBody = document.createElement('div');
        divcardBody.className = 'card-body';
        divCard.appendChild(divcardBody);

        let h5 = document.createElement('h5');
        h5.innerText = item.title;
        divcardBody.appendChild(h5);

        let h6 = document.createElement('h6');
        h6.innerText = item.subtitle;
        divcardBody.appendChild(h6);

        let pContent = document.createElement('p');
        pContent.className = 'p';
        divcardBody.appendChild(pContent);

        let pCardText = document.createElement('p');
        pCardText.className = 'CardText';
        pCardText.innerText = item.content;
        divcardBody.appendChild(pCardText);
        plastTime = document.createElement('p');
        plastTime.innerText = item.lastTime;
        divcardBody.appendChild(plastTime);


    })
};

listNotes();