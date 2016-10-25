<?php

require_once 'Dbconfig.php';

$email=htmlspecialchars($_POST['email'],ENT_QUOTES);
$password=$_POST['password'];

//now validating the username and password
$sql="SELECT * FROM Users WHERE Email='".$email."'";

$result=mysql_query($sql);
$row=mysql_fetch_array($result);

//if email exists
if(mysql_num_rows($result)>0)
{
        //compare the password
        if(strcmp($row['Password'],$password)==0)
        {
                // get role
                if ($row['RoleId'] == 1)
                {
                    $type = "student";
                } else if ($row['RoleId'] == 2) {
                    $type = "staff";
                } else if ($row['RoleId'] == 3) {
                    $type = "developer";
                }


                $data = array( 'success' => true, 'sessionId' => $email, 'userType' => $type );
                echo json_encode( $data );
        }
        else
        {
            echo json_encode( [ 'msg' => 2 ] ); // Invalid Password
        }

}
else
        echo json_encode( [ 'msg' => 4 ] ); //Invalid Login

?>