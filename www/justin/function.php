<?php

require_once 'Dbconfig.php';

$function = null;
$user = null;
$unit = null;
$questionid = null;
$id = null;
$question = null;
$tags = null;
$answer = null;
$approved = null;
$rating = null;
$roleid = null;
$firstname = null;
$lastname = null;
$email = null;
$password = null;
$unitname = null;

if (isset($_POST['function'])) {
    $function=$_POST['function'];

    if (isset($_POST['user'])) {
        $user=$_POST['user'];
    }

    if (isset($_POST['unit'])) {
        $unit=$_POST['unit'];
    }

    if (isset($_POST['questionid'])) {
        $questionid=$_POST['questionid'];
    }

    if (isset($_POST['id'])) {
        $id=$_POST['id'];
    }

    if (isset($_POST['question'])) {
        $question=$_POST['question'];
    }

    if (isset($_POST['tags'])) {
        $tags=$_POST['tags'];
    }

    if (isset($_POST['answer'])) {
        $answer=$_POST['answer'];
    }

    if (isset($_POST['approved'])) {
        $approved=$_POST['approved'];
    }

    if (isset($_POST['rating'])) {
        $rating=$_POST['rating'];
    }

    if (isset($_POST['roleid'])) {
        $roleid=$_POST['roleid'];
    }

    if (isset($_POST['firstname'])) {
        $firstname=$_POST['firstname'];
    }

    if (isset($_POST['lastname'])) {
        $lastname=$_POST['lastname'];
    }

    if (isset($_POST['email'])) {
        $email=$_POST['email'];
    }

    if (isset($_POST['password'])) {
        $password=$_POST['password'];
    }

    if (isset($_POST['unitname'])) {
        $unitname=$_POST['unitname'];
    }
}

if ($function == "homepage") {
    $sql="SELECT 'UserId', COUNT(*) FROM Users UNION SELECT 'QuestionId', COUNT(*) FROM Questions UNION SELECT 'AnswerId', COUNT(*) FROM Answers";

    $result=mysql_query($sql);

    while ($row = mysql_fetch_array($result)) {
        if ($row[0] == "UserId"){
            $users = $row[1];
        } elseif ($row[0] == "QuestionId") {
            $questions = $row[1];
        } elseif ($row[0] == "AnswerId") {
            $answers = $row[1];
        }
    }
    $data = array( 'users' => $users, 'questions' => $questions, 'answers' => $answers );
    echo json_encode( $data );

}

if ($function == "statistics") {
    $sql="SELECT 'UserId', COUNT(*) FROM Users UNION SELECT 'QuestionId', COUNT(*) FROM Questions UNION SELECT 'AnswerId', COUNT(*) FROM Answers UNION SELECT 'UnitId', COUNT(*) FROM Units UNION SELECT 'RoleId', COUNT(*) FROM Roles";

    $result=mysql_query($sql);

    while ($row = mysql_fetch_array($result)) {
        if ($row[0] == "UserId"){
            $users = $row[1];
        } elseif ($row[0] == "QuestionId") {
            $questions = $row[1];
        } elseif ($row[0] == "AnswerId") {
            $answers = $row[1];
        } elseif ($row[0] == "UnitId") {
            $units = $row[1];
        } elseif ($row[0] == "RoleId") {
            $roles = $row[1];
        }
    }
    $data = array( 'users' => $users, 'questions' => $questions, 'answers' => $answers, 'units' => $units, 'roles' => $roles );
    echo json_encode( $data );

}

if ($function == "username") {

    $user = substr($user, 0, 8);
    $sql="SELECT * FROM Users WHERE UserId='".$user."'";

    $result=mysql_query($sql);
    $row=mysql_fetch_array($result);

    if(mysql_num_rows($result)>0) {
        $username = $row['FirstName'] . " " . $row['LastName'];
    }
    echo json_encode( [ 'username' => $username ] );

}

if ($function == "questions") {

    $user = substr($user, 0, 8);
    $sql="SELECT 'QuestionId', COUNT(*) FROM Questions WHERE UserId='".$user."' UNION SELECT 'AnswerId', COUNT(*) FROM Answers WHERE UserId='".$user."' UNION SELECT 'QuestionName', Count(*) FROM Questions WHERE QuestionId NOT IN (SELECT QuestionId FROM Answers)";

    $result=mysql_query($sql);

    while ($row = mysql_fetch_array($result)) {
        if ($row[0] == "QuestionId"){
            $questions = $row[1];
        } elseif ($row[0] == "AnswerId") {
            $answered = $row[1];
        } elseif ($row[0] == "QuestionName") {
            $unanswered = $row[1];
        }
    }
    $data = array( 'questions' => $questions, 'answered' => $answered, 'unanswered' => $unanswered );
    echo json_encode( $data );

}


