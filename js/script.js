

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//++++++++++++++  EVENTOS +++++++++++++++//

addNote.addEventListener('click', (evt)=> {
  evt.preventDefault();
  modal.style.display='block';
  console.log(notes);
  notes.style.display = 'none';
  addNote.style.display = 'none'; 
});

btnCloseModal.addEventListener('click', (evt) =>{
  evt.preventDefault();
  listNotes();
  modal.style.display='none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});


btnSaveNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  let objNote = {
    id: document.querySelector("#input-id").value.trim(),
    title:document.querySelector("#input-title").value.trim(),
    content:document.querySelector("#input-content").value.trim()
  };
  console.log(objNote);
  saveNote(objNote);
});

modalView.addEventListener('click', (evt) => {
  evt.preventDefault();
  
});

//++++++++++++++  FUNÇÕES +++++++++++++++//

  const saveNote = (note) => {
    let listNotes = loadNotes();

    if(note.id.length < 1){
      note.id = new Date().getTime();
      document.querySelector('#input-id').value = note.id;
      listNotes.push(note);
    } else {
      console.log(note.id);
      listNotes.forEach((item, i) => {
          if (item.id == note.id) {
            listNotes[i] = note;
          }
      }); 
    }
    note.lastTime = new Date().getTime();
    console.log(listNotes);
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes', listNotes);
  };

  const loadNotes = () => {
    let listNotes = localStorage.getItem('notes');
    console.log(listNotes);
    if (!listNotes){
      listNotes = [];
    } else {
      listNotes = JSON.parse(listNotes);
    }
    return listNotes;
  }

  closeModalView.addEventListener("click", (evt) => {
    evt.preventDefault();
    modalView.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";;


  }
  
  )

  const listNotes = () => {
    notes.innerHTML="";
    let listNotes = loadNotes();
    listNotes.forEach((item) => {
      let divCard = document.createElement('div');
      divCard.className = 'card';
      divCard.style.width = '18rem';
      notes.appendChild(divCard);

      let divCardBody = document.createElement('div');
      divCardBody.className = "card-body";
      divCard.appendChild(divCardBody);
      
      let h1 = document.createElement('h1');
      h1.innerText = item.title;
      divCardBody.appendChild(h1);

      let pContent = document.createElement('p');
      pContent.innerText = item.content;
      divCardBody.appendChild(pContent);

      let pDate = document.createElement('p');
      let time = new Date(item.lastTime);
      time = time.toLocaleDateString();
      pDate.innerText = "Última alteração : "+time;
      divCardBody.appendChild(pDate);
      divCard.addEventListener('click',(evt) => {
        evt.preventDefault();
        showNote(item);
      })

    })
  };

  const showNote = (note)=>{
    document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>";
    document.querySelector('#title-note').innerHTML +=
    "<p> Ultima Alteração: "+new Date(note.lastTime).toLocaleDateString()+"</p>";
    document.querySelector('#controls-note').innerHTML = "";

    let aDelete = document.createElement('a');
    let i = document.createElement('i');
    i.style.color = "#F00";
    i.className = "bi";
    i.className = "bi-trash";
    aDelete.appendChild(i);
    aDelete.addEventListener("click", (evt) => {
        evt.preventDefault();
        deleteNote(note.id);

    })

    const deleteNote = (id) => {
        listNotes = loadNotes();
        listNotes.forEach(note => i)
            if (note.id === id) {
                listNotes.splice(i);
            }
        }
    listNotes = JSON.stringify();
    localStorage.setItem('notes', listNotes);
        }
        
     
    
    document.querySelector('#controls-note').appendChild(aDelete);
    modalView.style.display = 'block';
    notes.style.display = 'none';
    addNote.style.display = 'none';
  

  listNotes();