$(document).ready(function(){

	let catUL = $("#cats");

	// append the list of cats from Heroku server to the HTML ul
	function appendCatList(list) {
		let parsedList = JSON.parse(list);

		for (let i = 0; i < parsedList.length; i++) {
			let name = parsedList[i].name;
			let note = parsedList[i].note;
			let catLI = $("<li></li>").text(name + ' - ' + note);
			catUL.append(catLI);
		};
	};

	function addNewCat() {
		// grab the input values from the HTML form fields
		let newName = $("#cat-name")[0].value;
		let newNote = $("#cat-note")[0].value;

		// format new cat into a JSON object for the database
		let newCatObject = { name: newName, note: newNote, image: null };
		let jsonNewCatObject = JSON.stringify(newCatObject);

		// add new cat to the Heroku database!
		$.ajax( { url: "https://ga-cat-rescue.herokuapp.com/api/cats", type: "post", data: jsonNewCatObject });

		// append the HTML input data to the list of cats without refreshing the page
		let catLI = $("<li></li>").text(newName + ' - ' + newNote);
		catUL.prepend(catLI);
	};

	// call the Heroku server to return the list of cats
	let catList = $.get("https://ga-cat-rescue.herokuapp.com/api/cats").done(function(data) { appendCatList(data); } );

	// set up an event handler to listen for a click of the submit button
	$('form').on('submit', function(event){
    // Stop the form from submitting
    event.preventDefault();

		// run addNewCat function
		addNewCat();   
	});
});