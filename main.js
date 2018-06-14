document.querySelector("#form").addEventListener("submit", addWeb);


function addWeb(e){
	var page = document.querySelector("#page").value;
	var url = document.querySelector("#url").value;


	if(!validateForm(page, url)){
    	return false;
 	}

	var bookmark = {
		page : page,
		url: url
	}

	if (localStorage.getItem("bookmarks") === null) {

		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	} else {

		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

		
	}

	document.querySelector("#form").reset();

	getWebs();

	e.preventDefault();

}

function getWebs(){

	if (localStorage.getItem("bookmarks") === null){

		return false
	}else{

		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		var box = document.querySelector('#bookmarks-div');

		box.innerHTML = " ";

		for (var i = 0; i < bookmarks.length; i++) {

			var page = bookmarks[i].page;
			var url = bookmarks[i].url;

			box.innerHTML += '<div class="box">'+
								'<h3>'+page+
                                ' <a class="btn-visit" target="_blank" href="'+url+'">Visitar</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn-delete" href="#">Eliminar</a> ' +
                                '</h3>'+
                                '</div>';
		}

	}

	
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		for (var i = 0; i < bookmarks.length; i++) {

			if (bookmarks[i].url == url){

				bookmarks.splice(i, 1);

			}

		}

	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	getWebs();
}

function validateForm(page, url){
  if(!page || !url){
	alert('Rellena el formulario');
	return false;
  }

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

  if(!url.match(regex)){
    alert('Ingresa una URL válida');
    return false;
  }

  return true;
}