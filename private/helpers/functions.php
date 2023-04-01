<?php

function rmHtml($value)
{
    return strip_tags($value);
}

/**
 * validatingRecivedDataTampering function
 *
 * @param string,array $columnName
 * @return void
 *  checks if the incoming data is array or sting and 
 *  compairing that $_REQUEST consists the string or not
 *  based on that it determining what to do
 */
function validatingRecivedDataTampering($columnName = [])
{
    $selectedColumn = null;

    if (is_array($columnName)) {
        foreach ($columnName as $key => $value) {
            if (array_key_exists($value, $_REQUEST)) {
                $selectedColumn = $value;
            }
        }
    } else {
        $selectedColumn = $columnName;
    }

    return validateColumnAndData($selectedColumn);
}


/**
 * validateColumnAndData function
 *  This function checks that recived url parameter is tampered or not.
 *  it checks that the passed string, whiche is a key of the $_REQUEST verialble
 *  is that matching whit the data recived.if its not matching then somthing might 
 *  be serious.Hence script will throw a errow message and stop executing;
 *
 * @param [string] $columnName
 * @return [number]
 */


function validateColumnAndData($columnName)
{
    $dataForColumn =  rmHtml($_REQUEST[$columnName] ?? null);
    $dataForColumn = intval($dataForColumn);

    if (count($_REQUEST) == 0 || ($dataForColumn != null && is_int($dataForColumn))) {
        return $dataForColumn;
    } else {
        echo json_encode(
            array("error" => "something is fishy")
        );
        return false;
    }
}

function checkEndPoint($arrayIndex)
{
    return $_REQUEST[$arrayIndex] ??  false;;
}
