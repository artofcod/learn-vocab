<?php

class Vocabulary extends DatabaseObject
{
    public static $table_name = 'vocabulary';
    public static $columns = [
        'vocab_id',
        'timestamp',
        'defination',
        'vocabulary',
    ];

    public $vocab_id;
    public $timestamp;
    public $defination;
    public $vocabulary;

    public function __construct($args = [])
    {
        $this->vocab_id = $args['vocab_id'] ?? '';
        $this->timestamp = $args['timestamp'] ?? '';
        $this->defination = $args['defination'] ?? '';
        $this->vocabulary = $args['vocabulary'] ?? '';
    }


    public function findVocabularyById($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }

    public function findVocabularyBySection($section_id)
    {
        $query = " SELECT ";
        $query .= " l.section_id, ";
        $query .= " v.vocab_id, ";
        $query .= " v.defination, ";
        $query .= " v.vocabulary ";
        $query .= " FROM ";
        $query .= " link_book_chapter_section_vocab l ";
        $query .= " JOIN vocabulary v ON ";
        $query .= " l.vocab_id = v.vocab_id ";
        $query .= " WHERE ";
        $query .= " l.section_id = ".$section_id."; ";

        return parent::findBySql($query);
    }
}
