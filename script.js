
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

function error(input, message) {                                // for revealing error messsage.
    input.className = 'form-control is-invalid';  
    const div = input.nextElementSibling;          
    div.innerText = message;                       
    div.className = 'invalid feedback'; 
    div.style.color = "red";
}

function success(input) {                                      // input boxes going green when their inputs are success.
    input.className = 'form-control is-valid';
    if(input.value){
        input.nextElementSibling.innerText = "";
    }
}

function checkMail(input) {                                    // for checking the email, regular expressions( ---regex--- ). you can find it in stackoverflow. 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        success(input);
    } else {
        error(input, 'wrong e-mail');
    }
}

function checkRequired(inputs){                                // for checking the inputs.                                                              
    inputs.forEach(function (input) {             
        if (input.value === "") {
            error(input, `${input.id} is required`);
        } else {
            success(input);
        }
    });
}

function checkLength(input, min, max) {                        // for checking min/max input.length.
    if (input.value.length < min) {
        error(input, `${input.id} must be at least ${min} characters long.`);
    } else if (input.value.length > max) {
        error(input, `${input.id} must be at most ${max} characters long`);
    } else {
        success(input);
    }
}

function checkPasswords(input1, input2) {                      // for checking if the passwords match or not.
    if (input1.value !== input2.value) {
        error(input2, 'passwords do not match.');
    }
}

function checkPhone(input) {                                  // for checking if number is written and max 10 characters.
    var exp = /^\d{10}$/;           
    if (!exp.test(input.value)) {
        error(input, 'phone number must be at least 10 characters.');
    } else {
        success(input);
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    checkRequired([username, email, phone, password, repassword]);
    checkMail(email);
    checkLength(username, 7, 15);
    checkLength(password, 7, 12);
    checkPasswords(password, repassword);
    checkPhone(phone);

});