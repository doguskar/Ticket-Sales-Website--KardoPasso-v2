/* Sign In */
$('#loginNextBtn').click(showLoginStep2)
$('#loginBackBtn').click(showLoginStep1)

function showLoginStep1() {
    $('#signInStepUserKey').removeClass('passive').addClass('active')
    $('#signInStepPassword').removeClass('active').addClass('passive')
    $('#submittedUserKey').removeClass('active').addClass('passive')
    $('#LoginKey').focus()
    footerBody = `<div>Don't you have any account? <a href="javascript:;" id="register_link">Create an account now!</a> </div>`
    $('#dk-signin-box .box-footer-sec').html(footerBody)
}
function showLoginStep2() {
    if(!$("#LoginKey").valid())
        return;
        
    $('#signInStepUserKey').removeClass('active').addClass('passive')
    $('#signInStepPassword').removeClass('passive').addClass('active')
    $('#submittedUserKey .text').html($('#LoginKey').val())
    $('#submittedUserKey').removeClass('passive').addClass('active')
    $('#Password').focus()
    footerBody = `Don't you remember your password? <a href="javascript:;">Reset your password!</a> </div>`
    $('#dk-signin-box .box-footer-sec').html(footerBody)
}

$('#loginForm').submit(function(e){
    e.preventDefault();
    //Pressed enter in username input
    if($('#signInStepUserKey').hasClass('active')){
        showLoginStep2();
        return 
    }
    if(!$("#loginForm").valid()){
        return  
    }
    $('#loginForm input[type="submit"]').attr('disabled', 'disabled').addClass('disabled')
    showLoading()
    $.ajax({
        type: "POST",
        url: "/Members/Login",
        data: $("#loginForm").serialize(),
        success: function (json) {
            var loginReply = JSON.parse(json);
            if (loginReply.result) {
                //Success Login
                if (loginReply.redirectAddress) {
                    window.location.href = loginReply.redirectAddress;
                } else {
                    window.location.href = "http://" + location.hostname + ":" + location.port;
                }
            } else {
                //Failed Login
                if (loginReply.invalidLoginKey || loginReply.invalidPassword) {
                    showLoginStep1();
                    showWarn("Invalid username or password!");
                }
            }
            //removeLoading();
        },
        error: function () {
            //removeLoading();
        }
    })
    $('#loginForm input[type="submit"]').removeAttr('disabled').removeClass('disabled')
    removeLoading()
})
validator = $("#loginForm").validate({
    onsubmit : false,
    errorClass: "form-error",
    rules: {
        LoginKey: {
            required: true,
            isNotEmptyOrNull: true
        },
        Password: {
            required: true
        }
    },
    messages: {
        LoginKey: {
        },
        Password: {
        }
    }
});

/* Sign In END */
/* Sign Up  */
$(document).ready(function(){
    if($('#r_day').length > 0){
        var options = "";
        for(var i = 1; i<=31; i++)
            options += '<option value="' + i + '">' + i + '</option>';
        $('#r_day').html(options)
    }
    if($('#r_month').length > 0){
        var options = "";
        for(var i = 1; i<=12; i++)
            options += '<option value="' + i + '">' + i + '</option>';
        $('#r_month').html(options)
    }
    if($('#r_year').length > 0){
        var options = "";
        for(var i = new Date().getFullYear() - 13; i>new Date().getFullYear() - 113; i--)
            options += '<option value="' + i + '">' + i + '</option>';
        $('#r_year').html(options)
    }
})

$('#signUpNext1').click(showSignUpStep2)
$('#signUpBack2').click(showSignUpStep1)
$('#signUpNext2').click(showSignUpStepSubmit)
$('#signUpBack3').click(showSignUpStep2)

