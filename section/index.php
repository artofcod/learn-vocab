<?php
require_once('../private/initialize.php');

$section = new Section();
$columnNames = [VOCAB, SECTION, CHAPTER, BOOK];


$rawColArray = array_keys($_REQUEST);
$sendedColName = array_shift($rawColArray);
$parmId = validatingRecivedDataTampering($columnNames);


if ($parmId && $sendedColName == SECTION) {
    print_r($section->findById($parmId, SECTION));
} else if ($parmId && $sendedColName == CHAPTER) {
    print_r($section->findSectionByChapter($parmId, CHAPTER));
} else if ($parmId && $sendedColName == BOOK) {
    print_r($section->findSectionByBook($parmId));
} else {
    print_r($section->findAll());
}
