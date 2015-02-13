/**
 * Created by matthew on 2/12/15.
 */
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
/**
 * Created by matthew on 2/11/15.
 */
var urlHelper = function () {

    function segments() {
        return location.pathname.substr(1).split('/')
    }

    function hostName() {
        return location.host.split('.')[1];
    }

    function param(name, link) {
        var href = link || location;
        // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(href.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray(prmstr) {
        var params = {};
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    return {
        params: getSearchParameters(),
        getParam: param,
        segments: segments(),
        hostName: hostName()
    }
}();
function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {

        case 'scrapeProfileList':
            var results = linkedin.scrapeProfileList();
            sendResponse(results);
            break;

        case 'nextPage':
            var results = linkedin.pagination.nextPage();
            sendResponse(results);
            break;

        case 'getBasicInfo':
            var results = linkedin.scrapeProfileView();
            sendResponse(results);
            break;

        case 'getName':
            var time = {
                total: 0,
                interval: 50,
                out: 5000 //time.out ;)
            };
            var waitForSearchResults = setInterval(function (callback, time) {

                time.total += time.interval;

                var $results = $('#rso');
                var hasResults = $results.find('li').length;

                if (hasResults) {
                    setTimeout(function (callback) {
                        callback(google.getName());
                    }, 350, callback);

                    clearInterval(waitForSearchResults)
                }

                else if ($results.length) {
                    clearInterval(waitForSearchResults);
                    callback(false);
                }
                console.log(time.total)

            }, time.interval, sendResponse, time);
            break;

        case 'tryEmail':
            google.tryEmail(message.args, sendResponse);
            break;
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
/**
 * Created by matthew on 1/21/15.
 */

var getName = function () {
    var $results = $('.g:lt(3)');
    var name = {};

    $.each($results, function (index, item) {
        var title = $(item).find('h3').text();

        // The google result we want will look like one of the following:
        // "John Smith | LinkedIn"
        // "John S. | LinkedIn"
        // "John J. Smith | LinkedIn"
        if (" ".hasChar(title, '|')) { // TO DO ***********************************************8
            var fullName =
                title.split('|')[0].trim().split(' ');

            var fName = fullName[0];
            var lName = fullName[1];

            name = {first: fName, last: lName, full: fullName};
            return false
        }
    });

    return name || false;
};

var isGmailReady = function () {

};

var tryEmail = function (message, callback) {
    console.log(message, callback);
    var email = message.email.replace(' ', '');
    var name = message.name.full;

    var $emailInput = $("textarea").first();

    $emailInput.focus();
    $emailInput.text(email);
    $emailInput.blur();

    setTimeout(function (callback) { // give rapportive 1500 milliseconds to initialize

        var waitForRapportive = setInterval(function (callback) { // now we wait for rapportive to load the results

            var $rapportive = $('#rapportive-sidebar');

            function rapportiveSidebarExists() {
                return $rapportive.length != 0;
            }

            function isLoadingResults() {
                return $rapportive.has('.wip-spinner').length || $rapportive.find('.links li a:contains("Looking up...")').length;
            }


            if (rapportiveSidebarExists() && !isLoadingResults()) {

                clearInterval(waitForRapportive);

                var $name = $rapportive.find('h1.name').first().text().trim().toLowerCase();
                var $discardDraftBtn = $('[data-tooltip="Discard draft"]');

                $discardDraftBtn.click();

                var waitForDraftDiscard = setInterval(function (callback) {

                    var $hasSendButton = $('div[role="button"]:contains("Send")').length;

                    if (!$hasSendButton) {
                        clearInterval(waitForDraftDiscard);
                        if ($name == name) {
                            callback({correct: true});
                            console.log('found email')
                        }
                        else {
                            console.log('wrong');
                            callback({correct: false})
                        }
                    }
                }, 100, callback)
            }
        }, 100, callback);
    }, 1500, callback);
    return {
        getName: getName,
        isGmailReady: isGmailReady,
        tryEmail: tryEmail
    }
};

/**
 * Created by matthew on 1/11/15.
 */
var linkedin = function () {
    function scrapeProfileList() {
        var results = [];
        var error = null;

        // grab each profile link and push it to results[]
        var $peopleDiv = $('#results .mod.result.people');

        $.each($peopleDiv, function (index, person) {
            var $person = $(person);
            var $nameLink = $person.find('.bd h3 a.title');

            var profileLink = $nameLink.attr('href').replace(/&authType(.*)/, '');
            var headline = $person.find('.description').text();
            var location = $person.find('.demographic bdi').text();
            var industry = $person.find('.demographic dd:last-child').text();

            var fullName = $nameLink.text().trim();
            var name = {};

            // if the fullName has a period, we'll assume it's abbreviated
            if (" ".hasChar(fullName, '.')) { // TO DO *********************
                name.first = fullName.split(' ')[0];
            }

            // if the fullName is hidden
            else if (fullName == "LinkedIn Member") {
                name.isHidden = true;
            }

            // if it's it's not abbreviated, we'll assume it looks like "John Smith", "John J. Smith" or "John J. Smith II"
            else {
                fullName = fullName.split(' ');
                name.first = fullName[0];

                // "John J. Smith or John J. Smith II"
                if (fullName.length > 2) {
                    name.last = fullName[2];
                }

                // "John Smith"
                else {
                    name.first = fullName[0];
                    name.last = fullName[1];
                }

            }

            var person = {
                name: name,
                profileLink: profileLink,
                headline: headline,
                location: location,
                industry: industry
            };

            if (fullName == "LinkedIn Member") {
                person.name = {isHidden: true}
            }

            results.push(person);
        });

        if (results.length == 0) {
            error = "People container doesn't exist"
        }

        return {
            results: results,
            hasNextPage: pagination.hasNextPage(),
            nextPage: pagination.nextPage(),
            error: error
        }
    }

    function scrapeProfileView() {


        var currentPosition = $('#overview-summary-current td ol li a').text();

        var pastPositions = $('#overview-summary-past td ol li a').map(function () {
            return $.trim($(this).text());
        }).get();

        var education = $('#overview-summary-education td ol li a').map(function () {
            return $.trim($(this).text());
        }).get();


        return {
            currentPosition: currentPosition,
            pastPositions: pastPositions,
            education: education
        }
    }

    function pagination() {

        function nextPage() {
            var $nextPaginationBtn = $('#results-pagination .next a');
            return location.hostname + $nextPaginationBtn.attr('href');
        }

        function hasNextPage() {
            return $('#results-pagination .next a').length
        }
    }

    return {
        scrapeProfileList: scrapeProfileList,
        scrapeProfileView: scrapeProfileView,
        pagination: pagination
    }
}();
/*
 return {
 pagination: pagination,
 scrapeProfileList: scrapeProfileList,
 scrapeProfileView: scrapeProfileView
 };
 */
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