/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var masterCallback;
var people = [];


function initialize(settingsArg, callbackArg) {

    //initialization
    running = true;
    settings = settingsArg;
    masterCallback = callbackArg;
    settings.limit = 45;

    // program control
    create_scrape_tab(function () {
        scrape(function () {
            masterCallback(people);
        })
    });

}

// recursively retrieves the profiles links for every member of the company
function start(callback) {
    console.log('scrape called');
    // ask content script for all the profile links on the page
    sendTabMessage(scrape_tab, {linkedin: 'getProfileLinks'}, processProfileLinkBatch);


    function processProfileLinkBatch(links) {
        console.log('response received: ' + response);

        // if we received a valid response
        if (response.profile_links) {
            console.log(response.profile_links)
            people = people.concat(response.profile_links);

            if (response.paginationHasNext && (people.length < settings.limit)) {
                sendTabMessage(processPageScrapeResults, "nextPage", function () {

                    scrape(callback);
                    console.log('recursively calling scrape')
                })
            }

            else {
                callback();
            }
        }

        else {
            throw "Invalid response from content transponder at get_profile_links"
        }
    }
}

// stops the scraping process
function stop() {
    if (scrape_tab) {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        running = false;
    }
}

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + settings.positionFilter +
        '&f_CC=' + settings.CompanyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    });

    // after tab creation return control to the calling function
    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            callback();
            chrome.tabs.onUpdated.removeListener(waitForTab)
        }
    }
}

window.addEventListener("cancel_scrape", function () {
    cleanup()
});

// the api for this module
module.exports = {
    start: initialize,
    stop: stop
};





