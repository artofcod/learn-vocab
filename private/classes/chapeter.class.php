<?php

class Chapter extends DatabaseObject
{
    public static $table_name = 'chapter';
    public static $columns = [
        'chapter_id',
        'timestamp',
        'book_id',
        'c_name',
        'c_name_eng',
        'c_description'
    ];

    public $chapter_id;
    public $timestamp;
    public $book_id;
    public $c_name;
    public $c_name_eng;
    public $c_description;

    public function __construct($args = [])
    {
        $this->chapter_id    = $args['chapter_id'] ?? '';
        $this->timestamp    = $args['timestamp'] ?? '';
        $this->book_id    = $args['book_id'] ?? '';
        $this->c_name    = $args['c_name'] ?? '';
        $this->c_name_eng    = $args['c_name_eng'] ?? '';
        $this->c_description    = $args['c_description'] ?? '';
    }



    public function findChaptrById($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }

    public function findChaptersByBooKId($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }
}
