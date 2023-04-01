<?php
require_once('../private/initialize.php');

$books = new Book();
$idName = "book_id";
$book_id = validatingRecivedDataTampering($idName);

if ($book_id) {
    print_r($books->findBooKById($book_id, $idName));
} else {
    print_r($books->findAll());
}