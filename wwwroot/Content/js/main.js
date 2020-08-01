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

$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/Members/GetSavedAccounts",
        success: function (json) {
            var savedAcconts = JSON.parse(json);
            var otherAccountsBody = "";
            for (var item of savedAcconts) {
                otherAccountsBody +=    '<div class="accounts-item">';
                otherAccountsBody +=         '<a href = "javascript:;" >';
                otherAccountsBody +=            '<img src="/Content/img/userProfilPics/' + item.ProfilPic + '" alt="'+ item.ProfilPic +'" />';
                otherAccountsBody +=            '<div class="user-rname">' + item.UserRName + '</div>';
                otherAccountsBody +=            '<div class="username">@' + item.Username + '</div>';
                otherAccountsBody +=        '</a>';
                otherAccountsBody +=     '</div>';
            }
            $('#otherAccounts').html(otherAccountsBody)
        },
        error: function () {

        }
    })
})