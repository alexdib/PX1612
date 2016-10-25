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

    /* get users */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=users_getusers",
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            for (i = 0; i < responsedata.length; i++) {
                $('#user-select').append('<option value="'+responsedata[i][0]+'">'+responsedata[i][0]+' - '+responsedata[i][2]+' '+responsedata[i][3]+'</option>');
            }
        }
    });


    /* get units */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=search_getunits",
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

// Wire logout button to destroy session
$( ".logout" ).click(function() {
    localStorage.clear();
    window.location.href = 'index.html';
});


function getEnrolled() {

    var userid = $('#user-select option:selected').val();
    var enrolled = "Currently enrolled in: ";

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=enrol_getenrolled" + "&user=" + userid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            for (i = 0; i < responsedata.length; i++) {
                enrolled = enrolled + responsedata[i][0] + " - " + responsedata[i][1];
                if (i != responsedata.length-1) {
                    enrolled = enrolled + ", ";
                }
            }
            $("#enrolled").text(enrolled);
        }
    });

}

$( "#add-unit" ).click(function() {

    var userid = $('#user-select option:selected').val();
    var unitid = $('#unit-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=enrol_addunit" + "&user=" + userid + "&id=" + unitid,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });

});


$( "#delete-unit" ).click(function() {

    var userid = $('#user-select option:selected').val();
    var unitid = $('#unit-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=enrol_deleteunit" + "&user=" + userid + "&id=" + unitid,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });

});