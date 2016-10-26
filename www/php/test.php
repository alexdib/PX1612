<?php
    $servername = "localhost";
    $username = "pe-ks1612";
    $password = "jFCOivY6vhuhUCXo";
    $dbname = "pe_ks1612";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST["users"])) {
        $sql = "SELECT * FROM Users;";
        
        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "id: " . $row["UserId"]. " | Role: " . $row["RoleId"]. " | Name: " . $row["FirstName"]. " " . $row["LastName"]. " | Email: " . $row["Email"]. " | Password: " . $row["Password"]. "<br>";
            }
        }
        else {
            echo "0 results";
        }  
    }
    if(isset($_POST["units"])) {
        $sql = "SELECT * FROM Units;";
        
        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "id: " . $row["UnitId"]. " | Name: " . $row["UnitName"]. "<br>";
            }
        }
        else {
            echo "0 results";
        }  
    }
    if(isset($_POST["enrolled"])) {
        $sql = "SELECT * FROM Enrolled;";
        
        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "enrolId: " . $row["EnrolId"]. " | UserID: " . $row["UserId"]. " | UnitID: " . $row["UnitId"]. "<br>";
            }
        }
        else {
            echo "0 results";
        }  
    }
?>