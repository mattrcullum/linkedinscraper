/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var callback;
var people = [];


function start(settingsArg, callbackArg) {
    running = true;
    settings = settingsArg;
    callback = callbackArg;

    create_scrape_tab(function () {
        scrape(function () {
            console.log(people)
        })
    });
}

// recursively retrieves the profiles links for every member of the company
function scrape(callback) {
    send_to.tab(scrape_tab, "get_profile_links", function (response) {
        if (response) {
            people.concat(response.profile_links);

            if (response.paginationHasNext) {
                scrape(callback);
            }
            else {
                callback();
            }
        }
    })
}

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + position_filter +
        '&f_CC=' + companyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url, active: false}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    })

    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            callback();
        }
    }
}

window.addEventListener("cancel_scrape", function () {
    if (scrape_tab) {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        running = false;
    }
})

module.exports = {
    start: start,
    stop: function () {
        running = false;
    },
    isRunning: function () {
        return running
    }
}





