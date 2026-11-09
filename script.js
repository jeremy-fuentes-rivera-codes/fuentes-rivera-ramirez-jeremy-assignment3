/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
const validate = (e) => {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}

    checkData();
	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
const formHasErrors = () => {
	let errorFlag = false

	const requiredTextFields = ["fname", "lname", "email", "phone", "job-title", "job-years", "job-description"]

    // Loop through each required text field and validate that it has input
	for (const field of requiredTextFields) {
		let textField = document.getElementById(field)
		//	Determine if the field has input
		if (!formFieldHasInput(textField)) {
			document.getElementById(field + "-error").style.display = "block"
			if (!errorFlag) {
				textField.focus()
			}
			//	Raise the error flag indicating a validation error
			errorFlag = true
		}
	}

    // Validate the phone number is 10 digits
    let regex = new RegExp(/^\d{10}$/)
    let phoneNumber = document.getElementById("phone").value
    if (!regex.test(phoneNumber)) {
		document.getElementById("phone-error").style.display = "block"

		//	Determine if this is the first error
		if (!errorFlag) {
			phone.focus()
			phone.select()
		}

		errorFlag = true
	}


    // Validate the email address is in a valid format
    let email = document.getElementById("email").value
    let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    if (!emailRegex.test(email)) {
		document.getElementById("email-error").style.display = "block"

		//	Determine if this is the first error
		if (!errorFlag) {
			emailField.focus()
			emailField.select()
		}

		errorFlag = true
	}


    // Validate the years worked is a 2 digit number
    let yearsWorked = document.getElementById("job-years").value
    let yearsWorkedRegex = new RegExp(/^\d{1,2}$/)
    if (!yearsWorkedRegex.test(yearsWorked)) {
        document.getElementById("job-years-error").style.display = "block"

        if (!errorFlag) {
            yearsWorked.focus()
            yearsWorked.select()
        }
    }


    //	Validate the user has selected a program
	const program = ["worked-here-yes", "worked-here-no"]
	let programChecked = false
	//	Loop through each program id
	for (const programId of program) {
		//	Determine if the radio button has been checked
		if (document.getElementById(programId).checked) {
			programChecked = true
		}
	}
	if (!programChecked) {
		document.getElementById("worked-here-error").style.display = "block"
		errorFlag = true
	}



    //	Validate the job dropdown
    const jobs = document.getElementById("jobs")

    if (jobs.value === "") {
        document.getElementById("jobs-error").style.display = "block"
        if (!errorFlag) {
            jobs.focus()
        }
        errorFlag = true
    }


//	Validate the user has selected a program
	const programTwo = ["modality-in-person", "modality-remote", "modality-hybrid"]

	let programCheckedTwo = false

	//	Loop through each program id
	for (const programId of programTwo) {
		//	Determine if the radio button has been checked
		if (document.getElementById(programId).checked) {
			programCheckedTwo = true
		}
	}

	if (!programCheckedTwo) {
		document.getElementById("modality-error").style.display = "block"
		errorFlag = true
	}
    

    return errorFlag  
};

/*
 * Resets (hides) all of the error messages on the page.
 */
const hideAllErrors = () => {
	let errorFields = document.getElementsByClassName("error")

	for (const field of errorFields) {
		field.style.display = "none"
	}
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
const resetForm = (e) => {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear survey?')) {
		// Ensure all error fields are hidden
		hideAllErrors();

		// Set focus to the first text field on the page
		document.getElementById("fname").focus();

		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
const formFieldHasInput = (fieldElement) => {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

const load = () => {
    if (localStorage.getItem("Data")) {
        document.getElementById("list").innerHTML = localStorage.getItem("Data")
        clearbutton.style.display = "block"
    }
    document.getElementById("clearbutton").addEventListener("click", clearButton)
}

/** Retrieves and validates the data */
 const checkData = () => {
//  //  Retrieve the values from the DOM
  let firstName = document.getElementById("fname").value
  let lastName = document.getElementById("lname").value
  let email=document.getElementById("email").value

//  //  Javascript will treat an empty string as 0, 
//  //  so first we must parse the mark into a number
//  mark = parseFloat(mark)
//  if (name != "" && isNaN(mark) == false) {
      displayData(firstName, lastName,email)
//  }

//  resetFields()
 }

/**
 * Create DOM elements and add them to the DOM
 *
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} email 
 */
const displayData = (firstName, lastName,email) => {
    //  Declare variables

    let tbody = document.getElementById("list")

    //  Create the table elements using DOM methods
    //  Build the row and its tds
    let newTr = document.createElement("tr")
    let newNameTd = document.createElement("td")
    let newLastNameTd = document.createElement("td")
    let newEmailTd = document.createElement("td")

    //  Add the data to the new elements
    newNameTd.textContent = firstName
    newLastNameTd.textContent = lastName
    newEmailTd.textContent= email

    newTr.appendChild(newNameTd)
    newTr.appendChild(newLastNameTd)
    newTr.appendChild(newEmailTd)

    //  Append the new tr to the tbody
    tbody.appendChild(newTr)

    clearbutton.style.display = "block"
    saveListData()
}

/** Clears the data in the form and hides the clear button */
const clearButton = () => {
    let tbody = document.getElementById("list");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    clearbutton.style.display = "none";
    //resetFields();
    saveListData()
}



//  Saves the list data into local storage
const saveListData = () => {
    const list = document.getElementById("list")
    localStorage.setItem("Data", list.innerHTML)
}

document.addEventListener("DOMContentLoaded", load);

document.addEventListener("DOMContentLoaded", () => {
	// Add event listener for the form submit
	document.getElementById("job-application-form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	document.getElementById("job-application-form").reset();

	// Add event listener for our custom form submit function
	document.getElementById("job-application-form").addEventListener("reset", resetForm);
});
