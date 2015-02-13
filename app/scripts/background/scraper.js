/**
 * Created by matthew on 12/13/14.
 */
// results
var scraper = function () {

// scrape status
    var running = false;

    var scrape_tab = 0;

    var masterCallback;

    var isFinished = false;

    var status = {};
    var limit = app.settings.scraper.limit;

    function initialize(callbackArg) {
        //initialization
        running = true;
        masterCallback = callbackArg;
        start();
    }

    function start() {
        function getBatch(callback) {
            async.series([
                create_scrape_tab,
                getProfileLinks,
                callback
            ])
        }

        function finish() {
            chrome.tabs.remove(scrape_tab);
            scrape_tab = false;
            isFinished = true;
            masterCallback();
        }

        // program control
        function controller() {
            getBatch(function () {
                if (status.done) {
                    finish();
                }
                else getBatch(controller)
            })
        }

        controller();
    }

    // creates a tab we'll use for scraping
    function create_scrape_tab(callback) {
        if (scrape_tab) {
            callback();
            return;
        }
        var title = app.currentCompany.titleFilter;
        var url =
            'http://linkedin.com/' +
            'vsearch/p' +
            '?f_CC=' + app.currentCompany.companyID +
            (
                title ?
                '&title=' + app.currentCompany.titleFilter : '') +
            '&openAdvancedForm=true' +
            '&titleScope=C&locationType=I' +
            '&orig=MDYS';

        // create the tab
        chrome.tabs.create({url: url}, function (tab) {
            scrape_tab = tab.id;
            chrome.tabs.onUpdated.addListener(waitForTab)
        });

        // after tab creation return control to the calling function
        function waitForTab(tabId, info) {
            if (info.status == "complete" && tabId == scrape_tab) {
                chrome.tabs.onUpdated.removeListener(waitForTab);
                callback();
            }
        }
    }

    function getProfileLinks(callback) {

        // ask content script for all the profile links on the page
        app.callTabAction(scrape_tab, 'scrapeProfileList', processResults);

        function processResults(response) {

            // basic error checking
            if (!response || response.error) {
                console.error(chrome.runtime.lastError);
                console.error("Response for processLinkBatch is:" + response.error);
            }

            // concatenate the response (if any) to our existing results array
            if (response.linkList.length != 0) {
                app.results = app.results.concat(response.linkList);
            }

            // allows limiting size of results array. Here only for debugging
            if (app.results.length >= limit) {
                status.done = true;
                callback();
                return false;
            }

            // set done status if no more pages
            if (!response.hasNextPage) {
                status.done = true;
                callback();
            }
            // otherwise, go on to scrape next page
            else {
                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrape_tab && info.status == "complete") {

                            chrome.tabs.onUpdated.removeListener(pageChange);

                            setTimeout(function (callback) {
                                callback();
                            }, 2000, callback);
                        }
                    }

                    chrome.tabs.onUpdated.addListener(pageChange);
                });
            }

        }
    }

// the api for this module
    return {
        start: initialize,
        profileLinks: function () {
            return results.profileLinks
        },
        isFinished: function () {
            return isFinished
        }
    };


    function log(message) {
        console.log(message)
    }
}()
