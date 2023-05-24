<?php
ob_start(); //starts output buffring.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

//session_start(); //starts session

//Asigning file paths to php constants
define('PRIVATE_PATH', dirname(__FILE__));
define('PROJECT_PATH', dirname(PRIVATE_PATH));

//Initiating helper functions.
include_once('helpers/functions.php');
require_once('helpers/validation_functions.php');
require_once('db_credentials.php');


//Load class definations manually

/**
 * Individually
 */

//require_once('./classes/databaseObjectClass.php');

require_once('classes/dbConnection.class.php');
require_once('classes/databaseObject.class.php');
require_once('classes/book.class.php');
require_once('classes/chapeter.class.php');
require_once('classes/section.class.php');
require_once('classes/vocabulary.class.php');
require_once('classes/practice.class.php');

/**
 * All classes in directory
 */
foreach (glob('classes/*.class.php') as $file) {
  require_once($file);
}


/**
 * Autoload class defination using spl autoload
 */

function autoload_classes($class)
{
  echo "hiittttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt.....";
  if (preg_match('/\A\W+\Z/', $class)) {
    include('classes/' . $class . '.class.php');
  }
}

spl_autoload_register('autoload_classes');

$connection = DBconnection::db_connect();
DatabaseObject::setDatabase($connection);

//application constants
const VOCAB = 'vocab_id';
const SECTION = 'section_id';
const CHAPTER = 'chapter_id';
const BOOK = 'book_id';
