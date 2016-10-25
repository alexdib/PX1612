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


function getUnit(){
    var unitid = $('#unit-select option:selected').val();


    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=units_getunit" + "&id=" + unitid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            $('#unitid').val(responsedata.unitid);
            $('#unitname').val(responsedata.unitname);
        }
    });
}


$( "#add-unit" ).click(function() {

    var unitid = $('#unitid').val();
    var unitname = $('#unitname').val();

    if (unitid != "" && unitname != "") {

        $.ajax({
            type: 'POST',
            url: SoNM.Settings.helperUrl,
            data: "function=units_addunit" + "&id=" + unitid + "&unitname=" + unitname,
            success: function (resp) {
                $("#popupDialog").popup("open");
            }
        });

    } else {
        alert("All fields are required!");
    }
});

$( "#update-unit" ).click(function() {

    var unitid = $('#unit-select option:selected').val();
    var unitname = $('#unitname').val();

    if (unitname != "") {
        $.ajax({
            type: 'POST',
            url: SoNM.Settings.helperUrl,
            data: "function=units_updateunit" + "&id=" + unitid + "&unitname=" + unitname,
            success: function (resp) {
                $("#popupDialog").popup("open");
            }
        });
    } else {
        alert("All fields are required!");
    }


});


$( "#delete-unit" ).click(function() {

    var unitid = $('#unit-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=units_deleteunit" + "&id=" + unitid,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });


});