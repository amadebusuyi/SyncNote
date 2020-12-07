
function createNote (){
	$(".createNew").click();
}

function extractContent(s, space) {
    var span= document.createElement('span');
    span.innerHTML= s;
    if(space) {
      var children= span.querySelectorAll('*');
      for(var i = 0 ; i < children.length ; i++) {
        if(children[i].textContent)
          children[i].textContent+= ' ';
        else
          children[i].innerText+= ' ';
      }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
  };


var clipText = ($el = false, $count = 50) => {
    if(!$el){
        return "Some text...";
    }
    let countCheck = 0;
    let elem = $el.split(" ");
    let text = ""; exit = "false"; val = "";
    for(var i = 0; i < elem.length; i++){
        if(elem.length === 1){
            for(var a = 0; a < elem[i].length; a++){
                if($count === 0 || a === (elem[i].length - 1)){exit = "trueCase1";break;}
                val += elem[i][a]; $count--; countCheck++;
            }
        }
        else{
            for(var a = 0; a < elem[i].length; a++){
                if($count === 1 && a < (elem[i].length - 1)){exit = "true";break;}

                else if($count === 1 && a === (elem[i].length -1)){exit = "truePlus";}

                else if(($el.length - 1) === (countCheck + elem.length)){exit = "truePlus"; break;}
                else{$count--; countCheck++;}
            }
        }
        if(exit === "false"){text += elem[i] + " ";}
        else if(exit === "truePlus"){text += elem[i];break;}
        else if(exit === "trueCase1"){text = val;break;}
        else{break;}
    }

    if((countCheck + elem.length + 1) < $el.length){text = text.trim();text += "...";}
    else{text = text.trim();}

    return text;
}

var makeRand = (length, type = false) => {
    var result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(type == "cap-lt-num"){characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';}
    else if(type == "all"){characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';}
    else if(type == "sm-lt-num"){characters = 'abcdefghijklmnopqrstuvwxyz0123456789';}
    else if(type == "num"){characters = '1234567890';}
    else if(type == "sm-lt"){characters = "abcdefghijklmnopqrstuvwxyz";}

    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function checkLoc(location){
    var loc = String(window.location).search(location);
    return loc;       
}

var online = () => {
    let status = navigator.onLine;
    return status;
}

var linkAccount = () => {
    $(".to-hide").addClass("d-none");
    $("#settings").removeClass("d-none");
    let link = document.createElement('a');
    link.href ="#auth";
    link.click();
    activePage = "auth";
}

var harmonizeNotes = () => {
    var allNotes = [];
    let notesFromDb = localStorage.syncNotesFromDb;
    if(notesFromDb)
        notesFromDb = JSON.parse(notesFromDb);
    else
        notesFromDb = [];

    let notesFromTmp = localStorage.tmpNotes;
    if(notesFromTmp)
        notesFromTmp = JSON.parse(notesFromTmp);
    else
        notesFromTmp = [];

    $.each(notesFromDb, (i, item)=>{
        if(!item.deleted)
            allNotes.push(item);
    })

    $.each(notesFromTmp, (a, item)=>{
        if(item.state == "delete"){
            $.each(allNotes, (i, itm) => {
                if(itm.id === item.id){
                    allNotes.splice(i, 1);
                }
            });
        }
        else if(item.state == "update"){
            if(allNotes.length == 0)
                allNotes.push(item);
            else{
                $.each(allNotes, (i, itm) => {
                    console.log("me 2");
                    if(itm.id === item.id){
                        allNotes[i] = item;
                    }
                    else{
                        allNotes.push(item);
                    }
                });
            }   
        }
        else if(item.state == "add"){
            allNotes.push(item);     
        }
    })

    return allNotes;
}

var binNotes = () => {
    var bin = [];
    let notesFromDb = localStorage.syncNotesFromDb;
    if(notesFromDb)
        notesFromDb = JSON.parse(notesFromDb);
    else
        notesFromDb = [];

    let notesFromTmp = localStorage.tmpNotes;
    if(notesFromTmp)
        notesFromTmp = JSON.parse(notesFromTmp);
    else
        notesFromTmp = [];

    $.each(notesFromDb, (i, item)=>{
        if(item.deleted)
            bin.push(item);
    })

    $.each(notesFromTmp, (i, item)=>{
        if(item.state == "delete"){
            bin.push(item);
        }
    })

    return bin;
}

var showNote = (id) => {
    let notes = harmonizeNotes();
    if(notes.length > 0){
        let note = notes.find(item => item.id == id);
        if(note){
            $(".editNote").data("id", id).show();
            $(".deleteNote").data("id", id).show();
            let title = "";
            if(note.title)
                title = `<h4 class="title">${note.title}</h4>`;
            $(".note-area").html(`
            <div class="col-12">
                ${title}
                <div class="mt-3">${note.note}</div>
            </div>
            `);
        }
        else{
            $(".note-area").html(`
                <div class="col-12">
                    <div class="mt-3">Oops! Something went wrong!</div>
                </div>
            `);
            $(".editNote").hide();
            $(".deleteNote").hide();
        }
    }
    else{
        $(".note-area").html(`
            <div class="col-12">
                <div class="mt-3">Oops! Something went wrong!</div>
            </div>
        `);
        $(".editNote").hide();
        $(".deleteNote").hide();
    }

    $(".to-hide").addClass("d-none");
    $("#fullNote").removeClass("d-none");
}

function displayNote(id){
    let link = document.createElement('a');
    link.href ="#note/"+id;
    link.click();
    showNote(id);
}

(function($) {
    'use strict'

    document.addEventListener('contextmenu', event => {
            // event.preventDefault();
        });

    var activePage = "show-notes";
    var UID = localStorage.syncNoteUID;
    var tmpNotes = localStorage.tmpNotes;
    if(tmpNotes){
        tmpNotes = JSON.parse(tmpNotes);
    }
    else{
        localStorage.tmpNotes = JSON.stringify([]);
        tmpNotes = [];
    }

    $(".createNew").click(function(e){
    	e.preventDefault();
    	$(".to-hide").addClass("d-none");
    	$("#noteMaker").removeClass("d-none");
        let link = document.createElement('a');
        link.href ="#create-new";
        link.click();
        activePage = "create-new";
    })

    $(".viewNotes").click(function(e){
    	e.preventDefault();
    	$(".to-hide").addClass("d-none");
    	$("#noteViewer").removeClass("d-none");
        loadNotes();
        let link = document.createElement('a');
        link.href ="#show-notes";
        link.click();
        activePage = "show-notes";
    })

    $(".viewBin").click(function(e){
        e.preventDefault();
        $(".to-hide").addClass("d-none");
        $("#binViewer").removeClass("d-none");
        loadBin();
        let link = document.createElement('a');
        link.href ="#recycle-bin";
        link.click();
        activePage = "recycle-bin";
    })

    $(".viewSettings").click(function(e){
        e.preventDefault();
        $(".to-hide").addClass("d-none");
        $("#settings").removeClass("d-none");
        let link = document.createElement('a');
        link.href ="#auth";
        link.click();
        activePage = "auth";
    })


    firebase.database().ref("userNotes/"+UID).on("value", function(snapshot){
	    let notes = [];
        if(UID){
    	    snapshot.forEach(function(childSnapshot){
    			let dbKey = childSnapshot.key;
    			let dbValue = childSnapshot.val();
                dbValue.id = dbKey;
    			notes.push(dbValue);
    	    })
        }

	    localStorage.syncNotesFromDb = JSON.stringify(notes);
        loadNotes();
    })

    setInterval(()=>{
        if(online() && UID){
            if(tmpNotes){
                $.each(tmpNotes, (i, item) => {
                    if(item.state == "add"){
                        var uid = firebase.database().ref().child('userNotes').push().key;
                        firebase.database().ref('userNotes/'+UID+'/' + uid).set(
                            {
                                title: item.title,
                                note: item.note
                            },
                        function(error){
                            if(error){
                                console.log("An error prevented saving note");
                            }
                            else{
                                tmpNotes.splice(i, 1);
                            }
                        })
                    }
                })
                localStorage.tmpNotes = JSON.stringify(tmpNotes);
            }
        }
    }, 60000);

    var addNote = (note) => {
        if(!online() || !UID){
            note.id = makeRand(16, "all");
            note.state = "add";
            tmpNotes.push(note);
            localStorage.tmpNotes = JSON.stringify(tmpNotes);
        }
        else{
            var uid = firebase.database().ref().child('userNotes').push().key;
            firebase.database().ref('userNotes/'+UID+'/' + uid).set(note,
            function(error){
            if(error){
                console.log("An error prevented saving note");
            }
        })
        } 
    }

    var updateNote = (id, note) => {
        if(!online() || !UID){
            note.id = id;
            $.each(tmpNotes, (i, item)=>{
                if(item.id == note.id);
                    tmpNotes.splice(i, 1);
            })
            note.state = "update";
            tmpNotes.push(note);
            localStorage.tmpNotes = JSON.stringify(tmpNotes);
        }
        else{
            firebase.database().ref('userNotes/'+UID+'/' + id).set(note,
            function(error){
            if(error){
                console.log("An error prevented saving note");
            }
            else{
                $(".viewNotes").click();
            }
        })
        }
        notify("You updated note!");
    }

    var deleteNote = (id) => {
        let notes = harmonizeNotes();
        let note = notes.find(item => item.id === id);
        if(note){
            note.deleted = true;
            if(!online() || !UID){
                note.id = id;
                $.each(tmpNotes, (i, item)=>{
                    if(item.id == note.id);
                        tmpNotes.splice(i, 1);
                })
                note.state = "delete";
                note.updated_at = new Date().getTime();
                tmpNotes.push(note);
                localStorage.tmpNotes = JSON.stringify(tmpNotes);
                $(".viewNotes").click();
            }
            else{
                firebase.database().ref('userNotes/'+UID+'/' + id).set(note,
                function(error){
                if(error){
                    console.log("An error prevented deleting note");
                }
                else{
                    $(".viewNotes").click();
                }
            })
            }
            notify("Note moved to bin!");
        }
        else
            notify("Note not found!");
    }

    var loadNotes = () => {
    	let notes = harmonizeNotes();
        // console.log(notes); 

    	if(notes.length > 0){
    		let showNote = '';
    		for(var i = 0; i < notes.length; i++){
    			let title = "";
                let desc = "";
    			if(notes[i].note)
                    desc = `<div class="note-desc">${clipText(extractContent(notes[i].note, true), 200)}</div>`;
    			if(notes[i].title){
    				title = `<p class="note-title">${clipText(notes[i].title, 50)}</p>`;
    			}
    			showNote = `
    			<div class="custom-note">
					<div class="note-display" onclick="displayNote('${notes[i].id}')" data-id="${notes[i].id}">
						${title}
						${desc}
					</div>
				</div>
    			`+ showNote;
    		}
            // data-masonry='{ "itemSelector": ".custom-note"}' 
    		$("#noteViewer").html(`
                <div class="notes" id="displayNotes">
                    ${showNote}
                </div>
            `);
            setTimeout(()=>{
                $(".notes").masonry({ 
                  itemSelector: '.custom-note'
                });
            }, 200);
    	}
    	else{
    		$("#noteViewer").html(`
	    		<div style="position: absolute; top: 50%; left: 50%; width: 100%; transform: translate(-50%, -50%)">
					<div class="col-12 mt-5 d-flex justify-content-center">
		    			<img src="empty.png" class="img-responsive d-flex">
		    		</div>
					<div class="col-12 d-flex justify-content-center">
		    			<p class="mt-5 text-center"> You have not added any notes yet</p>
		    		</div>
					<div class="col-12 d-flex justify-content-center">
		    			<button class="mt-3 btn btn-secondary" onclick="createNote()"> Add a new note</button>
		    		</div>
		    	</div>
    			`);
    	}
    }

    var loadBin = () => {
        let notes = binNotes();
        // console.log(notes); 

        if(notes.length > 0){
            let showNote = '';
            for(var i = 0; i < notes.length; i++){
                let title = "";
                let desc = "";
                if(notes[i].note)
                    desc = `<div class="note-desc">${clipText(extractContent(notes[i].note, true), 200)}</div>`;
                if(notes[i].title){
                    title = `<p class="note-title">${clipText(notes[i].title, 50)}</p>`;
                }
                showNote = `
                <div class="custom-note">
                    <div class="note-display" data-id="${notes[i].id}">
                        ${title}
                        ${desc}
                    </div>
                </div>
                `+ showNote;
            }
            // data-masonry='{ "itemSelector": ".custom-note"}' 
            $("#binViewer").html(`
                <div class="notes" id="displayBinNotes">
                    ${showNote}
                </div>
            `);
            // setTimeout(()=>{
            //     $(".notes").masonry({ 
            //       itemSelector: '.custom-note'
            //     });
            // }, 200);
        }
        else{
            $("#binViewer").html(`
                <div style="position: absolute; top: 50%; left: 50%; width: 100%; transform: translate(-50%, -50%)">
                    <div class="col-12 mt-5 d-flex justify-content-center">
                        <img src="empty.png" class="img-responsive d-flex">
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <p class="mt-5 text-center"> Your recycle bin is empty! <br>
                        <small>Deleted notes appear here and can be retrieved or deleted permanently</small></p>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <button class="mt-3 btn btn-secondary" onclick="createNote()"> Add a new note</button>
                    </div>
                </div>
                `);
        }
    }

    var notify = (text, delay = 0.1, timeout = 5) => {
        var showNotification = () =>{
            $(".notification-log").html(`<span>${text}</span>`);
            setTimeout(function() {
                $(".notification-log").empty();
            }, timeout * 1000);
        }
        
        setTimeout(showNotification, delay * 1000);

    }


    $("#addNote").click(function(e){
        e.preventDefault();
    	let note = $("#noteTaker").summernote("code");
    	let title = $("#title").val();
        if(note == "<p><br></p>")
            note = "";
    	if(!note && !title){
    		notify("Note cannot be empty");
    		return false;
    	}
    	
    	addNote({title: title, note: note, added: new Date().getTime()});
    	$("#noteTaker").summernote("code", "");
		$("#title").val("");
    	$(".viewNotes").click();
    	// location.reload();

    })

    $("#updateNote").click(function(e){
        e.preventDefault();
        let id = $(".note-id").text();
        let note = $("#noteModifier").summernote("code");
        let title = $("#update-title").val();
        if(note == "<p><br></p>")
            note = "";
        if(!note && !title){
            notify("Note cannot be empty", 0, 10);
            return false;
        }
        else{
            updateNote(id, {title: title, note: note, updated_at: new Date().getTime()});
            $(".viewNotes").click();
        }
    })

    loadNotes();

    var editNote = (id) => {
        let notes = harmonizeNotes();
        let note = notes.find(item => item.id == id);
        if(note){
            $("#update-title").val(note.title);
            $("#noteModifier").summernote("code", note.note);
            $(".note-id").text(id);
        }
        else{
            $("#noteEditor").find(".row").html(`<p>Note not found</p>`);
        }

        $(".to-hide").addClass("d-none");
        $("#noteEditor").removeClass("d-none");
        activePage = "note-update/"+id;
    }

    $(".editNote").click(function(e){
    	let id = $(this).data("id");
        let link = document.createElement('a');
        link.href ="#note-update/"+id;
        link.click();
    })

    $(".deleteNote").click(function(e){
    	let id = $(this).data("id");
    	deleteNote(id);
    })

    setInterval(()=>{
        if(checkLoc("show-notes") > -1){
            if(activePage !== "show-notes")
                $(".viewNotes").click();
        }
        else if(checkLoc("recycle-bin") > -1){
            if(activePage !== "recycle-bin")
                $(".viewBin").click();
        }
        else if(checkLoc("create-new") > -1){
            if(activePage !== "create-new")
                $(".createNew").click();
        }

        else if(checkLoc("note/") > -1){
            let id = String(window.location).split("note/")[1];
            if(activePage !== "note/"+id){
                activePage = "note/"+id;
                showNote(id);
            }
        }

        else if(checkLoc("auth") > -1){
            if(activePage !== "auth")
                $(".viewSettings").click();

            $(".authstate").addClass("d-none");

            if(UID)
                $(".logged").removeClass("d-none");
            
            else
                $(".not-logged").removeClass("d-none");
        }

        else if(checkLoc("note-update/") > -1){
            let id = String(window.location).split("note-update/")[1];
            if(activePage !== "note-update/"+id){
                $(".note-id").text(id);
                editNote(id);
            }
        }

        else{
            if(checkLoc("app") > -1){
                $(".viewNotes").click();
            }
        }
    },200)

    // AUTHENTICATION

    firebase.auth().onAuthStateChanged(function(user) {
     window.user = user; // user is undefined if no user signed in
        if(user){
            UID = user.uid;
            $(".logged-as").html(`<h5>Your Information</h5>
                <p style="border: 1px solid #888; border-radius: 5px" class="p-2">${user.displayName} <br>
                <small>${user.email}</small></p>`).removeClass("d-none");
            localStorage.syncNoteUID = UID;
            $(".user-image").html(`<img src="${user.photoURL}" title="${user.displayName}">`);
            console.log(user);
        }
        else{
            UID = "";
            localStorage.syncNoteUID = "";
            localStorage.syncNotesFromDb = JSON.stringify([]);
            $(".user-image").html(`<i class="fa fa-user"></i>`);
            $(".logged-as").addClass("d-none");
        }
    });
    
    $(".link-account").click(function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        firebase.auth().signInWithPopup(provider) // Opens a popup window and returns a promise to handle errors.
    })

    $(".unlink-account").click(function(e){
        e.preventDefault();
        firebase.auth().signOut()
        .catch(function (err) {
           alert("Could not logged you out at the moment");
           return false;
         });
    })

    // console.log(UID);
    
    // 
    // NAVIGATION MENU CONTROL
    // 

    $(".menu-toggle").click(function(){
        if($(this).hasClass("fa-bars")){
            $(".navMenu").removeClass("animate__fadeOutLeft d-none").addClass("animate__fadeInLeft");
            $(this).removeClass("fa-bars").addClass("fa-times");
        }
        else{
            $(".navMenu").removeClass("animate__fadeInLeft").addClass("animate__fadeOutLeft");
            $(this).removeClass("fa-times").addClass("fa-bars");
        }
    })

}(jQuery))