<?php
require_once('../private/initialize.php');

$chapter = new Chapter();
// $idName = "chapter_id";
// $bookIdName = "book_id"
// $chapter_id = validatingRecivedDataTampering($idName);
// $book_id = validatingRecivedDataTampering($idName)

// if ($chapter_id) {
//     print_r($chapter->findChaptrById($chapter_id, $idName));
// } elseif ($chapter_id) {
//     print_r($chapter->findChaptersByBooKId($chapter_id, $idName));
// } else {
//     print_r($chapter->findAll());
// }


$chapter_id = "chapter_id";
$bookId = "book_id";

if (checkEndPoint($chapter_id)) {
    $selectedId = validatingRecivedDataTampering($chapter_id);
    print_r($chapter->findChaptrById($selectedId, $chapter_id));
} elseif (checkEndPoint($bookId)) {
    $selectedId = validatingRecivedDataTampering($bookId);
    print_r($chapter->findChaptersByBooKId($selectedId, $bookId));
} else {
    print_r($chapter->findAll());
}
