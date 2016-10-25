<?php

require_once 'Dbconfig.php';

// Get file
$accounts_file = fopen($_FILES['file']['tmp_name'], 'r');

// Go through each line
while ( ($line = fgets($accounts_file)) !== false) {

    // Tokenise line storing each token in $student_data[]
    $tok = strtok($line, ",\n\r\t ");
    while ($tok !== false) {
        $student_data[] = $tok;
        $tok = strtok(",\n\r\t ");
    }

    // Form INSERT statement for users
    $student_id = $student_data[0];
    $role_id = "1";
    $first_name = $student_data[1];
    $last_name = $student_data[2];
    $email = $student_data[3];
    $pwd = "password";
    $sql_insert_user="INSERT INTO Users VALUES ('".$student_id."','".$role_id."','".$first_name."','".$last_name."','".$email."','".$pwd."')";

    $text = $text .  $sql_insert_user;

    // Execute INSERT statement for users
    mysql_query($sql_insert_user);


    // Form INSERT statement for units (if any)
    if (count($student_data) > 4) {
        // Create template for each INSERT statement
        $sql_template_enrolled="INSERT INTO Enrolled (UserId, UnitId) VALUES ('" . $student_id . "','";

        // Execute INSERT statementsfor units
        for($x = 0; $x < count($student_data) - 4; $x++) {
            $sql_insert_enrolled = $sql_template_enrolled . $student_data[$x + 4] . "');";
            mysql_query($sql_insert_enrolled);
        }
    }

    // Reset $student_data[] array for next line
    unset($student_data);
}

?>