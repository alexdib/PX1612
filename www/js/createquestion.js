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


    /* get units */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=createquestion_getunits" + "&user=" + session.sessionId,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            for (i = 0; i < responsedata.length; i++) {
                $('#unit-select').append('<option value="'+responsedata[i][0]+'">'+responsedata[i][0]+' - '+responsedata[i][1]+'</option>');
            }
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

    var unit = $('#unit-select option:selected').val();
    var question = $('#question').val();
    var tags = $('#tags').val();

    if (unit != "" && question != "") {
        $.ajax({
            type: 'POST',
            url: SoNM.Settings.helperUrl,
            data: "function=createquestion" + "&user=" + session.sessionId + "&unit=" + unit + "&question=" + question + "&tags=" + tags,
            success: function (resp) {
                $("#popupDialog").popup("open");
            }
        });
    } else {
        $("#popupDialogError").popup("open");
    }

});

// Wire logout button to destroy session
$( ".logout" ).click(function() {
    localStorage.clear();
    window.location.href = 'index.html';
});

