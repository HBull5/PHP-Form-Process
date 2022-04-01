/**
 * @author Harcourt 
 * @description Handles form submission via AJAX / validation / built to work with recaptcha v3 || v2
 *
 * HOW TO USE 
 * ==========
 * 1) Make sure you're loading form-process.js in the head of your HTML document
 * 2) Define a variable for your form ( e.g. const form = document.querySelector( '#my-form' ); )
 * 3) Define a variable for the submit button ( e.g. const submitBtn = document.querySelector( '#my-submit-btn' ); ) 
 * 4) Define a variable for the URL you want the form to post to ( this can be relative or absolute ) ( e.g. const url = './inc/form-process.php'; )
 * 5) Define a string variable consisting of the html you'd like to be displayed as a success message once the form has been submitted ( e.g. const response = '<h2>Thank you for your response!</h2>'; )
 * 6) Define variables for all of your inputs / textareas ( e.g. const email = document.querySelector( 'input[type=email]' ); )
 * 7) Add an event listener to your submit button variable listening for click events
 * 8) Inside the event listener callback call e.preventDefault(); to prevent the default button behavior 
 * 9) Inside the event listener callback call the formHandler function passing in the form variable, submit button variable, url variable, followed by however many input / textarea variables you defined in step 3
 * 10) < OPTIONAL > Create CSS rules for the .valid & .error classes these will be applied appropriately to the inputs / text areas 
 * 11) Your form should be functioning by this point if not reach out to Harcourt for help troubleshooting!
 */
function contactCaptcha() {
    contactBot = false;
}

function formHandler( form, submitBtn, url, response, ...fields ) {
    const data = new FormData( form );
    const errors = validation( ...fields ); 
    disableFields( submitBtn, ...fields );
    if ( errors.length > 0 || contactBot ) {
        let errorMessage = '';
        for( const error of errors ) {
            errorMessage += `${error.message}\n`;
        }
        alert( errorMessage );
        enableFields( submitBtn, ...fields );
    } else { 
        ajaxReq( url, form, response, data );
        clearFields( ...fields );
    }
};

function validation(  ...fields ) {
    const errors = [];
    const inputs = document.querySelectorAll( 'input, textarea' );
    for ( const input of inputs ) {
        if ( input.getAttribute( 'name' ) ) {
            input.classList.remove( 'error' );  
            input.classList.add( 'valid' );                                                                               
        }
    }
    for( const field of fields ) {
        const name = field.getAttribute( 'name' );
        const isRequired = field.hasAttribute( 'required' );
        if ( field.value == '' && isRequired ) {
            errors.push( { message: `${ name } cannot be empty!` } );
            field.classList.add( 'error' );
            field.classList.remove( 'valid' );
        } else if ( name == 'email' ) {
            if ( !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( field.value ) ) {
                errors.push( { message: 'Email field must be a valid email!' } );
                field.classList.add( 'error' );
                field.classList.remove( 'valid' );
            }
        }
    }
    return errors; 
}

function disableFields( submitBtn, ...fields ) {
    submitBtn.setAttribute( 'disabled', true );
    for ( const field of fields ) {
        field.setAttribute( 'disabled', true );
    }
}

function enableFields( submitBtn, ...fields ) {
    submitBtn.removeAttribute( 'disabled' );
    for ( const field of fields ) {
        field.removeAttribute( 'disabled' );
    }
}

function ajaxReq( url, form, response, data ) {
    let xhr = new XMLHttpRequest(); 
    xhr.open( 'POST', url, true ); 
    xhr.onload = function() {
        console.log( 'Success!' );
        form.classList.add( 'submitted' );
        form.innerHTML = response;
    }
    xhr.onerror = function() {
        alert( 'There was an error submitting this form!' );
    }
    xhr.send( data );
}

function clearFields( ...fields ) {
    for ( const field of fields ) {
        field.value = '';
    }
}
