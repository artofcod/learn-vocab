<?php

class Section extends DatabaseObject
{
    public static $table_name = 'section';
    public static $columns = [
        'section_id',
        'timestamp',
        'chapter_id',
        's_name',
        's_name_eng',
        's_description',
    ];

    public $section_id;
    public $timestamp;
    public $chapter_id;
    public $s_name;
    public $s_name_eng;
    public $s_description;

    public function __construct($args = [])
    {
        $this->section_id    = $args['section_id'] ?? null;
        $this->timestamp    = $args['timestamp'] ?? null;
        $this->chapter_id    = $args['chapter_id'] ?? null;
        $this->s_name    = $args['s_name'] ?? null;
        $this->s_name_eng    = $args['s_name_eng'] ?? null;
        $this->s_description    = $args['s_description'] ?? null;
    }



    public function findSectionById($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }

    public function findSectionByChapter($chapter_id, $column_name)
    {
        if (in_array($column_name, self::$columns)) {
            return parent::findById($chapter_id, $column_name);
        } else {
            exit("incorrect column name");
        }
    }

    public function findSectionByBook($book_id)
    {
        $sql = 'SELECT DISTINCT s.section_id, s.timestamp, s.chapter_id, ';
        $sql .= 's.s_name, s.s_name_eng, s.s_description, l.book_id ';
        $sql .= ' FROM `section` s JOIN `link_book_chapter_section_vocab` l ON';
        $sql .= ' s.section_id = l.section_id WHERE book_id = '.$book_id;

        return parent::findBySql($sql);
    }
}
