/* Sign In */
if (document.getElementById("loginForm"))
    document.getElementById("loginForm").addEventListener("submit", function formControl(e) {
        e.preventDefault();
        if(!$("#loginForm").valid())
            return;
        //Pressed enter in username input
        if(document.getElementById("signInStepUserKey").classList.contains("active")){
            showLoginStep2();
        }
        //Submitted form
        else if (document.getElementById("signInStepPassword").classList.contains("active")) {
            //There is an error
            //showLoading(document.getElementById("dk-signin-box").querySelector(".box-content-sec"));
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
                            window.location.href = "http://localhost:8081";
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

        }
    });
if (document.getElementById("loginNextBtn")) {
    debugger
    document.getElementById("loginNextBtn").addEventListener("click", () => showLoginStep2());
}
if(document.getElementById("loginBackBtn"))
    document.getElementById("loginBackBtn").addEventListener("click", () => showLoginStep1());

function showLoginStep1() {
    document.getElementById("signInStepUserKey").classList.remove("passive");
    document.getElementById("signInStepUserKey").classList.add("active");
    document.getElementById("signInStepPassword").classList.remove("active");
    document.getElementById("signInStepPassword").classList.add("passive");
    document.getElementById("submittedUserKey").classList.remove("active");
    document.getElementById("submittedUserKey").classList.add("passive");
    document.getElementById("dk-signin-box").querySelector(".box-footer-sec").innerHTML = '<div>Hesabınız yok mu? <a href="javascript:;" id="register_link">Bir hesap oluştur!</a> </div>';  
}
function showLoginStep2() {
    if(!$("#LoginKey").valid())
        return;
    document.getElementById("signInStepUserKey").classList.remove("active");
    document.getElementById("signInStepUserKey").classList.add("passive");
    document.getElementById("signInStepPassword").classList.remove("passive");
    document.getElementById("signInStepPassword").classList.add("active");
    document.getElementById("submittedUserKey").querySelector(".text").innerHTML = document.getElementById("LoginKey").value;
    document.getElementById("submittedUserKey").classList.remove("passive");
    document.getElementById("submittedUserKey").classList.add("active");
    document.getElementById("dk-signin-box").querySelector(".box-footer-sec").innerHTML = '<div>Şifreni mi unuttun? <a href="javascript:;">Şifreni sıfırla!</a> </div>';
}
function showWarn(str) {
    document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML = '<div class="dk-alert bg-danger"><p>' + str + '</p></div>';
}
function clearWarnings() {
    document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML = "";
}
if(document.getElementById("dk-signin-box").querySelector(".other-accounts")){
    var otherAccounts = document.getElementById("dk-signin-box").querySelector(".other-accounts").querySelectorAll(".accounts-item");
    otherAccounts.forEach(e => {
        e.addEventListener("click", function(){
            alert(e.getAttribute("data-userUID"));
        })
    });
}

$("#loginForm").validate({
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
if(document.getElementById("r_day")){
    var options = "";
    for(var i = 1; i<=31; i++)
        options += '<option value="' + i + '">' + i + '</option>';
    
    document.getElementById("r_day").innerHTML = options;
}
if(document.getElementById("r_month")){
    var options = "";
    for(var i = 1; i<=12; i++)
        options += '<option value="' + i + '">' + i + '</option>';
    
    document.getElementById("r_month").innerHTML = options;
}
if(document.getElementById("r_year")){
    var options = "";
    for(var i = new Date().getFullYear() - 13; i>new Date().getFullYear() - 113; i--)
        options += '<option value="' + i + '">' + i + '</option>';
    
    document.getElementById("r_year").innerHTML = options;
}

if(document.getElementById("signUpNext1"))
    document.getElementById("signUpNext1").addEventListener("click", () => showSignUpStep2());
if(document.getElementById("signUpBack2"))
    document.getElementById("signUpBack2").addEventListener("click", () => showSignUpStep1());
if(document.getElementById("signUpNext2"))
    document.getElementById("signUpNext2").addEventListener("click", () => showSignUpStepSubmit());
if(document.getElementById("signUpBack3"))
    document.getElementById("signUpBack3").addEventListener("click", () => showSignUpStep2());
    

function showSignUpStep1(){
    document.getElementById("signUpStep1").classList.add("active");
    document.getElementById("signUpStep1").classList.remove("passive");
    document.getElementById("signUpStep2").classList.remove("active");
    document.getElementById("signUpStep2").classList.add("passive");
}
function showSignUpStep2(){
    if(!$("#r_user_name").valid() || !$("#r_eposta").valid() || !$("#r_password").valid())
        return;
    document.getElementById("signUpStep1").classList.add("passive");
    document.getElementById("signUpStep1").classList.remove("active");
    document.getElementById("signUpStep2").classList.remove("passive");
    document.getElementById("signUpStep2").classList.add("active");
    document.getElementById("signUpStepSubmit").classList.add("passive");
    document.getElementById("signUpStepSubmit").classList.remove("active");
}
function showSignUpStepSubmit(){
    if(!$("#r_rname").valid() || !$("#r_surname").valid())
        return;
    document.getElementById("signUpStep2").classList.add("passive");
    document.getElementById("signUpStep2").classList.remove("active");
    document.getElementById("signUpStepSubmit").classList.remove("passive");
    document.getElementById("signUpStepSubmit").classList.add("active");
}

if(document.getElementById("signUpForm"))
    document.getElementById("signUpForm").addEventListener("submit", function formControl(e) {
        e.preventDefault();
        //Submit form
        if (document.getElementById("signUpStepSubmit").classList.contains("active")) {
            if(!$("#signUpForm").valid()){
                showWarn("There are invalid inputs!");
                return;
            }
            if(!validBirthDate()){
                if(document.getElementById("r_date-error"))
                    document.getElementById("r_date-error").innerHTML = "Invalid date";
                return;
            }

            showLoading(document.getElementById("dk-signin-box").querySelector(".box-content-sec"));

            $.ajax({
                type: "POST",
                url: "/Members/",
                data: $("#signUpForm").serialize(),
                success: function (json) {

                },
                error: function () {
                }
            })

            removeLoading();
        } else {
            e.preventDefault();
            signUpNextStep();
        }
    });
function signUpNextStep(){
    var idOfActiveStep = document.getElementById("signUpForm").querySelector(".register-steps.active").getAttribute("id");
    switch(idOfActiveStep){
        case "signUpStep1": showSignUpStep2(); break;
        case "signUpStep2": showSignUpStepSubmit(); break;
        default: alert("Error"); break;
    }
}
function showSignUpStepResult(){
    document.getElementById("signUpStepSubmit").classList.add("passive");
    document.getElementById("signUpStepSubmit").classList.remove("active");
    document.getElementById("signUpStepResult").classList.remove("passive");
    document.getElementById("signUpStepResult").classList.add("active");
}

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
    var html = "";
    html += '<div id="dk-loading-sec" class="dk-loading-sec active">';
    html +=     '<div class="out-of-middle"><div class="middle"><div class="cssload-container"><div class="cssload-lt"></div><div class="cssload-rt"></div><div class="cssload-lb"></div><div class="cssload-rb"></div></div></div></div>';
    html += '</div>';
    e.innerHTML += html;
    return;
}
function removeLoading(){
    var e = document.getElementById("dk-loading-sec");
    if(e)
        e.parentElement.removeChild(e);

    return;
}