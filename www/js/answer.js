var session = JSON.parse(window.localStorage.getItem("sonm-session"));
var question = getParameterByName('question');
var questionid = getParameterByName('id');

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

    $("#questionlabel").text(question);

} else {
    $("#default_menu").show();
    $("#student_menu").hide();
    $("#staff_menu").hide();
    $("#login_menu").show();
    $("#logout_menu").hide();
}

// Wire submit button submit question to database
$( "#submit" ).click(function() {

    var answer = $('#answer').val();

    if (answer != "") {
        $.ajax({
            type: 'POST',
            url: SoNM.Settings.helperUrl,
            data: "function=createanswer" + "&answer=" + answer + "&id=" + questionid + "&user=" + session.sessionId,
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

/* get parameter from url */
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

