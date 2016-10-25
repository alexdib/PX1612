$(document).on('swipeleft swiperight', function (e) {
		// We check if there is no open panel on the page because otherwise
		// a swipe to close the left panel would also open the right panel (and v.v.).
		// We do this by checking the data that the framework stores on the page element (panel: open).
		if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
			if ( e.type === "swipeleft" ) {
				$.mobile.activePage.find( "#right-panel" ).panel( "open" );	
			} else if ( e.type === "swiperight" ) {
				$.mobile.activePage.find( "#left-panel" ).panel( "open" );
			}
		} 
});

$(document).on("pageshow", function () {

	$( ".nav-toggle" ).click(function() {
	   $.mobile.activePage.find( "#left-panel" ).panel( "open" );
	});

    $(document).on("panelopen", "#left-panel", function ( e ) { 
        $(".nav-toggle").addClass("navtoggleon");
    });

    $(document).on("panelclose", "#left-panel", function ( e ) {
        $(".nav-toggle").removeClass("navtoggleon");
    });

});


$( document ).delegate("#photos", "pagecreate", function() {
  $(".swipebox").swipebox();
});


$.widget( "ui.tabs", $.ui.tabs, {

_createWidget: function( options, element ) {
    var page, delayedCreate,
        that = this;

    if ( $.mobile.page ) {
        page = $( element )
            .parents( ":jqmData(role='page'),:mobile-page" )
            .first();

        if ( page.length > 0 && !page.hasClass( "ui-page-active" ) ) {
            delayedCreate = this._super;
            page.one( "pagebeforeshow", function() {
                delayedCreate.call( that, options, element );
            });
        }
    } else {
        return this._super();
    }
}

});


$( document ).delegate("#contact", "pagecreate", function() {

  		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});
});


$( document ).delegate("#homepage", "pageshow", function() {
    var session = JSON.parse(window.localStorage.getItem("sonm-session"));

    if (session) {
        $("#default_menu").hide();
        $("#student_menu").show();
        if (session.userType == "staff") {
            $("#staff_menu").show();
        } else {
            $("#staff_menu").hide();
        }
        $("#login_menu").hide();
        $("#logout_menu").show();
    } else {
        $("#default_menu").show();
        $("#student_menu").hide();
        $("#staff_menu").hide();
        $("#login_menu").show();
        $("#logout_menu").hide();
    }

    /* get homepage statistics */
    $.ajax({
        type: 'POST',
        url: SoNM.Settings.helperUrl,
        data: "function=homepage",
        success: function (resp) {
            var responsedata = $.parseJSON(resp);
            $("#usersCount").text(responsedata.users);
            $("#questionsCount").text(responsedata.questions);
            $("#answersCount").text(responsedata.answers);
        }
    });


    // Wire logout button to destroy session
    $( ".logout" ).click(function() {
        localStorage.clear();
        location.reload();
    });

});

/* Wire sign in button */
$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signInController.init();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