if ($function == "questions_getunits") {

    $user = substr($user, 0, 8);
    $sql="SELECT DISTINCT Questions.UnitId, Units.UnitName FROM Questions,Units WHERE Questions.UnitId=Units.UnitId AND UserId='".$user."'";

    $result=mysql_query($sql);
    $units = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpunit = array();
        array_push($tmpunit, $row[0]);
        array_push($tmpunit, $row[1]);
        array_push($units, $tmpunit);
    }

    echo json_encode( $units );

}

if ($function == "questions_getquestions") {

    $user = substr($user, 0, 8);
    $sql="SELECT Questions.QuestionId, Questions.Question, Questions.Approved, Questions.Rating FROM Questions WHERE UserId='".$user."' AND UnitId='".$unit."'";

    $result=mysql_query($sql);
    $questions = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpquestion = array();
        array_push($tmpquestion, $row[0]);
        array_push($tmpquestion, $row[1]);
        array_push($tmpquestion, $row[2]);
        array_push($tmpquestion, $row[3]);
        array_push($questions, $tmpquestion);
    }

    echo json_encode($questions);

}

if ($function == "questions_getresponses") {

    $sql="SELECT Count(*) FROM Answers WHERE QuestionId='".$questionid."'";
    $result=mysql_query($sql);
    $row=mysql_fetch_array($result);

    if(mysql_num_rows($result)>0) {
        $responses = $row[0];
    }
    echo json_encode( [ 'responses' => $responses ] );

}


if ($function == "search_getunits") {

    $sql="SELECT UnitId, UnitName FROM Units";

    $result=mysql_query($sql);
    $units = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpunit = array();
        array_push($tmpunit, $row[0]);
        array_push($tmpunit, $row[1]);
        array_push($units, $tmpunit);
    }

    echo json_encode( $units );

}

if ($function == "search_getquestions") {

    $sql="SELECT QuestionId, Question, Approved, Rating FROM Questions WHERE UnitId='".$unit."'";

    $result=mysql_query($sql);
    $questions = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpquestion = array();
        array_push($tmpquestion, $row[0]);
        array_push($tmpquestion, $row[1]);
        array_push($tmpquestion, $row[2]);
        array_push($tmpquestion, $row[3]);
        array_push($questions, $tmpquestion);
    }

    echo json_encode( $questions );

}


if ($function == "search_getanswers") {

    $sql="SELECT AnswerId, Answer, Approved, Rating FROM Answers WHERE QuestionId='".$id."'";

    $result=mysql_query($sql);
    $answers = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpanswer = array();
        array_push($tmpanswer, $row[0]);
        array_push($tmpanswer, $row[1]);
        array_push($tmpanswer, $row[2]);
        array_push($tmpanswer, $row[3]);
        array_push($answers, $tmpanswer);
    }

    echo json_encode( $answers );

}


if ($function == "answered_getunits") {

    $sql="SELECT UnitId, UnitName FROM Units";

    $result=mysql_query($sql);
    $units = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpunit = array();
        array_push($tmpunit, $row[0]);
        array_push($tmpunit, $row[1]);
        array_push($units, $tmpunit);
    }

    echo json_encode( $units );

}


if ($function == "answered_getquestions") {

    $sql="SELECT Questions.QuestionId, Questions.Question FROM Questions, Answers WHERE Questions.QuestionId=Answers.QuestionId AND Questions.UnitId='".$unit."' AND Answers.UserId='".$user."'";

    $result=mysql_query($sql);
    $questions = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpquestion = array();
        array_push($tmpquestion, $row[0]);
        array_push($tmpquestion, $row[1]);
        array_push($questions, $tmpquestion);
    }

    echo json_encode( $questions );

}

if ($function == "unanswered_getquestions") {

    $sql="SELECT QuestionId, Question FROM Questions WHERE UnitId='".$unit."' AND QuestionId NOT IN (SELECT QuestionId FROM Answers)";

    $result=mysql_query($sql);
    $questions = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpquestion = array();
        array_push($tmpquestion, $row[0]);
        array_push($tmpquestion, $row[1]);
        array_push($questions, $tmpquestion);
    }

    echo json_encode( $questions );

}

