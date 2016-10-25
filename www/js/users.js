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


function getUser(){
    var userid = $('#user-select option:selected').val();


    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=users_getuser" + "&user=" + userid,
        success: function (resp) {
            var responsedata = $.parseJSON(resp);

            $('#userid').val(responsedata.userid);
            $('#role-select').prop('selectedIndex',responsedata.roleid).change();
            $('#fname').val(responsedata.firstname);
            $('#lname').val(responsedata.lastname);
            $('#email').val(responsedata.email);
            $('#password').val(responsedata.password);
        }
    });
}


$( "#add-user" ).click(function() {

    var userid = $('#userid').val();
    var roleid = $('#role-select option:selected').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var password = $('#password').val();

    if (userid != "" && roleid != "" && fname != "" && lname != "" && email != "" && password != "") {

        $.ajax({
            type: 'POST',
            url: SoNM.Settings.helperUrl,
            data: "function=users_adduser" + "&user=" + userid + "&roleid=" + roleid + "&firstname=" + fname + "&lastname=" + lname + "&email=" + email + "&password=" + password,
            success: function (resp) {
                $("#popupDialog").popup("open");
            }
        });

    } else {
        alert("All fields are required!");
    }
});


$( "#update-user" ).click(function() {

    var userid = $('#user-select option:selected').val();
    var roleid = $('#role-select option:selected').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var password = $('#password').val();


    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=users_updateuser" + "&user=" + userid + "&roleid=" + roleid + "&firstname=" + fname + "&lastname=" + lname + "&email=" + email + "&password=" + password,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });

});

$( "#delete-user" ).click(function() {
    var userid = $('#user-select option:selected').val();

    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=users_deleteuser" + "&user=" + userid,
        success: function (resp) {
            $("#popupDialog").popup("open");
        }
    });

});