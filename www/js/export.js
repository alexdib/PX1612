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
                $('#selectUnit').append('<option value ="' + responsedata[i][0] + '">' +  responsedata[i][0] + ' - ' + responsedata[i][1] + '</option>');
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
$(document).ready(function () {
    $( "#submit" ).click(function() {

        var selected_unit = $('#selectUnit').val();
        $.ajax({
            type: 'POST',
            url: SoNM.Settings.exportUrl,
            data: {selectUnit:selected_unit},
            async: false,
            success: function(data){
                var blob=new Blob([data]);
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download=selected_unit+"_Questions.csv";
                link.click();
                if (selected_unit != "") {
                    $("#popupDialog").popup("open");
                }
            }

        });

    });
});

// Wire logout button to destroy session
$( ".logout" ).click(function() {
    localStorage.clear();
    window.location.href = 'index.html';
});

