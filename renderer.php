<?php

/**
 * Print DND area
 *
 * @package    block_equella_contribute
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


class block_equella_contribute_renderer extends plugin_renderer_base {

    /**
     * Prints private files tree view
     * @return string
     */
    public function dnd_area($blockid) {
        return $this->render(new dnd_area($blockid));
    }

    public function render_dnd_area(dnd_area $area) {
        global $CFG, $OUTPUT, $PAGE;

        if (!empty($CFG->equella_oauth_access_token)) {
            $this->page->requires->js('/blocks/equella_contribute/module.js');
            $module = array('name'=>'block_equella_contribute', 'fullpath'=>'/blocks/equella_contribute/module.js');
            $html = '<div id="equella-dropbox" class="equella-dnd">
                        <p id="droplabel">Drop zone</p>
                     </div>';
            $html .= '';
        } else {
            $modulesettingurl = new moodle_url('/admin/settings.php', array('section'=>'modsettingequella'));
            $html = html_writer::link($modulesettingurl, get_string('obtaintoken', 'block_equella_contribute'));
        }
        return $html;
    }
}

class dnd_area implements renderable {
    public $blockid;
    public function __construct($blockid) {
        $this->blockid = $blockid;
    }
}
