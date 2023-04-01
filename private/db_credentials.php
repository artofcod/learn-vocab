<?php
 // keep database creadentials in seperate file
 // easy to handel modification or alteration
 // gives flexibility to colaborate with multiple developers
 // easey to exclude this file from source code managers
 // have seperate copy in production and dev environment.

 define('DB_SERVER','localhost');
 define('DB_USER','root');
 define('DB_PASSWORD','');
 define('DB_NAME','vocab_project');