<?php

$CSV_FILE = "signups.csv";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = validate($_POST["firstname"]);
    $lastname = validate($_POST["lastname"]);
    $location = validate($_POST["location"]);
    $department = validate($_POST["department"]);
    $short = validate($_POST["short"]);
    $attendance = validate($_POST["attendance"]);

    write_to_file(stringify($firstname, $lastname, $location, $department, $short, $attendance));
}

function stringify() {
    $args = func_get_args();
    $string_list = "";

    foreach ($args as $item => $value) {
        $string_list .=$value.",";
    }

    return substr($string_list, 0, -1);
}

function validate($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function write_to_file($csv_line) {
    $file = fopen("signups.csv", "a");
    fwrite($file, $csv_line . "\n");
    fclose($file);
}

http_response_code(200);
echo "Done"
?>
