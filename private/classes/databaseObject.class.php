<?php

class DatabaseObject
{
    static protected $database;
    static protected $table_name = '';
    static protected $columns = [];

    public static function setDatabase($database)
    {
        self::$database = $database;
    }

    static public function findBySql($sqlQuery)
    {

        $result = self::$database->query($sqlQuery);

        if (!$result) {
            exit("Database query failed");
        }

        //need to create object of individual records 
        //in order to get all the record otherwise fetch_assoc
        //will returns only first row as restut.
        $object = self::convertIntoObject($result);
        $result->free();

        return self::translateToJson($object);;
    }

    protected static function translateToJson($result)
    {
        $json = json_encode($result);
        return $json;
    }

    protected static function convertIntoObject($result)
    {
        $objectArray = [];
        while ($record = $result->fetch_assoc()) {
            $objectArray[] = self::instanciate($record);
        }
        return $objectArray;
    }

    protected static function instanciate($record)
    {
        $object = new static;
        foreach ($record as $key => $value) {
            $object->$key = $value;
        }
        return $object;
    }

    public static function findAll()
    {
        $sql = 'SELECT * FROM `' . static::$table_name . '`';
        return static::findBySql($sql);
    }

    public static function countAll()
    {
        $sql = 'SELECT COUNT(*) \'Total records\' FROM ' . static::$table_name;
        $result = self::$database->query($sql);
        return static::translateToJson($result->fetch_assoc());
    }

    public static function findById($id, $col)
    {
        $sql = 'SELECT * FROM `' . static::$table_name;
        $sql .= '` WHERE ';
        $sql .= self::$database->escape_string($col);
        $sql .= ' = ';
        $sql .= self::$database->escape_string($id);
        
        $objectArray =  static::findBySql($sql);

        return $objectArray;
    }

    public function create()
    {

        $this->attributes();
    }

    public function attributes()
    {
        $attributes = [];
        foreach (static::$columns as $column) {
            echo $column;
            echo ' | ';
        }
    }
}
