<?php

class DBconnection {

    private static $connection;

    public static function db_connect(){
        self::$connection =  new mysqli(DB_SERVER,DB_USER,DB_PASSWORD,DB_NAME);
        self::confirm_db_connect(self::$connection);
        return self::$connection;
    }

    private static function confirm_db_connect($connection){
        if($connection->connect_errno){
            $msg = 'Database connection faild.';
            $msg .= $connection->connect_errno ;
            $msg .= '('.$connection->connect_errno.')';
            exit($msg);
        }
    }

    public static function db_disconnect($connection){
        if(isset($connection)){
            $connection->close();
            self::$connection = "";
        }
    }
}