if ($function == "viewquestion") {

    $sql="SELECT * FROM Questions WHERE QuestionId='".$id."'";

    $result=mysql_query($sql);
    $row=mysql_fetch_array($result);

    if(mysql_num_rows($result)>0) {
        $question = $row[3];
        $rating = $row[6];
        $date = $row[7];
    }

    $data = array( 'question' => $question, 'rating' => $rating, 'date' => $date );
    echo json_encode( $data );

}

if ($function == "viewquestion_getresponses") {

    $sql="SELECT Users.FirstName, Users.LastName, Answers.Answer, Answers.Approved, Answers.Rating, Answers.DateAnswered FROM Answers, Users WHERE Answers.UserId=Users.UserId AND QuestionId='".$id."'";

    $result=mysql_query($sql);
    $answers = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpanswer = array();
        array_push($tmpanswer, $row[0]); //first name
        array_push($tmpanswer, $row[1]); //last name
        array_push($tmpanswer, $row[2]); //answer
        array_push($tmpanswer, $row[3]); //approved
        array_push($tmpanswer, $row[4]); //rating
        array_push($tmpanswer, $row[5]); //date answered
        array_push($answers, $tmpanswer);
    }

    echo json_encode( $answers );

}

if ($function == "createquestion_getunits") {

    $user = substr($user, 0, 8);
    $sql="SELECT Units.UnitId, Units.UnitName FROM Units, Enrolled WHERE Enrolled.UserId='".$user."' AND Units.UnitId=Enrolled.UnitId";

    $result=mysql_query($sql);
    $units = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpunit = array();
        array_push($tmpunit, $row[0]);
        array_push($tmpunit, $row[1]);
        array_push($units, $tmpunit);
    }

    echo json_encode( $units );

}

if ($function == "createquestion") {

    $user = substr($user, 0, 8);

    $sql="INSERT INTO Questions (UserId, UnitId, Question, Tags, Approved, Rating, DateCreated) VALUES ('".$user."','".$unit."','".$question."','".$tags."','0','0','".date("Y-m-d H:i:s")."')";
    mysql_query($sql);

    echo true;

}

if ($function == "createanswer") {

    $user = substr($user, 0, 8);

    $sql="INSERT INTO Answers (QuestionId, UserId, Answer, Approved, Rating, DateAnswered) VALUES ('".$id."','".$user."','".$answer."','0','0','".date("Y-m-d H:i:s")."')";
    mysql_query($sql);

    echo true;

}

if ($function == "edit_getquestion") {

    $sql="SELECT QuestionId, Question, Approved, Rating FROM Questions WHERE QuestionId='".$questionid."'";

    $result=mysql_query($sql);
    $row=mysql_fetch_array($result);

    if(mysql_num_rows($result)>0) {
        $id = $row[0];
        $question = $row[1];
        $approved = $row[2];
        $rating = $row[3];
    }

    $data = array( 'id' => $id, 'question' => $question, 'approved' => $approved, 'rating' => $rating );
    echo json_encode( $data );

}


if ($function == "edit_getanswer") {

    $sql="SELECT AnswerId, Answer, Approved, Rating FROM Answers WHERE AnswerId='".$id."'";

    $result=mysql_query($sql);
    $row=mysql_fetch_array($result);

    if(mysql_num_rows($result)>0) {
        $id = $row[0];
        $answer = $row[1];
        $approved = $row[2];
        $rating = $row[3];
    }

    $data = array( 'id' => $id, 'answer' => $answer, 'approved' => $approved, 'rating' => $rating );
    echo json_encode( $data );

}

if ($function == "edit_addquestion") {

    $user = substr($user, 0, 8);

    $sql="INSERT INTO Questions (UserId, UnitId, Question, Tags, Approved, Rating, DateCreated) VALUES ('".$user."','".$unit."','".$question."',' ','".$approved."','".$rating."','".date("Y-m-d H:i:s")."')";
    mysql_query($sql);

    echo true;

}

if ($function == "edit_updatequestion") {

    $sql="UPDATE Questions SET Question='".$question."', Approved='".$approved."', Rating='".$rating."' WHERE QuestionId='".$questionid."'";
    mysql_query($sql);

    echo true;
}

if ($function == "edit_deletequestion") {

    $sql="DELETE FROM Questions WHERE QuestionId='".$questionid."'";
    mysql_query($sql);

    echo true;
}

