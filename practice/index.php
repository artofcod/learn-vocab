<?php
require_once('../private/initialize.php');

$practice = new Practice();
$idName = "practice_id";
$practice_id = validatingRecivedDataTampering($idName);

if ($practice_id) {
    print_r($practice->findPracticeById($practice_id, $idName));
} else {
    print_r($practice->findAll());
}