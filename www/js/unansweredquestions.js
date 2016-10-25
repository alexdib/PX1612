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


    /* get units + questions */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=answered_getunits",
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            for (i = 0; i < responsedata.length; i++) {

                $('#unansweredlist').append('<li style="font-weight: bold">'+responsedata[i][0]+' - '+responsedata[i][1]+'</li>').listview('refresh');

                /* get questions */
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: SoNM.Settings.helperUrl,
                    data: "function=unanswered_getquestions" + "&unit=" + responsedata[i][0],
                    success: function (resp2) {
                        var responsedata2 = $.parseJSON(resp2);

                        for (j = 0; j < responsedata2.length; j++) {
                            /* add list item */
                            $('#unansweredlist').append('<li><a href="viewquestion.html?id='+responsedata2[j][0]+'" rel="external">'+responsedata2[j][1]+'</a></li>').listview('refresh');
                        }
                    }
                });

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

