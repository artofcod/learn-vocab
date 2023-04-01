<?php

require_once('../private/initialize.php');

$practice = new Practice();

$response = $practice->multiCreate(json_decode($_POST['res']));

print_r($response);