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


function start(settingsArg, callbackArg) {

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
function scrape(callback) {
    console.log('scrape called')
    // ask content script for all the profile links on the page
    send_to.tab(scrape_tab, "get_profile_links", function () {
        console.log('hello')
    });

    function processResponse(response) {
        console.log('response received: ' + response)
        // if we received a valid response
        if (response.profile_links) {
            console.log(response.profile_links)
            people = people.concat(response.profile_links);

            if (response.paginationHasNext && (people.length < settings.limit)) {
                send_to.tab(scrape_tab, "nextPage", function () {

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

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + settings.positionFilter +
        '&f_CC=' + settings.CompanyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url, active: false}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    })

    // after tab creation return control to the calling function
    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            callback();
        }
    }
}

// stops the scraping process
function cleanup() {
    if (scrape_tab) {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        running = false;
    }
}

window.addEventListener("cancel_scrape", function () {
    cleanup()
});

// the api for this module
module.exports = {

    start: start,
    stop: function () {
        cleanup();
    },
    isRunning: function () {
        return running
    }
};





