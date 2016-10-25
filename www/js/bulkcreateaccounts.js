var session = JSON.parse(window.localStorage.getItem("sonm-session"));

if (session) {
    /* menu */
    $("#default_menu").hide();
    $("#student_menu").show();
    if (session.userType == "staff") {
        $("#staff_menu").show();
    } else {
        $("#staff_menu").hide();
    }
    $("#login_menu").hide();
    $("#logout_menu").show();

    /* get user name */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=username" + "&user=" + session.sessionId,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            $("#username").text(responsedata.username);
        }
    });

} else {
    $("#default_menu").show();
    $("#student_menu").hide();
    $("#staff_menu").hide();
    $("#login_menu").show();
    $("#logout_menu").hide();
}

// Wire submit button submit question to database
$( "#submit" ).click(function() {

    var file_data = $('#fileinput')[0].files[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.bulkUrl,
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(resp){
            $("#popupDialog").popup("open");
        }
    });

});

// Wire logout button to destroy session
$( ".logout" ).click(function() {
    localStorage.clear();
    window.location.href = 'index.html';
});

