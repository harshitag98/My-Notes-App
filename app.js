showNotes();

//Function to add a note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let text = document.getElementById("addText");
    let title = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : title.value,
        text : text.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    text.value = "";
    title.value = "";
    showNotes();
})

//Function to show all the notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard card mx-3 my-3" style="width: 20.5rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
        </div>
      </div>`;
    })
    let notesElement = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElement.innerHTML = html;
    }
    else{
        notesElement.innerHTML = `You don't have any note. Use "Add a note" section above to add the notes.`; 
    }

}

//Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//functionality to search a note
let search = document.getElementById("searchText");
search.addEventListener("input", function(){
    let searchVal = search.value.toLowerCase();
    let cards = document.getElementsByClassName("noteCard");
    Array.from(cards).forEach(function (element){
        let Text = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(Text.includes(searchVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})