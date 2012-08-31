<?php

define('AJAX_SCRIPT', true);
require_once('../../config.php');
require_once($CFG->dirroot . '/mod/equella/equella_rest_api.php');

$response = array();
foreach ($_FILES as $file) {
    $filepath = $file['tmp_name'];
    $fp = fopen($filepath, 'rb');
    $info = equella_rest_api::contribute_file($file['name'], $fp);
    $response[] = $info;
}
echo json_encode($response);
