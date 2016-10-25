<?php

    $db_host = "localhost";
    $db_name = "pe_ks1612";
    $db_user = "pe-ks1612";
    $db_pass = "jFCOivY6vhuhUCXo";

    $con = mysql_connect($db_host, $db_user, $db_pass) or die("Could not connect database");
    mysql_select_db($db_name, $con)or die("Could not select database");
    mysql_set_charset('utf8', $con);
?>