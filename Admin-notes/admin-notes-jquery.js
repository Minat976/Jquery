let content = document.getElementById("content");
$(document).ready(function () {
    $('a.add_note').on("click", function (e) {
        $('#create_button').show();
        $('#update_button').hide();
    });

    $('a.update_note').on("click", function (e) {
        $('#create_button').hide();
        $('#update_button').show();
    });

   GetNotes();

    $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        // let data= JSON.stringify( $(this).serializeArray());
        let  title = $( "#title" ).val();
        let  content = $( "#title" ).val();
        var data= ({tite : title, content:content})
        CreateNote(data);
    });
});

function GetNotes(){
    $.ajax({
        url: "http://localhost:3000/notes/",
        dataType: 'json',
        type: 'GET',
        success: function (result) {
            result.forEach(note => {
                let row = `
                    <tr>
                    <th id="note_id">${note._id}</th>
                    <th id="note_title">${note.title}</th>
                    <th id="note_content">${note.content}</th>
                    <th>
                    <a href="#" class="update_note" id="${note._id}">Actualizar nota</a>
                    <a href="#" class="delete_note">Eliminar nota</a>
                    </tr>
                `;
                $('a.update_note').on("click", function (e) {
                    e.preventDefault();
                    console.log("UPDATE");
                    FillNoteInput();
                });

                $('a.delete_note').on("click", function (e) {
                    e.preventDefault();
                    let noteToDelete = $(this).attr('noteId');
                    console.log("DELETE");
                    DeleteNote(noteToDelete);
                });

                $('#notes').append(row);
            });
        },
        error: "Error"
    });
}

function ValidateFrom (e){
    let buttonSelected = $(e).attr('id');
    console.log(buttonSelected);
    $('form input, form textarea').each(function(index, elem){
        if($(elem).val().length == 0){
            console.log(index);
            if(index == 0){
                $('#title-error').html("Campo de name vacio");
            }
            if(index == 1){ 
                $('#content-error').html("Campo de email vacio");
            }
        }else{ 
            console.log( $( this ).serialize() );
            let data= $( this ).serialize();
            $('#test').attr('id')
            if(buttonSelected="create_button"){
               CreateNote(data); 
            } 
            if(buttonSelected="create_button"){
               UpdateNote(data); 
            }   
        }
    });
}

function CreateNote(data){
    console.log(data);
    $.ajax({
        url: "http://localhost:3000/notes/",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST',
        success: function () {
            $('#message').append("Nueva nota creada");
        },
        error: function () {
            $('#message').append("Error en la cracion de nota");
        },
    });
}

function FillNoteInput(){
    let noteTitle = $("#note_title").text();
    let noteContent = $("#note_content").text();

    $("#title").val(noteTitle);
    $("#content").val(noteContent);
}

function UpdateNote(data){
    $.ajax({
        url: "http://localhost:3000/notes/",
        dataType: 'json',
        data: data,
        type: 'PUT',
        success: function () {
            $('#message').append("Nueva nota creada");
            GetNotes();
        },
        error: function () {
            $('#message').append("Error en la cracion de nota");
        },
    });
}

function DeleteNote(noteToDelete){
    $.ajax({
        url: `http://localhost:3000/notes/${noteToDelete}`,
        dataType: 'json',
        type: 'DELETE',
        success: function () {
            $('#message').append("Su nota se ha eliminado");
        },
        error: function () {
            $('#message').append("Su nota no seha eliminado");
        },
    });
}