<?php

class Book extends DatabaseObject{
    protected static $table_name ='Book';
    protected static $columns = ['book_id','timestamp','b_name','b_author','b_descripteion'];

    public $book_id;
    public $timestamp;
    public $b_name;
    public $b_author;
    public $b_descripteion;

    public function __construct($args=[]){
        $this->book_id = $args['book_id'] ?? '';
        $this->timestamp = $args['timestamp'] ?? '';
        $this->b_name = $args['b_name'] ?? '';
        $this->b_author = $args['b_author'] ?? '';
        $this->b_descripteion = $args['b_descripteion'] ?? '';
    }
    
    public function checkObject(){
        echo $this->book_id;
        echo $this->timestamp;
        echo $this->b_name;
        echo $this->b_author;
        echo $this->b_descripteion;
    }

    public function findBookById($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }
}