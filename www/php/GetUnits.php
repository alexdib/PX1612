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

// Generate SQL
$sql = "SELECT * FROM Units";
$result = $conn->query($sql);

$units = array();

// Output data of each row
while($row = $result->fetch_assoc()) {
     $units[] = array(
        'id' => $row['UnitId'],
        'unit' => $row['UnitName']
      );
    //array_push($units, $row["UnitName"]);
}

echo json_encode($units);

// Close connection
$conn->close();
?>