/* Members.html */
document.getElementById("loginForm").addEventListener("submit", function formControl(e){
    if(document.getElementById("login-step-1").classList.contains("active")){
        loginNextStep();
        e.preventDefault();
    }
});

document.getElementById("loginNextBtn").addEventListener("click", () => loginNextStep());
function loginNextStep(){
    document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML="";
    if(document.getElementById("loginKey").value){
        document.getElementById("login-step-1").classList.remove("active");
        document.getElementById("login-step-1").classList.add("passive");
        document.getElementById("login-step-2").classList.remove("passive");
        document.getElementById("login-step-2").classList.add("active");
    }else{
        document.getElementById("dk-signin-box").querySelector(".warnings").innerHTML='<div class="dk-alert bg-danger"><p>Login key cannot be null</p></div>';
    }
}

document.getElementById("loginBackBtn").addEventListener("click",  function(){
    document.getElementById("login-step-1").classList.add("active");
    document.getElementById("login-step-1").classList.remove("passive");
    document.getElementById("login-step-2").classList.add("passive");
    document.getElementById("login-step-2").classList.remove("active");
});
/* Members.html END*/