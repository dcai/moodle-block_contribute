<?php

defined('MOODLE_INTERNAL') || die();

require_once(dirname(dirname(__DIR__)) . '/mod/equella/equella_rest_api.php');

class block_equella_contribute extends block_base {

    function init() {
        $this->title = get_string('title', 'block_equella_contribute');
    }

    function get_content() {
        global $CFG, $USER, $SITE, $COURSE;

        if( $this->content !== NULL ) {
            return $this->content;
        }
        if( empty($this->instance) ) {
            return null;
        }

        $this->content = new stdClass;
        $renderer = $this->page->get_renderer('block_equella_contribute');
        $this->content->text = $renderer->dnd_area($this->instance->id);

        return $this->content;
    }
}
