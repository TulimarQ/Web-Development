/********w************
    
	Project 3 Javascript
	Name: Tulimar Quintero
	Date: July 19, 2023 
	Description: Project 3 Form Validation

*********************/

const itemDescription = ["MacBook", "The Razer", "WD My Passport", "Nexus 7", "DD-45 Drums"];
const itemPrice = [1899.99, 79.99, 179.99, 249.99, 119.99];
const itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
let numberOfItemsInCart = 0;
let orderTotal = 0;

/*
 * Handles the submit event of the survey form
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
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();

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
	// Determine if any items are in the cart
	// When the cart has not items, submission of form is halted
	if (numberOfItemsInCart == 0) {
		// Display an error message contained in a modal dialog element

		const modal = document.querySelector("#cartError");
		modal.showModal();

		const closeModal = document.querySelector(".close-button");

		closeModal.addEventListener("click", () => {
			modal.close();
			document.getElementById("qty1").focus();
		});

		// Form has errors
		errorFlag = true;
	}

	//	Complete the validations below
		
	    // Full Name validation	
		let fullName = document.getElementById("fullname");
		if (!formFieldHasInput(fullName)) {
			if (!errorFlag){
				fullName.focus();
				fullName.select();
			}
			document.getElementById("fullname_error").style.display = "block";
			errorFlag = true;
		}
			
		//Address validation
		let address = document.getElementById("address");
		if (!formFieldHasInput(address)) {
			if (!errorFlag){
				address.focus();
				address.select();
			}
			document.getElementById("address_error").style.display = "block";
			errorFlag = true;
		}
		
		// City validation
		let city = document.getElementById("city");
		if (!formFieldHasInput(city)) {
			if (!errorFlag){
				city.focus();
				city.select();
			}
			document.getElementById("city_error").style.display = "block";
			errorFlag = true;
		}
	
		// Postal Code validation
		let postalCode = document.getElementById("postal");
		if (!formFieldHasInput(postalCode)) {
			if (!errorFlag){
				postalCode.focus();
				postalCode.select();
			}
			document.getElementById("postal_error").style.display = "block";
			errorFlag = true;
		} else {
			// Validate Postal Code format using a regular expression
			let regexpostal = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);
			if (!regexpostal.test(postalCode.value.trim())) {
				if (!errorFlag){
					postalCode.focus();
					postalCode.select();
				}
			document.getElementById("postalformat_error").style.display = "block";
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
		
		// Radio Button validation
		let cardType = ["visa", "amex", "mastercard"];
		let cardTypeChecked = false;

		for (let i = 0; i < cardType.length && !cardTypeChecked; i++) {
			if (document.getElementById(cardType[i]).checked) {
				cardTypeChecked = true;
			}
		}

		if (!cardTypeChecked) {
			document.getElementById("cardtype_error").style.display = "block";
			errorFlag = true;
		}

		// Card Name validation
		let cardName = document.getElementById("cardname");
		if (!formFieldHasInput(cardName)) {
			if (!errorFlag){
				cardName.focus();
				cardName.select();
			}
			document.getElementById("cardname_error").style.display = "block";
			errorFlag = true;
		}

		  // Expiry Date (Month) validation
		  let expiryMonth = document.getElementById("month");
		  if (!formFieldHasSelection(expiryMonth)) {
			document.getElementById("month_error").style.display = "block";
			errorFlag = true;
		  }
		  else {
			// Get the current date to compare with the expiry date
			let expiryYear = document.getElementById("year");
			let currentDate = new Date();
			let expiryDate = new Date(expiryYear.value, expiryMonth.value - 1, 1);
			if (expiryDate < currentDate) {
				document.getElementById("expiry_error").style.display = "block";
				errorFlag = true;
			}
		}

		// Card Number validation
		let cardNumber = document.getElementById("cardnumber");
		if (!formFieldHasInput(cardNumber)) {
			if (!errorFlag){
				cardNumber.focus();
				cardNumber.select();
			}
			document.getElementById("cardnumber_error").style.display = "block";
			errorFlag = true;
		} else {
			// Validate Card Number using the modulus check
			if (!isValidCardNumber(cardNumber.value.trim())) {
				document.getElementById("invalidcard_error").style.display = "block";
				errorFlag = true;
			}
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

	function formFieldHasSelection(fieldElement) {
		// Check if a selection has been made in a dropdown field
		return fieldElement.selectedIndex !== -1 && fieldElement.options[fieldElement.selectedIndex].value !== "- Month -";
	}


	function isValidCardNumber(cardNumber) {
	
		const checkingFactors = [4, 3, 2, 7, 6, 5, 4, 3, 2];
		let sum = 0;
		for (let i = 0; i < checkingFactors.length; i++) {
			sum += parseInt(cardNumber.charAt(i)) * checkingFactors[i];
		}
		const remainder = sum % 11;
		const checkDigit = (11 - remainder);

		// Compare the check digit with the last digit in the credit card number
		return parseInt(cardNumber.charAt(9)) === checkDigit;
	}


/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function addItemToCart(itemNumber) {
	// Get the value of the quantity field for the add button that was clicked 
	let quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if (!isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber)) {
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if (numberOfItemsInCart == 0) {
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		let cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		let cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		let cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		let itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		let cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		let cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function () {
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				let itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				let itemQuantityField = document.getElementById(itemQuantityFieldId);

				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if (numberOfItemsInCart == 0) {
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}
			},
			false
		);

		// Create a div used to clear the floats
		let cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		let cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);

		// Create the cart list item and add the elements within it
		let cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		let cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

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
	//	Populate the year select with up to date values
 	let year = document.getElementById("year");
	let currentDate = new Date();
	for (let i = 0; i < 7; i++) {
		let newYearOption = document.createElement("option");
		newYearOption.value = currentDate.getFullYear() + i;
		newYearOption.innerHTML = currentDate.getFullYear() + i;
		year.appendChild(newYearOption);
	} 

	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);

	document.getElementById("orderform").reset();

	// Add event listener for our custom form submit function
	document.getElementById("orderform").addEventListener("reset", resetForm);

	// Call hideErrors() to hide all error messages
	hideErrors();	


	// Add event listeners for the product buttons
    document.getElementById("addMac").addEventListener("click", function() {
        addItemToCart(1);
    });

    document.getElementById("addMouse").addEventListener("click", function() {
        addItemToCart(2);
    });

    document.getElementById("addWD").addEventListener("click", function() {
        addItemToCart(3);
    });

    document.getElementById("addNexus").addEventListener("click", function() {
        addItemToCart(4);
    });

    document.getElementById("addDrums").addEventListener("click", function() {
        addItemToCart(5);
    });

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