function showSignUpStep1(){
    $('#signUpStep2').removeClass('active').addClass('passive')
    $('#signUpStep1').removeClass('passive').addClass('active')
    $('#r_user_name').focus()
}
function showSignUpStep2(){
    if(!$("#r_user_name").valid() || !$("#r_eposta").valid() || !$("#r_password").valid())
        return;
    $('#signUpStep1').removeClass('active').addClass('passive')
    $('#signUpStepSubmit').removeClass('active').addClass('passive')
    $('#signUpStep2').removeClass('passive').addClass('active')
    $('#r_rname').focus()
}
function showSignUpStepSubmit(){
    if(!$("#r_rname").valid() || !$("#r_surname").valid())
        return;
    $('#signUpStep2').removeClass('active').addClass('passive')
    $('#signUpStepSubmit').removeClass('passive').addClass('active')
    $('#r_day').focus()
}
function showSignUpStepResult(){
    $('#signUpStepSubmit').removeClass('active').addClass('passive')
    $('#signUpStepResult').removeClass('passive').addClass('active')
}
function signUpNextStep(){
    idOfActiveStep = $('#signUpForm .register-steps.active').attr('id');
    switch(idOfActiveStep){
        case "signUpStep1": showSignUpStep2(); break;
        case "signUpStep2": showSignUpStepSubmit(); break;
        default: alert("Error"); break;
    }
}
$('#signUpForm').submit(function(e){
    e.preventDefault();
    //Submit form
    if ($('#signUpStepSubmit').hasClass('active')) {
        if(!$("#signUpForm").valid()){
            showWarn("There are invalid inputs!");
            return;
        }
        if(!validBirthDate()){
            $('#r_date-error').html('Invalid date')
            return;
        }

        $('#loginForm input[type="submit"]').attr('disabled', 'disabled').addClass('disabled')
        showLoading()
        $.ajax({
            type: "POST",
            url: "/Members/",
            data: $("#signUpForm").serialize(),
            success: function (json) {

            },
            error: function () {
            }
        })
        $('#loginForm input[type="submit"]').removeAttr('disabled').removeClass('disabled')
        removeLoading()
    } else {
        signUpNextStep();
    }
})

//Validations
jQuery.validator.addMethod("usernameChars", function(val, e){
    return /^[a-zA-Z0-9._]*$/.test(val);
}, "Username can contains english chars, numbers, dot and underscore.")

jQuery.validator.addMethod("singleDotOrUnderscore", function(val, e){
    return /^(?!.*[_.]{2}).*$/.test(val);
}, "You cannot use dots or underscores in a row.")

jQuery.validator.addMethod("turkishCharsWithSpace", function(val, e){
    return /^[a-zA-ZğüöşıçĞÜÖŞİÇ ]*$/.test(val);
}, "You can use turkish chars")

jQuery.validator.addMethod("isNotEmptyOrNull", function(val, e){
    return !(val.length === 0 || !val.trim());;
}, "This field is not be blank")


$("#signUpForm").validate({
    onsubmit: false,
    errorClass: "form-error",
    //errorLabelContainer: "#form_errors ul",
    //wrapper: "li",
    rules: {
        r_user_name: {
            required: true,
            minlength: 3,
            maxlength: 32,
            usernameChars: true,
            singleDotOrUnderscore: true
        },
        r_eposta: {
            required: true,
            email: true
        },
        r_password: {
            required: true,
            minlength: 6,
            maxlength: 255
        },
        r_rname: {
            required: true,
            isNotEmptyOrNull: true,
            turkishCharsWithSpace: true
        },
        r_surname: {
            required: true,
            isNotEmptyOrNull: true,
            turkishCharsWithSpace: true
        }

    },
    messages: {
        r_user_name: {
            required: "Username is required",
            minlength: jQuery.validator.format("Please, at least {0} characters are necessary"),
            maxlength: jQuery.validator.format("Please, at most {0} characters are necessary"),
            usernameChars: "Username can contains english chars, numbers, dot and underscore.",
            singleDotOrUnderscore: "You cannot use dots or underscores in a row."
        },
        r_eposta: {
        },
        r_password: {
        },
        r_rname: {
        },
        r_surname: {
        }
    }
});

function validBirthDate(){
    var day = $('#r_day').val();
    var month = $('#r_month').val();
    var year = $('#r_year').val();
    if (day && month && year){
        var date = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day));
        if (date.getMonth() == (parseInt(month) - 1))
            return true;
    }
    return false;
}

//Validations End


/* Sign Up END */

function showLoading(e){
    body = `<div class="cover-content" id="loadingScreen"><div class="out-of-middle"><div class="middle"><div style="text-align:center"><div class="lds-ripple"><div></div><div></div></div></div></div></div></div>`
    $('#dk-signin-box .box-content-sec').append(body)
}
function removeLoading(){
    $('#loadingScreen').remove()
}

function showWarn(str) {
    warningBody = `<div class="dk-alert bg-danger"><p>${str}</p></div>`
    $('#dk-signin-box .warnings').html(warningBody)
}
function clearWarnings() {
    $('#dk-signin-box .warnings').html("")
}