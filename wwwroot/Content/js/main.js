// Session Info
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/Members/GetSessionsUserInfo",
        success: function (json) {
            userInfo = null
            if (json != "null" && json) {
                userInfo = JSON.parse(json)
                if (!(userInfo.ProfilPic && userInfo.ProfilPic != "null")) {
                    userInfo.ProfilPic = "profil_pic.png"
                }
            } 
            printDHUser(userInfo)
            printNavUser(userInfo)
        },
        error: function () {

        }
    })
})

function printDHUser(userInfo) {
    dhUserBody = "";
    if (userInfo) {
        dhUserBody = `<a href="javascript:;" data-dropdown="dk-user-box"><img src="/Content/img/userProfilPics/${userInfo.ProfilPic}" alt="ppic" /></a>
                            <div id="dk-user-box" class="dk-user-box hidden-xs">
                                <div class="active-account">
                                    <div class="user-photo">
                                        <img src="/Content/img/userProfilPics/${userInfo.ProfilPic}" alt="" />
                                        <a href="#">Change Profil Picture</a>
                                    </div>
                                    <div class="user-info">
                                        <div class="user-rname">${userInfo.UserRName}</div>
                                        <div class="username">&#64;${userInfo.Username}</div>
                                        <div class="user-profil-link"><a href="#" class="dk-btn dk-btn-primary">Go Profil</a></div>
                                    </div>
                                    <div class="clear-both"></div>
                                </div>
                                <div id="savedAccounts" class="other-accounts"></div>
                                <div class="dk-user-box-log">
                                    <a href="/Members/Login" class="dk-btn">Add Account</a>
                                    <a id="logoutBtn" href="javascript:;" class="dk-btn">Logout</a>
                                </div>
                            </div>`;
    } else {
        dhUserBody = '<a href="/Members/Login" class="dh-log-btn">Login</a>'
    }
    $('#dhUser').html(dhUserBody)
    if (userInfo && $('#dhUser>a').length > 0) {
        $('#dhUser>a').click(dkDropdown)
        $('#logoutBtn').click(logoutBtn_OnClick)
        savedAccounts_Ajax()
    }
}
function logoutBtn_OnClick() {
    $.ajax({
        type: "POST",
        url: "/Members/Logout",
        success: function (bool) {
            location.reload();
        },
        error: function () {

        }
    })
}
function printNavUser(userInfo) {
    navUserBody = "";
    if (userInfo) {
        navUserBody =   `<a href="javascript:;" class="dk-nav-user">
                            <img src="/Content/img/userProfilPics/${userInfo.ProfilPic}" alt="${userInfo.ProfilPic}" />
                            <span>${userInfo.UserRName}</span>
                        </a>`;
    } else {
        navUserBody = '<a href="/Members/Login" class="dk-btn sharp-btn">Login</a>'
    }
    $('#navUser').html(navUserBody)
}


// Saved accounts list
$(document).ready(function () {
    if ($('#savedAccounts').length > 0) {
        savedAccounts_Ajax()
    }
})

function savedAccounts_Ajax() {
    $.ajax({
        type: "POST",
        url: "/Members/GetSavedAccounts",
        success: function (json) {
            savedAccounts = null
            if (json != "null" && json) {
                savedAccounts = JSON.parse(json)
                printSavedAccounts(savedAccounts)
                accountsItem_OnClick()
            } else {
                ('#savedAccounts').html("")
            }
        },
        error: function () {

        }
    })
}

function printSavedAccounts(accounts) {
    var savedAccountsBody = "";
    for (var account of accounts) {
        if (!(account.ProfilPic)) {
            account.ProfilPic = "profil_pic.png"
        }
        savedAccountsBody += `<div class="accounts-item" data-uuid="${account.UserUID}">
						        <a href="javascript:;">
							        <img src="/Content/img/userProfilPics/${account.ProfilPic}" alt="${account.ProfilPic}" />
							        <div class="user-rname">${account.UserRName}</div>
							        <div class="username">@${account.Username}</div>
						        </a>
					        </div>`
    }
    $('#savedAccounts').html(savedAccountsBody);
    if (window.location.pathname == "/Members/Login" && accounts.length > 0) {
        $('#savedAccountsHeader').css("display", "block")
    }
}
function accountsItem_OnClick() {
    $('.accounts-item').click(function () {
        if (confirm("Do you want to switch account?")) {
            $.ajax({
                type: "POST",
                url: "/Members/LoginFromWidget",
                data: {
                    'uuid': $(this).data('uuid')
                },
                success: function (json) {
                    var loginReply = JSON.parse(json);
                    if (loginReply.result) {
                        if (window.location.pathname == "/Members/Login") {
                            //If in login page
                            if (loginReply.redirectAddress) {
                                window.location.href = loginReply.redirectAddress;
                            } else {
                                window.location.href = "http://" + location.hostname + ":" + location.port;
                            }
                        } else {
                            location.reload()
                        }
                    }
                },
                error: function () {

                }
            })
        }
    })
}




