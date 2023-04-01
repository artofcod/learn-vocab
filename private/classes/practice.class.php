<?php

class Practice extends DatabaseObject
{
    public static $table_name = 'practice_insert_test';
    public static $columns = [
        'practice_id',
        'timestamp',
        'vocab_id',
        'result_id',
    ];

    public $practice_id;
    public $timestamp;
    public $vocab_id;
    public $result_id;

    public function __construct($args = [])
    {
        $this->practice_id = $args['practice_id'] ?? '';
        $this->timestamp = $args['timestamp'] ?? '';
        $this->vocab_id = $args['vocab_id'] ?? '';
        $this->result_id = $args['result_id'] ?? '';
    }



    public function findPracticeById($id, $id_column_name)
    {
        if (in_array($id_column_name, self::$columns)) {
            return parent::findById($id, $id_column_name);
        } else {
            exit("incorrect column name");
        }
    }


    public function create()
    {
        parent::create();
    }

    private function resultId($Result)
    {
        switch ($Result) {
            case 'correct':
                return 1;

            case 'wrong':
                return 0;

            case 'na':
                return 3;
        }
    }
    private function sanetizeDataForSave($dataObject)
    {

        $sanatizedData = '';

        foreach ($dataObject as $key => $value) {
            $x = '(';
            $x .=  rmHtml(intval($value->vocab_id));
            $x .= ',';
            $x .= rmHtml($this->resultId($value->result));
            $x .= '),';

            $sanatizedData .= $x;
        }

        //remove last comma
        $sanatizedData = substr($sanatizedData, 0, strlen($sanatizedData) - 1);
        return $sanatizedData;
    }

    public function multiCreate($multiObject)
    {
        $query = 'INSERT INTO ' . self::$table_name;
        $query .= ' (`vocab_id`,`result_id`) VALUES ';
        $query .= $this->sanetizeDataForSave($multiObject);
        
        $res = parent::$database->query($query);
        $json = [];
        if ($res) {
            $json['operation_status'] = (bool) $res;
            $json['last_inserted_id'] = (int) parent::$database->insert_id;
        }

        return json_encode([$json]);
    }
}
