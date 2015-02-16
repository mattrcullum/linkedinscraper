/**
 * Created by matthew on 12/13/14.
 */
// results
var scraper = function () {

// scrape status
    var running = false;

    var scrapeTab = 0;

    var masterCallback;

    var isFinished = false;

    var status = {};
    var limit = app.settings.scraper.limit;

    // starts scraping
    function start(cb) {
        running = true;
        masterCallback = cb;

        var series = [
            getProfileLinks,
            nextIteration
        ];

        function executeSeries() {
            async.series(series)
        }

        // program control
        function nextIteration() {
            if (status.done) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        async.series([
                create_scrapeTab,
                executeSeries
            ]
        )
    }

    // releases program control back to calling function
    function exit() {
        chrome.tabs.remove(scrapeTab);
        scrapeTab = false;
        isFinished = true;
        masterCallback();
    }

    // creates the tab we'll use for scraping
    function create_scrapeTab(callback) {

        // prevents creation of extra tab
        if (scrapeTab) {
            callback();
            return;
        }

        var titleFilter = app.currentCompany.titleFilter;

        var url =
            'http://linkedin.com/' +
            'vsearch/p' +
            '?f_CC=' + app.currentCompany.companyID +
            (
                titleFilter ?
                '&title=' + titleFilter : '') +
            '&openAdvancedForm=true' +
            '&titleScope=C&locationType=I' +
            '&orig=MDYS';

        // create the tab
        chrome.tabs.create({url: url}, function (tab) {
            scrapeTab = tab.id;
            chrome.tabs.onUpdated.addListener(onTabLoad)
        });

        // after tab creation return control to the calling function
        function onTabLoad(tabId, info) {
            if (info.status == "complete" && tabId == scrapeTab) {
                chrome.tabs.onUpdated.removeListener(onTabLoad);
                callback();
            }
        }
    }

    // retrieves profile links from scrape tab
    function getProfileLinks(callback) {

        // tells the content script to grab and return the current page's profile links
        app.callTabAction(scrapeTab, 'scrapeProfileList', processResults);

        // checks the integrity of the response, then concatenates it to our app.results variable
        function processResults(response) {

            // basic error checking
            if (!response || response.error) {
                console.error(chrome.runtime.lastError);
                console.error("Response for processLinkBatch is:" + response.error);
                return false;
            }

            // concatenate the response (if any) to our existing results array
            if (response.linkList.length != 0) {
                $(response.linkList).each(function (index, item) {
                    item.companyName = app.currentCompany.companyName
                });
                app.results = app.results.concat(response.linkList);
            }

            // when debugging, limits the number of profile links we collect
            if (app.results.length >= limit) {
                status.done = true;
                callback();
                return false;
            }

            // hasNextPage is a boolean representing whether the "next" pagination button exists.
            if (!response.hasNextPage) {
                status.done = true;
                callback();
                return false;
            }

            // otherwise, go on to scrape next page
            else {
                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrapeTab && info.status == "complete") {

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
        start: start
    };

}();
