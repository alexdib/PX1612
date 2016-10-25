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
        data: "function=questions_getunits" + "&user=" + session.sessionId,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            for (i = 0; i < responsedata.length; i++) {
                $('#questionslist').append('<li style="font-weight: bold">'+responsedata[i][0]+' - '+responsedata[i][1]+'</li>').listview('refresh');

                /* get questions */
                $.ajax({
                    type: 'POST',
                    async: false,
                    url: SoNM.Settings.helperUrl,
                    data: "function=questions_getquestions" + "&user=" + session.sessionId + "&unit=" + responsedata[i][0],
                    success: function (resp2) {
                        var responsedata2 = $.parseJSON(resp2);

                        for (j = 0; j < responsedata2.length; j++) {
                            var responses = 0;

                            /* get responses for question */
                            $.ajax({
                                type: 'POST',
                                async: false,
                                url: SoNM.Settings.helperUrl,
                                data: "function=questions_getresponses" + "&questionid=" + responsedata2[j][0],
                                success: function (resp3) {
                                    var responsedata3 = $.parseJSON(resp3);
                                    responses = responsedata3.responses;
                                }
                            });

                            /* add list item */
                            $('#questionslist').append(
                                '<li><a href="viewquestion.html?id='+responsedata2[j][0]+'" rel="external">'+responsedata2[j][1]+'<div class="ui-grid-a"><div class="ui-block-a" style="width:100%;">'
                                + '<div class="ui-grid-b" style="text-align: center; font-weight: bold;"><div class="ui-block-a">'
                                + '<span style="font-size: 0.8em">'+responses+'</span><br><span style="font-size: 0.7em; font-weight: bold;">Responses</span>'
                                + '</div><div class="ui-block-b">'
                                + '<span style="font-size: 0.8em">'+responsedata2[j][3]+'</span><br><span style="font-size: 0.7em; font-weight: bold;">Rating</span>'
                                + '</div><div class="ui-block-c">'
                                + '<span style="font-size: 0.8em; color: green;">Easy</span><br><span style="font-size: 0.7em; font-weight: bold;">Difficulty</span>'
                                + '</div></div></div></div></a></li>'
                            ).listview('refresh');


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

