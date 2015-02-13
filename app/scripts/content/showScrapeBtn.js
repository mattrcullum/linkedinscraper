/**
 * Created by matthew on 12/12/14.
 */

var path_segments = urlHelper.segments;
var first_path_segment = path_segments[0] || null;
var host_title = urlHelper.hostName.toLowerCase();

if (host_title == "linkedin")
    switch (first_path_segment) {
        case 'company':
            add_scrape_button();
            break;
    }

function add_scrape_button() {

    // $employeesLinkHref contains relevant company IDs.
    var link_containing_company_IDs = $('.how-connected .stats li .density')[0];

    //We need to extract the relevant company IDs to a string before they can be of any use.
    var companyIDs = urlHelper.getParam('f_CC', link_containing_company_IDs);
    var companyName = $('span[itemprop="name"]').text();

    // we'll place our scrape button after this one
    var $follow_button = $('.follow-content .not-hidden');

    var $scrape_btn_container = $('<div></div>').css('display', 'inline');
    var $scrape_btn = $('<a></a>').addClass('').attr('id', 'scrape').html('Scrape').css({
        background: '#27ae60',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px',
        border: 'solid 1px #34495e',
        padding: '2px 13px',
        cursor: 'pointer',
        borderRadius: '3px',
        textDecoration: 'none',
        lineHeight: '16px',
        height: '31px',
        marginLeft: '10px'
    });

    $scrape_btn.click(function () {
        var path = '/index.html' +
            '?a=addToQueue'
            + '&company=' + companyName
            + '&companyID=' + companyIDs
            + '&a=addToQueue';
        chrome.runtime.sendMessage({to: "background", action: "openApp", path: path})
    });

    $scrape_btn_container.html($scrape_btn);
    $scrape_btn_container.insertAfter($follow_button)
};