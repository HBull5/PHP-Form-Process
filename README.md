# Form Processing & Recaptcha

## Form Processing & Validation 

1. Make sure you're loading form-process.js in the head of your HTML document ( sauce: https://github.com/HBull5/PHP-Form-Process  )
2. Define a variable for your form ( e.g. `const form = document.querySelector( '#my-form' );` )
3. Define a variable for the submit button ( e.g. `const submitBtn = document.querySelector( '#my-submit-btn' );` ) 
4. Define a variable for the URL you want the form to post to ( this can be relative or absolute ) ( e.g. `const url = './inc/form-process.php';` )
5. Define a string variable consisting of the html you'd like to be displayed as a success message once the form has been submitted `( e.g. const response = '<h2>Thank you for your response!</h2>'; )`
6. Define variables for all of your inputs / textareas ( e.g. `const email = document.querySelector( 'input[type=email]' );` )
7. Add an event listener to your submit button variable listening for click events
8. Inside the event listener callback call `e.preventDefault();` to prevent the default button behavior 
9. Inside the event listener callback call the formHandler function passing in the form variable, submit button variable, url variable, followed by however many input / textarea variables you defined in step 3
10. < OPTIONAL > Create CSS rules for the .valid & .error classes these will be applied appropriately to the inputs / text areas 
11. Your form should be functioning by this point if not reach out to Harcourt for help troubleshooting!
