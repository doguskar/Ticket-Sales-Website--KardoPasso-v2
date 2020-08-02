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
    $.ajax({
        type: "POST",
        url: "/Members/GetSavedAccounts",
        success: function (json) {
            var savedAcconts = JSON.parse(json);
            var otherAccountsBody = "";
            for (var item of savedAcconts) {
                otherAccountsBody +=    '<div id="asd" class="accounts-item" data-uuid=' + item.UserUID + '>';
                otherAccountsBody +=        '<a href = "javascript:;" >';
                if (item.ProfilPic)
                    otherAccountsBody +=        '<img src="/Content/img/userProfilPics/' + item.ProfilPic + '" alt="'+ item.ProfilPic +'" />';
                else
                    otherAccountsBody +=        '<img src="/Content/img/userProfilPics/profil_pic.png" />';
                otherAccountsBody +=            '<div class="user-rname">' + item.UserRName + '</div>';
                otherAccountsBody +=            '<div class="username">@' + item.Username + '</div>';
                otherAccountsBody +=        '</a>';
                otherAccountsBody +=     '</div>';
            }
            $('#otherAccounts').html(otherAccountsBody)

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
                                location.reload()
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




