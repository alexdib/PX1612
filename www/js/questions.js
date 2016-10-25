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

    /* get question counts */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=questions" + "&user=" + session.sessionId,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            $("#questionsCount").text(responsedata.questions);
            $("#answeredCount").text(responsedata.answered);
            $("#unansweredCount").text(responsedata.unanswered);
        }
    });

} else {
    $("#default_menu").show();
    $("#student_menu").hide();
    $("#staff_menu").hide();
    $("#login_menu").show();
    $("#logout_menu").hide();
}

// Wire logout button to destroy session
$( ".logout" ).click(function() {
    localStorage.clear();
    window.location.href = 'index.html';
});



