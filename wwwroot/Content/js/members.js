/* Members.html */
document.getElementById("loginForm").addEventListener("submit", function formControl(e) {
    //Pressed enter in username input
    if(document.getElementById("login-step-1").classList.contains("active")){
        loginNextStep();
        e.preventDefault();
    }
    //Submitted form
    else if (document.getElementById("login-step-2").classList.contains("active")) {
        e.preventDefault();
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
                        window.location.href = "http://localhost:8080";
                    }
                } else {
                    //Failed Login
                    if (loginReply.invalidLoginKey || loginReply.invalidPassword) {
                        showStep1();
                        showWarn("Invalid username or password!");
                    }
                }
            },
            error: function () {
            }
        })
    }
});

document.getElementById("loginNextBtn").addEventListener("click", () => loginNextStep());
function loginNextStep(){
    if (document.getElementById("loginKey").value) {
        showStep2();
    } else {
        showWarn("Login Key cannot be null!");
    }
}

document.getElementById("loginBackBtn").addEventListener("click", function () {
    showStep1();
});

function showStep1() {
    clearWarnings();
    document.getElementById("login-step-1").classList.remove("passive");
    document.getElementById("login-step-1").classList.add("active");
    document.getElementById("login-step-2").classList.remove("active");
    document.getElementById("login-step-2").classList.add("passive");
}
function showStep2() {
    clearWarnings();
    document.getElementById("login-step-1").classList.remove("active");
    document.getElementById("login-step-1").classList.add("passive");
    document.getElementById("login-step-2").classList.remove("passive");
    document.getElementById("login-step-2").classList.add("active");
}
function showWarn(str) {
    document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML = '<div class="dk-alert bg-danger"><p>' + str + '</p></div>';
}
function clearWarnings() {
    document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML = "";
}
/* Members.html END*/