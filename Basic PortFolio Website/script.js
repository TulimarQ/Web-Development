/********w************
    
	Project 3 Javascript
	Name: Tulimar Quintero
	Date: July 19, 2023 
	Description: Final Project F

*********************/
/*
 * Handles the submit event of the contact form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();	

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear data?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	let errorFlag = false;
		
	    // Name validation	
		let name = document.getElementById("name");
		if (!formFieldHasInput(name)) {
			if (!errorFlag){
				name.focus();
				name.select();
			}
			document.getElementById("name_error").style.display = "block";
			errorFlag = true;
		}
			
	
		// Phone validation
		let phone = document.getElementById("phone");
		if (!formFieldHasInput(phone)) {
			if (!errorFlag){
				phone.focus();
				phone.select();
			}
			document.getElementById("phone_error").style.display = "block";
			errorFlag = true;
		} else {
			// Validate phone format using a regular expression
			let regexphone = new RegExp(/^\d{10}$/);
			if (!regexphone.test(phone.value.trim())) {
				if (!errorFlag){
					phone.focus();
					phone.select();
				}
			document.getElementById("phoneformat_error").style.display = "block";
			errorFlag = true;
			}
		}
		// Email validation
		let email = document.getElementById("email");
		if (!formFieldHasInput(email)) {
			if (!errorFlag){
				email.focus();
				email.select();
			}
			document.getElementById("email_error").style.display = "block";
			errorFlag = true;
		} else {
			// Validate Email format using a regular expression
			let regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
			if (!regexEmail.test(email.value.trim())) {
				email.focus();
				email.select();
				document.getElementById("emailformat_error").style.display = "block";
				errorFlag = true;
			}
		}
        // Comments validation 
        let comments = document.getElementById("comments");
		if (!formFieldHasInput(comments)) {
			if (!errorFlag){
				comments.focus();
				comments.select();
			}
			document.getElementById("comments_error").style.display = "block";
			errorFlag = true;
		}
	return errorFlag;
	}

	function formFieldHasInput(fieldElement) {
		// Check if the text field has a value
		if (fieldElement.value == null || fieldElement.value.trim() == "") {
			// Invalid entry
			return false;
		}
	
		// Valid entry
		return true;
	}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");
	console.log(error);

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {

	// Add event listener for the form submit
	document.getElementById("contact_form").addEventListener("submit", validate);

	// Add event listener for our custom form submit function
	document.getElementById("contact_form").addEventListener("reset", resetForm);

	// Call hideErrors() to hide all error messages
	hideErrors();

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

