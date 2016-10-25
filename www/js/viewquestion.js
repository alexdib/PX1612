var session = JSON.parse(window.localStorage.getItem("sonm-session"));
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

    /* get question */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=viewquestion" + "&id=" + questionid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            $("#questionlabel").text(responsedata.question);
            $('a.answerquestion').attr('href', "answer.html?question=" + responsedata.question + "&id=" + questionid);

            if (responsedata.rating != 0) {
                for (i=0; i < responsedata.rating; i++) {

                    if (i == responsedata.rating) {
                        $("#star-rating").append('<img src="images/icons/colour/star.png">');
                    } else {
                        $("#star-rating").append('<img src="images/icons/colour/star.png" style="float: left;">');
                    }
                }
            }


            $("#date").append(responsedata.date);

            /* get responses */
            $.ajax({
                type: 'POST',
                async: false,
                url: SoNM.Settings.helperUrl,
                data: "function=viewquestion_getresponses" + "&id=" + questionid,
                success: function (resp2) {
                    var responsedata2 = $.parseJSON(resp2);

                    for (i = 0; i < responsedata2.length; i++) {

                        var name = responsedata2[i][0] + " " + responsedata2[i][1];

                        /* check if answer is approved */
                        if (responsedata2[i][3] == 1) {
                            $("#approvedresponsediv").show();
                            $("#approvedresponsediv").append('<div class="ui-field-contain"><h3>'+name+' | '+responsedata2[i][5]+'</h3><pre>'+responsedata2[i][2]+'</pre></div>');
                        } else {
                            /* add list item */
                            $('#responsesdiv').append('<div class="ui-field-contain"><h3>'+name+' | '+responsedata2[i][5]+'</h3><pre>'+responsedata2[i][2]+'</pre></div>');
                        }

                    }
                }
            });

        }
    });


} else {
    $("#default_menu").show();
    $("#student_menu").hide();
    $("#staff_menu").hide();
    $("#login_menu").show();
    $("#logout_menu").hide();
}



// Wire top button to scroll to top
$( ".top" ).click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
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
