// ==UserScript==
// @name         PeopleSoft EC Suspense Comparison Highlighting (Old-School EC Search/Match)
// @namespace    http://tampermonkey.net/
// @version      0.1.5
// @description  Adds comparison highlighting on the match panel for EC Suspense in PeopleSoft
// @author       Jamie Davis
// @downloadURL  https://gist.githubusercontent.com/jamie-r-davis/3fddcd04897881336c6a89114b285eaf/raw/ec_searchmatch_highlight.js
// @updateURL    https://gist.githubusercontent.com/jamie-r-davis/3fddcd04897881336c6a89114b285eaf/raw/ec_searchmatch_highlight.js
// @match        https://*/*/EMPLOYEE/SA/c/M_RA_LOADS.M_RA_PRS_STAGING.GBL
// @grant        none
// ==/UserScript==

// Your code here...
(function () {
    let fieldmap = {
        'M_RA_DERIVED_NAME$0': 'M_RA_SM_RPT_VW_NAME$0',
        'M_RA_PRS_SM_EC_BIRTHDATE$0': 'M_RA_SM_RPT_VW_BIRTHDATE$0',
        'M_RA_PRS_SM_EC_SEX$0': 'M_RA_SM_RPT_VW_SEX$0',
        'M_RA_PRS_SM_EC_EDI_COM_NBR$0': 'M_RA_SM_RPT_VW_EMAIL_ADDR$0',
        'M_RA_PRS_SM_EC_COUNTRY$0': 'M_RA_SM_RPT_VW_COUNTRY$0',
        'M_RA_PRS_SM_EC_ADDRESS1$0': 'M_RA_SM_RPT_VW_ADDRESS1$0',
        'M_RA_PRS_SM_EC_CITY$0': 'M_RA_SM_RPT_VW_CITY$0',
        'M_RA_PRS_SM_EC_STATE$0': 'M_RA_SM_RPT_VW_STATE$0',
        'M_RA_PRS_SM_EC_POSTAL$0': 'M_RA_SM_RPT_VW_POSTAL$0'
    };

    function CompareFields(fieldmap) {
        let document = window.frames['TargetContent'].document;
        let valid_color = 'rgba(0,255,0,0.5)';
        let invalid_color = 'rgba(255,0,0,0.5)';
        if (document.getElementById('M_RA_DERIVED_NAME\$0') == null) {
            return false;
        };
        Object.entries(fieldmap).forEach(function(entry) {
            console.log(entry);
            let el1 = document.getElementById(entry[0].replace(/\$/g, '\$'));
            let v1 = el1.innerText.trim();
            let el2 = document.getElementById(entry[1].replace(/\$/g, '\$'));
            let v2 = el2.innerText.trim();

            if (v1 != '' && v2 != '') {
                if (v1 == v2) {
                    el1.style.background = valid_color;
                    el2.style.background = valid_color;
                } else {
                    el1.style.background = invalid_color;
                    el2.style.background = invalid_color;
                }
                // add some padding and make text darker to bump contrast
                let styles = {padding: '2px', color: '#333'}
                Object.assign(el1.style, styles);
                Object.assign(el2.style, styles);
            }
        })
    };

    var observer = new MutationObserver(function() {CompareFields(fieldmap);});
    observer.observe(document.querySelector('body'), {attributes: true, childList: true, subtree: true});
}());