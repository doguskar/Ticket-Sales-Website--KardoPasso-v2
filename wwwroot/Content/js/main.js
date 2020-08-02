$('#logoutBtn').click(function () {
    $.ajax({
        type: "POST",
        url: "/Members/Logout",
        success: function (bool) {
            location.reload();
        },
        error: function () {
            
        }
    })
})

// Saved accounts list
$(document).ready(function () {
    if (!$('#savedAccounts').is(':empty')) {
        return
    }

    $.ajax({
        type: "POST",
        url: "/Members/GetSavedAccounts",
        success: function (json) {
            var savedAcconts = JSON.parse(json);
            var savedAccountsBody = "";
            for (var item of savedAcconts) {
                savedAccountsBody +=    '<div class="accounts-item" data-uuid=' + item.UserUID + '>';
                savedAccountsBody +=        '<a href = "javascript:;" >';
                if (item.ProfilPic)
                    savedAccountsBody +=        '<img src="/Content/img/userProfilPics/' + item.ProfilPic + '" alt="'+ item.ProfilPic +'" />';
                else
                    savedAccountsBody +=        '<img src="/Content/img/userProfilPics/profil_pic.png" />';
                savedAccountsBody +=            '<div class="user-rname">' + item.UserRName + '</div>';
                savedAccountsBody +=            '<div class="username">@' + item.Username + '</div>';
                savedAccountsBody +=        '</a>';
                savedAccountsBody +=     '</div>';
            }
            $('#savedAccounts').html(savedAccountsBody)
            if (window.location.pathname == "/Members/Login") {
                $('#savedAccountsHeader').css("display", "block")
            }

            //When clicked to change account
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

        },
        error: function () {

        }
    })
})




