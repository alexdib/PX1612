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

function getQuestions(){
    var unit = $('#unit-select option:selected').val();
    $('#question-select').empty().append('<option selected disabled value="-1">Please select</option>');
    $('#question-select').prop('selectedIndex',0).change();

    /* get questions for unit */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=search_getquestions" + "&unit=" + unit,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            for (i = 0; i < responsedata.length; i++) {
                $('#question-select').append('<option value="'+responsedata[i][0]+'">'+responsedata[i][1]+'</option>');
            }
        }
    });
}

function getAnswers(){
    var questionid = $('#question-select option:selected').val();
    $('#answer-select').empty().append('<option selected disabled value="-1">Please select</option>');
    $('#answer-select').prop('selectedIndex',0).change();

    /* get answers for questionid */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=search_getanswers" + "&id=" + questionid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            for (i = 0; i < responsedata.length; i++) {
                $('#answer-select').append('<option value="'+responsedata[i][0]+'">'+responsedata[i][1]+'</option>');
            }
        }
    });
}

function getQuestion(){
    var questionid = $('#question-select option:selected').val();

    /* get question from questionid */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=edit_getquestion" + "&questionid=" + questionid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            $('#questionid').val(responsedata.id);
            $('#question').val(responsedata.question);
            $('#question-approved-select').prop('selectedIndex',responsedata.approved).change();
            $('#question-rating-select').prop('selectedIndex',responsedata.rating).change();
        }
    });
}

function getAnswer(){
    var answerid = $('#answer-select option:selected').val();

    /* get question from questionid */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=edit_getanswer" + "&id=" + answerid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            $('#answerid').val(responsedata.id);
            $('#answer').val(responsedata.answer);
            $('#answer-approved-select').prop('selectedIndex',responsedata.approved).change();
            $('#answer-rating-select').prop('selectedIndex',responsedata.rating).change();
        }
    });
}

// Wire update button to update question to database
$( "#update-question" ).click(function() {

    var questionid = $('#questionid').val();
    var question = $('#question').val();
    var approved = $('#question-approved-select option:selected').val();
    var rating = $('#question-rating-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=edit_updatequestion" + "&questionid=" + questionid + "&question=" + question + "&approved=" + approved + "&rating=" + rating,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });

});

// Wire update button to update question to database
$( "#update-answer" ).click(function() {

    var answerid = $('#answerid').val();
    var answer = $('#answer').val();
    var approved = $('#answer-approved-select option:selected').val();
    var rating = $('#answer-rating-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=edit_updateanswer" + "&id=" + answerid + "&answer=" + answer + "&approved=" + approved + "&rating=" + rating,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });
});