if ($function == "edit_addanswer") {

    $user = substr($user, 0, 8);

    $sql="INSERT INTO Answers (UserId, QuestionId, Answer, Approved, Rating, DateAnswered) VALUES ('".$user."','".$questionid."','".$answer."','".$approved."','".$rating."','".date("Y-m-d H:i:s")."')";
    mysql_query($sql);

    echo true;

}

if ($function == "edit_updateanswer") {

    $sql="UPDATE Answers SET Answer='".$answer."', Approved='".$approved."', Rating='".$rating."' WHERE AnswerId='".$id."'";
    mysql_query($sql);

    echo true;
}

if ($function == "edit_deleteanswer") {

    $sql="DELETE FROM Answers WHERE AnswerId='".$id."'";
    mysql_query($sql);

    echo true;
}

if ($function == "users_getusers") {

    $sql="SELECT * FROM Users";

    $result=mysql_query($sql);
    $users = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpuser = array();
        array_push($tmpuser, $row[0]);
        array_push($tmpuser, $row[1]);
        array_push($tmpuser, $row[2]);
        array_push($tmpuser, $row[3]);
        array_push($tmpuser, $row[4]);
        array_push($tmpuser, $row[5]);
        array_push($users, $tmpuser);
    }

    echo json_encode( $users );
}

if ($function == "users_getuser") {

    $sql="SELECT * FROM Users WHERE UserId='".$user."'";

    $result=mysql_query($sql);

    while ($row = mysql_fetch_array($result)) {
        $userid = $row[0];
        $roleid = $row[1];
        $firstname = $row[2];
        $lastname = $row[3];
        $email = $row[4];
        $password = $row[5];
    }
    $user = array( 'userid' => $userid, 'roleid' => $roleid, 'firstname' => $firstname, 'lastname' => $lastname, 'email' => $email, 'password' => $password );
    echo json_encode( $user );
}


if ($function == "users_adduser") {

    $sql="INSERT INTO Users (UserId, RoleId, FirstName, LastName, Email, Password) VALUES ('".$user."','".$roleid."','".$firstname."','".$lastname."','".$email."','".$password."')";
    mysql_query($sql);

    echo true;

}

if ($function == "users_updateuser") {

    $sql="UPDATE Users SET RoleId='".$roleid."', FirstName='".$firstname."', LastName='".$lastname."', Email='".$email."', Password='".$password."' WHERE UserId='".$user."'";
    mysql_query($sql);

    echo true;
}

if ($function == "users_deleteuser") {

    $sql="DELETE FROM Users WHERE UserId='".$user."'";
    mysql_query($sql);

    echo true;
}

if ($function == "units_getunit") {

    $sql="SELECT * FROM Units WHERE UnitId='".$id."'";

    $result=mysql_query($sql);

    while ($row = mysql_fetch_array($result)) {
        $unitid = $row[0];
        $unitname = $row[1];
    }
    $unit = array( 'unitid' => $unitid, 'unitname' => $unitname );
    echo json_encode( $unit );
}


if ($function == "units_addunit") {

    $sql="INSERT INTO Units (UnitId, UnitName) VALUES ('".$id."','".$unitname."')";
    mysql_query($sql);

    echo true;

}

if ($function == "units_updateunit") {

    $sql="UPDATE Units SET UnitName='".$unitname."' WHERE UnitId='".$id."'";
    mysql_query($sql);

    echo true;
}

if ($function == "units_deleteunit") {

    $sql="DELETE FROM Units WHERE UnitId='".$id."'";
    mysql_query($sql);

    echo true;
}


if ($function == "enrol_addunit") {

    $sql="INSERT INTO Enrolled (UserId, UnitId) VALUES ('".$user."','".$id."')";
    mysql_query($sql);

    echo true;

}


if ($function == "enrol_deleteunit") {

    $sql="DELETE FROM Enrolled WHERE UserId='".$user."' AND UnitId='".$id."'";
    mysql_query($sql);

    echo true;
}

if ($function == "enrol_getenrolled") {

    $sql="SELECT Enrolled.UnitId, Units.UnitName FROM Enrolled, Units WHERE Enrolled.UnitId=Units.UnitId AND Enrolled.UserId='".$user."'";


    $result=mysql_query($sql);
    $units = array();

    while ($row = mysql_fetch_array($result)) {
        $tmpunit = array();
        array_push($tmpunit, $row[0]);
        array_push($tmpunit, $row[1]);
        array_push($units, $tmpunit);
    }

    echo json_encode( $units );

}

?>