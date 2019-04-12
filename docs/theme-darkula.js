define("ace/theme/darkula",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-darkula";
exports.cssText = ".ace-darkula .ace_gutter {\
background: #232525;\
color: rgb(102,110,118)\
}\
.ace-darkula .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-darkula {\
background-color: #232525;\
color: #A9B7C6\
}\
.ace-darkula .ace_cursor {\
color: #ffffff\
}\
.ace-darkula .ace_marker-layer .ace_selection {\
background: #214283\
}\
.ace-darkula.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #232525;\
border-radius: 2px\
}\
.ace-darkula .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174)\
}\
.ace-darkula .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #3B3A32\
}\
.ace-darkula .ace_marker-layer .ace_active-line {\
background: #323232\
}\
.ace-darkula .ace_gutter-active-line {\
background-color: #323232\
}\
.ace-darkula .ace_marker-layer .ace_selected-word {\
border: 1px solid #214283\
}\
.ace-darkula .ace_fold {\
background-color: #ffb64e;\
border-color: #A9B7C6\
}\
.ace-darkula .ace_keyword {\
color: #CC7832;\
background-color: rgba(0, 0, 0, 0.0)\
}\
.ace-darkula .ace_constant.ace_language {\
color: #CC7832\
}\
.ace-darkula .ace_constant.ace_numeric {\
color: #6897bb\
}\
.ace-darkula .ace_constant.ace_character {\
color: #9876AA\
}\
.ace-darkula .ace_constant.ace_character.ace_escape {\
color: #CC7832\
}\
.ace-darkula .ace_constant.ace_other {\
color: #9876AA\
}\
.ace-darkula .ace_support.ace_function {\
color: #A9B7C6\
}\
.ace-darkula .ace_support.ace_constant {\
color: #A9B7C6\
}\
.ace-darkula .ace_support.ace_class {\
color: #A9B7C6\
}\
.ace-darkula .ace_support.ace_type {\
color: #A9B7C6\
}\
.ace-darkula .ace_storage {\
color: #CC7832\
}\
.ace-darkula .ace_storage.ace_type {\
color: #CC782F\
}\
.ace-darkula .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-darkula .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #9876AA\
}\
.ace-darkula .ace_string {\
color: #759254\
}\
.ace-darkula .ace_comment {\
font-style: italic;\
color: #666666\
}\
.ace-darkula .ace_variable {\
color: #9876AA\
}\
.ace-darkula .ace_variable.ace_parameter {\
color: #9876AA\
}\
.ace-darkula .ace_meta.ace_tag {\
color: #CC7832\
}\
.ace-darkula .ace_entity.ace_other.ace_attribute-name {\
color: #BABA8A\
}\
.ace-darkula .ace_entity.ace_name.ace_function {\
color: #ffb64e\
}\
.ace-darkula .ace_entity.ace_name.ace_tag {\
color: #CC6B2E\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
                (function() {
                    window.require(["ace/theme/darkula"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            