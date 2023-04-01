<?php
require_once('../private/initialize.php');




$vocabulary = new Vocabulary();
$columnNames = [VOCAB, SECTION, CHAPTER, BOOK];


$rawColArray = array_keys($_REQUEST);
$sendedColName = array_shift($rawColArray);
$parmId = validatingRecivedDataTampering($columnNames);


if ($parmId && $sendedColName == VOCAB) {
    print_r($vocabulary->findVocabularyById($parmId, VOCAB));
} else if ($parmId && $sendedColName == SECTION) {
    print_r($vocabulary->findVocabularyBySection($parmId));
} else {
    print_r($vocabulary->findAll());
}
