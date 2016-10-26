<?php
session_start();

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

// Get Unit
$UnitId = $_POST['selectUnit'];

// Generate SQL
$sql = "SELECT QuestionId, Question FROM Questions WHERE UnitId = ". $UnitId;
$result = $conn->query($sql);

// Get file
$file = "questions.csv";
file_put_contents($file, "");

// Output data of each row
while($row = $result->fetch_assoc()) {
    //echo $row["Question"] . "\r\n";
    file_put_contents($file, $row['Question'], FILE_APPEND);
    
    // Generate SQL
    $sql2 = "SELECT Answer FROM Answers WHERE QuestionId = ". $row['QuestionId'];
    $result2 = $conn->query($sql2);
    
    while($row2 = $result2->fetch_assoc()) {
        file_put_contents($file, ",", FILE_APPEND);
        file_put_contents($file, $row2['Answer'], FILE_APPEND);
    }
    
    file_put_contents($file, "\r\n", FILE_APPEND);
}

//Download file
header('Content-type:text/plain');
header('Content-Disposition: attachment; filename='.basename('questions.csv'));
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize('questions.csv'));
readfile('questions.csv');

// Close connection
$conn->close();
?>